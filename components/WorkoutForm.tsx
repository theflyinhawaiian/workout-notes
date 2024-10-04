import { LocalDateTime } from "@js-joda/core";
import { useEffect, useState } from "react";
import { TextInput, Pressable, Text, FlatList, View, Button } from "react-native";
import { SetModel, Exercise } from "../model/Exercise";
import SetDisplay from "./SetDisplay";
import Dropdown from "react-native-select-dropdown";
import { useSQLiteContext } from "expo-sqlite/next";
import workoutRepository from "../data/workoutRepository";

interface WorkoutFormProps {
    onSave: (data: Exercise) => void
}

export default function(props: WorkoutFormProps){
    const db = useSQLiteContext();
    const [sets, setSets] = useState<SetModel[]>([]);
    const [pastExerciseNames, setPastExerciseNames] = useState<String[]>([]);
    const [newExerciseName, setNewExerciseName] = useState<string>("");
    const [newSetAmount, setNewSetAmount] = useState<string>();
    const [newSetReps, setNewSetReps] = useState<string>();
    const [addingNewWorkout, setAddingNewWorkout] = useState(false);

    const dropdownItems = [
        { title: "yeetus" },
        { title: "mcsqueetus" },
        { title: "cletus" },
        { title: "peetus" }
    ];

    useEffect(() => {
        const fetchExerciseNames = async () => {
            const names = await workoutRepository.getExerciseNames(db);

            setPastExerciseNames(names);
        };

        fetchExerciseNames();
    }, []);

    const workoutNameEntry = addingNewWorkout ?
        (<TextInput placeholder="Workout name here..." />) :
        (<Dropdown 
            data={dropdownItems}
            onSelect={selectedItem => console.log(selectedItem)}
            renderItem={(item, idx, isSelected) => 
            <View>
                <Text>{item.title}</Text>
            </View>}
            renderButton={(selectedItem, isOpened) => 
            <View style={{flexDirection: "row", justifyContent: "center"}}>
                <Text>What do</Text>
            </View>} />);
    
    return (
        <>
        <View style={{flexDirection: "row", justifyContent: "center"}}>
            {workoutNameEntry}
            <Text>Or</Text>
            <Button 
                title={addingNewWorkout ? "Select a workout" : "Add a workout"}
                onPress={() => setAddingNewWorkout(!addingNewWorkout)} />

        </View>
        <FlatList data={sets} renderItem={x => <SetDisplay data={x.item} />} />
	 <TextInput onChangeText={text => setNewSetAmount(text)} />
        <TextInput onChangeText={text => setNewSetReps(text)} />
        <Pressable onPress={() => props.onSave({ title: newExerciseName, sets})}>
            <Text style={{fontSize: 32, color: "gray"}}>Save</Text>
        </Pressable>
        </>
    );
}