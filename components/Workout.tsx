import { FlatList, View } from 'react-native';
import { WorkoutProps } from "../model/Workout";
import Exercise from "./Exercise";
import React from 'react';

const Workout : React.FC<WorkoutProps> = ({ style, data }) => {
    return (
    <View style={style}>
        <FlatList data={data.exercises} renderItem={x => <Exercise key={x.index} data={x.item} />} />
    </View>
    );
}

export default Workout;