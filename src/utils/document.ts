import path from "path";
import fs from 'fs/promises';
import { DOCUMENT_CONFIG } from "@/config";

export function title(filename:string) {
    if (filename.includes(".")) {
        return filename.split(".")[1];
    } else {
        return filename;
    }
}

export async function languages() {
    const dir = path.join(process.cwd(), DOCUMENT_CONFIG.root, 'document');
    const files = await fs.readdir(dir, { withFileTypes: true });
    return files.filter(file=>file.isDirectory()).map(file=>file.name);
}

export async function categories(lang:string) {
    const dir = path.join(process.cwd(), DOCUMENT_CONFIG.root, 'document', lang);
    const files = await fs.readdir(dir, { withFileTypes: true });
    return files.filter(file=>file.isDirectory()).map(file=>file.name);
}

export async function chapters(lang:string, category:string) {
    const dir = path.join(process.cwd(), DOCUMENT_CONFIG.root, 'document', lang, category);
    const files = await fs.readdir(dir, { withFileTypes: true });
    return files.filter(file=>file.isDirectory()).map(file=>file.name);
}

export async function docs(lang:string, category:string, chapter:string) {
    const dir = path.join(process.cwd(), DOCUMENT_CONFIG.root, 'document', lang, category, chapter);
    const files = await fs.readdir(dir, { withFileTypes: true });
    return files.filter(file=>file.isFile()).map(file=>file.name)
}

export async function content(lang:string, category:string, chapter?:string, doc?:string) {
    const file = path.join(process.cwd(), DOCUMENT_CONFIG.root, 'document', lang, category, chapter??"", doc??"");
    const text = await fs.readFile(file, 'utf-8');
    return text;
}