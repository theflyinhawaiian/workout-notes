import { Slot, Stack } from 'expo-router';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import workoutRepository from "../data/workoutRepository";
import AddWorkoutButton from '../components/AddWorkoutButton';
import { SQLiteProvider } from 'expo-sqlite/next';

export default function () {
    return (
    <SafeAreaView style={styles.container}>
        <SQLiteProvider databaseName="workoutNotes.db" onInit={workoutRepository.init}>
            <Slot />
        </SQLiteProvider>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
        backgroundColor: '#fff',
        alignItems: "flex-start",
        justifyContent: 'space-around',
    },
});