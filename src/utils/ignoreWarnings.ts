// 抑制警告

const IGNORE_WARNINGS = [
  "Overly broad patterns can lead to build performance issues and over bundling."
];

export function IgnoreWarnings()
{
    const originalStdErrWrite = process.stderr.write.bind(process.stderr);
    process.stderr.write = ((chunk, encoding, callback) => {
        for (const item of IGNORE_WARNINGS) {
            if (chunk.toString().includes(item)) {
                return true;
            }
        }
        
        return originalStdErrWrite(chunk, encoding, callback);
    }) as typeof process.stderr.write;
}

