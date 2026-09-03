# 867 环境学学习台

面向 Windows 优先的独立学习软件，同时提供一个可被 Codex 使用的 Skill 插件入口。它把仓库已有的 867 初试笔记整理为知识阅读、能力卡导航、题库草稿审核和逐题答题/AI 批改四条学习路径。

## 当前 MVP

- React + TypeScript + Vite 前端，响应式布局，桌面端优先。
- 知识阅读：按章节浏览 867 的核心框架，并标记章节已读。
- 能力卡：搜索、按章节筛选和浏览现有笔记提炼出的 8 张能力卡。
- 题库审核：审核草稿题，确认后进入正式练习。
- 逐题练习：输入答案、查看采分点、保存最近一次 AI 批改结果。
- OpenAI 兼容接口：设置 Base URL、API Key 和模型名称；默认模型为 `databricks-gpt-5-6-luna`。
- 本地持久化：学习进度、题目、答案、批改和接口设置存入浏览器 `localStorage`；它不是系统级密钥保险箱，不建议在共享电脑保存 API Key。
- Codex 插件：`.codex-plugin/plugin.json` 指向 `skills/867-environmental-study/SKILL.md`，已有 867 资源保留在 `skills/867-environmental-study/resources/`。
- Tauri 2 配置：可构建 Windows 桌面壳，应用本身不需要后端服务。

## 运行

```bash
npm install
npm run dev
```

打开 Vite 输出的本地地址即可。类型检查和生产构建：

```bash
npm run typecheck
npm run build
```

Windows 桌面版需要先安装 Rust、Visual Studio C++ Build Tools 与 Tauri 所需系统依赖：

```bash
npm run tauri:dev
npm run tauri:build
```

## AI 设置

在“接口设置”中填写兼容 OpenAI `POST /chat/completions` 的 Base URL 与 API Key。应用不会在源码中硬编码 API Key；密钥只会按当前浏览器的 `localStorage` 机制保存。默认模型名称是 `databricks-gpt-5-6-luna`，如果你的网关使用该名称即可直接调用。

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

- 当前 AI 请求在前端直连用户填写的接口，存在 CORS 与客户端密钥暴露风险；正式发布前应改为 Tauri 命令调用系统安全存储或本地代理。
- `localStorage` 是 MVP 存储，不提供跨设备同步、加密或版本迁移。
- 当前题库是小规模草稿数据；还没有批量导入、题目编辑器、账号体系和统计图表。
- Tauri 配置已完成，但 Windows 安装包仍需在具备 Rust/C++ 工具链的 Windows 环境中实际打包验证。
