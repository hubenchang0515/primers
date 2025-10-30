
import { Metadata } from "next";
import NotFound from "@/components/NotFound";
import { searchTree } from "@/utils/search";
import { Suspense } from "react";
import { SITE_CONFIG } from "@/config";

// 生成元数据
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: `404 Not Found - ${SITE_CONFIG.title}`,
        robots: "noindex",
        icons: {
            icon: `${SITE_CONFIG.basePath}/favicon.svg`,
        },
        
    };
}

// 生成页面
export default async function NotFoundPage() {
    const root = await searchTree();
    return (
        <Suspense>
            <NotFound root={root}/>
        </Suspense>
    )
}