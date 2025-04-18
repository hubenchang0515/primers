import path from "path";
import fs from 'fs/promises';

const DOCUMENT_DIR = "primers-document/document"

export function title(filename:string) {
    if (filename.includes(".")) {
        return filename.split(".")[1];
    } else {
        return filename;
    }
}

export async function languages() {
    const dir = path.join(process.cwd(), DOCUMENT_DIR);
    const files = await fs.readdir(dir, { withFileTypes: true });
    return files.filter(file=>file.isDirectory()).map(file=>file.name);
}

export async function categories(lang:string) {
    const dir = path.join(process.cwd(), DOCUMENT_DIR, lang);
    const files = await fs.readdir(dir, { withFileTypes: true });
    return files.filter(file=>file.isDirectory()).map(file=>file.name);
}

export async function chapters(lang:string, category:string) {
    const dir = path.join(process.cwd(), DOCUMENT_DIR, lang, category);
    const files = await fs.readdir(dir, { withFileTypes: true });
    return files.filter(file=>file.isDirectory()).map(file=>file.name);
}

export async function docs(lang:string, category:string, chapter:string) {
    const dir = path.join(process.cwd(), DOCUMENT_DIR, lang, category, chapter);
    const files = await fs.readdir(dir, { withFileTypes: true });
    return files.filter(file=>file.isFile()).map(file=>file.name)
}

export async function content(lang:string, category:string, chapter?:string, doc?:string) {
    const file = path.join(process.cwd(), DOCUMENT_DIR, lang, category, chapter??"", doc??"");
    const text = await fs.readFile(file, 'utf-8');
    return text;
}