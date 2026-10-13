const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const SITE = path.join(__dirname, '..');
const read = (f) => fs.readFileSync(path.join(SITE, f), 'utf8');

test('index.html has title, mobile viewport, OG tags and landmarks', () => {
  const html = read('index.html');
  assert.match(html, /<title>Beneath the Chennai Sky<\/title>/);
  assert.match(html, /name="viewport" content="width=device-width, initial-scale=1\.0, viewport-fit=cover"/);
  assert.match(html, /og:title" content="Beneath the Chennai Sky"/);
  assert.match(html, /RIKA AND SRIHARI/);
  assert.match(html, /<main id="intro-screen"/);
  assert.match(html, /<nav class="tabbar"/);
  for (const id of ['start-btn','play-pause-btn','prev-btn','next-btn','progress-wrapper','lyrics-container','audio-player'])
    assert.ok(html.includes(`id="${id}"`), 'missing #' + id);
  assert.doesNotMatch(html, /TODO|lorem ipsum|placeholder/i);
});

test('every local asset referenced exists', () => {
  const files = ['index.html', 'styles.css'];
  const refs = new Set();
  for (const f of files) {
    const t = read(f);
    for (const m of t.matchAll(/(?:src|href)="([^"#:]+)"/g)) refs.add(m[1]);
    for (const m of t.matchAll(/url\(['"]?([^'")]+)['"]?\)/g)) if (!m[1].startsWith('data:')) refs.add(m[1]);
    for (const m of t.matchAll(/srcset="([^"]+)"/g)) m[1].split(',').forEach((s) => refs.add(s.trim().split(' ')[0]));
  }
  for (const r of refs) {
    if (r.startsWith('/_vercel/')) continue; // served by Vercel itself in production
    assert.ok(fs.existsSync(path.join(SITE, r)), 'missing asset ' + r);
  }
});

test('lyrics are intact and in time order', () => {
  const src = read('app.js');
  const block = src.slice(src.indexOf('const LYRICS'), src.indexOf('];') + 2).replace('const LYRICS', 'globalThis.LYRICS');
  const ctx = {}; vm.createContext(ctx); vm.runInContext(block, ctx);
  const L = ctx.LYRICS;
  assert.ok(L.length === 42, 'expected the full lyric sheet');
  assert.strictEqual(L[1][1], "You traveled all those miles to make my birthday bright,");
  assert.ok(L.some((l) => l[1] === 'Srihari.'));
  assert.ok(L.some((l) => l[1] === 'Chennai veedhigalil, nam kathaigal innum'));
  for (let i = 1; i < L.length; i++) assert.ok(L[i][0] > L[i - 1][0], 'out of order at ' + i);
});

test('app.js parses and keeps the original features', () => {
  const src = read('app.js');
  new vm.Script(src);
  for (const k of ["'Space'", "'ArrowLeft'", "'ArrowRight'", 'seekBy(-10)', 'seekBy(10)', "'ended'", 'mediaSession', 'prefers-reduced-motion'])
    assert.ok(src.includes(k), 'missing ' + k);
});

test('three songs with the titles Sri gave, and every song part exists', () => {
  const src = read('app.js');
  for (const title of ["'Beneath the Chennai Sky'", `"POITU VAA (Rika's touch)"`, "'POITU VAA'"]) assert.ok(src.includes('title: ' + title), 'missing ' + title);
  assert.doesNotMatch(src.replace(/\/\/.*$/gm, ''), /Guy Voice/i);
  for (const m of src.matchAll(/parts: \{ dir: '([^']+)', count: (\d+) \}/g)) {
    for (let k = 0; k < Number(m[2]); k++) assert.ok(fs.existsSync(path.join(SITE, m[1], String(k).padStart(2, '0') + '.bin')), 'missing part ' + m[1] + k);
  }
  for (const m of src.matchAll(/'(assets\/covers\/[^']+)'/g)) assert.ok(fs.existsSync(path.join(SITE, m[1])), 'missing ' + m[1]);
});

test('styles are mobile-first with reduced-motion and desktop phone frame', () => {
  const css = read('styles.css');
  assert.match(css, /@media \(prefers-reduced-motion:reduce\)/);
  assert.match(css, /@media \(min-width:760px\)/);
  assert.match(css, /font-display:swap/);
});
