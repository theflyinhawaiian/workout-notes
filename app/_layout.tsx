import { Slot } from 'expo-router';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import workoutRepository from "../data/workoutRepository";
import { SQLiteProvider } from 'expo-sqlite/next';
import { PaperProvider } from 'react-native-paper';

export default function () {
    return (
    <PaperProvider>
        <SafeAreaView style={styles.container}>
            <SQLiteProvider databaseName="workoutNotes.db" onInit={workoutRepository.init}>
                <Slot />
            </SQLiteProvider>
        </SafeAreaView>
    </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
        backgroundColor: '#fff',
        alignItems: "center",
        justifyContent: 'center',
    },
});