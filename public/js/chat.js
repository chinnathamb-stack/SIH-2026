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
  }

  init() {
    this.setupEventListeners();
    this.setupSpeechRecognition();
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
      const lang = window.i18n.currentLang;
      if (lang === 'ta') this.recognition.lang = 'ta-IN';
      else if (lang === 'hi') this.recognition.lang = 'hi-IN';
      else this.recognition.lang = 'en-IN';
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

      // Add message actions (Copy, Speak, Feedback)
      this.renderMessageActions(assistantMsgObj.contentEl, res.answer, assistantMsgObj.id);

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

  renderMessageActions(containerEl, text, msgId) {
    const actBar = document.createElement('div');
    actBar.className = 'message-actions';

    // Copy text button
    const copyBtn = document.createElement('button');
    copyBtn.className = 'btn-msg-action';
    copyBtn.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
      <span>Copy</span>
    `;
    copyBtn.onclick = () => {
      navigator.clipboard.writeText(text);
      window.app.showToast('Copied to clipboard!', 'success');
    };

    // Text to speech button
    const speakBtn = document.createElement('button');
    speakBtn.className = 'btn-msg-action';
    speakBtn.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
      <span>Speak</span>
    `;
    speakBtn.onclick = () => {
      this.speakText(text);
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

    actBar.appendChild(copyBtn);
    actBar.appendChild(speakBtn);
    actBar.appendChild(upBtn);
    actBar.appendChild(downBtn);

    containerEl.appendChild(actBar);
  }

  speakText(text) {
    if (!('speechSynthesis' in window)) {
      window.app.showToast('Text-to-speech not supported in this browser.', 'warning');
      return;
    }
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*#`_\[\]]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    const lang = window.i18n.currentLang;
    if (lang === 'ta') utterance.lang = 'ta-IN';
    else if (lang === 'hi') utterance.lang = 'hi-IN';
    else utterance.lang = 'en-IN';
    window.speechSynthesis.speak(utterance);
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

        this.renderMessageActions(msgObj.contentEl, msg.text || msg.content, msgObj.id);
      }
    });

    this.scrollToBottom();
  }

  resetChat() {
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
