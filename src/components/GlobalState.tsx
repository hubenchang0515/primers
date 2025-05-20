'use client';
import theme from '@/utils/theme';
import React, { createContext, useContext, useEffect, useState } from 'react';

export interface GlobalStateProps {
    loading?: boolean;
    initialized?: boolean;
    setLoading?: (v?:boolean)=>void;
    setInitialized?: (v?:boolean)=>void;

    currentTitle?: number;
    expandedSideGroup?: number;
    sideExpanded?: boolean;
    sideCollapsedSize?: number;
    setCurrentTitle?: (v?:number)=>void;
    setExpandedSideGroup?: (v?:number)=>void;
    setSideExpanded?: (v?:boolean)=>void;
    setSideCollapsedSize?: (v?:number)=>void;
}

export const GlobalState = createContext<GlobalStateProps>({});

export function useGlobalState() {
    return useContext(GlobalState);
}

export interface GlobalStateProviderProps {
    children?: React.ReactNode;
}

export function GlobalStateProvider(props:GlobalStateProviderProps) {
    const [loading, setLoading] = useState<boolean|undefined>(true);
    const [initialized, setInitialized] = useState<boolean|undefined>(false);

    const [currentTitle, setCurrentTitle] = useState<number|undefined>(undefined);
    const [expandedSideGroup, setExpandedSideGroup] = useState<number|undefined>(undefined);
    const [sideExpanded, setSideExpanded] = useState<boolean|undefined>(true);
    const [sideCollapsedSize, setSideCollapsedSize] = useState<number|undefined>(0);   // 16 + 24 + 16 => 56 

    useEffect(() => {
        if (window.innerWidth < theme.breakpoints.values.md) {
            setSideCollapsedSize?.(0);
            setSideExpanded?.(false);
        } else {
            setSideCollapsedSize?.(56);
            setSideExpanded?.(true);
        }
    }, [setSideCollapsedSize]);

    return (
        <GlobalState.Provider 
            value={{
                loading,
                initialized,
                setLoading,
                setInitialized,

                currentTitle, 
                expandedSideGroup, 
                sideExpanded,
                sideCollapsedSize,
                setCurrentTitle,
                setExpandedSideGroup,
                setSideExpanded,
                setSideCollapsedSize,
            }}
        >
            { props.children }
        </GlobalState.Provider>
    )
}