import path from "path";
import nextConfig from "../../next.config";

export function Link(href:string) {
    if (nextConfig.basePath && href.startsWith('/')) {
        return path.join(nextConfig.basePath, href);
    } else {
        return href;
    }
}