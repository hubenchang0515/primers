import { Metadata } from "next";
import { SITE_CONFIG } from "@/config";
import Install from "@/components/Install";

// 生成元数据
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: `Install - ${SITE_CONFIG.title}`,
        description: `Install PWA of ${SITE_CONFIG.title}`,
        icons: {
            icon: `${SITE_CONFIG.basePath}/favicon.svg`,
        },
    };
}

// 生成页面
export default async function Page() {
    return <Install/>
}