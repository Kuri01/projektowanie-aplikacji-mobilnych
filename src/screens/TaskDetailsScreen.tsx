import React, {useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../AppNavigator';
import {Task} from '../types';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type Props = NativeStackScreenProps<RootStackParamList, 'TaskDetails'>;

const TaskDetailsScreen: React.FC<Props> = ({route, navigation}) => {
    const {task, onUpdate} = route.params;
    const [currentTask, setCurrentTask] = useState<Task>(task);

    const toggleDone = () => {
        const updated = {...currentTask, done: !currentTask.done};
        setCurrentTask(updated);
        onUpdate(updated);
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <MaterialIcons
                name={currentTask.done ? 'check-circle' : 'radio-button-unchecked'}
                size={100}
                style={styles.icon}
            />
            <Text style={styles.title}>{currentTask.title}</Text>
            <Text style={styles.description}>{currentTask.description}</Text>

            <Button
                title={currentTask.done ? 'Oznacz jako niewykonane' : 'Oznacz jako wykonane'}
                onPress={toggleDone}
            />
        </View>
    );
};

export default TaskDetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    icon: {
        marginBottom: 20
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 10
    },
    description: {
        fontSize: 16,
        color: '#333',
        marginBottom: 30,
        textAlign: 'center'
    }
});