import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet, Alert} from 'react-native';
import {backgroundTaskService} from '../services/backgroundTaskService';
import {ProgressBar} from '../components/ProgressBar';

export function IntentServiceScreen() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const onProgress = (val: number) => {
            setProgress(val);
        };
        const onFinish = (val: number) => {
            setProgress(val);
            Alert.alert('Koniec', 'Zadanie w tle zakończone');
        };

        backgroundTaskService.on('PROGRESS_EVENT', onProgress);
        backgroundTaskService.on('FINISH_EVENT', onFinish);
        
        return () => {
            backgroundTaskService.off('PROGRESS_EVENT', onProgress);
            backgroundTaskService.off('FINISH_EVENT', onFinish);
        };
    }, []);

    const startService = () => {
        setProgress(0);
        backgroundTaskService.startTask();
    };

    const stopService = () => {
        backgroundTaskService.stopTask();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>IntentService w React Native</Text>

            <ProgressBar progress={progress / 15}/>
            <Text style={styles.text}>Postęp: {progress} / 15</Text>

            <View style={styles.buttons}>
                <Button title="Start" onPress={startService}/>
                <Button title="Stop" onPress={stopService}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        marginBottom: 16,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    text: {
        textAlign: 'center',
        marginVertical: 8,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 16,
    },
});