# Tauri 后端桥接说明

当前二期默认使用浏览器 `localStorage` 与静态索引，Tauri 配置保持不变。正式桌面版可在 `src-tauri/src/lib.rs` 注册以下受控命令，再由前端适配层调用：

- `read_book_page(page: number)`：只读 `books/867-chushi-notes/.cangjie/source/structured.md` 的指定页。
- `search_content(query: string)`：只读内容索引并返回页码、章节和来源锚点。
- `memory_upsert(item: MemoryItem)`：写入本地应用数据目录，不上传学习记录。
- `get_learning_data()`：读取本地学习数据。
- `run_build()`：执行受限构建任务；必须由前端审批卡触发，后端仍应校验允许的命令和工作目录。

不要把 API Key 编译进 Rust 或前端 bundle。若接入 AI，优先使用系统钥匙串或本地代理，而不是把密钥长期放入 `localStorage`。
