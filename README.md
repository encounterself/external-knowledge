# 867 环境学学习台

面向 Windows 优先的独立学习软件，同时提供一个可被 Codex 使用的 Skill 插件入口。它把仓库已有的 867 初试笔记整理为全文阅读、章节目录、主动回忆、题库练习、学习教练和本地复习数据六条学习路径。

## 当前 MVP

- React + TypeScript + Vite 前端，响应式布局，桌面端优先。
- 全文阅读：由 `structured.md` 生成 81 页 / 12 章索引，支持目录、全文搜索、页码和 `structured.md#page-N` 来源锚点。
- 阅读体验模块：`src/reader-renderer.tsx` 提供安全 Markdown 分块渲染、查询高亮、专注阅读容器和键盘动作映射；`main.tsx` 接入时可保持页面状态与持久化逻辑不变。
- 能力卡：搜索、按章节筛选和浏览现有笔记提炼出的 8 张能力卡。
- 主动回忆：先回忆后揭示答案，提供“再来一次 / 困难 / 记住了 / 很轻松”反馈。
- 间隔重复：本地实现可解释 MVP，按反馈调整间隔、难度、重复次数和下次复习时间。
- 逐题练习：输入答案、查看采分点、保存最近一次 AI 批改结果。
- Codex 工作台：独立聊天界面支持兼容接口对话、工具调用状态和网页导入草稿；正式写入、题目生成和构建任务必须审批。
- OpenAI 兼容接口：默认使用 `https://wawapii.com`、`gpt-5.6-terra` 和 `responses` wire API。
- 本地持久化：学习进度、题目、答案和 Base URL 存入浏览器 `localStorage`；网页端 API Key 只保留当前会话，Codex 配置推荐使用环境变量。
- Codex 配置与 MCP：`codex/config.toml` 是仓库内配置源，运行 `npm run codex:install` 可备份并幂等合并到 `~/.codex/config.toml`；`tools/env867-mcp-server.mjs` 提供网页阅读、网页草稿和本地学习工具。
- Codex 插件：`.codex-plugin/plugin.json` 指向 `skills/867-environmental-study/SKILL.md`，已有 867 资源保留在 `skills/867-environmental-study/resources/`。
- Tauri 2 配置：可构建 Windows 桌面壳，应用本身不需要后端服务。

## 运行

```bash
npm install
npm run content:index
npm run dev
```

打开 Vite 输出的本地地址即可。类型检查和生产构建：

```bash
npm run typecheck
npm run build
```

阅读渲染纯函数校验（不需要启动浏览器）：

```bash
node scripts/verify-reader.mjs
```

### 子任务 C 接口

主入口可按需接入 `src/reader-renderer.tsx`：使用 `MarkdownRenderer({ markdown, query })` 渲染正文，使用 `highlightText(text, query)` 生成搜索片段，使用 `readerKeyAction(event.key, { isInput, isComposing })` 映射 `ArrowLeft/ArrowRight`、`j/k`、`f`、`/` 和空格；用 `ReaderFocusFrame({ focused, children })` 包裹阅读卡片即可启用专注阅读样式。当前刻意未修改 `main.tsx`，以避免覆盖子任务 A/B 的工作。

Windows 桌面版需要先安装 Rust、Visual Studio C++ Build Tools 与 Tauri 所需系统依赖：

```bash
npm run tauri:dev
npm run tauri:build
```

## AI 设置

在“接口设置”中填写兼容 OpenAI 的 Base URL 与 API Key。Codex 配置固定使用 `POST /responses`、模型 `gpt-5.6-terra` 和 `https://wawapii.com`。应用不会在源码中硬编码 API Key；网页端密钥只保留当前会话，Codex CLI 应使用环境变量或本机认证。

Codex CLI 使用仓库内 `codex/config.toml`，固定模型为 `gpt-5.6-terra`；推荐先设置 `OPENAI_API_KEY`、`OPENAI_BASE_URL`，再运行：

```bash
npm run codex:install
```

项目根目录的 `AGENTS.md` 会提示 Codex 自动使用 867 Skill；MCP 工具的网页导入先生成草稿，正式保存需要明确审批。

AI 批改请求会携带题目、参考答案、采分点和用户答案到配置的 Base URL。未配置 API Key 时仍可使用本地阅读、能力卡、题库和答题草稿功能。

## 目录

```text
src/                         React 应用与本地内容模型
src-tauri/                   Tauri 2 桌面壳配置
skills/867-environmental-study/ Codex Skill 入口与现有 867 资源
.codex-plugin/plugin.json    插件清单
books/867-chushi-notes/      原始整理笔记与审核产物
867初试笔记(1).pdf           原始 PDF
```

## 已知限制

- 当前 AI 请求在前端直连用户填写的接口，仍存在 CORS 与客户端密钥暴露风险；桌面正式发布前应改为 Tauri 命令调用系统安全存储或本地代理。Codex CLI 配置本身通过环境变量读取密钥。
- `localStorage` 是 MVP 存储，不提供跨设备同步、加密或版本迁移。
- 当前题库是小规模草稿数据；还没有批量导入、题目编辑器、账号体系和统计图表。
- 索引全文会随前端 bundle 打包，内容继续扩展时应考虑按章节动态加载。
- 当前 Codex 工作台提供 API-backed 工具调用；真实 `codex app-server` 模式和 Tauri 命令桥接仍需在桌面后端阶段接入。
- Tauri 配置已完成，但 Windows 安装包仍需在具备 Rust/C++ 工具链的 Windows 环境中实际打包验证。
