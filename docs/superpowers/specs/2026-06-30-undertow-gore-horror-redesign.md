# Undertow 血腥阴暗风格重设计

## 概述

将 Undertow（暗流涌动）从现有暗色金属主题升级为**血浆重口味**视觉风格：更血腥、更阴暗、更具侵略性。整体方向参考恐怖片海报与死亡金属专辑封面，使用真实的网络图片素材和专门的恐怖字体，避免纯 CSS 硬扭造成的廉价感。

## 设计目标

- 视觉张力拉满：标题巨大、邪恶、具有压迫感。
- 使用真实素材：暗黑摄影纹理 + 专门设计的恐怖字体。
- 保持可用性：正文仍使用易读字体，确保内容和社区功能不被风格牺牲。
- 全站一致：首页、乐队百科、社区动态统一风格系统。

## 视觉方向

### 选择的路径

- **方案 A：血浆重口味**（已确认）
- **标题字体：Nosifer**（Google Fonts，自带滴血装饰）（已确认）
- **素材来源**：Unsplash 暗黑/哥特摄影 + 黑色砂砾纹理

### 不采用的做法

- 不再使用 CSS 手动扭曲字母（被用户否决为缺乏美感）。
- 不再在 Nosifer 标题下方叠加额外 SVG 血滴（与字体自身滴血比例失调）。

## 配色系统

| Token | 色值 | 用途 |
|-------|------|------|
| `blood-black` | `#050000` | 主背景 |
| `corpse-red` | `#1a0000` | 次级背景、卡片底色 |
| `clot` | `#7f0000` | 深色强调、边框 |
| `artery` | `#ff1a1a` | 主强调色、按钮、徽章 |
| `light-blood` | `#ff6666` | 悬停、次要文字 |
| `rust` | `#2a1a1a` | 锈迹纹理、分割线 |
| `ash` | `#9ca3af` | 正文、描述文字 |
| `bone` | `#e5e5e5` | 主文字 |

更新 `app/globals.css` 中的 CSS 变量以匹配新系统。

## 字体系统

| 用途 | 字体 | 说明 |
|------|------|------|
| 品牌标题 / Hero / 页面大标题 / 乐队名 | **Nosifer** | 滴血恐怖字体，用于 UNDERTOW 主标题、页面标题和乐队卡片名称 |
| 英文标签 / 用户名 / 筛选标签 / 日期 | **Bebas Neue** | 硬朗无衬线，用于流派标签、用户名、日期、按钮文字 |
| 中文装饰标题 | **Ma Shan Zheng** | 书法毛笔字，可用于中文副标题或装饰 |
| 正文 | **Inter / 系统字体** | 保证可读性，避免使用装饰字体作为正文 |

Nosifer 通过 Google Fonts 引入；若构建环境无法访问 Google Fonts，需下载字体文件并放入 `public/fonts/` 通过本地 `@font-face` 加载。

## 图片与纹理素材

### 首页 Hero

- 使用一张暗黑拱门/火炬摄影（Unsplash）作为全屏背景。
- 叠加血红渐变（multiply）+ 径向暗角，制造血浆与深渊感。

### 纹理

- 黑色砂砾/波纹纹理用于卡片头像、背景纹理层、发帖框背景。
- 通过 CSS 叠加：
  - `opacity: 0.4`
  - 血红渐变覆盖
  - 45° 划痕 repeating-linear-gradient

### 图片使用规范

- Hero 背景：全屏 `object-fit: cover`
- 乐队卡片头图：顶部 140px，底部渐变过渡到卡片底色
- 头像：56px / 32px 圆形，带红色边框与辉光

## 组件规范

### Navigation

- 固定顶部，半透明黑底 + 红色细边框。
- Logo：红色几何图标 + "Undertow" 使用 Nosifer（小尺寸，约 20px）。
- 中间导航胶囊：毛玻璃效果，当前项红色高亮。
- 右侧 CTA：红色半透明边框按钮。

### Hero

- 全屏高度，背景图 + 血红叠加。
- 主标题：Nosifer，120px，颜色 `#ff0505`，多层红色辉光 + 黑色描边。
- 副标题：大写、宽字距、浅血浆色。
- 不加额外血滴，依靠 Nosifer 自带滴血效果。

### Page Header

- 左侧 5px 红色竖线。
- 标题：Nosifer，52px，红色。
- 副标题：Inter，14px，灰白。
- 底部红色渐变分割线。

### Band Card

- 背景：线性渐变从 `#0a0000` 到 `#050000`。
- 左边框：5px 动脉红。
- 顶部头图 140px，底部渐变。
- 圆形纹理头像，红色边框 + 辉光。
- 乐队名：Nosifer，24px，白色。
- 流派徽章：动脉红半透明背景，红色文字。
- 悬停：边框变亮、红色阴影扩散。

### Event Card

- 与 Band Card 结构一致。
- 日期：Bebas Neue / Inter，浅灰。
- 乐队名：Nosifer。

### Post Card

- 背景 `#050000`，左边 4px 红色渐变竖线。
- 用户名：Nosifer，14px，红色。
- 时间：Inter，12px，深灰。
- 内容：Inter， bone 色。

### Post Form

- 背景 `#0a0000`，红色细边框。
- 输入框：`#050000` 背景，深红边框，白色文字。
- 发布按钮：动脉红背景，黑色粗体文字。

### Genre Filter

- 当前选中：动脉红背景，黑色粗体文字。
- 未选中：黑底 + 深红边框，浅血浆色文字。
- 悬停：边框变亮、文字变白。

## 页面设计

### /

全屏 Hero，无其他内容。固定导航在 Hero 内部。

### /bands

- PageShell 顶部红色辉光线。
- PageHeader："乐队百科"。
- GenreFilter。
- BandCard 网格：1 col / sm 2 col / lg 3 col。

### /community

- PageHeader："社区动态"。
- PostForm。
- PostCard 列表。

## 动效与微交互

- 卡片悬停：`transition-all duration-300`，边框变亮、红色阴影 `shadow-primary/20 → shadow-primary/40`。
- 按钮悬停：背景变亮、阴影增强。
- 页面进入：Hero 标题淡入 + 轻微上浮，使用现有 `hero-anim` 模式。
- 纹理层：可添加极缓慢的背景图缩放（scale 1 → 1.05 over 20s），增强压迫感。
- 尊重 `prefers-reduced-motion`。

## 无障碍

- 正文与背景对比度保持 ≥ 4.5:1。
- 按钮使用黑底红字或红底黑字，避免红/绿组合。
- 减少动画模式下禁用所有动效。
- 装饰字体不用于正文，保证内容可读。

## 实现要点

1. **字体加载**：优先使用 `next/font/google` 加载 Nosifer；若构建环境无法访问 Google Fonts，改用本地字体文件。
2. **图片资源**：
   - Hero 背景与纹理图片下载到 `public/images/horror/`
   - 备选：使用 Unsplash 直接 URL（需保证可用性）
3. **CSS 变量更新**：修改 `app/globals.css` 中的颜色变量为新的血腥配色。
4. **组件调整**：
   - `components/hero.tsx`：替换标题字体为 Nosifer，移除手动字母拆分，使用整体渲染。
   - `components/page-header.tsx`：标题改用 Nosifer。
   - `components/band-card.tsx`、`event-card.tsx`、`post-card.tsx`、`post-form.tsx`：应用新的卡片样式。
   - `components/navbar.tsx`：Logo 文字改用 Nosifer。
   - `components/genre-filter.tsx`：应用新的选中/未选中样式。
5. **不引入新依赖**：继续使用 Tailwind CSS 4 + shadcn/ui，仅通过 CSS 变量和自定义类扩展。

## 决策记录

- 2026-06-30：用户选择方案 A「血浆重口味」。
- 2026-06-30：用户选择标题字体 Nosifer。
- 2026-06-30：用户否决 CSS 手动扭曲，要求使用真实网络字体素材。
- 2026-06-30：移除额外 SVG 血滴，保留 Nosifer 自带滴血效果。
