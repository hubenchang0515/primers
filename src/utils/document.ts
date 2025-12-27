import path from "path";
import fs from 'fs/promises';
import { DOCUMENT_CONFIG } from "@/config";
import { sort } from "./text";
export * from "./text";


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
    const files = (await fs.readdir(dir, { withFileTypes: true })).sort((x, y) => sort(x.name, y.name));
    return files.filter(file=>file.isDirectory()).map(file=>file.name);
}

// 获取文档列表（三级菜单项）
export async function docs(lang:string, category:string, chapter:string) {
    const dir = path.join(process.cwd(), DOCUMENT_CONFIG.root, 'document', lang, category, chapter);
    const files = (await fs.readdir(dir, { withFileTypes: true })).sort((x, y) => sort(x.name, y.name));
    return files.filter(file=>file.isFile()).map(file=>file.name)
}

// 获取文档内容
export async function content(lang:string, category:string, chapter?:string, doc?:string) {
    try {
        const file = path.join(process.cwd(), DOCUMENT_CONFIG.root, 'document', lang, category, chapter??"", doc??"");
        const text = await fs.readFile(file, 'utf-8');
        return text;
    } catch (err) {
        throw err;
    }
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
