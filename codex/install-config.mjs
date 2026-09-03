import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const root = process.cwd();
const codexHome = process.env.CODEX_HOME || join(homedir(), '.codex');
const target = join(codexHome, 'config.toml');
const template = readFileSync(join(root, 'codex', 'config.toml'), 'utf8');
mkdirSync(codexHome, { recursive: true });

const current = existsSync(target) ? readFileSync(target, 'utf8') : '';

const managedStart = '# >>> env867 managed configuration >>>';
const managedEnd = '# <<< env867 managed configuration <<<';
const managed = `${managedStart}\n${template.trim()}\n${managedEnd}`;
const pattern = new RegExp(`${managedStart.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[\\s\\S]*?${managedEnd.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\n?`, 'm');
const next = pattern.test(current) ? current.replace(pattern, `${managed}\n`) : `${current.trimEnd()}${current.trim() ? '\n\n' : ''}${managed}\n`;
const changed = next !== current;
let backup = '';
if (changed && current) {
  backup = `${target}.bak-${new Date().toISOString().replaceAll(':', '-')}`;
  copyFileSync(target, backup);
}
if (changed) writeFileSync(target, next, 'utf8');

console.log(changed ? `已写入 Codex 配置：${target}` : `Codex 配置无需变更：${target}`);
if (backup) console.log(`原配置备份：${backup}`);
console.log('Skill：skills/867-environmental-study/SKILL.md');
console.log('MCP：env867（网页阅读、待审批导入草稿与本地学习工具）');
console.log('请先在运行环境设置 OPENAI_API_KEY 与 OPENAI_BASE_URL；配置文件不包含密钥。');
