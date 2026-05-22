/* ═══════════════════════════════════════════════
   BENEATH THE CHENNAI SKY — App Logic
   Live Subtitle Mode — auto-distributes lyrics
   across the song duration proportionally.
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

// ─── DOM Elements ───
const introScreen      = document.getElementById('intro-screen');
const playerScreen     = document.getElementById('player-screen');
const startBtn         = document.getElementById('start-btn');
const audio            = document.getElementById('audio-player');
const playPauseBtn     = document.getElementById('play-pause-btn');
const prevBtn          = document.getElementById('prev-btn');
const nextBtn          = document.getElementById('next-btn');
const progressFill     = document.getElementById('progress-fill');
const progressThumb    = document.getElementById('progress-thumb');
const progressWrapper  = document.getElementById('progress-wrapper');
const currentTimeEl    = document.getElementById('current-time');
const totalTimeEl      = document.getElementById('total-time');
const lyricsContainer  = document.getElementById('lyrics-container');
const lyricsViewport   = document.getElementById('lyrics-viewport');
const iconPlay         = document.querySelector('.icon-play');
const iconPause        = document.querySelector('.icon-pause');

// ─── State ───
let currentLineIndex = -1;
let isPlaying = false;
let lyricElements = [];


// ═══════════════════════════════════════════════
// INTRO ANIMATIONS
// ═══════════════════════════════════════════════
function animateIntro() {
  const elements = document.querySelectorAll('[data-delay]');
  elements.forEach(el => {
    const delay = parseInt(el.dataset.delay);
    setTimeout(() => {
      el.classList.add('visible');
    }, delay);
  });
}

// ═══════════════════════════════════════════════
// LYRICS RENDERING
// ═══════════════════════════════════════════════
function renderLyrics() {
  lyricsContainer.innerHTML = '';
  lyricElements = [];

  LYRICS.forEach((entry, i) => {
    const div = document.createElement('div');
    div.classList.add('lyric-line');
    div.dataset.index = i;

    if (entry[1] === null) {
      div.textContent = '· · ·';
      div.classList.add('instrumental');
    } else {
      div.textContent = entry[1];
      if (entry[1] === "Srihari.") {
        div.classList.add('signature');
      }
    }

    // Click to seek
    div.addEventListener('click', () => {
      audio.currentTime = entry[0];
      if (!isPlaying) {
        togglePlay();
      }
    });

    lyricsContainer.appendChild(div);
    lyricElements.push(div);
  });
}

// ═══════════════════════════════════════════════
// LYRICS SYNC & SCROLL
// ═══════════════════════════════════════════════
function syncLyrics() {
  const time = audio.currentTime;
  let activeIndex = -1;

  for (let i = LYRICS.length - 1; i >= 0; i--) {
    if (time >= LYRICS[i][0]) {
      activeIndex = i;
      break;
    }
  }

  if (activeIndex !== currentLineIndex) {
    currentLineIndex = activeIndex;
    updateLyricHighlight();
    scrollToActiveLine();
  }
}

function updateLyricHighlight() {
  lyricElements.forEach((el, i) => {
    el.classList.remove('active', 'past');
    if (i === currentLineIndex) {
      el.classList.add('active');
    } else if (i < currentLineIndex) {
      el.classList.add('past');
    }
  });
}

function scrollToActiveLine() {
  if (currentLineIndex < 0 || !lyricElements[currentLineIndex]) return;

  const activeLine = lyricElements[currentLineIndex];
  const viewportHeight = lyricsViewport.clientHeight;
  const lineOffset = activeLine.offsetTop;
  const lineHeight = activeLine.offsetHeight;

  // Position the active line at ~30% from top of viewport
  const targetY = lineOffset - (viewportHeight * 0.3) + (lineHeight / 2);

  lyricsContainer.style.transform = `translateY(${-targetY}px)`;
}

// ═══════════════════════════════════════════════
// PLAYBACK CONTROLS
// ═══════════════════════════════════════════════
function togglePlay() {
  if (audio.paused) {
    audio.play();
    isPlaying = true;
    iconPlay.style.display = 'none';
    iconPause.style.display = 'block';
    document.querySelector('.player-wrapper').classList.remove('paused');
  } else {
    audio.pause();
    isPlaying = false;
    iconPlay.style.display = 'block';
    iconPause.style.display = 'none';
    document.querySelector('.player-wrapper').classList.add('paused');
  }
}

function updateProgress() {
  if (!audio.duration) return;
  const pct = (audio.currentTime / audio.duration) * 100;
  progressFill.style.width = pct + '%';
  progressThumb.style.left = pct + '%';
  currentTimeEl.textContent = formatTime(audio.currentTime);
}

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return m + ':' + String(s).padStart(2, '0');
}

// ═══════════════════════════════════════════════
// PROGRESS BAR SEEKING
// ═══════════════════════════════════════════════
function seekFromEvent(e) {
  const rect = progressWrapper.querySelector('.progress-bar').getBoundingClientRect();
  const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
  const pct = Math.max(0, Math.min(1, x / rect.width));
  audio.currentTime = pct * audio.duration;
}

let isSeeking = false;

progressWrapper.addEventListener('mousedown', (e) => {
  isSeeking = true;
  seekFromEvent(e);
});

progressWrapper.addEventListener('touchstart', (e) => {
  isSeeking = true;
  seekFromEvent(e);
}, { passive: true });

window.addEventListener('mousemove', (e) => {
  if (isSeeking) seekFromEvent(e);
});

window.addEventListener('touchmove', (e) => {
  if (isSeeking) seekFromEvent(e);
}, { passive: true });

window.addEventListener('mouseup', () => { isSeeking = false; });
window.addEventListener('touchend', () => { isSeeking = false; });

// ═══════════════════════════════════════════════
// SKIP CONTROLS
// ═══════════════════════════════════════════════
prevBtn.addEventListener('click', () => {
  audio.currentTime = Math.max(0, audio.currentTime - 10);
});

nextBtn.addEventListener('click', () => {
  audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + 10);
});

// ═══════════════════════════════════════════════
// START BUTTON — TRANSITION TO PLAYER
// ═══════════════════════════════════════════════
startBtn.addEventListener('click', () => {
  // Exit intro
  introScreen.classList.add('exiting');
  introScreen.classList.remove('active');

  // Enter player
  setTimeout(() => {
    playerScreen.classList.add('active', 'entering');
    // Start playback
    audio.play().then(() => {
      isPlaying = true;
      iconPlay.style.display = 'none';
      iconPause.style.display = 'block';
    }).catch(() => {
      // autoplay blocked — user will need to hit play
    });
  }, 400);
});

// ═══════════════════════════════════════════════
// PLAY/PAUSE BUTTON
// ═══════════════════════════════════════════════
playPauseBtn.addEventListener('click', togglePlay);

// ═══════════════════════════════════════════════
// AUDIO EVENTS
// ═══════════════════════════════════════════════
audio.addEventListener('timeupdate', () => {
  syncLyrics();
  updateProgress();
});

audio.addEventListener('loadedmetadata', () => {
  totalTimeEl.textContent = formatTime(audio.duration);
});

audio.addEventListener('ended', () => {
  isPlaying = false;
  iconPlay.style.display = 'block';
  iconPause.style.display = 'none';
  document.querySelector('.player-wrapper').classList.add('paused');
});

// ═══════════════════════════════════════════════
// KEYBOARD SHORTCUTS
// ═══════════════════════════════════════════════
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    e.preventDefault();
    if (playerScreen.classList.contains('active')) {
      togglePlay();
    } else {
      startBtn.click();
    }
  }
  if (e.code === 'ArrowLeft') {
    audio.currentTime = Math.max(0, audio.currentTime - 5);
  }
  if (e.code === 'ArrowRight') {
    audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + 5);
  }
});

// ═══════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════
window.addEventListener('DOMContentLoaded', () => {
  renderLyrics();
  animateIntro();
});
