import type { Metadata } from "next";
import "./globals.css";
import '@fontsource/roboto/100.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/900.css';

export const metadata: Metadata = {
  title: "Primers - 编程伙伴",
  description: "欢迎来到 Primers ———— 你的编程学习伙伴。Primers 致力于为各类编程学习者提供全面、系统的编程教程和实践资源。无论你是编程新手，还是有一定基础的开发者，Primers 都提供了适合的学习路径和丰富的实战项目，帮助你从零开始，逐步掌握编程技能，成为一名优秀的开发者。",
  icons: {
    icon: 'favicon.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
