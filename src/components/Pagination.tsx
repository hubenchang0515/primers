import { Box, Button, SxProps, Theme } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArticleIcon from '@mui/icons-material/Article';
import { title } from "@/utils/document";
import Link from "./Link";
import I18n from "@/utils/i18n";

export interface PaginationProps {
    lang: string;
    prev: [string, string, string] | undefined;
    next: [string, string, string] | undefined;
    sx?: SxProps<Theme>
}

export default function Pagination(props:PaginationProps) {
    const i18n = new I18n(props.lang);
    return (
        <Box sx={props.sx}>
            <Box sx={{display:'flex', gap:1, flexDirection:{xs:'column', md:'row'}}}>
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
                        endIcon={<ArticleIcon/>}
                    >
                        <Box sx={{flexShrink:1, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis',textTransform:'none'}}>
                            {title(props.prev[0])} / {title(props.prev[1])} / {title(props.prev[2])}
                        </Box>
                    </Button>
                    :
                    <Button 
                        variant="contained" 
                        color="info"
                        disableElevation
                        disabled
                        sx={{flex:1, justifyContent:'space-between'}}
                        startIcon={<ArrowBackIcon/>}
                        endIcon={<ArticleIcon/>}
                    >
                        {i18n.t("pagination.none")}
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
                        startIcon={<ArticleIcon/>}
                        endIcon={<ArrowForwardIcon/>}
                    >
                        <Box sx={{flexShrink:1, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis',textTransform:'none'}}>
                            {title(props.next[0])} / {title(props.next[1])} / {title(props.next[2])}
                        </Box>
                    </Button>
                    :
                    <Button 
                        variant="contained" 
                        color="info"
                        disabled
                        disableElevation
                        sx={{flex:1, justifyContent:'space-between'}}
                        startIcon={<ArticleIcon/>}
                        endIcon={<ArrowForwardIcon/>}
                    >
                        {i18n.t("pagination.none")}
                    </Button>
                }
            </Box>
        </Box>
    )
}