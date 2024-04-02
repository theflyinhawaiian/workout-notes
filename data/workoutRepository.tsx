import { WorkoutProps } from "../model/WorkoutProps";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("workoutNotes.db");

const migrations = 
[
    (tx: SQLite.SQLTransaction) => { 
            tx.executeSql(`create table if not exists workouts (id integer primary key, date text);`, []);
    },
];

function setVersion(tx: SQLite.SQLTransaction, version: number){
    tx.executeSql(`PRAGMA user_version = ${version}`, []);
}

async function execMigrations(startVersion: number){
    let currVersion = startVersion;
    console.log(`migrating to version ${currVersion}`);
    let migration : () => void;
    let nextMigration : () => void;

    if(currVersion == migrations.length){
        nextMigration = () => {};
    }else{
        nextMigration = () => execMigrations(currVersion + 1);
    }

    db.transaction(tx => {
        if(currVersion == migrations.length){
            migration = () => { setVersion(tx, currVersion); };
        }else{
            migration = () => { migrations[currVersion](tx); }
        }
    }, () => {}, nextMigration);
}

export default {
    init: async () => {
        let result = await db.execAsync([{ sql: "PRAGMA user_version;", args: [] }], false);
        console.log("my object: %o", result)
        if("error" in result[0]){
            console.log("woops");
            return;
        }

        let userVersion = result[0].rows[0]["user_version"];
        console.log(`detected userVersion: ${userVersion}`);
        if(userVersion < migrations.length)
            await execMigrations(userVersion);
    },
    getExerciseNames: () => {
        db.transaction(tx => {
            tx.executeSql("Select exercise_name from exercises", [],
            async (_, { rows: { _array } }) => {
                console.log(_array);
            });
        });
    },
    /*add: (workout: WorkoutProps) => {
        db.transaction(tx => {
            tx.executeSql("insert into workouts (date) values (?)", [workout.date],
            async (_, { rows: { _array }}) => {
                let workoutId = _array[0];
                for(let exercise in workout.exercises){
                    tx.executeSql("insert or ignore into exercise_types (exercise_name) values (?)", [exercise],
                    async (_, { rows: { _array }}) => {
                        let exerciseId = _array[0];
                        tx.executeSql("insert into exercises (workout_id, exercise_type_id) values (?, ?)", [workoutId, exerciseId])
                    })
                }
            });
        })
    },*/
    delete: (id: Number) => console.log("delete"),
    update: (workout: WorkoutProps) => console.log("update"),
    find: (id: Number) => console.log("find"),
    getAll: () => { db.transaction(tx => {
        tx.executeSql("select * from workouts", [], 
        (_, { rows: { _array }}) => {
            console.log(_array.map(x => x.date).join("\n "));
        });
    })},
    inspect: () => {
        db.transaction(tx => {
            tx.executeSql("SELECT name FROM sqlite_master WHERE type='table';", [], 
            (_, {rows: { _array }}) => {
                console.log("%o", _array);
            })
        })
    },
    export: async () => {
        await Sharing.shareAsync(
                FileSystem.documentDirectory + 'SQLite/workoutNotes.db', 
                { dialogTitle: 'share or copy your DB via' }
            ).catch((error: any) =>{
                console.log(error);
            })
    }
};