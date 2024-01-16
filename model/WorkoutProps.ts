import { ExerciseProps } from './ExerciseProps';

export type Workout = {
    date: string,
    exercises: ExerciseProps[]
}

export type WorkoutProps = {
    data: Workout,
    style?: {}
}