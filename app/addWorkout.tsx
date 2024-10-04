import React, { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import workoutRepository from '../data/workoutRepository';
import { useSQLiteContext } from 'expo-sqlite/next';
import Exercise from '../components/Exercise';
import { Exercise as ExerciseModel } from '../model/Exercise';
import { LocalDateTime } from '@js-joda/core';
import WorkoutForm from '../components/WorkoutForm';
import List from '../components/List';

export default function () {
    const dt = LocalDateTime.now();
    const db = useSQLiteContext();
    const [exercises, setExercises] = useState<ExerciseModel[]>([]);

    const addWorkout = useCallback(async () => {
        const workout = { date: dt.toString(), exercises }
        workoutRepository.add(db, workout)
    }, [dt, exercises]);

    const addExercise = (exercise: ExerciseModel) => {
        setExercises([...exercises, exercise])
    };

    return (
        <View>
            <Text>Workout on {dt.toString()}</Text>
            <List data={exercises} renderItem={props => <Exercise data={props.item} />} />
            <WorkoutForm onSave={addWorkout}/>
        </View>
    );
}