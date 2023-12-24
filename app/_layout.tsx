import { Stack } from 'expo-router';
import AddWorkoutButton from '../components/AddWorkoutButton';

export default function () {
    return (
    <Stack>
        <Stack.Screen name="index" options={{ headerRight: () => <AddWorkoutButton />}} />
        <Stack.Screen name="addWorkout" options={{}} />
    </Stack>
    );
}