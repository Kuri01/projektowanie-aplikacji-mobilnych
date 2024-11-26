import './src/i18n';
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import FormScreen from './src/FormScreen';
import SummaryScreen from './src/SummaryScreen';
import { RootStackParamList } from './src/types';

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
    const { t } = useTranslation();

    return (
        <PaperProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Form">
                    <Stack.Screen
                        name="Form"
                        component={FormScreen}
                        options={{ title: t('formTitle') }}
                    />
                    <Stack.Screen
                        name="Summary"
                        component={SummaryScreen}
                        options={{ title: t('summaryTitle') }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
};

export default App;