"use client"

import SideMenu, { SideMenuGroup } from "@/components/SideMenu";
import TitleBar, { TitleBarItem } from "@/components/TitleBar";
import { Theme, SettingsManager } from "@/utils/setting";
import { Box, createTheme, CssBaseline, PaletteMode, ThemeProvider } from "@mui/material";
import { blue } from "@mui/material/colors";
import React, { useEffect, useRef, useState } from "react";

export interface MainPageProps {
    titleItems?: TitleBarItem[];
    currentTitle?: number;

    sideItems?: SideMenuGroup[];
    currentSide?: number;

    children?: React.ReactNode;
}

function makeTheme(settings?:SettingsManager) {
    return createTheme({
        palette: {
            primary: blue,
            secondary: {
                main: "#39c5bb"
            },
            mode: settings?.finalTheme() as PaletteMode,
            
        },
        typography: {
            fontFamily: `Inter, SF Pro, Segoe UI, Roboto, Oxygen, Ubuntu, Helvetica Neue, Helvetica, Arial, sans-serif;`,   
        }, 
    });
}

export default function MainPage(props:MainPageProps) {

    // 侧边菜单展开状态
    const [menuExpand, setMenuExpand] = useState<boolean>(true);
    
    // 主题
    const [theme, setTheme] = useState(makeTheme());
    
    // 全局配置
    const settings = useRef<SettingsManager>(undefined);

    // 初始化
    useEffect(() => {
        settings.current = new SettingsManager();
        setTheme(makeTheme(settings.current));
        settings.current.setChangedCallback(()=>setTheme(makeTheme(settings.current)));

        if (window.innerWidth < 720) {
            setMenuExpand(false);
        }
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
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
                        theme={settings.current?.theme()} 
                        onToggleTheme={(theme)=>settings.current?.toggleTheme(theme as Theme)}
                        groups={props.sideItems}
                        current={props.currentSide}
                    />
                    <Box sx={{flex:1, overflow:'auto'}}>
                        { props.children }
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
