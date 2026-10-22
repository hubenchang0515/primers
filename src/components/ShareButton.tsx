"use client";

import { useCallback, useState } from "react";
import { SITE_CONFIG } from "@/config";
import { text } from "@/utils/text";
import { Alert, AlertProps, IconButton, Snackbar } from '@mui/material';
import I18n from '@/utils/i18n';

import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';

export interface ShareButtonProps{
    lang?: string;
    url?: string;
}

export default function ShareButton(props:ShareButtonProps) {
    const [alert, setAlert] = useState({open: false, severity:'info' as AlertProps['severity'], message:''});
    const share = useCallback(() => {
        const url = props.url ?? window.location.href;
        const i18n = new I18n(props.lang);

        if (navigator.clipboard?.writeText) {
            navigator.clipboard.writeText(url);
            setAlert({
                open: true,
                severity: 'info',
                message: i18n.t('share.copy')
            });
        }

        if (navigator.share) {
            navigator.share({
                title: SITE_CONFIG.title,
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
    }, [props.lang, props.url]);

    return (
        <IconButton size="small" color="primary" onClick={share}>
            <ShareOutlinedIcon fontSize="inherit"/>
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