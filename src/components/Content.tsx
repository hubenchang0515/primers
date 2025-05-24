import { Box, Stack, Typography } from "@mui/material";
import Markdown from "./Markdown";

import NotesIcon from '@mui/icons-material/Notes';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import { DocState } from "@/utils/document";
import i18n from "@/utils/i18n";

export interface ContentProps {
    content: string;
    state: DocState;
}

export function Content(props:ContentProps) {
    return (
        <Box>
            <Stack direction="row" spacing={1} sx={{color:'#bbb'}}>
                <NotesIcon/> 
                <Typography>{i18n.t("content.about")} {props.content.length} {i18n.t("content.letters")}</Typography> 
                <AccessTimeIcon/> 
                <Typography>{i18n.t("content.about")} {Math.round(props.content.length / 200)} {i18n.t("content.minutes")} </Typography> 
            </Stack>
            <Markdown content={ props.content }/>
            <Stack direction="row" spacing={1} sx={{color:'#bbb', marginTop:'1rem'}}>
                <EditCalendarIcon/> 
                <Typography>{i18n.t("content.created_in")} {props.state.createdTime.toLocaleDateString()}</Typography> 
                <Typography>{i18n.t("content.updated_in")} {props.state.updatedTime.toLocaleDateString()}</Typography>
            </Stack>
        </Box>
    )
}