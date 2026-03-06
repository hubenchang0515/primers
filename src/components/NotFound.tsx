"use client";

import I18n from "@/utils/i18n";
import { Alert, List, ListItem, ListItemButton, ListItemText, Paper, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import MainPage from "./MainPage";
import { SearchNode } from "@/utils/search";
import Link from "./Link";
import { like, title } from "@/utils/text";
import { useRouter } from "next/navigation";

interface SimilarNode {
    url: string,
    rank: number,
    text?: string,
    title?: string,
}

function findSimilar(root:SearchNode, lang:string, category:string, chapter: string, doc:string) {
    const similar:SimilarNode[] = [];
    for (const langNode of root.children??[]) {
        let rank = 0;
        
        if (like(langNode.title, title(lang))) {
            rank += 1;
        }

        if (like(langNode.title, title(lang)) && !category) {
            similar.push({...langNode, rank: rank + 1});
            break;
        }

        for (const categoryNode of langNode.children??[]) {
            if (like(categoryNode.title, title(category))) {
                rank += 2;
            }

            if (like(categoryNode.title, title(category)) && !chapter) {
                similar.push({...categoryNode, rank: rank + 2});
                break;
            }

            for (const chapterNode of categoryNode.children??[]) {
                if (like(chapterNode.title, title(chapter))) {
                    rank += 3;
                }

                for (const docNode of chapterNode.children??[]) {
                    if (!like(docNode.title, title(doc))) {
                        continue;
                    }

                    similar.push({...docNode, text: `${categoryNode.title} -> ${chapterNode.title} -> ${docNode.title}`, rank: rank + 4});
                }
            }
        }
    }

    similar.sort((x, y) => y.rank - x.rank);
    return similar;
}


export interface NotFoundProps {
    root: SearchNode,
}

export default function NotFound(props:NotFoundProps) {
    const searchParams = useSearchParams();
    const lang = searchParams.get('lang')??''.trim();
    const category = searchParams.get('category')??''.trim();
    const chapter = searchParams.get('chapter')??''.trim();
    const doc = searchParams.get('doc')??''.trim();
    const i18n = new I18n(lang); 
    const similar = findSimilar(props.root, lang, category, chapter, doc);

    // 如果 rank 是 10 分，说明路径标题完全一致，直接跳转
    const router = useRouter();
    if (similar[0]?.rank === 10) {
        router.replace(similar[0].url);
    }
    
    return (
        <MainPage lang={lang} depth={1} disableDiscussion>
            <Paper sx={{flex:1}}>
                <Typography variant="h1" align="center" sx={{fontSize:'clamp(1.25rem, 6vw, 2.5rem)', fontWeight:'bolder', marginBlock:'1rem'}}>404 Not Found</Typography>
                <Alert severity="warning">
                    <span style={{wordBreak:'break-all'}}>{i18n.t('notfound.alert')}</span>
                    <span style={{color:'red', textDecoration:'underline', wordBreak:'break-all'}}>/{[lang,category,chapter,doc].filter(Boolean).join('/')}</span>
                </Alert>
                {similar.length > 0 && <Alert severity="info">{i18n.t('notfound.similar')}</Alert>}
                <List sx={{margin:0, padding:0}}>
                    {
                        similar.map((item, index) => {
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
        </MainPage>
    )
}