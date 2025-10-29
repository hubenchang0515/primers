import { render } from "@/utils/mermaid";
import { Accordion, AccordionDetails, AccordionSummary, Box, SxProps, Theme } from "@mui/material";

export interface MermaidProps {
    code: string;
    sx?: SxProps<Theme>;
}

export default async function Mermaid(props:MermaidProps) {
    try {
        const svg = await render(props.code);
        return <Box className='graphviz' sx={props.sx} dangerouslySetInnerHTML={{__html: svg}}/>
    } catch (err) {
        return (
            <Box className='graphviz' sx={props.sx}>
                <Accordion disableGutters elevation={0} square slotProps={{transition:{timeout:200}}} sx={{color:"var(--mui-palette-Alert-errorFilledColor)", background:"var(--mui-palette-Alert-errorFilledBg)"}}>
                    <AccordionSummary>Mermaid 渲染错误</AccordionSummary>
                    <AccordionDetails sx={{textAlign:'start', whiteSpace:'pre'}}>{err as string}</AccordionDetails>
                </Accordion>
            </Box>
        )
    }
}