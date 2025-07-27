import { Pressable, View, Text } from "react-native";
import HorizontalDivider from "../components/HorizontalDivider";
import workoutRepository from "../data/workoutRepository";
import { useSQLiteContext } from "expo-sqlite";
import * as FileSystem from 'expo-file-system';
import { showSnackbar } from "../util/snackbars";
import * as Sharing from 'expo-sharing';
import { DateTime } from "luxon";

export default function Settings () {
    const db = useSQLiteContext();

    const exportData = async () => {
        const workouts = await workoutRepository.getAll(db);

        const dataString = JSON.stringify(workouts, null, 2);

        const fileName = `workout_data_${DateTime.now().toFormat('yyyy-MM-dd')}.json`;
        const fileUri = `${FileSystem.cacheDirectory}/${fileName}`;

        await FileSystem.writeAsStringAsync(fileUri, dataString);

        showSnackbar(`Data exported to ${fileUri}`);
        await Sharing.shareAsync(fileUri);
    };

    return (
        <View style={{ width: '100%', flex: 1 }}>
            <Text style={{ fontSize: 24, margin: 20 }}>Extras Menu</Text>
            <HorizontalDivider />
            <Pressable onPress={() => exportData()}>
                <Text style={{ fontSize: 18, padding: 10 }}>Export Data</Text>
            </Pressable>
            <HorizontalDivider />
        </View>
    )
}