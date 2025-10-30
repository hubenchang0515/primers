import NotFound from "@/components/NotFound";
import { searchTree } from "@/utils/search";
import { Suspense } from "react";

// 生成页面
export default async function NotFoundPage() {
    const root = await searchTree();
    return (
        <Suspense>
            <NotFound root={root}/>
        </Suspense>
    )
}