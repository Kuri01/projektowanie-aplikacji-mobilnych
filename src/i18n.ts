import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { NativeModules, Platform } from 'react-native';

import pl from './locales/pl.json';
import en from './locales/en.json';

const resources = {
    en: { translation: en },
    pl: { translation: pl },
};

const getDeviceLanguage = () => {
    const locale =
        Platform.OS === 'ios'
            ? NativeModules.SettingsManager.settings.AppleLocale ||
            NativeModules.SettingsManager.settings.AppleLanguages[0]
            : NativeModules.I18nManager.localeIdentifier;

    return locale ? locale.substring(0, 2) : 'en';
};

i18n.use(initReactI18next).init({
    resources,
    lng: getDeviceLanguage(),
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;