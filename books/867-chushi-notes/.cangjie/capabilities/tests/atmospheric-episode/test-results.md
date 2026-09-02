# 触发评测判分 — atmospheric-episode

- runs: 7（TP 3 / FP 0 / FN 0 / TN 4）
- precision 1.000 / recall 1.000 / **F1 1.000**
- 兄弟混淆率: 0.000（0/2）

| case | expected | selected | 判定 |
|---|---|---|---|
| at-pos-01#r1 | should_trigger | atmospheric-episode | TP |
| at-pos-02#r1 | should_trigger | atmospheric-episode | TP |
| at-pos-03#r1 | should_trigger | atmospheric-episode | TP |
| at-sib-01#r1 | sibling | cross-media-tracing | OK |
| at-sib-02#r1 | sibling | monitoring-data | OK |
| at-edge-01#r1 | edge_case | none | TN |
| at-neg-01#r1 | should_not_trigger | none | TN |

> 本报告只给原始配对计数与比率；统计非劣需预注册界值 + McNemar/配对 Bootstrap（§10.3），不在此自动宣布。
