import { Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import workoutRepository from '../data/workoutRepository';
import { Workout } from '../model/WorkoutProps';
import { Instant } from '@js-joda/core';

let addWorkout = (workout: Workout) => workoutRepository.add(workout);

export default function () {
    return (
        <Pressable onPress={() => addWorkout({ date: Instant.now().toString(), exercises: [] })}>
            <Ionicons name="add" size={32} color="gray" />
        </Pressable>
    );
}