"use client"

import { AppBar, Box, Button, IconButton, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Link from "./Link";
import SearchBox from "./SearchBox";

export interface TitleBarItem {
    label: string;
    url: string;
}

export interface TitleBarProps {
    lang?: string;
    title: string;
    github: string;

    items?: TitleBarItem[];
    current?: number;
    onCurrentChanged?: (index?:number) => void;

    onToggleMenu?: () => void
}

export default function TitleBar(props:TitleBarProps) {
    return (
        <Box component={'header'}>
            <AppBar component="nav" color="primary" elevation={24} position="static" >
                <Toolbar variant="dense" sx={{paddingRight:{xs:0, md:'4px'}}}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: props.title ? 1:0 }}
                        onClick={props.onToggleMenu}
                        disabled={props.current === undefined}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Button
                        size="large"
                        color="inherit"
                        aria-label="menu"
                        href={props.lang ? `/document/${props.lang}` : '/'}
                        LinkComponent={Link}
                        sx={{textTransform:'none', display:{xs:'none', md:'block'}}}
                        onClick={()=>{props.onCurrentChanged?.(undefined)}}
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
                    
                    <Box sx={{ display:{xs:'none', md:'block'}}}>
                        <SearchBox lang={props.lang} elevation={0}/>
                    </Box>
                    <Box sx={{ display:{xs:'block', md:'none'}}}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="search"
                            LinkComponent={Link}
                            href={`/document/${props.lang}/search`}
                        >
                            <SearchIcon/>
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}