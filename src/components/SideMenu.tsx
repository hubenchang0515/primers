"use client"

import { Box, Button, ButtonGroup, Collapse, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Slide, Tooltip } from "@mui/material";
import { JSX, useCallback, useEffect, useRef, useState } from "react";
import Link from "./Link";
import { useGlobalState } from "./GlobalState";

import TuneIcon from '@mui/icons-material/Tune';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import BrightnessAutoIcon from '@mui/icons-material/BrightnessAuto';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import FolderIcon from '@mui/icons-material/Folder';
import ArticleIcon from '@mui/icons-material/Article';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import InstallDesktopIcon from '@mui/icons-material/InstallDesktop';
import I18n from "@/utils/i18n";

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
    lang?: string;
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
}

export default function SideMenu(props:SideMenuProps) {
    const i18n = new I18n(props.lang);
    const {initialized, setInitialized, installPrompt} = useGlobalState();
    const init = useCallback(() => {
        if (!initialized) {
            setInitialized?.(true);
        }
    }, [initialized, setInitialized]);

    // 设置列表展开状态
    const [settingsExpanded, setSettingsExpanded] = useState<boolean>(false);

    // 底部包含的子元素
    const [childrenVisible, setChildrenVisible] = useState(false);

    // 
    const scrollDivRef = useRef<HTMLDivElement>(null); 

    const scroll = useCallback((to:'top'|'current'|'bottom') => {
        switch (to) {
            case 'top': 
            scrollDivRef.current?.scrollTo({behavior:'smooth', top:0});
            break;

            case 'bottom': 
            scrollDivRef.current?.scrollTo({behavior:'smooth', top:scrollDivRef.current.scrollHeight});
            break;

            case 'current':
                if (props.selectedGroup && props.expandedGroup !== props.selectedGroup) {
                    props.onExpandedGroupChanged?.(props.selectedGroup);
                }
                const item = document.querySelector('.active-side-item');
                const rect = item?.getBoundingClientRect();
                
                if (!rect) {
                    return;
                }

                if (rect.top < 0 || rect.bottom > (window.innerHeight || document.documentElement.clientHeight)) {
                    item?.scrollIntoView({behavior:'smooth', block:'center'});
                }
                break

        }
    }, [props]);

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
                position: {xs:'absolute', md:'static'},
                visibility: {xs: initialized ? 'visible' : 'hidden', md:'visible'},
                top:0,
                bottom:0,
                left:0
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
                onExited={init}
                onEnter={init}
            >
                <Box sx={{height:'100%', display:'flex', flexDirection:'column'}}>                    
                    <Box 
                        ref={scrollDivRef}
                        sx={{
                            flex:1,
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
                                        <ListItem disablePadding key={gIndex}
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems:'stretch',
                                            }}
                                        >
                                            <ListItemButton 
                                                className={gIndex === props.selectedGroup ? 'active-side-group' : ''}
                                                sx={{boxShadow: gIndex === props.selectedGroup ? '-2px 0 0 0 var(--mui-palette-secondary-main) inset' : ''}}
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
                                            <Collapse in={props.expanded && gIndex == props.expandedGroup } timeout={300}>
                                                <List disablePadding >
                                                    {
                                                        group.items?.map((item, dIndex) => (
                                                            <ListItem disablePadding key={dIndex}
                                                                className={gIndex === props.selectedGroup && dIndex === props.selectedItem ? 'active-side-item' : ''}
                                                                sx={gIndex === props.selectedGroup && dIndex === props.selectedItem ? {boxShadow:  '-2px 0 0 0 var(--mui-palette-secondary-main) inset'} : {}}
                                                            >
                                                                <ListItemButton 
                                                                    component={Link} 
                                                                    href={item.url}
                                                                    sx={{pl:4}} 
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
                                        </ListItem>
                                    )
                                })
                            }

                            <Divider component='li'/>

                            {/* 设置 */}
                            <ListItem disablePadding
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems:'stretch',
                                }}
                            >
                                <ListItemButton onClick={() => {
                                    setSettingsExpanded(!settingsExpanded);
                                    props.onExpandedChanged?.(true);
                                }}>
                                    <ListItemIcon>
                                        <TuneIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary={i18n.t("sidemenu.settings")}/>
                                    {settingsExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                </ListItemButton>
                                <Collapse in={props.expanded && settingsExpanded} timeout="auto" onEntered={()=>scroll('bottom')}>
                                    <List disablePadding>
                                        <ListItem disablePadding>
                                            <ListItemButton sx={{ pl: 4 }} onClick={()=>props.onSetMode?.('system')}>
                                                <ListItemIcon>
                                                    <Brightness4Icon />
                                                </ListItemIcon>
                                                <ListItemText primary={i18n.t("sidemenu.theme")} />
                                                    <Tooltip title={i18n.t("sidemenu.light")} placement="top" arrow>
                                                        <IconButton color={props.mode === 'light' ? 'primary' : 'inherit'} onClick={(ev) => {props.onSetMode?.('light'); ev.stopPropagation();}}>
                                                            <LightModeIcon/>
                                                        </IconButton>
                                                    </Tooltip>

                                                    <Tooltip title={i18n.t("sidemenu.system")} placement="top" arrow>
                                                        <IconButton color={props.mode === 'system' ? 'primary' : 'inherit'} onClick={(ev) => {props.onSetMode?.('system'); ev.stopPropagation();}}>
                                                            <BrightnessAutoIcon/>
                                                        </IconButton>
                                                    </Tooltip>

                                                    <Tooltip title={i18n.t("sidemenu.dark")} placement="top" arrow>
                                                        <IconButton color={props.mode === 'dark' ? 'primary' : 'inherit'} onClick={(ev) => {props.onSetMode?.('dark'); ev.stopPropagation();}}>
                                                            <DarkModeIcon/>
                                                        </IconButton>
                                                    </Tooltip>
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton sx={{ pl: 4 }} disabled={!installPrompt} onClick={()=>{installPrompt?.prompt()}}>
                                                <ListItemIcon>
                                                    <InstallDesktopIcon/>
                                                </ListItemIcon>
                                                <ListItemText primary={i18n.t("sidemenu.install")} secondary={i18n.t("sidemenu.shortcut")}/>
                                            </ListItemButton>
                                        </ListItem>
                                    </List>
                                </Collapse>
                            </ListItem>
                            
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
                    <ButtonGroup fullWidth>
                        <Button variant="text" color="inherit" aria-label="scroll to top" onClick={()=>{scroll('top');}}><KeyboardDoubleArrowUpIcon /></Button>
                        <Button variant="text" color="inherit" aria-label="scroll to selected" onClick={()=>{scroll('current');}}><MyLocationIcon /></Button>
                        <Button variant="text" color="inherit" aria-label="scroll to bottom" onClick={()=>{scroll('bottom');}}><KeyboardDoubleArrowDownIcon /></Button>
                    </ButtonGroup>
                </Box>
            </Collapse>
        </Paper>
    )
}