import { StyleSheet, View, Text, FlatList } from 'react-native';
import { ExerciseProps } from "../model/Exercise";
import React from 'react';
import SetDisplay from './SetDisplay';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#b3b3b3",
        margin: 5
    },
    headerBar: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingStart: 10,
        backgroundColor: "#ef3737"
    },
    exerciseText: {
        fontSize: 20,
        color: "white"
    },
    setText: {
        fontSize: 15,
        marginStart: 10
    }
});

const Exercise = (props: ExerciseProps) => {
    const { title, sets } = props.data
    return (
        <View style={styles.container}>
            <View style={styles.headerBar}>
                <Text style={styles.exerciseText}>{ title }</Text>
            </View>
            <FlatList style={{ marginTop: 5, marginBottom: 5}} data={sets} renderItem={x => <SetDisplay data={x.item} /> } />
        </View>
    )
}

export default Exercise;