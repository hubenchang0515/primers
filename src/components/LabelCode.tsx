"use client";
import { Box, Typography } from "@mui/material";
import DOMPurify from "isomorphic-dompurify";

export interface LabelCodeProps {
    name: string;
    code: string;
    language?: string;
}

export default function LabelCode(props:LabelCodeProps) {
    return (
        <Box sx={{width:'100%', boxSizing:'border-box', }}>
            <Typography
                variant="body1" 
                sx={{
                    width:'fit-content', 
                    padding:1, 
                    color:'var(--mui-palette-primary-contrastText)', 
                    background:'var(--mui-palette-primary-main)'
                }}
            >
                {props.name}
            </Typography>
            <Box sx={{width:'100%', boxSizing:'border-box', border: '4px solid var(--mui-palette-primary-main)'}}>
                <Box >
                    <code className={`language-${props.language} hljs`}  dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(props.code)}}></code>
                </Box>
            </Box>
        </Box>
    )
}