import { Pressable, View, Text } from "react-native";
import HorizontalDivider from "../components/HorizontalDivider";

export default function Settings () {

    const exportData = () => {
        // Placeholder for export functionality
        console.log("Exporting data...");
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