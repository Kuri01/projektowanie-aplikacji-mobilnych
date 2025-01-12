import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from './screens/HomeScreen';
import {AsyncTaskScreen} from './screens/AsyncTaskScreen';
import {IntentServiceScreen} from './screens/IntentServiceScreen';

export type RootStackParamList = {
    Home: undefined;
    AsyncTask: undefined;
    IntentService: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen}/>
                <Stack.Screen name="AsyncTask" component={AsyncTaskScreen}/>
                <Stack.Screen name="IntentService" component={IntentServiceScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}