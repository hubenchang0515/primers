"use client"

import SideMenu, { SideMenuGroup } from "@/components/SideMenu";
import TitleBar, { TitleBarItem } from "@/components/TitleBar";
import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useColorScheme } from '@mui/material/styles';
import { useGlobalState } from "./GlobalState";
import { useRouter } from 'next/navigation'; 

export interface MainPageProps {
    depth: number;
    titleItems?: TitleBarItem[];
    currentTitle?: number;

    sideGroups?: SideMenuGroup[];
    expandedSideGroup?: number;

    children?: React.ReactNode;
}

export default function MainPage(props:MainPageProps) {
    // 路由
    const router = useRouter();

    // 主题模式
    const {mode, setMode} = useColorScheme();

    // 全局状态
    const {
        currentTitle, 
        expandedSideGroup, 
        sideExpanded,
        sideCollapsedSize,
        setCurrentTitle,
        setExpandedSideGroup,
        setSideExpanded
    } = useGlobalState();

    // 窄屏自动收起侧边栏
    useEffect(() => {
        if (props.depth === 3 && window.innerWidth < 900) {
            setSideExpanded?.(false)
        }
    }, [props.depth, setSideExpanded]);

    // 标题切换
    useEffect(() => {
        if (currentTitle === props.currentTitle) {
            return;
        }

        setTimeout(() => {
            if (currentTitle !== undefined && props.titleItems !== undefined && props.titleItems.length > currentTitle) {
                router.push(props.titleItems[currentTitle].url)
            }
        }, 200);
    }, [currentTitle, props, router]);

    return (
        <Box sx={{width: '100%', height: '100%', display: 'flex', flexDirection:'column'}}>
            <TitleBar 
                title="Primers" 
                github="https://github.com/hubenchang0515/primers" 
                items={props.titleItems}
                current={currentTitle??props.currentTitle}
                onToggleMenu={()=>setSideExpanded?.(!sideExpanded)}
                onCurrentChanged={setCurrentTitle}
            />
            <Box sx={{display:'flex', height:'calc(100% - 48px)'}}>
                <SideMenu
                    collapsedSize={sideCollapsedSize}
                    expanded={sideExpanded} 
                    onExpandedChanged={setSideExpanded} 
                    mode={mode} 
                    onSetMode={(mode)=>setMode(mode)}
                    groups={props.sideGroups}
                    expandedGroup={expandedSideGroup}
                    onExpandedGroupChanged={setExpandedSideGroup}
                />
                <Box sx={{flex:1, overflow:'auto'}}>
                    { props.children }
                </Box>
            </Box>
        </Box>
    );
}
