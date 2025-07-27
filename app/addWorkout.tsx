import React, { useCallback, useState } from 'react';
import { Text, View } from 'react-native';
import workoutRepository from '../data/workoutRepository';
import { useSQLiteContext } from 'expo-sqlite/next';
import Exercise from '../components/Exercise';
import { Exercise as ExerciseModel } from '../model/Exercise';
import List from '../components/List';
import ExerciseForm from '../components/ExerciseForm';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { DateTime } from 'luxon';
import { showSnackbar } from '../util/snackbars';

export default function () {
    const dt = DateTime.now();
    const router = useRouter();
    const displayDate = dt.toLocaleString(DateTime.DATE_MED);
    const db = useSQLiteContext();
    const [exercises, setExercises] = useState<ExerciseModel[]>([]);

    const addWorkout = useCallback(async () => {
        if(exercises.length === 0){
            showSnackbar("Please add at least one exercise.");
            return;
        } 

        const workout = { date: dt.toString(), exercises }
        await workoutRepository.add(db, workout);
        router.back();
    }, [dt, exercises]);

    const addExercise = (exercise: ExerciseModel) => {
        setExercises([...exercises, exercise]);
    };

    return (
        <View style={{ width: "100%", marginTop: 15, flex: 1, justifyContent: "flex-start" }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between"}}>
                <Ionicons name="arrow-back" onPress={() => router.back()} size={32} />
                <Ionicons name="checkmark" onPress={() => addWorkout()} size={32} />
            </View>
            <Text style={{ fontSize: 24 }}>Workout on {displayDate}</Text>
            <List data={exercises} renderItem={props => <Exercise data={props.item} />} />
            <ExerciseForm onSave={addExercise}/>
        </View>
    );
}