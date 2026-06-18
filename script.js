document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle Integration
  const mobileToggle = document.getElementById('mobileNavToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    // Close mobile menu when links are selected
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // Active Navigation Highlighting on Scroll
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
    // Scroll progress updater
    const doc = document.documentElement;
    const progress = (doc.scrollTop / (doc.scrollHeight - doc.clientHeight)) * 100;
    const bar = document.getElementById('progressBar');
    if (bar) {
      bar.style.width = progress + '%';
    }
  });

  setActiveNav();

  // Advisory Filters & Search
  const newsSearch = document.getElementById('newsSearch');
  const newsFilter = document.getElementById('newsFilter');
  const searchBtn = document.getElementById('searchBtn');
  const newsItems = [...document.querySelectorAll('.news-item')];

  function filterAdvisories() {
    const query = newsSearch ? newsSearch.value.trim().toLowerCase() : '';
    const category = newsFilter ? newsFilter.value : 'all';

    newsItems.forEach(item => {
      const text = item.innerText.toLowerCase();
      const itemCategory = item.dataset.category;

      const matchesQuery = !query || text.includes(query);
      const matchesCategory = category === 'all' || itemCategory === category;

      item.classList.toggle('hidden', !(matchesQuery && matchesCategory));
    });
  }

  if (newsSearch) newsSearch.addEventListener('input', filterAdvisories);
  if (newsFilter) newsFilter.addEventListener('change', filterAdvisories);
  if (searchBtn) searchBtn.addEventListener('click', filterAdvisories);

  // Password Strength Estimator
  const pwInput = document.getElementById('passwordInput');
  const meterBar = document.getElementById('meterBar');
  const pwHint = document.getElementById('passwordHint');

  if (pwInput && meterBar && pwHint) {
    pwInput.addEventListener('input', () => {
      const val = pwInput.value;
      let score = 0;

      if (!val) {
        meterBar.style.width = '0%';
        pwHint.textContent = 'Security standard: 12+ mixed characters or 4+ random words.';
        return;
      }

      if (val.length >= 12) score += 30;
      if (val.length >= 16) score += 10;
      if (/[a-z]/.test(val) && /[A-Z]/.test(val)) score += 20;
      if (/\d/.test(val)) score += 20;
      if (/[^A-Za-z0-9]/.test(val)) score += 20;

      meterBar.style.width = score + '%';

      if (score < 40) {
        pwHint.textContent = 'Weak credentials. Enhance length and character variation.';
        pwHint.style.color = '#ff5c7c';
      } else if (score < 75) {
        pwHint.textContent = 'Moderate security. Try substituting letters for symbols or adding words.';
        pwHint.style.color = '#ffd166';
      } else {
        pwHint.textContent = 'High entropy. Credential parameters meet safety guidelines.';
        pwHint.style.color = '#35d07f';
      }
    });
  }

  // Interactive Scenario Quiz
  const quizBtn = document.getElementById('quizBtn');
  const quizResult = document.getElementById('quizResult');

  if (quizBtn && quizResult) {
    quizBtn.addEventListener('click', () => {
      const selection = document.querySelector('input[name="q1"]:checked');
      if (!selection) {
        quizResult.textContent = 'Please make a selection to evaluate.';
        return;
      }

      if (selection.value === 'right') {
        quizResult.innerHTML = `<span class="badge ok" style="margin-bottom:8px">Correct</span><p style="margin: 4px 0 0">Verify directly using trusted paths instead of reacting to communication demands.</p>`;
      } else {
        quizResult.innerHTML = `<span class="badge danger" style="margin-bottom:8px">Risk Warning</span><p style="margin: 4px 0 0">Urgency is a core emotional manipulation tool used in social engineering.</p>`;
      }
    });
  }

  // Incident Form Submission Processor
  const reportForm = document.getElementById('reportForm');
  const formMsg = document.getElementById('formMsg');

  if (reportForm && formMsg) {
    reportForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('fullName').value.trim();
      const email = document.getElementById('email').value.trim();
      const role = document.getElementById('role').value;
      const type = document.getElementById('incidentType').value;
      const details = document.getElementById('details').value.trim();

      if (!name || !email || !role || !type || !details) {
        formMsg.className = 'result';
        formMsg.textContent = 'Please complete all form inputs before submitting.';
        return;
      }

      const referenceID = 'CSF-' + String(Date.now()).slice(-6);
      
      formMsg.className = 'result';
      formMsg.style.borderColor = 'var(--success)';
      formMsg.innerHTML = `
        <div style="color: var(--success); font-weight:700; margin-bottom:4px">Report Dispatched Confidentially</div>
        <div class="small">Reference Hash: <strong>${referenceID}</strong>. The security operations team has been notified.</div>
      `;

      reportForm.reset();
    });
  }
});