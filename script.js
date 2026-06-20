document.addEventListener('DOMContentLoaded', () => {
  const PUBLIC_KEY = '-VEb7e6o3KqCUicfo';
  const SERVICE_ID = 'service_8ul2w9w';
  const TEMPLATE_ID = 'template_huzfx28';

  const currentTheme = localStorage.getItem('theme') || 'dark';
  const currentLang = localStorage.getItem('lang') || 'en';

  document.documentElement.setAttribute('data-theme', currentTheme);
  document.documentElement.setAttribute('data-lang', currentLang);

  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const targetTheme = activeTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', targetTheme);
      localStorage.setItem('theme', targetTheme);
    });
  }

  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      const activeLang = document.documentElement.getAttribute('data-lang');
      const targetLang = activeLang === 'en' ? 'si' : 'en';
      document.documentElement.setAttribute('data-lang', targetLang);
      localStorage.setItem('lang', targetLang);
      filterAdvisories();
    });
  }

  const mobileToggle = document.getElementById('mobileNavToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  const navLinks = [...document.querySelectorAll('.menu a')];
  const sections = navLinks
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  function setActiveNav() {
    const scrollY = window.scrollY + 140;
    let current = sections[0];

    sections.forEach(sec => {
      if (sec.offsetTop <= scrollY) {
        current = sec;
      }
    });

    if (current) {
      navLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + current.id);
      });
    }
  }

  window.addEventListener('scroll', () => {
    setActiveNav();
    const doc = document.documentElement;
    const scrollTop = window.scrollY || doc.scrollTop || 0;
    const scrollHeight = doc.scrollHeight - doc.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    const bar = document.getElementById('progressBar');
    if (bar) {
      bar.style.width = Math.min(Math.max(progress, 0), 100) + '%';
    }
  });

  setActiveNav();

  const typingText = document.getElementById('typingText');
  const heroLines = [
    'Stay safe online with our trusted school cybersecurity hub',
    'Protect student accounts with smart awareness and reporting',
    'Detect threats early, act securely, and learn cyber resilience'
  ];
  let currentLine = 0;
  let currentChar = 0;

  function typeHeroText() {
    if (!typingText) return;
    const line = heroLines[currentLine];
    typingText.textContent = line.slice(0, currentChar);
    typingText.classList.add('typing-cursor');

    if (currentChar < line.length) {
      currentChar += 1;
      setTimeout(typeHeroText, 55);
    } else {
      setTimeout(() => {
        currentChar = 0;
        currentLine = (currentLine + 1) % heroLines.length;
        typeHeroText();
      }, 1800);
    }
  }

  typeHeroText();

  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas ? canvas.getContext('2d') : null;
  const particles = [];
  const particleCount = 80;

  function resizeCanvas() {
    if (!canvas || !ctx) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function createParticles() {
    particles.length = 0;
    const width = window.innerWidth;
    const height = window.innerHeight;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.5 + 1,
        speed: Math.random() * 0.5 + 0.2,
        drift: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.5 + 0.1
      });
    }
  }

  function drawParticles() {
    if (!ctx || !canvas) return;
    const width = window.innerWidth;
    const height = window.innerHeight;
    ctx.clearRect(0, 0, width, height);

    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const particleColor = isLight ? '2, 132, 199' : '0, 229, 255';

    particles.forEach(p => {
      p.y -= p.speed;
      p.x += p.drift;
      if (p.y < -5) p.y = height + 5;
      if (p.x < -5) p.x = width + 5;
      if (p.x > width + 5) p.x = -5;
      ctx.beginPath();
      ctx.fillStyle = `rgba(${particleColor}, ${p.alpha})`;
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(drawParticles);
  }

  if (canvas && ctx) {
    resizeCanvas();
    createParticles();
    drawParticles();
    window.addEventListener('resize', () => {
      resizeCanvas();
      createParticles();
    });
  }

  const binaryCanvas = document.getElementById('binaryCanvas');
  const bCtx = binaryCanvas ? binaryCanvas.getContext('2d') : null;
  const binaryDrops = [];
  const binaryFontSize = 16;
  let binaryColumns = 0;

  function resizeBinaryCanvas() {
    if (!binaryCanvas || !bCtx) return;
    const dpr = window.devicePixelRatio || 1;
    binaryCanvas.width = window.innerWidth * dpr;
    binaryCanvas.height = window.innerHeight * dpr;
    bCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function createBinaryDrops() {
    binaryDrops.length = 0;
    const width = window.innerWidth;
    const height = window.innerHeight;
    binaryColumns = Math.max(8, Math.floor(width / 60));

    for (let i = 0; i < binaryColumns; i++) {
      binaryDrops.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: Math.random() * 0.6 + 0.25,
        alpha: Math.random() * 0.3 + 0.08,
        value: Math.random() > 0.5 ? '1' : '0',
        flipTimer: Math.random() * 200
      });
    }
  }

  function drawBinary() {
    if (!bCtx || !binaryCanvas) return;
    const width = window.innerWidth;
    const height = window.innerHeight;
    bCtx.clearRect(0, 0, width, height);

    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const binaryColor = isLight ? '79, 70, 229' : '108, 123, 255';

    bCtx.font = binaryFontSize + 'px monospace';

    binaryDrops.forEach(d => {
      d.y -= d.speed;
      d.flipTimer -= 1;
      if (d.flipTimer <= 0) {
        d.value = Math.random() > 0.5 ? '1' : '0';
        d.flipTimer = Math.random() * 200 + 60;
      }
      if (d.y < -binaryFontSize) {
        d.y = height + binaryFontSize;
        d.x = Math.random() * width;
      }
      bCtx.fillStyle = `rgba(${binaryColor}, ${d.alpha})`;
      bCtx.fillText(d.value, d.x, d.y);
    });

    requestAnimationFrame(drawBinary);
  }

  if (binaryCanvas && bCtx) {
    resizeBinaryCanvas();
    createBinaryDrops();
    drawBinary();
    window.addEventListener('resize', () => {
      resizeBinaryCanvas();
      createBinaryDrops();
    });
  }

  const newsSearch = document.getElementById('newsSearch');
  const filterBtns = [...document.querySelectorAll('.filter-btn')];
  const clearFiltersBtn = document.getElementById('clearFiltersBtn');
  const newsCount = document.getElementById('newsCount');
  const newsItems = [...document.querySelectorAll('.news-item')];
  let activeFilter = 'all';

  function updateItemCount() {
    const visibleItems = newsItems.filter(item => !item.classList.contains('hidden')).length;
    if (newsCount) {
      const activeLang = document.documentElement.getAttribute('data-lang');
      if (activeLang === 'si') {
        newsCount.textContent = 'අයිතම ' + visibleItems;
      } else {
        newsCount.textContent = visibleItems + ' item' + (visibleItems !== 1 ? 's' : '');
      }
    }
  }

  function filterAdvisories() {
    const query = newsSearch ? newsSearch.value.trim().toLowerCase() : '';
    const category = activeFilter;

    newsItems.forEach(item => {
      const text = item.innerText.toLowerCase();
      const itemCategory = item.dataset.category;

      const matchesQuery = !query || text.includes(query);
      const matchesCategory = category === 'all' || itemCategory === category;

      item.classList.toggle('hidden', !(matchesQuery && matchesCategory));
    });

    updateItemCount();
    if (clearFiltersBtn) {
      clearFiltersBtn.style.display = activeFilter !== 'all' || query ? 'inline-block' : 'none';
    }
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const filter = btn.dataset.filter;
      activeFilter = filter;

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      filterAdvisories();
    });
  });

  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener('click', () => {
      activeFilter = 'all';
      if (newsSearch) newsSearch.value = '';
      filterBtns.forEach(btn => btn.classList.remove('active'));
      filterBtns[0].classList.add('active');
      filterAdvisories();
    });
  }

  if (newsSearch) newsSearch.addEventListener('input', filterAdvisories);

  updateItemCount();

  const pwInput = document.getElementById('passwordInput');
  const meterBar = document.getElementById('meterBar');
  const pwHint = document.getElementById('passwordHint');

  if (pwInput && meterBar && pwHint) {
    pwInput.addEventListener('input', () => {
      const val = pwInput.value;
      const activeLang = document.documentElement.getAttribute('data-lang');
      let score = 0;

      if (!val) {
        meterBar.style.width = '0%';
        pwHint.textContent = activeLang === 'si' ? 
          'ආරක්ෂිත ප්‍රමිතිය: විවිධ අක්ෂර 12+ ක් හෝ අහඹු වචන 4+ ක් භාවිත කරන්න.' : 
          'Security standard: 12+ mixed characters or 4+ random words.';
        pwHint.style.color = 'var(--muted)';
        return;
      }

      if (val.length >= 12) score += 30;
      if (val.length >= 16) score += 10;
      if (/[a-z]/.test(val) && /[A-Z]/.test(val)) score += 20;
      if (/\d/.test(val)) score += 20;
      if (/[^A-Za-z0-9]/.test(val)) score += 20;

      meterBar.style.width = score + '%';

      if (score < 40) {
        pwHint.textContent = activeLang === 'si' ? 
          'දුර්වල මුරපදයකි. තවදුරටත් අක්ෂර වෙනස් කරන්න.' : 
          'Weak credentials. Enhance length and character variation.';
        pwHint.style.color = '#ff5c7c';
      } else if (score < 75) {
        pwHint.textContent = activeLang === 'si' ? 
          'මධ්‍යස්ථ මට්ටමේ ආරක්ෂාවකි. සංකේත හෝ වචන එක් කරන්න.' : 
          'Moderate security. Try substituting letters for symbols or adding words.';
        pwHint.style.color = '#ffd166';
      } else {
        pwHint.textContent = activeLang === 'si' ? 
          'ඉතා ශක්තිමත් මුරපදයකි. ප්‍රමිතීන්ට අනුකූල වේ.' : 
          'High entropy. Credential parameters meet safety guidelines.';
        pwHint.style.color = '#35d07f';
      }
    });
  }

  const quizBtn = document.getElementById('quizBtn');
  const quizResult = document.getElementById('quizResult');

  if (quizBtn && quizResult) {
    quizBtn.addEventListener('click', () => {
      const selection = document.querySelector('input[name="q1"]:checked');
      const activeLang = document.documentElement.getAttribute('data-lang');

      if (!selection) {
        quizResult.textContent = activeLang === 'si' ? 'කරුණාකර තක්සේරු කිරීමට පිළිතුරක් තෝරන්න.' : 'Please make a selection to evaluate.';
        return;
      }

      if (selection.value === 'right') {
        quizResult.innerHTML = activeLang === 'si' ? 
          `<span class="badge ok" style="margin-bottom:8px">නිවැරදියි</span><p style="margin: 4px 0 0">සැක සහිත සබැඳි (links) ක්ලික් නොකර කෙලින්ම පාසල් පද්ධතිය මඟින් තහවුරු කර ගැනීම නිවැරදි ප්‍රවේශයයි.</p>` :
          `<span class="badge ok" style="margin-bottom:8px">Correct</span><p style="margin: 4px 0 0">Verify directly using trusted paths instead of reacting to communication demands.</p>`;
      } else {
        quizResult.innerHTML = activeLang === 'si' ? 
          `<span class="badge danger" style="margin-bottom:8px">අවදානම් අනතුරු ඇඟවීමක්</span><p style="margin: 4px 0 0">හදිසි බව ඇඟවීම සමාජ ඉංජිනේරු විද්‍යාවේ (Social Engineering) බහුලව භාවිත වන ප්‍රධානතම උපක්‍රමයකි.</p>` :
          `<span class="badge danger" style="margin-bottom:8px">Risk Warning</span><p style="margin: 4px 0 0">Urgency is a core emotional manipulation tool used in social engineering.</p>`;
      }
    });
  }

  const reportForm = document.getElementById('reportForm');
  const formMsg = document.getElementById('formMsg');

  if (reportForm && formMsg) {
    reportForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('fullName').value.trim();
      const email = document.getElementById('email').value.trim();
      const role = document.getElementById('role').value;
      const type = document.getElementById('incidentType').value;
      const details = document.getElementById('details').value.trim();
      const contact = document.getElementById('contactMethod').value;
      const activeLang = document.documentElement.getAttribute('data-lang');

      if (!name || !email || !role || !type || !details || !contact) {
        formMsg.className = 'result';
        formMsg.textContent = activeLang === 'si' ? 'කරුණාකර ඉදිරිපත් කිරීමට පෙර සියලුම ක්ෂේත්‍ර සම්පූර්ණ කරන්න.' : 'Please complete all form inputs before submitting.';
        return;
      }

      const referenceID = 'CSF-' + String(Date.now()).slice(-6);

      formMsg.className = 'result';
      formMsg.style.borderColor = 'var(--warn)';
      formMsg.innerHTML = activeLang === 'si' ? 
        `<div class="small">පරිපාලනය වෙත ආරක්ෂිතව දත්ත සම්ප්‍රේෂණය වෙමින් පවතී...</div>` :
        `<div class="small">Processing encrypted transmission to administration...</div>`;

      const payload = {
        service_id: SERVICE_ID,
        template_id: TEMPLATE_ID,
        user_id: PUBLIC_KEY,
        template_params: {
          to_email: email,
          reference_id: referenceID,
          full_name: name,
          contact_email: email,
          role: role,
          incident_type: type,
          incident_details: details,
          contact_method: contact,
          timestamp: new Date().toLocaleString()
        }
      };

      try {
        const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          formMsg.className = 'result';
          formMsg.style.borderColor = 'var(--success)';
          formMsg.innerHTML = activeLang === 'si' ? 
            `<div style="color: var(--success); font-weight:700; margin-bottom:4px">වාර්තාව සාර්ථකව යොමු කරන ලදී</div>
             <div class="small">වාර්තා හැඳුනුම් අංකය: <strong>${referenceID}</strong>. තහවුරු කිරීමේ ඊමේලයක් ${email} වෙත යවා ඇත. ආරක්ෂක කණ්ඩායම මේ පිළිබඳව වහාම ක්‍රියාත්මක වනු ඇත.</div>` :
            `<div style="color: var(--success); font-weight:700; margin-bottom:4px">Report Dispatched Confidentially</div>
             <div class="small">Reference Hash: <strong>${referenceID}</strong>. Confirmation sent to ${email}. The security operations team has been notified.</div>`;
          reportForm.reset();
        } else {
          const errorText = await response.text();
          throw new Error(errorText || `HTTP Status ${response.status}`);
        }
      } catch (error) {
        console.error('Email REST API transmission failed:', error);
        
        formMsg.className = 'result';
        formMsg.style.borderColor = 'var(--danger)';
        formMsg.innerHTML = activeLang === 'si' ? 
          `<div style="color: var(--danger); font-weight:700; margin-bottom:4px">සම්ප්‍රේෂණ දෝෂයකි</div>
           <div class="small">සේවාදායකය වෙත වාර්තාව යැවිය නොහැකි විය. (හේතුව: ${error.message}). කරුණාකර ඔබගේ පරාමිතීන් පරීක්ෂා කරන්න, නැතහොත් සෘජුවම <a href="mailto:cyberguard622@gmail.com" style="text-decoration:underline">cyberguard622@gmail.com</a> වෙත ඊමේල් කරන්න.</div>` :
          `<div style="color: var(--danger); font-weight:700; margin-bottom:4px">Submission Error</div>
           <div class="small">The server could not process the report. (Reason: ${error.message}). Please verify that your credentials match your dashboard, or email us directly at <a href="mailto:cyberguard622@gmail.com" style="text-decoration:underline">cyberguard622@gmail.com</a>.</div>`;
      }
    });
  }
});

(function() {
  const initChatbase = () => {
    if (window.chatbase && typeof window.chatbase === 'function') {
      try {
        if (window.chatbase('getState') === 'initialized') {
          return;
        }
      } catch (_) {}
    }

    window.chatbase = window.chatbase || function() {
      (window.chatbase.q = window.chatbase.q || []).push(arguments);
    };
    window.chatbase.q = window.chatbase.q || [];

    const script = document.createElement('script');
    script.src = 'https://www.chatbase.co/embed.min.js';
    script.defer = true;
    script.id = 'chatbase-embed-script';
    document.head.appendChild(script);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatbase);
  } else {
    initChatbase();
  }
})();