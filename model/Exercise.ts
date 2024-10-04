export type Exercise = {
    title: string,
    sets?: SetModel[]
}

export type ExerciseProps = {
    data: Exercise
};

export type SetModel = {
    amount?: number,
    reps: number
}