# 阶段 4 压力测试汇总

## 测试设计

- 评测对象：10 个 active capability（7 promoted + 3 router-only）。
- 每张卡：3 条 `should_trigger`、2 条同书 sibling 诱饵、1 条 `edge_case`、1 条 `should_not_trigger`，共 7 条。
- 盲测方式：独立 agent 只看到盲测 prompt、完整候选 slug 清单和能力卡边界，不看到 `expected`、`notes` 或本报告。
- 判分方式：`run_trigger_evals.py score`，精确匹配目标入口；正向、负向和兄弟选择均纳入判分。

## 结果

| capability | destination | runs | TP | FP | FN | TN | F1 | sibling confusion |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| context-capacity | promoted | 7 | 3 | 0 | 0 | 4 | 1.000 | 0/2 |
| cross-media-tracing | promoted | 7 | 3 | 0 | 0 | 4 | 1.000 | 0/2 |
| eutrophication-load | router | 7 | 3 | 0 | 0 | 4 | 1.000 | 0/2 |
| atmospheric-episode | promoted | 7 | 3 | 0 | 0 | 4 | 1.000 | 0/2 |
| soil-remediation | router | 7 | 3 | 0 | 0 | 4 | 1.000 | 0/2 |
| preventive-material-flow | promoted | 7 | 3 | 0 | 0 | 4 | 1.000 | 0/2 |
| pesticide-risk | promoted | 7 | 3 | 0 | 0 | 4 | 1.000 | 0/2 |
| agro-resource-loop | router | 7 | 3 | 0 | 0 | 4 | 1.000 | 0/2 |
| monitoring-data | promoted | 7 | 3 | 0 | 0 | 4 | 1.000 | 0/2 |
| planning-alternatives | promoted | 7 | 3 | 0 | 0 | 4 | 1.000 | 0/2 |

**总计**：70 条用例，30 条正向全部命中，20 条 sibling 诱饵全部选中正确兄弟，10 条边界/负向全部拒绝；总体 precision=1.000、recall=1.000、F1=1.000，兄弟混淆率 0/20。

逐卡明细：

- [context-capacity](tests/context-capacity/test-results.md)
- [cross-media-tracing](tests/cross-media-tracing/test-results.md)
- [eutrophication-load](tests/eutrophication-load/test-results.md)
- [atmospheric-episode](tests/atmospheric-episode/test-results.md)
- [soil-remediation](tests/soil-remediation/test-results.md)
- [preventive-material-flow](tests/preventive-material-flow/test-results.md)
- [pesticide-risk](tests/pesticide-risk/test-results.md)
- [agro-resource-loop](tests/agro-resource-loop/test-results.md)
- [monitoring-data](tests/monitoring-data/test-results.md)
- [planning-alternatives](tests/planning-alternatives/test-results.md)

## 解释与残余风险

- 这是一次单轮、每案一次运行的触发精度盲测，不是统计非劣声明；后续 darwin 进化仍应保留 validation 集并继续回归。
- 结果证明当前 A2/B 边界在设计用例上的选择精确；不证明现实宿主的所有模型、版本或语言变体都会同样触发。
- router-only 能力的命中按具体能力 slug 记录，表示“来源路由可达”，而不是新增可发现入口。
- 原资料是匿名考研讲义，卡片 A1 已明确标为来源/讲义案例而非可证实的作者亲历，避免伪造经验；这也是使用该资料时的审计限制。
