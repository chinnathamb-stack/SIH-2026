/**
 * BIS AI Intelligent Assistant - API Client
 * SIH Problem Statement 26107
 */

const API_BASE = '/api/v1';

const apiClient = {
  // Send user message in conversational chat
  async sendChat(payload) {
    const res = await fetch(`${API_BASE}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error(`Chat API error: ${res.statusText}`);
    return await res.json();
  },

  // Analyze product specification
  async analyzeProduct(payload) {
    const res = await fetch(`${API_BASE}/products/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error(`Product analyzer API error: ${res.statusText}`);
    return await res.json();
  },

  // Search Indian Standards
  async searchStandards(query = '', category = '', status = '') {
    const res = await fetch(`${API_BASE}/standards/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, category, status })
    });
    if (!res.ok) throw new Error(`Standards search API error: ${res.statusText}`);
    return await res.json();
  },

  // Get single standard metadata
  async getStandard(isNumber) {
    const res = await fetch(`${API_BASE}/standards/${encodeURIComponent(isNumber)}`);
    if (!res.ok) throw new Error(`Get standard API error: ${res.statusText}`);
    return await res.json();
  },

  // Get standard evidence & clauses
  async getEvidence(isNumber) {
    const res = await fetch(`${API_BASE}/standards/${encodeURIComponent(isNumber)}/evidence`);
    if (!res.ok) throw new Error(`Get evidence API error: ${res.statusText}`);
    return await res.json();
  },

  // Generate structured compliance plan
  async generatePlan(payload) {
    const res = await fetch(`${API_BASE}/compliance/plan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error(`Compliance plan API error: ${res.statusText}`);
    return await res.json();
  },

  // Search laboratories
  async searchLabs(query = '', state = '', standard = '') {
    const params = new URLSearchParams({ query, state, standard });
    const res = await fetch(`${API_BASE}/labs/search?${params.toString()}`);
    if (!res.ok) throw new Error(`Lab search API error: ${res.statusText}`);
    return await res.json();
  },

  // Get official BIS services
  async getServices() {
    const res = await fetch(`${API_BASE}/services`);
    if (!res.ok) throw new Error(`Services API error: ${res.statusText}`);
    return await res.json();
  },

  // Send feedback
  async sendFeedback(payload) {
    const res = await fetch(`${API_BASE}/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error(`Feedback API error: ${res.statusText}`);
    return await res.json();
  },

  // Get system health & telemetry
  async getHealth() {
    const res = await fetch(`${API_BASE}/health`);
    if (!res.ok) throw new Error(`Health API error: ${res.statusText}`);
    return await res.json();
  }
};

window.apiClient = apiClient;
