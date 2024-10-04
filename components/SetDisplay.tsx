import { SetModel } from "../model/Exercise";
import { Text } from "react-native";

export interface SetDisplayProps {
    data: SetModel
}

export default function(props: SetDisplayProps){
    const {amount: weight, reps} = props.data;
    return (
        <Text>{weight} x {reps}</Text>
    );
}