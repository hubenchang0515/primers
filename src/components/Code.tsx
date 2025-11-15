import { include } from "@/utils/include";
import Graphviz from "./Graphviz";
import Mermaid from "./Mermaid";
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import hljs from "highlight.js";
import Shift from "./Shift";
import IframePage from "./IframePage";
import LabelCode from "./LabelCode";
import DOMPurify from "isomorphic-dompurify";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import I18n from "@/utils/i18n";
import Terminal from "./Terminal";

export interface CodeProps{
    code: string;
    language: string;   // code language
    lang?: string;      // i18n language
    meta?: string|null;
    start: number;
    end: number;
}

export default async function Code(props:CodeProps) {
     const i18n = new I18n(props.lang);
    let code = props.code;
    const includeMatch = /\$include\((.*?)\)/.exec(props.code)
    if (includeMatch) {
        code = await include(includeMatch[1]);
    }
    
    // 标注为 graphviz 表示使用 graphviz 绘图
    if (props.language === 'graphviz') {
        return (
            <Graphviz sx={{marginBlock:'8px', textAlign:'center', whiteSpace:'normal'}} code={code}/>
        )
    }

    // 标注为 mermaid 表示使用 mermaid 绘图
    if (props.language === 'mermaid') {
        return <Mermaid sx={{marginBlock:'8px', textAlign:'center', whiteSpace:'normal'}} code={code}/>
    }

    // 标注为 xterm 表示使用 xterm 显示（支持转义字符）
    if (props.language === 'xterm') {
        return <Terminal sx={{marginBlock:'8px'}} code={code} rows={parseInt(props.meta??'')}/>
    }

    // 标注为 auto 表示自动检测语言类型
    if (props.language === 'auto') {
        const result = hljs.highlightAuto(code);
        return (
            <Box sx={{marginBlock:'8px'}}>
                <code className={`language-${result.language} hljs`} dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(result.value)}}></code>
            </Box>
        )
    }
    
    const result = hljs.highlight(code, {language: props.language||"text"});
    
    if (props.meta?.trim().startsWith('shift')) {
        // 额外标记 shift 表示用 shift 运行
        const args = props.meta?.trim().split(/\s+/);
        return <Shift lang={props.lang} language={result.language??'text'} code={code} highlight={DOMPurify.sanitize(result.value)} input={args.slice(1).join(" ")}/>
    } else if (props.meta?.trim().startsWith('embed')) {
        // 额外标记 embed， 直接内嵌 HTML
        return (
            <Box sx={{marginBlock:'8px', whiteSpace:'normal', overflow:'auto'}} className={props.language} dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(code)}}/>
        )
    } else if (props.meta?.trim().startsWith('iframe')) {
        // 额外标记 iframe，通过 iframe 内嵌 HTML
        const args = props.meta?.trim().split(/\s+/); // 获取标题
        return (
            <Box sx={{marginBlock:'8px', whiteSpace:'normal'}} className={props.language}>
                <IframePage title={args?.slice(1).join(' ')||'HTML'} code={code}/>
            </Box>
        )
    } else if (props.meta?.trim().startsWith('unsafe')) {
        // 额外标记 unsafe，通过 iframe 内嵌 HTML 并且不使用 DOMPurify
        const args = props.meta?.trim().split(/\s+/); // 获取标题
        return (
            <Box sx={{marginBlock:'8px', whiteSpace:'normal'}} className={props.language}>
                <IframePage title={args?.slice(1).join(' ')||'HTML'} code={code} unsafe/>
            </Box>
        )
    } else if (props.meta?.trim().startsWith('style')) {
        // 额外标记 style，自定义样式
        const args = props.meta?.trim().split(/\s+/);
        const style = args.slice(1).join(" ");
        return (
            <Box sx={{marginBlock:'8px'}} dangerouslySetInnerHTML={{
                __html: `<code class='language-${result.language} hljs' style='${style}'>${DOMPurify.sanitize(result.value)}</code>`
            }}/>
        )
    } else if (props.meta?.trim().startsWith('label')) {
        // 额外标记 label，添加标签
        const args = props.meta?.trim().split(/\s+/);
        const name = args.slice(1).join(" ");

        
        if (props.meta?.trim().startsWith('label-success'))
            return <LabelCode label={name} code={result.value} language={result.language} level={1}/>
        else if (props.meta?.trim().startsWith('label-warning'))
            return <LabelCode label={name} code={result.value} language={result.language} level={2}/>
        else if (props.meta?.trim().startsWith('label-error'))
            return <LabelCode label={name} code={result.value} language={result.language} level={3}/>
        else
            return <LabelCode label={name} code={result.value} language={result.language} level={0}/>
    } else if (props.meta?.trim().startsWith('collapse')) {
        // 额外标记 collapse，默认折叠
        return (
            <Accordion disableGutters elevation={0} square slotProps={{transition:{timeout:200}}}>
                <AccordionSummary 
                    expandIcon={<ArrowDropDownIcon/>} 
                    sx={{
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                        margin: 0,
                    }}
                >
                    <Typography component="span" sx={{pl:1}}>{i18n.t("code.show")}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{margin:0, padding:0}}>
                    <code className={`language-${result.language} hljs`}  dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(result.value)}}></code>
                </AccordionDetails>
            </Accordion>
        )
    } else if (props.language) {
        // 没有额外标记，正常渲染语法高亮
        return (
            <Box sx={{marginBlock:'8px'}}>
                <code className={`language-${result.language} hljs`}  dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(result.value)}}></code>
            </Box>
        )
    }

    if (code.includes('\n')) {
        // 存在换行，正常渲染语法高亮
        const result = hljs.highlight(code, {language: 'text'});
        return (
            <Box sx={{marginBlock:'8px'}}>
                <code className={`language-${result.language} hljs`}  dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(result.value)}}></code>
            </Box>
        )
    } else {
        // 不存在换行，为行内代码

        // id 元素，用于自定义锚点
        let match = code.match(/^!id:\s*([a-zA-Z0-9-_]+)\s*([\s\S]*)/)
        if (match) {
            return <span id={match[1]}/>
        }

        // embed元素，用于自定义样式
        match = code.match(/^!embed:\s*(.*)\s*([\s\S]*)/)
        if (match) {
            return <span dangerouslySetInnerHTML={{__html: match[1]}}/>
        }

        // subtitle元素，小标题
        match = code.match(/^!subtitle([1234]?):\s*(.*)\s*([\s\S]*)/)
        if (match) {
            const color = ['--mui-palette-Alert-infoFilledColor', '--mui-palette-Alert-successFilledColor', '--mui-palette-Alert-warningFilledColor', '--mui-palette-Alert-errorFilledColor'][(Number(match[1]||1)+3)%4]
            const bg = ['--mui-palette-Alert-infoFilledBg', '--mui-palette-Alert-successFilledBg', '--mui-palette-Alert-warningFilledBg', '--mui-palette-Alert-errorFilledBg'][(Number(match[1]||1)+3)%4]
            return <span style={{display:'flex', color:`var(${color})`, background:`linear-gradient(90deg, var(${bg}), rgba(255,255,255,0))`}} >
                <span dangerouslySetInnerHTML={{__html: match[2]}}></span>
            </span>
        }

        // 普通行内代码
        const quota = ((props.end) - (props.start)) - props.code.length;
        const color = quota === 4 ? 'var(--mui-palette-primary-contrastText)' : quota === 6 ? 'var(--mui-palette-secondary-contrastText)' : 'var(--mui-palette-text-primary)';
        const background = quota === 4 ? 'var(--mui-palette-primary-main)' : quota === 6 ? 'var(--mui-palette-secondary-main)' : 'var(--mui-palette-action-selected)';
        return (
            <code 
                style={{
                    color: color,
                    background: background, 
                    fontSize: '0.8em', 
                    padding: '0.2em 4px 1px 4px', 
                    verticalAlign: '0.1em', 
                    border: '1px solid var(--mui-palette-background-paper)',
                    wordBreak: 'break-all',
                    whiteSpace: 'pre-wrap',
                }}
            >
                {code}
            </code>
        )
    }
}