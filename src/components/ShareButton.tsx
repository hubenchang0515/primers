"use client";

import ShareIcon from '@mui/icons-material/Share';
import { useCallback, useState } from "react";
import { SITE_CONFIG } from "@/config";
import { text } from "@/utils/text";
import { Alert, AlertProps, IconButton, Snackbar } from '@mui/material';
import I18n from '@/utils/i18n';

export interface ShareButtonProps{
    lang?: string;
    url?: string;
    content: string;
}

export default function ShareButton(props:ShareButtonProps) {
    const [alert, setAlert] = useState({open: false, severity:'info' as AlertProps['severity'], message:''});
    const share = useCallback(() => {
        const url = props.url ?? window.location.href;
        const lines = text(props.content).split('\n');
        const title = lines[0];
        const brief = lines.slice(1, 6);
        const i18n = new I18n(props.lang);

        if (navigator.clipboard?.writeText) {
            navigator.clipboard.writeText(`![${title}](<${url}>)\n\n> ` + brief.join('\n> '));
            setAlert({
                open: true,
                severity: 'info',
                message: i18n.t('share.copy')
            });
        }

        if (navigator.share) {
            navigator.share({
                title: SITE_CONFIG.title,
                text: brief.join('\n'),
                url: url,
            });
        }

        if (!navigator.clipboard?.writeText && !navigator.share) {
            setAlert({
                open: true,
                severity: 'error',
                message: i18n.t('share.failed')
            });
        }
    }, [props.lang, props.url, props.content]);

    return (
        <IconButton size="small" color="primary" onClick={share}>
            <ShareIcon fontSize="inherit"/>
            <Snackbar
                open={alert.open}
                autoHideDuration={2000}
                onClose={()=>setAlert((alert)=>({...alert, open:false}))}
                anchorOrigin={{vertical:'bottom', horizontal:'right'}}
            >
                <Alert severity={alert.severity} variant="outlined" sx={{bgcolor: 'background.paper'}}>{alert.message}</Alert>
            </Snackbar>
        </IconButton>
    )
}