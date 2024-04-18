import { Exercise } from './Exercise';

export type Workout = {
    date: string,
    exercises: Exercise[]
}

export type WorkoutProps = {
    data: Workout,
    style?: {}
}