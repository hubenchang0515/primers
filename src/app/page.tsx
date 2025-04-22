import MainPage from "@/components/MainPage";
import Markdown from "@/components/Markdown";
import { TitleBarItem } from "@/components/TitleBar";
import { categories, content, title } from "@/utils/document";
import { Container, Fade, Paper } from "@mui/material";

export default async function Home() {
    const markdown = await content("zh", "00.index.md");

    const titleItems:TitleBarItem[] = (await categories(decodeURIComponent("zh"))).map((item) => {
        return {
            label: title(item),
            url: `/document/zh/${item}`,
        }
    })

    return (
        <MainPage titleItems={titleItems}>
            <Container maxWidth='lg' sx={{padding:1, width:{xs:'calc(100vw - 56px)', lg:'auto'}}}>
                <Fade in={true}>
                    <Paper sx={{padding:'1rem'}}>
                        <Markdown content={ markdown }/>
                    </Paper>
                </Fade>
            </Container>
        </MainPage>
    )
}
