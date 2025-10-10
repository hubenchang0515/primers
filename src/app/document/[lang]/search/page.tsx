import MainPage from "@/components/MainPage";
import { TitleBarItem } from "@/components/TitleBar";
import { SITE_CONFIG } from "@/config";
import { categories, languages, title } from "@/utils/document";
import { Metadata } from "next";
import Search from "@/components/Search";
import { searchTree } from "@/utils/search";
import { Suspense } from "react";

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
    const canonical = SITE_CONFIG.origin + SITE_CONFIG.basePath + `/document/${decodeURIComponent(path.lang)}`;
    
    return {
        title: SITE_CONFIG.title,
        icons: {
            icon: `${SITE_CONFIG.basePath}/favicon.svg`,
        },
        alternates: {
            canonical: canonical,
        }
    };
}

// 生成页面
export default async function SearchPage({params}:{params:Promise<PageParams>}) {
    const path = (await params);
    const root = await searchTree(path.lang);

    const titleItems:TitleBarItem[] = (await categories(decodeURIComponent(path.lang))).filter(item=>!item.endsWith('.hide')).map((item) => {
        return {
            label: title(item),
            url: `/document/${path.lang}/${item}`,
        }
    });

    return (
        <MainPage lang={path.lang} depth={2} titleItems={titleItems} disableDiscussion>
            <Suspense>
                <Search lang={path.lang} root={root}/>
            </Suspense>
        </MainPage>
    )
}