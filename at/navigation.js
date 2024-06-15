// src/navigation.js
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import TaskListScreen from './screens/TaskListScreen';
import AddTaskScreen from './screens/AddTaskScreen';
import EditTaskScreen from './screens/EditTaskScreen';

const AppNavigator = createStackNavigator(
  {
    TaskList: TaskListScreen,
    AddTask: AddTaskScreen,
    EditTask: EditTaskScreen,
  },
  {
    initialRouteName: 'TaskList',
  }
);

export default createAppContainer(AppNavigator);
