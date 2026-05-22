// Analyze MP3 audio levels to detect song structure
const fs = require('fs');
const path = require('path');

// We'll decode the MP3 using Node's built-in capabilities
// Since we don't have web-audio-api, let's parse the raw file size + use a simple approach

// Actually, let's use a different approach: read the file and output basic info
// Then use the HTML-based analyzer

const filePath = path.join(__dirname, 'track.mp3');
const stats = fs.statSync(filePath);
const fileSizeBytes = stats.size;

// Estimate bitrate (common MP3 bitrates)
// File is 4,273,022 bytes = ~4.07 MB
// Duration is 177 seconds
const duration = 177;
const bitrate = Math.round((fileSizeBytes * 8) / duration / 1000);

console.log(`File: track.mp3`);
console.log(`Size: ${(fileSizeBytes / 1024 / 1024).toFixed(2)} MB`);
console.log(`Duration: ${duration}s (2:57)`);
console.log(`Est. Bitrate: ${bitrate} kbps`);
console.log(`\nCreating browser-based audio analyzer...`);

// Generate an HTML file that uses Web Audio API to analyze the actual audio
const analyzerHTML = `<!DOCTYPE html>
<html><head><title>Audio Analyzer</title>
<style>
  body { font-family: monospace; background: #111; color: #0f0; padding: 20px; font-size: 13px; }
  pre { white-space: pre-wrap; }
  canvas { width: 100%; height: 200px; background: #000; border: 1px solid #333; margin: 10px 0; }
  button { padding: 10px 20px; font-size: 14px; cursor: pointer; margin: 5px; }
</style>
</head><body>
<h2>Audio Waveform Analyzer</h2>
<p>This analyzes the MP3 to find where vocals/beats start and where breaks are.</p>
<button id="go">ANALYZE TRACK</button>
<canvas id="waveform"></canvas>
<pre id="output">Click ANALYZE to start...</pre>
<script>
document.getElementById('go').onclick = async () => {
  const out = document.getElementById('output');
  out.textContent = 'Loading audio...';

  const resp = await fetch('track.mp3');
  const buf = await resp.arrayBuffer();
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const audio = await ctx.decodeAudioData(buf);

  const data = audio.getChannelData(0); // mono channel
  const sr = audio.sampleRate;
  const duration = audio.duration;
  out.textContent = 'Duration: ' + duration.toFixed(2) + 's | Sample Rate: ' + sr + '\\n\\n';

  // Compute RMS energy per 0.5-second window
  const windowSec = 0.5;
  const windowSamples = Math.floor(sr * windowSec);
  const segments = [];

  for (let i = 0; i < data.length; i += windowSamples) {
    let sum = 0;
    const end = Math.min(i + windowSamples, data.length);
    for (let j = i; j < end; j++) {
      sum += data[j] * data[j];
    }
    const rms = Math.sqrt(sum / (end - i));
    segments.push({ time: (i / sr), rms });
  }

  // Find max RMS for normalization
  const maxRms = Math.max(...segments.map(s => s.rms));

  // Draw waveform
  const canvas = document.getElementById('waveform');
  canvas.width = canvas.offsetWidth * 2;
  canvas.height = 400;
  const cctx = canvas.getContext('2d');
  const barW = canvas.width / segments.length;

  for (let i = 0; i < segments.length; i++) {
    const h = (segments[i].rms / maxRms) * canvas.height;
    const bright = segments[i].rms / maxRms;
    cctx.fillStyle = bright < 0.15 ? '#333' : bright < 0.4 ? '#0a0' : '#0f0';
    cctx.fillRect(i * barW, canvas.height - h, barW - 1, h);
  }

  // Detect structure: find quiet zones (< 15% of max) and loud zones
  const threshold = maxRms * 0.15;
  let results = 'ENERGY ANALYSIS (per 0.5s window):\\n';
  results += '================================\\n\\n';

  // Find first loud moment (where music really starts)
  let firstLoud = 0;
  for (const s of segments) {
    if (s.rms > maxRms * 0.25) { firstLoud = s.time; break; }
  }
  results += '⏵ First significant sound at: ' + firstLoud.toFixed(1) + 's\\n\\n';

  // Find quiet zones (potential instrumental breaks)
  results += 'QUIET ZONES (potential breaks):\\n';
  let inQuiet = false;
  let quietStart = 0;
  for (const s of segments) {
    if (s.rms < threshold && !inQuiet) {
      inQuiet = true;
      quietStart = s.time;
    } else if (s.rms >= threshold && inQuiet) {
      inQuiet = false;
      if (s.time - quietStart > 1.5) {
        results += '  Quiet: ' + quietStart.toFixed(1) + 's - ' + s.time.toFixed(1) + 's (' + (s.time - quietStart).toFixed(1) + 's)\\n';
      }
    }
  }
  results += '\\n';

  // Detect "energy sections" - contiguous loud areas
  results += 'LOUD SECTIONS (vocal/instrument sections):\\n';
  let inLoud = false;
  let loudStart = 0;
  let sectionNum = 1;
  for (const s of segments) {
    if (s.rms >= threshold && !inLoud) {
      inLoud = true;
      loudStart = s.time;
    } else if (s.rms < threshold && inLoud) {
      inLoud = false;
      if (s.time - loudStart > 2) {
        results += '  Section ' + sectionNum + ': ' + loudStart.toFixed(1) + 's - ' + s.time.toFixed(1) + 's (' + (s.time - loudStart).toFixed(1) + 's)\\n';
        sectionNum++;
      }
    }
  }
  if (inLoud) {
    results += '  Section ' + sectionNum + ': ' + loudStart.toFixed(1) + 's - ' + duration.toFixed(1) + 's (' + (duration - loudStart).toFixed(1) + 's)\\n';
  }

  results += '\\n';
  results += 'FULL TIMELINE (1s intervals, ▓=loud ░=quiet):\\n';
  for (let t = 0; t < duration; t += 1) {
    const seg = segments.find(s => s.time >= t && s.time < t + 1) || segments[segments.length-1];
    const level = seg.rms / maxRms;
    const bar = level > 0.4 ? '▓▓▓' : level > 0.15 ? '▒▒▒' : '░░░';
    const timeStr = Math.floor(t/60) + ':' + String(Math.floor(t%60)).padStart(2,'0');
    results += timeStr + ' ' + bar + ' ' + (level * 100).toFixed(0).padStart(3) + '%\\n';
  }

  out.textContent = results;
};
</script>
</body></html>`;

fs.writeFileSync(path.join(__dirname, 'analyze.html'), analyzerHTML);
console.log('Created analyze.html - open http://localhost:50263/analyze.html in browser');
console.log('Click ANALYZE to see the full audio energy profile');
