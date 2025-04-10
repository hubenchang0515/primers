import MainPage from "@/components/MainPage";
import { TitleBarItem } from "@/components/TitleBar";
import { categories, content, title } from "@/utils/document";
import { Container } from "@mui/material";

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
            <Container maxWidth='lg'>
                { markdown }
            </Container>
        </MainPage>
    )
}
