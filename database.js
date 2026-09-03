/**
 * BIS AI Intelligent Assistant - Unified BIS Database & Knowledge Repository
 * SIH Problem Statement 26107
 * 
 * Ingests, indexes, and searches across all official BIS datasets:
 * - Indian Standards (standards.json)
 * - Testing Laboratories (laboratories.json)
 * - Official Portals & Services (services.json)
 * - Official FAQs (faqs.json)
 * - Mandatory Quality Control Orders (qco_orders.json)
 * - Interactive Knowledge Base (knowledge_base.json)
 */

const fs = require('fs');
const path = require('path');

class BISDatabase {
  constructor(dataDir = path.join(__dirname, 'data')) {
    this.dataDir = dataDir;
    this.standards = [];
    this.laboratories = [];
    this.services = [];
    this.faqs = [];
    this.qcoOrders = [];
    this.onlineInfo = null;
    this.conversationsFile = path.join(this.dataDir, 'conversations.json');
    this.conversations = new Map();
    
    this.loadAll();
  }

  loadAll() {
    try {
      this.standards = JSON.parse(fs.readFileSync(path.join(this.dataDir, 'standards.json'), 'utf8'));
    } catch (e) { this.standards = []; }

    try {
      this.laboratories = JSON.parse(fs.readFileSync(path.join(this.dataDir, 'laboratories.json'), 'utf8'));
    } catch (e) { this.laboratories = []; }

    try {
      this.services = JSON.parse(fs.readFileSync(path.join(this.dataDir, 'services.json'), 'utf8'));
    } catch (e) { this.services = []; }

    try {
      this.faqs = JSON.parse(fs.readFileSync(path.join(this.dataDir, 'faqs.json'), 'utf8'));
    } catch (e) { this.faqs = []; }

    try {
      this.qcoOrders = JSON.parse(fs.readFileSync(path.join(this.dataDir, 'qco_orders.json'), 'utf8'));
    } catch (e) { this.qcoOrders = []; }

    try {
      this.onlineInfo = JSON.parse(fs.readFileSync(path.join(this.dataDir, 'bis_online_information.json'), 'utf8'));
    } catch (e) { this.onlineInfo = null; }

    try {
      this.knowledgeBase = JSON.parse(fs.readFileSync(path.join(this.dataDir, 'knowledge_base.json'), 'utf8'));
    } catch (e) { this.knowledgeBase = {}; }

    try {
      if (fs.existsSync(this.conversationsFile)) {
        const list = JSON.parse(fs.readFileSync(this.conversationsFile, 'utf8'));
        list.forEach(c => this.conversations.set(c.id, c));
      }
    } catch (e) { this.conversations = new Map(); }
  }

  saveConversationsToDisk() {
    try {
      const list = Array.from(this.conversations.values());
      fs.writeFileSync(this.conversationsFile, JSON.stringify(list, null, 2), 'utf8');
    } catch (e) {
      console.error('Error saving conversations to disk:', e);
    }
  }

  saveConversation(id, sessionData) {
    const existing = this.conversations.get(id) || {};
    const updated = {
      ...existing,
      ...sessionData,
      id,
      updated_at: new Date().toISOString()
    };
    this.conversations.set(id, updated);
    this.saveConversationsToDisk();
    return updated;
  }

  getConversation(id) {
    return this.conversations.get(id) || null;
  }

  getAllConversations() {
    return Array.from(this.conversations.values()).sort((a, b) => new Date(b.updated_at || 0) - new Date(a.updated_at || 0));
  }

  deleteConversation(id) {
    const deleted = this.conversations.delete(id);
    if (deleted) this.saveConversationsToDisk();
    return deleted;
  }

  /**
   * Search Indian Standards
   */
  searchStandards(query = '', category = '', status = '') {
    const q = query.toLowerCase().trim();
    return this.standards.filter(std => {
      const matchQ = !q || 
        std.is_number.toLowerCase().includes(q) ||
        std.title.toLowerCase().includes(q) ||
        std.scope.toLowerCase().includes(q) ||
        (std.product_names && std.product_names.some(p => p.toLowerCase().includes(q) || q.includes(p.toLowerCase())));
      
      const matchCat = !category || std.category.toLowerCase().includes(category.toLowerCase());
      const matchStat = !status || std.status.toLowerCase().includes(status.toLowerCase());
      return matchQ && matchCat && matchStat;
    });
  }

  /**
   * Search Laboratories by city, state, or standard
   */
  searchLaboratories(query = '', state = '', standard = '') {
    const q = query.toLowerCase().trim();
    const st = state.toLowerCase().trim();
    const std = standard.toLowerCase().trim();

    return this.laboratories.filter(lab => {
      const matchQ = !q ||
        lab.name.toLowerCase().includes(q) ||
        lab.district.toLowerCase().includes(q) ||
        lab.state.toLowerCase().includes(q) ||
        lab.scopes.some(s => s.toLowerCase().includes(q));

      const matchState = !st || lab.state.toLowerCase().includes(st) || lab.district.toLowerCase().includes(st);
      const matchStd = !std || lab.scopes.some(s => s.toLowerCase().includes(std));

      return matchQ && matchState && matchStd;
    });
  }

  /**
   * Search Official FAQs
   */
  searchFAQs(query = '') {
    const q = query.toLowerCase().trim();
    if (!q) return this.faqs;
    return this.faqs.filter(f => 
      f.question.toLowerCase().includes(q) ||
      f.answer.toLowerCase().includes(q) ||
      f.category.toLowerCase().includes(q)
    );
  }

  /**
   * Search Quality Control Orders
   */
  searchQCO(query = '') {
    const q = query.toLowerCase().trim();
    if (!q) return this.qcoOrders;
    return this.qcoOrders.filter(o =>
      o.order_name.toLowerCase().includes(q) ||
      o.ministry.toLowerCase().includes(q) ||
      o.covered_products.some(p => p.toLowerCase().includes(q))
    );
  }

  /**
   * Search Services & Portals
   */
  searchServices(query = '') {
    const q = query.toLowerCase().trim();
    if (!q) return this.services;
    return this.services.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q) ||
      (s.features && s.features.some(f => f.toLowerCase().includes(q)))
    );
  }

  /**
   * Get Live Database Stats
   */
  getStats() {
    return {
      standards_count: this.standards.length,
      laboratories_count: this.laboratories.length,
      services_count: this.services.length,
      faqs_count: this.faqs.length,
      qco_orders_count: this.qcoOrders.length,
      online_info_loaded: Boolean(this.onlineInfo)
    };
  }
}

module.exports = BISDatabase;
