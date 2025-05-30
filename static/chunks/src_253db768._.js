(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/utils/theme.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$colors$2f$pink$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__pink$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/colors/pink.js [app-client] (ecmascript) <export default as pink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$createTheme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__createTheme$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/styles/createTheme.js [app-client] (ecmascript) <export default as createTheme>");
'use client';
;
;
const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$createTheme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__createTheme$3e$__["createTheme"])({
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    main: "#39c5bb"
                },
                secondary: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$colors$2f$pink$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__pink$3e$__["pink"],
                info: {
                    main: "#66CCFF"
                },
                mode: 'light'
            }
        },
        dark: {
            palette: {
                primary: {
                    main: "#39c5bb"
                },
                secondary: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$colors$2f$pink$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__pink$3e$__["pink"],
                info: {
                    main: "#66CCFF"
                },
                mode: 'dark'
            }
        }
    },
    cssVariables: {
        colorSchemeSelector: 'class'
    },
    typography: {
        fontFamily: `Inter, SF Pro, Segoe UI, Roboto, Oxygen, Ubuntu, Helvetica Neue, Helvetica, Arial, sans-serif;`
    }
});
const __TURBOPACK__default__export__ = theme;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/GlobalState.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "GlobalState": (()=>GlobalState),
    "GlobalStateProvider": (()=>GlobalStateProvider),
    "useGlobalState": (()=>useGlobalState)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/theme.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
const GlobalState = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])({});
function useGlobalState() {
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(GlobalState);
}
_s(useGlobalState, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");
function GlobalStateProvider(props) {
    _s1();
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [initialized, setInitialized] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [currentTitle, setCurrentTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(undefined);
    const [expandedSideGroup, setExpandedSideGroup] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(undefined);
    const [sideExpanded, setSideExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [sideCollapsedSize, setSideCollapsedSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0); // 16 + 24 + 16 => 56 
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GlobalStateProvider.useEffect": ()=>{
            if (window.innerWidth < __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].breakpoints.values.md) {
                setSideCollapsedSize?.(0);
                setSideExpanded?.(false);
            } else {
                setSideCollapsedSize?.(56);
                setSideExpanded?.(true);
            }
        }
    }["GlobalStateProvider.useEffect"], [
        setSideCollapsedSize
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GlobalState.Provider, {
        value: {
            loading,
            initialized,
            setLoading,
            setInitialized,
            currentTitle,
            expandedSideGroup,
            sideExpanded,
            sideCollapsedSize,
            setCurrentTitle,
            setExpandedSideGroup,
            setSideExpanded,
            setSideCollapsedSize
        },
        children: props.children
    }, void 0, false, {
        fileName: "[project]/src/components/GlobalState.tsx",
        lineNumber: 51,
        columnNumber: 9
    }, this);
}
_s1(GlobalStateProvider, "o0jM7YUZGaSkyNZUW5ySWJkwUH4=");
_c = GlobalStateProvider;
var _c;
__turbopack_context__.k.register(_c, "GlobalStateProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_253db768._.js.map