import { Workout } from "../model/Workout";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import { type SQLiteDatabase } from "expo-sqlite/next";

const migrations = 
[
    `create table if not exists workouts (id integer primary key, date text);
     create table if not exists exercise_types (id integer primary key, exercise_name text);
     create table if not exists exercises (id integer primary key, exercise_type_id integer, workout_id integer, foreign key(exercise_type_id) references exercise_types(id), foreign key(workout_id) references workouts (id));
     create table if not exists sets (id integer primary key, value real, reps integer, exercise_id integer, foreign key(exercise_id) references exercises (id));`
];

function setVersion(db: SQLiteDatabase, version: number){
    console.log(`attempting to set user version to ${version}`);
    db.execAsync(`PRAGMA user_version = ${version}`);
}

async function execMigrations(db: SQLiteDatabase, startVersion: number){
    const currVersion = startVersion;
    console.log(`migrating to version ${currVersion}`);

    if(currVersion < migrations.length)
    {
        db.execAsync(migrations[currVersion]);
        execMigrations(db, currVersion + 1);
    }
    else
    {
        setVersion(db, currVersion);
    }
}

export default {
    init: async (db: SQLiteDatabase) => {
        await db.execAsync("PRAGMA foreign_keys = ON;");
        const { user_version } = await db.getFirstAsync<{ user_version: number}>("PRAGMA user_version;") ?? { user_version: 0 };

        console.log(`User version: ${user_version}, num migrations: ${migrations.length}`);

        if(user_version < migrations.length)
            await execMigrations(db, user_version);
    },
    getExerciseNames: (db: SQLiteDatabase) : Promise<string[]> =>
            db.getAllAsync<string>("select exercise_name from exercise_types;"),
    add: async (db: SQLiteDatabase, workout: Workout) => {
        const workoutId = (await db.runAsync("insert into workouts (date) values (?)", workout.date)).lastInsertRowId;
        console.log(`inserted workout on ${workout.date} as id: ${workoutId}`);
        for(const exercise in workout.exercises){
            const exerciseId = (await db.runAsync("insert or ignore into exercise_types (exercise_name) values (?)", exercise)).lastInsertRowId;
            console.log(`inserted exercise ${exercise} as id: ${exerciseId}`);
            await db.runAsync("insert into exercises (workout_id, exercise_type_id) values (?, ?)", workoutId, exerciseId);
        }
    },
    delete: (id: Number) => console.log("delete"),
    update: (workout: Workout) => console.log("update"),
    find: (id: Number) => console.log("find"),
    getAll: async (db: SQLiteDatabase) : Promise<Workout[]> => { 
        console.log("fetching workouts");
        const workouts = await db.getAllAsync<Workout>("select * from workouts");
        console.log(workouts.map(x => x.date).join("\n "));
        return workouts;
    }, 
    export: async () => {
        await Sharing.shareAsync(
            FileSystem.documentDirectory + 'SQLite/workoutNotes.db', 
            { dialogTitle: 'share or copy your DB via' }
        ).catch((error: any) =>{
            console.log(error);
        });
    }
};
    