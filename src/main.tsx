import { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight, BookOpen, BrainCircuit, Check, CheckCircle2, ChevronLeft, ChevronRight,
  CircleHelp, FileCheck2, Home, Menu, PenLine, Search, Settings, Sparkles, Target, X,
} from 'lucide-react';
import './styles.css';
import { cards, chapters, defaultQuestions, type Card, type Chapter, type Question } from './content';
import { gradeAnswer } from './lib/ai';
import { loadProgress, saveProgress, type Progress } from './lib/storage';

type View = 'home' | 'read' | 'cards' | 'review' | 'practice' | 'settings';

const viewTitles: Record<View, string> = {
  home: '把知识变成得分点', read: '知识阅读', cards: '能力卡训练',
  review: '题库草稿审核', practice: '逐题练习', settings: '接口与数据设置',
};

function App() {
  const [view, setView] = useState<View>('home');
  const [progress, setProgress] = useState<Progress>(() => loadProgress(defaultQuestions));
  const [chapterId, setChapterId] = useState('intro');
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [query, setQuery] = useState('');
  const [notice, setNotice] = useState('');
  const [mobileNav, setMobileNav] = useState(false);

  const update = (next: Progress) => { setProgress(next); saveProgress(next); };
  const currentChapter = chapters.find((item) => item.id === chapterId) ?? chapters[0];
  const filteredCards = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return cards;
    return cards.filter((card) => `${card.title}${card.body}${card.tags.join('')}`.toLowerCase().includes(normalized));
  }, [query]);
  const navigate = (next: View) => { setView(next); setMobileNav(false); setNotice(''); };
  const draftCount = progress.questions.filter((question) => question.status === 'draft').length;
  const menu: Array<[View, string, typeof Home]> = [
    ['home', '总览', Home], ['read', '知识阅读', BookOpen], ['cards', '能力卡', BrainCircuit],
    ['review', '题库审核', FileCheck2], ['practice', '开始练习', PenLine], ['settings', '接口设置', Settings],
  ];

  return <div className="app-shell">
    <aside className={mobileNav ? 'sidebar open' : 'sidebar'}>
      <div className="brand"><div className="brand-mark">867</div><div><strong>环境学学习台</strong><span>初试高分路径</span></div></div>
      <nav className="main-nav">{menu.map(([id, label, Icon]) => <button key={id} className={view === id ? 'nav-item active' : 'nav-item'} onClick={() => navigate(id)}><Icon size={18} /><span>{label}</span>{id === 'review' && draftCount > 0 && <b className="badge">{draftCount}</b>}</button>)}</nav>
      <div className="side-tip"><Target size={17} /><div><strong>今日建议</strong><span>掌握 1 张能力卡，再完成 1 道简答题。</span></div></div>
      <div className="sidebar-footer"><span className="status-dot" />本地学习数据已保存</div>
    </aside>
    {mobileNav && <button className="scrim" aria-label="关闭菜单" onClick={() => setMobileNav(false)} />}
    <main className="workspace">
      <header className="topbar"><button className="icon-button mobile-toggle" onClick={() => setMobileNav(true)} aria-label="打开菜单"><Menu size={20} /></button><div><span className="eyebrow">867 环境学 · 复习工作台</span><h1>{viewTitles[view]}</h1></div><div className="topbar-actions"><label className="search-box"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索知识点..." /></label><button className="avatar" aria-label="学习者">学</button></div></header>
      {notice && <div className="notice"><span>{notice}</span><button className="icon-button" onClick={() => setNotice('')} aria-label="关闭提示"><X size={15} /></button></div>}
      {view === 'home' && <HomeView progress={progress} navigate={navigate} />}
      {view === 'read' && <ReadView chapter={currentChapter} setChapterId={setChapterId} progress={progress} update={update} />}
      {view === 'cards' && <CardsView cards={filteredCards} chapterId={chapterId} setChapterId={setChapterId} />}
      {view === 'review' && <ReviewView progress={progress} update={update} />}
      {view === 'practice' && <PracticeView progress={progress} update={update} selected={selectedQuestion} setSelected={setSelectedQuestion} setNotice={setNotice} />}
      {view === 'settings' && <SettingsView progress={progress} update={update} setNotice={setNotice} />}
    </main>
  </div>;
}

function HomeView({ progress, navigate }: { progress: Progress; navigate: (view: View) => void }) {
  const approved = progress.questions.filter((question) => question.status === 'approved');
  const completed = Object.keys(progress.grades).length;
  return <section className="content-stack">
    <div className="hero-card"><div className="hero-copy"><span className="eyebrow light">今日学习路线</span><h2>从“会看”到“会答”<br />每一步都留下证据。</h2><p>围绕源—过程—后果—治理，建立可迁移的环境学答题结构。</p><button className="primary-button" onClick={() => navigate('practice')}>继续练习 <ArrowRight size={17} /></button></div><div className="hero-graphic"><div className="hero-ring ring-one" /><div className="hero-ring ring-two" /><div className="hero-core">867</div><span className="bubble bubble-water">水</span><span className="bubble bubble-air">气</span><span className="bubble bubble-soil">土</span></div></div>
    <div className="stats-grid"><Stat label="已读能力卡" value={progress.read.length} suffix={`/ ${cards.length}`} hint="持续积累" /><Stat label="正式题目" value={approved.length} suffix=" 道" hint="可开始作答" /><Stat label="待审核草稿" value={progress.questions.length - approved.length} suffix=" 道" hint="需要你的判断" /><Stat label="已完成批改" value={completed} suffix=" 道" hint="形成反馈闭环" /></div>
    <div className="two-column"><section className="panel roadmap-panel"><div className="section-heading"><div><span className="eyebrow">学习路线</span><h3>先建立框架，再练习输出</h3></div><button className="text-button" onClick={() => navigate('read')}>查看全部 <ChevronRight size={15} /></button></div><div className="roadmap-list">{chapters.slice(0, 4).map((chapter, index) => <button className="roadmap-item" key={chapter.id} onClick={() => navigate('read')}><span className="step-number">0{index + 1}</span><span><strong>{chapter.title}</strong><small>{chapter.subtitle}</small></span><span className="roadmap-progress"><i style={{ width: `${Math.min(100, progress.read.includes(chapter.id) ? 100 : 24 + index * 8)}%`, background: chapter.color }} /></span><ChevronRight size={16} /></button>)}</div></section><section className="panel focus-panel"><div className="section-heading"><div><span className="eyebrow">本周重点</span><h3>把机制写进答案</h3></div><Sparkles size={19} className="gold-icon" /></div><div className="focus-quote">“好的环境学答案，不只说治理措施，还要解释污染如何发生、为什么这样治理。”</div><div className="focus-actions"><button onClick={() => navigate('cards')}><BrainCircuit size={16} />复习能力卡</button><button onClick={() => navigate('review')}><FileCheck2 size={16} />审核草稿</button></div></section></div>
  </section>;
}

function Stat({ label, value, suffix, hint }: { label: string; value: number; suffix: string; hint: string }) { return <div className="stat-card"><span>{label}</span><strong>{value}<small>{suffix}</small></strong><em>{hint}</em></div>; }

function ReadView({ chapter, setChapterId, progress, update }: { chapter: Chapter; setChapterId: (id: string) => void; progress: Progress; update: (next: Progress) => void }) {
  const chapterCards = cards.filter((card) => card.chapter === chapter.id);
  const markRead = () => { if (!progress.read.includes(chapter.id)) update({ ...progress, read: [...progress.read, chapter.id] }); };
  return <section className="content-stack"><div className="section-heading page-heading"><div><span className="eyebrow">知识地图 · {chapters.findIndex((item) => item.id === chapter.id) + 1} / {chapters.length}</span><h2>{chapter.title}</h2><p>{chapter.summary}</p></div><button className="secondary-button" onClick={markRead}>{progress.read.includes(chapter.id) ? <><Check size={16} />已完成阅读</> : <>标记为已读 <CheckCircle2 size={16} /></>}</button></div><div className="chapter-tabs">{chapters.map((item) => <button key={item.id} className={item.id === chapter.id ? 'chapter-tab active' : 'chapter-tab'} onClick={() => setChapterId(item.id)}><span style={{ background: item.color }} />{item.title}</button>)}</div><div className="reading-layout"><article className="reading-card"><div className="reading-meta"><span className="chapter-label" style={{ color: chapter.color }}>核心框架</span><span>来源：867 初试笔记</span></div><h3>{chapter.subtitle}</h3><p className="lead">把本章知识压缩成一条可复述、可迁移、能落到治理动作上的答题链。</p><div className="answer-chain"><ChainStep n="01" title="源" body="污染从哪里来？输入、排放与负荷如何描述？" /><ChainStep n="02" title="过程" body="如何迁移、转化、扩散，哪些条件会改变结果？" /><ChainStep n="03" title="后果" body="对环境质量、生态系统与人体暴露有什么影响？" /><ChainStep n="04" title="治理" body="如何按目标、情境、优先级设计控制与监测？" /></div></article><aside className="key-points"><span className="eyebrow">本章能力卡</span>{chapterCards.length ? chapterCards.map((card) => <div className="mini-card" key={card.id}><strong>{card.title}</strong><span>{card.tags.join(' · ')}</span></div>) : <p>本章能力卡正在整理中。</p>}</aside></div></section>;
}
function ChainStep({ n, title, body }: { n: string; title: string; body: string }) { return <div className="chain-step"><span>{n}</span><div><strong>{title}</strong><p>{body}</p></div></div>; }

function CardsView({ cards: visibleCards, chapterId, setChapterId }: { cards: Card[]; chapterId: string; setChapterId: (id: string) => void }) { return <section className="content-stack"><div className="section-heading page-heading"><div><span className="eyebrow">可迁移知识 · {visibleCards.length} 张</span><h2>能力卡训练</h2><p>每张卡都对应一个判断动作，适合在答题前快速调用。</p></div><select value={chapterId} onChange={(event) => setChapterId(event.target.value)}><option value="all">全部章节</option>{chapters.map((chapter) => <option value={chapter.id} key={chapter.id}>{chapter.title}</option>)}</select></div><div className="card-grid">{visibleCards.filter((card) => chapterId === 'all' || card.chapter === chapterId).map((card, index) => <article className="skill-card" key={card.id}><div className="skill-card-top"><span className="card-index">0{index + 1}</span><span className="pill">{chapters.find((chapter) => chapter.id === card.chapter)?.title}</span></div><h3>{card.title}</h3><p>{card.body}</p><div className="tag-row">{card.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div><button className="card-link">展开复述 <ArrowRight size={15} /></button></article>)}</div>{visibleCards.length === 0 && <EmptyState title="没有找到匹配内容" body="换一个关键词试试，例如“监测”“氮磷”或“修复”。" />}</section>; }

function ReviewView({ progress, update }: { progress: Progress; update: (next: Progress) => void }) { const drafts = progress.questions.filter((question) => question.status === 'draft'); const setStatus = (id: string, status: Question['status']) => update({ ...progress, questions: progress.questions.map((question) => question.id === id ? { ...question, status } : question) }); return <section className="content-stack"><div className="section-heading page-heading"><div><span className="eyebrow">人工确认 · {drafts.length} 道待处理</span><h2>题库草稿审核</h2><p>先确认题目是否清晰、采分点是否可判，再放入正式练习。</p></div><div className="review-summary"><span>{progress.questions.filter((q) => q.status === 'approved').length}</span><small>已入库</small></div></div><div className="review-list">{drafts.map((question) => <article className="review-card" key={question.id}><div className="review-card-head"><span className="pill">{question.type} · {question.difficulty}</span><span className="muted">{chapters.find((chapter) => chapter.id === question.chapter)?.title}</span></div><h3>{question.title}</h3><div className="points"><span>采分点</span>{question.points.map((point) => <label key={point}><CheckCircle2 size={14} />{point}</label>)}</div><div className="review-actions"><button className="secondary-button" onClick={() => setStatus(question.id, 'approved')}><Check size={16} />通过入库</button><button className="ghost-button" onClick={() => setStatus(question.id, 'approved')}>暂时保留</button></div></article>)}{drafts.length === 0 && <EmptyState title="题库已经清爽了" body="目前没有待审核草稿，可以直接开始练习。" />}</div></section>; }

function PracticeView({ progress, update, selected, setSelected, setNotice }: { progress: Progress; update: (next: Progress) => void; selected: Question | null; setSelected: (question: Question | null) => void; setNotice: (notice: string) => void }) { const questions = progress.questions.filter((question) => question.status === 'approved'); const [answer, setAnswer] = useState(selected ? progress.answers[selected.id] ?? '' : ''); const [busy, setBusy] = useState(false); const current = selected ?? questions[0]; const index = Math.max(0, questions.findIndex((question) => question.id === current?.id)); const choose = (question: Question) => { setSelected(question); setAnswer(progress.answers[question.id] ?? ''); setNotice(''); }; const submit = async () => { if (!current || !answer.trim()) return; setBusy(true); setNotice(''); try { const result = await gradeAnswer(progress.settings.baseUrl, progress.settings.apiKey, progress.settings.model, current.title, answer, current.answer, current.points); const next = { ...progress, answers: { ...progress.answers, [current.id]: answer }, grades: { ...progress.grades, [current.id]: result } }; update(next); setNotice(result.startsWith('未配置') ? result : 'AI 批改完成'); } catch (error) { setNotice(error instanceof Error ? error.message : '批改失败'); } finally { setBusy(false); } }; if (!current) return <section className="content-stack"><EmptyState title="还没有正式题目" body="去题库审核通过至少一道题，就可以开始逐题练习。" /></section>; return <section className="content-stack"><div className="practice-layout"><aside className="question-rail"><div className="rail-heading"><span className="eyebrow">题目列表</span><strong>{index + 1} / {questions.length}</strong></div>{questions.map((question, questionIndex) => <button key={question.id} className={question.id === current.id ? 'question-nav active' : 'question-nav'} onClick={() => choose(question)}><span>{String(questionIndex + 1).padStart(2, '0')}</span><div><strong>{question.title}</strong><small>{progress.grades[question.id] ? '已批改' : question.difficulty}</small></div>{progress.grades[question.id] && <Check size={15} />}</button>)}</aside><div className="answer-panel"><div className="question-meta"><span className="pill">{current.type}</span><span>{current.difficulty}</span><span>{chapters.find((chapter) => chapter.id === current.chapter)?.title}</span></div><h2>{current.title}</h2><div className="points-box"><div><CircleHelp size={17} /><strong>建议覆盖这些采分点</strong></div><div className="tag-row">{current.points.map((point) => <span key={point}>{point}</span>)}</div></div><label className="answer-label">我的答案<textarea value={answer} onChange={(event) => setAnswer(event.target.value)} placeholder="先写出你的判断链条，不必追求一次成稿..." /></label><div className="answer-footer"><span>{answer.length} 字 · 本地自动保存将在批改后更新</span><button className="primary-button" disabled={busy || !answer.trim()} onClick={submit}>{busy ? '批改中...' : <>提交 AI 批改 <Sparkles size={16} /></>}</button></div>{progress.grades[current.id] && <div className="grade-result"><div className="grade-heading"><Sparkles size={16} /><strong>最近一次批改</strong></div><p>{progress.grades[current.id]}</p></div>}</div></div><div className="practice-pagination"><button className="ghost-button" disabled={index === 0} onClick={() => choose(questions[index - 1])}><ChevronLeft size={16} />上一题</button><button className="ghost-button" disabled={index === questions.length - 1} onClick={() => choose(questions[index + 1])}>下一题<ChevronRight size={16} /></button></div></section>; }

function SettingsView({ progress, update, setNotice }: { progress: Progress; update: (next: Progress) => void; setNotice: (notice: string) => void }) { const [draft, setDraft] = useState(progress.settings); const save = () => { update({ ...progress, settings: draft }); setNotice('接口设置已保存到本机'); }; const clear = () => { localStorage.removeItem('env867-progress'); window.location.reload(); }; return <section className="content-stack"><div className="section-heading page-heading"><div><span className="eyebrow">本地配置 · 不上传密钥</span><h2>接口与数据设置</h2><p>仅在你点击 AI 批改时请求兼容 OpenAI Chat Completions 的接口。</p></div></div><div className="settings-layout"><section className="panel settings-panel"><div className="form-field"><label>Base URL</label><input value={draft.baseUrl} onChange={(event) => setDraft({ ...draft, baseUrl: event.target.value })} placeholder="https://api.example.com/v1" /><small>不要填写 `/chat/completions`，系统会自动拼接。</small></div><div className="form-field"><label>API Key</label><input type="password" value={draft.apiKey} onChange={(event) => setDraft({ ...draft, apiKey: event.target.value })} placeholder="仅保存在当前浏览器 localStorage" autoComplete="off" /><small>本 MVP 不包含服务端代理；请勿在共享电脑保存密钥。</small></div><div className="form-field"><label>模型名称</label><input value={draft.model} onChange={(event) => setDraft({ ...draft, model: event.target.value })} /><small>当前默认锁定为用户指定的 `databricks-gpt-5-6-luna`，也支持你手动改成兼容网关中的别名。</small></div><div className="settings-actions"><button className="primary-button" onClick={save}>保存设置 <Check size={16} /></button><button className="ghost-button danger" onClick={clear}>清除本地数据</button></div></section><aside className="panel safety-panel"><Sparkles size={22} /><h3>隐私提示</h3><p>学习进度、答案、批改结果和接口配置都只保存在本机浏览器。AI 请求会把题目、参考答案和你的答案发送到你填写的 Base URL。</p><div className="safety-list"><span><Check size={14} />不硬编码 API Key</span><span><Check size={14} />默认不连接任何服务</span><span><Check size={14} />可随时清除本地数据</span></div></aside></div></section>; }

function EmptyState({ title, body }: { title: string; body: string }) { return <div className="empty-state"><CircleHelp size={25} /><h3>{title}</h3><p>{body}</p></div>; }

createRoot(document.getElementById('root')!).render(<App />);
