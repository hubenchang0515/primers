"use client"

import SideMenu, { SideMenuGroup } from "@/components/SideMenu";
import TitleBar, { TitleBarItem } from "@/components/TitleBar";
import { Box, LinearProgress } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { useColorScheme } from '@mui/material/styles';
import { useGlobalState } from "./GlobalState";
import { useRouter } from 'next/navigation'; 

export interface MainPageProps {
    depth: number;
    titleItems?: TitleBarItem[];
    currentTitle?: number;

    sideGroups?: SideMenuGroup[];
    selectedSideGroup?: number;
    selectedDoc?: number;

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
        loading,
        setCurrentTitle,
        setExpandedSideGroup,
        setSideExpanded,
        setLoading,
    } = useGlobalState();

    // 页面跳转
    const setUrl = useCallback((url:string) => {
        setLoading?.(true);
        router.push(url);
    }, [setLoading, router])

    // 窄屏自动收起侧边栏
    useEffect(() => {
        if (props.depth === 3 && window.innerWidth < 900) {
            setSideExpanded?.(false)
        }
    }, [props.depth, setSideExpanded]);

    // 标题切换
    const setTitle = useCallback((index?:number) => {
        setCurrentTitle?.(index);
        setTimeout(() => {
            if (index !== undefined && props.titleItems !== undefined && props.titleItems.length > index) {
                setUrl(props.titleItems[index].url);
                setSideExpanded?.(true);
            }
        }, 200);
    }, [props, setUrl, setCurrentTitle, setSideExpanded]);

    // 初始展开选中的分组
    useEffect(() => {
        if (expandedSideGroup === undefined) {
            setExpandedSideGroup?.(props.selectedSideGroup);
        }
    }, [expandedSideGroup, props.selectedSideGroup, setExpandedSideGroup]);

    // 展开侧边栏分组
    const toggleSideGroup = (index:number) => {
        if (index === expandedSideGroup) {
            setExpandedSideGroup?.(-1); // undefined 是初始状态，自动展开选中的分组，-1 是关闭状态
        } else {
            setExpandedSideGroup?.(index);
        }
    }

    // 清除加载状态
    useEffect(() => {
        setLoading?.(false);
    }, [setLoading]);

    return (
        <Box sx={{width: '100%', height: '100%', display: 'flex', flexDirection:'column'}}>
            <LinearProgress sx={{position:'fixed', top:0, width:'100%', height:2, zIndex:loading?9999:-9999}} color="secondary"/>
            <TitleBar 
                title="Primers" 
                github="https://github.com/hubenchang0515/primers" 
                items={props.titleItems}
                current={currentTitle??props.currentTitle}
                onToggleMenu={()=>setSideExpanded?.(!sideExpanded)}
                onCurrentChanged={setTitle}
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
                    selectedGroup={props.selectedSideGroup}
                    selectedItem={props.selectedDoc}
                    onExpandedGroupChanged={toggleSideGroup}
                    setUrl={setUrl}
                />
                <Box sx={{flex:1, overflow:'auto'}}>
                    { props.children }
                </Box>
            </Box>
        </Box>
    );
}
