"use server";
import { render } from "@/utils/mermaid";
import { Box, SxProps, Theme } from "@mui/material";
import DOMPurify from "isomorphic-dompurify";

export interface MermaidProps {
    code: string;
    sx?: SxProps<Theme>;
}

export default async function Mermaid(props:MermaidProps) {
    const svg = await render(props.code);
    return <Box className='graphviz' sx={props.sx} dangerouslySetInnerHTML={{__html: svg??''}}/>
}