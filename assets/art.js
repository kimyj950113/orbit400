// 팀별 재킷 아트 (Canvas 2D). kind: flame | burst | planet | dawn
const TAU = Math.PI * 2;

function star(ctx, x, y, r, points = 5, inner = 0.45) {
  ctx.beginPath();
  for (let i = 0; i < points * 2; i++) {
    const a = (i * Math.PI) / points - Math.PI / 2;
    const rr = i % 2 ? r * inner : r;
    ctx.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr);
  }
  ctx.closePath();
  ctx.fill();
}

function rng(seed) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

const painters = {
  flame(ctx, w, h, t) {
    const g = ctx.createLinearGradient(0, h, 0, 0);
    g.addColorStop(0, '#ffd60a'); g.addColorStop(0.45, '#ff4a1c'); g.addColorStop(1, '#b3001e');
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    // halftone
    ctx.fillStyle = 'rgba(20,19,28,.18)';
    for (let y = 0; y < h; y += 12) for (let x = (y / 12) % 2 ? 6 : 0; x < w; x += 12) {
      const r = 3.6 * (y / h); if (r > .3) { ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); }
    }
    const layers = [['#14131c', .92, 0], ['#ff2d46', .78, 1.3], ['#ffd60a', .6, 2.1], ['#fff7d6', .38, 3.4]];
    for (const [col, hh, ph] of layers) {
      ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(0, h);
      const n = 7;
      for (let i = 0; i <= n * 2; i++) {
        const x = (i / (n * 2)) * w;
        const tip = i % 2 === 1;
        const wob = Math.sin(t / 420 + i * 1.7 + ph) * h * .05;
        const y = tip ? h - h * hh - wob - Math.sin(i * 2.3 + ph) * h * .08 : h - h * hh * .35 + wob * .4;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(w, h); ctx.closePath(); ctx.fill();
    }
    // speed lines
    ctx.strokeStyle = 'rgba(255,247,214,.55)'; ctx.lineWidth = 2;
    const r = rng(7);
    for (let i = 0; i < 14; i++) {
      const x = r() * w, len = 30 + r() * 80, y = ((r() * h - t / 6 * (0.5 + r())) % h + h) % h;
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + len); ctx.stroke();
    }
  },

  burst(ctx, w, h, t) {
    const cx = w * .5, cy = h * .52, R = Math.hypot(w, h);
    ctx.fillStyle = '#ff3fa4'; ctx.fillRect(0, 0, w, h);
    const n = 24, rot = t / 9000;
    for (let i = 0; i < n; i++) {
      ctx.fillStyle = i % 2 ? '#ff78c0' : '#ffd60a';
      if (i % 2 === 0 && i % 4 !== 0) ctx.fillStyle = '#ffffff';
      ctx.beginPath(); ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, R, rot + (i / n) * TAU, rot + ((i + 1) / n) * TAU); ctx.closePath(); ctx.fill();
    }
    ctx.fillStyle = '#14131c'; ctx.beginPath(); ctx.arc(cx, cy, w * .2 + 6, 0, TAU); ctx.fill();
    ctx.fillStyle = '#ff3fa4'; ctx.beginPath(); ctx.arc(cx, cy, w * .2, 0, TAU); ctx.fill();
    const r = rng(11);
    for (let i = 0; i < 16; i++) {
      const x = r() * w, y = r() * h, s = 6 + r() * 16, tw = .6 + .4 * Math.sin(t / 300 + i);
      ctx.fillStyle = i % 3 ? '#ffffff' : '#14131c';
      star(ctx, x, y, s * tw, 4, .3);
    }
    ctx.fillStyle = '#ffd60a';
    star(ctx, cx, cy, w * .12 * (1 + .06 * Math.sin(t / 250)), 5, .45);
  },

  planet(ctx, w, h, t) {
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, '#12062e'); g.addColorStop(.6, '#3b1599'); g.addColorStop(1, '#7a46ff');
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    const r = rng(23);
    for (let i = 0; i < 90; i++) {
      ctx.globalAlpha = .3 + .7 * Math.abs(Math.sin(t / 700 + i));
      ctx.fillStyle = '#fff'; ctx.fillRect(r() * w, r() * h * .7, 1.6, 1.6);
    }
    ctx.globalAlpha = 1;
    // grid horizon
    const hy = h * .74;
    ctx.strokeStyle = 'rgba(255,214,10,.75)'; ctx.lineWidth = 1.4;
    for (let i = -12; i <= 12; i++) { ctx.beginPath(); ctx.moveTo(w / 2 + i * 8, hy); ctx.lineTo(w / 2 + i * w * .16, h); ctx.stroke(); }
    const off = (t / 40) % 1;
    for (let k = 0; k < 9; k++) {
      const p = (k + off) / 9, y = hy + (h - hy) * p * p;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }
    // planet + ring
    const px = w * .58, py = h * .38, pr = w * .22, tilt = -.35;
    ctx.save(); ctx.translate(px, py); ctx.rotate(tilt);
    ctx.strokeStyle = '#ffd60a'; ctx.lineWidth = 5;
    ctx.beginPath(); ctx.ellipse(0, 0, pr * 1.8, pr * .42, 0, Math.PI, TAU); ctx.stroke();
    const pg = ctx.createRadialGradient(-pr * .4, -pr * .4, pr * .1, 0, 0, pr);
    pg.addColorStop(0, '#ffb3e0'); pg.addColorStop(.6, '#ff3fa4'); pg.addColorStop(1, '#5a1a8a');
    ctx.fillStyle = pg; ctx.beginPath(); ctx.arc(0, 0, pr, 0, TAU); ctx.fill();
    ctx.strokeStyle = '#ffd60a'; ctx.beginPath(); ctx.ellipse(0, 0, pr * 1.8, pr * .42, 0, 0, Math.PI); ctx.stroke();
    ctx.restore();
    // kaiju eye blinking satellite
    const ex = w * .2, ey = h * .25 + Math.sin(t / 900) * 6;
    ctx.fillStyle = '#ffd60a'; ctx.beginPath(); ctx.ellipse(ex, ey, 22, 12 * Math.abs(Math.cos(t / 1400)) + 1, 0, 0, TAU); ctx.fill();
    ctx.fillStyle = '#14131c'; ctx.beginPath(); ctx.ellipse(ex, ey, 4, 10 * Math.abs(Math.cos(t / 1400)) + .5, 0, 0, TAU); ctx.fill();
  },

  dawn(ctx, w, h, t) {
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, '#04103d'); g.addColorStop(.5, '#0f86ff'); g.addColorStop(.78, '#7fd0ff'); g.addColorStop(1, '#ffe7a3');
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    const sx = w * .5, sy = h * .66 - Math.sin(t / 3000) * 6, sr = w * .3;
    // halftone sun
    for (let y = sy - sr; y < sy + sr; y += 9) for (let x = sx - sr; x < sx + sr; x += 9) {
      const d = Math.hypot(x - sx, y - sy) / sr; if (d > 1) continue;
      ctx.fillStyle = y < sy ? '#ffd60a' : '#ff8a3d';
      ctx.beginPath(); ctx.arc(x, y, 4.2 * (1 - d * .55), 0, TAU); ctx.fill();
    }
    // stripes cutting the sun
    ctx.fillStyle = '#0f86ff';
    for (let i = 0; i < 6; i++) { const y = sy + i * i * 3 + 6; ctx.fillRect(sx - sr, y, sr * 2, 2 + i * 1.3); }
    // sea
    ctx.fillStyle = '#04103d'; ctx.fillRect(0, h * .8, w, h * .2);
    ctx.strokeStyle = 'rgba(255,214,10,.8)'; ctx.lineWidth = 2;
    for (let i = 0; i < 7; i++) {
      const y = h * .83 + i * 7, l = w * (.4 - i * .045), o = Math.sin(t / 600 + i) * 8;
      ctx.beginPath(); ctx.moveTo(sx - l / 2 + o, y); ctx.lineTo(sx + l / 2 + o, y); ctx.stroke();
    }
    const r = rng(41);
    ctx.fillStyle = '#fff';
    for (let i = 0; i < 40; i++) { ctx.globalAlpha = .2 + .6 * Math.abs(Math.sin(t / 800 + i)); ctx.fillRect(r() * w, r() * h * .35, 1.5, 1.5); }
    ctx.globalAlpha = 1;
  },
};

export function mountArt(canvas, kind) {
  const ctx = canvas.getContext('2d');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let w = 0, h = 0, visible = false, raf = 0;
  const dpr = Math.min(devicePixelRatio || 1, 2);
  function resize() {
    w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = Math.max(1, w * dpr); canvas.height = Math.max(1, h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    painters[kind](ctx, w, h, 1200);
  }
  function loop(t) { painters[kind](ctx, w, h, t); if (visible && !reduce) raf = requestAnimationFrame(loop); }
  new ResizeObserver(resize).observe(canvas);
  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting; cancelAnimationFrame(raf);
    if (visible && !reduce) raf = requestAnimationFrame(loop);
  }).observe(canvas);
  resize();
}
