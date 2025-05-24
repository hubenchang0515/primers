"use client";

import { wrapLang } from "@/utils/language";
import { useEffect } from "react";

export interface LocaleProps {
    lang: string
}

// 这个组件负责设置 <html> 标签的 lang 属性，无任何其它功能
export default function Locale(props:LocaleProps) {
    useEffect(() => {
        document.querySelector('html')?.setAttribute('lang', wrapLang(props.lang))
    }, [props.lang])

    return <></>
}