import { useState } from 'react';
import { Pressable, Text, TextInput, View, FlatList } from 'react-native';
import workoutRepository from '../data/workoutRepository';
import { useSQLiteContext } from 'expo-sqlite/next';
import Exercise from '../components/Exercise';
import { Exercise as ExerciseModel } from '../model/Exercise';

export default function () {
    let [date, setDate] = useState("");
    let [exercises, setExercises] = useState<ExerciseModel[]>([]);
    let db = useSQLiteContext();

    let addWorkout = async () => {
        const workout = { date, exercises }
        workoutRepository.add(db, workout)
    };

    return (
        <View>
            <TextInput onChangeText={text => setDate(text)} />
            <FlatList data={exercises} renderItem={props => <Exercise data={props.item} />} />
            <TextInput onChangeText={text => setNewExerciseText() } />
            <TextInput onChangeText={text => setNewExerciseWeight()} />
            <TextInput onChangeText={text => setNewExerciseReps()} />
            <Pressable onPress={() => addWorkout()}>
                <Text style={{fontSize: 32, color: "gray"}}>Save</Text>
            </Pressable>
        </View>
    );
}