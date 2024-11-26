import React, {useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Button, Checkbox, Text, Modal, Portal} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import hobbies from '../config/hobbies.json';

interface Hobby {
    id: string;
}

interface HobbySelectProps {
    selectedHobbies: string[];
    setSelectedHobbies: (hobbies: string[]) => void;
}

const HobbySelect: React.FC<HobbySelectProps> = ({selectedHobbies, setSelectedHobbies}) => {
    const {t} = useTranslation();

    const [visible, setVisible] = useState<boolean>(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const toggleHobby = (id: string) => {
        if (selectedHobbies.includes(id)) {
            setSelectedHobbies(selectedHobbies.filter((hobby) => hobby !== id));
        } else {
            setSelectedHobbies([...selectedHobbies, id]);
        }
    };

    return (
        <View style={styles.container}>
            <Button mode="outlined" onPress={showModal}>
                {t('selectHobbies')}
            </Button>
            <Text style={styles.selectedText}>
                {selectedHobbies.length > 0
                    ? selectedHobbies.map((id) => t(`hobby.${id}`)).join(', ')
                    : t('noHobbiesSelected')}
            </Text>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal}>
                    <View style={styles.modalContent}>
                        <ScrollView>
                            {hobbies.map((hobby: Hobby) => (
                                <Checkbox.Item
                                    key={hobby.id}
                                    label={t(`hobby.${hobby.id}`)}
                                    status={selectedHobbies.includes(hobby.id) ? 'checked' : 'unchecked'}
                                    onPress={() => toggleHobby(hobby.id)}
                                    uncheckedColor="gray" // Set the color for the unchecked box outline
                                />
                            ))}
                        </ScrollView>
                        <Button mode="contained" onPress={hideModal} style={styles.closeButton}>
                            {t('close')}
                        </Button>
                    </View>
                </Modal>
            </Portal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    selectedText: {
        marginTop: 8,
        fontSize: 16,
        color: '#555',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        marginHorizontal: 20,
        marginVertical: 100,
        borderRadius: 8,
        maxHeight: '80%',
    },
    closeButton: {
        marginTop: 16,
    },
});

export default HobbySelect;