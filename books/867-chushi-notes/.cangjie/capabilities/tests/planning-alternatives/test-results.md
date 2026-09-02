# 触发评测判分 — planning-alternatives

- runs: 7（TP 3 / FP 0 / FN 0 / TN 4）
- precision 1.000 / recall 1.000 / **F1 1.000**
- 兄弟混淆率: 0.000（0/2）

| case | expected | selected | 判定 |
|---|---|---|---|
| pa-edge-01#r1 | edge_case | none | TN |
| pa-neg-01#r1 | should_not_trigger | none | TN |
| pa-pos-01#r1 | should_trigger | planning-alternatives | TP |
| pa-pos-02#r1 | should_trigger | planning-alternatives | TP |
| pa-pos-03#r1 | should_trigger | planning-alternatives | TP |
| pa-sib-01#r1 | sibling | monitoring-data | OK |
| pa-sib-02#r1 | sibling | context-capacity | OK |

> 本报告只给原始配对计数与比率；统计非劣需预注册界值 + McNemar/配对 Bootstrap（§10.3），不在此自动宣布。
