import { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import TaskForm from '../components/TaskForm';
import { getTask, editTask, getTasks } from '../api/tasks';
import useTasksStore from '../store/useTasksStore';
import { useRoute } from '@react-navigation/native';

const EditTaskScreen = ({ navigation }) => {
  const { setTasks } = useTasksStore();
  const route = useRoute();
  const { id } = route.params;
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      const response = await getTask(id);
      setInitialValues({
        title: response.title,
        description: response.description,
        step: response.step,
      });
    };
    fetchTask();
  }, [id]);

  const handleEditTask = async (values) => {
    await editTask(id, values);
    const response = await getTasks();
    setTasks(response);
    navigation.goBack();
  };

  if (!initialValues) {
    return <ActivityIndicator size="large" color="#8a2be2" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <TaskForm initialValues={initialValues} onSubmit={handleEditTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EditTaskScreen;