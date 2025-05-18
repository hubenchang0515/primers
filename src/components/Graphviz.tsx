import { Box, SxProps, Theme } from "@mui/material";
import DOMPurify from "isomorphic-dompurify";
import { Graphviz as GraphvizEngine } from "@hpcc-js/wasm-graphviz";

export interface GraphvizProps {
    code: string;
    sx?: SxProps<Theme>;
}

export default async function Graphviz(props:GraphvizProps) {
    const svg = (await GraphvizEngine.load()).dot(props.code).trim();
    return <Box className='graphviz' sx={props.sx} dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(svg)}}/>
}
