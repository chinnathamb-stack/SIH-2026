/**
 * BIS AI Intelligent Assistant - Product Analyzer & Compliance Dashboard
 * SIH Problem Statement 26107
 */

class ComplianceDashboard {
  constructor() {
    this.form = document.getElementById('productAnalysisForm');
    this.placeholderEl = document.getElementById('analyzerPlaceholder');
    this.displayEl = document.getElementById('analyzerDisplay');
    this.currentData = null;
    this.completedTasks = new Set();
  }

  init() {
    this.setupEventListeners();
  }

  setupEventListeners() {
    if (this.form) {
      this.form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.runAnalysis();
      });
    }
  }

  async runAnalysis() {
    const name = document.getElementById('prodName').value.trim();
    const category = document.getElementById('prodCategory').value;
    const material = document.getElementById('prodMaterial').value;
    const voltage = document.getElementById('prodVoltage').value;
    const capacity = document.getElementById('prodCapacity').value;
    const market = document.getElementById('prodMarket').value;

    this.placeholderEl.style.display = 'none';
    this.displayEl.style.display = 'block';
    this.displayEl.innerHTML = `
      <div style="text-align: center; padding: 40px;">
        <div class="typing-indicator" style="margin: 0 auto 12px auto;">
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
        </div>
        <p style="color: var(--text-secondary);">Analyzing Indian Standards knowledge base & testing mandates...</p>
      </div>
    `;

    try {
      const res = await window.apiClient.analyzeProduct({
        description: name,
        category,
        attributes: { material, voltage, capacity, market }
      });

      this.currentData = res;
      this.completedTasks.clear();
      this.renderDashboard(res);
      window.app.showToast('Compliance Roadmap successfully generated!', 'success');
    } catch (err) {
      console.error(err);
      this.displayEl.innerHTML = `<p style="color: #f43f5e;">Analysis failed. Please retry.</p>`;
    }
  }

  renderDashboard(data) {
    const std = data.standard;
    const profile = data.product_profile;
    const totalTasks = data.checklist.length;
    const completedCount = this.completedTasks.size;
    const score = Math.round(((completedCount / totalTasks) * 60) + 40);

    this.displayEl.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
        <div>
          <span class="is-badge">${profile.applicable_is}</span>
          <h3 style="font-size: 17px; font-weight: 700; color: var(--text-primary); margin-top: 6px;">${std.title}</h3>
          <span style="font-size: 12px; color: var(--accent-green);">● Mandatory under ${std.mandatory_order}</span>
        </div>
        <button class="btn-primary" id="exportPlanBtn" style="font-size: 12px; padding: 6px 12px;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          <span>Export Plan</span>
        </button>
      </div>

      <!-- Readiness Score Bar -->
      <div style="background: var(--bg-secondary); padding: 14px; border-radius: var(--radius-md); margin-bottom: 16px; border: 1px solid var(--border-color);">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 13px; font-weight: 600; color: var(--text-primary);">BIS Compliance Readiness Score</span>
          <span style="font-size: 15px; font-weight: 800; color: #60a5fa;" id="readinessScoreVal">${score}%</span>
        </div>
        <div class="progress-bar-wrapper">
          <div class="progress-bar-fill" id="readinessProgressBar" style="width: ${score}%;"></div>
        </div>
        <span style="font-size: 11.5px; color: var(--text-muted);">Check off items in the checklist below to track preparation progress.</span>
      </div>

      <!-- Interactive Compliance Checklist -->
      <h4 style="font-size: 14px; font-weight: 700; color: var(--text-primary); margin-bottom: 8px;">1. Preparation & Licensing Checklist</h4>
      <div class="checklist-container" id="checklistItems">
        ${data.checklist.map((item, idx) => `
          <div class="checklist-item ${this.completedTasks.has(item.id) ? 'completed' : ''}" data-id="${item.id}">
            <input type="checkbox" class="checklist-checkbox" id="chk_${item.id}" ${this.completedTasks.has(item.id) ? 'checked' : ''}>
            <div class="checklist-info">
              <label for="chk_${item.id}" class="checklist-task">${idx + 1}. ${item.task}</label>
              <div><span class="checklist-tag">${item.category}</span></div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Required Routine & Type Tests -->
      <h4 style="font-size: 14px; font-weight: 700; color: var(--text-primary); margin: 20px 0 8px 0;">2. Mandatory Testing Schedule (${std.tests ? std.tests.length : 0} Tests)</h4>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        ${(std.tests || []).map(t => `
          <div style="background: var(--bg-secondary); padding: 10px 14px; border-radius: var(--radius-sm); border-left: 3px solid #3b82f6; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <strong style="font-size: 13px; color: var(--text-primary);">${t.name}</strong>
              <div style="font-size: 11.5px; color: var(--text-muted);">${t.standard_ref}</div>
            </div>
            <span class="scope-pill">${t.frequency}</span>
          </div>
        `).join('')}
      </div>

      <!-- Official Application Deep Links -->
      <div style="margin-top: 20px; background: rgba(59, 130, 246, 0.08); border: 1px solid rgba(59, 130, 246, 0.2); padding: 14px; border-radius: var(--radius-md);">
        <strong style="font-size: 13px; color: #60a5fa;">Official Application Portal:</strong>
        <p style="font-size: 12.5px; color: var(--text-secondary); margin: 4px 0 10px 0;">Submit factory layout and apply for Grant of Licence on Manakonline.</p>
        <a href="https://www.manakonline.in/" target="_blank" rel="noopener" class="btn-primary" style="font-size: 12px; padding: 6px 14px;">
          <span>Open Manakonline Portal</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        </a>
      </div>
    `;

    // Checkbox toggles
    this.displayEl.querySelectorAll('.checklist-checkbox').forEach(cb => {
      cb.addEventListener('change', (e) => {
        const itemEl = e.target.closest('.checklist-item');
        const id = itemEl.getAttribute('data-id');
        if (e.target.checked) {
          this.completedTasks.add(id);
          itemEl.classList.add('completed');
        } else {
          this.completedTasks.delete(id);
          itemEl.classList.remove('completed');
        }
        this.updateProgress(totalTasks);
      });
    });

    // Export plan button
    const exportBtn = this.displayEl.querySelector('#exportPlanBtn');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => this.exportPlanJSON());
    }
  }

  updateProgress(totalTasks) {
    const completedCount = this.completedTasks.size;
    const score = Math.round(((completedCount / totalTasks) * 60) + 40);
    const scoreVal = document.getElementById('readinessScoreVal');
    const progressBar = document.getElementById('readinessProgressBar');
    if (scoreVal) scoreVal.textContent = `${score}%`;
    if (progressBar) progressBar.style.width = `${score}%`;
  }

  exportPlanJSON() {
    if (!this.currentData) return;
    const exportData = {
      ...this.currentData,
      completed_tasks: Array.from(this.completedTasks),
      exported_at: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `BIS_Compliance_Roadmap_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    window.app.showToast('Compliance Roadmap exported to JSON', 'success');
  }
}

window.complianceDashboard = new ComplianceDashboard();
