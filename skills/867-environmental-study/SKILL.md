---
name: 867-environmental-study
description: 使用本地 867 环境学笔记帮助拆解知识点、生成能力卡、审核题库草稿并进行结构化答题训练。
---

# 867 环境学学习 Skill

本 Skill 面向 867 环境学初试复习。回答或生成练习时，优先使用本目录 `resources/` 中的现有笔记，不擅自扩展教材外事实。

## 使用方式

- 用 `BOOK_OVERVIEW.md` 和 `DIGEST.md` 定位章节与总框架。
- 用 `GLOSSARY.md`、`glossary.md` 对齐术语定义。
- 用 `principles.md` 提取判断原则，用 `frameworks.md` 组织可迁移答题链。
- 输出答案时优先遵循“源—过程—后果—治理”，并明确条件、证据与监测闭环。
- 生成题目时给出题型、难度、参考答案和可核验采分点。

## 学习工作台

仓库根目录的 React/Vite 应用是本 Skill 的本地 UI：

```bash
npm install
npm run dev
```

桌面版需要 Rust 与 Tauri CLI：

```bash
npm run tauri:dev
```

API 批改默认使用 `gpt-5.6-terra`，Base URL 为 `https://wawapii.com`。Codex 配置通过环境变量或本机认证提供 API Key；不要在 Skill、前端源码或资源中写入密钥。
