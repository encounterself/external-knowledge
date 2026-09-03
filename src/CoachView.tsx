import { useState } from 'react';
import { ChevronRight, MessageCircle, Send, ShieldCheck, Sparkles } from 'lucide-react';
import { bookChapters, bookPages } from './book-index';
import { cards, type Question } from './content';
import { chatWithCoach } from './lib/ai';
import { dueMemory, type Progress } from './lib/storage';

type Message = { role: 'coach' | 'user'; text: string };

export function CoachView({ progress, setNotice }: { progress: Progress; setNotice: (notice: string) => void }) {
  const [messages, setMessages] = useState<Message[]>([{ role: 'coach', text: '你好，我是 867 学习教练。你可以让我安排复习、解释笔记、生成练习，或检查当前题库。' }]);
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);
  const [pending, setPending] = useState<string | null>(null);

  const context = `索引：${bookPages.length} 页 / ${bookChapters.length} 章；能力卡：${cards.length} 张；正式题目：${progress.questions.filter((question) => question.status === 'approved').length} 道；待审核：${progress.questions.filter((question) => question.status === 'draft').length} 道；今日到期：${dueMemory(progress.memory).length} 项。`;
  const send = async () => {
    const text = draft.trim();
    if (!text || busy) return;
    setDraft('');
    setMessages((current) => [...current, { role: 'user', text }]);
    setBusy(true);
    try {
      const remote = await chatWithCoach(progress.settings.baseUrl, progress.settings.apiKey, progress.settings.model, text, context);
      setMessages((current) => [...current, { role: 'coach', text: remote || localCoach(text, progress) }]);
    } catch (error) {
      setMessages((current) => [...current, { role: 'coach', text: `${localCoach(text, progress)}\n\n（在线教练暂不可用：${error instanceof Error ? error.message : '网络错误'}）` }]);
    } finally { setBusy(false); }
  };
  const runTool = (tool: string) => {
    if (tool === '发起构建任务') { setPending(tool); return; }
    if (tool === '搜索平台内容') setMessages((current) => [...current, { role: 'coach', text: `索引已就绪：${bookPages.length} 页、${bookChapters.length} 章。请在顶部搜索框输入关键词，阅读页会定位包含关键词的页面。` }]);
    if (tool === '读取学习数据') setMessages((current) => [...current, { role: 'coach', text: `当前有 ${dueMemory(progress.memory).length} 项到期记忆、${Object.keys(progress.grades).length} 道已批改题目。` }]);
    if (tool === '生成复习任务') setMessages((current) => [...current, { role: 'coach', text: `今日建议：先完成 ${Math.min(5, Math.max(1, dueMemory(progress.memory).length))} 项主动回忆，再练习一道简答题。` }]);
    if (tool === '检查题库草稿') setMessages((current) => [...current, { role: 'coach', text: `题库中有 ${progress.questions.filter((question) => question.status === 'draft').length} 道待审核草稿，请进入“题库审核”逐题确认来源和采分点。` }]);
  };
  return <section className="content-stack"><div className="coach-layout"><section className="panel coach-chat"><div className="coach-messages">{messages.map((message, index) => <div className={`chat-bubble ${message.role}`} key={`${message.role}-${index}`}><span>{message.role === 'coach' ? '教练' : '我'}</span>{message.text}</div>)}</div><div className="coach-input"><input value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && void send()} placeholder="例如：我总记不住富营养化，换一种方式教我" /><button className="primary-button" disabled={busy || !draft.trim()} onClick={() => void send()}>{busy ? '思考中...' : '发送'} <Send size={15} /></button></div></section><aside className="panel tool-panel"><div className="section-heading"><div><span className="eyebrow">Codex 学习教练</span><h3>只操作平台内容</h3></div><MessageCircle size={20} /></div><p>在线时调用你配置的兼容接口；未配置时仍可使用本地索引和学习数据工具。</p>{['搜索平台内容', '读取学习数据', '生成复习任务', '检查题库草稿', '发起构建任务'].map((tool) => <button className="tool-button" key={tool} onClick={() => runTool(tool)}><span>{tool}</span><ChevronRight size={15} /></button>)}{pending && <div className="approval-card"><ShieldCheck size={18} /><strong>需要审批：{pending}</strong><p>将执行平台允许的构建任务；不会访问工作区外文件或上传密钥。</p><button className="primary-button" onClick={() => { setPending(null); setNotice('构建审批已记录；真实 Tauri 命令将在桌面桥接启用后执行。'); }}>批准本次操作</button><button className="ghost-button" onClick={() => setPending(null)}>取消</button></div>}<div className="coach-tip"><Sparkles size={15} />短反馈优先：先告诉你下一步做什么。</div></aside></div></section>;
}

function localCoach(text: string, progress: Progress) {
  if (text.includes('复习') || text.includes('安排')) return `你现在有 ${dueMemory(progress.memory).length} 项到期记忆。先做主动回忆，再完成一道已审核简答题。`;
  if (text.includes('题') || text.includes('练习')) return `题库当前有 ${progress.questions.filter((question: Question) => question.status === 'approved').length} 道正式题目，建议从薄弱章节开始。`;
  return '我已读取本地学习状态。你可以让我安排复习、搜索笔记、检查题库或解释一个具体知识点。';
}
