"use client"

import { SearchNode } from "@/utils/search";
import { Alert, Box, Button, Divider, List, ListItem, ListItemButton, ListItemText, Paper, Skeleton, Typography } from "@mui/material"
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "./Link";
import SearchBox from "./SearchBox";
import I18n from "@/utils/i18n";
import { SITE_CONFIG } from "@/config";

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
        <Box sx={{flex:1, display:'flex', flexDirection:'column', gap:1}}>
            <SearchBox lang={props.lang} defaultValue={text??""}/>
            {
                <Paper sx={{flex:1, display:'flex', flexDirection:'column'}}>
                    <Typography sx={{display:'flex', flexWrap:'wrap'}}>
                        <Button sx={{flex:1, textTransform:'none'}} LinkComponent={Link} disabled={!text} href={`https://www.google.com/search?q=${encodeURIComponent(text + ' site:' + SITE_CONFIG.origin + SITE_CONFIG.basePath)}`}>Google</Button>
                        <Button sx={{flex:1, textTransform:'none'}} LinkComponent={Link} disabled={!text} href={`https://www.bing.com/search?q=${encodeURIComponent(text + ' site:' + SITE_CONFIG.origin + SITE_CONFIG.basePath)}`}>Bing</Button>
                        <Button sx={{flex:1, textTransform:'none'}} LinkComponent={Link} disabled={!text} href={`https://www.duckduckgo.com/search?q=${encodeURIComponent(text + ' site:' + SITE_CONFIG.origin + SITE_CONFIG.basePath)}`}>DuckDuckGo</Button>
                        <Button sx={{flex:1, textTransform:'none'}} LinkComponent={Link} disabled={!text} href={`https://www.yandex.com/search?text=${encodeURIComponent(text + ' site:' + SITE_CONFIG.origin + SITE_CONFIG.basePath)}`}>Yandex</Button>
                    </Typography>
                    <Divider/>
                    <Alert severity="info">{i18n.t("search.try")}</Alert>
                    <Box sx={{flex:1}}>
                        {
                            waiting ? <Skeleton variant="rectangular" height='100%' /> :
                            results.length === 0 ? !text ? <></> : <Alert severity="warning">{i18n.t("search.empty")}</Alert> :
                            <Box>
                                <List sx={{margin:0, padding:0}}>
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
                            </Box>
                        }
                    </Box>
                </Paper>
            }
        </Box>
    )
}