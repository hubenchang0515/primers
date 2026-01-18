import { Alert, AlertProps, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import ReactMarkdown, { Components } from 'react-markdown'
import { anchorHash } from '@/utils/crypto';
import { visit } from 'unist-util-visit';
import { Node } from 'unist';
import { Paragraph } from 'mdast';
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math';
import rehypeMathjax from 'rehype-mathjax';
import { ComponentProps, ElementType } from 'react';
import Image from './Image';
import Link from './Link';
import Code from './Code';

export interface MarkdownProps {
    lang?: string;
    url?: string;
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


const headingHash = async (props:ComponentProps<ElementType>) => {
    return await anchorHash(props.children)
}

const MakeComponents = (lang?:string, url?:string):Components => {
    return {
        async h1(props) { 
            return (
                <Typography id={`${await headingHash(props)}`} variant='h1' className={props.className} sx={{fontSize:'clamp(1.25rem, 6vw, 2.5rem)', fontWeight:'bolder', marginBlock:'1rem'}}>
                    <Link sx={{paddingRight:1}} href={`#${await headingHash(props)}`}>#</Link>
                    <Link color='inherit' underline='none' href={`${url??''}#${await headingHash(props)}`}>{props.children}</Link>
                </Typography>
            )
        },

        async h2(props) { 
            return (
                <Typography id={`${await headingHash(props)}`} variant='h2' className={props.className} sx={{fontSize:'clamp(1rem, 5vw, 2.25rem)', fontWeight:'bolder', marginBlock:'1rem', wordBreak:'break-all'}}>
                    <Link sx={{paddingRight:1}} href={`#${await headingHash(props)}`}>#</Link>
                    <Link color='inherit' underline='none' href={`${url??''}#${await headingHash(props)}`}>{props.children}</Link>
                </Typography>
            )
        },

        async h3(props) { 
            return (
                <Typography id={`${await headingHash(props)}`} variant='h3' className={props.className} sx={{fontSize:'clamp(1rem, 4vw, 2rem)', fontWeight:'bolder', marginBlock:'1rem', wordBreak:'break-all'}}>
                    <Link sx={{paddingRight:1}} href={`#${await headingHash(props)}`}>#</Link>
                    <Link color='inherit' underline='none' href={`${url??''}#${await headingHash(props)}`}>{props.children}</Link>
                </Typography>
            )
        },

        async h4(props) { 
            return (
                <Typography id={`${await headingHash(props)}`} variant='h4' className={props.className} sx={{fontSize:'clamp(1rem, 3vw, 1.75rem)', fontWeight:'bolder', marginBlock:'1rem', wordBreak:'break-all'}}>
                    <Link sx={{paddingRight:1}} href={`#${await headingHash(props)}`}>#</Link>
                    <Link color='inherit' underline='none' href={`${url??''}#${await headingHash(props)}`}>{props.children}</Link>
                </Typography>
            )
        },

        async h5(props) { 
            return (
                <Typography id={`${await headingHash(props)}`} variant='h5' className={props.className} sx={{fontSize:'clamp(1rem, 2vw, 1.5rem)', fontWeight:'bolder', marginBlock:'1rem', wordBreak:'break-all'}}>
                    <Link sx={{paddingRight:1}} href={`#${await headingHash(props)}`}>#</Link>
                    <Link color='inherit' underline='none' href={`${url??''}#${await headingHash(props)}`}>{props.children}</Link>
                </Typography>
            )
        },

        async h6(props) { 
            return (
                <Typography id={`${await headingHash(props)}`} variant='h6' className={props.className} sx={{fontSize:'clamp(1rem, 1vw, 1.25rem)', fontWeight:'bolder', marginBlock:'1rem', wordBreak:'break-all'}}>
                    <Link sx={{paddingRight:1}} href={`#${await headingHash(props)}`}>#</Link>
                    <Link color='inherit' underline='none' href={`${url??''}#${await headingHash(props)}`}>{props.children}</Link>
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
            let url = props.href??'';
            const matches = url.match(/#?!hash\(([^)]+)\)$/);
            if (matches) {
                url = url.replace(/#?!hash\(([^)]+)\)$/, '#' + await anchorHash(decodeURIComponent(matches[1])));
            }
            return <Link href={url}>{ props.children }</Link>
        },

        async img(props) {
            return <Image src={props.src as string} alt={props.alt} style={{display:'block', margin:'auto', maxWidth:'100%', height:'auto',}}/>
        },

        async blockquote(props) {
            const severity = props.node?.children.find(item => 'properties' in item)?.properties.className as AlertProps['severity'];
            if (severity) {
                return (
                    <Alert className='no-print' severity={severity} sx={{marginBlock:'8px'}}>
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
            if (!props.children) {
                return <TableCell align='center' sx={{color:'var(--mui-palette-text-disabled)', backgroundColor:'var(--mui-palette-action-disabledBackground)'}}><small>-</small></TableCell>
            } else {
                return <TableCell align={align}>{ props.children }</TableCell>
            }
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
            const code = props.children as string ?? '';
            const languageMatch = /language-(\w+)/.exec(props.className || '');
            if (languageMatch) {
                return <Code lang={lang} code={code} language={languageMatch[1].trim()} meta={props.node?.data?.meta} start={props.node?.position?.start.offset??0} end={props.node?.position?.end.offset??0}/>
            } else {
                return <Code lang={lang} code={code} language='' meta={props.node?.data?.meta} start={props.node?.position?.start.offset??0} end={props.node?.position?.end.offset??0}/>
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
                components={MakeComponents(props.lang, props.url)}
            >
                {props.content}
            </ReactMarkdown>
        </article>
    )
}