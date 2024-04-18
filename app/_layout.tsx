import { Stack } from 'expo-router';
import workoutRepository from "../data/workoutRepository";
import AddWorkoutButton from '../components/AddWorkoutButton';
import { SQLiteProvider } from 'expo-sqlite/next';

export default function () {
    return (
    <SQLiteProvider databaseName="workoutNotes.db" onInit={workoutRepository.init}>
        <Stack>
            <Stack.Screen name="notes" options={{ headerRight: () => <AddWorkoutButton />}} />
            <Stack.Screen name="addWorkout" options={{}} />
        </Stack>
    </SQLiteProvider>
    );
}