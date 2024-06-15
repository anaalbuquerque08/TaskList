
import { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, ScrollView } from 'react-native';
import { getTasks, updateTaskStep } from '../api/tasks';
import TaskItem from '../components/TaskItem';

const TaskListScreen = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleMoveTask = async (id, newStep) => {
    console.log(`Moving task ID: ${id} to ${newStep}`);
    try {
      await updateTaskStep(id, newStep);
      fetchTasks();
    } catch (error) {
      console.error('Error moving task:', error);
    }
  };

  const handleDeleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter(task => task.id !== id));
  };

  const renderTasksByStep = (step) => {
    const filteredTasks = tasks.filter(task => task.step === step);
    return (
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TaskItem task={item} onMoveTask={handleMoveTask} onDelete={handleDeleteTask} />
        )}
      />
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Para fazer</Text>
        {renderTasksByStep('Para fazer')}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Em andamento</Text>
        {renderTasksByStep('Em andamento')}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pronto</Text>
        {renderTasksByStep('Pronto')}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default TaskListScreen;




