# 外部资料知识库

存放收集的**外部资料**（参考资料、文档、外链摘要等），**独立于 Obsidian 知识库**。
这里是资料收集区，Obsidian（`Knowledge/`）是知识沉淀区，两者不同步。

## 分类目录约定

| 目录 | 内容 |
|------|------|
| `ai/` | AI / LLM / 模型网关（LiteLLM、one-api、DeepSeek） |
| `databricks/` | Databricks 平台、数据治理、CDC |
| `mcp/` | MCP 工具与协议（JumpServer MCP 等） |
| `db/` | 数据库（MongoDB / MySQL / PostgreSQL） |
| `ops/` | 运维、网络、Nginx、跳板机 |
| `misc/` | 其他未分类 |
| `books/` | 书籍和长文的学习资料、蒸馏产物与可执行 Skill |

## 命名约定

- 文件名：`YYYY-MM-DD-<主题>.md`，可按主题省略日期前缀。
- 内容尽量自带来源链接（出处 URL）；AI 生成的摘要标注 `ai_generated: true`。

## 使用方式

- 手工，或让 Claude Code 的 `capture-to-obsidian` skill 把会话中出现的外部资料存入对应目录（自动 commit + push）。
- Claude Code 写入 Obsidian 知识笔记时，会先检查此仓库，把相关资料以 `## 外部资料` 引用进笔记。
