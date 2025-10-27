import { IconButton, InputBase, Paper } from "@mui/material";

import SearchIcon from '@mui/icons-material/Search';
import I18n from "@/utils/i18n";
import { SITE_CONFIG } from "@/config";

export interface SearchBoxProps {
    lang?: string,
    defaultValue?: string,
    elevation?: number,
}


export default function SearchBox(props:SearchBoxProps) {
    const i18n = new I18n(props.lang);
    return (
        <Paper
            component="form"
            action={`${SITE_CONFIG.basePath}/document/${props.lang}/search`}
            sx={{ display: 'flex', alignItems: 'center'}}
            elevation={props.elevation}
            square
        >
                <InputBase
                    autoComplete="off"
                    sx={{ ml: 2, flex: 1 }}
                    placeholder={i18n.t("search.search")}
                    name="text"
                    defaultValue={props.defaultValue}
                />
                <IconButton type="submit" aria-label="search">
                    <SearchIcon />
                </IconButton>
        </Paper>
    )
}