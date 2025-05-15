"use client";
import { Box, Button, SxProps, Theme, Typography } from "@mui/material";
import NextLink from "next/link";
import { useEffect, useState } from "react";

import HomeIcon from '@mui/icons-material/Home';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import Link from "./Link";

export interface FooterProps {
    email?: string;
    owner?: string;
    owner_url?: string;
    sx?: SxProps<Theme>;
}

export default function Footer(props:FooterProps) {
    const [date, setDate] = useState(new Date());
    useEffect(() => {
        setDate(new Date());
    }, [setDate]);

    return (
        <Box component='footer' sx={props.sx}>
            <Typography align="center" variant="caption">
                <Typography>
                    <Button LinkComponent={Link} href='/' startIcon={<HomeIcon/>}>Home</Button> | 
                    {props.email && <> <Button href={`mailto://${props.email}`} startIcon={<EmailIcon/>}>Contact</Button> | </>}
                    <Button LinkComponent={Link} href='/sitemap.xml' startIcon={<LocationOnIcon/>}>Sitemap</Button>
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