import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import Link from "./Link";
import I18n from "@/utils/i18n";

export interface ChapNavItem {
    label: string;
    url: string;
}

export interface ChipNavProps {
    lang?: string;
    items?: ChapNavItem[];
    vetical?: boolean;
}

export default function Navigation(props:ChipNavProps) {
    const i18n = new I18n(props.lang);
    return (
        <Paper sx={{padding:'1rem'}}>
            <Box sx={{display:'flex', justifyContent:'center'}}>
                <Typography variant="h6" textAlign='center' sx={{margin:'2px', borderBottom:'3px solid var(--mui-palette-primary-main)'}}> {i18n.t('navigation.title')} </Typography>
            </Box>
            <Grid container columns={props.vetical ? 1 : {xs:1, sm:2, md: 4, lg:8}}>
            {
                props.items?.map((item, index) => {
                    return (
                        <Grid key={index}size={1} sx={{padding:'2px'}}>
                            <Button variant="contained" color="info" disableElevation fullWidth sx={{textTransform:'none'}} LinkComponent={Link} href={item.url}>{item.label}</Button>
                        </Grid>
                    )
                })
            }
            </Grid>
        </Paper>
    )
}