"use client";
import { useEffect, useState } from "react";
import { useGlobalState } from "./GlobalState";
import MainPage from "./MainPage";
import { Box, Button, Container } from "@mui/material";
import I18n from "@/utils/i18n";
import InstallDesktopIcon from '@mui/icons-material/InstallDesktop';

export default function Install() {
    const [lang, setLang] = useState('en')
    const i18n = new I18n(lang);
    const {installPrompt} = useGlobalState();
    
    useEffect(() => {
        setLang(navigator.language.startsWith('zh') ? 'zh' : 'en')
    }, [setLang]);

    return(
        <MainPage lang={lang} depth={1} disableDiscussion>
            <Container maxWidth='sm' sx={{flex:1, display:'flex'}}>
                <Box flex={1} display='flex' flexDirection='column' gap={1} justifyContent='center'>
                    <Button variant="contained" color="info" startIcon={<InstallDesktopIcon/>} onClick={()=>installPrompt?.prompt()}>{i18n.t("install.install")}</Button>
                    <Button variant="outlined" color="info">{i18n.t("install.back")}</Button>
                </Box>
            </Container>
        </MainPage>
    )
}