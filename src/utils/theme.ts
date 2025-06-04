'use client';
import { pink } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    main: "#39c5bb"
                },
                secondary: pink,
                info: {
                    main: "#66CCFF",
                },
                mode: 'light',
            },
        },
        dark: {
            palette: {
                primary: {
                    main: "#39c5bb"
                },
                secondary: pink,
                info: {
                    main: "#66CCFF",
                },
                mode: 'dark',
            },
        }
    },
    cssVariables: {
        colorSchemeSelector: 'class'
    },
    typography: {
        fontFamily: `Maple Mono CN, Consolas, Monaco, monospace;`,   
    }, 
});

export default theme;