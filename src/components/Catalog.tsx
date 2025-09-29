import { Box, Button, Paper, Typography } from "@mui/material";
import { SideMenuGroup } from "./SideMenu";
import Link from "./Link";
import I18n from "@/utils/i18n";

export interface CatalogProps {
    groups: SideMenuGroup[]
    lang?: string;
}

export default function Catalog(props:CatalogProps) {
    const i18n = new I18n(props.lang);
    return (
        <Paper id="catalog" sx={{padding:'1rem', display:"flex", flexDirection:'column', gap:1}}>
            <Box sx={{display:'flex', justifyContent:'center'}}>
                <Typography variant="h6" textAlign='center' sx={{margin:'2px', borderBottom:'3px solid var(--mui-palette-primary-main)'}}>{i18n.t('catalog.title')}</Typography>
            </Box>
            <ol>
            {
                props.groups.map((group, index) => {
                    return (
                        <li key={index} >
                            <Box sx={{display:"flex", flexDirection:'column', gap:1}}>
                                <Typography variant="body2">{group.label}</Typography>
                                <Box key={index} sx={{display:'flex', gap:1, flex:1, overflow:'hidden', flexWrap:'wrap'}}>
                                    <ol>
                                    {
                                        group.items?.map((item, index) => {
                                            return <li key={index}><Button disableElevation LinkComponent={Link} href={item.url}>{item.label}</Button></li>
                                        })
                                    }
                                    </ol>
                                </Box>
                            </Box>
                        </li>
                    )
                })
            }
            </ol>
        </Paper>
    )
}