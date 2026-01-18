"use client";

import { useCallback, useRef } from "react";
import { IconButton } from '@mui/material';
import { makePdfContent } from "@/utils/pdf";

import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';

export interface PrintButtonProps{
    lang?: string;
    url?: string;
    content: string;
}

export default function PrintButton(props:PrintButtonProps) {
    const iframe = useRef<HTMLIFrameElement>(null);
    const printPdf = useCallback(async () => {
        const url = props.url ?? window.location.href;
        const content = document.querySelector("article")?.innerHTML??"";
        if (!iframe.current) {
            iframe.current = document.createElement('iframe');
            iframe.current.style.display = 'none';
        }
            
        iframe.current.srcdoc = await makePdfContent(url, content);
        document.body.appendChild(iframe.current);
        iframe.current.contentWindow?.print();
    }, [props.lang, props.url, props.content]);

    return (
        <IconButton size="small" color="primary" onClick={printPdf}>
            <PrintOutlinedIcon fontSize="inherit"/>
        </IconButton>
    )
}