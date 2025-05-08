import MainPage from "@/components/MainPage";
import { TitleBarItem } from "@/components/TitleBar";
import { categories, content, docState, title } from "@/utils/document";
import { Box, Container, Fade, Paper } from "@mui/material";
import { Content } from "@/components/Content";
import ChipNav from "@/components/ChipNav";
import Discussion from "@/components/Discussion";

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
            <Container maxWidth='lg' sx={{padding:1, width:{xs:'calc(100vw)', md:'auto'}}}>
                <Fade in={true}>
                    <Box sx={{display:'flex', flexDirection:'column', gap:1}}>
                        <Paper sx={{padding:'1rem'}}>
                            <Content content={markdown} state={state}/>
                        </Paper>
                        <ChipNav items={titleItems}/>
                        <Discussion lang="zh-CN"/>
                    </Box>
                </Fade>
            </Container>
        </MainPage>
    )
}
