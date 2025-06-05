"use client";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import TerminalIcon from '@mui/icons-material/Terminal';
import I18n from "@/utils/i18n";

export interface ShiftProps {
    lang?: string;
    language: string;
    code: string;
    highlight: string;
    input?: string;
}

export default function Shift(props:ShiftProps) {
    const i18n = new I18n(props.lang);
    const [run, setRun] = useState(false);

    return (
        <Box className="shift" sx={{transition:'all 300ms ease'}}>
            {   run?
                <Box sx={{marginBlock:'8px', position:'relative'}}>
                    <code className={`language-${props.language} hljs`} style={{minHeight:300, margin: 0, overflow:'auto'}} dangerouslySetInnerHTML={{__html: props.highlight}}></code>
                    <Box sx={{height:290, background:'black', color:'white'}}> Loading... </Box>
                    <iframe 
                        title={`Shift WASM runtime environment for ${props.language}`} 
                        style={{
                            width:'100%', 
                            height:'100%', 
                            position:'absolute', 
                            top:0, 
                            border:0, 
                            background:'transparent'
                        }} 
                        src={`https://xplanc.org/shift/?lang=${props.language}&input=${btoa(encodeURIComponent(props.input??''))}&code=${btoa(encodeURIComponent(props.code.trim()))}`}
                    ></iframe>
                </Box>
                :
                <Box sx={{marginBlock:'8px'}}>
                    <code className={`language-${props.language} hljs`} style={{minHeight:300, margin: 0, overflow:'auto'}} dangerouslySetInnerHTML={{__html: props.highlight}}></code>
                    <Box sx={{height:290, background:'black', color:'white', display:'flex', justifyContent:'center', alignItems:'start'}}>
                        <Button variant="contained" size="large" color="secondary" sx={{margin:1}} startIcon={<TerminalIcon/>} onClick={()=>{setRun(true)}}>{i18n.t("shift.run")}</Button>
                    </Box>
                </Box>
            }
        </Box>
    )
}