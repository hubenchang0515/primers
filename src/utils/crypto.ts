export async function hash(algorithm:string, data:BufferSource) {
    const hashBuffer = await crypto.subtle.digest(algorithm, data);
    const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
    const hashHex = hashArray
        .map((b) => b.toString(16).padStart(2, "0"))
        .join(""); // convert bytes to hex string
    return hashHex;
}

// 哈希锚点
export async function anchorHash(text:string) {
    return (await hash('SHA-256', new TextEncoder().encode(text))).substring(0, 6);
}