import { FlatList, View } from 'react-native';
import { WorkoutProps } from "../model/WorkoutProps";
import Exercise from "./Exercise";
import React from 'react';

const Workout : React.FC<WorkoutProps> = ({ style, exercises }) => {
    return (
    <View style={style}>
        <FlatList data={exercises} renderItem={x => <Exercise key={x.index} {...x.item} />} />
    </View>
    );
}

export default Workout;