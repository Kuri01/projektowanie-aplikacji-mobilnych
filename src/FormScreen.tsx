import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, Alert, Platform} from 'react-native';
import {TextInput, Button, Text, RadioButton} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {RootStackParamList, FormData} from './types';
import HobbySelect from './components/HobbySelect';
import AsyncStorage from '@react-native-async-storage/async-storage';

type FormScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Form'>;
type FormScreenRouteProp = RouteProp<RootStackParamList, 'Form'>;

type Props = {
    navigation: FormScreenNavigationProp;
    route: FormScreenRouteProp;
};

const STORAGE_KEY = '@user_form_data';

const FormScreen: React.FC<Props> = ({navigation}) => {
    const {t} = useTranslation();

    const initialFormData: FormData = {
        firstName: '',
        lastName: '',
        city: '',
        street: '',
        houseNumber: '',
        birthDate: '',
        gender: '',
        hobbies: [],
    };

    const [formData, setFormData] = useState<FormData>(initialFormData);

    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

    const genders = [t('male'), t('female'), t('other')];

    const validateForm = (): boolean => {
        const {firstName, lastName, city, street, houseNumber, birthDate, gender} = formData;
        if (!firstName || !lastName || !city || !street || !houseNumber || !birthDate || !gender) {
            Alert.alert(t('error'), t('allFieldsRequired'));
            return false;
        }
        return true;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            navigation.navigate('Summary', {formData});
        }
    };

    const onChangeDate = (event: any, selectedDate?: Date) => {
        if (Platform.OS === 'android') {
            setShowDatePicker(false);
        }
        if (selectedDate) {
            const formattedDate = selectedDate.toISOString().split('T')[0];
            setFormData({...formData, birthDate: formattedDate});
        }
    };

    const saveData = async () => {
        try {
            const jsonValue = JSON.stringify(formData);
            await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
            Alert.alert(t('success'), t('dataSaved'));
        } catch (e) {
            Alert.alert(t('error'), t('saveError'));
        }
    };

    const loadData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
            if (jsonValue != null) {
                const data: FormData = JSON.parse(jsonValue);
                setFormData(data);
                Alert.alert(t('success'), t('dataLoaded'));
            } else {
                Alert.alert(t('info'), t('noData'));
            }
        } catch (e) {
            Alert.alert(t('error'), t('loadError'));
        }
    };

    const clearForm = () => {
        setFormData(initialFormData);
        Alert.alert(t('success'), t('formCleared'));
    };

    const deleteData = async () => {
        try {
            await AsyncStorage.removeItem(STORAGE_KEY);
            Alert.alert(t('success'), t('dataDeleted'));
        } catch (e) {
            Alert.alert(t('error'), t('deleteError'));
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TextInput
                label={t('firstName')}
                value={formData.firstName}
                onChangeText={(text) => setFormData({...formData, firstName: text})}
                style={styles.input}
                mode="outlined"
            />
            <TextInput
                label={t('lastName')}
                value={formData.lastName}
                onChangeText={(text) => setFormData({...formData, lastName: text})}
                style={styles.input}
                mode="outlined"
            />
            <TextInput
                label={t('city')}
                value={formData.city}
                onChangeText={(text) => setFormData({...formData, city: text})}
                style={styles.input}
                mode="outlined"
            />
            <TextInput
                label={t('street')}
                value={formData.street}
                onChangeText={(text) => setFormData({...formData, street: text})}
                style={styles.input}
                mode="outlined"
            />
            <TextInput
                label={t('houseNumber')}
                value={formData.houseNumber}
                onChangeText={(text) => setFormData({...formData, houseNumber: text})}
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
                    onValueChange={(value) => setFormData({...formData, gender: value})}
                    value={formData.gender}
                >
                    {genders.map((gender) => (
                        <View key={gender} style={styles.radioButton}>
                            <RadioButton value={gender}/>
                            <Text>{gender}</Text>
                        </View>
                    ))}
                </RadioButton.Group>
            </View>
            <HobbySelect
                selectedHobbies={formData.hobbies}
                setSelectedHobbies={(hobbies) => setFormData({...formData, hobbies})}
            />
            <View style={styles.buttonContainer}>
                <Button mode="contained" onPress={saveData} style={styles.button}>
                    {t('save')}
                </Button>
                <Button mode="contained" onPress={loadData} style={styles.button}>
                    {t('load')}
                </Button>
                <Button mode="contained" onPress={clearForm} style={styles.button}>
                    {t('clear')}
                </Button>
                <Button mode="contained" onPress={deleteData} style={styles.button}>
                    {t('deleteData')}
                </Button>
                <Button mode="contained" onPress={handleSubmit} style={styles.button}>
                    {t('goToSummary')}
                </Button>
            </View>
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
    buttonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    button: {
        width: '100%',
        marginBottom: 8,
    },
});

export default FormScreen;