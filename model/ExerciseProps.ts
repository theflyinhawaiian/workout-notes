export type ExerciseProps = {
    title: string,
    sets?: SetModel[]
};

export type SetModel = {
    weight?: number,
    reps: number
}