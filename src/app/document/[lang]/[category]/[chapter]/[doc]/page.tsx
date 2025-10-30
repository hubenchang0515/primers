import { Content } from "@/components/Content";
import JsonLd from "@/components/JsonLd";
import MainPage from "@/components/MainPage";
import Pagination from "@/components/Pagination";
import { SITE_CONFIG } from "@/config";
import { categories, chapters, content, docs, languages, docState, title, prevDoc, nextDoc, text } from "@/utils/document";
import { Paper } from "@mui/material";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export interface PageParams {
    lang:string;        // 语言： 例如 中文（zh）、英文（en）
    category:string;    // 分类： 例如 Python 等
    chapter:string;     // 章节： 例如 基础语法、容器类型等
    doc:string;         // 文档： xxx.md
}

// 生成静态页面路径
export async function generateStaticParams() {
    const paramsList:PageParams[] = []
    for (const lang of await languages()) {
        for (const category of await categories(lang)) {
            for (const chapter of await chapters(lang, category)) {
                for (const doc of await docs(lang, category, chapter)) {
                    if (process.env.NODE_ENV === 'development') {
                        paramsList.push({
                            lang: encodeURIComponent(lang),
                            category: encodeURIComponent(category),
                            chapter: encodeURIComponent(chapter),
                            doc: encodeURIComponent(doc),
                        });
                    } else {
                        paramsList.push({
                            lang: lang,
                            category: category,
                            chapter: chapter,
                            doc: doc,
                        });
                    }
                }
            }
        }
    }
    return paramsList;
}

// 生成元数据
export async function generateMetadata({params}:{params:Promise<PageParams>}): Promise<Metadata> {
    const path = (await params);
    const markdown = await content(decodeURIComponent(path.lang), decodeURIComponent(path.category), decodeURIComponent(path.chapter), decodeURIComponent(path.doc));
    const canonical = SITE_CONFIG.origin + SITE_CONFIG.basePath + `/document/${decodeURIComponent(path.lang)}/${decodeURIComponent(path.category)}/${decodeURIComponent(path.chapter)}/${decodeURIComponent(path.doc)}`;
    
    return {
        title: `${title(decodeURIComponent(path.category))} ${title(decodeURIComponent(path.chapter))} ${title(decodeURIComponent(path.doc))} - ${SITE_CONFIG.title}`,
        description: text(markdown).substring(0, 150),
        robots: "index, follow",
        icons: {
            icon: `${SITE_CONFIG.basePath}/favicon.svg`,
        },
        alternates: {
            canonical: canonical,
        },
        
    };
}

// 生成页面
export default async function DocPage({params}:{params:Promise<PageParams>}) {
    const path = (await params.catch(notFound));
    const markdown = await content(decodeURIComponent(path.lang), decodeURIComponent(path.category), decodeURIComponent(path.chapter), decodeURIComponent(path.doc)).catch(notFound);
    const state = await docState(decodeURIComponent(path.lang), decodeURIComponent(path.category), decodeURIComponent(path.chapter), decodeURIComponent(path.doc));
    const prev = await prevDoc(decodeURIComponent(path.lang), decodeURIComponent(path.category), decodeURIComponent(path.chapter), decodeURIComponent(path.doc));
    const next = await nextDoc(decodeURIComponent(path.lang), decodeURIComponent(path.category), decodeURIComponent(path.chapter), decodeURIComponent(path.doc));

    const titleItems = (await categories(decodeURIComponent(path.lang))).filter(item=>!item.endsWith('.hide')).map((item) => {
        return {
            name: item,
            label: title(item),
            url: `/document/${path.lang}/${item}`,
        }
    })
    const currentTitle = titleItems.findIndex(item=>item.name === decodeURIComponent(path.category));

    const sideGroups = await Promise.all(((await chapters(decodeURIComponent(path.lang), decodeURIComponent(path.category))).filter(item=>!item.endsWith('.hide')).map(async (chapter) => {
        return {
            name: chapter,
            label: title(chapter),
            items: (await docs(decodeURIComponent(path.lang), decodeURIComponent(path.category), decodeURIComponent(chapter))).filter(item=>!item.endsWith('.hide')).map((doc) => {
                return {
                    name: doc,
                    label: title(doc),
                    url: `/document/${path.lang}/${path.category}/${chapter}/${doc}`,
                };
            }),
        };
    })));
    const selectedSideGroup = sideGroups.findIndex(chapter=>chapter.name === decodeURIComponent(path.chapter));
    const selectedDoc = selectedSideGroup >= 0 && selectedSideGroup < sideGroups.length ? sideGroups[selectedSideGroup].items?.findIndex(item=>item.name === decodeURIComponent(path.doc)) : undefined;

    const breadcrumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": `${SITE_CONFIG.origin}${SITE_CONFIG.basePath}`
            },

            {
                "@type": "ListItem",
                "position": 2,
                "name": title(decodeURIComponent(path.category)),
                "item": `${SITE_CONFIG.origin}${SITE_CONFIG.basePath}/document/${path.lang}/${path.category}`
            },

            {
                "@type": "ListItem",
                "position": 3,
                "name": title(decodeURIComponent(path.chapter)) + '/' + title(decodeURIComponent(path.doc)),
                "item": `${SITE_CONFIG.origin}${SITE_CONFIG.basePath}/document/${path.lang}/${path.category}/${path.chapter}/${path.doc}`
            }
        ]
    }

    return (
        <MainPage lang={path.lang} depth={3} titleItems={titleItems} currentTitle={currentTitle} sideGroups={sideGroups} selectedSideGroup={selectedSideGroup} selectedDoc={selectedDoc}>
            <JsonLd json={breadcrumb}/>
            <Pagination lang={path.lang} prev={prev} next={next} sx={{display:{xs:'none', md:'block'}}}/>
            <Paper sx={{padding:'1rem'}}>
                <Content content={markdown} state={state} lang={path.lang} url={`${SITE_CONFIG.origin}${SITE_CONFIG.basePath}/document/${path.lang}/${path.category}/${path.chapter}/${path.doc}`}/>
            </Paper>
            <Pagination lang={path.lang} prev={prev} next={next}/>
        </MainPage>
    )
}