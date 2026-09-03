/**
 * BIS AI Intelligent Assistant - Chat Controller (ChatGPT-Style Interactive AI)
 * SIH Problem Statement 26107
 */

class ChatController {
  constructor() {
    this.streamEl = document.getElementById('chatStream');
    this.welcomeEl = document.getElementById('chatWelcome');
    this.inputEl = document.getElementById('messageInput');
    this.sendBtn = document.getElementById('sendBtn');
    this.voiceBtn = document.getElementById('voiceBtn');
    this.attachBtn = document.getElementById('attachBtn');
    
    this.conversationId = `conv_${Date.now()}`;
    this.messages = [];
    this.isStreaming = false;
    this.clarificationState = {};
    this.recognition = null;
    this.isListening = false;

    // Mode State (ChatGPT Universal vs BIS Specialist)
    this.activeMode = localStorage.getItem('bis_ai_mode') || 'chatgpt';

    // Advanced Text-to-Speech & Voice State
    this.isSpeaking = false;
    this.activeSpeakerBtn = null;
    this.activeAudioBanner = null;
    this.autoSpeak = localStorage.getItem('bis_auto_speak') === 'true';
    this.voices = [];
  }

  init() {
    this.setupEventListeners();
    this.setupSpeechRecognition();
    this.initVoices();
    this.setupSpeakerToggle();
    this.setupCodeBlockCopyListener();
    this.setupModeSwitcher();
    this.updateWelcomeUI();
  }

  setupModeSwitcher() {
    const tabChatGpt = document.getElementById('tabModeChatGpt');
    const tabBis = document.getElementById('tabModeBis');
    const navChatGpt = document.getElementById('navChatGptBtn');
    const navBis = document.getElementById('navBisBtn');

    tabChatGpt?.addEventListener('click', () => this.setMode('chatgpt'));
    tabBis?.addEventListener('click', () => this.setMode('bis'));

    navChatGpt?.addEventListener('click', () => {
      window.app.switchView('chatView');
      this.setMode('chatgpt');
    });

    navBis?.addEventListener('click', () => {
      window.app.switchView('chatView');
      this.setMode('bis');
    });

    this.setMode(this.activeMode, false);
  }

  setMode(mode, showNotification = true) {
    this.activeMode = mode === 'bis' ? 'bis' : 'chatgpt';
    localStorage.setItem('bis_ai_mode', this.activeMode);

    // Update topbar segmented control
    const tabChatGpt = document.getElementById('tabModeChatGpt');
    const tabBis = document.getElementById('tabModeBis');
    if (this.activeMode === 'chatgpt') {
      tabChatGpt?.classList.add('active');
      tabBis?.classList.remove('active');
    } else {
      tabBis?.classList.add('active');
      tabChatGpt?.classList.remove('active');
    }

    // Update sidebar navigation active items
    const navChatGpt = document.getElementById('navChatGptBtn');
    const navBis = document.getElementById('navBisBtn');
    if (this.activeMode === 'chatgpt') {
      navChatGpt?.classList.add('active');
      navBis?.classList.remove('active');
    } else {
      navBis?.classList.add('active');
      navChatGpt?.classList.remove('active');
    }

    this.updateWelcomeUI();

    if (showNotification && window.app) {
      const modeName = this.activeMode === 'chatgpt' ? '🌐 ChatGPT Universal AI' : '🏛️ BIS Standards Specialist';
      window.app.showToast(`Active Mode: ${modeName}`, 'info');
    }
  }

  updateWelcomeUI() {
    if (!this.welcomeEl) return;

    if (this.activeMode === 'chatgpt') {
      this.welcomeEl.innerHTML = `
        <div class="welcome-badge">
          <span class="badge-icon">🌐</span>
          <span>ChatGPT Universal AI — Ask Anything Across All Topics</span>
        </div>
        <h1 class="welcome-heading">How can I help you today?</h1>
        <p class="welcome-desc">
          Ask me anything! Python & JavaScript code, math calculations, science explanations, essay writing, leave emails, brainstorming, and everyday problem-solving.
        </p>
        <div class="prompt-chips">
          <button class="chip" data-prompt="Write a python function to check if a string is palindrome with two-pointer approach.">
            <span class="chip-icon">💻</span>
            <div>
              <strong>Python Palindrome Code</strong>
              <span>Clean Two-Pointer Algorithm & Regex</span>
            </div>
          </button>
          <button class="chip" data-prompt="Explain Machine Learning, Supervised vs Unsupervised learning, and the ML training workflow in detail.">
            <span class="chip-icon">🧠</span>
            <div>
              <strong>Machine Learning Deep Dive</strong>
              <span>Supervised, Unsupervised & RL</span>
            </div>
          </button>
          <button class="chip" data-prompt="Draft a professional 1-day casual leave email to my manager for personal reasons.">
            <span class="chip-icon">✍️</span>
            <div>
              <strong>Casual Leave Email</strong>
              <span>Office Email Format with Handover</span>
            </div>
          </button>
          <button class="chip" data-prompt="Explain Quantum Computing, Superposition, and Qubits in simple terms.">
            <span class="chip-icon">⚛️</span>
            <div>
              <strong>Quantum Computing</strong>
              <span>Superposition, Qubits & Applications</span>
            </div>
          </button>
          <button class="chip" data-prompt="What is 15% of 8500 and how is it calculated?">
            <span class="chip-icon">🧮</span>
            <div>
              <strong>Math & Percentage</strong>
              <span>Fast Arithmetic & Formula Breakdown</span>
            </div>
          </button>
          <button class="chip" data-prompt="Give me 3 innovative AI startup business ideas with target audience and monetization models.">
            <span class="chip-icon">💡</span>
            <div>
              <strong>3 Startup Business Ideas</strong>
              <span>Tech Innovation & Revenue Models</span>
            </div>
          </button>
        </div>
      `;
      if (this.inputEl) {
        this.inputEl.placeholder = "Ask anything (e.g. Write Python code, solve math, draft an email, explain a concept)...";
      }
    } else {
      this.welcomeEl.innerHTML = `
        <div class="welcome-badge">
          <span class="badge-icon">🏛️</span>
          <span>Bureau of Indian Standards (BIS) — Official Compliance AI</span>
        </div>
        <h1 class="welcome-heading">BIS Standards & Quality Compliance</h1>
        <p class="welcome-desc">
          Official guidance for Indian Standards (IS), mandatory certification schemes, test parameters, and NABL accredited laboratories.
        </p>
        <div class="prompt-chips">
          <button class="chip" data-prompt="I want to manufacture an electric kettle. What BIS requirements must my product satisfy under IS 302-2-15, what tests are required, and which laboratory can test it?">
            <span class="chip-icon">⚡</span>
            <div>
              <strong>Electric Kettle (IS 302-2-15)</strong>
              <span>Safety Tests, Scheme I, Lab Directory</span>
            </div>
          </button>
          <button class="chip" data-prompt="What are the mandatory testing and licensing steps to setup a Packaged Drinking Water bottling plant under IS 14543?">
            <span class="chip-icon">💧</span>
            <div>
              <strong>Packaged Drinking Water</strong>
              <span>IS 14543, FSSAI-BIS Mandate, In-house Lab</span>
            </div>
          </button>
          <button class="chip" data-prompt="What is the Compulsory Registration Scheme (CRS) process and tests for Lithium-ion battery packs under IS 16046?">
            <span class="chip-icon">🔋</span>
            <div>
              <strong>Lithium-ion Battery (CRS)</strong>
              <span>IS 16046 Part 2, MeitY Order, R-Number</span>
            </div>
          </button>
          <button class="chip" data-prompt="What are the helmet testing parameters, QCO orders, and mandatory ISI mark rules under IS 4151?">
            <span class="chip-icon">🪖</span>
            <div>
              <strong>Protective Helmets (IS 4151)</strong>
              <span>QCO Mandate, Impact Tests, Penalties</span>
            </div>
          </button>
          <button class="chip" data-prompt="How do MSME and startup manufacturers get the 50% concession on BIS marking and application fees?">
            <span class="chip-icon">💰</span>
            <div>
              <strong>MSME 50% Fee Concession</strong>
              <span>Udyam Benefits & Marking Fee Rules</span>
            </div>
          </button>
          <button class="chip" data-prompt="What is the difference between Scheme I (ISI Mark) and Scheme II (CRS) under BIS Act 2016?">
            <span class="chip-icon">🏭</span>
            <div>
              <strong>Scheme I vs Scheme II Process</strong>
              <span>Licensing Steps, Factory Audit & CRS</span>
            </div>
          </button>
        </div>
      `;
      if (this.inputEl) {
        this.inputEl.placeholder = "Ask about Indian Standards (IS), QCOs, testing requirements, or certification...";
      }
    }

    // Attach click listeners to chips
    this.welcomeEl.querySelectorAll('.chip').forEach(btn => {
      btn.addEventListener('click', () => {
        const promptText = btn.getAttribute('data-prompt');
        if (promptText) {
          this.inputEl.value = promptText;
          this.handleSend();
        }
      });
    });
  }

  setupCodeBlockCopyListener() {
    document.addEventListener('click', (e) => {
      const copyBtn = e.target.closest('.btn-copy-code');
      if (copyBtn) {
        const encodedCode = copyBtn.getAttribute('data-code');
        if (encodedCode) {
          const code = decodeURIComponent(encodedCode);
          navigator.clipboard.writeText(code);
          const span = copyBtn.querySelector('span');
          if (span) {
            const orig = span.textContent;
            span.textContent = 'Copied!';
            setTimeout(() => span.textContent = orig, 2000);
          }
          window.app.showToast('Code copied to clipboard!', 'success');
        }
      }
    });
  }

  async handleSend(customText = null) {
    const text = (customText || this.inputEl.value).trim();
    if (!text || this.isStreaming) return;

    // Reset input
    this.inputEl.value = '';
    this.inputEl.style.height = 'auto';

    // Hide welcome screen
    if (this.welcomeEl) {
      this.welcomeEl.style.display = 'none';
    }

    // Append User Message
    const userMsgObj = this.appendMessage('user', text);
    this.messages.push({ role: 'user', text, timestamp: new Date().toISOString() });

    // Append Assistant Message with Typing Indicator
    const assistantMsgObj = this.appendMessage('assistant', '', true);

    // Scroll smoothly to show user query and assistant row
    assistantMsgObj.rowEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    this.isStreaming = true;
    this.sendBtn.disabled = true;

    try {
      const lang = window.i18n.currentLang;
      const customProvider = localStorage.getItem('bis_ai_provider') || 'builtin';
      const customApiKey = localStorage.getItem('bis_custom_api_key') || null;

      const res = await window.apiClient.sendChat({
        message: text,
        conversation_id: this.conversationId,
        clarifications: this.clarificationState,
        language: lang,
        ai_mode: this.activeMode,
        custom_provider: customProvider,
        custom_api_key: customApiKey
      });

      // Stream / Render formatted response text
      await this.streamResponse(assistantMsgObj.bubbleEl, res.answer);

      // Remove typing indicator
      assistantMsgObj.rowEl.querySelector('.typing-indicator')?.remove();

      // Render Inline Standard Card if returned (in BIS mode)
      if (res.standards && res.standards.length > 0) {
        this.renderInlineStandardCard(assistantMsgObj.contentEl, res.standards[0], res.citations);
      }

      // Render Clarification Card if needed
      if (res.needs_clarification && res.clarification_questions && res.clarification_questions.length > 0) {
        this.renderClarificationCard(assistantMsgObj.contentEl, res.clarification_questions);
      }

      // Render Interactive Follow-Up Chips
      if (res.suggested_followups && res.suggested_followups.length > 0) {
        this.renderFollowUpChips(assistantMsgObj.contentEl, res.suggested_followups);
      }

      // Render Official Next Action links
      if (res.official_actions && res.official_actions.length > 0) {
        this.renderOfficialActions(assistantMsgObj.contentEl, res.official_actions);
      }

      // Add message actions (Copy, Speak, Translate, Feedback)
      this.renderMessageActions(assistantMsgObj.contentEl, res.answer, assistantMsgObj.id, assistantMsgObj.bubbleEl);

      // Auto-speak if enabled
      if (this.autoSpeak) {
        setTimeout(() => {
          const speakBtn = assistantMsgObj.contentEl.querySelector('.btn-speaker');
          this.speakText(res.answer, speakBtn);
        }, 400);
      }

      // Save to local message array
      this.messages.push({
        role: 'assistant',
        text: res.answer,
        payload: res,
        timestamp: new Date().toISOString()
      });

      // Save/sync session in sidebar
      window.app.saveSession(this.conversationId, text.slice(0, 32), this.messages);

      // Smoothly bring the TOP of the assistant's answer into view so the user can read from line 1 and scroll down manually
      assistantMsgObj.rowEl.scrollIntoView({ behavior: 'smooth', block: 'start' });

    } catch (err) {
      console.error(err);
      assistantMsgObj.bubbleEl.innerHTML = `<p style="color: #f43f5e;">⚠️ Error connecting to AI Assistant server. Please check connection.</p>`;
    } finally {
      this.isStreaming = false;
      this.sendBtn.disabled = false;
    }
  }

  appendMessage(role, text, isTyping = false) {
    const msgId = `msg_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const rowEl = document.createElement('div');
    rowEl.className = `message-row ${role}`;
    rowEl.id = msgId;

    const avatarEl = document.createElement('div');
    avatarEl.className = 'message-avatar';
    avatarEl.innerHTML = role === 'user' ? '👤' : (this.activeMode === 'bis' ? '🏛️' : '🌐');

    const contentEl = document.createElement('div');
    contentEl.className = 'message-content';

    const bubbleEl = document.createElement('div');
    bubbleEl.className = 'message-bubble';

    if (isTyping) {
      bubbleEl.innerHTML = `
        <div class="typing-indicator">
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
        </div>
      `;
    } else {
      bubbleEl.innerHTML = this.formatMarkdown(text);
    }

    contentEl.appendChild(bubbleEl);
    rowEl.appendChild(avatarEl);
    rowEl.appendChild(contentEl);

    this.streamEl.appendChild(rowEl);
    return { id: msgId, rowEl, contentEl, bubbleEl };
  }

  async streamResponse(bubbleEl, markdownText) {
    bubbleEl.innerHTML = '';
    const formatted = this.formatMarkdown(markdownText);
    bubbleEl.innerHTML = formatted;
  }

  formatMarkdown(text) {
    if (!text) return '';

    // 1. Process Fenced Code Blocks: ```lang\ncode\n```
    const codeBlockRegex = /```([a-zA-Z0-9_\-\+#]*)?\n([\s\S]*?)```/g;
    let formatted = text.replace(codeBlockRegex, (match, lang, code) => {
      const language = (lang || 'code').trim().toUpperCase();
      const escapedCode = code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      
      const blockId = `cb_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      return `<div class="code-block-container" id="${blockId}">
        <div class="code-block-header">
          <span class="code-block-lang">${language}</span>
          <button type="button" class="btn-copy-code" data-code="${encodeURIComponent(code)}" title="Copy code">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            <span>Copy</span>
          </button>
        </div>
        <pre class="code-block-pre"><code>${escapedCode}</code></pre>
      </div>`;
    });

    // 2. Handle Markdown Tables
    const tableRegex = /\|(.+)\|\n\| *[-:| ]+ *\|\n((?:\|.*\|\n?)+)/g;
    formatted = formatted.replace(tableRegex, (match, headerRow, bodyRows) => {
      const headers = headerRow.split('|').map(h => h.trim()).filter(Boolean);
      const rows = bodyRows.trim().split('\n').map(r => r.split('|').map(c => c.trim()).filter(Boolean));
      
      let html = '<div class="table-responsive"><table class="markdown-table"><thead><tr>';
      headers.forEach(h => html += `<th>${h}</th>`);
      html += '</tr></thead><tbody>';
      rows.forEach(r => {
        html += '<tr>';
        r.forEach(c => html += `<td>${c}</td>`);
        html += '</tr>';
      });
      html += '</tbody></table></div>';
      return html;
    });

    // 3. Headers & Formatting
    formatted = formatted
      .replace(/^### (.*?)$/gm, '<h3>$1</h3>')
      .replace(/^## (.*?)$/gm, '<h2>$1</h2>')
      .replace(/^# (.*?)$/gm, '<h1>$1</h1>')
      .replace(/^> (.*?)$/gm, '<blockquote>$1</blockquote>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
      .replace(/^\s*-\s+(.*?)$/gm, '<li>$1</li>')
      .replace(/^\s*\d+\.\s+(.*?)$/gm, '<li class="numbered">$1</li>')
      .replace(/\n\n/g, '</p><p>');

    formatted = `<p>${formatted}</p>`
      .replace(/<p><div class="code-block-container"/g, '<div class="code-block-container"')
      .replace(/<p><div class="table-responsive">/g, '<div class="table-responsive">')
      .replace(/<\/div><\/p>/g, '</div>')
      .replace(/(<li class="numbered">.*?<\/li>)+/g, '<ol>$&</ol>')
      .replace(/(<li>.*?<\/li>)+/g, '<ul>$&</ul>')
      .replace(/<p><\/p>/g, '');

    return formatted;
  }

  setupEventListeners() {
    // Send message on Enter (without Shift)
    this.inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.handleSend();
      }
    });

    // Auto resize input textarea
    this.inputEl.addEventListener('input', () => {
      this.inputEl.style.height = 'auto';
      this.inputEl.style.height = `${Math.min(this.inputEl.scrollHeight, 150)}px`;
    });

    // Send button click
    this.sendBtn.addEventListener('click', () => this.handleSend());

    // Welcome Prompt Chips click
    document.querySelectorAll('.prompt-chips .chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const prompt = chip.getAttribute('data-prompt');
        this.inputEl.value = prompt;
        this.handleSend();
      });
    });

    // Voice input button
    this.voiceBtn.addEventListener('click', () => this.toggleVoiceInput());

    // File attachment simulation
    this.attachBtn.addEventListener('click', () => {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = '.pdf,.doc,.docx,.png,.jpg,.jpeg';
      fileInput.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
          window.app.showToast(`Document "${file.name}" uploaded for compliance inspection.`, 'info');
          this.inputEl.value = `Attached document: ${file.name}. Please inspect applicable Indian Standards and tests.`;
          this.handleSend();
        }
      };
      fileInput.click();
    });
  }

  setupSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;

      this.recognition.onstart = () => {
        this.isListening = true;
        this.voiceBtn.classList.add('listening');
        window.app.showToast('Listening... Speak your BIS query', 'info');
      };

      this.recognition.onresult = (e) => {
        const transcript = e.results[0][0].transcript;
        this.inputEl.value = transcript;
        this.isListening = false;
        this.voiceBtn.classList.remove('listening');
        this.handleSend();
      };

      this.recognition.onerror = () => {
        this.isListening = false;
        this.voiceBtn.classList.remove('listening');
      };

      this.recognition.onend = () => {
        this.isListening = false;
        this.voiceBtn.classList.remove('listening');
      };
    } else {
      this.voiceBtn.style.display = 'none';
    }
  }

  toggleVoiceInput() {
    if (!this.recognition) return;
    if (this.isListening) {
      this.recognition.stop();
    } else {
      const langMap = {
        'en': 'en-IN',
        'hi': 'hi-IN',
        'ta': 'ta-IN',
        'te': 'te-IN',
        'bn': 'bn-IN',
        'mr': 'mr-IN',
        'gu': 'gu-IN'
      };
      this.recognition.lang = langMap[window.i18n.currentLang] || 'en-IN';
      this.recognition.start();
    }
  }

  async handleSend(customText = null) {
    const text = (customText || this.inputEl.value).trim();
    if (!text || this.isStreaming) return;

    // Reset input
    this.inputEl.value = '';
    this.inputEl.style.height = 'auto';

    // Hide welcome screen
    if (this.welcomeEl) {
      this.welcomeEl.style.display = 'none';
    }

    // Append User Message
    this.appendMessage('user', text);
    this.messages.push({ role: 'user', text, timestamp: new Date().toISOString() });

    // Append Assistant Message with Typing Indicator
    const assistantMsgObj = this.appendMessage('assistant', '', true);

    this.isStreaming = true;
    this.sendBtn.disabled = true;

    try {
      const lang = window.i18n.currentLang;
      const res = await window.apiClient.sendChat({
        message: text,
        conversation_id: this.conversationId,
        clarifications: this.clarificationState,
        language: lang
      });

      // Stream / Render formatted response text
      await this.streamResponse(assistantMsgObj.bubbleEl, res.answer);

      // Remove typing indicator
      assistantMsgObj.rowEl.querySelector('.typing-indicator')?.remove();

      // Render Inline Standard Card if returned
      if (res.standards && res.standards.length > 0) {
        this.renderInlineStandardCard(assistantMsgObj.contentEl, res.standards[0], res.citations);
      }

      // Render Clarification Card if needed
      if (res.needs_clarification && res.clarification_questions && res.clarification_questions.length > 0) {
        this.renderClarificationCard(assistantMsgObj.contentEl, res.clarification_questions);
      }

      // Render Interactive Follow-Up Chips (ChatGPT-Style Suggestions)
      if (res.suggested_followups && res.suggested_followups.length > 0) {
        this.renderFollowUpChips(assistantMsgObj.contentEl, res.suggested_followups);
      }

      // Render Official Next Action links
      if (res.official_actions && res.official_actions.length > 0) {
        this.renderOfficialActions(assistantMsgObj.contentEl, res.official_actions);
      }

      // Add message actions (Copy, Speak, Translate, Feedback)
      this.renderMessageActions(assistantMsgObj.contentEl, res.answer, assistantMsgObj.id, assistantMsgObj.bubbleEl);

      // Auto-speak if enabled
      if (this.autoSpeak) {
        setTimeout(() => {
          const speakBtn = assistantMsgObj.contentEl.querySelector('.btn-speaker');
          this.speakText(res.answer, speakBtn);
        }, 400);
      }

      // Save to local message array
      this.messages.push({
        role: 'assistant',
        text: res.answer,
        payload: res,
        timestamp: new Date().toISOString()
      });

      // Save/sync session in sidebar
      window.app.saveSession(this.conversationId, text.slice(0, 32), this.messages);

    } catch (err) {
      console.error(err);
      assistantMsgObj.bubbleEl.innerHTML = `<p style="color: #f43f5e;">⚠️ Error connecting to BIS Assistant server. Please check connection.</p>`;
    } finally {
      this.isStreaming = false;
      this.sendBtn.disabled = false;
      this.scrollToBottom();
    }
  }

  appendMessage(role, text, isTyping = false) {
    const msgId = `msg_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const rowEl = document.createElement('div');
    rowEl.className = `message-row ${role}`;
    rowEl.id = msgId;

    const avatarEl = document.createElement('div');
    avatarEl.className = 'message-avatar';
    avatarEl.innerHTML = role === 'user' ? '👤' : '🇮🇳';

    const contentEl = document.createElement('div');
    contentEl.className = 'message-content';

    const bubbleEl = document.createElement('div');
    bubbleEl.className = 'message-bubble';

    if (isTyping) {
      bubbleEl.innerHTML = `
        <div class="typing-indicator">
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
        </div>
      `;
    } else {
      bubbleEl.innerHTML = this.formatMarkdown(text);
    }

    contentEl.appendChild(bubbleEl);
    rowEl.appendChild(avatarEl);
    rowEl.appendChild(contentEl);

    this.streamEl.appendChild(rowEl);
    this.scrollToBottom();

    return { id: msgId, rowEl, contentEl, bubbleEl };
  }

  async streamResponse(bubbleEl, markdownText) {
    bubbleEl.innerHTML = '';
    const formatted = this.formatMarkdown(markdownText);
    bubbleEl.innerHTML = formatted;
    this.scrollToBottom();
  }

  formatMarkdown(text) {
    if (!text) return '';

    // Handle Markdown Tables first
    const tableRegex = /\|(.+)\|\n\| *[-:| ]+ *\|\n((?:\|.*\|\n?)+)/g;
    let formatted = text.replace(tableRegex, (match, headerRow, bodyRows) => {
      const headers = headerRow.split('|').map(h => h.trim()).filter(Boolean);
      const rows = bodyRows.trim().split('\n').map(r => r.split('|').map(c => c.trim()).filter(Boolean));
      
      let html = '<div class="table-responsive"><table class="markdown-table"><thead><tr>';
      headers.forEach(h => html += `<th>${h}</th>`);
      html += '</tr></thead><tbody>';
      rows.forEach(r => {
        html += '<tr>';
        r.forEach(c => html += `<td>${c}</td>`);
        html += '</tr>';
      });
      html += '</tbody></table></div>';
      return html;
    });

    // Headers & Formatting
    formatted = formatted
      .replace(/### (.*?)\n/g, '<h3>$1</h3>')
      .replace(/## (.*?)\n/g, '<h2>$1</h2>')
      .replace(/# (.*?)\n/g, '<h1>$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
      .replace(/^\s*-\s+(.*?)$/gm, '<li>$1</li>')
      .replace(/^\s*\d+\.\s+(.*?)$/gm, '<li class="numbered">$1</li>')
      .replace(/\n\n/g, '</p><p>');

    formatted = `<p>${formatted}</p>`
      .replace(/<p><div class="table-responsive">/g, '<div class="table-responsive">')
      .replace(/<\/div><\/p>/g, '</div>')
      .replace(/(<li class="numbered">.*?<\/li>)+/g, '<ol>$&</ol>')
      .replace(/(<li>.*?<\/li>)+/g, '<ul>$&</ul>')
      .replace(/<p><\/p>/g, '');

    return formatted;
  }

  renderInlineStandardCard(containerEl, standard, citations = []) {
    const card = document.createElement('div');
    card.className = 'standard-highlight-card';
    card.innerHTML = `
      <div class="std-card-top">
        <span class="is-badge">${standard.is_number}</span>
        <span class="scheme-tag">${standard.scheme}</span>
      </div>
      <div class="std-card-title">${standard.title}</div>
      <div class="std-card-actions">
        <button class="btn-evidence-trigger" data-is="${standard.is_number}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          <span>View Clause Evidence (${citations ? citations.length : 0} Citations)</span>
        </button>
      </div>
    `;

    card.querySelector('.btn-evidence-trigger').addEventListener('click', () => {
      window.app.openEvidenceDrawer(standard.is_number);
    });

    containerEl.appendChild(card);
  }

  renderClarificationCard(containerEl, questions) {
    const card = document.createElement('div');
    card.className = 'clarification-card';
    
    let html = `
      <div class="clarification-header">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <span>Please select product details to refine the exact testing roadmap:</span>
      </div>
    `;

    questions.forEach(q => {
      html += `
        <div class="clarification-group">
          <label style="font-weight: 600; font-size: 13px; color: var(--text-primary);">${q.text}</label>
          <div class="option-chips" data-field="${q.field}">
            ${q.options.map(opt => `<button type="button" class="option-pill" data-val="${opt}">${opt}</button>`).join('')}
          </div>
        </div>
      `;
    });

    html += `<button class="btn-clarify-confirm">Confirm & Get Grounded Roadmap</button>`;
    card.innerHTML = html;

    // Option chip selection
    card.querySelectorAll('.option-pill').forEach(pill => {
      pill.addEventListener('click', (e) => {
        const parent = e.target.closest('.option-chips');
        parent.querySelectorAll('.option-pill').forEach(p => p.classList.remove('selected'));
        e.target.classList.add('selected');
        const field = parent.getAttribute('data-field');
        this.clarificationState[field] = e.target.getAttribute('data-val');
      });
    });

    // Confirm button
    card.querySelector('.btn-clarify-confirm').addEventListener('click', () => {
      const summary = Object.entries(this.clarificationState).map(([k, v]) => `${k}: ${v}`).join(', ');
      this.handleSend(`Confirmed attributes: ${summary}`);
      card.remove();
    });

    containerEl.appendChild(card);
  }

  renderFollowUpChips(containerEl, followups) {
    const chipWrapper = document.createElement('div');
    chipWrapper.className = 'followup-suggestions-wrapper';
    chipWrapper.innerHTML = `
      <div class="followup-title">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
        <span>Suggested Follow-ups:</span>
      </div>
      <div class="followup-chips-row"></div>
    `;

    const row = chipWrapper.querySelector('.followup-chips-row');
    followups.forEach(qText => {
      const chip = document.createElement('button');
      chip.className = 'followup-chip-btn';
      chip.textContent = qText;
      chip.addEventListener('click', () => {
        this.inputEl.value = qText;
        this.handleSend();
      });
      row.appendChild(chip);
    });

    containerEl.appendChild(chipWrapper);
  }

  renderOfficialActions(containerEl, actions) {
    const actContainer = document.createElement('div');
    actContainer.style.display = 'flex';
    actContainer.style.flexWrap = 'wrap';
    actContainer.style.gap = '8px';
    actContainer.style.marginTop = '10px';

    actions.forEach(act => {
      const link = document.createElement('a');
      link.href = act.url;
      link.target = '_blank';
      link.rel = 'noopener';
      link.className = 'btn-msg-action';
      link.style.background = 'var(--bg-tertiary)';
      link.style.border = '1px solid var(--border-color)';
      link.innerHTML = `
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        <span>${act.title} (${act.portal})</span>
      `;
      actContainer.appendChild(link);
    });

    containerEl.appendChild(actContainer);
  }

  initVoices() {
    if ('speechSynthesis' in window) {
      this.voices = window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        this.voices = window.speechSynthesis.getVoices();
      };
    }

    // Stop speaking when user changes language
    window.addEventListener('languageChanged', (e) => {
      const newLang = e.detail.lang;
      if (this.isSpeaking) {
        this.stopSpeaking();
      }
      if (this.recognition) {
        const langMap = {
          'en': 'en-IN',
          'hi': 'hi-IN',
          'ta': 'ta-IN',
          'te': 'te-IN',
          'bn': 'bn-IN',
          'mr': 'mr-IN',
          'gu': 'gu-IN'
        };
        this.recognition.lang = langMap[newLang] || 'en-IN';
      }
    });
  }

  setupSpeakerToggle() {
    const toggleBtn = document.getElementById('speakerToggleBtn');
    if (toggleBtn) {
      if (this.autoSpeak) toggleBtn.classList.add('active');
      toggleBtn.addEventListener('click', () => {
        this.autoSpeak = !this.autoSpeak;
        localStorage.setItem('bis_auto_speak', this.autoSpeak ? 'true' : 'false');
        toggleBtn.classList.toggle('active', this.autoSpeak);
        window.app.showToast(this.autoSpeak ? 'Auto-speak enabled for responses' : 'Auto-speak disabled', 'info');
      });
    }
  }

  renderMessageActions(containerEl, text, msgId, bubbleEl = null) {
    const actBar = document.createElement('div');
    actBar.className = 'message-actions';

    // Interactive Speaker (TTS) Button
    const speakBtn = document.createElement('button');
    speakBtn.className = 'btn-msg-action btn-speaker';
    speakBtn.setAttribute('title', window.i18n.t('speaker_tooltip'));
    speakBtn.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
      <span>${window.i18n.t('btn_listen')}</span>
    `;
    speakBtn.onclick = () => {
      this.speakText(text, speakBtn);
    };

    // Translate to Active Language Button
    const transBtn = document.createElement('button');
    transBtn.className = 'btn-msg-action btn-translate-action';
    transBtn.setAttribute('title', 'Translate response to currently selected language');
    transBtn.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
      <span>${window.i18n.t('btn_translate')}</span>
    `;
    transBtn.onclick = async () => {
      if (!bubbleEl) return;
      const origText = transBtn.innerHTML;
      transBtn.innerHTML = `<span>Translating...</span>`;
      transBtn.disabled = true;
      try {
        const targetLang = window.i18n.currentLang;
        const res = await window.apiClient.translate({ text, target_language: targetLang });
        if (res && res.translated_text) {
          bubbleEl.innerHTML = this.formatMarkdown(res.translated_text);
          text = res.translated_text; // update reference for speaking
          window.app.showToast(`Translated to ${window.i18n.t('lang_name') || targetLang}`, 'success');
        }
      } catch (e) {
        console.error('Translation failed:', e);
        window.app.showToast('Translation service unavailable', 'warning');
      } finally {
        transBtn.innerHTML = origText;
        transBtn.disabled = false;
      }
    };

    // Copy text button
    const copyBtn = document.createElement('button');
    copyBtn.className = 'btn-msg-action';
    copyBtn.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
      <span>${window.i18n.t('btn_copy')}</span>
    `;
    copyBtn.onclick = () => {
      navigator.clipboard.writeText(text);
      window.app.showToast('Copied to clipboard!', 'success');
    };

    // Feedback thumbs
    const upBtn = document.createElement('button');
    upBtn.className = 'btn-msg-action';
    upBtn.innerHTML = `👍 Accurate`;
    upBtn.onclick = () => {
      window.apiClient.sendFeedback({ conversation_id: this.conversationId, rating: 5, comment: 'Accurate' });
      window.app.showToast('Thank you for rating!', 'success');
      upBtn.disabled = true;
    };

    const downBtn = document.createElement('button');
    downBtn.className = 'btn-msg-action';
    downBtn.innerHTML = `👎 Issue`;
    downBtn.onclick = () => {
      window.apiClient.sendFeedback({ conversation_id: this.conversationId, rating: 1, issue_type: 'citation_missing' });
      window.app.showToast('Feedback submitted for review', 'info');
      downBtn.disabled = true;
    };

    actBar.appendChild(speakBtn);
    actBar.appendChild(transBtn);
    actBar.appendChild(copyBtn);
    actBar.appendChild(upBtn);
    actBar.appendChild(downBtn);

    containerEl.appendChild(actBar);
  }

  prepareTextForSpeech(text) {
    if (!text) return '';
    return text
      .replace(/```[\s\S]*?```/g, '') // remove code blocks
      .replace(/\|.*\|/g, '') // remove markdown table lines
      .replace(/https?:\/\/\S+/g, '') // remove URLs
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // [text](url) -> text
      .replace(/[#*_~`><]/g, '') // strip markdown symbols
      .replace(/[-•]/g, ' ') // bullets
      .replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '') // emojis
      .replace(/\s+/g, ' ')
      .trim();
  }

  getBestVoiceForLang(langCode) {
    const langTagMap = {
      'en': 'en-IN',
      'hi': 'hi-IN',
      'ta': 'ta-IN',
      'te': 'te-IN',
      'bn': 'bn-IN',
      'mr': 'mr-IN',
      'gu': 'gu-IN'
    };
    const tag = langTagMap[langCode] || 'en-IN';
    const prefix = tag.split('-')[0];

    // 1. Exact match (e.g. hi-IN)
    let voice = this.voices.find(v => v.lang.toLowerCase() === tag.toLowerCase());
    // 2. Prefix match (e.g. hi)
    if (!voice) {
      voice = this.voices.find(v => v.lang.toLowerCase().startsWith(prefix));
    }
    // 3. Fallback for Indian English
    if (!voice && prefix === 'en') {
      voice = this.voices.find(v => v.lang.toLowerCase().includes('en'));
    }
    return { voice, tag };
  }

  speakText(text, btnElement = null) {
    if (!('speechSynthesis' in window)) {
      window.app.showToast('Text-to-speech not supported in this browser.', 'warning');
      return;
    }

    // Toggle off if already speaking this element
    if (this.isSpeaking && this.activeSpeakerBtn === btnElement) {
      this.stopSpeaking();
      return;
    }

    // Stop active speech
    this.stopSpeaking();

    const cleanText = this.prepareTextForSpeech(text);
    if (!cleanText) return;

    const lang = window.i18n.currentLang;
    const { voice, tag } = this.getBestVoiceForLang(lang);

    // Sentence chunking prevents Chrome 15s freeze
    const sentences = cleanText.match(/[^.!?\n]+[.!?\n]+/g) || [cleanText];
    let currentIdx = 0;
    this.isSpeaking = true;
    this.activeSpeakerBtn = btnElement;

    if (btnElement) {
      btnElement.classList.add('speaking');
      btnElement.innerHTML = `
        <span class="eq-bars">
          <span class="eq-bar"></span>
          <span class="eq-bar"></span>
          <span class="eq-bar"></span>
          <span class="eq-bar"></span>
        </span>
        <span>${window.i18n.t('btn_stop')}</span>
      `;
    }

    this.showFloatingAudioBanner(lang);

    const speakNextChunk = () => {
      if (!this.isSpeaking || currentIdx >= sentences.length) {
        this.stopSpeaking();
        return;
      }

      const chunk = sentences[currentIdx].trim();
      currentIdx++;
      if (!chunk) {
        speakNextChunk();
        return;
      }

      const utterance = new SpeechSynthesisUtterance(chunk);
      utterance.lang = tag;
      if (voice) utterance.voice = voice;
      utterance.rate = 0.95;

      utterance.onend = () => {
        speakNextChunk();
      };

      utterance.onerror = (e) => {
        console.warn('SpeechSynthesis error:', e);
        this.stopSpeaking();
      };

      window.speechSynthesis.speak(utterance);
    };

    speakNextChunk();
  }

  stopSpeaking() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.isSpeaking = false;
    if (this.activeSpeakerBtn) {
      this.activeSpeakerBtn.classList.remove('speaking');
      this.activeSpeakerBtn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
        <span>${window.i18n.t('btn_listen')}</span>
      `;
      this.activeSpeakerBtn = null;
    }
    this.removeFloatingAudioBanner();
  }

  showFloatingAudioBanner(langCode) {
    this.removeFloatingAudioBanner();
    const banner = document.createElement('div');
    banner.className = 'floating-audio-banner';
    banner.id = 'floatingAudioBanner';
    const langName = window.i18n.t('lang_name') || langCode.toUpperCase();

    banner.innerHTML = `
      <span class="eq-bars">
        <span class="eq-bar"></span>
        <span class="eq-bar"></span>
        <span class="eq-bar"></span>
      </span>
      <span>Reading output aloud</span>
      <span class="banner-lang-tag">${langName}</span>
      <button type="button" class="btn-stop-audio">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>
        <span>Stop</span>
      </button>
    `;

    banner.querySelector('.btn-stop-audio').addEventListener('click', () => {
      this.stopSpeaking();
    });

    this.streamEl.prepend(banner);
    this.activeAudioBanner = banner;
  }

  removeFloatingAudioBanner() {
    if (this.activeAudioBanner) {
      this.activeAudioBanner.remove();
      this.activeAudioBanner = null;
    }
    const existing = document.getElementById('floatingAudioBanner');
    if (existing) existing.remove();
  }

  /**
   * Load and render an entire past conversation session into the chat view
   */
  loadSession(sessionData) {
    if (!sessionData) return;

    this.conversationId = sessionData.id;
    this.messages = sessionData.messages || [];
    this.streamEl.innerHTML = '';

    if (this.messages.length === 0) {
      if (this.welcomeEl) {
        this.streamEl.appendChild(this.welcomeEl);
        this.welcomeEl.style.display = 'flex';
      }
      return;
    }

    // Hide welcome card
    if (this.welcomeEl) {
      this.welcomeEl.style.display = 'none';
    }

    // Replay each message in history
    this.messages.forEach(msg => {
      const msgObj = this.appendMessage(msg.role, msg.text || msg.content);
      
      if (msg.role === 'assistant' && msg.payload) {
        const payload = msg.payload;

        if (payload.standards && payload.standards.length > 0) {
          this.renderInlineStandardCard(msgObj.contentEl, payload.standards[0], payload.citations);
        }

        if (payload.needs_clarification && payload.clarification_questions && payload.clarification_questions.length > 0) {
          this.renderClarificationCard(msgObj.contentEl, payload.clarification_questions);
        }

        if (payload.suggested_followups && payload.suggested_followups.length > 0) {
          this.renderFollowUpChips(msgObj.contentEl, payload.suggested_followups);
        }

        if (payload.official_actions && payload.official_actions.length > 0) {
          this.renderOfficialActions(msgObj.contentEl, payload.official_actions);
        }

        this.renderMessageActions(msgObj.contentEl, msg.text || msg.content, msgObj.id, msgObj.bubbleEl);
      }
    });

    this.scrollToBottom();
  }

  resetChat() {
    this.stopSpeaking();
    this.conversationId = `conv_${Date.now()}`;
    this.messages = [];
    this.streamEl.innerHTML = '';
    if (this.welcomeEl) {
      this.streamEl.appendChild(this.welcomeEl);
      this.welcomeEl.style.display = 'flex';
    }
    this.clarificationState = {};
  }

  scrollToBottom() {
    this.streamEl.scrollTop = this.streamEl.scrollHeight;
  }
}

window.chatController = new ChatController();
