import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector';

import frJSON from './src/translations/fr/common.json'
import enJSON from './src/translations/en/common.json'

import FranceFlag from './src/assets/images/flags/France.png'
import UKFlag from './src/assets/images/flags/UK.png'

const languagesDatas = {
    fr: {
        flag: FranceFlag,
        nativeName: 'Français' 
    },
    en: {
        flag: UKFlag,
        nativeName: 'English' 
    },
}

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            fr: { translation: frJSON },
            en: { translation: enJSON },
        },
        fallbackLng: 'fr',
        interpolation: {
            escapeValue: false
        }
    })

export default i18n
export { languagesDatas }