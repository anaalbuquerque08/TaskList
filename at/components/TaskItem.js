
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { deleteTask } from '../api/tasks';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const TaskItem = ({ task, onMoveTask, onDelete }) => {
  const navigation = useNavigation();

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      onDelete(id);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.description}>{task.description}</Text>
      <View style={styles.actions}>
        <TouchableOpacity
          onPress={() => navigation.navigate('EditTask', { id: task.id })}
          style={[styles.button, { backgroundColor: '#8a2be2' }]}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDelete(task.id)}
          style={[styles.button, { backgroundColor: '#ff6347' }]}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
        {task.step === 'Para fazer' && (
          <TouchableOpacity onPress={() => onMoveTask(task.id, 'Em andamento')} style={[styles.arrowButton, styles.downArrowButton]}>
            <AntDesign name="downcircle" size={24} color="#666666" />
          </TouchableOpacity>
        )}
        {task.step === 'Em andamento' && (
          <>
            <TouchableOpacity onPress={() => onMoveTask(task.id, 'Para fazer')} style={[styles.arrowButton, styles.upArrowButton]}>
              <AntDesign name="upcircle" size={24} color="#666666" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onMoveTask(task.id, 'Pronto')} style={[styles.arrowButton, styles.downArrowButton]}>
              <AntDesign name="downcircle" size={24} color="#666666" />
            </TouchableOpacity>
          </>
        )}
        {task.step === 'Pronto' && (
          <TouchableOpacity onPress={() => onMoveTask(task.id, 'Em andamento')} style={[styles.arrowButton, styles.upArrowButton]}>
            <AntDesign name="upcircle" size={24} color="#666666" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 5,
    marginHorizontal: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'start',
    alignItems: 'center',
  },
  button: {
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 4,
    paddingTop: 5,
    paddingBottom: 5,
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  arrowButton: {
    padding: 5,
  },
  upArrowButton: {
    backgroundColor: 'transparent',
    marginLeft: 5,
  },
  downArrowButton: {
    backgroundColor: 'transparent',
    marginLeft: 5,
  },
});

export default TaskItem;