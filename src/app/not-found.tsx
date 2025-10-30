"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

// 生成页面
export default function NotFoundPage() {
    const pathname = usePathname();
    const router = useRouter();
    useEffect(() => {
        const items = pathname.split('/');
        const lang = decodeURIComponent(items[2]??'');
        const category = decodeURIComponent(items[3]??'');
        const chapter = decodeURIComponent(items[4]??'');
        const doc = decodeURIComponent(items[5]??'');

        const params = new URLSearchParams();
        params.set('lang', lang);
        params.set('category', category);
        params.set('chapter', chapter);
        params.set('doc', doc);
        router.push('/empty?' + params.toString());
    }, [pathname, router]);
}