import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MetalHead - 金属乐社区",
  description: "金属乐演出日历、乐队百科与社区动态",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  );
}
