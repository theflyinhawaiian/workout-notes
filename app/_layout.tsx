import { Stack, router } from 'expo-router';
import { Button } from 'react-native';
export default function () {
    return (
    <Stack>
        <Stack.Screen name="notes" options={{ headerRight: () => <Button title="Press Me" onPress={() => router.push("/addWorkout")} />}} />
        <Stack.Screen name="addWorkout" options={{}} />
    </Stack>
    );
}