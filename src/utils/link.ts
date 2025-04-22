import path from "path";
import { SITE_CONFIG } from "@/config";

export function Href(href:string) {
    if (SITE_CONFIG.basePath && href.startsWith('/')) {
        return path.join(SITE_CONFIG.basePath, href);
    } else {
        return href;
    }
}