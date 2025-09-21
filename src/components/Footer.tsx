"use client";
import { Box, Button, SxProps, Theme, Typography } from "@mui/material";
import NextLink from "next/link";
import { useEffect, useState } from "react";

import HomeIcon from '@mui/icons-material/Home';
import InstallDesktopIcon from '@mui/icons-material/InstallDesktop';
import EmailIcon from '@mui/icons-material/Email';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import Link from "./Link";
import I18n from "@/utils/i18n";
import { useGlobalState } from "./GlobalState";

export interface FooterProps {
    email?: string;
    owner?: string;
    owner_url?: string;
    sx?: SxProps<Theme>;
    lang?: string;
}

export default function Footer(props:FooterProps) {
    const i18n = new I18n(props.lang);
    const {installPrompt} = useGlobalState();

    // 日期
    const [date, setDate] = useState(new Date());
    useEffect(() => {
        setDate(new Date());
    }, [setDate]);

    return (
        <Box component='footer' sx={props.sx}>
            <Typography align="center" variant="caption">
                <Typography display="flex" justifyContent="center" gap={1}>
                    <Button LinkComponent={Link} href='/' startIcon={<HomeIcon/>}>{i18n.t('footer.home')}</Button>
                    {props.email && <Button href={`mailto://${props.email}`} rel="nofollow" startIcon={<EmailIcon/>}>{i18n.t('footer.contact')}</Button>}
                    <Button LinkComponent={Link} href={`/document/${props.lang??'en'}/EX.Site.hide/EX.privacy.hide/EX.privacy.md`} startIcon={<PrivacyTipIcon/>}>{i18n.t('footer.privacy')}</Button> 
                    {installPrompt && <Button startIcon={<InstallDesktopIcon/>} onClick={()=>{installPrompt?.prompt()}}>{i18n.t('footer.install')}</Button>}
                </Typography>
                <Typography>
                    Copyright © {date.getFullYear()} {props.owner_url ? <Link component={NextLink} href={props.owner_url}>{props.owner}</Link> : props.owner} All Rights Reserved. 
                </Typography>
                <Typography>
                    Powered by <Link component={NextLink} href='https://github.com/hubenchang0515/primers' target="_blank">primers</Link>
                </Typography>
            </Typography>
        </Box>
    )
}