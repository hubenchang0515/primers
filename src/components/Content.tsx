import { Box, Stack, Typography } from "@mui/material";
import Markdown from "./Markdown";
import { DocState } from "@/utils/git";
import I18n from "@/utils/i18n";

import NotesIcon from '@mui/icons-material/Notes';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PrintButton from "./PrintButton";
import ShareButton from "./ShareButton";

export interface ContentProps {
    content: string;
    state: DocState;
    lang?: string;
    url?: string;
}

export function Content(props:ContentProps) {
    const i18n = new I18n(props.lang);
    return (
        <Box component={'main'}>
            <Box sx={{color:'#bbb', display: 'flex', justifyContent:'space-between', alignItems:'center'}}>
                <Stack direction="row" spacing={1}>
                    <NotesIcon/> 
                    <Typography overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">{i18n.t("content.about")} {props.content.length} {i18n.t("content.letters")}</Typography> 
                    <AccessTimeIcon/> 
                    <Typography overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">{i18n.t("content.about")} {Math.round(props.content.length / 200)} {i18n.t("content.minutes")} </Typography> 
                </Stack>
                <Box>
                    <PrintButton lang={props.lang} url={props.url} content={props.content}/>
                    <ShareButton lang={props.lang} url={props.url} content={props.content}/>
                </Box>
            </Box>
            <Markdown lang={props.lang} url={props.url} content={props.content}/>
            <Box sx={{color:'#bbb', display: 'flex', flexDirection:{xs:'column', md:'row'}, justifyContent:{xs:'start', md:'space-between'}}}>
                <Typography overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis" sx={{order:{xs:2,md:1}}}>{i18n.t("content.updated")}: {props.state.updatedTime.toLocaleDateString(props.lang)}</Typography>
                <Typography overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis" sx={{order:{xs:1,md:2}}}> {i18n.t("content.author")}: {props.state.author}</Typography>
                <Typography overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis" sx={{order:{xs:3,md:3}}}>{i18n.t("content.created")}: {props.state.createdTime.toLocaleDateString(props.lang)}</Typography> 
            </Box>
        </Box>
    )
}