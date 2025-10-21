import path from "path";
import { categories, chapters, content, docs, languages } from "./document"
import { anchorHash } from "./crypto";

export interface SearchNode {
    url: string,
    text?: string,
    children?: SearchNode[]
}

// 提取 markdown 标题
function extractMarkdownHeadings(content: string): string[] {
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const headings: string[] = [];
    
    let match;
    while ((match = headingRegex.exec(content)) !== null) {
        const title = match[2].trim();
        headings.push(title);
    }
    
    return headings;
}

// 解析并生成 doc 节点
async function parseDoc(lang:string, category:string, chapter?:string, doc?:string) {
    const markdown = await content(lang, category, chapter, doc);
    const headings = extractMarkdownHeadings(markdown);

    const node:SearchNode = {
        text: '',
        url: path.join('/document', lang, category, chapter??"", doc??""),
        children: [],
    }

    for (const heading of headings) {
        node.children?.push({
            text: heading,
            url: path.join('/document', lang, category, chapter??"", doc??"") + "#" + await anchorHash(heading),
        })
    }

    return node;
}

// 解析并生成 chapter 节点
async function paerseChapter(lang:string, category:string, chapter:string) {
    const childrens = await docs(lang, category, chapter);
    const node:SearchNode = {
        text: '',
        url: path.join('/document', lang, category, chapter??""),
        children: [],
    }

    for (const child of childrens) {
        node.children?.push(await parseDoc(lang, category, chapter, child));
    }

    return node;
}

// 解析并生成 category 节点
async function paerseCategory(lang:string, category:string) {
    const childrens = await chapters(lang, category);
    const node:SearchNode = {
        text: '',
        url: path.join('/document', lang, category),
        children: [],
    }

    for (const child of childrens) {
        node.children?.push(await paerseChapter(lang, category, child));
    }

    return node;
}

// 解析并生成 language 节点
async function parseLanguage(lang:string) {
    const childrens = await categories(lang);
    const node:SearchNode = {
        text: '',
        url: path.join('/document', lang),
        children: [],
    }

    for (const child of childrens) {
        node.children?.push(await paerseCategory(lang, child));
    }

    return node;
}

// 生成根节点
export async function searchTree(lang?:string) {
    if (lang) {
        return parseLanguage(lang);
    }

    const childrens = await languages();
    const node:SearchNode = {
        text: '',
        url: path.join('/document'),
        children: [],
    }

    for (const child of childrens) {
        node.children?.push(await parseLanguage(child));
    }

    return node;
}