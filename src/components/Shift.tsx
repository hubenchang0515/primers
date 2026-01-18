"use client";
import { Box, Button, Collapse, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import TerminalIcon from '@mui/icons-material/Terminal';
import I18n from "@/utils/i18n";
import Link from "./Link";

export interface ShiftProps {
    lang?: string;      // i18n language
    language: string;   // code language
    code: string;
    highlight: string;
    input?: string;
}

export function ShiftUrl(code?:string, lang?:string, input?:string) {
    const params = new URLSearchParams();

    if (lang) {
        params.set("lang", lang);
    }

    if (input) {
        params.set("input", btoa(encodeURIComponent(input)));
    }

    if (code) {
        params.set("code", btoa(encodeURIComponent(code)));
    }

    const url = new URL('https://xplanc.org/shift/');
    url.hash = params.toString();
    return url.toString();
}

export default function Shift(props:ShiftProps) {
    const i18n = new I18n(props.lang);
    const [showShift, setShowShift] = useState(false);
    const shiftUrl = ShiftUrl(props.code.trim(), props.language?.toLocaleLowerCase()??'', props.input);

    const run = useCallback(() => {
        setShowShift(true);
    }, [setShowShift])

    return (
        <Box className="shift" sx={{transition:'all 300ms ease'}}>
            {
                showShift ?
                <Box sx={{marginBlock:'8px', position:'relative'}}>
                    <code className={`language-${props.language} hljs`} style={{minHeight:300, margin: 0, overflow:'auto'}} dangerouslySetInnerHTML={{__html: props.highlight}}></code>
                    <Box className="no-print" sx={{height:333, background:'black', color:'white'}}>
                        <Typography>Loading <Link href={shiftUrl} color="info">Shift</Link> ...</Typography>
                        <Typography>Loading {props.language}.wasm ...</Typography>
                        <Typography>Loading {props.language}.data ...</Typography>
                        <Typography>Executing ...</Typography>
                    </Box>
                    <iframe
                        className="no-print"
                        title={`Shift WASM runtime environment for ${props.language}`} 
                        style={{
                            width:'100%', 
                            height:'100%', 
                            position:'absolute', 
                            top:0, 
                            border:0, 
                            background:'transparent',
                            scrollSnapAlign:'end'
                        }} 
                        src={shiftUrl}
                    ></iframe>
                </Box>
                :
                <Box sx={{marginBlock:'8px'}}>
                    <code className={`language-${props.language} hljs`} style={{minHeight:300, margin: 0, overflow:'auto'}} dangerouslySetInnerHTML={{__html: props.highlight}}></code>
                    <Box className="no-print" sx={{height:333, background:'black', color:'white', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                        <Button variant="contained" size="large" color="secondary" sx={{margin:1}} startIcon={<TerminalIcon/>} onClick={run}>{i18n.t("shift.run")}</Button>
                        <Box sx={{whiteSpace:'wrap', wordBreak:'break-all'}}>
                            <Typography>&gt;&gt;&gt; Establishing WebAssembly Runtime. </Typography>
                            <Typography>&gt;&gt;&gt; Standby. </Typography>
                            <Typography>Powered by <Link href={shiftUrl} color="info" rel="nofollow">Shift</Link>.</Typography>
                        </Box>
                    </Box>
                </Box>
            }
        </Box>
    )
}