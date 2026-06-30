# Undertow · 暗流涌动

一个面向金属乐爱好者的社区 Web 应用，采用**血浆重口味**视觉风格：暗黑背景、血红色调、Nosifer 滴血字体与哥特摄影素材，整体张力偏向恐怖片海报与死亡金属专辑封面。

- **中文名**：暗流涌动
- **英文名**：Undertow

## 功能

- **首页** (`/`)：全屏 Hero，Nosifer 大标题 + 暗黑拱门背景 + 光标聚光灯效果
- **乐队百科** (`/bands`)：按流派筛选金属乐队
- **社区动态** (`/community`)：匿名发帖，本地持久化

## 视觉设计

- **主字体**：Nosifer（Google Fonts，本地兜底 `public/fonts/Nosifer-Regular.ttf`）
- **配色**：血浆黑 `#050000`、动脉红 `#ff1a1a`、凝血 `#7f0000`
- **素材**：`public/images/horror/dark-hero.jpg`、`public/images/horror/black-sand-texture.jpg`
- 设计文档：`docs/superpowers/specs/2026-06-30-undertow-gore-horror-redesign.md`

## 技术栈

- Next.js 15 (App Router)
- React 19 + TypeScript
- Tailwind CSS 4
- shadcn/ui
- Vitest + React Testing Library

## 开发

```bash
npm install
npm run dev
```

## 脚本

```bash
npm run dev      # 启动开发服务器
npm run build    # 生产构建
npm run test     # 运行测试
npm run lint     # 代码检查
```
