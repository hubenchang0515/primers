"use client";
import { Box, Button, Collapse } from "@mui/material";
import DOMPurify from "isomorphic-dompurify";
import { useCallback, useRef, useState } from "react";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export interface EmbedPageProps {
    code: string;
    unsafe?: boolean;
}

export default function EmbedPage(props:EmbedPageProps) {
    const ref = useRef<HTMLIFrameElement>(null);
    const [expanded, setExpanded] = useState(false);

    const initHeight = useCallback(() => {
        if (ref.current?.contentWindow) {
            ref.current.style.height = ref.current.contentWindow.document.documentElement.scrollHeight + 'px';
        }
    }, [ref]);

    return (
        <Box sx={{width:'100%', boxSizing:'border-box', }}>
            <Box sx={{width:'100%', boxSizing:'border-box', lineHeight:0, border: '4px solid var(--mui-palette-primary-main)', position:'relative'}}>
                <Box 
                    sx={{position:'absolute', boxSizing:'border-box', top:0, bottom:0, width:'100%', overflow:'auto'}} 
                    dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(props.code)}}
                />
                <Collapse in={expanded} collapsedSize={150}>
                    <iframe 
                        ref={ref}
                        srcDoc={props.unsafe ? props.code : DOMPurify.sanitize(props.code, {WHOLE_DOCUMENT: true, ADD_ATTR:['id']})}
                        style={{width:'100%', height:'100%', background:'#fafafa', position:'relative', zIndex:1, minHeight:0, boxSizing:'border-box', border:0, margin:0, lineHeight:0, overflow:'hidden'}}
                    />
                </Collapse>
            </Box>
            <Button variant="contained" color="secondary" size="small" sx={{margin:'auto',borderRadius:0}} onClick={()=>{initHeight(); setExpanded(!expanded);}}>
                {expanded ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
            </Button>
        </Box>
    )
}