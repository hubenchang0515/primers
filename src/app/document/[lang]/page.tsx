import ChipNav from "@/components/ChipNav";
import { Content } from "@/components/Content";
import Discussion from "@/components/Discussion";
import MainPage from "@/components/MainPage";
import { TitleBarItem } from "@/components/TitleBar";
import { SITE_CONFIG } from "@/config";
import { categories, content, languages, docState, title } from "@/utils/document";
import { Box, Container, Fade, Paper } from "@mui/material";
import { Metadata } from "next";

export interface PageParams {
    lang:string;        // 语言： 例如 中文（zh）、英文（en）
}

// 生成静态页面路径
export async function generateStaticParams() {
    const paramsList:PageParams[] = []
    for (const lang of await languages()) {
        paramsList.push({
            lang: lang,
        });
    }
    return paramsList;
}

// 生成元数据
export async function generateMetadata({params}:{params:Promise<PageParams>}): Promise<Metadata> {
    const path = (await params);
    const markdown = await content(decodeURIComponent(path.lang), "00.index.md");
    
    return {
        title: `Primers 编程伙伴`,
        description: markdown.replace(/\n+/g, '').substring(0, 150),
        icons: {
            icon: `${SITE_CONFIG.basePath}/icon.svg`,
        }
    };
}

// 生成页面
export default async function Pastatege({params}:{params:Promise<PageParams>}) {
    const path = (await params);
    const markdown = await content(path.lang, "00.index.md");
    const state = await docState(path.lang, "00.index.md");

    const titleItems:TitleBarItem[] = (await categories(decodeURIComponent(path.lang))).map((item) => {
        return {
            label: title(item),
            url: `/document/${path.lang}/${item}`,
        }
    })

    return (
        <MainPage depth={2} titleItems={titleItems}>
            <Container maxWidth='lg' sx={{padding:1, width:{xs:'calc(100vw)', md:'auto'}}}>
                <Fade in={true}>
                    <Box sx={{display:'flex', flexDirection:'column', gap:1}}>
                        <Paper sx={{padding:'1rem'}}>
                            <Content content={markdown} state={state}/>
                        </Paper>
                        <ChipNav items={titleItems}/>
                        <Discussion lang="zh-CN"/>
                    </Box>
                </Fade>
            </Container>
        </MainPage>
    )
}