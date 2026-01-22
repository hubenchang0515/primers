import 'server-only';
import path from "path";
import { DOCUMENT_CONFIG, OWNER_CONFIG } from "@/config";
import { execFile } from "child_process";

export interface DocState {
    createdTime: Date;
    updatedTime: Date;
    author: string;
    email: string;
}

// 获取文档状态（创建与更新时间）
export async function docState(lang:string, category:string, chapter?:string, doc?:string): Promise<DocState> {
    const dir = path.join(process.cwd(), DOCUMENT_CONFIG.root);
    const file = path.join(process.cwd(), DOCUMENT_CONFIG.root, 'document', lang, category, chapter??"", doc??"");

    return new Promise((resolve) => {
        execFile('git', ['-C', dir, 'log', '--format=%ai;%an;%ae', file], (err, stdout) => {
            if (err || stdout.trim().length === 0) {
                if (err) {
                    console.error(err);
                }

                resolve({
                    createdTime: new Date(),
                    updatedTime: new Date(),
                    author: OWNER_CONFIG.name,
                    email: OWNER_CONFIG.email,
                });
            } else {
                const lines = stdout.split("\n").filter(Boolean);
                const first = lines[0].split(';');
                const last = lines[lines.length - 1].split(';');
                resolve({
                    createdTime: new Date(last[0]),
                    updatedTime: new Date(first[0]),
                    author: first[1],
                    email: first[2],
                });
            }
        })
    })
}