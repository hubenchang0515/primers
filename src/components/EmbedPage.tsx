"use client";
import { Box } from "@mui/material";
import DOMPurify from "isomorphic-dompurify";
import { useCallback, useEffect, useRef } from "react";
import { useGlobalState } from "./GlobalState";

export interface EmbedPageProps {
    code: string;
    unsafe?: boolean;
}

const ADD_TAGS = ['base', 'script', 'link', 'embed', 'frameset', 'frame'];

const ADD_ATTR = ['id', 'class', 'target', 'onclick'];

// const DATA_URI_TAGS = ['a'];

export default function EmbedPage(props:EmbedPageProps) {
    const ref = useRef<HTMLIFrameElement>(null);

    const {
        loading,
    } = useGlobalState();

    const initHeight = useCallback(() => {
        if (ref.current?.contentWindow) {
            ref.current.style.height = (ref.current.contentWindow.document?.documentElement?.scrollHeight??150)+ 'px';
        }
    }, [ref]);

    useEffect(() => {
        setTimeout(initHeight, 50);
    }, [loading, initHeight]);

    return (
        <Box sx={{width:'100%', boxSizing:'border-box', }}>
            <Box sx={{width:'100%', boxSizing:'border-box', lineHeight:0, border: '4px solid var(--mui-palette-primary-main)', position:'relative'}}>
                <Box 
                    sx={{position:'absolute', boxSizing:'border-box', top:0, bottom:0, width:'100%', overflow:'auto'}} 
                    dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(props.code, {FORBID_ATTR: ['style']})}}
                />
                <iframe 
                    ref={ref}
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