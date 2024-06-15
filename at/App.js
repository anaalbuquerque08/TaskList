import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import AddTaskScreen from './screens/AddTaskScreen';
import TaskListScreen from './screens/TaskListScreen';
import EditTaskScreen from './screens/EditTaskScreen';
import { NativeBaseProvider } from 'native-base';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TaskListStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TaskList" component={TaskListScreen} options={{ headerShown: false }} />
      <Stack.Screen name="EditTask" component={EditTaskScreen} options={{ title: 'Editar tarefa' }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({color, size }) => {
              if (route.name === 'Tarefas') {
                return <FontAwesome name="tasks" size={size} color={color} />;
              } else if (route.name === 'Adicionar') {
                return <Entypo name="add-to-list" size={size} color={color} />;
              }
            },
            tabBarLabelStyle: { fontSize: 12 },
            tabBarStyle: { flexDirection: 'column' },
          })}
          tabBarOptions={{
            activeTintColor: '#8a2be2',
            inactiveTintColor: 'gray',
            labelPosition: 'below-icon',
          }}
        >
          <Tab.Screen name="Tarefas" component={TaskListStack} options={{ title: 'Tarefas'}} />
          <Tab.Screen name="Adicionar" component={AddTaskScreen} options={{ title: 'Nova Tarefa' }} />
        </Tab.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}


