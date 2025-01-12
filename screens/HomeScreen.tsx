import React from 'react';
import {View, Button, StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../App';

type HomeScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Home'
>;

type Props = {
    navigation: HomeScreenNavigationProp;
};

export function HomeScreen({navigation}: Props) {
    return (
        <View style={styles.container}>
            <Button
                title="Przejdź do AsyncTask"
                onPress={() => navigation.navigate('AsyncTask')}
            />
            <Button
                title="Przejdź do IntentService"
                onPress={() => navigation.navigate('IntentService')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        paddingHorizontal: 20,
    },
});