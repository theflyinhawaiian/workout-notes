import { ExerciseProps } from './ExerciseProps';

export type WorkoutProps = {
    date: string,
    exercises : ExerciseProps[],
    style?: {}
}