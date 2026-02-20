"use client";
import {Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material';
import NextLink from "next/link";
import { MouseEvent, useEffect, useState } from 'react';
import { useGlobalState } from './GlobalState';
import { SITE_CONFIG } from '@/config';

export default function Link(props:MuiLinkProps) {
    const { setLoading } = useGlobalState();
    const [ location, setLocation ] = useState<Location>();

    useEffect(() => {
        setLocation(window.location);
    }, []);

    // 空链接
    if (!props.href) {
        return <MuiLink {...props} color='textDisabled' href="#">{props.children}</MuiLink>
    }

    // 外部链接
    if (props.href.startsWith("http") && !props.href.startsWith(SITE_CONFIG.origin + SITE_CONFIG.basePath)) {
        return <MuiLink component={NextLink} target="_blank" rel="noopener" {...props}>{props.children}</MuiLink>
    }

    // 当前页面
    if (props.href.startsWith("#") || 
        location && props.href.startsWith(location.pathname + '#') || 
        location && props.href.startsWith(location.origin + location.pathname + '#')) {
        return <MuiLink component={NextLink} {...props}>{props.children}</MuiLink>
    }
    
    // 内部链接
    return (
        <MuiLink
            component={NextLink}
            {...props}
            onClick={(ev:MouseEvent<HTMLAnchorElement>)=>{
                const target = new URL(SITE_CONFIG.basePath + (props.href??''), SITE_CONFIG.origin);
                if (target.pathname !== window.location.pathname) {
                    setLoading?.(true);
                }
                props.onClick?.(ev);
            }}
        >
            {props.children}
        </MuiLink>
    )
}