import { createHash } from 'node:crypto';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { stdin, stdout } from 'node:process';

const root = resolve(process.env.ENV867_ROOT || process.cwd());
const source = join(root, 'books/867-chushi-notes/.cangjie/source/structured.md');
const indexFile = join(root, 'src/book-index.ts');
const draftsDir = join(root, '.env867', 'web-drafts');
const tools = [
  { name: 'web_search', description: 'Search the web using a search provider configured by the caller.', inputSchema: { type: 'object', properties: { query: { type: 'string' } }, required: ['query'] } },
  { name: 'web_read', description: 'Read and clean a public webpage.', inputSchema: { type: 'object', properties: { url: { type: 'string' } }, required: ['url'] } },
  { name: 'web_import_draft', description: 'Read a webpage and create an approval-required draft.', inputSchema: { type: 'object', properties: { url: { type: 'string' }, title: { type: 'string' } }, required: ['url'] } },
  { name: 'web_save_import_draft', description: 'Persist a webpage import draft only after explicit approval.', inputSchema: { type: 'object', properties: { url: { type: 'string' }, title: { type: 'string' }, approved: { type: 'boolean' } }, required: ['url', 'approved'] } },
  { name: 'content_search', description: 'Search the local 867 source text.', inputSchema: { type: 'object', properties: { query: { type: 'string' } }, required: ['query'] } },
  { name: 'content_read', description: 'Read a page marker from the local source text.', inputSchema: { type: 'object', properties: { page: { type: 'number' } }, required: ['page'] } },
  { name: 'memory_inspect', description: 'Return local learning data metadata.', inputSchema: { type: 'object', properties: {} } },
];

function reply(id, result) { stdout.write(`${JSON.stringify({ jsonrpc: '2.0', id, result })}\n`); }
function error(id, message) { reply(id, { isError: true, content: [{ type: 'text', text: message }] }); }
function textResult(value) { return { content: [{ type: 'text', text: typeof value === 'string' ? value : JSON.stringify(value, null, 2) }] }; }
function assertPublicUrl(value) {
  const url = new URL(value);
  if (!['http:', 'https:'].includes(url.protocol)) throw new Error('只允许 http/https 网页。');
  const hostname = url.hostname.toLowerCase();
  if (hostname === 'localhost' || hostname === '::1' || hostname.endsWith('.local') || /^(127|10|192\.168|169\.254)\./.test(hostname) || /^172\.(1[6-9]|2\d|3[01])\./.test(hostname)) throw new Error('为防止 SSRF，不允许访问本机或私有网络。');
  if (url.port && !['80', '443'].includes(url.port)) throw new Error('只允许标准网页端口。');
  return url;
}
async function fetchPage(value) {
  const url = assertPublicUrl(value);
  const response = await fetch(url, { headers: { accept: 'text/html,text/plain;q=0.9' }, signal: AbortSignal.timeout(15000), redirect: 'follow' });
  if (!response.ok) throw new Error(`网页读取失败：HTTP ${response.status}`);
  const length = Number(response.headers.get('content-length') || 0);
  if (length > 2_000_000) throw new Error('网页响应超过 2 MB 限制。');
  const html = await response.text();
  if (html.length > 2_000_000) throw new Error('网页响应超过 2 MB 限制。');
  const content = html.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '').replace(/<nav[\s\S]*?<\/nav>/gi, '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
  return { url: url.toString(), title: content.slice(0, 120), content, fetchedAt: new Date().toISOString(), contentHash: createHash('sha256').update(content).digest('hex') };
}
async function localSource() { return readFile(source, 'utf8'); }
async function callTool(name, args = {}) {
  if (name === 'web_search') return { note: 'MCP server does not bundle a search provider.', query: args.query, next: '请提供搜索服务适配器，或直接调用 web_read。' };
  if (name === 'web_read') return fetchPage(args.url);
  if (name === 'web_import_draft') { const page = await fetchPage(args.url); return { ...page, title: args.title || page.title, status: 'draft', approvalRequired: true, persisted: false, message: '草稿已准备但未写入磁盘；需要用户明确审批后再保存。' }; }
  if (name === 'web_save_import_draft') { if (args.approved !== true) throw new Error('保存网页导入草稿需要 approved: true 的明确审批。'); const page = await fetchPage(args.url); const id = page.contentHash.slice(0, 16); await mkdir(draftsDir, { recursive: true }); await writeFile(join(draftsDir, `${id}.json`), JSON.stringify({ ...page, title: args.title || page.title, status: 'draft', approvalRequired: true, approved: true }, null, 2), 'utf8'); return { ...page, id, status: 'draft', persisted: true, approved: true, message: '已在明确审批后保存草稿；正式入库仍需再次审批。' }; }
  if (name === 'content_search') { const content = await localSource(); const query = String(args.query || '').toLowerCase(); return content.split('\n').map((line, index) => ({ line: index + 1, text: line })).filter((item) => item.text.toLowerCase().includes(query)).slice(0, 30); }
  if (name === 'content_read') { const content = await localSource(); const marker = `===== PAGE ${Number(args.page)} =====`; const start = content.indexOf(marker); if (start < 0) throw new Error('找不到指定页。'); const next = content.indexOf('===== PAGE ', start + marker.length); return content.slice(start, next < 0 ? undefined : next); }
  if (name === 'memory_inspect') return { storage: 'browser localStorage', key: 'env867-progress', note: 'MCP server cannot read browser storage directly; use the frontend bridge.' };
  throw new Error(`未知工具：${name}`);
}

let buffer = '';
stdin.setEncoding('utf8');
stdin.on('data', async (chunk) => { buffer += chunk; let newline; while ((newline = buffer.indexOf('\n')) >= 0) { const line = buffer.slice(0, newline).trim(); buffer = buffer.slice(newline + 1); if (!line) continue; try { const request = JSON.parse(line); if (request.method === 'initialize') reply(request.id, { protocolVersion: '2024-11-05', capabilities: { tools: {} }, serverInfo: { name: 'env867', version: '0.1.0' } }); else if (request.method === 'tools/list') reply(request.id, { tools }); else if (request.method === 'tools/call') reply(request.id, textResult(await callTool(request.params?.name, request.params?.arguments))); else if (request.id !== undefined) error(request.id, `不支持的方法：${request.method}`); } catch (caught) { if (line) { try { const request = JSON.parse(line); error(request.id, caught instanceof Error ? caught.message : String(caught)); } catch { /* ignore malformed input */ } } } } });
