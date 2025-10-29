import { execFile } from "child_process";

export async function render(code:string) {
    return new Promise<string>((resolve, reject) => {
        const process = execFile('mmdc', 
            [
                '-p', 'puppeteer-config.json', 
                '-c', 'mermaid-config.json', 
                '-b', 'transparent',
                '-e', 'svg',
                '--output', '-',    // 输出到 stdout
                '--input', '-'      // 从 stdin 读取输入
            ], 
            async (err, stdout, stderr) => {
                if (err) {
                    console.error(err, stderr);
                    reject(stderr.trim());
                } else {
                    resolve(stdout.trim());
                }
            }
        );
        
        process.stdin?.write(code);
        process.stdin?.end(); 
    });
}