"use client"

import SideMenu, { SideMenuGroup } from "@/components/SideMenu";
import TitleBar, { TitleBarItem } from "@/components/TitleBar";
import { Box, Container, Fade, LinearProgress } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { useColorScheme } from '@mui/material/styles';
import { useGlobalState } from "./GlobalState";
import { useRouter } from 'next/navigation'; 
import Discussion from "./Discussion";
import Footer from "./Footer";
import { OWNER_CONFIG, SITE_CONFIG } from "@/config";
import Locale from "./Locale";

export interface MainPageProps {
    lang?: string;
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
        loading,
        currentTitle, 
        expandedSideGroup, 
        sideExpanded,
        sideCollapsedSize,
        setLoading,
        setCurrentTitle,
        setExpandedSideGroup,
        setSideExpanded,
    } = useGlobalState();

    // 窄屏自动收起侧边栏
    useEffect(() => {
        if (props.depth === 3 && window.innerWidth < 900) {
            setSideExpanded?.(false)
        }
    }, [props.depth, setSideExpanded]);

    // 标题切换
    const setTitle = useCallback((index?:number) => {
        setCurrentTitle?.(index);
        setLoading?.(true);
        setTimeout(() => {
            if (index !== undefined && props.titleItems !== undefined && props.titleItems.length > index) {
                router.push(props.titleItems[index].url);
            }
        }, 200);
    }, [props, router, setLoading, setCurrentTitle]);

    // 初始展开当前页面所在的分组
    useEffect(() => {
        // undefined 是初始状态，自动展开选中的分组，-1 是关闭状态
        if (expandedSideGroup === undefined) {
            setExpandedSideGroup?.(props.selectedSideGroup);
        }
    }, [expandedSideGroup, props.selectedSideGroup, setExpandedSideGroup]);

    // 展开和关闭侧边栏分组
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
        setExpandedSideGroup?.(props.selectedSideGroup);
    }, [setLoading]);

    return (
        <Box sx={{width: '100%', height: '100%', display: 'flex', flexDirection:'column'}}>
            <Locale lang={props.lang??'en'}/>
            <LinearProgress aria-label='loading' sx={{position:'fixed', top:0, width:'100%', height:2, zIndex:loading?9999:-9999}} color="secondary" variant={loading?'indeterminate':'determinate'} value={100}/>
            <TitleBar 
                lang={props.lang}
                title={SITE_CONFIG.title}
                github={SITE_CONFIG.repo}
                items={props.titleItems}
                current={currentTitle??props.currentTitle}
                onToggleMenu={()=>setSideExpanded?.(!sideExpanded)}
                onCurrentChanged={setTitle}
            />
            <Box sx={{display:'flex', height:'calc(100% - 48px)', position:'relative'}}>
                <SideMenu
                    lang={props.lang}
                    collapsedSize={sideCollapsedSize}
                    expanded={sideExpanded} 
                    onExpandedChanged={setSideExpanded} 
                    mode={mode} 
                    onSetMode={(mode)=>setMode(mode)}
                    groups={props.sideGroups}
                    expandedGroup={expandedSideGroup??props.selectedSideGroup}
                    selectedGroup={props.selectedSideGroup}
                    selectedItem={props.selectedDoc}
                    onExpandedGroupChanged={toggleSideGroup}
                />
                <Box sx={{flex:1, overflow:'auto', scrollBehavior:'smooth'}}>
                    <Container maxWidth='lg' sx={{padding:1, height:'100%'}}>
                        <Fade in={true} appear={false}>
                            <Box sx={{height:'100%', display:'flex', flexDirection:'column', gap:1}}>
                                { props.children }
                                <Discussion lang={props.lang}/>
                                <Footer sx={{marginTop:'auto'}} owner={OWNER_CONFIG.name} owner_url={OWNER_CONFIG.url} email={OWNER_CONFIG.email} lang={props.lang}/>
                            </Box>
                        </Fade>
                    </Container>
                </Box>
            </Box>
        </Box>
    );
}
