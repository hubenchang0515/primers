import { Alert, AlertProps, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import ReactMarkdown, { Components } from 'react-markdown'
import { hash } from '@/utils/crypto';
import { visit } from 'unist-util-visit';
import { Node } from 'unist';
import { Paragraph } from 'mdast';
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math';
import rehypeMathjax from 'rehype-mathjax';
import hljs from 'highlight.js';
import { ComponentProps, ElementType } from 'react';
import Image from './Image';
import DOMPurify from "isomorphic-dompurify";
import Link from './Link';
import Mermaid from './Mermaid';
import Graphviz from './Graphviz';
import IframePage from './IframePage';
import { include } from '@/utils/include';
import Shift from './Shift';

export interface MarkdownProps {
    lang?: string;
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

const MakeComponents = (lang?:string):Components => {
    return {
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
            return <Typography component={'li'} variant='body1'sx={{fontSize:'1rem', fontWeight:'normal', marginBlock:'8px'}}>{props.children}</Typography>
        },

        async code(props) {
            let code = props.children as string ?? '';
            const includeMatch = /\$include\((.*?)\)/.exec(code)
            if (includeMatch) {
                code = await include(includeMatch[1]);
            }

            const languageMatch = /language-(\w+)/.exec(props.className || '')
            if (languageMatch) {
                const language = languageMatch[1];

                // 标注为 graphviz 表示使用 graphviz 绘图
                if (language === 'graphviz') {
                    return (
                        <Graphviz sx={{marginBlock:'8px', textAlign:'center', whiteSpace:'normal'}} code={code}/>
                    )
                }

                // 标注为 mermaid 表示使用 mermaid 绘图
                if (language === 'mermaid') {
                    return <Mermaid sx={{marginBlock:'8px', textAlign:'center', whiteSpace:'normal'}} code={code}/>
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
                    return <Shift lang={lang} language={result.language??'text'} code={code} highlight={DOMPurify.sanitize(result.value)} input={args.slice(1).join(" ")}/>
                } else if (props.node?.data?.meta?.trim().startsWith('embed')) {
                    // 额外标记 embed， 直接内嵌 HTML
                    return (
                        <Box sx={{marginBlock:'8px', whiteSpace:'normal'}} className={language} dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(code)}}/>
                    )
                } else if (props.node?.data?.meta?.trim().startsWith('iframe')) {
                    // 额外标记 iframe，通过 iframe 内嵌 HTML
                    const args = props.node?.data?.meta?.trim().split(/\s+/); // 获取标题
                    return (
                        <Box sx={{marginBlock:'8px', whiteSpace:'normal'}} className={language}>
                            <IframePage title={args?.slice(1).join(' ')||'HTML'} code={code}/>
                        </Box>
                    )
                } else if (props.node?.data?.meta?.trim().startsWith('unsafe')) {
                    // 额外标记 unsafe，通过 iframe 内嵌 HTML 并且不使用 DOMPurify
                    const args = props.node?.data?.meta?.trim().split(/\s+/); // 获取标题
                    return (
                        <Box sx={{marginBlock:'8px', whiteSpace:'normal'}} className={language}>
                            <IframePage title={args?.slice(1).join(' ')||'HTML'} code={code} unsafe/>
                        </Box>
                    )
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

                const quota = ((props.node?.position?.end.offset??0) - (props.node?.position?.start.offset??0)) - (props.children as string).length;
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
                            wordBreak: 'keep-all',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {code}
                    </code>
                )
            }
        },

        async pre(props) {
            return <pre className={props.className}>{ props.children }</pre>
        },
    }
}

export default function Markdown(props: MarkdownProps) {
    
    return (
        <article>
            <ReactMarkdown
                remarkPlugins={[remarkGfm, customClass, remarkMath]}
                rehypePlugins={[rehypeMathjax]}
                components={MakeComponents(props.lang)}
            >
                {props.content}
            </ReactMarkdown>
        </article>
    )
}