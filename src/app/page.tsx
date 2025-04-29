import MainPage from "@/components/MainPage";
import { TitleBarItem } from "@/components/TitleBar";
import { categories, content, docState, title } from "@/utils/document";
import { Container, Fade, Paper } from "@mui/material";
import { Content } from "@/components/Content";

export default async function Home() {
    const markdown = await content("zh", "00.index.md");
    const state = await docState("zh", "00.index.md");

    const titleItems:TitleBarItem[] = (await categories(decodeURIComponent("zh"))).map((item) => {
        return {
            label: title(item),
            url: `/document/zh/${item}`,
        }
    })

    return (
        <MainPage depth={1} titleItems={titleItems}>
            <Container maxWidth='lg' sx={{padding:1, width:{xs:'calc(100vw)', md:'auto'}}}>
                <Fade in={true}>
                    <Paper sx={{padding:'1rem'}}>
                        <Content content={markdown} state={state}/>
                    </Paper>
                </Fade>
            </Container>
        </MainPage>
    )
}
