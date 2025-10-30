// 分割序号和扩展名，提取标题
export function title(filename:string) {
    if (filename.includes(".")) {
        const items = filename.split(".");
        if (items.length < 2) {
            return filename;
        }
        else if (items.length === 2) {
            return items[1]
        } else {
            return items.slice(1, -1).join(".")
        }
    } else {
        return filename;
    }
}

// 按标题排序
export function sort(x:string, y:string) {
    const xPrefix = x.split('.')[0];
    const yPrefix = y.split('.')[0];

    const xNum = Number(xPrefix);
    const yNum = Number(yPrefix)

    if (!isNaN(xNum) && !isNaN(yNum)) {
        return xNum - yNum;
    } else if (!isNaN(xNum) && isNaN(yNum)) {
        return -1;
    } else if (isNaN(xNum) && !isNaN(yNum)) {
        return 1;
    } else {
        return x.localeCompare(y);
    }
}

// 内容清理，删除 Markdown 语法符号仅保留文本
export function text(content:string) {
    return content
        // 1) 代码块（保留内文，去掉 ```...``` 标记）
        .replace(/```[\s\S]*?```/g, m => m.replace(/```/g, ''))
        // 2) 行内代码 `code` -> code
        .replace(/`([^`]+)`/g, '$1')
        // 3) 图片：![alt](url "title") -> alt
        .replace(/!\[([^\]]*?)\]\([^\)]*?\)/g, '$1')
        // 4) 行内链接：[text](url "title") -> text
        .replace(/\[([^\]]+?)\]\([^\)]+?\)/g, '$1')
        // 5) 参考式链接 [text][id] -> text
        .replace(/\[([^\]]+?)\]\s*\[[^\]]*\]/g, '$1')
        // 6) 移除引用定义行 [id]: url
        .replace(/^\s*\[[^\]]+\]:.*$/gm, '')
        // 7) 自动链接 <http://...> 或 <user@host> -> 去掉尖括号保留内文
        .replace(/<([^ >]+@[^ >]+|https?:\/\/[^ >]+|mailto:[^ >]+)>/g, '$1')
        // 8) 标题的 # 符号： "# heading" -> "heading"
        .replace(/^\s{0,3}#{1,6}\s*/gm, '')
        // 9) 引用行："> " -> ""
        .replace(/^\s{0,3}>\s?/gm, '')
        // 10) 列表标记："- ", "* ", "+ ", "1. " -> ""
        .replace(/^\s{0,3}([-*+]|(\d+\.))\s+/gm, '')
        // 11) 表格分隔行 (|---|:---:|---:) 整行删除
        .replace(/^\s*\|?(\s*:?-+:?\s*\|)+\s*:?-+:?\s*\|?\s*$/gm, '')
        // 12) 表格竖线变空格（把 | 拆开为空格，以保留单元格文本）
        .replace(/\s*\|\s*/g, ' ')
        // 13) 删除水平线 --- 或 *** 单独一行
        .replace(/^\s*(\-{3,}|\*{3,}|_{3,})\s*$/gm, '')
        // 14) 删除强调符号 * _ ** *** ~~ （较激进，可能会移掉文本中的星号）
        .replace(/(\*\*|\*|__|_|~~)/g, '')
        // 15) 删除残余 HTML 标签（<b>...</b> 等）
        .replace(/<\/?[^>]+>/g, '')
        // 16) 移除多余的方括号或反斜线转义符
        .replace(/\\([\\`*_{}\[\]()#+\-.!])/g, '$1')
        // 18) 多空格压缩为一个空格
        .replace(/\s{2,}/g, ' ')
        .trim();
}