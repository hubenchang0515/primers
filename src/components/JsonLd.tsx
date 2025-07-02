"use client";
import { useEffect } from "react";

type JsonValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | { [key: string]: JsonValue }
  | JsonValue[];


export interface JsonLdProps {
    json: JsonValue;
}

export default function JsonLd(props:JsonLdProps) {
    useEffect(() => {
        const script = document.createElement('script');
        script.type = "application/ld+json";
        script.innerHTML = JSON.stringify(props.json);

        const head = document.querySelector('head');
        head?.appendChild(script);

        return () => {
            script.remove();
        }
    }, [props.json]);
    return <></>
}