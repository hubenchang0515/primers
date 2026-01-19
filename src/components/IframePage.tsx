"use client";
import { Box, Button, Typography } from "@mui/material";
import DOMPurify from "isomorphic-dompurify";
import { useCallback, useEffect, useRef } from "react";
import { useGlobalState } from "./GlobalState";
import RefreshIcon from '@mui/icons-material/Refresh';
import FullscreenIcon from '@mui/icons-material/Fullscreen';

export interface IframePageProps {
    title: string;
    code: string;
    unsafe?: boolean;
}

const ADD_TAGS = ['base', 'script', 'noscript', 'object', 'link', 'embed', 'frameset', 'frame', 'param', 'plaintext'];

const ADD_ATTR = ['id', 'class', 'target', 'behavior', 'scrollamount', 'onclick', 'onmouseover', 'onmouseout', 'oninput'];

// const DATA_URI_TAGS = ['a'];

export default function IframePage(props:IframePageProps) {
    const ref = useRef<HTMLIFrameElement>(null);

    const {
        loading,
    } = useGlobalState();

    const initHeight = useCallback(() => {
        if (ref.current?.contentWindow) {
            ref.current.style.height = (ref.current.contentWindow.document?.documentElement?.offsetHeight??150)+ 'px';
        }
    }, []);

    const refresh = useCallback(() => {
        if (ref.current) {
            ref.current.srcdoc = props.unsafe ? props.code : DOMPurify.sanitize(props.code, {WHOLE_DOCUMENT:true, ADD_TAGS:ADD_TAGS, ADD_ATTR:ADD_ATTR})
        }
    }, [props.unsafe, props.code])

    const fullscreen = useCallback(() => {
        if (ref.current) {
            ref.current.requestFullscreen();
        }
    }, []);

    useEffect(() => {
        setInterval(initHeight, 50);
    }, [loading, initHeight]);

    return (
        <Box sx={{width:'100%', boxSizing:'border-box', }}>
            <Box sx={{display:'flex'}}>
                <Typography
                    variant="body1" 
                    sx={{
                        width:'fit-content', 
                        padding:1, 
                        color:'var(--mui-palette-info-contrastText)', 
                        background:'var(--mui-palette-info-main)'
                    }}
                >
                    {props.title}
                </Typography>
                <Box flex={1}/>
                <Box sx={{display:'flex', alignItems:'end'}}>
                    <Button variant="contained" size="small" color="info" className="no-print" sx={{borderRadius:0, padding:0, minWidth:0,boxShadow:'none'}} onClick={refresh} >
                        <RefreshIcon/>
                    </Button>
                    <Button variant="contained" size="small" color="info" className="no-print" sx={{borderRadius:0, padding:0, minWidth:0,boxShadow:'none'}} onClick={fullscreen} >
                        <FullscreenIcon/>
                    </Button>
                </Box>
            </Box>
            <Box sx={{width:'100%', boxSizing:'border-box', lineHeight:0, border: '4px solid var(--mui-palette-info-main)', position:'relative'}}>
                <iframe 
                    ref={ref}
                    title={`${props.title}`}
                    srcDoc={props.unsafe ? props.code : DOMPurify.sanitize(props.code, {WHOLE_DOCUMENT:true, ADD_TAGS:ADD_TAGS, ADD_ATTR:ADD_ATTR})}
                    style={{
                        width:'100%', 
                        height: '100%', 
                        background:'#fafafa', 
                        position:'relative', 
                        zIndex:1, 
                        minHeight:0, 
                        boxSizing:'border-box', 
                        border:0, 
                        margin:0, 
                        lineHeight:0, 
                        overflow:'hidden'
                    }}
                    onLoad={initHeight}
                />
            </Box>
        </Box>
    )
}