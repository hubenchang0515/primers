'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';

export interface GlobalStateProps {
    currentTitle?: number;
    expandedSideGroup?: number;
    sideExpanded?: boolean;
    sideCollapsedSize?: number;
    loading?: boolean;

    setCurrentTitle?: (v?:number)=>void;
    setExpandedSideGroup?: (v?:number)=>void;
    setSideExpanded?: (v?:boolean)=>void;
    setSideCollapsedSize?: (v?:number)=>void;
    setLoading?: (v?:boolean)=>void;
}

export const GlobalState = createContext<GlobalStateProps>({});

export function useGlobalState() {
    return useContext(GlobalState);
}

export interface GlobalStateProviderProps {
    children?: React.ReactNode;
}

export function GlobalStateProvider(props:GlobalStateProviderProps) {
    const [currentTitle, setCurrentTitle] = useState<number|undefined>(undefined);
    const [expandedSideGroup, setExpandedSideGroup] = useState<number|undefined>(undefined);
    const [sideExpanded, setSideExpanded] = useState<boolean|undefined>(false);
    const [sideCollapsedSize, setSideCollapsedSize] = useState<number|undefined>(56);   // 16 + 24 + 16 => 56 
    const [loading, setLoading] = useState<boolean|undefined>(false);   // 16 + 24 + 16 => 56 

    useEffect(() => {
        if (window.innerWidth < 900) {
            setSideCollapsedSize?.(0);
        } else {
            setSideExpanded?.(true);
        }
    }, [setSideCollapsedSize]);

    return (
        <GlobalState.Provider 
            value={{
                currentTitle, 
                expandedSideGroup, 
                sideExpanded,
                sideCollapsedSize,
                loading,
                setCurrentTitle,
                setExpandedSideGroup,
                setSideExpanded,
                setSideCollapsedSize,
                setLoading,
            }}
        >
            { props.children }
        </GlobalState.Provider>
    )
}