import { useEffect, useState } from "react";
import { TextInput, Pressable, Text, Button, StyleSheet, View } from "react-native";
import { SetModel, Exercise } from "../model/Exercise";
import SetDisplay from "./SetDisplay";
import { useSQLiteContext } from "expo-sqlite/next";
import workoutRepository from "../data/workoutRepository";
import HorizontalStack from "./HorizontalStack";
import WorkoutsDropdown from "./WorkoutsDropdown";
import { Ionicons } from "@expo/vector-icons";
import List from "./List";
import { Snackbar as ErrorMessageBar } from "react-native-paper";

interface ExerciseFormProps {
    onSave: (data: Exercise) => void
}

export default function(props: ExerciseFormProps){
    const db = useSQLiteContext();
    const [sets, setSets] = useState<SetModel[]>([]);
    const [pastExerciseNames, setPastExerciseNames] = useState<string[]>([]);
    const [newExerciseName, setNewExerciseName] = useState<string>("");
    const [newSetAmountText, setNewSetAmountText] = useState<string>("");
    const [newSetRepsText, setNewSetRepsText] = useState<string>("");
    const [addingNewWorkout, setAddingNewWorkout] = useState(false);
    const [error, setError] = useState({ message: "", shouldDisplay: false });
    const { onSave } = props;

    useEffect(() => {
        const fetchExerciseNames = async () => {
            const names = await workoutRepository.getExerciseNames(db);

            setPastExerciseNames(names);
        };

        fetchExerciseNames();
    }, []);

    const isValid = (val: number) => !isNaN(val) && val >= 0; 
    
    const addSet = () => {
        const setAmtValue = Number(newSetAmountText);
        const setRepsValue = Number(newSetRepsText);

        if(!isValid(setAmtValue) || !isValid(setRepsValue) || setRepsValue === 0){
            setError({ message: "Need valid value for amount and reps", shouldDisplay: true });
            return;
        }

        setSets([...sets, { amount: setAmtValue, reps: setRepsValue }]);
        setNewSetAmountText("");
        setNewSetRepsText("");
    }

    const saveExercise = () => {

        if(newExerciseName.length == 0) {
            setError({ message: "Need an exercise name", shouldDisplay: true });
            return;
        }

        if(sets.length == 0){
            setError({ message: "Add some sets", shouldDisplay: true });
            return;
        }

        onSave({ title: newExerciseName, sets: sets })
        setSets([]);
        setNewSetAmountText("");
        setNewSetRepsText("");
        setNewExerciseName("");
    }

    // If we have no workouts or the user has selected to add a new workout, 
    // we use a TextInput instead of dropdown
    const workoutNameEntry = pastExerciseNames.length == 0 || addingNewWorkout ?
        (<TextInput 
            style={styles.textInput} 
            placeholder="Exercise name here..." 
            onChangeText={x => setNewExerciseName(x)} 
            value={newExerciseName}/>) :
        (<WorkoutsDropdown workouts={pastExerciseNames} onItemSelected={x => setNewExerciseName(x)} />);
    
    return (
        <>
        <HorizontalStack>
            {workoutNameEntry}
            {/* We only want to display the 'or' + control toggle if workout names exist */}
            {pastExerciseNames.length > 0 && 
            (<>
            <Text style={{ marginHorizontal: 10 }}>or</Text>
            <Button 
                title={addingNewWorkout ? "Select a workout" : "Add a workout"}
                onPress={() => setAddingNewWorkout(!addingNewWorkout)} />
            </>)}
        </HorizontalStack>
        {sets.length == 0 
            ? <Text style={styles.setsMargin}>Add some sets:</Text>
            : <List listStyle={styles.setsMargin} data={sets} renderItem={x => <SetDisplay data={x.item} />} />}
        <HorizontalStack>
            <TextInput 
                style={styles.textInput} 
                placeholder="amount" 
                keyboardType="numeric" 
                onChangeText={text => setNewSetAmountText(text)} 
                value={newSetAmountText} />
            <Text style={{ margin: 10 }}>x</Text>
            <TextInput 
                style={styles.textInput} 
                placeholder="reps" 
                keyboardType="numeric" 
                onChangeText={text => setNewSetRepsText(text)} 
                value={newSetRepsText} />
            <Ionicons style={styles.addIcon} name="add-circle-outline" onPress={() => addSet()} size={24} />
        </HorizontalStack>
        <View style={{ flexDirection: "row-reverse" }}>
            <Pressable onPress={() => saveExercise()}>
                <Text style={{ fontSize: 32, color: "gray" }}>Next</Text>
            </Pressable>
        </View>
        <ErrorMessageBar
            visible={error.shouldDisplay}
            duration={3000}
            onDismiss={() => setError({ ...error, shouldDisplay: false })}
            style={{ width: "80%" }}>
                {error.message}
        </ErrorMessageBar>
        </>
    );
}

const styles = StyleSheet.create({
    textInput: { fontSize: 18, borderWidth: 1, borderColor: "#8a8a8a", padding: 5, borderRadius: 10 },
    addIcon: { marginLeft: 10 },
    setsMargin: { marginTop: 5, marginBottom: 10 }
});