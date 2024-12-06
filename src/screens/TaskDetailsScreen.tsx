import React, {useState} from 'react';
import {View, Text, Button, StyleSheet, Alert} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../AppNavigator';
import {Task} from '../types';
import {MaterialIcons} from '@expo/vector-icons';

type Props = NativeStackScreenProps<RootStackParamList, 'TaskDetails'>;

const TaskDetailsScreen: React.FC<Props> = ({route, navigation}) => {
    const {task, onUpdate, onDelete} = route.params;
    const [currentTask, setCurrentTask] = useState<Task>(task);

    const toggleDone = () => {
        const updated = {...currentTask, done: !currentTask.done};
        setCurrentTask(updated);
        onUpdate(updated);
        navigation.goBack();
    };

    const handleEdit = () => {
        navigation.navigate('AddEditTask', {
            task: currentTask,
            onSave: (updatedTask: Task) => {
                setCurrentTask(updatedTask);
                onUpdate(updatedTask);
                navigation.goBack();
            },
        });
    };

    const handleDelete = () => {
        Alert.alert(
            'Usuń zadanie',
            'Czy na pewno chcesz usunąć to zadanie?',
            [
                {text: 'Anuluj', style: 'cancel'},
                {
                    text: 'Usuń',
                    style: 'destructive',
                    onPress: () => {
                        onDelete(currentTask.id);
                        navigation.goBack();
                    },
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <MaterialIcons
                name={currentTask.done ? 'check-circle' : 'radio-button-unchecked'}
                size={100}
                color={currentTask.done ? 'green' : 'red'}
                style={styles.icon}
            />
            <Text style={styles.title}>{currentTask.title}</Text>
            <Text style={styles.description}>{currentTask.description}</Text>

            <View style={styles.buttonsContainer}>
                <Button
                    title={currentTask.done ? 'Oznacz jako niewykonane' : 'Oznacz jako wykonane'}
                    onPress={toggleDone}
                />
            </View>

            <View style={{marginTop: 20}}>
                <Button title="Edytuj zadanie" onPress={handleEdit}/>
            </View>

            <View style={{marginTop: 20}}>
                <Button title="Usuń zadanie" onPress={handleDelete} color="red"/>
            </View>
        </View>
    );
};

export default TaskDetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
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
    },
    buttonsContainer: {
        width: '100%',
        marginBottom: 10
    }
});