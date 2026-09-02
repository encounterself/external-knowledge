# Stage 1 候选：失败模式 / 反例 / 陷阱

- id: ce01
  title: 污染输入超过自净能力仍继续排放
  type: counter-example
  source_chapter: "第一章环科绪论"
  source_quote: "如果排放的物质超过了环境的自净能力，环境质量就会发生不良变化。"
  source_anchor: "extracted.txt:L206-L223"
  failure_mode: "把环境自净当成无限稀释，忽略污染负荷、时间和受体。"
  mechanism: "输入负荷超过物理扩散、化学转化和生物降解能力，污染物累积并造成质量恶化。"
  warning_signs: ["只说环境能自净", "没有比较排放量与容量", "未写时间或受体影响"]
  bound_to: ["环境问题四段因果链", "容量与自净的超载判断"]
  tags: [counter-example, overload, self-purification]

- id: ce02
  title: 只做末端治理不控污染源
  type: counter-example
  source_chapter: "第四章土壤污染与防治；第十二章可持续发展战略"
  source_quote: "必须将重点放在预防废物产生而不是产生后治理。"
  source_anchor:
    - "extracted.txt:L1919-L1925"
    - "extracted.txt:L3572-L3593"
  failure_mode: "污染已经持续输入后，仍把全部资源投入末端处理或修复。"
  mechanism: "新污染不断补充，末端设施负荷和成本上升，且可能产生残余物或二次污染。"
  warning_signs: ["方案没有源头替代", "只列处理设备", "不核算输入端物料和能源"]
  bound_to: ["污染治理先预防并切断源头", "生命周期污染预防"]
  tags: [counter-example, source-control, end-of-pipe]

- id: ce03
  title: 未处理污水直接用于农田灌溉
  type: counter-example
  source_chapter: "第四章土壤污染与防治"
  source_quote: "如果污水没有经过必要的处理而直接用于农田灌溉，会将污水中有毒有害的物质带至农田污染土壤。"
  source_anchor: "extracted.txt:L1777-L1780"
  failure_mode: "只看到污水中的氮磷等养分，忽略重金属、酚、氰化物等污染物。"
  mechanism: "污染物进入土壤后累积，并可能通过植物吸收和食物链进入人体。"
  warning_signs: ["只计算肥效", "没有水质指标和污染物清单", "没有农产品残留监测"]
  bound_to: ["污染物跨介质迁移追踪", "按情境评估水环境容量"]
  tags: [counter-example, wastewater-irrigation, soil, food-chain]

- id: ce04
  title: 固体废物随意堆放或倾倒
  type: counter-example
  source_chapter: "第五章固体废物处理与资源化"
  source_quote: "固体废物往往又是二次污染源。"
  source_anchor: "extracted.txt:L2163-L2179、L2180-L2207"
  failure_mode: "把固废看成稳定、不会扩散的物质，直接堆放、填埋或倒入水体。"
  mechanism: "风扬、雨淋淋溶、挥发、病原微生物和放射性物质把污染带入土壤、水和大气。"
  warning_signs: ["没有防渗和渗滤液管理", "没有覆盖和导气", "没有危险性鉴别"]
  bound_to: ["按减量、再利用、再循环的顺序推进资源化", "污染物跨介质迁移追踪"]
  tags: [counter-example, solid-waste, secondary-pollution, dumping]

- id: ce05
  title: 不核对条件就把废物称为资源
  type: counter-example
  source_chapter: "第五章固体废物处理与资源化"
  source_quote: "固体废物在确认其无害的前提下可以实行综合利用。"
  source_anchor: "extracted.txt:L2162-L2168、L2220-L2227"
  failure_mode: "因为某种废物有潜在价值，就跳过危险性、污染物含量、市场和去向审查。"
  mechanism: "有害成分可能随建材、肥料或再生产品扩散，资源化反而把污染带到更大范围。"
  warning_signs: ["没有无害化鉴别", "没有产品用途和标准", "只计算回收收益"]
  bound_to: ["按污染形态匹配处理技术", "按减量、再利用、再循环的顺序推进资源化"]
  tags: [counter-example, resource-recovery, hazard-assessment]

- id: ce06
  title: 对不适合压实的固废强行压实
  type: counter-example
  source_chapter: "第五章固体废物处理与资源化"
  source_quote: "压实处理适用可压缩性大而复原性小的物质，不适合纸箱、玻璃、金属、焦油、污泥等。"
  source_anchor: "extracted.txt:L2112-L2117"
  failure_mode: "只以减小体积为目标，不检查材料的可压缩性和复原性。"
  mechanism: "不适用材料会造成设备、运输或后续分选处理问题，不能获得预期减量效果。"
  warning_signs: ["材料清单混杂", "没有预处理和分选", "没有评估复原性"]
  bound_to: ["按污染形态匹配处理技术", "工艺比较与情境选型"]
  tags: [counter-example, compaction, solid-waste, process-selection]

- id: ce07
  title: 在不利气象下只增加排放而不分析扩散
  type: counter-example
  source_chapter: "第三章大气污染及其防治"
  source_quote: "风向摆动，污染物不易扩散，可能造成严重大气污染。"
  source_anchor: "extracted.txt:L1239-L1252、L1299-L1317"
  failure_mode: "只按排放总量判断空气质量，忽略逆温、静风、地形和局地环流。"
  mechanism: "动力和热力扩散受阻，污染物在近地层或局地环流中积聚。"
  warning_signs: ["没有气象条件", "把静稳天气当成普通扩散", "未分析敏感受体位置"]
  bound_to: ["判断大气扩散要同时查动力、热力与地理条件"]
  tags: [counter-example, air-pollution, dispersion, inversion]

- id: ce08
  title: 把光化学烟雾当作一次污染直接排放
  type: counter-example
  source_chapter: "第三章大气污染及其防治"
  source_quote: "一次污染物在阳光照射下能引起光化学反应，生成臭氧等二次污染物。"
  source_anchor: "extracted.txt:L1234-L1238、L1318-L1340"
  failure_mode: "只列汽车尾气，不区分一次污染物、反应条件和二次污染物。"
  mechanism: "氮氧化物和碳氢化合物在紫外线等条件下发生反应，污染性质和毒性发生变化。"
  warning_signs: ["答案没有前体物", "没有日照和气象条件", "把臭氧直接写成排放物"]
  bound_to: ["以前体物和气象条件判断光化学烟雾并控源"]
  tags: [counter-example, photochemical-smog, secondary-pollution]

- id: ce09
  title: 过量施用氮肥
  type: counter-example
  source_chapter: "第七章农业污染及其防治"
  source_quote: "施氮过量会造成土壤、水体和大气污染，并导致土壤酸化等问题。"
  source_anchor: "extracted.txt:L2518-L2541"
  failure_mode: "只追求短期增产，忽略氮的径流、淋溶、硝化和反硝化损失。"
  mechanism: "氮进入水体促进富营养化，进入地下水或形成气态损失，并改变土壤酸碱和微生物过程。"
  warning_signs: ["没有按作物和土壤配肥", "不做氮平衡", "忽略水体和地下水受体"]
  bound_to: ["污染物跨介质迁移追踪", "环境问题四段因果链"]
  tags: [counter-example, fertilizer, nitrogen, agriculture]

- id: ce10
  title: 盲目加大农药浓度和用量
  type: counter-example
  source_chapter: "第七章农业污染及其防治"
  source_quote: "防止措手不及而加大农药的浓度和用量，造成大面积作物的污染事故。"
  source_anchor: "extracted.txt:L2606-L2621"
  failure_mode: "没有预测预报，遇到病虫害就用更高浓度、更大剂量的药。"
  mechanism: "残留、抗药性和非靶标生物损伤上升，污染经空气、水、土壤和食物链扩散。"
  warning_signs: ["没有防治对象判断", "没有安全间隔期", "连续使用同类农药"]
  bound_to: ["以预测、对症和轮换控制农药风险", "生态风险的食物链放大"]
  tags: [counter-example, pesticide, overuse, resistance]

- id: ce11
  title: 畜禽粪污资源化不核对农田消纳量
  type: counter-example
  source_chapter: "第七章农业污染及其防治"
  source_quote: "实行粪便资源化利用政策时，必须首先考虑养殖场周边农田对畜禽粪便的消纳容量。"
  source_anchor: "extracted.txt:L2685-L2703"
  failure_mode: "把资源化等同于无限施肥，忽略运输距离、季节和农田承载力。"
  mechanism: "超过消纳能力或运输经济性后，粪污无法被有效利用，养分、病原体和抗生素进入水土环境。"
  warning_signs: ["没有粪肥需求和面积核算", "远距离运输", "雨季仍集中施用"]
  bound_to: ["畜禽粪污先资源化并核对消纳能力", "容量与自净的超载判断"]
  tags: [counter-example, manure, carrying-capacity, resource-utilization]

- id: ce12
  title: 监测数据未经质量控制直接上报
  type: counter-example
  source_chapter: "第十章环境监测与评价"
  source_quote: "报告数据的质量控制必须是有效数据；超出分析方法灵敏度以外的数据不能上报。"
  source_anchor: "extracted.txt:L3151-L3181"
  failure_mode: "把任何测得的数字都当作有效结果，或为了好看随意删除极值。"
  mechanism: "方法灵敏度、空白、校准、平行样和异常值未核验，导致系统误差进入评价和管理决策。"
  warning_signs: ["未检出值处理规则不明", "没有空白/加标/平行样", "极值没有解释"]
  bound_to: ["只报告经过质量控制的有效监测数据", "监测到治理的证据闭环"]
  tags: [counter-example, monitoring, QA-QC, data-integrity]

- id: ce13
  title: 把区域环境质量归咎于单一排放源
  type: counter-example
  source_chapter: "第十一章环境管理"
  source_quote: "单个排放源与环境质量不具有一一对应的因果关系。"
  source_anchor: "extracted.txt:L3360-L3370"
  failure_mode: "发现一个排放源后就断言它单独决定了整个区域环境质量。"
  mechanism: "源的数量、分布、种类、人口、经济、背景值和环境容量共同影响区域质量。"
  warning_signs: ["没有源清单", "没有空间分布和背景条件", "没有综合整治方案"]
  bound_to: ["监测到治理的证据闭环", "环境规划多方案决策"]
  tags: [counter-example, environmental-management, attribution, systems]

- id: ce14
  title: 忽略设计施工运营的全生命周期
  type: counter-example
  source_chapter: "第一章环科绪论"
  source_quote: "规划设计、施工、运营三阶段并重。"
  source_anchor: "extracted.txt:L284-L301"
  failure_mode: "只评估建成后的正常排放，不看施工扰动、事故风险和运营维护。"
  mechanism: "施工期水土流失、废水、弃渣或运营期异常排放可能造成正常工况之外的生态损害。"
  warning_signs: ["环评只有正常工况", "没有施工期措施", "没有事故和跟踪监测"]
  bound_to: ["生命周期污染预防", "环境规划多方案决策"]
  tags: [counter-example, lifecycle, EIA, construction]
