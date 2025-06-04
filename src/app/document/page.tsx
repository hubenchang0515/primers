import MainPage from "@/components/MainPage";
import { TitleBarItem } from "@/components/TitleBar";
import { content, docState, languages } from "@/utils/document";
import { Paper } from "@mui/material";
import { Content } from "@/components/Content";
import Navigation from "@/components/Navigation";
import { name } from "@/utils/language";
import { SITE_CONFIG } from "@/config";
import { Metadata } from "next";

// 生成元数据
export async function generateMetadata(): Promise<Metadata> {
    const markdown = await content("en", "00.index.md");
    const canonical = SITE_CONFIG.origin + SITE_CONFIG.basePath + `/document/en`;
    
    return {
        title: `Primers 编程伙伴`,
        description: markdown.replace(/\n+/g, '').substring(0, 150),
        icons: {
            icon: `${SITE_CONFIG.basePath}/icon.svg`,
        },
        alternates: {
            canonical: canonical,
        }
    };
}

export default async function Home() {
    const markdown = await content("en", "00.index.md");
    const state = await docState("en", "00.index.md");

    const titleItems:TitleBarItem[] = (await languages()).filter(Boolean).map((lang) => {
        return {
            label: name(lang),
            url: `/document/${lang}`,
        }
    });

    return (
        <MainPage depth={1}>
            <Paper sx={{padding:'1rem'}}>
                <Content content={markdown} state={state}/>
            </Paper>
            <Navigation items={titleItems}/>
        </MainPage>
    )
}
