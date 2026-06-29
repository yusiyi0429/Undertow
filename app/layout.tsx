import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/navigation";

export const metadata: Metadata = {
  title: "Undertow · 暗流涌动",
  description: "暗流涌动 — 金属乐演出日历、乐队百科与社区动态",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        <Navigation />
        {children}
      </body>
    </html>
  );
}
