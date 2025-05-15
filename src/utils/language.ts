export function iana(lang?:string) {
    if (lang === undefined) {
        return "en";
    }

    switch (lang){
        case 'zh': return 'zh-CN';
    }

    return lang;
}

export function name(lang:string) {
    switch (lang) {
        case 'en': return "English";
        case 'zh': return "简体中文";
    }
    return lang;
}