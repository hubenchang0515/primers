"use client"

import { Box, Collapse, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Slide, Tooltip } from "@mui/material";
import { JSX, useEffect, useState } from "react";

import TuneIcon from '@mui/icons-material/Tune';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import BrightnessAutoIcon from '@mui/icons-material/BrightnessAuto';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import FolderIcon from '@mui/icons-material/Folder';
import ArticleIcon from '@mui/icons-material/Article';
import Link from "next/link";

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
    current?: number;
    children?: React.ReactNode;

    expand?: boolean;
    onExpandChanged?: (expand:boolean) => void;

    theme?: string;
    onToggleTheme?: (theme?:string) => void;
}

export default function SideMenu(props:SideMenuProps) {
    // 内部列表展开状态
    const [groupExpanded, setGroupExpanded] = useState<boolean[]>(Array.from({length: props.groups?.length || 0}, (_, x) => x === props.current));

    // 切换内部列表展开状态
    const toggleGroup = (index:number) => {
        const values = [...groupExpanded]
        values[index] = !groupExpanded[index];
        setGroupExpanded(values);
    }

    // 设置列表展开状态
    const [settingsExpanded, setSettingsExpanded] = useState<boolean>(false);

    // 底部包含的子元素
    const [childrenVisible, setChildrenVisible] = useState(false);

    useEffect(() => {
        if (!props.expand) {
            const values = Array.from({length: props.groups?.length || 0}, () => false);
            setGroupExpanded(values);
            setSettingsExpanded(false);
            setChildrenVisible(false);
        }
    }, [props.expand, props.groups]);

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
                collapsedSize={56 /* 16 + 24 + 16 => 56 */} 
                in={props.expand} 
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
                            props.groups?.map((group, index) => {
                                return (
                                    <Box key={index}>
                                        <ListItem disablePadding>
                                            <ListItemButton onClick={() => {
                                                toggleGroup(index);
                                                props.onExpandChanged?.(true);
                                            }}>
                                                <ListItemIcon>
                                                    {group.icon  ?? <FolderIcon/>}
                                                </ListItemIcon>
                                                <ListItemText primary={group.label}/>
                                                {groupExpanded[index] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                            </ListItemButton>
                                        </ListItem>
                                        <Collapse in={props.expand && groupExpanded[index]} timeout="auto" unmountOnExit>
                                            <List component="div" disablePadding >
                                                {
                                                    group.items?.map((item, index) => (
                                                        <ListItem disablePadding key={index}>
                                                            <ListItemButton sx={{ pl: 4 }} component={Link} href={item.url} >
                                                                <ListItemIcon>
                                                                    {item.icon  ?? <ArticleIcon/>}
                                                                </ListItemIcon>
                                                                <ListItemText primary={item.label} />
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
                                props.onExpandChanged?.(true);
                            }}>
                                <ListItemIcon>
                                    <TuneIcon/>
                                </ListItemIcon>
                                <ListItemText primary="设置"/>
                                {settingsExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            </ListItemButton>
                        </ListItem>
                        <Collapse in={props.expand && settingsExpanded} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem disablePadding>
                                    <ListItemButton sx={{ pl: 4 }} onClick={()=>props.onToggleTheme?.()}>
                                        <ListItemIcon>
                                            <Brightness4Icon />
                                        </ListItemIcon>
                                        <ListItemText primary="主题" />
                                            <Tooltip title="明亮" placement="top" arrow>
                                                <IconButton color={props.theme === 'light' ? 'primary' : 'inherit'} onClick={(ev) => {props.onToggleTheme?.('light'); ev.stopPropagation();}}>
                                                    <LightModeIcon/>
                                                </IconButton>
                                            </Tooltip>

                                            <Tooltip title="自动" placement="top" arrow>
                                                <IconButton color={props.theme === 'auto' ? 'primary' : 'inherit'} onClick={(ev) => {props.onToggleTheme?.('auto'); ev.stopPropagation();}}>
                                                    <BrightnessAutoIcon/>
                                                </IconButton>
                                            </Tooltip>

                                            <Tooltip title="黑暗" placement="top" arrow>
                                                <IconButton color={props.theme === 'dark' ? 'primary' : 'inherit'} onClick={(ev) => {props.onToggleTheme?.('dark'); ev.stopPropagation();}}>
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
                        <Slide in={props.expand && childrenVisible} direction="up" mountOnEnter unmountOnExit>
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