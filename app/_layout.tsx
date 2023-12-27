import { Stack } from 'expo-router';
import AddWorkoutButton from '../components/AddWorkoutButton';

export default function () {
    return (
    <Stack>
        <Stack.Screen name="notes" options={{ headerRight: () => <AddWorkoutButton />}} />
        <Stack.Screen name="addWorkout" options={{}} />
    </Stack>
    );
}