/**
 * BIS AI Intelligent Assistant - Main Application Controller
 * SIH Problem Statement 26107
 */

class Application {
  constructor() {
    this.currentView = 'chatView';
    this.theme = localStorage.getItem('bis_theme') || 'dark';
    this.sessions = JSON.parse(localStorage.getItem('bis_sessions') || '[]');
    this.activeSessionId = null;
  }

  async init() {
    this.applyTheme(this.theme);
    window.i18n.init();
    
    this.setupNavigation();
    this.setupThemeToggle();
    this.setupEvidenceDrawer();
    this.setupAISettings();

    // Initialize sub-modules
    window.chatController.init();
    await window.standardsExplorer.init();
    window.complianceDashboard.init();
    await window.laboratoryFinder.init();
    await this.loadServicesHub();
    await this.loadHealthMetrics();

    // Load sessions from server & local storage
    await this.syncSessions();
  }

  setupAISettings() {
    const aiModeSelector = document.getElementById('aiModeSelector');
    const aiSettingsBtn = document.getElementById('aiSettingsBtn');
    const modalOverlay = document.getElementById('aiSettingsModalOverlay');
    const closeBtn = document.getElementById('closeAiSettingsBtn');
    const cancelBtn = document.getElementById('cancelAiSettingsBtn');
    const saveBtn = document.getElementById('saveAiSettingsBtn');
    const providerSelect = document.getElementById('aiProviderSelect');
    const apiKeyGroup = document.getElementById('apiKeyFormGroup');
    const apiKeyInput = document.getElementById('customApiKeyInput');
    const toggleKeyBtn = document.getElementById('toggleApiKeyVisibility');
    const testKeyBtn = document.getElementById('testAiKeyBtn');
    const testStatus = document.getElementById('testKeyStatus');

    // 1. Initialize AI Mode Selector
    const savedMode = localStorage.getItem('bis_ai_mode') || 'auto';
    if (aiModeSelector) {
      aiModeSelector.value = savedMode;
      aiModeSelector.addEventListener('change', () => {
        localStorage.setItem('bis_ai_mode', aiModeSelector.value);
        const modeLabels = {
          auto: 'Auto-Detect (Smart Intent)',
          chatgpt: 'ChatGPT Mode (All Questions Enabled)',
          bis: 'BIS Standards Specialist Mode'
        };
        this.showToast(`Switched to ${modeLabels[aiModeSelector.value] || 'Auto Mode'}`, 'info');
      });
    }

    // 2. Open / Close AI Settings Modal
    const openModal = () => {
      const savedProvider = localStorage.getItem('bis_ai_provider') || 'builtin';
      const savedKey = localStorage.getItem('bis_custom_api_key') || '';
      if (providerSelect) providerSelect.value = savedProvider;
      if (apiKeyInput) apiKeyInput.value = savedKey;
      if (testStatus) testStatus.innerHTML = '';
      updateProviderUI();

      modalOverlay?.classList.add('open');
    };

    const closeModal = () => {
      modalOverlay?.classList.remove('open');
    };

    aiSettingsBtn?.addEventListener('click', openModal);
    closeBtn?.addEventListener('click', closeModal);
    cancelBtn?.addEventListener('click', closeModal);
    modalOverlay?.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });

    // 3. Provider Selector Change UI update
    const updateProviderUI = () => {
      const prov = providerSelect?.value || 'builtin';
      if (prov === 'builtin') {
        if (apiKeyGroup) apiKeyGroup.style.display = 'none';
        if (testKeyBtn) testKeyBtn.style.display = 'none';
      } else {
        if (apiKeyGroup) apiKeyGroup.style.display = 'block';
        if (testKeyBtn) testKeyBtn.style.display = 'inline-flex';
        
        const placeholders = {
          gemini: 'Enter Gemini API Key (AIzaSy...)',
          openai: 'Enter OpenAI API Key (sk-...)',
          groq: 'Enter Groq API Key (gsk_...)'
        };
        if (apiKeyInput) apiKeyInput.placeholder = placeholders[prov] || 'Enter API Key';
      }
    };

    providerSelect?.addEventListener('change', updateProviderUI);

    // 4. Toggle Key Visibility
    toggleKeyBtn?.addEventListener('click', () => {
      if (apiKeyInput) {
        apiKeyInput.type = apiKeyInput.type === 'password' ? 'text' : 'password';
      }
    });

    // 5. Test API Connection
    testKeyBtn?.addEventListener('click', async () => {
      const prov = providerSelect?.value;
      const key = apiKeyInput?.value.trim();
      if (!key) {
        if (testStatus) testStatus.innerHTML = `<span style="color: #f43f5e;">⚠️ Please enter an API key to test</span>`;
        return;
      }

      if (testStatus) testStatus.innerHTML = `<span>⏳ Testing connection...</span>`;
      testKeyBtn.disabled = true;

      try {
        const res = await window.apiClient.testAIKey({ provider: prov, api_key: key });
        if (res.success) {
          testStatus.innerHTML = `<span style="color: #10b981;">✅ Connected successfully to ${prov.toUpperCase()}!</span>`;
        } else {
          testStatus.innerHTML = `<span style="color: #f43f5e;">❌ ${res.error || 'Connection failed'}</span>`;
        }
      } catch (err) {
        testStatus.innerHTML = `<span style="color: #f43f5e;">❌ Error: ${err.message}</span>`;
      } finally {
        testKeyBtn.disabled = false;
      }
    });

    // 6. Save Settings
    saveBtn?.addEventListener('click', () => {
      const prov = providerSelect?.value || 'builtin';
      const key = apiKeyInput?.value.trim() || '';

      localStorage.setItem('bis_ai_provider', prov);
      localStorage.setItem('bis_custom_api_key', key);

      closeModal();
      this.showToast(`AI Engine settings applied (${prov.toUpperCase()})`, 'success');
    });
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
      this.activeSessionId = null;
      window.chatController.resetChat();
      this.renderSessions();
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
    // Two Theme Options segmented buttons
    document.querySelectorAll('.theme-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const selectedTheme = btn.getAttribute('data-theme-val');
        if (selectedTheme && selectedTheme !== this.theme) {
          this.applyTheme(selectedTheme);
          this.showToast(`Switched to ${selectedTheme === 'dark' ? 'Dark' : 'Light'} Theme`, 'info');
        }
      });
    });

    // Mobile / Quick toggle button
    const toggleBtn = document.getElementById('themeToggleBtn');
    toggleBtn?.addEventListener('click', () => {
      const nextTheme = this.theme === 'dark' ? 'light' : 'dark';
      this.applyTheme(nextTheme);
      this.showToast(`Switched to ${nextTheme === 'dark' ? 'Dark' : 'Light'} Theme`, 'info');
    });
  }

  applyTheme(theme) {
    this.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('bis_theme', theme);

    // Update Two-Option Switcher buttons
    document.querySelectorAll('.theme-option-btn').forEach(btn => {
      if (btn.getAttribute('data-theme-val') === theme) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
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

  async syncSessions() {
    try {
      const res = await window.apiClient.getSessions();
      if (res && res.sessions && res.sessions.length > 0) {
        // Merge server sessions with local storage
        this.sessions = res.sessions;
        localStorage.setItem('bis_sessions', JSON.stringify(this.sessions));
      }
    } catch (e) {
      // Fallback to local storage if offline
      this.sessions = JSON.parse(localStorage.getItem('bis_sessions') || '[]');
    }
    this.renderSessions();
  }

  saveSession(convId, snippet, messages = []) {
    this.activeSessionId = convId;
    const existingIdx = this.sessions.findIndex(s => s.id === convId);

    const sessionObj = {
      id: convId,
      title: snippet || 'Conversation',
      updated_at: new Date().toISOString(),
      messages: messages
    };

    if (existingIdx !== -1) {
      this.sessions[existingIdx] = { ...this.sessions[existingIdx], ...sessionObj };
    } else {
      this.sessions.unshift(sessionObj);
      if (this.sessions.length > 25) this.sessions.pop();
    }

    localStorage.setItem('bis_sessions', JSON.stringify(this.sessions));
    this.renderSessions();
  }

  async selectSession(convId) {
    this.switchView('chatView');
    this.activeSessionId = convId;
    this.renderSessions();

    try {
      // Try fetching full conversation from server
      const session = await window.apiClient.getSession(convId);
      if (session) {
        window.chatController.loadSession(session);
        this.showToast(`Loaded: ${session.title}`, 'info');
        return;
      }
    } catch (e) {
      // Fallback to local session if server request fails
      const local = this.sessions.find(s => s.id === convId);
      if (local) {
        window.chatController.loadSession(local);
        this.showToast(`Loaded: ${local.title}`, 'info');
      }
    }
  }

  async deleteSession(convId, e) {
    if (e) e.stopPropagation();

    try {
      await window.apiClient.deleteSession(convId);
    } catch (err) {
      console.warn('Could not delete session from server:', err);
    }

    this.sessions = this.sessions.filter(s => s.id !== convId);
    localStorage.setItem('bis_sessions', JSON.stringify(this.sessions));

    if (this.activeSessionId === convId) {
      this.activeSessionId = null;
      window.chatController.resetChat();
    }

    this.renderSessions();
    this.showToast('Conversation deleted.', 'info');
  }

  renderSessions() {
    const listEl = document.getElementById('historyList');
    if (!listEl) return;
    listEl.innerHTML = '';

    if (this.sessions.length === 0) {
      listEl.innerHTML = `<span style="font-size: 12px; color: var(--text-muted); padding: 8px 10px; display: block;">No saved conversations yet</span>`;
      return;
    }

    this.sessions.forEach(sess => {
      const item = document.createElement('div');
      item.className = `history-item ${this.activeSessionId === sess.id ? 'active' : ''}`;
      
      item.innerHTML = `
        <div class="history-item-content" title="${sess.title}">
          <span class="history-icon">💬</span>
          <span class="history-title">${sess.title}</span>
        </div>
        <button class="btn-delete-session" title="Delete conversation" aria-label="Delete conversation">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
        </button>
      `;

      item.addEventListener('click', () => {
        this.selectSession(sess.id);
        document.getElementById('sidebar')?.classList.remove('open');
      });

      const delBtn = item.querySelector('.btn-delete-session');
      delBtn.addEventListener('click', (e) => this.deleteSession(sess.id, e));

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
