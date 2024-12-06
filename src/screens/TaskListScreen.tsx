import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../AppNavigator';
import {Task} from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type Props = NativeStackScreenProps<RootStackParamList, 'TaskList'>;

const STORAGE_KEY = '@tasks';

const TaskListScreen: React.FC<Props> = ({navigation}) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    const loadTasks = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
            if (jsonValue != null) {
                setTasks(JSON.parse(jsonValue));
            } else {
                const initialTasks: Task[] = [];
                for (let i = 1; i <= 16; i++) {
                    initialTasks.push({
                        id: i,
                        title: `Zadanie nr ${i}`,
                        description: `Szczegóły zadania nr ${i}`,
                        done: false,
                    });
                }
                setTasks(initialTasks);
                await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(initialTasks));
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

    const handleUpdateTask = (updatedTask: Task) => {
        const newTasks = tasks.map(t => (t.id === updatedTask.id ? updatedTask : t));
        setTasks(newTasks);
        saveTasks(newTasks);
    };

    const renderItem = ({item}: { item: Task }) => {
        return (
            <TouchableOpacity
                style={[styles.itemContainer, item.done && styles.itemDone]}
                onPress={() =>
                    navigation.navigate('TaskDetails', {
                        task: item,
                        onUpdate: handleUpdateTask,
                    })
                }
            >
                <MaterialIcons
                    name={item.done ? 'check-circle' : 'radio-button-unchecked'}
                    size={30}
                    style={styles.icon}
                />
                <View style={styles.textContainer}>
                    <Text style={[styles.title, item.done && styles.textDone]}>{item.title}</Text>
                    <Text style={[styles.description, item.done && styles.textDone]}>{item.description}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={tasks}
                keyExtractor={item => String(item.id)}
                renderItem={renderItem}
            />
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
    }
});