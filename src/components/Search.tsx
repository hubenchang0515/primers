"use client"

import { SearchNode } from "@/utils/search";
import { Box, List, ListItem, ListItemButton, ListItemText, Paper, Skeleton, Typography } from "@mui/material"
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "./Link";
import SearchBox from "./SearchBox";
import I18n from "@/utils/i18n";

export interface SearchProps {
    lang?: string,
    root: SearchNode,
}

// 搜索
export function search(node:SearchNode, callback:(node:SearchNode)=>void) {
    callback(node);

    if (node.children) {
        for (const child of node.children) {
            search(child, callback)
        }
    }
}

export default function Search(props:SearchProps) {
    const i18n = new I18n(props.lang);
    const searchParams = useSearchParams();
    const text = searchParams.get('text')?.trim();
    const [waiting, setWaiting] = useState(true);
    const [results, setResults] = useState<SearchNode[]>([]);

    useEffect(() => {
        setWaiting(true);
        const results:SearchNode[] = [];
        search(props.root, (node)=>{
            if (!text) return;

            const words = text.toLocaleLowerCase().split(/\s+/);
            const content = node.text?.replace(/\s/g,"").toLocaleLowerCase();
            for (const word of words) {
                if (!content?.includes(word)) {
                    return;
                }
            }
            
            results.push(node);
        });
        setResults(results);
        setWaiting(false);
    }, [props.root, text]);

    return (
        <Box sx={{display:'flex', flexDirection:'column', gap:1}}>
            <SearchBox lang={props.lang} defaultValue={text??""}/>
            {
                waiting ? <Skeleton variant="rectangular" height={600} /> :
                results.length === 0 ? !text ? <></> : <Paper sx={{padding:2, margin:0}}><Typography>{i18n.t("search.empty")}</Typography></Paper> :
                <Paper sx={{padding:2, margin:0, minHeight:600}}>
                    <Typography>{i18n.t("search.result")}</Typography>
                    <List>
                        {
                            results.map((item, index) => {
                                return (
                                    <ListItem disablePadding key={index}>
                                        <ListItemButton LinkComponent={Link} href={item.url}>
                                            <ListItemText primary={item.text} secondary={item.url}/>
                                        </ListItemButton>
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                </Paper>
            }
        </Box>
    )
}