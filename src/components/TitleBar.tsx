"use client"

import { AppBar, Box, Button, IconButton, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import GitHubIcon from '@mui/icons-material/GitHub';
import Link from "next/link";

export interface TitleBarItem {
    label: string;
    url: string;
}

export interface TitleBarProps {
    title: string;
    github: string;

    items?: TitleBarItem[];
    current?: number;
    onCurrentChanged?: (index?:number) => void;

    onToggleMenu?: () => void
}

export default function TitleBar(props:TitleBarProps) {
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
                        disabled={props.current === undefined}
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
                        value={props.current}
                        onChange={(_, index)=>props.onCurrentChanged?.(index)}
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