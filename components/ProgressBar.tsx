import React from 'react';
import {View, StyleSheet} from 'react-native';

type ProgressBarProps = {
    progress: number;
};

export function ProgressBar({progress}: ProgressBarProps) {
    return (
        <View style={styles.container}>
            <View style={[styles.fill, {flex: progress}]}/>
            <View style={[styles.empty, {flex: 1 - progress}]}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 20,
        backgroundColor: '#ccc',
        borderRadius: 4,
        overflow: 'hidden',
        marginVertical: 8,
    },
    fill: {
        backgroundColor: '#3b82f6',
    },
    empty: {
        backgroundColor: 'transparent',
    },
});