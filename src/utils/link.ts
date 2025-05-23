import { SITE_CONFIG } from "@/config";

export function URLWrap(url:string) {
    if (SITE_CONFIG.basePath && url.startsWith('/')) {
        return SITE_CONFIG.basePath + url;
    } else {
        return url;
    }
}