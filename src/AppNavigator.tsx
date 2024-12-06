import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import TaskListScreen from './screens/TaskListScreen';
import TaskDetailsScreen from './screens/TaskDetailsScreen';
import {Task} from './types';

export type RootStackParamList = {
    TaskList: undefined;
    TaskDetails: { task: Task; onUpdate: (updatedTask: Task) => void };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="TaskList" component={TaskListScreen} options={{title: 'Lista zadań'}}/>
                <Stack.Screen name="TaskDetails" component={TaskDetailsScreen} options={{title: 'Szczegóły zadania'}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;