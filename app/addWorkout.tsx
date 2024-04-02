import { Pressable, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import workoutRepository from '../data/workoutRepository';
import { Instant } from '@js-joda/core';

let addWorkout = () => workoutRepository.init();

export default function () {
    return (
        <View>
        <Pressable onPress={() => addWorkout()}>
            <Text style={{fontSize: 32, color: "gray"}}>Init DB</Text>
        </Pressable>
        <Pressable onPress={() => workoutRepository.export()}>
            <Text style={{fontSize: 32, color: "gray"}}>Check DB</Text>
        </Pressable>
        </View>
    );
}