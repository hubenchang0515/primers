import { Alert, AlertProps, Box, Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import ReactMarkdown, { Components } from 'react-markdown'
import { hash } from '@/utils/crypto';
import { visit } from 'unist-util-visit';
import { Node } from 'unist';
import { Paragraph } from 'mdast';
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math';
import rehypeMathjax from 'rehype-mathjax';
import hljs from 'highlight.js';
import { Graphviz } from "@hpcc-js/wasm-graphviz";
import '@/assets/font.css';
import '@/assets/highlight.css';
import 'katex/dist/katex.min.css';
import { ComponentProps, ElementType } from 'react';
import Image from './Image';
import DOMPurify from "isomorphic-dompurify";
import Link from './Link';

export interface MarkdownProps {
    content:string;
}

const customClass = () => {    
    return (tree:Node) => {
        visit(tree, 'paragraph', (node:Paragraph) => {
            if (node.children.length > 0 && node.children[0].type === 'text') {
                const text = node.children[0].value;
                const match = text.match(/^!class:\s*([a-zA-Z0-9-_]+)\s*([\s\S]*)/);
                
                if (match) {
                    const className = match[1];
                    const remainingText = match[2].trimStart();
                    
                    // 修改节点的 class
                    node.data = node.data || {};
                    node.data.hProperties = { className };
                    
                    // 更新文本内容
                    node.children[0].value = remainingText;
                }
            }
        });
    };
}

const rawText = (props:ComponentProps<ElementType>) => {
    return props.children;
}

const shortHash = async (props:ComponentProps<ElementType>) => {
    return (await hash('SHA-256', new TextEncoder().encode(rawText(props)))).substring(0, 6);
}

const components:Components = {
    async h1(props) { 
        return (
            <Typography id={`${await shortHash(props)}`} variant='h1' className={props.className} sx={{fontSize:'2.5rem', fontWeight:'bolder', marginBlock:'1rem'}}>
                <Link sx={{paddingRight:1}} href={`#${await shortHash(props)}`}>#</Link>
                {props.children}
            </Typography>
        )
    },

    async h2(props) { 
        return (
            <Typography id={`${await shortHash(props)}`} variant='h2' className={props.className} sx={{fontSize:'2.25rem', fontWeight:'bolder', marginBlock:'1rem'}}>
                <Link sx={{paddingRight:1}} href={`#${await shortHash(props)}`}>#</Link>
                {props.children}
            </Typography>
        )
    },

    async h3(props) { 
        return (
            <Typography id={`${await shortHash(props)}`} variant='h3' className={props.className} sx={{fontSize:'2rem', fontWeight:'bolder', marginBlock:'1rem'}}>
                <Link sx={{paddingRight:1}} href={`#${await shortHash(props)}`}>#</Link>
                {props.children}
            </Typography>
        )
    },

    async h4(props) { 
        return (
            <Typography id={`${await shortHash(props)}`} variant='h4' className={props.className} sx={{fontSize:'1.75rem', fontWeight:'bolder', marginBlock:'1rem'}}>
                <Link sx={{paddingRight:1}} href={`#${await shortHash(props)}`}>#</Link>
                {props.children}
            </Typography>
        )
    },

    async h5(props) { 
        return (
            <Typography id={`${await shortHash(props)}`} variant='h5' className={props.className} sx={{fontSize:'1.5rem', fontWeight:'bolder', marginBlock:'1rem'}}>
                <Link sx={{paddingRight:1}} href={`#${await shortHash(props)}`}>#</Link>
                {props.children}
            </Typography>
        )
    },

    async h6(props) { 
        return (
            <Typography id={`${await shortHash(props)}`} variant='h6' className={props.className} sx={{fontSize:'1.25rem', fontWeight:'bolder', marginBlock:'1rem'}}>
                <Link sx={{paddingRight:1}} href={`#${await shortHash(props)}`}>#</Link>
                {props.children}
            </Typography>
        )
    },

    async p(props) { 
        if (props.className) {
            // 通过 span 消除样式，仅应用 class 样式
            return <span className={props.className}>{props.children}</span>
        } else {
            return <Typography variant='body1' className={props.className} sx={{fontSize:'1rem', fontWeight:'normal', marginBlock:'8px'}}>{props.children}</Typography>
        }
    },

    async a(props) {
        return <Link href={props.href??''}>{ props.children }</Link>
    },

    async img(props) {
        return <Image src={props.src} alt={props.alt} style={{display:'block', margin:'auto', maxWidth:'100%', height:'auto',}}/>
    },

    async blockquote(props) {
        const severity = props.node?.children.find(item => 'properties' in item)?.properties.className as AlertProps['severity'];
        if (severity) {
            return (
                <Alert severity={severity} sx={{marginBlock:'8px'}}>
                    {props.children}
                </Alert>
            )
        } else {
            return (
                <blockquote style={{marginBlock:'1rem', marginInline:0, padding:'1rem', border:'1px solid var(--mui-palette-primary-main)', borderLeft:'3px solid var(--mui-palette-primary-main)'}}>
                    {props.children}
                </blockquote>
            )
        }
    },

    async table(props) {
        return (
            <TableContainer component={Paper} variant="outlined" square sx={{marginBlock:'8px'}}>
                <Table size='small'>
                    { props.children }
                </Table>
            </TableContainer>
        )
    },

    async thead(props) {
        return <TableHead>{ props.children }</TableHead>
    },

    async tbody(props) {
        return <TableBody>{ props.children }</TableBody>
    },

    async tr(props) {
        return <TableRow>{ props.children }</TableRow>
    },

    async th(props) {
        const align = props.node?.properties.align as "center" | "right" | "left" | "inherit" | "justify" | undefined
        return <TableCell sx={{fontWeight:'bold', minWidth:'4rem'}} align={align}>{ props.children }</TableCell>
    },

    async td(props) {
        const align = props.node?.properties.align as "center" | "right" | "left" | "inherit" | "justify" | undefined
        return <TableCell align={align}>{ props.children }</TableCell>
    },

    async ol(props) {
        return <ol>{ props.children} </ol>
    },

    async ul(props) {
        return <ul>{ props.children} </ul>
    },

    async li(props) {
        return <li style={{marginBlock:'4px'}}>{ props.children} </li>
    },

    async code(props) {
        const code = props.children as string ?? '';
        const match = /language-(\w+)/.exec(props.className || '')
        if (match) {
            const language = match[1];

            // 标注为 embed 表示直接内嵌 HTML
            if (language === 'embed') {
                return (
                    <Box sx={{marginBlock:'8px', whiteSpace:'normal'}} className={language} dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(code)}}/>
                )
            }

            // 标注为 graphviz 表示使用 graphviz 绘图
            if (language === 'graphviz') {
                const graphviz = await Graphviz.load();
                const result = graphviz.dot(code).replace(/\n/g, "").trim();
                return (
                    <Box sx={{marginBlock:'8px', textAlign:'center', whiteSpace:'normal'}} className={language} dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(result)}}/>
                )
            }

            // 标注为 auto 表示自动检测语言类型
            if (language === 'auto') {
                const result = hljs.highlightAuto(code);
                return (
                    <Box sx={{marginBlock:'8px'}}>
                        <code className={`language-${result.language} hljs`} dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(result.value)}}></code>
                    </Box>
                )
            }
            
            const result = hljs.highlight(code, {language: language});
            
            if (props.node?.data?.meta?.trim().startsWith('shift')) {
                // 额外标记 shift 表示用 shift 运行
                const args = props.node?.data?.meta?.trim().split(/\s+/);

                if (args.length === 1) {
                    // 额外标记长度为 1 即只有 shift，则无参数
                    return (
                        <Box sx={{marginBlock:'8px', position:'relative', display:'flex', flexDirection:'column'}}>
                            <code className={`language-${result.language} hljs`} style={{minHeight:300, margin: 0, overflow:'auto'}} dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(result.value)}}></code>
                            <Box sx={{height:340, background:'black'}}>Loading...</Box>
                            <iframe 
                                title={`Shift WASM runtime environment for ${result.language}`} 
                                style={{
                                    width:'100%', 
                                    height:'100%', 
                                    position:'absolute', 
                                    top:0, 
                                    border:0, 
                                    background:'transparent'
                                }} 
                                src={`https://xplanc.org/shift/?lang=${result.language}&code=${btoa(encodeURIComponent(code))}`}
                            ></iframe>
                        </Box>
                    )
                } else {
                    // 额外标记长度不为 1，则有参数
                    return (
                        <Box sx={{marginBlock:'8px', position:'relative'}}>
                            <code className={`language-${result.language} hljs`} style={{minHeight:300, margin: 0, overflow:'auto'}}  dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(result.value)}}></code>
                            <Box sx={{height:340, background:'black'}}>Loading...</Box>
                            <iframe 
                                title={`Shift WASM runtime environment for ${result.language}`} 
                                style={{
                                    width:'100%', 
                                    height:'100%', 
                                    position:'absolute', 
                                    top:0, 
                                    border:0, 
                                    background:'transparent'
                                }} 
                                src={`https://xplanc.org/shift/?lang=${result.language}&input=${btoa(encodeURIComponent(args.slice(1).join(' ')))}&code=${btoa(encodeURIComponent(code))}`}
                            ></iframe>
                        </Box>
                    )
                }
            } else {
                // 没有额外标记，正常渲染语法高亮
                return (
                    <Box sx={{marginBlock:'8px'}}>
                        <code className={`language-${result.language} hljs`}  dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(result.value)}}></code>
                    </Box>
                )
            }
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
            // 不存在换行，为行内代码，渲染为 Chip
            const quota = ((props.node?.position?.end.offset??0) - (props.node?.position?.start.offset??0)) - (props.children as string).length;
            const color = quota === 4 ? 'primary' : quota === 6 ? 'secondary' : 'default';
            return <Chip component='code' size="small" color={color} sx={{borderRadius:0, border:'1px solid var(--mui-palette-background-paper)', verticalAlign:'bottom'}} label={ code }/>
        }
    },

    async pre(props) {
        return <pre className={props.className}>{ props.children }</pre>
    },
}

export default function Markdown(props: MarkdownProps) {
    
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm, customClass, remarkMath]}
            rehypePlugins={[rehypeMathjax]}
            components={components}
        >
            {props.content}
        </ReactMarkdown>
    )
}