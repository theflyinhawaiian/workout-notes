import { WorkoutProps } from "../model/WorkoutProps";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("workoutNotes.db");

const migrations = 
[
    `create table if not exists workouts (id integer primary key, date text);
    create table if not exists exercise_types (id integer primary key, exercise_name text not null unique);
    create table if not exists exercises (id integer primary key, exercise_type_id integer, workout_id integer, foreign key(exercise_type_id) references exercise_types(id), foreign key(workout_id) references workouts (id));
    create table if not exists sets (id integer primary key, value real, reps integer, exercise_id integer, foreign key(exercise_id) references exercises (id));`,
    `insert into exercise_types (exercise_name) values ('Bench Press');
    insert into exercise_types (exercise_name) values ('Bicep Curls');
    insert into exercise_types (exercise_name) values ('Lat Pulldowns');`
];

async function execMigrations(startVersion: number){
    let currVersion = startVersion;
    await db.transactionAsync(async tx => {
        console.log(`migrating to version ${currVersion}`);
        if(currVersion == migrations.length){
            await tx.executeSqlAsync(`PRAGMA user_version = ${currVersion}`, [])
            return;
        }
        
        await tx.executeSqlAsync(migrations[currVersion], []);
        execMigrations(currVersion+1);
    });
}

export default {
    init: async () => {
        db.transaction(tx => {
            tx.executeSql("PRAGMA user_version;", [],
            async (_, { rows: { _array } } ) => {
                let userVersion = _array[0]["user_version"];
                console.log(`detected userVersion: ${userVersion}`);
                if(userVersion < migrations.length)
                    await execMigrations(userVersion);
            });
        });
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
    })}
};