"use client";
import { wrapLang } from '@/utils/language';
import Giscus from '@giscus/react';
import { Box, useColorScheme } from '@mui/material';

export interface DiscussionProps {
    lang?:string;
}

export default function Discussion(props:DiscussionProps) {
    const {mode} = useColorScheme();
    return (
        <Box>
            <Giscus
                id="comments"
                repo="hubenchang0515/primers"
                repoId="R_kgDOOW5w2A"
                category="Announcements"
                categoryId="DIC_kwDOOW5w2M4Cp13Z"
                mapping="pathname"
                term="Welcome to @giscus/react component!"
                reactionsEnabled="1"
                emitMetadata="0"
                inputPosition="top"
                theme={mode === 'system' ? 'preferred_color_scheme' : mode}
                lang={wrapLang(props.lang)}
                loading="lazy"
            />
        </Box>
    );
}