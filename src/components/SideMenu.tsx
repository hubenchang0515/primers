"use client"

import { Box, Collapse, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Slide, Tooltip } from "@mui/material";
import { JSX, useEffect, useState } from "react";
import Link from "next/link";

import TuneIcon from '@mui/icons-material/Tune';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import BrightnessAutoIcon from '@mui/icons-material/BrightnessAuto';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import FolderIcon from '@mui/icons-material/Folder';
import ArticleIcon from '@mui/icons-material/Article';

export interface SideMenuItem {
    label: string;
    icon?: JSX.Element;
    url: string;
}

export interface SideMenuGroup {
    label: string;
    icon?: JSX.Element;
    items?: SideMenuItem[];
}

export interface SideMenuProps {
    groups?: SideMenuGroup[];
    children?: React.ReactNode;

    collapsedSize?: number;
    expanded?: boolean;
    onExpandedChanged?: (expand:boolean) => void;

    expandedGroup?: number;
    onExpandedGroupChanged?: (index:number) => void;

    selectedGroup?: number;
    selectedItem?: number;

    mode?: 'light' | 'dark' | 'system';
    onSetMode?: (theme:'light' | 'dark' | 'system') => void;

    setUrl?:(url:string)=>void;
}

export default function SideMenu(props:SideMenuProps) {

    // 设置列表展开状态
    const [settingsExpanded, setSettingsExpanded] = useState<boolean>(false);

    // 底部包含的子元素
    const [childrenVisible, setChildrenVisible] = useState(false);

    useEffect(() => {
        if (!props.expanded) {
            setSettingsExpanded(false);
            setChildrenVisible(false);
        }
    }, [props.expanded]);

    return (
        <Paper
            sx={{
                borderRadius: 0,
                zIndex:99,
            }}
            elevation={12}
            square
        >
            <Collapse 
                sx={{height: '100%'}} 
                orientation="horizontal" 
                collapsedSize={props.groups ? props.collapsedSize??56 : 0} 
                in={props.groups && props.expanded} 
                onEntered={()=>setChildrenVisible(true)}
                onExit={()=>setChildrenVisible(false)}
            >
                <Box 
                    sx={{
                        height: '100%',
                        width: {xs: '100vw', sm: '320px'},
                        display:"flex", 
                        flexDirection:"column", 
                        justifyContent: "flex-start", 
                        overflowY:"auto", 
                        '&::-webkit-scrollbar': {display: "none"} // 隐藏滚动条
                    }}
                >
                    <List sx={{width: "100%"}}>

                        {/* 菜单选项 */}
                        {
                            props.groups?.map((group, gIndex) => {
                                return (
                                    <Box key={gIndex}>
                                        <ListItem disablePadding
                                            sx={gIndex === props.selectedGroup ? {boxShadow:  '-2px 0 0 0 var(--mui-palette-secondary-main) inset'} : {}}
                                        >
                                            <ListItemButton 
                                                onClick={() => {
                                                    props.onExpandedGroupChanged?.(gIndex);
                                                    props.onExpandedChanged?.(true);
                                                }}
                                            >
                                                <ListItemIcon>
                                                    {group.icon  ?? <FolderIcon/>}
                                                </ListItemIcon>
                                                <ListItemText primary={group.label}/>
                                                {gIndex == props.expandedGroup ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                            </ListItemButton>
                                        </ListItem>
                                        <Collapse in={props.expanded && gIndex == props.expandedGroup } timeout="auto" unmountOnExit>
                                            <List component="div" disablePadding >
                                                {
                                                    group.items?.map((item, dIndex) => (
                                                        <ListItem disablePadding key={dIndex}
                                                            sx={gIndex === props.selectedGroup && dIndex === props.selectedItem ? {boxShadow:  '-2px 0 0 0 var(--mui-palette-secondary-main) inset'} : {}}
                                                        >
                                                            <ListItemButton 
                                                                component={Link} 
                                                                href={item.url}
                                                                sx={{pl:4}} 
                                                                onClick={(ev)=>{if (props.setUrl) {props.setUrl?.(item.url); ev.preventDefault()}}}
                                                            >
                                                                <ListItemIcon>
                                                                    {item.icon  ?? <ArticleIcon/>}
                                                                </ListItemIcon>
                                                                <ListItemText primary={item.label}/>
                                                            </ListItemButton>
                                                        </ListItem>
                                                    ))
                                                }
                                            </List>
                                        </Collapse>
                                    </Box>
                                )
                            })
                        }

                        <Divider/>

                        {/* 设置 */}
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => {
                                setSettingsExpanded(!settingsExpanded);
                                props.onExpandedChanged?.(true);
                            }}>
                                <ListItemIcon>
                                    <TuneIcon/>
                                </ListItemIcon>
                                <ListItemText primary="设置"/>
                                {settingsExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            </ListItemButton>
                        </ListItem>
                        <Collapse in={props.expanded && settingsExpanded} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem disablePadding>
                                    <ListItemButton sx={{ pl: 4 }} onClick={()=>props.onSetMode?.('system')}>
                                        <ListItemIcon>
                                            <Brightness4Icon />
                                        </ListItemIcon>
                                        <ListItemText primary="主题" />
                                            <Tooltip title="明亮" placement="top" arrow>
                                                <IconButton color={props.mode === 'light' ? 'primary' : 'inherit'} onClick={(ev) => {props.onSetMode?.('light'); ev.stopPropagation();}}>
                                                    <LightModeIcon/>
                                                </IconButton>
                                            </Tooltip>

                                            <Tooltip title="自动" placement="top" arrow>
                                                <IconButton color={props.mode === 'system' ? 'primary' : 'inherit'} onClick={(ev) => {props.onSetMode?.('system'); ev.stopPropagation();}}>
                                                    <BrightnessAutoIcon/>
                                                </IconButton>
                                            </Tooltip>

                                            <Tooltip title="黑暗" placement="top" arrow>
                                                <IconButton color={props.mode === 'dark' ? 'primary' : 'inherit'} onClick={(ev) => {props.onSetMode?.('dark'); ev.stopPropagation();}}>
                                                    <DarkModeIcon/>
                                                </IconButton>
                                            </Tooltip>
                                        
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </Collapse>
                    </List>

                    {
                        props.children && 
                        <Slide in={props.expanded && childrenVisible} direction="up" mountOnEnter unmountOnExit>
                            <Box>
                                {props.children}
                            </Box>
                        </Slide>
                    }
                </Box>
            </Collapse>
        </Paper>
    )
}