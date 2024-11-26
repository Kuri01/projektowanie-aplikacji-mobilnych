import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, Platform } from 'react-native';
import { TextInput, Button, Text, RadioButton } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { RootStackParamList, FormData } from './types';
import HobbySelect from './components/HobbySelect';

type FormScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Form'>;
type FormScreenRouteProp = RouteProp<RootStackParamList, 'Form'>;

type Props = {
    navigation: FormScreenNavigationProp;
    route: FormScreenRouteProp;
};

const FormScreen: React.FC<Props> = ({ navigation }) => {
    const { t } = useTranslation();

    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        city: '',
        street: '',
        houseNumber: '',
        birthDate: '',
        gender: '',
        hobbies: [],
    });

    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

    const genders = [t('male'), t('female'), t('other')];

    const validateForm = (): boolean => {
        const { firstName, lastName, city, street, houseNumber, birthDate, gender } = formData;
        if (!firstName || !lastName || !city || !street || !houseNumber || !birthDate || !gender) {
            Alert.alert(t('error'), t('allFieldsRequired'));
            return false;
        }
        return true;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            navigation.navigate('Summary', { formData });
        }
    };

    const onChangeDate = (event: any, selectedDate?: Date) => {
        if (Platform.OS === 'android') {
            setShowDatePicker(false);
        }
        if (selectedDate) {
            const formattedDate = selectedDate.toISOString().split('T')[0];
            setFormData({ ...formData, birthDate: formattedDate });
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TextInput
                label={t('firstName')}
                value={formData.firstName}
                onChangeText={(text) => setFormData({ ...formData, firstName: text })}
                style={styles.input}
                mode="outlined"
            />
            <TextInput
                label={t('lastName')}
                value={formData.lastName}
                onChangeText={(text) => setFormData({ ...formData, lastName: text })}
                style={styles.input}
                mode="outlined"
            />
            <TextInput
                label={t('city')}
                value={formData.city}
                onChangeText={(text) => setFormData({ ...formData, city: text })}
                style={styles.input}
                mode="outlined"
            />
            <TextInput
                label={t('street')}
                value={formData.street}
                onChangeText={(text) => setFormData({ ...formData, street: text })}
                style={styles.input}
                mode="outlined"
            />
            <TextInput
                label={t('houseNumber')}
                value={formData.houseNumber}
                onChangeText={(text) => setFormData({ ...formData, houseNumber: text })}
                style={styles.input}
                keyboardType="numeric"
                mode="outlined"
            />
            <View style={styles.datePickerContainer}>
                <Button mode="outlined" onPress={() => setShowDatePicker(true)}>
                    {t('selectBirthDate')}
                </Button>
                {formData.birthDate ? (
                    <Text style={styles.selectedDate}>{formData.birthDate}</Text>
                ) : null}
                {showDatePicker && (
                    <DateTimePicker
                        value={formData.birthDate ? new Date(formData.birthDate) : new Date()}
                        mode="date"
                        display="default"
                        onChange={onChangeDate}
                        maximumDate={new Date()}
                    />
                )}
            </View>
            <View style={styles.genderContainer}>
                <Text>{t('gender')}:</Text>
                <RadioButton.Group
                    onValueChange={(value) => setFormData({ ...formData, gender: value })}
                    value={formData.gender}
                >
                    {genders.map((gender) => (
                        <View key={gender} style={styles.radioButton}>
                            <RadioButton value={gender} />
                            <Text>{gender}</Text>
                        </View>
                    ))}
                </RadioButton.Group>
            </View>
            <HobbySelect
                selectedHobbies={formData.hobbies}
                setSelectedHobbies={(hobbies) => setFormData({ ...formData, hobbies })}
            />
            <Button mode="contained" onPress={handleSubmit} style={styles.submitButton}>
                {t('goToSummary')}
            </Button>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    input: {
        marginBottom: 16,
    },
    datePickerContainer: {
        marginBottom: 16,
    },
    selectedDate: {
        marginTop: 8,
        fontSize: 16,
        color: '#555',
    },
    genderContainer: {
        marginBottom: 16,
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    submitButton: {
        marginTop: 16,
    },
});

export default FormScreen;