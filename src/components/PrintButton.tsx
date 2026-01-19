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
    const printPdf = useCallback(async () => {
        let iframe = document.getElementById("print-iframe") as HTMLIFrameElement ;
        if (!iframe) {
            iframe = document.createElement('iframe');
            iframe.id = "print-iframe";
            iframe.style.display = 'none';
            document.body.appendChild(iframe);
        }

        const url = props.url ?? window.location.href;
        const content = document.querySelector("article");
        const node = content?.cloneNode(true) as HTMLElement;
        node?.querySelectorAll<HTMLElement>('code').forEach((el) => {
            el.style = ''; // 清除 code 的样式
        });
        iframe.srcdoc = await makePdfContent(url, node?.innerHTML);
        iframe.onload = () => iframe.contentWindow?.print();  
    }, [props.lang, props.url, props.content]);

    return (
        <IconButton size="small" color="primary" onClick={printPdf}>
            <PrintOutlinedIcon fontSize="inherit"/>
        </IconButton>
    )
}