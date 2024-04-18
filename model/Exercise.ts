export type Exercise = {
    title: string,
    sets?: SetModel[]
}

export type ExerciseProps = {
    data: Exercise
};

export type SetModel = {
    weight?: number,
    reps: number
}