/**
 * BIS AI Intelligent Assistant - Standards Explorer
 * SIH Problem Statement 26107
 */

class StandardsExplorer {
  constructor() {
    this.gridEl = document.getElementById('standardsGrid');
    this.searchInput = document.getElementById('standardSearchInput');
    this.categoryFilter = document.getElementById('standardCategoryFilter');
    this.standards = [];
  }

  async init() {
    this.setupEventListeners();
    await this.fetchStandards();
  }

  setupEventListeners() {
    let debounceTimer;
    this.searchInput.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => this.fetchStandards(), 250);
    });

    this.categoryFilter.addEventListener('change', () => {
      this.fetchStandards();
    });
  }

  async fetchStandards() {
    const query = this.searchInput.value.trim();
    const category = this.categoryFilter.value;

    try {
      const res = await window.apiClient.searchStandards(query, category);
      this.standards = res.standards || [];
      this.renderStandards();
    } catch (err) {
      console.error(err);
      this.gridEl.innerHTML = `<p style="color: #f43f5e;">Error loading standards.</p>`;
    }
  }

  renderStandards() {
    this.gridEl.innerHTML = '';

    if (this.standards.length === 0) {
      this.gridEl.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">
          <p>No Indian Standards found matching your search.</p>
        </div>
      `;
      return;
    }

    this.standards.forEach(std => {
      const card = document.createElement('div');
      card.className = 'standard-card';
      card.innerHTML = `
        <div>
          <div class="card-badge-row">
            <span class="is-badge">${std.is_number}</span>
            <span class="scheme-tag">${std.scheme.split(' ')[0]}</span>
          </div>
          <h3 class="card-main-title">${std.title}</h3>
          <p class="card-desc">${std.scope}</p>
          <div class="scope-chips">
            <span class="scope-pill">Version: ${std.version}</span>
            <span class="scope-pill">${(std.clauses || []).length} Indexed Clauses</span>
            <span class="scope-pill">${(std.tests || []).length} Standard Tests</span>
          </div>
        </div>
        <div style="display: flex; gap: 8px; margin-top: 14px;">
          <button class="btn-primary" style="flex: 1;" data-action="evidence" data-is="${std.is_number}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            <span>View Clauses & Tests</span>
          </button>
          <a href="${std.source_url}" target="_blank" rel="noopener" class="btn-icon" title="Open in Know Your Standard">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>
        </div>
      `;

      card.querySelector('[data-action="evidence"]').addEventListener('click', () => {
        window.app.openEvidenceDrawer(std.is_number);
      });

      this.gridEl.appendChild(card);
    });
  }
}

window.standardsExplorer = new StandardsExplorer();
