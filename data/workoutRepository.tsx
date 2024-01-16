import { Workout } from "../model/WorkoutProps"

export default {
    add: (workout: Workout) => console.log("add"),
    delete: (id: Number) => console.log("delete"),
    update: (workout: Workout) => console.log("update"),
    find: (id: Number) => console.log("find"),
    getAll: () => console.log("getAll")
};