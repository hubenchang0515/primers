import MainPage from "@/components/MainPage";
import { TitleBarItem } from "@/components/TitleBar";
import { categories, content, docState, title } from "@/utils/document";
import { Paper } from "@mui/material";
import { Content } from "@/components/Content";
import ChipNav from "@/components/ChipNav";

export default async function Home() {
    const markdown = await content("zh", "00.index.md");
    const state = await docState("zh", "00.index.md");

    const titleItems:TitleBarItem[] = (await categories(decodeURIComponent("zh"))).filter(item=>!item.endsWith('.hide')).map((item) => {
        return {
            label: title(item),
            url: `/document/zh/${item}`,
        }
    })

    return (
        <MainPage depth={1} titleItems={titleItems}>
            <Paper sx={{padding:'1rem'}}>
                <Content content={markdown} state={state}/>
            </Paper>
            <ChipNav items={titleItems}/>
        </MainPage>
    )
}
