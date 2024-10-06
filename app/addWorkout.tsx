import React, { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import workoutRepository from '../data/workoutRepository';
import { useSQLiteContext } from 'expo-sqlite/next';
import Exercise from '../components/Exercise';
import { Exercise as ExerciseModel } from '../model/Exercise';
import { DateTimeFormatter, LocalDateTime } from '@js-joda/core';
import { Locale } from "@js-joda/locale_en-us";
import List from '../components/List';
import ExerciseForm from '../components/ExerciseForm';

export default function () {
    const dt = LocalDateTime.now();
    const formatter = DateTimeFormatter.ofPattern('EEEE, MMMM d').withLocale(Locale.ENGLISH);
    const displayDate = dt.format(formatter);
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
        <View style={{ marginTop: 15, flex: 1, justifyContent: "flex-start" }}>
            <Text style={{ fontSize: 24 }}>Workout on {displayDate}</Text>
            <List data={exercises} renderItem={props => <Exercise data={props.item} />} />
            <ExerciseForm onSave={addExercise}/>
        </View>
    );
}