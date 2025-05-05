import { Box, Button } from "@mui/material";
import Link from "next/link";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { title } from "@/utils/document";

export interface PaginationProps {
    lang:string;
    prev:[string, string, string] | undefined;
    next:[string, string, string] | undefined;
}

export default function Pagination(props:PaginationProps) {
    return (
        <Box sx={{display:'flex', gap:1}}>
            {
                props.prev ? 
                <Button 
                    variant="contained" 
                    color="info"
                    disableElevation
                    LinkComponent={Link} 
                    href={`/document/${props.lang}/${props.prev[0]}/${props.prev[1]}/${props.prev[2]}`}
                    sx={{flex:1, justifyContent:'space-between'}}
                    startIcon={<ArrowBackIcon/>}
                >
                    {title(props.prev[0])} / {title(props.prev[1])} / {title(props.prev[2])}
                </Button>
                :
                <Button 
                    variant="contained" 
                    color="info"
                    disableElevation
                    disabled
                    sx={{flex:1, justifyContent:'space-between'}}
                    startIcon={<ArrowBackIcon/>}
                >
                    没有了
                </Button>
            }
            {
                props.next ? 
                <Button 
                    variant="contained" 
                    color="info"
                    disableElevation
                    LinkComponent={Link} 
                    href={`/document/${props.lang}/${props.next[0]}/${props.next[1]}/${props.next[2]}`} 
                    sx={{flex:1, justifyContent:'space-between'}}
                    endIcon={<ArrowForwardIcon/>}
                >
                    {title(props.next[0])} / {title(props.next[1])} / {title(props.next[2])}
                </Button>
                :
                <Button 
                    variant="contained" 
                    color="info"
                    disabled
                    disableElevation
                    sx={{flex:1, justifyContent:'space-between'}}
                    endIcon={<ArrowForwardIcon/>}
                >
                    没有了
                </Button>
            }
        </Box>
    )
}