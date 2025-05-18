"use client";
import DOMPurify from "isomorphic-dompurify";
import { useEffect, useRef } from "react";

export interface EmbedPageProps {
    code: string;
    unsafe?: boolean;
}

export default function EmbedPage(props:EmbedPageProps) {
    const ref = useRef<HTMLIFrameElement>(null);
    useEffect(() => {
        if (ref.current?.contentWindow) {
            ref.current.style.height = ref.current.contentWindow.document.documentElement.scrollHeight + 'px';
        }
    }, [ref.current])

    return (
        <iframe 
            ref={ref}
            srcDoc={props.unsafe ? props.code : DOMPurify.sanitize(props.code, {WHOLE_DOCUMENT: true})}
            style={{width:'100%', boxSizing:'border-box', border:0, margin:0, lineHeight:0}}
        />
    )
}