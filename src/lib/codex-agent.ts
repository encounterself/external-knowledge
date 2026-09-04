import { bookChapters, bookPages } from '../book-index';
import type { Progress } from './storage';

export type CodexMessage = { role: 'system' | 'user' | 'assistant' | 'tool'; content: string; tool_call_id?: string; name?: string; tool_calls?: Array<{ id: string; type?: 'function'; function: { name: string; arguments: string } }> };
export type CodexEvent = { type: 'tool'; name: string; status: 'running' | 'complete'; detail?: string };

const toolDefinitions = [
  { type: 'function', function: { name: 'content_search', description: 'Search the local 867 source index.', parameters: { type: 'object', properties: { query: { type: 'string' } }, required: ['query'] } } },
  { type: 'function', function: { name: 'web_read', description: 'Read a public webpage and return cleaned text.', parameters: { type: 'object', properties: { url: { type: 'string' } }, required: ['url'] } } },
  { type: 'function', function: { name: 'web_import_draft', description: 'Create an approval-required webpage import draft.', parameters: { type: 'object', properties: { url: { type: 'string' }, title: { type: 'string' } }, required: ['url'] } } },
  { type: 'function', function: { name: 'content_read', description: 'Read one indexed local source page.', parameters: { type: 'object', properties: { page: { type: 'number' } }, required: ['page'] } } },
  { type: 'function', function: { name: 'memory_inspect', description: 'Inspect local learning progress metadata.', parameters: { type: 'object', properties: {} } } },
];

const requiredModel = 'gpt-5.6-terra';

function localContentSearch(query: string) {
  const normalized = query.trim().toLowerCase();
  return bookPages.filter((page) => `${page.title} ${page.text}`.toLowerCase().includes(normalized)).slice(0, 8).map((page) => ({ page: page.page, title: page.title, headings: page.headings }));
}

async function webRead(urlValue: string) {
  const url = new URL(urlValue);
  if (!['http:', 'https:'].includes(url.protocol)) throw new Error('只允许 http/https 网页。');
  const hostname = url.hostname.toLowerCase();
  if (hostname === 'localhost' || hostname === '::1' || hostname.endsWith('.local') || /^(127|10|192\.168|169\.254)\./.test(hostname) || /^172\.(1[6-9]|2\d|3[01])\./.test(hostname)) throw new Error('为防止 SSRF，不允许访问本机或私有网络。');
  if (url.port && !['80', '443'].includes(url.port)) throw new Error('只允许标准网页端口。');
  const response = await fetch(url, { headers: { accept: 'text/html,text/plain;q=0.9' }, signal: AbortSignal.timeout(15000) });
  if (!response.ok) throw new Error(`网页读取失败：HTTP ${response.status}`);
  const length = Number(response.headers.get('content-length') || 0);
  if (length > 2_000_000) throw new Error('网页响应超过 2 MB 限制。');
  const html = await response.text();
  if (html.length > 2_000_000) throw new Error('网页响应超过 2 MB 限制。');
  const content = html.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return { url: url.toString(), content: content.slice(0, 12000), fetchedAt: new Date().toISOString() };
}

async function executeTool(name: string, args: Record<string, string>, progress: Progress) {
  if (name === 'content_search') return { chapters: bookChapters.length, results: localContentSearch(args.query || '') };
  if (name === 'content_read') { const page = bookPages.find((item) => item.page === Number(args.page)); if (!page) throw new Error('找不到指定页。'); return page; }
  if (name === 'memory_inspect') return { storage: 'browser localStorage', key: 'env867-progress', due: Object.values(progress.memory).filter((item) => new Date(item.dueAt).getTime() <= Date.now()).length };
  if (name === 'web_read') return webRead(args.url);
  if (name === 'web_import_draft') { const page = await webRead(args.url); return { ...page, approvalRequired: true, status: 'draft', title: args.title || page.content.slice(0, 120), message: '已准备导入草稿；未写入磁盘或知识库，需用户明确审批后再保存。' }; }
  return { progress: { due: Object.values(progress.memory).filter((item) => new Date(item.dueAt).getTime() <= Date.now()).length } };
}

export async function runCodexAgent(baseUrl: string, apiKey: string, model: string, prompt: string, progress: Progress, onEvent: (event: CodexEvent) => void) {
  if (!baseUrl.trim() || !apiKey.trim()) throw new Error('请在接口设置中配置 Base URL 和 API Key，或使用本地 Codex 配置启动 API 代理。');
  if (model !== requiredModel) throw new Error(`仅允许使用模型 ${requiredModel}。`);
  const messages: CodexMessage[] = [{ role: 'system', content: '你是 867 环境学项目内的 Codex。优先使用本地 Skill 和本地内容；网页导入只能生成草稿，所有写入必须请求审批。只操作学习平台资源。' }, { role: 'user', content: prompt }];
  for (let attempt = 0; attempt < 4; attempt += 1) {
    const response = await fetch(`${baseUrl.replace(/\/$/, '')}/chat/completions`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` }, body: JSON.stringify({ model, messages, tools: toolDefinitions, temperature: 0.2 }) });
    if (!response.ok) throw new Error(`Codex API 请求失败（${response.status}）`);
    const data = await response.json() as { choices?: Array<{ message?: { role: 'assistant'; content?: string; tool_calls?: Array<{ id: string; function: { name: string; arguments: string } }> } }> };
    const message = data.choices?.[0]?.message;
    if (!message) throw new Error('Codex API 没有返回有效消息。');
    if (!message.tool_calls?.length) return message.content || 'Codex 没有返回文字内容。';
    messages.push({ role: 'assistant', content: message.content || '', tool_calls: message.tool_calls });
    for (const call of message.tool_calls) {
      onEvent({ type: 'tool', name: call.function.name, status: 'running' });
      let result: unknown;
      try { result = await executeTool(call.function.name, JSON.parse(call.function.arguments) as Record<string, string>, progress); } catch (error) { result = { error: error instanceof Error ? error.message : String(error) }; }
      messages.push({ role: 'tool', tool_call_id: call.id, name: call.function.name, content: JSON.stringify(result) });
      onEvent({ type: 'tool', name: call.function.name, status: 'complete', detail: JSON.stringify(result).slice(0, 180) });
    }
  }
  throw new Error('Codex 工具调用超过安全轮次限制。');
}
