export type Chapter = { id: string; title: string; subtitle: string; summary: string; color: string };
export type Card = { id: string; title: string; chapter: string; tags: string[]; body: string };
export type Question = { id: string; title: string; type: string; chapter: string; difficulty: string; answer: string; points: string[]; status: 'draft'|'approved'; };

export const chapters: Chapter[] = [
  {id:'intro',title:'环境系统与基本语言',subtitle:'第 1 章 · 建立判断框架',summary:'从环境问题、污染物迁移、自净能力和环境容量出发，判断何时构成污染。',color:'#4f6f52'},
  {id:'water',title:'水污染及其防治',subtitle:'第 2 章 · 源—过程—后果—治理',summary:'围绕氮磷负荷、富营养化、水环境容量和污水处理级别组织答题。',color:'#287aa8'},
  {id:'air',title:'大气污染及其防治',subtitle:'第 3 章 · 源化学与扩散条件',summary:'同时分析污染源、化学转化、气象扩散和控制技术。',color:'#8a6842'},
  {id:'soil',title:'土壤、固废与农业污染',subtitle:'第 4—8 章 · 风险与修复',summary:'关注污染迁移、场地条件、二次污染、食物链与健康风险。',color:'#9a5b51'},
  {id:'ecology',title:'生态保护与生物多样性',subtitle:'第 9 章 · 从达标到系统功能',summary:'理解生态平衡、生物多样性、生态修复和生态建设。',color:'#7661a5'},
  {id:'governance',title:'监测、评价与可持续发展',subtitle:'第 10—12 章 · 治理闭环',summary:'用监测数据、环评、标准、规划和清洁生产形成决策闭环。',color:'#b27638'},
];
export const cards: Card[] = [
 {id:'c1',title:'用自净能力界定环境污染',chapter:'intro',tags:['污染判断','阈值'],body:'判断是否构成污染时，先比较输入的物质、能量或生物体的数量/强度与环境自净能力，再检查环境质量及健康、生态影响。'},
 {id:'c2',title:'按迁移类型追踪污染过程',chapter:'intro',tags:['迁移','机制'],body:'确认污染物进入的介质和受体，再按机械、物理化学、生物三类迁移说明位置、形态或毒性的变化，最后连接危害与控制点。'},
 {id:'c3',title:'富营养化先控外源再处理内源',chapter:'water',tags:['氮磷','水华'],body:'先调查排放源、监测氮磷并核算外源总量，尽量截断外部输入；外源控制后，再依据底泥累积和释放情形选择内源削减措施。'},
 {id:'c4',title:'按污水处理级别匹配目标',chapter:'water',tags:['污水处理','工艺'],body:'一级处理均衡水质水量并减轻后续负荷，二级生物处理去除有机物并按需脱氮除磷；回用或深度达标再配置三级处理。'},
 {id:'c5',title:'判断大气扩散要看三类条件',chapter:'air',tags:['扩散','逆温'],body:'大气污染扩散不能只看排放量，还要结合风场与湍流等动力条件、稳定度与逆温等热力条件，以及地形和下垫面条件。'},
 {id:'c6',title:'土壤修复没有脱离场地的万能技术',chapter:'soil',tags:['修复','风险'],body:'修复方案取决于污染物性质、浓度、土壤介质、地下水、土地用途和暴露途径；先识别风险，再在原位/异位和技术组合间选择。'},
 {id:'c7',title:'监测先问结果要支持什么决定',chapter:'governance',tags:['监测','质量保证'],body:'监测方案应先明确管理问题和决策用途，再确定指标、点位、频次、方法、质量控制和结果解释，避免只堆积数据。'},
 {id:'c8',title:'清洁生产把控制点前移',chapter:'governance',tags:['清洁生产','3R'],body:'优先从源头减量、过程优化和资源效率入手，再考虑末端治理；用生命周期和 3R 原则避免把污染转移到另一介质。'},
];
export const defaultQuestions: Question[] = [
 {id:'q1',title:'简述环境容量与环境自净能力的关系。',type:'简答题',chapter:'intro',difficulty:'基础',answer:'环境容量是特定条件下环境可承受污染负荷的限度，自净能力是环境通过物理、化学、生物过程降低污染影响的能力。自净能力影响容量，但容量还受环境功能、污染物性质和质量目标制约。',points:['定义两个概念','说明自净能力影响容量','补充情境条件'],status:'approved'},
 {id:'q2',title:'以富营养化为例，说明水污染治理的答题链条。',type:'论述题',chapter:'water',difficulty:'重点',answer:'从外源氮磷输入诊断开始，监测并核算负荷，优先削减外源；再分析水华、缺氧和生态后果，必要时处理底泥内源释放，最后建立监测和长期管理。',points:['外源诊断与负荷核算','机制和生态后果','外源优先、内源补充','监测管理闭环'],status:'approved'},
 {id:'q3',title:'比较原位修复与异位修复，并说明适用条件。',type:'简答题',chapter:'soil',difficulty:'进阶',answer:'原位修复在污染场地直接处理，扰动和运输少但受场地条件限制；异位修复需挖掘或抽出后处理，控制性更强但成本、运输和二次污染风险更高。应结合污染深度、土地用途和风险选择。',points:['分别定义','优缺点对照','联系场地条件下结论'],status:'draft'},
];
