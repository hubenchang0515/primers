"use client";

import { iana } from "@/utils/language";
import { useEffect } from "react";

export interface LocaleProps {
    lang: string
}

export default function Locale(props:LocaleProps) {
    useEffect(() => {
        document.querySelector('html')?.setAttribute('lang', iana(props.lang))
    }, [props.lang])

    return <></>
}