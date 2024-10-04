import { View, Text } from "react-native";
import Dropdown from "react-native-select-dropdown";
import Ionicons from '@expo/vector-icons/Ionicons';
import HorizontalStack from "./HorizontalStack";

interface WorkoutsDropdownProps {
    workouts: string[];
}

interface DropdownItem {
    title: string;
}

export default function(props: WorkoutsDropdownProps){
    const dropdownItems = props.workouts.map(x => { return { title: x }});
    return (
        <Dropdown 
            data={dropdownItems}
            onSelect={(selectedItem: DropdownItem) => console.log(selectedItem)}
            renderItem={(item: DropdownItem, idx: number, isSelected: boolean) => 
            <View>
                <Text>{item.title}</Text>
            </View>}
            renderButton={(selectedItem: DropdownItem, isOpened: boolean) => 
            <View>
                <HorizontalStack>
                    <Text style={{ marginHorizontal: 10 }}>Select a workout</Text>
                    <Ionicons name="caret-down" />
                </HorizontalStack>
            </View>} />
    );
}