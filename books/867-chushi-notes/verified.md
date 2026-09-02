# 阶段 1.5：三重验证通过单元

> 说明：本文件记录的是知识验证结果，不等于每条都单独安装。阶段 1.6 会根据独立意图、契约、运行、复用和评测能力决定 `promoted` 或 `router`。案例与术语候选作为 A1 / B / 共享词典保留，不冒充独立方法论。

- id: v01
  title: 情境化环境容量与自净超载判断
  type: framework
  candidate_ids: [p01, p04, f02]
  V1_cross_domain:
    passed: true
    evidence:
      - "第一章用‘输入物质/能量/生物体超过自净能力’界定污染：extracted.txt:L104-L106。"
      - "第二章把水容量与水体条件、水质目标、污染物性质和利用方式关联：extracted.txt:L501-L507。"
      - "第四章再次用污染输入速度、土壤容纳能力和净化速度判断土壤污染：extracted.txt:L1689-L1691。"
      - "第十一章把环境容量放入功能分区和规划目标：extracted.txt:L3381-L3383。"
  V2_predictive_power:
    passed: true
    novel_question: "某工厂排放符合行业限值，但进入低流量、饮用水功能河段，是否可以直接判定没有污染？"
    derived_answer: "不能只看许可证或单一排放限值；应按低流量条件、河段功能目标、污染物性质和自净能力核算实际负荷，检查质量和生物影响。若容量被超过，应收紧源头控制或运行限制。"
  V3_exclusivity:
    passed: true
    why_not_common: "能力的特定之处是区分‘存在污染物/符合一个限值’与‘在特定用途和环境条件下超过容量或净化速率’，并要求把用途、污染物和环境状态一起纳入判断。"
  knowledge_decision: pass

- id: v02
  title: 跨介质污染物迁移路径追踪
  type: framework
  candidate_ids: [p02, f03]
  V1_cross_domain:
    passed: true
    evidence:
      - "第一章明确机械性、物理化学和生物迁移三类：extracted.txt:L195-L205。"
      - "第四章将重金属的颗粒/水/空气运输、形态变化、植物吸收和食物链传递串联：extracted.txt:L1849-L1865。"
      - "第五章列出固废经风扬、淋溶、逸气、病原体和辐射进入不同介质：extracted.txt:L2169-L2179。"
      - "第七章将农药漂移、挥发、径流、残留和食物链传递连接：extracted.txt:L2558-L2605。"
  V2_predictive_power:
    passed: true
    novel_question: "农药仓库被洪水冲毁，径流进入灌溉水库，如何设计分析与监测？"
    derived_answer: "先画源头、径流、颗粒物、水体、沉积物和农作物受体，再检查吸附/解吸、挥发、降解、沉积保留、植物吸收和食物链暴露；监测应覆盖源头、上下游水体、沉积物及相关生物，不能只测最终农产品。"
  V3_exclusivity:
    passed: true
    why_not_common: "它要求同时追踪污染物的空间位置、介质、化学形态/毒性和生物浓缩，并按机械、物理化学、生物三类机制定位控制节点，不是泛泛的因果分析。"
  knowledge_decision: pass

- id: v03
  title: 富营养化外源—内源负荷诊断
  type: framework
  candidate_ids: [p05]
  V1_cross_domain:
    passed: true
    evidence:
      - "第一章长江案例区分点源、湖内负荷和非点源径流并分别治理：extracted.txt:L224-L244。"
      - "第二章要求调查氮磷排放源、监测浓度并核算外源总量，再考虑内源措施：extracted.txt:L520-L540。"
      - "第七章把化肥径流/淋溶与水体富营养化联系：extracted.txt:L2523-L2526、L2542-L2545。"
  V2_predictive_power:
    passed: true
    novel_question: "污水截流半年后湖泊仍反复水华，能否直接认定污水处理厂失效？"
    derived_answer: "不能。应核实外源氮磷负荷是否真正下降，监测入湖负荷和底泥/孔隙水释放，并继续控制农业非点源；只有证据表明内源释放显著时才配置针对性内源削减。"
  V3_exclusivity:
    passed: true
    why_not_common: "‘外源/内源’拆分、年度氮磷核算以及先控外源再按底泥证据选择内源措施，是具体的水体诊断顺序，强于一般的‘减少营养盐’。"
  knowledge_decision: pass

- id: v04
  title: 大气污染事件的源化学—扩散条件诊断
  type: framework
  candidate_ids: [p09, p10]
  V1_cross_domain:
    passed: true
    evidence:
      - "第三章对比煤烟型与汽车尾气型污染，分别写出污染物、日照/温湿度、静风和逆温条件：extracted.txt:L1223-L1238。"
      - "第三章给出风、湍流、温度层结、稳定度、地形和局地环流的扩散清单：extracted.txt:L1299-L1317。"
      - "第六章把城市热岛、建筑粗糙度、弱风与污染滞留联系：extracted.txt:L2458-L2476。"
  V2_predictive_power:
    passed: true
    novel_question: "盆地城市在晴朗高压日同时有交通和溶剂排放，且存在浅逆温，如何判断污染类型和措施？"
    derived_answer: "当氮氧化物/挥发性有机物、日照和不利扩散共同出现时，应警惕二次氧化性污染；控制重点是削减前体物、调整高排放作业并进行气象关联监测，不能只依赖颗粒物过滤。"
  V3_exclusivity:
    passed: true
    why_not_common: "它把一次/二次污染区分与前体物反应、风场、稳定度、逆温、地形和局地环流放在同一诊断流程中，解释力明显高于‘天气不好会有雾霾’。"
  knowledge_decision: pass

- id: v05
  title: 场地与污染物约束下的土壤修复选择
  type: framework
  candidate_ids: [p11, p12]
  V1_cross_domain:
    passed: true
    evidence:
      - "第四章按砂质/渗透性、挥发性和污染深度面积选择气相抽提、生物通风、植物修复等：extracted.txt:L1927-L1953、L2060-L2076。"
      - "第四章对重金属固定、植物提取、化学修复和电动力学按污染物与土壤条件区分：extracted.txt:L2034-L2059。"
      - "第五章也以固化/包容固定有害固废，说明‘降低迁移性’是跨处理场景的约束：extracted.txt:L2142-L2143。"
  V2_predictive_power:
    passed: true
    novel_question: "酸性黏土农田镉污染且地下水埋深浅，应该怎样在考试答案中选修复方向？"
    derived_answer: "先核对污染深度、面积、渗透性、镉形态、地下水和作物暴露，再优先讨论能降低生物有效性和淋滤迁移的固定稳定或兼容技术；不能未经捕集就选择可能把污染转移到地下水的淋洗。实际工程参数仍需专业设计和规范核验。"
  V3_exclusivity:
    passed: true
    why_not_common: "核心不是‘选择合适技术’这一空话，而是把渗透性、挥发/溶解特性、深度面积、污染物形态、生物有效性和跨介质风险映射到技术选择。"
  knowledge_decision: pass

- id: v06
  title: 预防生产与物料流层级
  type: framework
  candidate_ids: [p03, p13, p25, f10]
  V1_cross_domain:
    passed: true
    evidence:
      - "第二章将清洁生产、合理布局、回用、总量控制和末端处理组合：extracted.txt:L581-L590。"
      - "第五章工业固废治理从清洁能源/工艺、产品寿命和内部循环延伸到利用与残余处理：extracted.txt:L2306-L2314。"
      - "第十二章将清洁能源原料、生产过程、产品、管理、循环和必要末端处理串联：extracted.txt:L3524-L3559。"
      - "第十二章明确3R分别对应输入、过程和输出端：extracted.txt:L3572-L3593。"
  V2_predictive_power:
    passed: true
    novel_question: "电子工厂方案只提出焚烧和回收溶剂包装，如何补全污染防治策略？"
    derived_answer: "先替代清洁原料/能源并减少物料和危险废物产生，再改进工艺、产品和包装设计，安全地复用或内部循环，之后回收剩余资源，最后对不可避免残余物做末端处理；还要按单位产品排放和生命周期检查效果。"
  V3_exclusivity:
    passed: true
    why_not_common: "被验证的是输入端减量→过程改造→产品/再利用/再循环→残余末端的有序层级，而不是孤立的‘源头控制’口号。"
  knowledge_decision: pass

- id: v07
  title: 预测—对症—轮换的农药风险控制
  type: framework
  candidate_ids: [p16]
  V1_cross_domain:
    passed: true
    evidence:
      - "第一章用农药杀死天敌导致害虫再猖獗说明反馈风险：extracted.txt:L112-L117。"
      - "第七章要求预测预报、对症用药、交替混用、安全间隔和生物防治：extracted.txt:L2606-L2621。"
      - "第八章把残留、投入品使用和农产品安全联系：extracted.txt:L2758-L2803。"
  V2_predictive_power:
    passed: true
    novel_question: "稻田虫害靠近鱼塘，距收获还有20天且虫情不确定，应怎样回答防治方案？"
    derived_answer: "先预测并确认虫情，优先综合和非化学措施；根据对象选品种和剂量，避免重复使用同类药，保护天敌和鱼塘径流受体，并严格满足安全间隔和残留要求，不能因不确定就盲目加量。"
  V3_exclusivity:
    passed: true
    why_not_common: "预测后施药、对象匹配、轮换以管理抗药性和天敌、按收获间隔控残留构成了可执行的领域协议，不是泛泛的‘合理使用农药’。"
  knowledge_decision: pass

- id: v08
  title: 受纳能力约束的农业资源闭环
  type: framework
  candidate_ids: [p17, p20]
  V1_cross_domain:
    passed: true
    evidence:
      - "第七章将粪污资源化置于首位，但要求核对农田消纳能力、距离、季节、清污分流和成本：extracted.txt:L2685-L2703。"
      - "第九章要求生态农业形成副产物再循环、种养互补和土壤肥力维持的自维持系统：extracted.txt:L3041-L3050。"
      - "第五章和第十二章都将有机物循环和资源化作为废物治理方向：extracted.txt:L2220-L2227、L3562-L3593。"
  V2_predictive_power:
    passed: true
    novel_question: "养猪场有大量沼渣沼液，但周边农田已经养分饱和，外地运输距离很远，如何判断资源化方案？"
    derived_answer: "先核算受纳容量、季节、储存、距离和成本，再清污分流并安全回收能源/肥料；必要时安排替代用户或储存，不应把全部粪污强行施到近场农田。"
  V3_exclusivity:
    passed: true
    why_not_common: "其独特约束是资源化必须受消纳容量、物流、季节、规模、经济性和社会接受度限制，并要求形成真实自维持闭环，而非名义回收。"
  knowledge_decision: pass

- id: v09
  title: 目的驱动的监测与有效数据闭环
  type: framework
  candidate_ids: [p21, p22, f07]
  V1_cross_domain:
    passed: true
    evidence:
      - "第十章给出目的→调查→计划→采样/分析→评价→报告，并要求不合格时补测或重测：extracted.txt:L3134-L3150。"
      - "第十章要求内部/外部质量控制、检出限处理、极值说明和反复核准：extracted.txt:L3151-L3181。"
      - "第一章长江案例和第八章农产品安全都把监测与源头控制、标准和监督连接：extracted.txt:L230-L244、L2785-L2825。"
  V2_predictive_power:
    passed: true
    novel_question: "疑似排污导致鱼类死亡，但只有三次采样机会，怎样设计监测答案？"
    derived_answer: "先明确要回答的应急问题，调查源、受体、流向和环境条件，再按决策需要选点位、时频和方法；用校准、空白、平行样、加标样等做质量控制，按标准评价并说明不确定性，异常或无效结果应补测而不是删掉。"
  V3_exclusivity:
    passed: true
    why_not_common: "目的条件化设计、QA/QC分层、检出限和极值处理构成了明确的数据完整性协议，远不止‘多采样、报数据’。"
  knowledge_decision: pass

- id: v10
  title: 多目标环境规划的备选方案决策
  type: framework
  candidate_ids: [p24, f08]
  V1_cross_domain:
    passed: true
    evidence:
      - "第十一章要求目标设定、削减量计算/分配和多个方案的定性定量比较：extracted.txt:L3374-L3397。"
      - "第九章生态规划要求处理局部/整体、当前/长远、环境/发展冲突并进行综合安排：extracted.txt:L3060-L3076。"
      - "第一章南水北调案例按区域和设计、施工、运营阶段预测影响并提供科学决策依据：extracted.txt:L284-L301。"
  V2_predictive_power:
    passed: true
    novel_question: "三个河流修复选项在成本、低流量影响、农田占用和栖息地风险上各不相同，如何选推荐方案？"
    derived_answer: "先按河流功能确定环境目标，计算并分配污染削减量，再对方案的技术可行性、成本、目标达成、分期、生态风险和保障措施做定性定量综合比较，选择可实施的推荐方案并配套跟踪监测，而不是只选最便宜的。"
  V3_exclusivity:
    passed: true
    why_not_common: "目标先行、削减量核算与分配、多方案比较和实施保证形成了环境规划专用的决策程序，不是普通的‘权衡利弊’。"
  knowledge_decision: pass

## 阶段 1.6 候选去向建议

| 能力 | 建议去向 | 理由 |
|---|---|---|
| v01 情境化容量判断 | promoted | 独立意图、契约和运行边界清晰，跨水/土/规划复用。 |
| v02 跨介质迁移追踪 | promoted | 可独立回答污染路径、暴露和监测设计问题。 |
| v03 富营养化负荷诊断 | router | 价值明确但场景较窄，先通过单入口路由。 |
| v04 大气事件诊断 | promoted | 大气题有独立触发语言和明确诊断输出。 |
| v05 土壤修复选择 | router | 有方法价值，但工程参数和现实选型边界较强，先由来源入口承接。 |
| v06 预防生产与物料流层级 | promoted | 横跨水、固废、清洁生产，适合反复调用。 |
| v07 农药风险控制 | promoted | 有独立农业题意图和明确执行协议。 |
| v08 农业资源闭环 | router | 农业养殖场景较窄，但不应删除。 |
| v09 监测与有效数据闭环 | promoted | 监测/QA/QC题有独立契约和可机械评测输出。 |
| v10 多目标环境规划决策 | promoted | 可覆盖规划、环评和宏观工程分析，独立复用强。 |

**知识验证结论**: 10 个去重能力全部通过 V1/V2/V3；阶段 1.6 建议 7 个 promoted、3 个 router，连同 1 个来源入口共 8 个可发现入口，符合默认预算。
