"use client";
import { Box, Button, SxProps, Theme, Typography } from "@mui/material";
import NextLink from "next/link";
import { useEffect, useState } from "react";

import HomeIcon from '@mui/icons-material/Home';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import Link from "./Link";
import I18n from "@/utils/i18n";

export interface FooterProps {
    email?: string;
    owner?: string;
    owner_url?: string;
    sx?: SxProps<Theme>;
    lang?: string;
}

export default function Footer(props:FooterProps) {
    const [date, setDate] = useState(new Date());
    useEffect(() => {
        setDate(new Date());
    }, [setDate]);
    const i18n = new I18n(props.lang);

    return (
        <Box component='footer' sx={props.sx}>
            <Typography align="center" variant="caption">
                <Typography>
                    <Button LinkComponent={Link} href='/' startIcon={<HomeIcon/>}>{i18n.t('footer.home')}</Button>
                    {props.email && <> <Button href={`mailto://${props.email}`} startIcon={<EmailIcon/>}>{i18n.t('footer.contact')}</Button> </>}
                    <Button LinkComponent={Link} href={`/document/${props.lang??'en'}/EX.Site.hide/EX.privacy.hide/EX.privacy.md`} startIcon={<PrivacyTipIcon/>}>{i18n.t('footer.privacy')}</Button>
                    <Button LinkComponent={Link} href='/sitemap.xml' startIcon={<LocationOnIcon/>}>{i18n.t('footer.sitemap')}</Button>
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