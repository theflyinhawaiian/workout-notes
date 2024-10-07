import { View, Text } from "react-native";
import Dropdown from "react-native-select-dropdown";
import Ionicons from '@expo/vector-icons/Ionicons';
import HorizontalStack from "./HorizontalStack";

interface WorkoutsDropdownProps {
    workouts: string[];
    onItemSelected: (x: string) => void;
}

interface DropdownItem {
    title: string;
}

export default function(props: WorkoutsDropdownProps){
    const { onItemSelected, workouts } = props;
    const dropdownItems = workouts.map(x => { return { title: x }});
    return (
        <Dropdown 
            data={dropdownItems}
            onSelect={(selectedItem: DropdownItem) => onItemSelected(selectedItem.title)}
            renderItem={(item: DropdownItem, idx: number, isSelected: boolean) => {
                const bgColor = isSelected ? { backgroundColor: "#9393f1f1" } : null;
                return (
                    <View style={{padding: 10, ...bgColor}}>
                        <Text>{item.title}</Text>
                    </View>);
            }}
            renderButton={(selectedItem: DropdownItem, isOpened: boolean) => 
            {
                const titleText = !isOpened && selectedItem !== null 
                    ? selectedItem.title 
                    : "Select a workout"; 
                return (<View>
                        <HorizontalStack>
                            <Text style={{ marginHorizontal: 10 }}>{titleText}</Text>
                            <Ionicons name="caret-down" />
                        </HorizontalStack>
                    </View>);}} />
    );
}