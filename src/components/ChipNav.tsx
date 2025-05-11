import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { TitleBarItem } from "./TitleBar";
import Link from "./Link";

export interface ChipNavProps {
    items?: TitleBarItem[];
}

export default function ChapNav(props:ChipNavProps) {
    return (
        <Paper sx={{padding:'1rem'}}>
            <Box sx={{display:'flex', justifyContent:'center'}}>
                <Typography variant="h6" textAlign='center' sx={{margin:'2px', borderBottom:'3px solid var(--mui-palette-primary-main)'}}>分类导航</Typography>
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