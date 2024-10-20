import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

export default function Calculator() {
    const [expression, setExpression] = useState('');
    const [result, setResult] = useState('');

    const handlePress = (value: string) => {
        setExpression((prev) => prev + value);
    };

    const calculateResult = () => {
        try {
            const evalResult = eval(expression);
            setResult(evalResult.toString());
        } catch (error) {
            setResult('Błąd');
        }
    };

    const clear = () => {
        setExpression('');
        setResult('');
    };

    return (
            <View style={styles.container}>
                <TextInput
                    label="Działanie"
                    value={expression}
                    style={styles.input}
                    editable={false}
                />
                <TextInput
                    label="Wynik"
                    value={result}
                    style={styles.input}
                    editable={false}
                />
                <View style={styles.row}>
                    <Button mode="contained" onPress={() => handlePress('1')}>1</Button>
                    <Button mode="contained" onPress={() => handlePress('2')}>2</Button>
                    <Button mode="contained" onPress={() => handlePress('3')}>3</Button>
                    <Button mode="contained" onPress={() => handlePress('+')}>+</Button>
                </View>
                <View style={styles.row}>
                    <Button mode="contained" onPress={() => handlePress('4')}>4</Button>
                    <Button mode="contained" onPress={() => handlePress('5')}>5</Button>
                    <Button mode="contained" onPress={() => handlePress('6')}>6</Button>
                    <Button mode="contained" onPress={() => handlePress('-')}>-</Button>
                </View>
                <View style={styles.row}>
                    <Button mode="contained" onPress={() => handlePress('7')}>7</Button>
                    <Button mode="contained" onPress={() => handlePress('8')}>8</Button>
                    <Button mode="contained" onPress={() => handlePress('9')}>9</Button>
                    <Button mode="contained" onPress={() => handlePress('*')}>×</Button>
                </View>
                <View style={styles.row}>
                    <Button mode="contained" onPress={clear}>C</Button>
                    <Button mode="contained" onPress={() => handlePress('0')}>0</Button>
                    <Button mode="contained" onPress={calculateResult}>=</Button>
                    <Button mode="contained" onPress={() => handlePress('/')}>÷</Button>
                </View>
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        marginTop: 50,
        justifyContent: 'flex-start',
        backgroundColor: '#f5f5f5',
    },
    input: {
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
});