import en from '@/locales/en.json';
import zh from '@/locales/zh.json';

type Record = {[key:string]: string|Record};

class I18n {
    translations:{ [key: string]: Record };
    lang:string;

    constructor() {
        this.translations = {
            'en': en,
            'zh': zh,
        }
        this.lang = 'en';
    }

    setLanguage(lang:string) {
        this.lang = lang in this.translations ? lang : 'en';
    }

    t(key:string) {
        let entry:string|Record = this.translations[this.lang];
        const params = key.split('.');

        for (const param of params) {
            if (param in (entry as Record)) {
                entry = (entry as Record)[param]
            } else {
                return key;
            }
        }

        return entry as string
    }
}

const i18n = new I18n();

export default i18n;