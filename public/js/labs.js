/**
 * BIS AI Intelligent Assistant - Laboratory Finder (LIMS)
 * SIH Problem Statement 26107
 */

class LaboratoryFinder {
  constructor() {
    this.gridEl = document.getElementById('labsGrid');
    this.searchInput = document.getElementById('labSearchInput');
    this.stateFilter = document.getElementById('labStateFilter');
    this.laboratories = [];
  }

  async init() {
    this.setupEventListeners();
    await this.populateStates();
    await this.fetchLabs();
  }

  setupEventListeners() {
    let debounceTimer;
    this.searchInput.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => this.fetchLabs(), 250);
    });

    this.stateFilter.addEventListener('change', () => {
      this.fetchLabs();
    });

    window.addEventListener('languageChanged', () => {
      this.renderLabs();
    });
  }

  async populateStates() {
    try {
      if (!this.stateFilter) return;
      let states = [];
      if (window.apiClient && window.apiClient.getLabStates) {
        const res = await window.apiClient.getLabStates();
        states = res.states || [];
      }

      if (states.length > 0) {
        const currentVal = this.stateFilter.value;
        const allLabel = window.i18n ? window.i18n.t('filter_all_states') : 'All States / Regions';
        
        let html = `<option value="" data-i18n="filter_all_states">${allLabel}</option>`;
        states.forEach(st => {
          html += `<option value="${st}">${st}</option>`;
        });
        this.stateFilter.innerHTML = html;
        if (currentVal) this.stateFilter.value = currentVal;
      }
    } catch (err) {
      console.warn('Could not populate states dynamically:', err);
    }
  }

  async fetchLabs() {
    const query = this.searchInput.value.trim();
    const state = this.stateFilter.value;

    try {
      const res = await window.apiClient.searchLabs(query, state);
      this.laboratories = res.laboratories || [];
      this.renderLabs();
    } catch (err) {
      console.error(err);
      this.gridEl.innerHTML = `<p style="color: #f43f5e;">Error loading laboratory data.</p>`;
    }
  }

  renderLabs() {
    this.gridEl.innerHTML = '';
    const t = (k, fb) => (window.i18n ? window.i18n.t(k) : fb);

    if (this.laboratories.length === 0) {
      this.gridEl.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">
          <p>${t('empty_labs', 'No BIS-recognized laboratories found matching your criteria.')}</p>
        </div>
      `;
      return;
    }

    const locLabel = t('location_label', 'Location:');
    const scopesLabel = t('recognized_scopes', 'Recognized Testing Scopes:');
    const emailLabel = t('email_lab', 'Email Lab');

    this.laboratories.forEach(lab => {
      const card = document.createElement('div');
      card.className = 'lab-card';
      card.innerHTML = `
        <div>
          <div class="card-badge-row">
            <span class="is-badge">${lab.lab_code}</span>
            <span class="scheme-tag">Valid to ${lab.validity ? lab.validity.split('-')[0] : 'Active'}</span>
          </div>
          ${lab.category ? `
            <div style="display: inline-block; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: var(--accent-primary); background: rgba(59, 130, 246, 0.08); padding: 3px 8px; border-radius: 4px; margin-bottom: 8px; border: 1px solid rgba(59, 130, 246, 0.2);">
              🏛️ ${lab.category}
            </div>
          ` : ''}
          <h3 class="card-main-title">${lab.name}</h3>
          <p style="font-size: 11.5px; color: var(--accent-green); margin-bottom: 8px; font-weight: 500;">● ${lab.status}</p>
          <p class="card-desc" style="margin-bottom: 12px;">
            <strong>${locLabel}</strong> ${lab.address}, ${lab.district}, ${lab.state} - ${lab.pincode}
          </p>
          <div style="margin-bottom: 12px;">
            <strong style="font-size: 12px; color: var(--text-primary); display: block; margin-bottom: 6px;">${scopesLabel}</strong>
            <div class="scope-chips">
              ${lab.scopes.map(s => `<span class="scope-pill">${s}</span>`).join('')}
            </div>
          </div>
        </div>
        <div style="display: flex; gap: 8px; margin-top: 14px; border-top: 1px solid var(--border-color); padding-top: 12px;">
          <a href="tel:${lab.contact.phone}" class="btn-msg-action" style="background: var(--bg-tertiary);" title="Call ${lab.name}">
            <span>📞 ${lab.contact.phone}</span>
          </a>
          <a href="mailto:${lab.contact.email}" class="btn-msg-action" style="background: var(--bg-tertiary);" title="Email ${lab.name}">
            <span>✉️ ${emailLabel}</span>
          </a>
        </div>
      `;

      this.gridEl.appendChild(card);
    });
  }
}

window.laboratoryFinder = new LaboratoryFinder();
