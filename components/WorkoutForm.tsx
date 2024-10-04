import { useEffect, useState } from "react";
import { TextInput, Pressable, Text, Button } from "react-native";
import { SetModel, Exercise } from "../model/Exercise";
import SetDisplay from "./SetDisplay";
import { useSQLiteContext } from "expo-sqlite/next";
import workoutRepository from "../data/workoutRepository";
import HorizontalStack from "./HorizontalStack";
import WorkoutsDropdown from "./WorkoutsDropdown";

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
        "yeetus",
        "mcsqueetus",
        "cletus",
        "peetus"
    ];

    useEffect(() => {
        const fetchExerciseNames = async () => {
            const names = await workoutRepository.getExerciseNames(db);

            setPastExerciseNames(names);
        };

        fetchExerciseNames();
    }, []);

    // If we have no workouts or the user has selected to add a new workout, 
    // we use a TextInput instead of dropdown
    const workoutNameEntry = dropdownItems.length == 0 || addingNewWorkout ?
        (<TextInput placeholder="Workout name here..." />) :
        (<WorkoutsDropdown workouts={dropdownItems} />);
    
    return (
        <>
        <HorizontalStack>
            {workoutNameEntry}
            {/* We only want to display the 'or' + control toggle if workout names exist */}
            {dropdownItems.length > 0 && 
            (<>
            <Text style={{ marginHorizontal: 10 }}>or</Text>
            <Button 
                title={addingNewWorkout ? "Select a workout" : "Add a workout"}
                onPress={() => setAddingNewWorkout(!addingNewWorkout)} />
            </>)}
        </HorizontalStack>
        <List data={sets} renderItem={x => <SetDisplay data={x.item} />} />
        <HorizontalStack>
            <TextInput placeholder="amount" onChangeText={text => setNewSetAmount(text)} />
            <Text>x</Text>
            <TextInput placeholder="reps" onChangeText={text => setNewSetReps(text)} />
        </HorizontalStack>
        <Pressable onPress={() => props.onSave({ title: newExerciseName, sets})}>
            <Text style={{fontSize: 32, color: "gray"}}>Save</Text>
        </Pressable>
        </>
    );
}