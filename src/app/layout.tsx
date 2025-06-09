import type { Metadata } from "next";
import "./globals.css";
import '@/assets/highlight.css';
import '@fontsource/roboto/100.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/900.css';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from "@mui/material";
import theme from "@/utils/theme";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import { SITE_CONFIG } from "@/config";
import { GlobalStateProvider } from "@/components/GlobalState";
import { GoogleAnalytics } from '@next/third-parties/google'

export const metadata: Metadata = {
  title: "Primers 编程伙伴",
  description: "Primers is committed to providing comprehensive and systematic programming tutorials and practical resources for all types of programming learners.",
  icons: {
    icon: `${SITE_CONFIG.basePath}/favicon.svg`,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <InitColorSchemeScript attribute="class" />
            <GlobalStateProvider>
              {children}
            </GlobalStateProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
      <GoogleAnalytics gaId="G-HEWPX7E6EV"/>
    </html>
  );
}
