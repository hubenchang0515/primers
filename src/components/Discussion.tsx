"use client";
import { iana } from '@/utils/language';
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
                repoId="MDEwOlJlcG9zaXRvcnkzOTEzMTMwMjA="
                category="Announcements"
                categoryId="DIC_kwDOF1L2fM4B-hVS"
                mapping="pathname"
                term="Welcome to @giscus/react component!"
                reactionsEnabled="1"
                emitMetadata="0"
                inputPosition="top"
                theme={mode === 'system' ? 'preferred_color_scheme' : mode}
                lang={iana(props.lang)}
                loading="lazy"
            />
        </Box>
    );
}