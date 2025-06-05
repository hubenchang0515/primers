import Catalog from "@/components/Catalog";
import { Content } from "@/components/Content";
import MainPage from "@/components/MainPage";
import { SideMenuGroup } from "@/components/SideMenu";
import { TitleBarItem } from "@/components/TitleBar";
import { SITE_CONFIG } from "@/config";
import { categories, chapters, content, docs, languages, docState, title } from "@/utils/document";
import { Paper } from "@mui/material";
import { Metadata } from "next";

export interface PageParams {
    lang:string;        // 语言： 例如 中文（zh）、英文（en）
    category:string;    // 分类： 例如 Python 等
}

// 生成静态页面路径
export async function generateStaticParams() {
    const paramsList:PageParams[] = []
    for (const lang of await languages()) {
        for (const category of await categories(lang)) {
            paramsList.push({
                lang: lang,
                category: category,
            });
        }
    }
    return paramsList;
}

// 生成元数据
export async function generateMetadata({params}:{params:Promise<PageParams>}): Promise<Metadata> {
    const path = (await params);
    const markdown = await content(decodeURIComponent(path.lang), decodeURIComponent(path.category), "00.index.md");
    const canonical = SITE_CONFIG.origin + SITE_CONFIG.basePath + `/document/${decodeURIComponent(path.lang)}/${decodeURIComponent(path.category)}`;
    
    return {
        title: `${title(decodeURIComponent(path.category))}  - Primers 编程伙伴`,
        description: markdown.replace(/\n+/g, '').substring(0, 150),
        icons: {
            icon: `${SITE_CONFIG.basePath}/icon.svg`,
        },
        alternates: {
            canonical: canonical,
        }
    };
}

// 生成页面
export default async function CategoryPage({params}:{params:Promise<PageParams>}) {
    const path = (await params);
    const markdown = await content(path.lang, decodeURIComponent(path.category), "00.index.md");
    const state = await docState(path.lang, decodeURIComponent(path.category), "00.index.md");

    const titleItems:TitleBarItem[] = (await categories(decodeURIComponent(path.lang))).filter(item=>!item.endsWith('.hide')).map((item) => {
        return {
            label: title(item),
            url: `/document/${path.lang}/${item}`,
        }
    })
    const currentTitle = titleItems.findIndex(item=>item.label === title(decodeURIComponent(path.category)));

    const sideGroups:SideMenuGroup[] = await Promise.all(((await chapters(decodeURIComponent(path.lang), decodeURIComponent(path.category))).filter(item=>!item.endsWith('.hide')).map(async (chapter) => {
        return {
            label: title(chapter),
            items: (await docs(decodeURIComponent(path.lang), decodeURIComponent(path.category), decodeURIComponent(chapter))).filter(item=>!item.endsWith('.hide')).map((doc) => {
                return {
                    label: title(doc),
                    url: `/document/${path.lang}/${path.category}/${chapter}/${doc}`,
                };
            }),
        };
    })));

    return (
        <MainPage lang={path.lang} depth={2} titleItems={titleItems} currentTitle={currentTitle} sideGroups={sideGroups}>
            <Paper sx={{padding:'1rem'}}>
                <Content content={markdown} state={state} lang={path.lang}/>
            </Paper>
            <Catalog groups={sideGroups} lang={path.lang}/>
        </MainPage>
    )
}