import { router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable } from 'react-native';

export default function(){
    return (
        <Pressable onPress={() => router.push("/addWorkout")}>
            <Ionicons name="add" size={32} color="gray"/>
        </Pressable>
    );
}