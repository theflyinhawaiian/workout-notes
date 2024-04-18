import { Pressable, Text, View } from 'react-native';
import workoutRepository from '../data/workoutRepository';
import { useSQLiteContext } from 'expo-sqlite/next';


export default function () {
    let db = useSQLiteContext();

    let addWorkout = async () => {
        workoutRepository.add(db, { date: "1/2/22", exercises: [{ title: "Inclined Bench Press", sets: [{weight: 90, reps: 3}] }] })
    };
    return (
        <View>
            <Pressable onPress={() => addWorkout()}>
                <Text style={{fontSize: 32, color: "gray"}}>Init DB</Text>
            </Pressable>
        </View>
    );
}