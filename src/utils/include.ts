import path from "path";
import fs from 'fs/promises';
import { DOCUMENT_CONFIG } from "@/config";

export async function include(filepath:string, absolute?:boolean) {
    const file = absolute ? filepath : path.join(process.cwd(), DOCUMENT_CONFIG.root, filepath);
    const text = await fs.readFile(file, 'utf-8');
    return text;
}