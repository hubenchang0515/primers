import MainPage from "@/components/MainPage";
import { SideMenuGroup } from "@/components/SideMenu";
import { TitleBarItem } from "@/components/TitleBar";
import { categories, chapters, content, docs, languages, title } from "@/utils/document";
import { Container } from "@mui/material";

export interface PageParams {
    lang:string;        // 语言： 例如 中文（zh）、英文（en）
    category:string;    // 分类： 例如 Python 等
}

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

export default async function Page({params}:{params:Promise<PageParams>}) {
    const path = (await params);
    const markdown = await content(path.lang, decodeURIComponent(path.category), "00.index.md");

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

    return (
        <MainPage titleItems={titleItems} currentTitle={currentTitle} sideItems={sideItems}>
            <Container maxWidth='lg'>
                { markdown }
            </Container>
        </MainPage>
    )
}