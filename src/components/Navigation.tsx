import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import Link from "./Link";
import i18n from "@/utils/i18n";

export interface ChapNavItem {
    label: string;
    url: string;
}

export interface ChipNavProps {
    lang?: string;
    items?: ChapNavItem[];
}

export default function Navigation(props:ChipNavProps) {
    return (
        <Paper sx={{padding:'1rem'}}>
            <Box sx={{display:'flex', justifyContent:'center'}}>
                <Typography variant="h6" textAlign='center' sx={{margin:'2px', borderBottom:'3px solid var(--mui-palette-primary-main)'}}> {i18n.t('navigation.title')} </Typography>
            </Box>
            <Grid container columns={{xs:1, sm:2, md: 4, lg:8}}>
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