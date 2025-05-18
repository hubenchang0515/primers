import { execFile } from "child_process";
import path from "path";
import os from "os";
import fs from 'fs/promises';

export async function render(code:string) {
    return new Promise<string|undefined>((resolve) => {
        const tempDir = os.tmpdir();
        const svgFile = path.join(tempDir, `mermaid-${Date.now()}.svg`);
        const process = execFile('mmdc', 
            [
                '-p', 'puppeteer-config.json', 
                '-c', 'mermaid-config.json', 
                '-b', 'transparent',
                '--output', svgFile, 
                '--input', '-'
            ], 
            async (err, stdout) => {
                if (err || stdout.trim().length === 0) {
                    if (err) {
                        console.error(err);
                    }

                    resolve(undefined);
                } else {
                    resolve(await fs.readFile(svgFile, 'utf-8'));
                }
            }
        );
        
        process.stdin?.write(code);
        process.stdin?.end(); 
    });
}