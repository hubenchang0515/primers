"use client";

import ShareIcon from '@mui/icons-material/Share';
import { useCallback, useState } from "react";
import { SITE_CONFIG } from "@/config";
import { text } from "@/utils/text";
import { Alert, IconButton, Snackbar } from '@mui/material';
import I18n from '@/utils/i18n';

export interface ShareButtonProps{
    lang?: string;
    url?: string;
    content: string;
}

export default function ShareButton(props:ShareButtonProps) {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const share = useCallback(() => {
        const url = props.url ?? window.location.href;
        const lines = text(props.content).split('\n');
        const title = lines[0];
        const brief = lines.slice(1, 6);
        console.log(props.content, text(props.content))

        if (navigator.canShare()) {
            navigator.share({
                title: SITE_CONFIG.title,
                text: brief.join('\n'),
                url: url,
            });
        } else {
            const i18n = new I18n(props.lang);
            navigator.clipboard.writeText(`![${title}](<${url}>)\n\n> ` + brief.join('\n> '));
            setMessage(i18n.t('share.copy'));
            setOpen(true);
        }
    }, [props.lang, props.url, props.content]);

    return (
        <IconButton size="small" color="primary" onClick={share}>
            <ShareIcon fontSize="inherit"/>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={()=>setOpen(false)}
                anchorOrigin={{vertical:'bottom', horizontal:'center'}}
            >
                <Alert severity='info' variant="filled" >{message}</Alert>
            </Snackbar>
        </IconButton>
    )
}