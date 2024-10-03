import { useState, useEffect, ReactNode } from 'react';
import { StyleSheet, Pressable, View, Text } from 'react-native';
import Workout from '../components/Workout';
import NoWorkoutsView from '../components/NoWorkoutsView';
import { Workout as WorkoutModel } from '../model/Workout';
import { useSQLiteContext } from 'expo-sqlite/next';
import workoutRepository from '../data/workoutRepository';
import AddWorkoutButton from '../components/AddWorkoutButton';

export default function () {
  let [selectedIndex, setSelectedIndex] = useState(0);
  let [workouts, setWorkouts] = useState<WorkoutModel[]>([]);
  let db = useSQLiteContext();

  useEffect(() => {
    const fetchData = async () => {
      console.log("fetching from notes page");
      let workouts = await workoutRepository.getAll(db);
      console.log(`retrieved ${workouts.length} workouts`);
      setWorkouts(workouts);
    };
    fetchData();
  }, []);

  let goNext = () => {
    if(selectedIndex < workouts.length - 1)
      setSelectedIndex(selectedIndex + 1);
  }

  let goPrev = () => {
    if(selectedIndex > 0)
      setSelectedIndex(selectedIndex - 1);
  }

  const innerContent = workouts.length == 0 
    ? (<View style={styles.workoutContainer}>
         <NoWorkoutsView />
       </View>)
    : (<>
        <View style={styles.dateNav}>
          <Pressable style={styles.navControlStyle} onPress={goPrev}>
            <Text style={styles.navControlText}>Prev</Text>
          </Pressable>
          <Text style={styles.headerStyle}>{workouts[selectedIndex].date}</Text>
          <Pressable style={styles.navControlStyle} onPress={goNext}>
            <Text style={styles.navControlText}>Next</Text>
          </Pressable>
        </View>
        <Workout data={workouts[selectedIndex]} style={styles.workoutContainer} />
      </>);

  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
        <AddWorkoutButton />
      </View>
      {innerContent}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%"
  },
  headerBar: {
    alignItems: "flex-end",
    width: "100%"
  },
  dateNav: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  workoutContainer: {
    flex: 10
  },
  headerStyle: { flex: 1, textAlign: "center", verticalAlign: "middle", fontSize: 30, marginTop: 10 },
  navControlStyle: { backgroundColor: "gray", justifyContent: "center", paddingStart: 10, paddingEnd: 10, borderRadius: 5 },
  navControlText: { color: "white", textAlign: "center", verticalAlign: "middle" }
});
