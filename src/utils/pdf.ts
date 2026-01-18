import { SITE_CONFIG } from "@/config";
import QRCode from 'qrcode';

export function makePdfContent(url:string, content:string) {
    return new Promise<string>((resolve) => {
        QRCode.toDataURL(url, (_:any, src:string) => {
            resolve(`<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.8.1/github-markdown-light.min.css"/>
                    <div class="markdown-body">
                        <img style="float:right;" src="${src}"/>
                        <p><a href="${url}">${SITE_CONFIG.title} : ${SITE_CONFIG.origin}${SITE_CONFIG.basePath}</a></p>
                        <div>${content}</div>
                    </div>`);
        });
    })
    
    
}