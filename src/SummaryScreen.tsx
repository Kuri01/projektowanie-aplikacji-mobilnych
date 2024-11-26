import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';

import { RootStackParamList } from './types';

type SummaryScreenRouteProp = RouteProp<RootStackParamList, 'Summary'>;
type SummaryScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Summary'>;

type Props = {
    route: SummaryScreenRouteProp;
    navigation: SummaryScreenNavigationProp;
};

const SummaryScreen: React.FC<Props> = ({ route }) => {
    const { t } = useTranslation();

    const { formData } = route.params;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.label}>
                {t('firstNameLabel')}
                <Text style={styles.value}>{formData.firstName}</Text>
            </Text>
            <Text style={styles.label}>
                {t('lastNameLabel')}
                <Text style={styles.value}>{formData.lastName}</Text>
            </Text>
            <Text style={styles.label}>
                {t('cityLabel')}
                <Text style={styles.value}>{formData.city}</Text>
            </Text>
            <Text style={styles.label}>
                {t('streetLabel')}
                <Text style={styles.value}>{formData.street}</Text>
            </Text>
            <Text style={styles.label}>
                {t('houseNumberLabel')}
                <Text style={styles.value}>{formData.houseNumber}</Text>
            </Text>
            <Text style={styles.label}>
                {t('birthDateLabel')}
                <Text style={styles.value}>{formData.birthDate}</Text>
            </Text>
            <Text style={styles.label}>
                {t('genderLabel')}
                <Text style={styles.value}>{formData.gender}</Text>
            </Text>
            <Text style={styles.label}>
                {t('hobbiesLabel')}
                <Text style={styles.value}>
                    {formData.hobbies.length > 0
                        ? formData.hobbies.map((id) => t(`hobby.${id}`)).join(', ')
                        : t('no')}
                </Text>
            </Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        fontWeight: 'bold',
    },
    value: {
        fontWeight: 'normal',
    },
});

export default SummaryScreen;