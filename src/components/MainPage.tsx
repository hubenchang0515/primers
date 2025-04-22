"use client"

import SideMenu, { SideMenuGroup } from "@/components/SideMenu";
import TitleBar, { TitleBarItem } from "@/components/TitleBar";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useColorScheme } from '@mui/material/styles';

export interface MainPageProps {
    titleItems?: TitleBarItem[];
    currentTitle?: number;

    sideItems?: SideMenuGroup[];
    currentSide?: number;

    children?: React.ReactNode;
}

export default function MainPage(props:MainPageProps) {
    const {mode, setMode} = useColorScheme();

    // 侧边菜单展开状态
    const [menuExpand, setMenuExpand] = useState<boolean>(true);

    // 初始化
    useEffect(() => {
        if (window.innerWidth < 720) {
            setMenuExpand(false);
        }
    }, []);

    return (
        <Box sx={{width: '100%', height: '100%', display: 'flex', flexDirection:'column'}}>
            <TitleBar 
                title="Primers" 
                github="https://github.com/hubenchang0515/primers" 
                items={props.titleItems}
                current={props.currentTitle}
                onToggleMenu={()=>setMenuExpand(!menuExpand)}
            />
            <Box sx={{display:'flex', height:'calc(100% - 48px)'}}>
                <SideMenu
                    expand={menuExpand} 
                    onExpandChanged={setMenuExpand} 
                    mode={mode} 
                    onSetMode={(mode)=>setMode(mode)}
                    groups={props.sideItems}
                    current={props.currentSide}
                />
                <Box sx={{flex:1, overflow:'auto'}}>
                    { props.children }
                </Box>
            </Box>
        </Box>
    );
}
