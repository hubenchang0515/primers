"use client"

import { AppBar, Box, Button, IconButton, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import GitHubIcon from '@mui/icons-material/GitHub';
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'; 

export interface TitleBarItem {
    label: string;
    url: string;
}

export interface TitleBarProps {
    title: string;
    github: string;

    items?: TitleBarItem[];
    current?: number;

    onToggleMenu?: () => void
    onSearch?:(text:string) => void
}

export default function TitleBar(props:TitleBarProps) {
    const [current, setCurrent] = useState(props.current);
    const router = useRouter();

    useEffect(() => {
        if (current === props.current) {
            return;
        }
        if (current !== undefined && props.items && current in props.items) {
            router.push(props.items[current].url);
        }
    }, [current, props, router]);

    return (
        <Box>
            <AppBar component="nav" color="primary" elevation={24} position="static">
                <Toolbar variant="dense">
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: props.title ? 2:0 }}
                        onClick={props.onToggleMenu}
                    >
                        <MenuIcon />
                    </IconButton>

                        <Button
                            size="large"
                            color="inherit"
                            aria-label="menu"
                            href='/'
                            LinkComponent={Link}
                            sx={{textTransform:'none'}}
                        >
                            <Typography variant="h6" component="div" sx={{ whiteSpace:"nowrap"}}>
                                { props.title }
                            </Typography>
                        </Button>

                    <Tabs 
                        indicatorColor="secondary"
                        textColor="inherit"
                        variant="scrollable"
                        scrollButtons="auto"
                        sx={{ flex:1 }}
                        value={current}
                        onChange={(_, index)=>setCurrent(index)}
                    >
                        {
                            props.items?.map((item, index) => {
                                return (
                                    <Tab key={index} label={item.label} sx={{ textTransform:'none' }} LinkComponent={Link} href={item.url} onClick={(ev)=>ev.preventDefault()}/>
                                )
                            })
                        }
                    </Tabs>
                    
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ ml: 2 }}
                        href={props.github || ""}
                        target='_blank'
                    >
                        <GitHubIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
}