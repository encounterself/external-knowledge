import assert from 'node:assert/strict';
import fs from 'node:fs';

const source = fs.readFileSync('src/reader-renderer.tsx', 'utf8');
const index = fs.readFileSync('src/book-index.ts', 'utf8');

assert.match(source, /export function normalizeSearchQuery/);
assert.match(source, /export function highlightText/);
assert.match(source, /export function parseMarkdown/);
assert.match(source, /export function readerKeyAction/);
assert.match(source, /<mark/);
assert.match(source, /reader-focus-frame/);
assert.match(index, /searchText/);
assert.match(index, /wordCount/);

function normalize(query) { return query.trim().replace(/\s+/g, ' ').toLocaleLowerCase(); }
function highlight(text, query) {
  const normalized = normalize(query);
  if (!normalized) return [{ text, matched: false }];
  const result = [];
  const sourceText = text.toLocaleLowerCase();
  let cursor = 0;
  let match = sourceText.indexOf(normalized, cursor);
  while (match >= 0) {
    if (match > cursor) result.push({ text: text.slice(cursor, match), matched: false });
    result.push({ text: text.slice(match, match + normalized.length), matched: true });
    cursor = match + normalized.length;
    match = sourceText.indexOf(normalized, cursor);
  }
  if (cursor < text.length) result.push({ text: text.slice(cursor), matched: false });
  return result.length ? result : [{ text, matched: false }];
}

assert.equal(normalize('  水   污染 '), '水 污染');
assert.deepEqual(highlight('水污染治理', '污染'), [
  { text: '水', matched: false },
  { text: '污染', matched: true },
  { text: '治理', matched: false },
]);
assert.deepEqual(highlight('无匹配', '空气'), [{ text: '无匹配', matched: false }]);
console.log('Reader renderer checks passed.');
