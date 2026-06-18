document.addEventListener('DOMContentLoaded', () => {
  const PUBLIC_KEY = '-VEb7e6o3KqCUicfo';
  const SERVICE_ID = 'service_8ul2w9w';
  const TEMPLATE_ID = 'template_huzfx28';

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

  // Advisory Filters & Search
  const newsSearch = document.getElementById('newsSearch');
  const filterBtns = [...document.querySelectorAll('.filter-btn')];
  const clearFiltersBtn = document.getElementById('clearFiltersBtn');
  const newsCount = document.getElementById('newsCount');
  const newsItems = [...document.querySelectorAll('.news-item')];
  let activeFilter = 'all';

  function updateItemCount() {
    const visibleItems = newsItems.filter(item => !item.classList.contains('hidden')).length;
    if (newsCount) {
      newsCount.textContent = visibleItems + ' item' + (visibleItems !== 1 ? 's' : '');
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
    reportForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('fullName').value.trim();
      const email = document.getElementById('email').value.trim();
      const role = document.getElementById('role').value;
      const type = document.getElementById('incidentType').value;
      const details = document.getElementById('details').value.trim();
      const contact = document.getElementById('contactMethod').value;

      if (!name || !email || !role || !type || !details || !contact) {
        formMsg.className = 'result';
        formMsg.textContent = 'Please complete all form inputs before submitting.';
        return;
      }

      const referenceID = 'CSF-' + String(Date.now()).slice(-6);
      
      // Update UI state during dispatch
      formMsg.className = 'result';
      formMsg.style.borderColor = 'var(--warn)';
      formMsg.innerHTML = `<div class="small">Processing encrypted transmission to administration...</div>`;

      // Build payload for direct EmailJS REST API execution
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
          formMsg.innerHTML = `
            <div style="color: var(--success); font-weight:700; margin-bottom:4px">Report Dispatched Confidentially</div>
            <div class="small">Reference Hash: <strong>${referenceID}</strong>. Confirmation sent to ${email}. The security operations team has been notified.</div>
          `;
          reportForm.reset();
        } else {
          const errorText = await response.text();
          throw new Error(errorText || `HTTP Status ${response.status}`);
        }
      } catch (error) {
        console.error('Email REST API transmission failed:', error);
        
        formMsg.className = 'result';
        formMsg.style.borderColor = 'var(--danger)';
        formMsg.innerHTML = `
          <div style="color: var(--danger); font-weight:700; margin-bottom:4px">Submission Error</div>
          <div class="small">The server could not process the report. (Reason: ${error.message}). Please verify that your credentials (Service ID, Template ID, and Public Key) in script.js match your dashboard, or email us directly at <a href="mailto:cyberguard622@gmail.com" style="text-decoration:underline">cyberguard622@gmail.com</a>.</div>
        `;
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