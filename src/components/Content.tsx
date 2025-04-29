import { Box, Stack, Typography } from "@mui/material";
import Markdown from "./Markdown";

import NotesIcon from '@mui/icons-material/Notes';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import { DocState } from "@/utils/document";

export interface ContentProps {
    content: string;
    state: DocState;
}

export function Content(props:ContentProps) {
    return (
        <Box>
            <Stack direction="row" spacing={1} sx={{color:'#bbb'}}>
                <NotesIcon/> 
                <Typography>约 {props.content.length} 字</Typography> 
                <AccessTimeIcon/> 
                <Typography>约 {Math.round(props.content.length / 200)} 分钟</Typography> 
            </Stack>
            <Markdown content={ props.content }/>
            <Stack direction="row" spacing={1} sx={{color:'#bbb', marginTop:'1rem'}}>
                <EditCalendarIcon/> 
                <Typography>创建于 {props.state.createdTime.toLocaleString()}</Typography> 
                <Typography>更新于 {props.state.updatedTime.toLocaleString()}</Typography>
            </Stack>
        </Box>
    )
}