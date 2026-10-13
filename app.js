/* ═══════════════════════════════════════════════
   BENEATH THE CHENNAI SKY — App Logic (mobile redesign)
   Three songs, live karaoke lyrics, lyric-reactive effects.
   ═══════════════════════════════════════════════ */

// ─── Lyrics with exact timestamps (from LRC sync) ───
const LYRICS = [
  [0,       null],  // Instrumental Intro
  [13.08,   "You traveled all those miles to make my birthday bright,"],
  [15.85,   "A memory I'll carry, my guiding light."],
  [19.42,   "I couldn't buy a gift that could ever match your grace,"],
  [21.83,   "So I drew the little photo that I see upon my space—"],
  [25.03,   "Your caller ID picture, an image on my screen,"],
  [28.48,   "The most comforting hello that my eyes have ever seen."],
  [36.97,   "Astrology said enemies the day that we were born."],
  [41.50,   "But we became the best of friends, defying all the stars,"],
  [44.95,   "Talking 'bout how people love, while wondering where is ours."],
  [47.74,   "We wandered through all Chennai, beneath the burning sun,"],
  [51.46,   "Through every temple, every church, until the day was done."],
  [54.64,   "Praying that we'd pass our tests, side by side we'd stand,"],
  [57.70,   "Two searching souls who somehow found each other's hand."],
  [60.35,   "Mathu, I drew every line with you inside my mind,"],
  [66.34,   "It might not be perfect, but it's the truest you will find."],
  [72.84,   "'Cause every stroke's a memory of laughs we used to share,"],
  [78.54,   "The comfort of your energy, just knowing you were there."],
  [83.32,   "People search for years and years, but never feel understood,"],
  [85.85,   "Yet with you it came so naturally, the way that friendship should."],
  [91.17,   "Chennai veedhigalil, nam kathaigal innum"],
  [95.42,   "Kangalil kanneer, nenjil un ninaivugal ullum"],
  [102.32,  "Indru pirindhaalum, endrum nee enodu"],
  [107.90,  "Nee illaadha idathil, naan vaazhvadhu kadinam"],
  [114.54,  "Now you're packing up your bags, to your native place you go,"],
  [119.59,  "\"Forever\" is a heavy word, and it hurts more than you know."],
  [123.04,  "I'll miss the little things we did, the secrets that we keep,"],
  [125.96,  "A bond that grew so quietly, a bond that runs so deep."],
  [128.75,  "A bond that runs so deep."],
  [132.08,  "I'm sending all my luck for the exams you have to take,"],
  [135.00,  "I'll be cheering for you always, for old time's sake."],
  [137.91,  "No amount of distance can erase the time we've spent,"],
  [141.11,  "I didn't know I needed you, until you were heaven-sent."],
  [145.75,  "Thank you for walking in, so out of the blue,"],
  [151.19,  "I never planned on caring quite this deeply for you."],
  [156.65,  "No matter all the miles, no matter where you've been..."],
  [161.96,  "I'll be waiting for your picture to light up on my screen."],
  [165.00,  "I'm really gonna miss you, beneath the Chennai sky..."],
  [169.80,  "With all the love I have to give."],
  [172.97,  "Yours truly,"],
  [174.96,  "Srihari."],
  [178,     null],  // Song Fades Out
];

// ─── POITU VAA — for Mathu (timed to each recording) ───
// [time, line, section label]
const POITU_RIKA_LYRICS = [
  [0, null, "Intro"],
  [11.16, "You crossed so many miles to be", "Verse 1"],
  [14.52, "Beside me on my birthday."],
  [18, "I couldn't buy a gift to match,"],
  [20.5, "So I made one the slow way —"],
  [23.62, "Your face in pencil, line by line,"],
  [28, "Now it's your caller ID."],
  [30.48, "Every time my phone lights up,"],
  [32.88, "It feels like home to me."],
  [35.84, "The stars once swore we'd be foes —", "Pre-Chorus"],
  [38.44, "That's what our charts all say."],
  [40.92, "But look how the story goes:"],
  [44.84, "Best friends, anyway."],
  [47.76, "Poitu vaa, poitu vaa —", "Chorus"],
  [51.3, "We never say goodbye."],
  [53.86, "It just means \"go, and come back,\""],
  [56.82, "Under the same sky."],
  [59.94, "Forever is a heavy word,"],
  [62.7, "So I'll hold it light —"],
  [65.78, "Poitu vaa, poitu vaa,"],
  [68.5, "We'll be alright."],
  [71.84, "We walked all Chennai in the sun,", "Verse 2"],
  [75.22, "Temple bells and candlelight,"],
  [77.68, "Asking every god we passed"],
  [80.4, "To help us get the answers right."],
  [84.2, "We joked love had lost our address,"],
  [86.92, "Never knocked on either door —"],
  [90.2, "But you showed up right on time,"],
  [92.52, "And I didn't ask for more."],
  [94.94, "Some people search for years", "Bridge"],
  [97.94, "To feel understood —"],
  [100.96, "With you, I never had to try."],
  [103.38, "Thank you for walking in,"],
  [104.66, "The best thing I never planned."],
  [106.48, "Now the bags are packed for home —"],
  [110.35, "Take my luck for every exam,"],
  [113.47, "I'll be cheering from the stands."],
  [116.43, "And I almost said goodbye..."],
  [118.9, "But that's not how we say it, is it?"],
  [120.9, "Poitu vaa, poitu vaa —", "Final Chorus"],
  [123.34, "We never say goodbye."],
  [126.2, "It just means \"go, and come back,\""],
  [129.29, "Under the same sky."],
  [132.31, "Forever is a heavy word,"],
  [134.64, "So I'll hold it light —"],
  [137.5, "Poitu vaa, poitu vaa,"],
  [139.04, "Call me, and I'll be alright."],
  [146.18, "Wherever you are, Mathu,", "Outro"],
  [148.52, "Whenever my phone lights up —"],
  [151.44, "Your face in pencil, line by line —"],
  [154.3, "It'll still feel like home."],
  [163.9, "Naan unna miss pannuven, Mathu.", "spoken, softly"],
  [168.34, "Poitu vaa."],
  [171.06, "— Srihari"],
  [173.6, null],
];

const POITU_LYRICS = [
  [0, null, "Intro"],
  [11.24, "You crossed so many miles to be", "Verse 1"],
  [15.22, "Beside me on my birthday."],
  [18, "I couldn't buy a gift to match,"],
  [20.68, "So I made one the slow way —"],
  [24, "Your face in pencil, line by line,"],
  [27.26, "Now it's your caller ID."],
  [30, "Every time my phone lights up,"],
  [33.04, "It feels like home to me."],
  [35.89, "The stars once swore we'd be foes —", "Pre-Chorus"],
  [38.36, "That's what our charts all say."],
  [41.91, "But look how the story goes:"],
  [44.94, "Best friends, anyway."],
  [47.6, "Poitu vaa, poitu vaa —", "Chorus"],
  [50.28, "We never say goodbye."],
  [53.52, "It just means \"go, and come back,\""],
  [56.46, "Under the same sky."],
  [59.68, "Forever is a heavy word,"],
  [62.7, "So I'll hold it light —"],
  [65.5, "Poitu vaa, poitu vaa,"],
  [68.42, "We'll be alright."],
  [71.36, "We walked all Chennai in the sun,", "Verse 2"],
  [75.22, "Temple bells and candlelight,"],
  [78.08, "Asking every god we passed"],
  [80.36, "To help us get the answers right."],
  [83.92, "We joked love had lost our address,"],
  [86.92, "Never knocked on either door —"],
  [90.1, "But you showed up right on time,"],
  [92.54, "And I didn't ask for more."],
  [95.6, null, "Instrumental"],
  [113.12, "Some people search for years", "Bridge"],
  [115.44, "To feel understood —"],
  [117.52, "With you, I never had to try."],
  [120.28, "Thank you for walking in,"],
  [122.28, "The best thing I never planned."],
  [124.52, "Now the bags are packed for home —"],
  [127.36, "Take my luck for every exam,"],
  [129.9, "I'll be cheering from the stands."],
  [131.84, "And I almost said goodbye..."],
  [134.42, "But that's not how we say it, is it?"],
  [137.3, "Poitu vaa, poitu vaa —", "Final Chorus"],
  [138.9, "We never say goodbye."],
  [143.3, "It just means \"go, and come back,\""],
  [145.82, "Under the same sky."],
  [149.42, "Forever is a heavy word,"],
  [152.04, "So I'll hold it light —"],
  [154.6, "Poitu vaa, poitu vaa,"],
  [157.36, "Call me, and I'll be alright."],
  [161.88, "Wherever you are, Mathu,", "Outro"],
  [164.36, "Whenever my phone lights up —"],
  [167.36, "Your face in pencil, line by line —"],
  [170.4, "It'll still feel like home."],
  [174.24, "Naan unna miss pannuven, Mathu.", "spoken, softly"],
  [176, "Poitu vaa."],
  [177.3, "— Srihari"],
  [179.2, null],
];

// ─── The album ───
const SONGS = [
  {
    id: 'chennai-sky', title: 'Beneath the Chennai Sky', sub: 'RIKA AND SRIHARI', artist: 'RIKA AND SRIHARI',
    src: 'track.mp3', duration: 177.8,
    art: 'assets/covers/chennai-sky-768.jpg', thumb: 'assets/covers/chennai-sky-384.jpg', blur: 'assets/covers/chennai-sky-blur.jpg',
    accent: '#cfd8ff', mood: 'moonlight', lyrics: LYRICS
  },
  {
    id: 'poitu-vaa-rika', title: "POITU VAA (Rika's touch)", sub: 'for Mathu', artist: 'SRIHARI',
    parts: { dir: 'songs/poitu-vaa-rikas-touch/', count: 5 }, duration: 177.9,
    art: 'assets/covers/poitu-rika-768.jpg', thumb: 'assets/covers/poitu-rika-384.jpg', blur: 'assets/covers/poitu-rika-blur.jpg',
    accent: '#ffb45e', mood: 'dusk', lyrics: POITU_RIKA_LYRICS
  },
  {
    id: 'poitu-vaa', title: 'POITU VAA', sub: 'for Mathu', artist: 'SRIHARI',
    parts: { dir: 'songs/poitu-vaa/', count: 5 }, duration: 180.1,
    art: 'assets/covers/poitu-night-768.jpg', thumb: 'assets/covers/poitu-night-384.jpg', blur: 'assets/covers/poitu-night-blur.jpg',
    accent: '#ff9a6a', mood: 'late night', lyrics: POITU_LYRICS
  }
];

// ─── Lyric-reactive effects: [pattern, effect] ───
const FX_RULES = [
  [/naan unna miss/i, 'dim'],
  [/phone lights up|caller id|light up on my screen|image on my screen/i, 'glow'],
  [/pencil|drew the little photo/i, 'sketch'],
  [/stars|astrology/i, 'stars'],
  [/temple|candlelight|church/i, 'diyas'],
  [/same sky|chennai sky/i, 'sky'],
  [/bags|packing up/i, 'drift'],
  [/poitu vaa/i, 'bloom'],
  [/burning sun/i, 'sun'],
  [/heaven-sent|guiding light|walking in/i, 'rays'],
  [/kanneer/i, 'tears'],
  [/birthday|srihari/i, 'sparkle'],
];

// ─── DOM ───
const $ = (s, r = document) => r.querySelector(s);
const app            = $('#app');
const introScreen    = $('#intro-screen');
const playerScreen   = $('#player-screen');
const startBtn       = $('#start-btn');
const startLabel     = $('#start-label');
const audio          = $('#audio-player');
const playPauseBtn   = $('#play-pause-btn');
const prevBtn        = $('#prev-btn');
const nextBtn        = $('#next-btn');
const prevTrackBtn   = $('#prev-track');
const nextTrackBtn   = $('#next-track');
const progressFill   = $('#progress-fill');
const progressThumb  = $('#progress-thumb');
const scrub          = $('#progress-wrapper');
const scrubBar       = $('.scrub-bar');
const currentTimeEl  = $('#current-time');
const totalTimeEl    = $('#total-time');
const lyricsContainer= $('#lyrics-container');
const lyricsViewport = $('#lyrics-viewport');
const followBtn      = $('#follow-btn');
const views          = $('#views');
const coverLine      = $('#cover-line');
const coverArt       = $('#album-img-player');
const dockThumb      = $('#dock-thumb');
const dockTitle      = $('#dock-title');
const dockArtist     = $('#dock-artist');
const trackCount     = $('#track-count');
const tracklist      = $('#tracklist');
const fx             = $('#fx');
const bgImg          = $('.player-bg-img');
const canvas         = $('#sky');

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const haptic = (ms = 8) => { try { navigator.vibrate && navigator.vibrate(ms); } catch (_) {} };

// ─── State ───
let songIndex = 0;
let LINES = SONGS[0].lyrics;
let currentLineIndex = -1;
let lyricElements = [];
let hasStarted = false;
let following = true;
let lastUserScroll = 0;
let loopId = 0;

const fmt = (sec) => {
  if (!isFinite(sec)) sec = 0;
  const m = Math.floor(sec / 60), s = Math.floor(sec % 60);
  return m + ':' + String(s).padStart(2, '0');
};

// ═══════════════════════════════════════════════
// SKY — stars, moon, sea, Marina lighthouse beam, gopuram
// ═══════════════════════════════════════════════
const Sky = (() => {
  const ctx = canvas.getContext('2d');
  let W = 0, H = 0, dpr = 1, stars = [], shooting = null, nextShoot = 2500;
  let px = 0, py = 0, tx = 0, ty = 0, running = false, raf = 0, last = 0;
  let mode = 'intro';           // 'intro' | 'player'
  let seaLevel = 0.74, seaTarget = 0.74;

  function resize() {
    const r = app.getBoundingClientRect();
    W = r.width; H = r.height;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round(Math.min(190, (W * H) / 2600));
    stars = Array.from({ length: n }, () => {
      const z = Math.random();
      return { x: Math.random() * W, y: Math.random() * H * 0.78, z,
        r: 0.35 + z * 1.25, a: 0.25 + Math.random() * 0.6,
        sp: 0.6 + Math.random() * 2.2, ph: Math.random() * 6.28 };
    });
    if (!running) frame(performance.now());
  }

  function drawStars(t) {
    for (const s of stars) {
      const tw = reduceMotion.matches ? 1 : 0.55 + 0.45 * Math.sin(t * 0.001 * s.sp + s.ph);
      let x = s.x - px * (4 + s.z * 14), y = s.y - py * (4 + s.z * 10);
      x = ((x % W) + W) % W;
      const horizon = H * seaLevel;
      if (y > horizon - 4) continue;
      const fade = Math.min(1, (horizon - y) / (H * 0.18));
      ctx.globalAlpha = s.a * tw * (0.35 + 0.65 * fade);
      ctx.fillStyle = s.z > 0.85 ? '#ffe9cf' : '#eef2ff';
      ctx.beginPath(); ctx.arc(x, y, s.r, 0, 6.283); ctx.fill();
      if (s.z > 0.93) { ctx.globalAlpha *= 0.25; ctx.beginPath(); ctx.arc(x, y, s.r * 3.2, 0, 6.283); ctx.fill(); }
    }
    ctx.globalAlpha = 1;
  }

  function drawShooting(t, dt) {
    if (reduceMotion.matches) return;
    nextShoot -= dt;
    if (!shooting && nextShoot <= 0) {
      shooting = { x: W * (0.25 + Math.random() * 0.7), y: H * (0.05 + Math.random() * 0.25),
        vx: -(0.5 + Math.random() * 0.4), vy: 0.22 + Math.random() * 0.15, life: 0, max: 900 };
      nextShoot = 5000 + Math.random() * 7000;
    }
    if (!shooting) return;
    const s = shooting; s.life += dt;
    const k = s.life / s.max; if (k >= 1) { shooting = null; return; }
    const x = s.x + s.vx * s.life, y = s.y + s.vy * s.life;
    const len = 90 * Math.sin(Math.PI * k);
    const g = ctx.createLinearGradient(x, y, x - s.vx * len, y - s.vy * len);
    g.addColorStop(0, `rgba(255,244,225,${0.9 * Math.sin(Math.PI * k)})`); g.addColorStop(1, 'rgba(255,244,225,0)');
    ctx.strokeStyle = g; ctx.lineWidth = 1.4; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - s.vx * len, y - s.vy * len); ctx.stroke();
  }

  function drawMoon(t) {
    const mx = W * 0.8 - px * 6, my = H * 0.13 - py * 4, r = Math.min(W, 430) * 0.055;
    const halo = ctx.createRadialGradient(mx, my, r * 0.6, mx, my, r * 7);
    halo.addColorStop(0, 'rgba(235,240,255,.28)'); halo.addColorStop(0.35, 'rgba(180,195,255,.08)'); halo.addColorStop(1, 'rgba(180,195,255,0)');
    ctx.fillStyle = halo; ctx.beginPath(); ctx.arc(mx, my, r * 7, 0, 6.283); ctx.fill();
    const body = ctx.createRadialGradient(mx - r * 0.3, my - r * 0.3, r * 0.1, mx, my, r);
    body.addColorStop(0, '#fbfcff'); body.addColorStop(1, '#cdd6f2');
    ctx.fillStyle = body; ctx.beginPath(); ctx.arc(mx, my, r, 0, 6.283); ctx.fill();
    ctx.fillStyle = 'rgba(150,160,200,.18)';
    [[-0.3, 0.1, 0.22], [0.25, -0.25, 0.15], [0.15, 0.35, 0.12]].forEach(([a, b, c]) => {
      ctx.beginPath(); ctx.arc(mx + a * r, my + b * r, c * r, 0, 6.283); ctx.fill();
    });
    return mx;
  }

  function drawSea(t, moonX) {
    const hy = H * seaLevel;
    if (hy >= H) return;
    const sea = ctx.createLinearGradient(0, hy, 0, H);
    sea.addColorStop(0, '#141c36'); sea.addColorStop(0.25, '#0b1124'); sea.addColorStop(1, '#03050b');
    ctx.fillStyle = sea; ctx.fillRect(0, hy, W, H - hy);
    // horizon glow (city light on the haze)
    const hg = ctx.createLinearGradient(0, hy - 40, 0, hy + 6);
    hg.addColorStop(0, 'rgba(255,150,80,0)'); hg.addColorStop(1, 'rgba(255,150,80,.16)');
    ctx.fillStyle = hg; ctx.fillRect(0, hy - 40, W, 46);
    // moonlight path
    const T = reduceMotion.matches ? 0 : t * 0.001;
    for (let i = 0; i < 26; i++) {
      const k = i / 26, y = hy + 4 + Math.pow(k, 1.6) * (H - hy - 8);
      const w = 6 + k * 70 * (0.6 + 0.4 * Math.sin(T * 1.7 + i * 1.3));
      const xo = Math.sin(T * 0.9 + i * 2.1) * (4 + k * 14);
      ctx.globalAlpha = (0.55 - k * 0.42) * (0.6 + 0.4 * Math.sin(T * 2.3 + i));
      ctx.fillStyle = '#dfe6ff';
      ctx.fillRect(moonX - w / 2 + xo, y, w, 1 + k * 1.6);
    }
    ctx.globalAlpha = 1;
    // rolling wave lines
    ctx.lineWidth = 1;
    for (let j = 0; j < 7; j++) {
      const k = (j + ((T * 0.12) % 1)) / 7, y = hy + Math.pow(k, 1.8) * (H - hy);
      ctx.strokeStyle = `rgba(170,190,255,${0.05 + k * 0.10})`;
      ctx.beginPath();
      for (let x = 0; x <= W; x += 8) {
        const yy = y + Math.sin(x * (0.018 - k * 0.01) + T * 1.4 + j) * (1 + k * 4);
        x === 0 ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy);
      }
      ctx.stroke();
    }
  }

  function drawShore(t) {
    const hy = H * seaLevel;
    if (hy >= H) return;
    const ink = '#02040a';
    // left headland + Marina lighthouse
    const lx = W * 0.15, base = hy + 2;
    ctx.fillStyle = ink;
    ctx.beginPath(); ctx.moveTo(0, base + 10); ctx.lineTo(0, base - 6);
    ctx.quadraticCurveTo(W * 0.12, base - 10, W * 0.32, base + 1); ctx.lineTo(W * 0.32, base + 10); ctx.fill();
    const th = Math.min(H * 0.17, 140), bw = th * 0.13, tw2 = th * 0.08, top = base - 6 - th;
    ctx.beginPath(); ctx.moveTo(lx - bw, base - 4); ctx.lineTo(lx - tw2, top); ctx.lineTo(lx + tw2, top); ctx.lineTo(lx + bw, base - 4); ctx.fill();
    ctx.fillRect(lx - tw2 * 1.6, top - 3, tw2 * 3.2, 3);
    ctx.fillRect(lx - tw2 * 0.8, top - 12, tw2 * 1.6, 9);
    ctx.beginPath(); ctx.arc(lx, top - 12, tw2 * 0.85, Math.PI, 0); ctx.fill();
    // banding hint
    ctx.fillStyle = 'rgba(255,255,255,.04)';
    for (let b = 1; b < 4; b++) { const y = top + (th * b) / 4.2; ctx.fillRect(lx - tw2 - (bw - tw2) * (b / 4), y, 2 * (tw2 + (bw - tw2) * (b / 4)), 3); }

    // rotating beam
    const ly = top - 7;
    const ang = reduceMotion.matches ? 0.5 : t * 0.0006;
    const c = Math.cos(ang), s = Math.sin(ang);
    const reach = W * 1.25 * Math.abs(c), dir = Math.sign(c) || 1, a = 0.20 * Math.pow(Math.abs(c), 0.7);
    if (reach > 4) {
      const ex = lx + dir * reach, spread = 18 + reach * 0.09;
      const g = ctx.createLinearGradient(lx, ly, ex, ly);
      g.addColorStop(0, `rgba(255,214,150,${a})`); g.addColorStop(1, 'rgba(255,214,150,0)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.moveTo(lx, ly - 2); ctx.lineTo(ex, ly - spread - reach * 0.05); ctx.lineTo(ex, ly + spread - reach * 0.05); ctx.lineTo(lx, ly + 2); ctx.fill();
    }
    const flare = 5 + 26 * Math.pow(Math.max(0, s), 10);
    const lg = ctx.createRadialGradient(lx, ly, 0, lx, ly, flare * 2.2);
    lg.addColorStop(0, 'rgba(255,236,200,1)'); lg.addColorStop(0.25, 'rgba(255,200,130,.55)'); lg.addColorStop(1, 'rgba(255,190,120,0)');
    ctx.fillStyle = lg; ctx.beginPath(); ctx.arc(lx, ly, flare * 2.2, 0, 6.283); ctx.fill();

    // right shore + temple gopuram
    ctx.fillStyle = ink;
    const gx = W * 0.84, gb = hy + 1;
    ctx.beginPath(); ctx.moveTo(W * 0.62, gb + 10); ctx.quadraticCurveTo(W * 0.8, gb - 8, W, gb - 5); ctx.lineTo(W, gb + 10); ctx.fill();
    const gh = Math.min(H * 0.12, 96), gw = gh * 0.62, tiers = 6;
    for (let i = 0; i < tiers; i++) {
      const y0 = gb - 4 - (gh * i) / tiers, y1 = gb - 4 - (gh * (i + 1)) / tiers;
      const w0 = gw * (1 - i * 0.12), w1 = gw * (1 - (i + 1) * 0.12) + 4;
      ctx.beginPath(); ctx.moveTo(gx - w0 / 2, y0); ctx.lineTo(gx - w1 / 2, y1 + 1.5); ctx.lineTo(gx - w1 / 2 - 2, y1); ctx.lineTo(gx + w1 / 2 + 2, y1); ctx.lineTo(gx + w1 / 2, y1 + 1.5); ctx.lineTo(gx + w0 / 2, y0); ctx.fill();
    }
    const gt = gb - 4 - gh, cw = gw * 0.34;
    ctx.beginPath(); ctx.ellipse(gx, gt - 3, cw / 2, 5, 0, Math.PI, 0); ctx.fill();
    for (let k = -1; k <= 1; k++) { ctx.fillRect(gx + k * cw * 0.32 - 1, gt - 13, 2, 9); ctx.beginPath(); ctx.arc(gx + k * cw * 0.32, gt - 13, 2, 0, 6.283); ctx.fill(); }
    // little city lights on the shore
    const lights = [[0.06, -4], [0.22, -1], [0.27, 0], [0.68, 0], [0.73, -2], [0.93, -4], [0.97, -4]];
    lights.forEach(([fx, dy], i) => {
      const fl = reduceMotion.matches ? 1 : 0.6 + 0.4 * Math.sin(t * 0.002 + i * 1.7);
      ctx.fillStyle = `rgba(255,190,110,${0.75 * fl})`; ctx.fillRect(W * fx, hy + dy, 1.6, 1.6);
    });
  }

  function frame(t) {
    const dt = Math.min(64, t - (last || t)); last = t;
    px += (tx - px) * 0.05; py += (ty - py) * 0.05;
    seaLevel += (seaTarget - seaLevel) * (reduceMotion.matches ? 1 : 0.035);
    ctx.clearRect(0, 0, W, H);
    drawStars(t);
    drawShooting(t, dt);
    const moonX = mode === 'player' ? W * 0.8 : drawMoon(t);
    drawSea(t, moonX);
    drawShore(t);
    if (running) raf = requestAnimationFrame(frame);
  }

  function start() {
    if (running || reduceMotion.matches) { frame(performance.now()); return; }
    running = true; last = 0; raf = requestAnimationFrame(frame);
  }
  function stop() { running = false; cancelAnimationFrame(raf); }

  window.addEventListener('pointermove', (e) => {
    const r = app.getBoundingClientRect();
    tx = ((e.clientX - r.left) / r.width - 0.5) * 2; ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
  }, { passive: true });
  window.addEventListener('deviceorientation', (e) => {
    if (e.gamma == null) return;
    tx = Math.max(-1, Math.min(1, e.gamma / 30)); ty = Math.max(-1, Math.min(1, (e.beta - 45) / 40));
  }, { passive: true });
  window.addEventListener('resize', resize);
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  reduceMotion.addEventListener && reduceMotion.addEventListener('change', () => { stop(); start(); });

  return {
    init() { resize(); start(); },
    setMode(m) { mode = m; seaTarget = m === 'player' ? 1.02 : 0.74; },
    tilt() { return { x: px, y: py }; }
  };
})();

// ═══════════════════════════════════════════════
// HOME — title + track list
// ═══════════════════════════════════════════════
function splitTitle() {
  document.querySelectorAll('[data-split]').forEach((el) => {
    const txt = el.textContent; el.textContent = '';
    [...txt].forEach((c, i) => {
      const s = document.createElement('span'); s.className = 'ch'; s.style.setProperty('--i', i); s.textContent = c;
      el.appendChild(s);
    });
  });
}

function animateIntro() {
  const go = () => requestAnimationFrame(() => app.classList.add('is-ready'));
  if (document.fonts && document.fonts.ready) {
    Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 700))]).then(go);
  } else go();
}

function renderTracklist() {
  tracklist.innerHTML = '';
  SONGS.forEach((song, i) => {
    const li = document.createElement('li');
    li.className = 'track-card reveal';
    li.style.setProperty('--d', (1600 + i * 140) + 'ms');
    li.style.setProperty('--accent', song.accent);
    li.innerHTML =
      '<button type="button" class="track-btn" aria-label="Play ' + song.title.replace(/"/g, '&quot;') + '">' +
        '<span class="tc-art"><img src="' + song.thumb + '" alt="" width="64" height="64"><span class="tc-eq" aria-hidden="true"><i></i><i></i><i></i></span></span>' +
        '<span class="tc-text"><span class="tc-title"></span><span class="tc-sub"></span></span>' +
        '<span class="tc-meta"><span class="tc-dur">' + fmt(song.duration) + '</span>' +
        '<span class="tc-play" aria-hidden="true"><svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5z"/></svg></span></span>' +
      '</button>';
    li.querySelector('.tc-title').textContent = song.title;
    li.querySelector('.tc-sub').textContent = song.sub;
    li.querySelector('.track-btn').addEventListener('pointerdown', () => prefetch(i), { passive: true });
    li.querySelector('.track-btn').addEventListener('click', () => {
      haptic(10);
      const art = li.querySelector('.tc-art img');
      if (i !== songIndex || !hasStarted) { loadSong(i, true); }
      else if (audio.paused) play();
      go('player', art);
    });
    tracklist.appendChild(li);
  });
  markCurrentCard();
}

function markCurrentCard() {
  [...tracklist.children].forEach((li, i) => li.classList.toggle('is-current', hasStarted && i === songIndex));
}

// Gentle 3D tilt on the cover fan (pointer / phone tilt)
function initTilt() {
  const tilt = $('#art-tilt');
  if (!tilt || reduceMotion.matches) return;
  const tick = () => {
    if (app.dataset.screen === 'intro') {
      const p = Sky.tilt();
      tilt.style.setProperty('--ry', (p.x * 12).toFixed(2) + 'deg');
      tilt.style.setProperty('--rx', (-p.y * 8).toFixed(2) + 'deg');
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

// ═══════════════════════════════════════════════
// SCREENS
// ═══════════════════════════════════════════════
const canVT = () => typeof document.startViewTransition === 'function' && !reduceMotion.matches;

function setScreen(name) {
  if (name === 'player') {
    playerScreen.hidden = false;
    introScreen.setAttribute('aria-hidden', 'true');
    playerScreen.removeAttribute('aria-hidden');
  } else {
    introScreen.removeAttribute('aria-hidden');
    playerScreen.setAttribute('aria-hidden', 'true');
  }
  app.dataset.screen = name;
  Sky.setMode(name);
  setTab(name === 'player' ? (views.dataset.view === 'cover' ? 2 : 1) : 0);
}

function go(name, fromArt) {
  if (app.dataset.screen === name) return;
  const homeArt = fromArt || (tracklist.children[songIndex] && tracklist.children[songIndex].querySelector('.tc-art img'));
  if (canVT() && homeArt) {
    (name === 'player' ? homeArt : dockThumb).style.viewTransitionName = 'art';
    playerScreen.hidden = false;
    const vt = document.startViewTransition(() => {
      homeArt.style.viewTransitionName = name === 'player' ? '' : 'art';
      dockThumb.style.viewTransitionName = name === 'player' ? 'art' : '';
      setScreen(name);
    });
    vt.finished.finally(() => {
      homeArt.style.viewTransitionName = ''; dockThumb.style.viewTransitionName = '';
      if (name === 'intro') setTimeout(() => { if (app.dataset.screen === 'intro') playerScreen.hidden = true; }, 200);
    });
  } else {
    if (name === 'player') { playerScreen.hidden = false; requestAnimationFrame(() => requestAnimationFrame(() => setScreen(name))); }
    else { setScreen(name); setTimeout(() => { if (app.dataset.screen === 'intro') playerScreen.hidden = true; }, 800); }
  }
  if (name === 'player') requestAnimationFrame(() => scrollToActiveLine(true));
}


// ═══════════════════════════════════════════════
// AUDIO SOURCES
// A song is either one file (src) or a set of small byte-parts of one mp3
// (parts), fetched together and joined back into the original file in memory.
// ═══════════════════════════════════════════════
const sourceCache = {};
function songURL(song) {
  if (!song.parts) return Promise.resolve(song.src);
  if (!sourceCache[song.id]) {
    const urls = Array.from({ length: song.parts.count }, (_, k) => song.parts.dir + String(k).padStart(2, '0') + '.bin');
    sourceCache[song.id] = Promise.all(urls.map((u) => fetch(u).then((r) => {
      if (!r.ok) throw new Error('part ' + u + ' ' + r.status);
      return r.arrayBuffer();
    }))).then((bufs) => URL.createObjectURL(new Blob(bufs, { type: 'audio/mpeg' })))
      .catch((e) => { delete sourceCache[song.id]; throw e; });
  }
  return sourceCache[song.id];
}
const prefetch = (i) => { const s = SONGS[i]; if (s) songURL(s).catch(() => {}); };
let loadToken = 0;

// ═══════════════════════════════════════════════
// SONGS
// ═══════════════════════════════════════════════
function loadSong(i, autoplay) {
  songIndex = (i + SONGS.length) % SONGS.length;
  const song = SONGS[songIndex];
  const token = ++loadToken;
  LINES = song.lyrics;
  const wasPlaying = !audio.paused;
  audio.pause();
  app.style.setProperty('--accent', song.accent);
  app.dataset.song = song.id;
  dockThumb.src = song.thumb;
  coverArt.src = song.art;
  coverArt.alt = song.title + ' — cover art';
  dockTitle.textContent = song.title;
  dockArtist.textContent = song.sub === song.artist ? song.artist : song.sub.toUpperCase() + ' · ' + song.artist;
  trackCount.textContent = (songIndex + 1) + ' / ' + SONGS.length;
  totalTimeEl.textContent = fmt(song.duration);
  currentTimeEl.textContent = '0:00';
  progressFill.style.width = '0%'; progressThumb.style.left = '0%';
  // crossfade the ambient background
  bgImg.classList.add('swap');
  setTimeout(() => { bgImg.style.backgroundImage = 'url("' + song.blur + '")'; bgImg.classList.remove('swap'); }, reduceMotion.matches ? 0 : 350);
  lyricsContainer.classList.add('swap');
  setTimeout(() => {
    renderLyrics();
    currentLineIndex = -1;
    lyricsViewport.scrollTop = 0;
    following = true; followBtn.hidden = true;
    lyricsContainer.classList.remove('swap');
    syncLyrics();
  }, reduceMotion.matches ? 0 : 300);
  updateMediaSession();
  markCurrentCard();
  const start = (url) => {
    if (token !== loadToken) return;
    app.classList.remove('is-loading');
    audio.src = url;
    audio.load();
    if (autoplay || wasPlaying) play();
  };
  if (song.src && !song.parts) { start(song.src); return; }
  app.classList.add('is-loading');
  if (autoplay || wasPlaying) { hasStarted = true; startLabel.textContent = 'Continue Listening'; markCurrentCard(); }
  songURL(song).then(start).catch(() => {
    if (token !== loadToken) return;
    app.classList.remove('is-loading');
    if (song.src) start(song.src);
  });
}

// ═══════════════════════════════════════════════
// LYRICS RENDERING
// ═══════════════════════════════════════════════
function renderLyrics() {
  lyricsContainer.innerHTML = '';
  lyricElements = [];
  LINES.forEach((entry, i) => {
    const [time, text, section] = entry;
    if (section) {
      const lab = document.createElement('div');
      lab.className = 'lyric-section';
      lab.textContent = section;
      lyricsContainer.appendChild(lab);
    }
    const div = document.createElement('div');
    div.className = 'lyric-line';
    div.dataset.index = i;
    div.setAttribute('role', 'button');
    div.tabIndex = -1;
    if (text === null) {
      div.classList.add('instrumental');
      div.setAttribute('aria-label', 'Instrumental');
      for (let k = 0; k < 3; k++) { const d = document.createElement('span'); d.className = 'dot'; div.appendChild(d); }
    } else {
      const span = document.createElement('span');
      span.className = 'fill';
      // one span per word; each word lights up once the sweep reaches its start
      const words = [];
      let pos = 0;
      text.split(/(\s+)/).forEach(tok => {
        if (!tok) return;
        if (/^\s+$/.test(tok)) { span.appendChild(document.createTextNode(tok)); pos += tok.length; return; }
        const w = document.createElement('span');
        w.className = 'w';
        w.textContent = tok;
        span.appendChild(w);
        words.push([w, (pos / text.length) * 100]);
        pos += tok.length;
      });
      div._words = words;
      div.appendChild(span);
      if (text === 'Srihari.' || text === '— Srihari') div.classList.add('signature');
      else if (text === 'Yours truly,') div.classList.add('closing');
      else if (/^(Chennai veedhigalil|Kangalil|Indru|Nee illaadha|Naan unna|Poitu vaa)/.test(text)) div.classList.add('tamil');
    }
    // Tap to seek
    div.addEventListener('click', () => {
      audio.currentTime = time;
      following = true; followBtn.hidden = true;
      haptic(6);
      if (audio.paused) play(); else tick(true);
    });
    lyricsContainer.appendChild(div);
    lyricElements.push(div);
  });
}

// ═══════════════════════════════════════════════
// LYRICS SYNC, SCROLL & EFFECTS
// ═══════════════════════════════════════════════
function activeIndexAt(t) {
  for (let i = LINES.length - 1; i >= 0; i--) if (t >= LINES[i][0]) return i;
  return -1;
}

function updateLyricHighlight() {
  lyricElements.forEach((el, i) => {
    const d = i - currentLineIndex;
    el.classList.toggle('active', d === 0);
    el.classList.toggle('past', d < 0);
    el.classList.toggle('near', Math.abs(d) <= 2 && d !== 0);
  });
  const entry = LINES[currentLineIndex];
  const text = entry && entry[1] ? entry[1] : '· · ·';
  if (coverLine.dataset.text !== text) {
    coverLine.dataset.text = text;
    coverLine.classList.add('swap');
    setTimeout(() => { coverLine.textContent = text; coverLine.classList.remove('swap'); }, reduceMotion.matches ? 0 : 220);
  }
}

function scrollToActiveLine(instant) {
  if (currentLineIndex < 0 || !lyricElements[currentLineIndex] || !following) return;
  const line = lyricElements[currentLineIndex];
  const top = line.offsetTop - lyricsViewport.clientHeight * 0.36 + line.offsetHeight / 2;
  lyricsViewport.scrollTo({ top: Math.max(0, top), behavior: instant || reduceMotion.matches ? 'auto' : 'smooth' });
}

function lineDuration(idx) {
  const start = LINES[idx][0];
  const next = LINES[idx + 1] ? LINES[idx + 1][0] : (audio.duration || start + 4);
  return Math.max(1.2, next - start);
}

function fireEffect(idx) {
  if (reduceMotion.matches || !fx || idx < 0) return;
  const text = LINES[idx][1];
  if (!text || audio.paused) return;
  const rule = FX_RULES.find(([re]) => re.test(text));
  if (!rule) return;
  const name = rule[1];
  fx.style.setProperty('--dur', Math.min(9, lineDuration(idx) + 0.8).toFixed(2) + 's');
  fx.className = 'fx';
  void fx.offsetWidth; // restart CSS animations
  fx.className = 'fx on-' + name;
  app.dataset.fx = name;
  clearTimeout(fireEffect.t);
  fireEffect.t = setTimeout(() => { if (app.dataset.fx === name) delete app.dataset.fx; }, Math.min(9, lineDuration(idx)) * 1000);
}

function syncLyrics() {
  const t = audio.currentTime;
  const idx = activeIndexAt(t);
  if (idx !== currentLineIndex) {
    const forward = idx === currentLineIndex + 1;
    currentLineIndex = idx;
    updateLyricHighlight();
    scrollToActiveLine();
    if (forward) fireEffect(idx);
  }
  // karaoke sweep across the active line
  const el = lyricElements[idx];
  if (el && LINES[idx][1] !== null && el.firstChild) {
    const start = LINES[idx][0];
    const dur = Math.max(0.6, lineDuration(idx) * 0.9);
    const p = reduceMotion.matches ? 100 : Math.min(100, ((t - start) / dur) * 100);
    if (el._words) for (const [w, at] of el._words) {
      const on = p > at;
      if (w._on !== on) { w._on = on; w.classList.toggle('on', on); }
    }
  }
  // resume auto-follow after the listener stops scrolling
  if (!following && performance.now() - lastUserScroll > 4500) {
    following = true; followBtn.hidden = true; scrollToActiveLine();
  }
}

function markUserScroll() {
  lastUserScroll = performance.now();
  if (following && app.dataset.screen === 'player') { following = false; followBtn.hidden = false; }
}
lyricsViewport.addEventListener('touchmove', markUserScroll, { passive: true });
lyricsViewport.addEventListener('wheel', markUserScroll, { passive: true });
followBtn.addEventListener('click', () => { following = true; followBtn.hidden = true; scrollToActiveLine(); haptic(); });

// ═══════════════════════════════════════════════
// PLAYBACK
// ═══════════════════════════════════════════════
function setPlayingUI(playing) {
  app.classList.toggle('is-playing', playing);
  app.classList.toggle('is-paused', !playing);
  playPauseBtn.setAttribute('aria-label', playing ? 'Pause' : 'Play');
  if ('mediaSession' in navigator) navigator.mediaSession.playbackState = playing ? 'playing' : 'paused';
}

function play() {
  hasStarted = true;
  startLabel.textContent = 'Continue Listening';
  markCurrentCard();
  if (app.classList.contains('is-loading')) return; // starts as soon as the song arrives
  const p = audio.play();
  if (p && p.catch) p.catch(() => setPlayingUI(false)); // autoplay blocked — listener taps play
}

function togglePlay() {
  haptic(10);
  if (audio.paused) play(); else audio.pause();
}

function tick(force) {
  syncLyrics();
  updateProgress();
  if (!audio.paused || force === true) {
    cancelAnimationFrame(loopId);
    if (!audio.paused) loopId = requestAnimationFrame(tick);
  }
}

function updateProgress() {
  const d = audio.duration || SONGS[songIndex].duration;
  const pct = Math.min(100, (audio.currentTime / d) * 100) || 0;
  progressFill.style.width = pct + '%';
  progressThumb.style.left = pct + '%';
  currentTimeEl.textContent = fmt(audio.currentTime);
  scrub.setAttribute('aria-valuenow', Math.round(pct));
  scrub.setAttribute('aria-valuetext', fmt(audio.currentTime) + ' of ' + fmt(d));
}

function seekBy(s) {
  audio.currentTime = Math.max(0, Math.min(audio.duration || 0, audio.currentTime + s));
  tick(true);
}

function prevSong() {
  haptic();
  if (audio.currentTime > 4) { audio.currentTime = 0; tick(true); return; }
  loadSong(songIndex - 1, true);
}
function nextSong() { haptic(); loadSong(songIndex + 1, true); }

// ─── Scrubber (pointer events: touch, mouse, pen) ───
function seekFromX(clientX) {
  const r = scrubBar.getBoundingClientRect();
  const pct = Math.max(0, Math.min(1, (clientX - r.left) / r.width));
  if (audio.duration) { audio.currentTime = pct * audio.duration; tick(true); }
}
scrub.addEventListener('pointerdown', (e) => {
  scrub.setPointerCapture(e.pointerId);
  scrub.classList.add('is-dragging');
  seekFromX(e.clientX);
  haptic(5);
});
scrub.addEventListener('pointermove', (e) => { if (scrub.classList.contains('is-dragging')) seekFromX(e.clientX); });
const endDrag = () => scrub.classList.remove('is-dragging');
scrub.addEventListener('pointerup', endDrag);
scrub.addEventListener('pointercancel', endDrag);
scrub.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') { e.preventDefault(); e.stopPropagation(); seekBy(-5); }
  if (e.key === 'ArrowRight') { e.preventDefault(); e.stopPropagation(); seekBy(5); }
});

prevBtn.addEventListener('click', () => { haptic(); seekBy(-10); });
nextBtn.addEventListener('click', () => { haptic(); seekBy(10); });
prevTrackBtn.addEventListener('click', prevSong);
nextTrackBtn.addEventListener('click', nextSong);
playPauseBtn.addEventListener('click', togglePlay);

// ─── Start Listening: play inside the tap so phones allow audio ───
startBtn.addEventListener('click', () => {
  haptic(12);
  if (app.classList.contains('is-loading')) loadSong(songIndex, true);
  else if (!hasStarted || audio.paused) play();
  go('player');
});

// ═══════════════════════════════════════════════
// TABS + SWIPE BETWEEN LYRICS / COVER
// ═══════════════════════════════════════════════
const tabs = [...document.querySelectorAll('.tab')];
function setTab(i) {
  $('.tabbar').style.setProperty('--tab', i);
  tabs.forEach((t, k) => { t.classList.toggle('is-on', k === i); if (t.dataset.view) t.setAttribute('aria-pressed', String(k === i)); });
}
function setView(v) {
  views.dataset.view = v;
  setTab(v === 'cover' ? 2 : 1);
  if (v === 'lyrics') requestAnimationFrame(() => scrollToActiveLine(true));
}
tabs.forEach((t) => t.addEventListener('click', () => {
  haptic(6);
  if (t.dataset.go === 'intro') { go('intro'); return; }
  setView(t.dataset.view);
}));

let sx = 0, sy = 0, st = 0;
views.addEventListener('touchstart', (e) => { const p = e.touches[0]; sx = p.clientX; sy = p.clientY; st = Date.now(); }, { passive: true });
views.addEventListener('touchend', (e) => {
  const p = e.changedTouches[0], dx = p.clientX - sx, dy = p.clientY - sy;
  if (Date.now() - st < 600 && Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.6) {
    setView(dx < 0 ? 'cover' : 'lyrics'); haptic(6);
  }
}, { passive: true });

// ═══════════════════════════════════════════════
// AUDIO EVENTS
// ═══════════════════════════════════════════════
audio.addEventListener('play', () => { setPlayingUI(true); tick(); prefetch(songIndex + 1); });
audio.addEventListener('pause', () => { setPlayingUI(false); tick(true); });
audio.addEventListener('timeupdate', () => { if (audio.paused) tick(true); updatePosition(); });
audio.addEventListener('seeked', () => tick(true));
audio.addEventListener('loadedmetadata', () => {
  totalTimeEl.textContent = fmt(audio.duration);
  const card = tracklist.children[songIndex];
  if (card) card.querySelector('.tc-dur').textContent = fmt(audio.duration);
  updatePosition();
});
audio.addEventListener('ended', () => {
  if (songIndex < SONGS.length - 1) loadSong(songIndex + 1, true); // the album plays on
  else setPlayingUI(false);
});

// Lock-screen / headphone controls
function updatePosition() {
  if (!('mediaSession' in navigator) || !navigator.mediaSession.setPositionState || !audio.duration) return;
  try { navigator.mediaSession.setPositionState({ duration: audio.duration, position: audio.currentTime, playbackRate: audio.playbackRate }); } catch (_) {}
}
function updateMediaSession() {
  if (!('mediaSession' in navigator) || typeof MediaMetadata === 'undefined') return;
  const s = SONGS[songIndex];
  try {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: s.title, artist: s.artist, album: 'Beneath the Chennai Sky',
      artwork: [{ src: s.thumb, sizes: '384x384', type: 'image/jpeg' }, { src: s.art, sizes: '768x768', type: 'image/jpeg' }]
    });
  } catch (_) {}
}
if ('mediaSession' in navigator) {
  try {
    const ms = navigator.mediaSession;
    ms.setActionHandler('play', play);
    ms.setActionHandler('pause', () => audio.pause());
    ms.setActionHandler('seekbackward', () => seekBy(-10));
    ms.setActionHandler('seekforward', () => seekBy(10));
    ms.setActionHandler('previoustrack', prevSong);
    ms.setActionHandler('nexttrack', nextSong);
    ms.setActionHandler('seekto', (d) => { audio.currentTime = d.seekTime; tick(true); });
  } catch (_) {}
}

// ═══════════════════════════════════════════════
// KEYBOARD SHORTCUTS
// ═══════════════════════════════════════════════
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    e.preventDefault();
    if (app.dataset.screen === 'player') togglePlay(); else startBtn.click();
  }
  if (e.code === 'ArrowLeft') seekBy(-5);
  if (e.code === 'ArrowRight') seekBy(5);
});

// ═══════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════
window.addEventListener('DOMContentLoaded', () => {
  splitTitle();
  renderTracklist();
  loadSong(0, false);
  setPlayingUI(false);
  setTab(0);
  Sky.init();
  animateIntro();
  initTilt();
});
