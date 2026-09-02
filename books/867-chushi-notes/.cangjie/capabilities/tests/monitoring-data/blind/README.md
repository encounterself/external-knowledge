# 盲测任务包（all, 7 条）

每个 JSON 是一条盲测任务：把 prompt + installed_skills 交给干净 sub-agent，按 instruction 输出;结果按行追加到 results.jsonl:
`{"case_id": ..., "run": 1, "selected_skill": ...}`

**不要**把 suite 中的 expected/notes 给 sub-agent。
