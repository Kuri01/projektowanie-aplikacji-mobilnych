import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../AppNavigator';
import {Task} from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MaterialIcons} from '@expo/vector-icons';

type Props = NativeStackScreenProps<RootStackParamList, 'TaskList'>;

const STORAGE_KEY = '@tasks';

const TaskListScreen: React.FC<Props> = ({navigation}) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    const loadTasks = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
            if (jsonValue) {
                setTasks(JSON.parse(jsonValue));
            } else {
                setTasks([]);
            }
        } catch (e) {
            console.error('Error loading tasks:', e);
        }
    };

    const saveTasks = async (updatedTasks: Task[]) => {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
        } catch (e) {
            console.error('Error saving tasks:', e);
        }
    };

    useEffect(() => {
        loadTasks();
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate('AddEditTask', {
                            onSave: handleAddTask,
                        })
                    }
                >
                    <MaterialIcons name="add" size={30} style={{marginRight: 10}}/>
                </TouchableOpacity>
            ),
        });
    }, [navigation, tasks]);

    const handleAddTask = (newTask: Task) => {
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        saveTasks(updatedTasks);
    };

    const handleUpdateTask = (updatedTask: Task) => {
        const newTasks = tasks.map(t => (t.id === updatedTask.id ? updatedTask : t));
        setTasks(newTasks);
        saveTasks(newTasks);
    };

    const handleDeleteTask = (taskId: string) => {
        const filteredTasks = tasks.filter(t => t.id !== taskId);
        setTasks(filteredTasks);
        saveTasks(filteredTasks);
    };

    const renderItem = ({item}: { item: Task }) => (
        <TouchableOpacity
            style={[styles.itemContainer, item.done && styles.itemDone]}
            onPress={() =>
                navigation.navigate('TaskDetails', {
                    task: item,
                    onUpdate: handleUpdateTask,
                    onDelete: handleDeleteTask,
                })
            }
        >
            <MaterialIcons
                name={item.done ? 'check-circle' : 'radio-button-unchecked'}
                size={30}
                color={item.done ? 'green' : 'red'}
                style={styles.icon}
            />
            <View style={styles.textContainer}>
                <Text style={[styles.title, item.done && styles.textDone]}>{item.title}</Text>
                <Text style={[styles.description, item.done && styles.textDone]}>{item.description}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {tasks.length === 0 ? (
                <Text style={styles.noTasksText}>Brak zadań. Dodaj nowe zadanie!</Text>
            ) : (
                <FlatList
                    data={tasks}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                />
            )}
        </View>
    );
};

export default TaskListScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        marginVertical: 5,
        padding: 10,
        borderRadius: 5
    },
    itemDone: {
        opacity: 0.5
    },
    icon: {
        marginRight: 10
    },
    textContainer: {
        flexDirection: 'column'
    },
    title: {
        fontSize: 16,
        fontWeight: '600'
    },
    description: {
        fontSize: 14,
        color: '#555'
    },
    textDone: {
        textDecorationLine: 'line-through'
    },
    noTasksText: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 18,
        color: '#999'
    }
});