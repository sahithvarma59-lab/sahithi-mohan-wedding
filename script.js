/* ==========================================================================
   Sahithi & Mohan Varma — Cinematic Luxury Wedding Invitation
   script.js
   
   Handles:
   1. Envelope opening animation (seal breaks, flap rotates 3D, card slides up)
   2. Floating gold particles (canvas)
   3. Envelope tilt on pointer move
   4. Live countdown to 23 December 2026, 8:00 PM IST (Asia/Kolkata / +05:30)
   5. Optional background music (Web Audio API — no external file)
   6. WhatsApp sharing (uses current page URL)
   7. Copy invitation link to clipboard (with graceful fallback)
   8. Replay invitation
   ========================================================================== */

(function () {
  'use strict';

  /* ------------------------------------------------------------------ */
  /*  DOM elements                                                      */
  /* ------------------------------------------------------------------ */
  const openingScreen = document.getElementById('opening-screen');
  const invitationScreen = document.getElementById('invitation-screen');
  const envelope = document.getElementById('envelope');
  const envelopeContainer = document.getElementById('envelope-container');
  const waxSeal = document.getElementById('wax-seal');
  const waxSealWrapper = document.getElementById('wax-seal-wrapper');
  const invitationCard = document.getElementById('invitation-card');
  const inviteCard = document.getElementById('invite-card');
  const replayBtn = document.getElementById('replay-btn');
  const musicBtn = document.getElementById('music-btn');
  const whatsappBtn = document.getElementById('whatsapp-btn');
  const copyBtn = document.getElementById('copy-btn');
  const copyFeedback = document.getElementById('copy-feedback');
  const instruction = document.getElementById('instruction');

  /* Countdown elements */
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  const countdownMessage = document.getElementById('countdown-message');

  /* ------------------------------------------------------------------ */
  /*  Configuration                                                     */
  /* ------------------------------------------------------------------ */
  // Wedding: Wednesday, 23 December 2026 at 20:00 IST (Asia/Kolkata = +05:30)
  const WEDDING_IST = '2026-12-23T20:00:00+05:30';
  const TARGET_DATE = new Date(WEDDING_IST);

  let isOpening = false;
  let countdownTimer = null;
  let particlesAnimationId = null;
  let mouseMoveId = null;

  /* ------------------------------------------------------------------ */
  /*  Helpers                                                           */
  /* ------------------------------------------------------------------ */

  function pad(n) {
    return String(Math.max(0, Math.floor(n))).padStart(2, '0');
  }

  function showInvitation() {
    openingScreen.classList.remove('active');
    invitationScreen.classList.add('active');
    invitationScreen.setAttribute('aria-hidden', 'false');
    openingScreen.setAttribute('aria-hidden', 'true');

    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Start particles on invitation screen
    initParticles('invitation-particles');

    startCountdown();
  }

  function resetToEnvelope() {
    invitationScreen.classList.remove('active');
    openingScreen.classList.add('active');
    openingScreen.setAttribute('aria-hidden', 'false');
    invitationScreen.setAttribute('aria-hidden', 'true');

    // Reset envelope state
    envelope.classList.remove('opened');
    waxSeal.classList.remove('hidden');
    waxSeal.style.opacity = '1';
    waxSeal.style.transform = 'translate(-50%, -50%) scale(1) rotate(0deg)';
    waxSeal.style.transition = 'transform 0.4s ease, opacity 0.4s ease';

    invitationCard.style.transform = 'translate(-50%, 70%)';
    invitationCard.style.opacity = '0';
    invitationCard.style.pointerEvents = 'none';

    if (musicBtn.classList.contains('on')) {
      window.musicSynth.stop();
      musicBtn.textContent = 'Music: Off';
      musicBtn.classList.remove('on');
    }

    if (countdownTimer) {
      clearInterval(countdownTimer);
      countdownTimer = null;
    }
    countdownMessage.textContent = '';
    [daysEl, hoursEl, minutesEl, secondsEl].forEach((el) => {
      el.textContent = '00';
    });

    isOpening = false;
    instruction.style.opacity = '1';
    instruction.style.pointerEvents = 'auto';

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ------------------------------------------------------------------ */
  /*  Envelope opening animation                                        */
  /* ------------------------------------------------------------------ */
  function openEnvelope() {
    if (isOpening) return;
    isOpening = true;

    // Hide instruction
    instruction.style.opacity = '0';
    instruction.style.pointerEvents = 'none';

    // 1 & 2. Seal breaks / dissolves
    waxSeal.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.5s ease';
    waxSeal.style.transform = 'translate(-50%, -50%) scale(1.3) rotate(-20deg)';
    waxSeal.style.opacity = '0';

    setTimeout(() => {
      waxSeal.classList.add('hidden');
    }, 500);

    // 3. Flap rotates backward in 3D
    setTimeout(() => {
      envelope.classList.add('opened');
    }, 600);

    // 4 & 5. Card slides up out of envelope
    setTimeout(() => {
      invitationCard.style.transition = 'transform 1s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.8s ease';
      invitationCard.style.transform = 'translate(-50%, -10%)';
      invitationCard.style.opacity = '1';
      invitationCard.style.pointerEvents = 'auto';
    }, 1100);

    // 6 & 7 & 8. Reveal full invitation
    setTimeout(() => {
      showInvitation();
    }, 1800);
  }

  /* Clicking envelope or wax seal opens it */
  envelopeContainer.addEventListener('click', openEnvelope);
  waxSealWrapper.addEventListener('click', (e) => {
    e.stopPropagation();
    openEnvelope();
  });
  envelopeContainer.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openEnvelope();
    }
  });

  /* Replay */
  replayBtn.addEventListener('click', resetToEnvelope);

  /* ------------------------------------------------------------------ */
  /*  Envelope tilt on pointer / device move                            */
  /* ------------------------------------------------------------------ */
  function handlePointerMove(e) {
    const rect = envelopeContainer.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const clientX = e.clientX !== undefined ? e.clientX : e.touches[0].clientX;
    const clientY = e.clientY !== undefined ? e.clientY : e.touches[0].clientY;

    const rotateY = ((clientX - centerX) / (rect.width / 2)) * 8;  // max 8deg
    const rotateX = -((clientY - centerY) / (rect.height / 2)) * 6; // max 6deg

    envelopeContainer.style.setProperty('--rotateX', rotateX + 'deg');
    envelopeContainer.style.setProperty('--rotateY', rotateY + 'deg');
    envelopeContainer.classList.add('tilted');
  }

  function resetTilt() {
    envelopeContainer.style.removeProperty('--rotateX');
    envelopeContainer.style.removeProperty('--rotateY');
    envelopeContainer.classList.remove('tilted');
  }

  envelopeContainer.addEventListener('mousemove', (e) => {
    cancelAnimationFrame(mouseMoveId);
    mouseMoveId = requestAnimationFrame(() => handlePointerMove(e));
  });
  envelopeContainer.addEventListener('mouseleave', resetTilt);
  envelopeContainer.addEventListener('touchmove', (e) => {
    cancelAnimationFrame(mouseMoveId);
    mouseMoveId = requestAnimationFrame(() => handlePointerMove(e));
  }, { passive: true });
  envelopeContainer.addEventListener('touchend', resetTilt);

  /* ------------------------------------------------------------------ */
  /*  Floating gold particles (canvas)                                  */
  /* ------------------------------------------------------------------ */
  function initParticles(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    function resize() {
      width = canvas.width = canvas.parentElement ? canvas.parentElement.offsetWidth : window.innerWidth;
      height = canvas.height = canvas.parentElement ? canvas.parentElement.offsetHeight : window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const particleCount = window.innerWidth < 768 ? 35 : 60;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        delay: Math.random() * 100
      });
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      const time = Date.now() * 0.001;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.opacity += Math.sin(time + p.delay) * 0.01;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = '#B49358';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      particlesAnimationId = requestAnimationFrame(animate);
    }

    animate();
    return () => {
      cancelAnimationFrame(particlesAnimationId);
    };
  }

  /* ------------------------------------------------------------------ */
  /*  Live countdown                                                    */
  /* ------------------------------------------------------------------ */
  function startCountdown() {
    function update() {
      const now = new Date();
      const diffMs = TARGET_DATE - now;

      if (diffMs > 0) {
        const totalSeconds = Math.floor(diffMs / 1000);
        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor((totalSeconds % 86400) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        daysEl.textContent = pad(days);
        hoursEl.textContent = pad(hours);
        minutesEl.textContent = pad(minutes);
        secondsEl.textContent = pad(seconds);

        countdownMessage.textContent = '';
        countdownMessage.classList.remove('past');
        return;
      }

      const diffHours = diffMs / (1000 * 60 * 60);
      if (diffMs <= 0 && diffHours > -24) {
        [daysEl, hoursEl, minutesEl, secondsEl].forEach((el) => {
          el.textContent = '--';
        });
        countdownMessage.textContent =
          "Today is the day! Let love, laughter, and beautiful memories begin.";
        countdownMessage.classList.add('past');
        clearInterval(countdownTimer);
        countdownTimer = null;
        return;
      }

      [daysEl, hoursEl, minutesEl, secondsEl].forEach((el) => {
        el.textContent = '--';
      });
      countdownMessage.textContent =
        "Thank you for being part of our story. The celebration continues in our hearts.";
      countdownMessage.classList.add('past');
      clearInterval(countdownTimer);
      countdownTimer = null;
    }

    update();
    countdownTimer = setInterval(update, 1000);
  }

  /* ------------------------------------------------------------------ */
  /*  Background music (Web Audio API — no external file)              */
  /* ------------------------------------------------------------------ */
  window.musicSynth = (function () {
    let ctx = null;
    let masterGain = null;
    let padOsc = null;
    let padGain = null;
    let melodyGain = null;
    let melodyTimeouts = [];
    let playing = false;

    function initContext() {
      if (ctx) return ctx;
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return null;
      ctx = new AudioContext();
      return ctx;
    }

    function start() {
      if (playing) return;
      const audioCtx = initContext();
      if (!audioCtx) {
        musicBtn.textContent = 'Music: Off';
        musicBtn.classList.remove('on');
        return;
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      masterGain = audioCtx.createGain();
      masterGain.gain.value = 0.5;
      masterGain.connect(audioCtx.destination);

      padOsc = audioCtx.createOscillator();
      padOsc.type = 'triangle';
      padOsc.frequency.setValueAtTime(164.81, audioCtx.currentTime);
      padGain = audioCtx.createGain();
      padGain.gain.setValueAtTime(0, audioCtx.currentTime);
      padGain.gain.linearRampToValueAtTime(0.06, audioCtx.currentTime + 2);
      padOsc.connect(padGain);
      padGain.connect(masterGain);
      padOsc.start();

      melodyGain = audioCtx.createGain();
      melodyGain.gain.value = 0.3;
      melodyGain.connect(masterGain);

      const now = audioCtx.currentTime;
      const notes = [
        { f: 261.63, t: now + 0.0, d: 0.9 },
        { f: 329.63, t: now + 0.9, d: 0.9 },
        { f: 392.00, t: now + 1.8, d: 1.2 },
        { f: 349.23, t: now + 3.0, d: 1.2 },
        { f: 293.66, t: now + 4.2, d: 1.5 },
        { f: 261.63, t: now + 5.7, d: 1.5 },
      ];

      notes.forEach((note) => {
        const osc = audioCtx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(note.f, note.t);
        const g = audioCtx.createGain();
        g.gain.setValueAtTime(0, note.t);
        g.gain.linearRampToValueAtTime(0.25, note.t + 0.1);
        g.gain.linearRampToValueAtTime(0, note.t + note.d);
        osc.connect(g);
        g.connect(melodyGain);
        osc.start(note.t);
        osc.stop(note.t + note.d);
        melodyTimeouts.push(setTimeout(() => {
          try { osc.disconnect(); } catch (e) { /* ignore */ }
        }, (note.t + note.d + 1) * 1000));
      });

      const loop = () => {
        if (!playing) return;
        const next = audioCtx.currentTime + 7.2;
        notes.forEach((note) => {
          const osc = audioCtx.createOscillator();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(note.f, next + note.t - now);
          const g = audioCtx.createGain();
          g.gain.setValueAtTime(0, next + note.t - now);
          g.gain.linearRampToValueAtTime(0.18, next + note.t - now + 0.1);
          g.gain.linearRampToValueAtTime(0, next + note.t - now + note.d);
          osc.connect(g);
          g.connect(melodyGain);
          osc.start(next + note.t - now);
          osc.stop(next + note.t - now + note.d);
          melodyTimeouts.push(setTimeout(() => {
            try { osc.disconnect(); } catch (e) { /* ignore */ }
          }, (next + note.t - now + note.d + 1) * 1000));
        });
        melodyTimeouts.push(setTimeout(loop, 7200));
      };
      melodyTimeouts.push(setTimeout(loop, 7200));

      playing = true;
      musicBtn.textContent = 'Music: On';
      musicBtn.classList.add('on');
    }

    function stop() {
      if (!playing) return;
      playing = false;
      melodyTimeouts.forEach((t) => clearTimeout(t));
      melodyTimeouts = [];

      if (padGain) {
        padGain.gain.linearRampToValueAtTime(0, (ctx && ctx.currentTime) || 0 + 1);
      }
      setTimeout(() => {
        try {
          if (padOsc) padOsc.stop();
        } catch (e) { /* ignore */ }
        if (ctx && ctx.state !== 'closed') {
          ctx.close().catch(() => { /* ignore */ });
        }
        ctx = null;
        padOsc = null;
        padGain = null;
        masterGain = null;
        melodyGain = null;
      }, 1100);

      musicBtn.textContent = 'Music: Off';
      musicBtn.classList.remove('on');
    }

    return { toggle: () => { if (playing) stop(); else start(); } };
  })();

  musicBtn.addEventListener('click', () => {
    window.musicSynth.toggle();
  });

  /* ------------------------------------------------------------------ */
  /*  WhatsApp sharing                                                  */
  /* ------------------------------------------------------------------ */
  whatsappBtn.addEventListener('click', () => {
    const url = window.location.href;
    const message = encodeURIComponent(
      "Sahithi & Mohan Varma invite you to celebrate their wedding on 23 December 2026 at 8:00 PM IST.\n\n" +
      "Open our wedding invitation:\n" + url
    );
    const whatsappUrl = 'https://wa.me/?text=' + message;

    try {
      window.open(whatsappUrl, '_blank');
    } catch (err) {
      window.location.href = whatsappUrl;
    }
  });

  /* ------------------------------------------------------------------ */
  /*  Copy invitation link                                              */
  /* ------------------------------------------------------------------ */
  copyBtn.addEventListener('click', async () => {
    const url = window.location.href;
    let success = false;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(url);
        success = true;
      } catch (err) {
        success = false;
      }
    }

    if (!success) {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = url;
        textarea.setAttribute('readonly', true);
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        textarea.setSelectionRange(0, textarea.value.length);
        const copied = document.execCommand('copy');
        document.body.removeChild(textarea);
        success = copied;
      } catch (err) {
        success = false;
      }
    }

    if (success) {
      copyFeedback.textContent = 'Link copied!';
      setTimeout(() => {
        copyFeedback.textContent = '';
      }, 2200);
    } else {
      copyFeedback.textContent = 'Could not copy link. Please copy the URL manually.';
      copyFeedback.style.color = '#a34a5e';
      setTimeout(() => {
        copyFeedback.textContent = '';
        copyFeedback.style.color = '';
      }, 2200);
    }
  });

  /* ------------------------------------------------------------------ */
  /*  Initialization                                                    */
  /* ------------------------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', () => {
    openingScreen.classList.add('active');
    invitationScreen.classList.remove('active');
    invitationScreen.setAttribute('aria-hidden', 'true');
    openingScreen.setAttribute('aria-hidden', 'false');

    // Start particles on opening screen
    initParticles('particles');
  });

})();
