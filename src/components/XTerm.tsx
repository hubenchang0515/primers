"use client";
import { Box, SxProps, Theme } from "@mui/material";
import { useEffect, useRef } from "react";
import { Terminal } from '@xterm/xterm';
import '@xterm/xterm/css/xterm.css';
import { FitAddon } from '@xterm/addon-fit';

export interface XTermProps {
    code: string;
    rows?: number;
    sx?: SxProps<Theme>;
}

export default function XTerm(props:XTermProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current)
            return;

        const term = new Terminal({
            convertEol: true, 
            rows: props.rows || 10, 
            allowProposedApi: true, 
            fontFamily:'"Maple Mono CN", Consolas, Monaco, monospace',
            letterSpacing: 0,
        });
        term.open(ref.current);
        const fitAddon = new FitAddon();
        term.loadAddon(fitAddon);
        term.write(props.code);
        term.onWriteParsed(()=>fitAddon.fit());
        term.onWriteParsed(()=>term.scrollToTop());

        return () => {
            term.dispose();
        }
    }, [ref, props.rows, props.code]);

    return <Box ref={ref} className="terminal" sx={props.sx}/>
}