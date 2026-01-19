"use client";
import { Box, Typography } from "@mui/material";
import DOMPurify from "isomorphic-dompurify";

export interface LabelCodeProps {
    label: string;
    code: string;
    language?: string;
    level?: number;
}

export default function LabelCode(props:LabelCodeProps) {
    const color = ['--mui-palette-Alert-infoFilledColor', '--mui-palette-Alert-successFilledColor', '--mui-palette-Alert-warningFilledColor', '--mui-palette-Alert-errorFilledColor'][props.level??0]
    const bg = ['--mui-palette-Alert-infoFilledBg', '--mui-palette-Alert-successFilledBg', '--mui-palette-Alert-warningFilledBg', '--mui-palette-Alert-errorFilledBg'][props.level??0]
    return (
        <Box sx={{width:'100%', boxSizing:'border-box', }}>
            <Typography
                variant="body1" 
                sx={{
                    width:'fit-content', 
                    padding:1, 
                    color: `var${color}`, 
                    background: `var(${bg})`
                }}
            >
                {props.label}
            </Typography>
            <Box sx={{width:'100%', boxSizing:'border-box', border: `4px solid var(${bg})`}}>
                <Box component='pre'>
                    <code className={`language-${props.language} hljs`}  dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(props.code)}}></code>
                </Box>
            </Box>
        </Box>
    )
}