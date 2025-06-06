import Navigation from "@/components/Navigation";
import { Content } from "@/components/Content";
import MainPage from "@/components/MainPage";
import { TitleBarItem } from "@/components/TitleBar";
import { SITE_CONFIG } from "@/config";
import { categories, content, languages, docState, title } from "@/utils/document";
import { Paper } from "@mui/material";
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
    const canonical = SITE_CONFIG.origin + SITE_CONFIG.basePath + `/document/${decodeURIComponent(path.lang)}`;
    
    return {
        title: `Primers 编程伙伴`,
        description: markdown.replace(/\n+/g, '').substring(0, 150),
        icons: {
            icon: `${SITE_CONFIG.basePath}/favicon.svg`,
        },
        alternates: {
            canonical: canonical,
        }
    };
}

// 生成页面
export default async function LanguagePage({params}:{params:Promise<PageParams>}) {
    const path = (await params);
    const markdown = await content(path.lang, "00.index.md");
    const state = await docState(path.lang, "00.index.md");

    const titleItems:TitleBarItem[] = (await categories(decodeURIComponent(path.lang))).filter(item=>!item.endsWith('.hide')).map((item) => {
        return {
            label: title(item),
            url: `/document/${path.lang}/${item}`,
        }
    });

    return (
        <MainPage lang={path.lang} depth={2} titleItems={titleItems}>
            <Paper sx={{padding:'1rem'}}>
                <Content content={markdown} state={state} lang={path.lang}/>
            </Paper>
            <Navigation lang={path.lang} items={titleItems}/>
        </MainPage>
    )
}