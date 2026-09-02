# Stage 1 候选：思维模型 / 决策框架 / 推理方法

- id: f01
  title: 环境问题四段因果链
  type: framework
  source_chapter: "第一至十二章（跨章节）"
  source_quote: "污染物进入环境后，会发生迁移、富集、扩散和消失；超过自净能力则造成污染。"
  source_anchor:
    - "extracted.txt:L104-L106"
    - "extracted.txt:L195-L223"
    - "extracted.txt:L2169-L2179"
  summary: "面对环境学题目，先找污染源或形成条件；再说明污染物如何迁移、转化或扩散；接着写对人体、生态、资源和经济的后果；最后把每个后果对应到源头、过程、末端和管理措施。该框架贯穿水、气、土、固废和农业章节，适合把材料题改写为可评分的因果链。"
  tags: [framework, environmental-analysis, source-mechanism-consequence-control]

- id: f02
  title: 容量与自净的超载判断
  type: framework
  source_chapter: "第一章、第二章、第四章"
  source_quote: "如果排放的物质超过了环境的自净能力，环境质量就会发生不良变化。"
  source_anchor:
    - "extracted.txt:L206-L223"
    - "extracted.txt:L344-L346"
    - "extracted.txt:L1686-L1699"
  summary: "先区分环境的承受上限和自然净化过程，再判断污染输入是否超载。容量受用途、目标、污染物性质和环境条件影响；自净依靠物理、化学和生物过程。答题时用‘输入负荷—环境条件—净化能力—质量后果’解释为什么同一污染物在不同场景后果不同。"
  tags: [framework, threshold, carrying-capacity, self-purification]

- id: f03
  title: 污染物跨介质迁移追踪
  type: framework
  source_chapter: "第一章、第三章、第四章、第五至八章"
  source_quote: "污染物在环境中的迁移方式有机械性迁移、物理化学迁移和生物迁移三种。"
  source_anchor:
    - "extracted.txt:L195-L205"
    - "extracted.txt:L1781-L1788"
    - "extracted.txt:L2558-L2605"
  summary: "把污染物当作会改变位置、形态和毒性的对象，而不是静态名词。先画出源、环境介质、中间过程、受体和暴露路径；再按搬运、溶解/吸附/沉降、降解/代谢/食物链等机制解释变化；最后识别控制迁移的节点。"
  tags: [framework, pollutant-fate, multimedia, exposure-pathway]

- id: f04
  title: 按污染形态匹配处理技术
  type: framework
  source_chapter: "第二至第五章"
  source_quote: "一级预处理……去除水中大颗粒漂浮物和沉砂，以减少后续工艺的负荷。"
  source_anchor:
    - "extracted.txt:L613-L631"
    - "extracted.txt:L978-L996"
    - "extracted.txt:L2112-L2156"
  summary: "先识别污染物的物理形态、可降解性、挥发性、溶解性、毒性和负荷，再选择分离、物化、生物、热处理或生态技术。工艺不是按名气选择，而是按目标污染物、环境条件和处理目标匹配；最后检查残余物、二次污染和运行约束。"
  tags: [framework, treatment-selection, process-design, pollution-control]

- id: f05
  title: 三环节控制模型
  type: framework
  source_chapter: "第二至第七章"
  source_quote: "声音的产生与传播过程包括声源、传播途径、接收者三个环节，因此可以从这三个环节去控制噪声。"
  source_anchor:
    - "extracted.txt:L2451-L2457"
    - "extracted.txt:L1877-L1925"
    - "extracted.txt:L2606-L2621"
  summary: "把控制方案拆成产生端、传输端和受体端。产生端减少或替代污染，传输端阻断、稀释或改变迁移路径，受体端降低暴露并保护敏感对象。噪声最直接使用该模型，水土和农业污染也可用同一结构组织分层防治答案。"
  tags: [framework, layered-control, source-path-receptor, exposure-control]

- id: f06
  title: 工艺比较与情境选型
  type: framework
  source_chapter: "第二章、第三章、第五章、第十章"
  source_quote: "各沉淀池的比较：池型、优点、缺点、适用条件。"
  source_anchor:
    - "extracted.txt:L657-L699"
    - "extracted.txt:L905-L956"
    - "extracted.txt:L2287-L2305"
  summary: "比较两个技术或方案时，先说工作原理，再统一检查运行条件、主要优点、局限风险、适用范围和目标达成度。结论必须回到题干情境，解释为什么某方案在该水质、土壤、规模或氧条件下更合适，而不能只抄优缺点表。"
  tags: [framework, comparison, decision, applicability, exam-answer]

- id: f07
  title: 监测到治理的证据闭环
  type: framework
  source_chapter: "第十章、第十一章"
  source_quote: "明确监测目的……现场调查……制定监测计划……采样、分析测试、评价结果、报告结果。"
  source_anchor:
    - "extracted.txt:L3134-L3150"
    - "extracted.txt:L3182-L3204"
    - "extracted.txt:L3374-L3397"
  summary: "先以问题和目的决定监测设计，再调查源、受体与环境条件，制定点位、时频和方法，采样分析后做质量控制和评价，最后把结果转成管理目标、方案和反馈。数据不是答案终点，而是规划、环评、标准和治理决策的证据。"
  tags: [framework, monitoring, evaluation, management, feedback]

- id: f08
  title: 环境规划多方案决策
  type: framework
  source_chapter: "第十一章环境管理"
  source_quote: "经过对各方案的定性比较、定量比较与综合分析，得出一个经济上合理、技术上可行、目标上可达的最佳方案。"
  source_anchor:
    - "extracted.txt:L3374-L3397"
    - "extracted.txt:L3402-L3414"
  summary: "规划问题先收集和评价现状，再预测趋势、划分功能单元、确定目标并计算削减量；随后构造多个控制方案，按经济、技术、目标和实施条件比较，形成推荐方案，并安排投资、年度计划和技术保障。"
  tags: [framework, planning, alternatives, feasibility, decision]

- id: f09
  title: 生态风险的食物链放大
  type: framework
  source_chapter: "第二章、第四章、第七章、第九章"
  source_quote: "某种污染物在生物体内的浓度随着营养级的提高而逐步增大的现象。"
  source_anchor:
    - "extracted.txt:L2908-L2915"
    - "extracted.txt:L1850-L1900"
    - "extracted.txt:L2592-L2605"
  summary: "分析生态和健康风险时，沿‘环境残留—低营养级吸收—个体蓄积—食物链传递—高营养级和人体暴露’追踪，而不只看环境介质中的瞬时浓度。需要分别区分生物富集、个体积累和营养级放大，再定位可干预的源头和暴露节点。"
  tags: [framework, food-chain, bioaccumulation, biomagnification, risk]

- id: f10
  title: 生命周期污染预防
  type: framework
  source_chapter: "第一章、第五章、第九至十二章"
  source_quote: "规划设计、施工、运营三阶段并重……体现生命周期评价和绿色设计理念。"
  source_anchor:
    - "extracted.txt:L284-L301"
    - "extracted.txt:L2948-L2960"
    - "extracted.txt:L3450-L3460"
    - "extracted.txt:L3524-L3560"
  summary: "不把环境治理限定在末端排放。沿项目、产品或物料的全生命周期检查原料、设计、生产、运输、使用、再利用和最终处置；优先减少输入和过程损失，再做循环利用和必要末端处理，并用监测和管理验证结果。"
  tags: [framework, lifecycle, prevention, clean-production, circular-economy]
