import { SITE_CONFIG } from '@/config';
import { categories, chapters, docs, docState, languages } from '@/utils/document';
import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default async function sitemap():Promise<MetadataRoute.Sitemap> {
    const sites = [];

    // 根路径
    const base = new URL(SITE_CONFIG.basePath, SITE_CONFIG.origin);
    const state = await docState('zh', '00.index.md');
    sites.push({
        url: base.toString(),
        lastModified: state.updatedTime
    });

    for (const lang of await languages()) {
        const state = await docState(lang, '00.index.md');
        sites.push({
            url: new URL(`${SITE_CONFIG.basePath}/document/${encodeURIComponent(lang)}`, SITE_CONFIG.origin).toString(),
            lastModified: state.updatedTime
        });

        for (const category of await categories(lang)) {
            const state = await docState(lang, category, '00.index.md');
            sites.push({
                url: new URL(`${SITE_CONFIG.basePath}/document/${encodeURIComponent(lang)}/${encodeURIComponent(category)}`, SITE_CONFIG.origin).toString(),
                lastModified: state.updatedTime
            });

            for (const chapter of await chapters(lang, category)) {
                for (const doc of await docs(lang, category, chapter)) {
                    const state = await docState(lang, category, chapter, doc);
                    sites.push({
                        url: new URL(`${SITE_CONFIG.basePath}/document/${encodeURIComponent(lang)}/${encodeURIComponent(category)}/${encodeURIComponent(chapter)}/${encodeURIComponent(doc)}`, SITE_CONFIG.origin).toString(),
                        lastModified: state.updatedTime
                    });
                }
            }
        }
    }
    return sites;
}