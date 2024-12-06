import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import TaskListScreen from './screens/TaskListScreen';
import TaskDetailsScreen from './screens/TaskDetailsScreen';
import AddEditTaskScreen from './screens/AddEditTaskScreen';
import {Task} from './types';

export type RootStackParamList = {
    TaskList: undefined;
    TaskDetails: { task: Task; onUpdate: (updatedTask: Task) => void; onDelete: (taskId: string) => void };
    AddEditTask: { task?: Task; onSave: (task: Task) => void };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="TaskList"
                    component={TaskListScreen}
                    options={{title: 'Lista zadań'}}
                />
                <Stack.Screen
                    name="TaskDetails"
                    component={TaskDetailsScreen}
                    options={{title: 'Szczegóły zadania'}}
                />
                <Stack.Screen
                    name="AddEditTask"
                    component={AddEditTaskScreen}
                    options={({route}) => ({
                        title: route.params?.task ? 'Edytuj zadanie' : 'Dodaj zadanie'
                    })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;