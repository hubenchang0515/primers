import { spawn } from "child_process";

export async function render(code:string) {
    return new Promise<string>((resolve, reject) => {
        const process = spawn('mmdc',[
            '-p', 'puppeteer-config.json', 
            '-c', 'mermaid-config.json', 
            '-b', 'transparent',
            '-e', 'svg',
            '--output', '-',    // 输出到 stdout
            '--input', '-'      // 从 stdin 读取输入
        ])

        let stdout = "";
        let stderr = "";
        
        process.stdout.on("data", (d) => stdout += d);
        process.stderr.on("data", (d) => stderr += d);
        process.on("close", (result) => {
            if (result === 0) {
                resolve(stdout)
            } else {
                reject(stderr)
            }
        })

        process.stdin?.write(code);
        process.stdin?.end(); 
    });
}