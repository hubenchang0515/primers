import MainPage from "@/components/MainPage";
import { SideMenuGroup } from "@/components/SideMenu";
import { TitleBarItem } from "@/components/TitleBar";
import { categories, chapters, content, docs, languages, title } from "@/utils/document";
import { Container } from "@mui/material";

export interface PageParams {
    lang:string;        // 语言： 例如 中文（zh）、英文（en）
    category:string;    // 分类： 例如 Python 等
    chapter:string;     // 章节： 例如 基础语法、容器类型等
    doc:string;         // 文档： xxx.md
}

export async function generateStaticParams() {
    const paramsList:PageParams[] = []
    for (const lang of await languages()) {
        for (const category of await categories(lang)) {
            for (const chapter of await chapters(lang, category)) {
                for (const doc of await docs(lang, category, chapter)) {
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
    return paramsList;
}

export default async function Page({params}:{params:Promise<PageParams>}) {
    const path = (await params);
    const markdown = await content(decodeURIComponent(path.lang), decodeURIComponent(path.category), decodeURIComponent(path.chapter), decodeURIComponent(path.doc));

    const titleItems:TitleBarItem[] = (await categories(decodeURIComponent(path.lang))).map((item) => {
        return {
            label: title(item),
            url: `/document/${path.lang}/${item}`,
        }
    })
    const currentTitle = titleItems.findIndex(item=>item.label === title(decodeURIComponent(path.category)));

    const sideItems:SideMenuGroup[] = await Promise.all(((await chapters(decodeURIComponent(path.lang), decodeURIComponent(path.category))).map(async (chapter) => {
        return {
            label: title(chapter),
            items: (await docs(decodeURIComponent(path.lang), decodeURIComponent(path.category), decodeURIComponent(chapter))).map((doc) => {
                return {
                    label: title(doc),
                    url: `/document/${path.lang}/${path.category}/${chapter}/${doc}`,
                };
            }),
        };
    })));
    const currentSide = sideItems.findIndex(chapter=>chapter.label === title(decodeURIComponent(path.chapter)));

    return (
        <MainPage titleItems={titleItems} currentTitle={currentTitle} sideItems={sideItems} currentSide={currentSide}>
            <Container maxWidth='lg'>
                { markdown }
            </Container>
        </MainPage>
    )
}