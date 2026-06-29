# MetalHead 金属乐社区 Web 应用设计文档

## 1. 项目概述

MetalHead 是一个面向金属乐爱好者的社区 Web 应用，采用暗黑重金属视觉风格，提供演出日历、乐队百科和社区动态三大核心模块。

## 2. 目标与范围

### 2.1 目标
- 搭建可运行的 Next.js 项目骨架
- 实现三个页面：演出日历、乐队百科、社区动态
- 建立暗黑重金属视觉设计系统
- 设计可扩展的数据层，便于后续接入真实 API

### 2.2 范围
- **包含**：首页演出日历、乐队百科（含流派筛选）、社区动态流（匿名发帖）、响应式暗黑 UI
- **不包含**：用户认证、后端服务、真实支付、SEO 优化、国际化

## 3. 技术栈

| 层级 | 技术 |
|------|------|
| 框架 | Next.js 15 (App Router) |
| 语言 | TypeScript |
| UI 库 | React 19 |
| 样式 | Tailwind CSS 4 |
| 组件库 | shadcn/ui |
| 字体 | Bebas Neue / Metal Mania（Google Fonts）+ system fallback |
| 测试 | React Testing Library + Vitest（可选） |

## 4. 视觉设计系统

### 4.1 色彩

| Token | 色值 | 用途 |
|-------|------|------|
| `--background` | `#000000` | 页面背景 |
| `--foreground` | `#e5e5e5` | 主文字 |
| `--metal-red` | `#dc2626` | 强调色、标题、激活状态 |
| `--metal-red-dark` | `#7f1d1d` | 深红背景、标签 |
| `--metal-gray` | `#374151` | 重金属灰、边框、次要元素 |
| `--metal-gray-light` | `#9ca3af` | 辅助文字、时间戳 |
| `--card` | `#111111` | 卡片背景 |
| `--card-border` | `#333333` | 卡片边框 |

### 4.2 字体

- **标题/Logo**：`Bebas Neue` / `Metal Mania`，大写、加宽字距
- **正文**：系统无衬线字体栈
- **日期/元信息**：等宽字体栈

### 4.3 组件风格

- 卡片：纯黑/深灰背景，左侧或底部深红强调线
- 按钮：深红填充或描边，hover 时高亮
- 筛选标签：胶囊形状，激活态为深红填充
- 导航：顶部固定，Logo 大写加粗，当前页高亮

## 5. 路由与页面

| 路由 | 页面名称 | 功能 |
|------|----------|------|
| `/` | 演出日历 | 卡片式展示近期演出：乐队名、日期、场地、城市 |
| `/bands` | 乐队百科 | 网格/列表展示乐队，支持流派筛选 |
| `/community` | 社区动态 | 用户发帖流，支持新增帖子 |

## 6. 数据模型

### 6.1 演出（Event）

```ts
interface Event {
  id: string;
  bandName: string;
  date: string;        // ISO 8601
  venue: string;
  city: string;
  genre: string;
  imageUrl?: string;
}
```

**业务规则**：演出资讯聚焦中国大陆地区（国内演出）。

### 6.2 乐队（Band）

```ts
interface Band {
  id: string;
  name: string;
  genre: string;       // 黑金属 / 死金 / 力量金属 / ...
  formedYear: number;
  country: string;
  description: string;
  imageUrl?: string;
}
```

### 6.3 帖子（Post）

```ts
interface Post {
  id: string;
  author: string;
  content: string;
  createdAt: string;   // ISO 8601
}
```

**业务规则**：匿名发帖，数据持久化到 `localStorage`。

## 7. 架构设计

### 7.1 数据层（Repository 模式）

```
lib/data/
  types.ts                 # Event, Band, Post 类型
  repositories/
    event-repository.ts    # EventRepository 接口
    band-repository.ts     # BandRepository 接口
  mock/
    events.ts              # MockEventRepository 实现
    bands.ts               # MockBandRepository 实现
```

- 默认使用 Mock 实现，保证页面可独立运行。
- 真实 API 实现只需实现相同接口并替换注入点。

### 7.2 目录结构

```
app/
  layout.tsx              # 根布局、字体加载、全局主题
  globals.css             # Tailwind 导入 + CSS 变量
  page.tsx                # 演出日历
  bands/
    page.tsx              # 乐队百科
  community/
    page.tsx              # 社区动态
components/
  ui/                     # shadcn/ui 组件
  event-card.tsx          # 演出卡片
  band-card.tsx           # 乐队卡片
  genre-filter.tsx        # 流派筛选
  post-card.tsx           # 帖子卡片
  post-form.tsx           # 发帖表单
lib/
  data/                   # 数据层
  utils.ts                # 工具函数
public/
  # 静态资源
```

## 8. 数据流

### 8.1 演出 / 乐队

```
Mock Repository → Server/Client Component → UI 组件 → 渲染
```

- 页面组件可直接调用 repository 获取数据。
- 未来切换真实 API 时，只改 repository 实现。

### 8.2 社区帖子

```
localStorage ↔ React State (useState/useEffect) → Post List + Post Form
```

- 首次加载从 `localStorage` 读取。
- 发帖时更新 state 并写入 `localStorage`。
- 读取失败时降级为内存状态，避免崩溃。

## 9. 错误处理

- **加载中**：使用 Skeleton 占位。
- **空列表**：显示中文空状态文案（如“暂无演出，去现场撒点野吧”）。
- **localStorage 异常**：try/catch 包裹，降级到内存。
- **图片加载失败**：显示占位图或背景色。

## 10. 测试策略

- 为三个页面添加基础渲染测试，确保不崩溃。
- 数据层和复杂交互测试后续补充。

## 11. 未来扩展

- 接入真实演出/乐队 API（如 Bandsintown、Metal-Archives）。
- 用户注册/登录与评论功能。
- 演出详情页与乐队详情页。
- 搜索与分页。

## 12. 决策记录

| 决策 | 选项 | 原因 |
|------|------|------|
| 数据策略 | Mock + Repository 抽象 | 快速搭建，便于后续替换真实 API |
| 社区持久化 | localStorage | 无需后端，满足匿名发帖需求 |
| 演出范围 | 中国大陆地区 | 用户明确偏好 |
| 路由方式 | Next.js App Router | 现代 Next.js 推荐方案 |
| 组件库 | shadcn/ui + Tailwind | 快速构建且风格可控 |
