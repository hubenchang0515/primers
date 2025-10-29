import path from "path";
import fs from 'fs/promises';
import { DOCUMENT_CONFIG } from "@/config";
import { execFile } from "child_process";

export interface DocState {
    createdTime: Date;
    updatedTime: Date;
}

// 分割序号和扩展名，提取标题
export function title(filename:string) {
    if (filename.includes(".")) {
        const items = filename.split(".");
        if (items.length < 2) {
            return filename;
        }
        else if (items.length === 2) {
            return items[1]
        } else {
            return items.slice(1, -1).join(".")
        }
    } else {
        return filename;
    }
}

// 按标题排序
export function sort(x:string, y:string) {
    const xPrefix = x.split('.')[0];
    const yPrefix = y.split('.')[0];

    const xNum = Number(xPrefix);
    const yNum = Number(yPrefix)

    if (!isNaN(xNum) && !isNaN(yNum)) {
        return xNum - yNum;
    } else if (!isNaN(xNum) && isNaN(yNum)) {
        return -1;
    } else if (isNaN(xNum) && !isNaN(yNum)) {
        return 1;
    } else {
        return x.localeCompare(y);
    }
}

// 内容清理，删除 Markdown 语法符号仅保留文本
export function text(content:string) {
    return content
        // 1) 代码块（保留内文，去掉 ```...``` 标记）
        .replace(/```[\s\S]*?```/g, m => m.replace(/```/g, ''))
        // 2) 行内代码 `code` -> code
        .replace(/`([^`]+)`/g, '$1')
        // 3) 图片：![alt](url "title") -> alt
        .replace(/!\[([^\]]*?)\]\([^\)]*?\)/g, '$1')
        // 4) 行内链接：[text](url "title") -> text
        .replace(/\[([^\]]+?)\]\([^\)]+?\)/g, '$1')
        // 5) 参考式链接 [text][id] -> text
        .replace(/\[([^\]]+?)\]\s*\[[^\]]*\]/g, '$1')
        // 6) 移除引用定义行 [id]: url
        .replace(/^\s*\[[^\]]+\]:.*$/gm, '')
        // 7) 自动链接 <http://...> 或 <user@host> -> 去掉尖括号保留内文
        .replace(/<([^ >]+@[^ >]+|https?:\/\/[^ >]+|mailto:[^ >]+)>/g, '$1')
        // 8) 标题的 # 符号： "# heading" -> "heading"
        .replace(/^\s{0,3}#{1,6}\s*/gm, '')
        // 9) 引用行："> " -> ""
        .replace(/^\s{0,3}>\s?/gm, '')
        // 10) 列表标记："- ", "* ", "+ ", "1. " -> ""
        .replace(/^\s{0,3}([-*+]|(\d+\.))\s+/gm, '')
        // 11) 表格分隔行 (|---|:---:|---:) 整行删除
        .replace(/^\s*\|?(\s*:?-+:?\s*\|)+\s*:?-+:?\s*\|?\s*$/gm, '')
        // 12) 表格竖线变空格（把 | 拆开为空格，以保留单元格文本）
        .replace(/\s*\|\s*/g, ' ')
        // 13) 删除水平线 --- 或 *** 单独一行
        .replace(/^\s*(\-{3,}|\*{3,}|_{3,})\s*$/gm, '')
        // 14) 删除强调符号 * _ ** *** ~~ （较激进，可能会移掉文本中的星号）
        .replace(/(\*\*|\*|__|_|~~)/g, '')
        // 15) 删除残余 HTML 标签（<b>...</b> 等）
        .replace(/<\/?[^>]+>/g, '')
        // 16) 移除多余的方括号或反斜线转义符
        .replace(/\\([\\`*_{}\[\]()#+\-.!])/g, '$1')
        // 18) 多空格压缩为一个空格
        .replace(/\s{2,}/g, ' ')
        .trim();
}

// 获取语言列表
export async function languages() {
    const dir = path.join(process.cwd(), DOCUMENT_CONFIG.root, 'document');
    const files = await fs.readdir(dir, { withFileTypes: true });
    return files.filter(file=>file.isDirectory()).map(file=>file.name);
}

// 获取分类列表（一级菜单项，顶部标题栏选项）
export async function categories(lang:string) {
    const dir = path.join(process.cwd(), DOCUMENT_CONFIG.root, 'document', lang);
    const files = (await fs.readdir(dir, { withFileTypes: true })).sort((x, y) => sort(x.name, y.name));
    return files.filter(file=>file.isDirectory()).map(file=>file.name);
}

// 获取章节列表（二级菜单项，侧边栏分组）
export async function chapters(lang:string, category:string) {
    const dir = path.join(process.cwd(), DOCUMENT_CONFIG.root, 'document', lang, category);
    const files = (await fs.readdir(dir, { withFileTypes: true })).sort((x, y) => sort(x.name, y.name));;
    return files.filter(file=>file.isDirectory()).map(file=>file.name);
}

// 获取文档列表（三级菜单项）
export async function docs(lang:string, category:string, chapter:string) {
    const dir = path.join(process.cwd(), DOCUMENT_CONFIG.root, 'document', lang, category, chapter);
    const files = (await fs.readdir(dir, { withFileTypes: true })).sort((x, y) => sort(x.name, y.name));;
    return files.filter(file=>file.isFile()).map(file=>file.name)
}

// 获取文档内容
export async function content(lang:string, category:string, chapter?:string, doc?:string) {
    const file = path.join(process.cwd(), DOCUMENT_CONFIG.root, 'document', lang, category, chapter??"", doc??"");
    const text = await fs.readFile(file, 'utf-8');
    return text;
}

// 获取文档状态（创建与更新时间）
export async function docState(lang:string, category:string, chapter?:string, doc?:string): Promise<DocState> {
    const dir = path.join(process.cwd(), DOCUMENT_CONFIG.root);
    const file = path.join(process.cwd(), DOCUMENT_CONFIG.root, 'document', lang, category, chapter??"", doc??"");

    return new Promise((resolve) => {
        execFile('git', ['-C', dir, 'log', '--format="%ai"', file], (err, stdout) => {
            if (err || stdout.trim().length === 0) {
                if (err) {
                    console.error(err);
                }

                resolve({
                    createdTime: new Date(),
                    updatedTime: new Date(),
                });
            } else {
                const lines = stdout.split("\n").filter(Boolean);
                resolve({
                    createdTime: new Date(lines[lines.length - 1]),
                    updatedTime: new Date(lines[0]),
                });
            }
        })
    })
}

// 获取上一个分类
export async function prevCategory(lang:string, category:string) {
    const categories_ = await categories(lang);
    const index = categories_.indexOf(category);
    return index - 1 < 0 ? undefined : categories_[index - 1];
}

// 获取下一个分类
export async function nextCategory(lang:string, category:string) {
    const categories_ = await categories(lang);
    const index = categories_.indexOf(category);
    return index + 1 >= categories_.length ? undefined : categories_[index + 1];
}

// 获取上一个章节
export async function prevChapter(lang:string, category:string, chapter:string) {
    const chapters_ = await chapters(lang, category);
    const index = chapters_.indexOf(chapter);
    if (index - 1 >= 0) {
        return [category, chapters_[index - 1]] as [string, string];
    }
    
    // 没有则查找上一个分类的最后一个章节
    const prevCategory_ = await prevCategory(lang, category);
    if (prevCategory_ === undefined) {
        return undefined;
    }

    const prevChapters_ = await chapters(lang, prevCategory_);
    if (prevChapters_.length === 0) {
        return undefined;
    }

    return [prevCategory_, prevChapters_[prevChapters_.length - 1]] as [string, string];
}

// 获取下一个章节
export async function nextChapter(lang:string, category:string, chapter:string) {
    const chapters_ = await chapters(lang, category);
    const index = chapters_.indexOf(chapter);
    if (index + 1 < chapters_.length) {
        return [category, chapters_[index + 1]];
    }

    // 没有则查找下一个分类的第一个章节
    const nextCategory_ = await nextCategory(lang, category);
    if (nextCategory_ === undefined) {
        return undefined;
    }

    const nextChapters_ = await chapters(lang, nextCategory_);
    if (nextChapters_.length === 0) {
        return undefined;
    }

    return [nextCategory_, nextChapters_[0]];
}

// 获取上一篇文档
export async function prevDoc(lang:string, category:string, chapter:string, doc:string) {
    const docs_ = await docs(lang, category, chapter);
    const index = docs_.indexOf(doc);
    if (index - 1 >= 0) {
        return [category, chapter, docs_[index-1]] as [string, string, string];
    }

    // 没有则查找上一个章节的最后一篇文档
    const prev_ = await prevChapter(lang, category, chapter);
    if (prev_ === undefined) {
        return undefined;
    }

    const prevDocs_ = await docs(lang, prev_[0], prev_[1]);
    if (prevDocs_.length === 0) {
        return undefined;
    }

    return [prev_[0], prev_[1], prevDocs_[prevDocs_.length-1]] as [string, string, string];
}

// 获取下一篇文档
export async function nextDoc(lang:string, category:string, chapter:string, doc:string) {
    const docs_ = await docs(lang, category, chapter);
    const index = docs_.indexOf(doc);
    if (index + 1 < docs_.length) {
        return [category, chapter, docs_[index+1]] as [string, string, string];
    }

    // 没有则查找下一个章节的第一篇文档
    const next_ = await nextChapter(lang, category, chapter);
    if (next_ === undefined) {
        return undefined;
    }

    const nextDocs_ = await docs(lang, next_[0], next_[1]);
    if (nextDocs_.length === 0) {
        return undefined;
    }

    return [next_[0], next_[1], nextDocs_[0]] as [string, string, string];
}
