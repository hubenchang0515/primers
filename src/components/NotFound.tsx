"use client";

import I18n from "@/utils/i18n";
import { Alert, List, ListItem, ListItemButton, ListItemText, Paper, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import MainPage from "./MainPage";
import { SearchNode } from "@/utils/search";
import Link from "./Link";
import { title } from "@/utils/text";

function findSimilar(root:SearchNode, lang:string, category:string, chapter: string, doc:string) {
    const similar:SearchNode[] = [];
    for (const langNode of root.children??[]) {
        if (langNode.title !== title(lang)) {
            continue;
        }

        if (!category) {
            similar.push(langNode);
            break;
        }

        for (const categoryNode of langNode.children??[]) {
            if (categoryNode.title !== title(category)) {
                continue;
            }

            if (!chapter) {
                similar.push(categoryNode);
                break;
            }

            for (const chapterNode of categoryNode.children??[]) {
                if (chapterNode.title !== title(chapter)) {
                    continue;
                }

                if (!doc) {
                    // similar.push(chapterNode); chapterNode 无页面
                    break;
                }

                for (const docNode of chapterNode.children??[]) {
                    if (docNode.title !== title(doc)) {
                        continue;
                    }

                    similar.push(docNode);
                }
            }
        }
    }

    return similar;
}


export interface NotFoundProps {
    root: SearchNode,
}

export default function NotFound(props:NotFoundProps) {
    const pathname = usePathname();
    const items = pathname.split('/');
    const lang = decodeURIComponent(items[2]??'');
    const category = decodeURIComponent(items[3]??'');
    const chapter = decodeURIComponent(items[4]??'');
    const doc = decodeURIComponent(items[5]??'');
    const i18n = new I18n(lang); 
    const similar = findSimilar(props.root, lang, category, chapter, doc);
    
    return (
        <MainPage lang={lang} depth={1} disableDiscussion>
            <Paper sx={{flex:1}}>
                <Typography variant="h1" align="center" sx={{fontSize:'clamp(1.25rem, 6vw, 2.5rem)', fontWeight:'bolder', marginBlock:'1rem'}}>404 Not Found</Typography>
                <Alert severity="warning">{i18n.t('notfound.alert')}<span style={{color:'red', textDecoration:'underline'}}>{decodeURIComponent(pathname)}</span></Alert>
                {similar.length > 0 && <Alert severity="info">{i18n.t('notfound.similar')}</Alert>}
                <List sx={{margin:0, padding:0}}>
                    {
                        similar.map((item, index) => {
                            return (
                                <ListItem disablePadding key={index}>
                                    <ListItemButton LinkComponent={Link} href={item.url}>
                                        <ListItemText primary={item.title} secondary={item.url}/>
                                    </ListItemButton>
                                </ListItem>
                            )
                        })
                    }
                </List>
            </Paper>
        </MainPage>
    )
}