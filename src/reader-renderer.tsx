import type { ElementType, ReactNode } from 'react';

export type MarkdownBlock =
  | { kind: 'heading'; level: number; text: string }
  | { kind: 'paragraph'; text: string }
  | { kind: 'unordered-list'; items: string[] }
  | { kind: 'ordered-list'; items: string[] }
  | { kind: 'quote'; text: string }
  | { kind: 'code'; language: string; text: string }
  | { kind: 'rule' };

export type HighlightPart = { text: string; matched: boolean };
export type ReaderKeyAction = 'previous-page' | 'next-page' | 'toggle-focus' | 'focus-search' | 'none';

const inlineToken = /(\*\*[^*]+\*\*|__[^_]+__|`[^`]+`|\*[^*]+\*|_[^_]+_)/g;

export function normalizeSearchQuery(query: string): string {
  return query.trim().replace(/\s+/g, ' ').toLocaleLowerCase();
}

export function highlightText(text: string, query: string): HighlightPart[] {
  const normalized = normalizeSearchQuery(query);
  if (!normalized) return [{ text, matched: false }];
  const source = text.toLocaleLowerCase();
  const parts: HighlightPart[] = [];
  let cursor = 0;
  let match = source.indexOf(normalized, cursor);
  while (match >= 0) {
    if (match > cursor) parts.push({ text: text.slice(cursor, match), matched: false });
    parts.push({ text: text.slice(match, match + normalized.length), matched: true });
    cursor = match + normalized.length;
    match = source.indexOf(normalized, cursor);
  }
  if (cursor < text.length) parts.push({ text: text.slice(cursor), matched: false });
  return parts.length ? parts : [{ text, matched: false }];
}

export function markdownPlainText(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/^\s{0,3}#{1,6}\s+/gm, '')
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/^\s*\d+[.)]\s+/gm, '')
    .replace(/^\s*>\s?/gm, '')
    .replace(/[*_`~]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function parseMarkdown(markdown: string): MarkdownBlock[] {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const blocks: MarkdownBlock[] = [];
  let paragraph: string[] = [];
  let listKind: 'unordered-list' | 'ordered-list' | null = null;
  let listItems: string[] = [];
  let codeLines: string[] | null = null;
  let codeLanguage = '';

  const flushParagraph = () => {
    if (paragraph.length) blocks.push({ kind: 'paragraph', text: paragraph.join(' ').trim() });
    paragraph = [];
  };
  const flushList = () => {
    if (listKind && listItems.length) blocks.push({ kind: listKind, items: listItems });
    listKind = null;
    listItems = [];
  };
  const flushCode = () => {
    if (codeLines) blocks.push({ kind: 'code', language: codeLanguage, text: codeLines.join('\n') });
    codeLines = null;
    codeLanguage = '';
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (codeLines) {
      if (/^```/.test(trimmed)) flushCode();
      else codeLines.push(line);
      continue;
    }
    const fence = trimmed.match(/^```\s*([\w-]*)\s*$/);
    if (fence) {
      flushParagraph();
      flushList();
      codeLines = [];
      codeLanguage = fence[1] ?? '';
      continue;
    }
    if (!trimmed) {
      flushParagraph();
      flushList();
      continue;
    }
    const heading = trimmed.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();
      blocks.push({ kind: 'heading', level: heading[1].length, text: heading[2] });
      continue;
    }
    if (/^(?:---+|\*\*\*+)$/.test(trimmed)) {
      flushParagraph();
      flushList();
      blocks.push({ kind: 'rule' });
      continue;
    }
    const unordered = trimmed.match(/^[-*+]\s+(.+)$/);
    const ordered = trimmed.match(/^\d+[.)]\s+(.+)$/);
    if (unordered || ordered) {
      const nextKind = unordered ? 'unordered-list' : 'ordered-list';
      flushParagraph();
      if (listKind && listKind !== nextKind) flushList();
      listKind = nextKind;
      listItems.push((unordered ?? ordered)?.[1] ?? '');
      continue;
    }
    if (/^>\s?/.test(trimmed)) {
      flushParagraph();
      flushList();
      blocks.push({ kind: 'quote', text: trimmed.replace(/^>\s?/, '') });
      continue;
    }
    flushList();
    paragraph.push(trimmed);
  }
  flushParagraph();
  flushList();
  flushCode();
  return blocks;
}

export function readerKeyAction(key: string, options: { isInput?: boolean; isComposing?: boolean } = {}): ReaderKeyAction {
  if (options.isInput || options.isComposing) return 'none';
  if (key === 'ArrowLeft' || key === 'h' || key === 'k') return 'previous-page';
  if (key === 'ArrowRight' || key === 'l' || key === 'j' || key === ' ') return 'next-page';
  if (key === 'f') return 'toggle-focus';
  if (key === '/') return 'focus-search';
  return 'none';
}

export function renderHighlightedText(text: string, query: string, render: (part: HighlightPart, index: number) => ReactNode): ReactNode[] {
  return highlightText(text, query).map(render);
}

export function InlineMarkdown({ text, query = '' }: { text: string; query?: string }) {
  const parts = text.split(inlineToken);
  return <>{parts.map((part, index) => {
    const highlighted = renderHighlightedText(part, query, (item, itemIndex) => item.matched ? <mark key={`${index}-${itemIndex}`}>{item.text}</mark> : item.text);
    if (/^\*\*.*\*\*$/.test(part) || /^__.*__$/.test(part)) return <strong key={index}>{highlighted}</strong>;
    if (/^`.*`$/.test(part)) return <code key={index}>{highlighted}</code>;
    if (/^\*.*\*$/.test(part) || /^_.*_$/.test(part)) return <em key={index}>{highlighted}</em>;
    return <span key={index}>{highlighted}</span>;
  })}</>;
}

export function MarkdownRenderer({ markdown, query = '' }: { markdown: string; query?: string }) {
  return <div className="reader-markdown">{parseMarkdown(markdown).map((block, index) => {
    if (block.kind === 'heading') {
      const Heading = `h${Math.min(6, Math.max(1, block.level))}` as ElementType;
      return <Heading key={index}><InlineMarkdown text={block.text} query={query} /></Heading>;
    }
    if (block.kind === 'unordered-list' || block.kind === 'ordered-list') {
      const List = block.kind === 'unordered-list' ? 'ul' : 'ol';
      return <List key={index}>{block.items.map((item, itemIndex) => <li key={itemIndex}><InlineMarkdown text={item} query={query} /></li>)}</List>;
    }
    if (block.kind === 'quote') return <blockquote key={index}><InlineMarkdown text={block.text} query={query} /></blockquote>;
    if (block.kind === 'code') return <pre key={index} data-language={block.language || undefined}><code>{block.text}</code></pre>;
    if (block.kind === 'rule') return <hr key={index} />;
    return <p key={index}><InlineMarkdown text={block.text} query={query} /></p>;
  })}</div>;
}

export function ReaderFocusFrame({ focused, children }: { focused: boolean; children: ReactNode }) {
  return <div className={focused ? 'reader-focus-frame is-focused' : 'reader-focus-frame'}>{children}</div>;
}
