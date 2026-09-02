# 阶段 3：Zettelkasten 链接审计

本 Bundle 保留 10 个 active capability，使用 15 个无向真实关系（30 条对称 `also_read` 边），控制在方法论建议的 8–15 条关系范围内。

| 关系 | 类型 | 用法 |
|---|---|---|
| context-capacity ↔ eutrophication-load | composes-with | 先判断水体承受条件，再拆解氮磷外源/内源负荷。 |
| context-capacity ↔ soil-remediation | composes-with | 容量/超载判断为土壤修复的风险目标提供约束。 |
| context-capacity → agro-resource-loop | depends-on | 农业闭环必须先核对受纳容量。 |
| context-capacity → planning-alternatives | depends-on | 规划目标和方案比较先受环境容量与功能目标约束。 |
| context-capacity ↔ monitoring-data | composes-with | 容量判断需要监测负荷、质量和环境状态。 |
| cross-media-tracing ↔ atmospheric-episode | composes-with | 大气事件诊断可用迁移/转化路径补充暴露解释。 |
| cross-media-tracing ↔ soil-remediation | composes-with | 修复选型要依据污染物迁移和受体暴露路径。 |
| cross-media-tracing ↔ pesticide-risk | composes-with | 农药风险需追踪漂移、径流、残留和食物链。 |
| cross-media-tracing ↔ monitoring-data | composes-with | 路径图决定监测介质、点位和受体。 |
| eutrophication-load ↔ monitoring-data | composes-with | 外源/内源诊断要用目的驱动的氮磷和底泥证据。 |
| preventive-material-flow ↔ soil-remediation | contrasts-with | 一个前移预防产生，一个处理已经存在的污染。 |
| preventive-material-flow ↔ agro-resource-loop | composes-with | 一般物料流层级与农业闭环共同约束资源化。 |
| pesticide-risk ↔ monitoring-data | composes-with | 施药协议需要残留、受体和有效数据反馈。 |
| atmospheric-episode ↔ monitoring-data | composes-with | 源化学/气象诊断决定污染物和气象联合监测。 |
| monitoring-data → planning-alternatives | depends-on | 规划比较需要有效的现状、趋势和跟踪数据。 |

`also_read` 仅表达真实补读关系；不把所有主题相似都硬连。卡片中的“相关能力”已按上述关系写入，具体入口索引由编译器生成。
