import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../AppNavigator';
import {Task} from '../types';
import * as Crypto from 'expo-crypto';

type Props = NativeStackScreenProps<RootStackParamList, 'AddEditTask'>;

const AddEditTaskScreen: React.FC<Props> = ({route, navigation}) => {
    const {task, onSave} = route.params;
    const [title, setTitle] = useState<string>(task ? task.title : '');
    const [description, setDescription] = useState<string>(task ? task.description : '');

    const handleSave = async () => {
        if (task) {
            const updatedTask: Task = {...task, title, description};
            onSave(updatedTask);
        } else {
            const randomStr = Date.now().toString() + Math.random().toString();
            const id = await Crypto.digestStringAsync(
                Crypto.CryptoDigestAlgorithm.SHA256,
                randomStr
            );

            const newTask: Task = {
                id,
                title,
                description,
                done: false,
            };
            onSave(newTask);
        }
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Tytuł zadania:</Text>
            <TextInput
                style={styles.input}
                placeholder="Wpisz tytuł"
                value={title}
                onChangeText={setTitle}
            />

            <Text style={styles.label}>Opis zadania:</Text>
            <TextInput
                style={styles.input}
                placeholder="Wpisz opis"
                value={description}
                onChangeText={setDescription}
            />

            <Button title="Zapisz" onPress={handleSave}/>
        </View>
    );
};

export default AddEditTaskScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff'
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        marginTop: 20
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginTop: 5
    }
});