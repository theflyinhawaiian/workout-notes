import { Workout } from "../model/Workout";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import { type SQLiteDatabase } from "expo-sqlite/next";
import { Exercise, SetModel } from "../model/Exercise";

const migrations = 
[
    `create table if not exists workouts (id integer primary key, date text);
     create table if not exists exercises (id integer primary key, exerciseName text, workoutId integer, foreign key(workoutId) references workouts (id));
     create table if not exists sets (id integer primary key, value real, reps integer, exerciseId integer, foreign key(exerciseId) references exercises (id));`
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
    getExerciseNames: async (db: SQLiteDatabase) : Promise<string[]> =>
            (await db.getAllAsync<{ exerciseName: string }>("select distinct exerciseName from exercises;")).map(x => x.exerciseName),
    add: async (db: SQLiteDatabase, workout: Workout) => {
        const workoutId = (await db.runAsync("insert into workouts (date) values (?)", workout.date)).lastInsertRowId;
        console.log(`inserted workout on ${workout.date} as id: ${workoutId}`);
        for(const exercise of workout.exercises){
            const exerciseId = (await db.runAsync("insert into exercises (workoutId, exerciseName) values (?, ?)", workoutId, exercise.title)).lastInsertRowId;
            const sets = exercise.sets ?? []
            for(const set of sets){
                await db.runAsync("insert into sets (value, reps, exerciseId) values (?, ?, ?)", set.amount ?? 0, set.reps, exerciseId);
            }
        }
    },
    delete: (id: Number) => console.log("delete"),
    update: (workout: Workout) => console.log("update"),
    find: (id: Number) => console.log("find"),
    getAll: async (db: SQLiteDatabase) : Promise<Workout[]> => { 
        console.log("fetching workouts");
        const workoutData = await db.getAllAsync<{id : string, date: string}>("select * from workouts");
        const workouts: Workout[] = [];
        for(const workout of workoutData){
            const exerciseData = await db.getAllAsync<{id: string, exerciseName: string}>(`select * from exercises where workoutId = ${workout.id}`);
            const exercises : Exercise[] = [];
            for(const exercise of exerciseData){
                const setData = await db.getAllAsync<{value: number, reps: number}>(`select * from sets where exerciseId = ${exercise.id}`);
                const sets : SetModel[] = [];
                for(const set of setData){
                    sets.push({ amount: set.value, reps: set.reps});
                }
                exercises.push({ title: exercise.exerciseName, sets });
            }
            workouts.push({ date: workout.date, exercises });
        }
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
    