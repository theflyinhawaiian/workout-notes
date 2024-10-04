import { StyleSheet, View, Text, FlatList } from 'react-native';
import { ExerciseProps } from "../model/Exercise";
import React from 'react';

let styles = StyleSheet.create({
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

const Exercise : React.FC<ExerciseProps> = ({data: { title, sets }}) => {
    return (
        <View style={styles.container}>
            <View style={styles.headerBar}>
                <Text style={styles.exerciseText}>{ title }</Text>
            </View>
            <FlatList style={{ marginTop: 5, marginBottom: 5}}data={sets} renderItem={x => {
                let text = "";

                if(x.item.amount != undefined){
                    text = x.item.amount + " x " + x.item.reps;
                }else{
                    text = x.item.reps.toString();
                }

                return (
                    <Text style={styles.setText}>{text}</Text>
                )
            }} />
        </View>
    )
}

export default Exercise;