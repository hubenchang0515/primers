import { Box, Stack, Typography } from "@mui/material";
import Markdown from "./Markdown";

import NotesIcon from '@mui/icons-material/Notes';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import { DocState } from "@/utils/document";
import I18n from "@/utils/i18n";

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
            <Stack direction="row" spacing={1} sx={{color:'#bbb'}}>
                <NotesIcon/> 
                <Typography overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">{i18n.t("content.about")} {props.content.length} {i18n.t("content.letters")}</Typography> 
                <AccessTimeIcon/> 
                <Typography overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">{i18n.t("content.about")} {Math.round(props.content.length / 200)} {i18n.t("content.minutes")} </Typography> 
            </Stack>
            <Markdown lang={props.lang} url={props.url} content={props.content}/>
            <Stack direction="row" spacing={1} sx={{color:'#bbb', marginTop:'1rem'}}>
                <EditCalendarIcon/> 
                <Typography overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">{i18n.t("content.created_in")} {props.state.createdTime.toLocaleDateString(props.lang)}</Typography> 
                <Typography overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">{i18n.t("content.updated_in")} {props.state.updatedTime.toLocaleDateString(props.lang)}</Typography>
            </Stack>
        </Box>
    )
}