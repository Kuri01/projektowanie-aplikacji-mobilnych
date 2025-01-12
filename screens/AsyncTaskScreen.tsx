// screens/AsyncTaskScreen.tsx

import React, {useState, useRef} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {ProgressBar} from '../components/ProgressBar';

export function AsyncTaskScreen() {
    const [progress, setProgress] = useState(0);
    const intervalRef = useRef<NodeJS.Timer | null>(null);

    const startAsyncTask = () => {
        // Wyzeruj
        setProgress(0);

        // Wyczyść poprzedni interwał (jeśli jeszcze był)
        if (intervalRef.current) {
            // @ts-ignore
            clearInterval(intervalRef.current);
        }

        // Uruchamiamy symulację w tle
        intervalRef.current = setInterval(() => {
            setProgress(prev => {
                // gdy osiągnie 15, zatrzymaj
                if (prev >= 15) {
                    // @ts-ignore
                    if (intervalRef.current) clearInterval(intervalRef.current);
                    return prev;
                }
                return prev + 1;
            });
        }, 500); // co 0.5 sek lub 1 sek
    };

    const stopAsyncTask = () => {
        if (intervalRef.current) {
            // @ts-ignore
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>AsyncTask w React Native</Text>

            <ProgressBar progress={progress / 15}/>
            <Text style={styles.text}>Postęp: {progress} / 15</Text>

            <View style={styles.buttons}>
                <Button title="Start" onPress={startAsyncTask}/>
                <Button title="Stop" onPress={stopAsyncTask}/>
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