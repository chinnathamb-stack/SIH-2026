/**
 * BIS AI Intelligent Assistant - Main Application Controller
 * SIH Problem Statement 26107
 */

class Application {
  constructor() {
    this.currentView = 'chatView';
    this.theme = localStorage.getItem('bis_theme') || 'dark';
    this.sessions = JSON.parse(localStorage.getItem('bis_sessions') || '[]');
  }

  async init() {
    this.applyTheme(this.theme);
    window.i18n.init();
    
    this.setupNavigation();
    this.setupThemeToggle();
    this.setupEvidenceDrawer();
    this.renderSessions();

    // Initialize sub-modules
    window.chatController.init();
    await window.standardsExplorer.init();
    window.complianceDashboard.init();
    await window.laboratoryFinder.init();
    await this.loadServicesHub();
    await this.loadHealthMetrics();
  }

  setupNavigation() {
    // Sidebar nav items
    document.querySelectorAll('.nav-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const viewId = btn.getAttribute('data-view');
        this.switchView(viewId);

        // Close mobile sidebar if open
        document.getElementById('sidebar')?.classList.remove('open');
      });
    });

    // Mobile menu button
    document.getElementById('mobileMenuBtn')?.addEventListener('click', () => {
      document.getElementById('sidebar')?.classList.toggle('open');
    });

    // New Chat buttons
    const handleNewChat = () => {
      this.switchView('chatView');
      window.chatController.resetChat();
      this.showToast('Started a new conversation session.', 'info');
      document.getElementById('sidebar')?.classList.remove('open');
    };

    document.getElementById('newChatBtn')?.addEventListener('click', handleNewChat);
    document.getElementById('sidebarNewChatBtn')?.addEventListener('click', handleNewChat);
  }

  switchView(viewId) {
    document.querySelectorAll('.view-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

    const targetPanel = document.getElementById(viewId);
    const targetNav = document.querySelector(`.nav-item[data-view="${viewId}"]`);

    if (targetPanel) targetPanel.classList.add('active');
    if (targetNav) targetNav.classList.add('active');

    this.currentView = viewId;

    // Update title
    const viewTitles = {
      chatView: "BIS AI Intelligent Assistant",
      analyzerView: "Product Analyzer & Compliance Dashboard",
      standardsView: "Indian Standards Explorer (KYS)",
      labsView: "Laboratory Finder (LIMS)",
      servicesView: "Official BIS Portals & Deep Links",
      healthView: "System Health & Ingestion Telemetry"
    };
    const titleEl = document.getElementById('viewTitle');
    if (titleEl && viewTitles[viewId]) {
      titleEl.textContent = viewTitles[viewId];
    }
  }

  setupThemeToggle() {
    const btn = document.getElementById('themeToggleBtn');
    btn?.addEventListener('click', () => {
      const nextTheme = this.theme === 'dark' ? 'light' : 'dark';
      this.applyTheme(nextTheme);
    });
  }

  applyTheme(theme) {
    this.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('bis_theme', theme);
  }

  setupEvidenceDrawer() {
    const drawer = document.getElementById('evidenceDrawer');
    const overlay = document.getElementById('drawerOverlay');
    const closeBtn = document.getElementById('closeDrawerBtn');

    const closeDrawer = () => {
      drawer.classList.remove('open');
      overlay.classList.remove('open');
    };

    closeBtn?.addEventListener('click', closeDrawer);
    overlay?.addEventListener('click', closeDrawer);
  }

  async openEvidenceDrawer(isNumber) {
    const drawer = document.getElementById('evidenceDrawer');
    const overlay = document.getElementById('drawerOverlay');
    const titleEl = document.getElementById('drawerTitle');
    const bodyEl = document.getElementById('drawerBody');
    const officialBtn = document.getElementById('drawerOfficialBtn');

    titleEl.textContent = isNumber;
    bodyEl.innerHTML = `
      <div style="text-align: center; padding: 30px;">
        <div class="typing-indicator" style="margin: 0 auto 10px auto;">
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
        </div>
        <p style="color: var(--text-muted);">Fetching authoritative clause evidence...</p>
      </div>
    `;

    drawer.classList.add('open');
    overlay.classList.add('open');

    try {
      const res = await window.apiClient.getEvidence(isNumber);
      officialBtn.href = res.source_url || 'https://www.services.bis.gov.in/';
      
      bodyEl.innerHTML = '';
      if (!res.clauses || res.clauses.length === 0) {
        bodyEl.innerHTML = `<p style="color: var(--text-muted);">No clause evidence indexed for this standard yet.</p>`;
        return;
      }

      res.clauses.forEach(cl => {
        const item = document.createElement('div');
        item.className = 'clause-evidence-item';
        item.innerHTML = `
          <div class="clause-top">
            <span class="clause-tag">${cl.clause_no}</span>
            <span class="clause-page">Page ${cl.page}</span>
          </div>
          <div class="clause-heading">${cl.heading}</div>
          <div class="clause-text">${cl.text}</div>
          ${cl.test_method ? `<div class="clause-test"><strong>Test Method:</strong> ${cl.test_method}</div>` : ''}
        `;
        bodyEl.appendChild(item);
      });
    } catch (err) {
      console.error(err);
      bodyEl.innerHTML = `<p style="color: #f43f5e;">Failed to load clause evidence.</p>`;
    }
  }

  async loadServicesHub() {
    const gridEl = document.getElementById('servicesGrid');
    if (!gridEl) return;

    try {
      const res = await window.apiClient.getServices();
      gridEl.innerHTML = '';

      (res.services || []).forEach(srv => {
        const card = document.createElement('div');
        card.className = 'service-card';
        card.innerHTML = `
          <div>
            <div class="card-badge-row">
              <span class="is-badge">${srv.category}</span>
              <span class="scheme-tag">${srv.badge}</span>
            </div>
            <h3 class="card-main-title">${srv.name}</h3>
            <p class="card-desc">${srv.description}</p>
            <div style="margin-bottom: 16px;">
              <strong style="font-size: 12px; color: var(--text-primary); display: block; margin-bottom: 6px;">Key Functions:</strong>
              <div class="scope-chips">
                ${(srv.features || []).map(f => `<span class="scope-pill">✓ ${f}</span>`).join('')}
              </div>
            </div>
          </div>
          <a href="${srv.official_url}" target="_blank" rel="noopener" class="btn-primary" style="width: 100%;">
            <span>Access Portal</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>
        `;
        gridEl.appendChild(card);
      });
    } catch (err) {
      console.error(err);
    }
  }

  async loadHealthMetrics() {
    try {
      const res = await window.apiClient.getHealth();
      const statusEl = document.getElementById('healthStatus');
      const stdEl = document.getElementById('metricStandards');
      const labsEl = document.getElementById('metricLabs');
      const srvEl = document.getElementById('metricServices');

      if (statusEl) statusEl.textContent = 'Operational (100% JS)';
      if (stdEl) stdEl.textContent = `${res.indexed_data.standards} Standards`;
      if (labsEl) labsEl.textContent = `${res.indexed_data.laboratories} Labs`;
      if (srvEl) srvEl.textContent = `${res.indexed_data.services} Services`;
    } catch (err) {
      console.error(err);
    }
  }

  saveSession(convId, snippet) {
    if (!this.sessions.some(s => s.id === convId)) {
      this.sessions.unshift({ id: convId, title: snippet, date: new Date().toLocaleDateString() });
      if (this.sessions.length > 10) this.sessions.pop();
      localStorage.setItem('bis_sessions', JSON.stringify(this.sessions));
      this.renderSessions();
    }
  }

  renderSessions() {
    const listEl = document.getElementById('historyList');
    if (!listEl) return;
    listEl.innerHTML = '';

    if (this.sessions.length === 0) {
      listEl.innerHTML = `<span style="font-size: 12px; color: var(--text-muted); padding: 6px 10px;">No saved sessions yet</span>`;
      return;
    }

    this.sessions.forEach(sess => {
      const item = document.createElement('div');
      item.className = 'history-item';
      item.innerHTML = `
        <span style="overflow: hidden; text-overflow: ellipsis;">💬 ${sess.title}</span>
      `;
      item.addEventListener('click', () => {
        this.switchView('chatView');
        this.showToast(`Active Session: ${sess.title}`, 'info');
      });
      listEl.appendChild(item);
    });
  }

  showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icon = type === 'success' ? '✅' : type === 'warning' ? '⚠️' : 'ℹ️';
    toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.app = new Application();
  window.app.init();
});
