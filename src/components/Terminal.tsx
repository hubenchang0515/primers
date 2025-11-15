"use client";
import dynamic from "next/dynamic";
import '@xterm/xterm/css/xterm.css';
import { XTermProps } from "./XTerm";

const XTerm = dynamic(()=>import("./XTerm"), {ssr:false}); 

export default function Terminal(props:XTermProps) {
    return <XTerm {...props}/>
}