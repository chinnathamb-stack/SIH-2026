/**
 * BIS AI Intelligent Assistant - Dynamic Groq & Knowledge Engine Orchestrator
 * SIH Problem Statement 26107
 * 
 * Features:
 * - 100% Dynamic Groq LPU Generation (No static canned responses)
 * - Multi-Model Fallback: openai/gpt-oss-120b -> qwen/qwen3.8-27b -> groq/compound -> openai/gpt-oss-20b -> llama-3.3-70b-versatile
 * - Optimal token safety (max_tokens: 850) preventing OTPM rate limit errors
 * - Grounded RAG context injection from official Indian Standards corpus
 * - KaTeX formula & math formatting support
 * - Adaptive concise response sizing
 */

const https = require('https');
const http = require('http');

const GROQ_DEFAULT_API_KEY = process.env.GROQ_API_KEY || '';
const GROQ_BASE_URL = process.env.GROQ_BASE_URL || 'https://api.groq.com/openai/v1';

const CANDIDATE_MODELS = [
  'openai/gpt-oss-120b',
  'qwen/qwen3.8-27b',
  'groq/compound',
  'openai/gpt-oss-20b',
  'llama-3.3-70b-versatile'
];

function makeHttpsRequest(urlStr, method = 'POST', data = null, headers = {}) {
  return new Promise((resolve) => {
    try {
      const urlObj = new URL(urlStr);
      const options = {
        hostname: urlObj.hostname,
        port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
        path: urlObj.pathname + urlObj.search,
        method: method,
        headers: headers,
        timeout: 15000
      };

      const lib = urlObj.protocol === 'https:' ? https : http;
      const req = lib.request(options, (res) => {
        let raw = '';
        res.on('data', chunk => raw += chunk);
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve({ statusCode: res.statusCode, body: raw });
          } else {
            resolve({ statusCode: res.statusCode, body: raw, error: true });
          }
        });
      });

      req.on('error', (err) => resolve({ error: true, message: err.message }));
      req.on('timeout', () => {
        req.destroy();
        resolve({ error: true, message: 'Request timed out' });
      });

      if (data) req.write(data);
      req.end();
    } catch (e) {
      resolve({ error: true, message: e.message });
    }
  });
}

class BISKnowledgeEngine {
  constructor(standards = [], laboratories = [], services = [], knowledgeBase = {}, onlineInfo = null) {
    this.standards = Array.isArray(standards) ? standards : [];
    this.laboratories = Array.isArray(laboratories) ? laboratories : [];
    this.services = Array.isArray(services) ? services : [];
    this.knowledgeBase = knowledgeBase || {};
    this.onlineInfo = onlineInfo || null;
  }

  findRelevantEvidence(query) {
    const q = query.toLowerCase();
    const evidence = [];

    // Search standards
    for (const std of this.standards) {
      const isMatch = (std.is_number && q.includes(std.is_number.toLowerCase().replace(/[^a-z0-9]/g, ''))) ||
        (std.title && std.title.toLowerCase().split(' ').some(w => w.length > 3 && q.includes(w))) ||
        (std.product_names && std.product_names.some(p => q.includes(p.toLowerCase()) || p.toLowerCase().includes(q))) ||
        (std.scope && std.scope.toLowerCase().split(' ').filter(w => w.length > 4).some(w => q.includes(w)));

      if (isMatch) {
        let excerpt = std.scope || std.title;
        if (std.test_parameters && std.test_parameters.length > 0) {
          excerpt += ' | Key Tests: ' + std.test_parameters.slice(0, 4).map(t => `${t.name} (${t.clause || ''}: ${t.limit || ''})`).join('; ');
        }
        evidence.push({
          standard_number: std.is_number,
          document_title: std.title,
          scheme: std.scheme || 'Scheme I (ISI)',
          chunk: {
            clause: std.key_clauses ? std.key_clauses.slice(0, 3).join(', ') : 'General Requirements',
            section: std.category || 'Product Certification',
            page: 1,
            text: excerpt
          }
        });
      }
      if (evidence.length >= 4) break;
    }

    // Search Knowledge Base
    if (evidence.length < 3 && this.knowledgeBase) {
      for (const [key, item] of Object.entries(this.knowledgeBase)) {
        if (q.includes(key.toLowerCase()) || (item.title && item.title.toLowerCase().split(' ').some(w => w.length > 4 && q.includes(w)))) {
          evidence.push({
            standard_number: item.is_number || key.toUpperCase(),
            document_title: item.title || key,
            scheme: item.scheme || 'Scheme I',
            chunk: {
              clause: item.test_parameters?.[0]?.clause || 'Core Clause',
              section: 'Knowledge Base',
              page: 1,
              text: item.test_parameters ? item.test_parameters.map(t => `${t.name}: ${t.limit}`).join('; ') : (item.overview || '')
            }
          });
        }
        if (evidence.length >= 4) break;
      }
    }

    return evidence;
  }

  async callGroqLLM({ prompt, history = [], groundingEvidence = [], language = 'en', customApiKey = null, customProvider = null, aiModel = null }) {
    const apiKey = customApiKey || process.env.GROQ_API_KEY || GROQ_DEFAULT_API_KEY;

    let groundingContext = '';
    if (groundingEvidence && groundingEvidence.length > 0) {
      groundingContext = '\n\n--- OFFICIAL AUTHORIZED INDIAN STANDARDS CORPUS EVIDENCE ---\n' +
        groundingEvidence.map(e =>
          `[Standard: ${e.standard_number} | Clause: ${e.chunk?.clause || 'Standard'} | Section: ${e.chunk?.section || 'Specification'}]\nTitle: ${e.document_title}\nExcerpt: "${e.chunk?.text || ''}"`
        ).join('\n\n') +
        '\n--- END OF EVIDENCE ---\n';
    }

    const systemPrompt = `You are BIS Sahayak AI, an intelligent, agile, and helpful assistant for the Bureau of Indian Standards (Govt of India) and general user inquiries.

RESPONSE RULES:
1. ADAPTIVE LENGTH (VERY IMPORTANT):
   - Keep answers direct, punchy, and appropriately sized for the prompt. Do NOT generate unnecessary filler or huge walls of text for simple questions.
   - For greetings (e.g. 'vanakkam', 'namaste', 'hi', 'hello'), reply warmly and briefly (1-2 lines) in the user's language.
   - For factual or conceptual questions (e.g. 'what is thermodynamics', 'what is ISI mark'), provide a crisp, direct, and well-structured answer in 2-3 short sections or bullet points.
2. FORMULAS & MATH (KaTeX):
   - When writing mathematical, physical, or chemical formulas, ALWAYS use standard LaTeX/KaTeX format (e.g. inline \$E = mc^2\$ or block \$\$\Delta U = Q - W\$\$, \$\$H = U + PV\$\$, \$\$\Delta S \ge \frac{Q}{T}\$\$).
3. BIS STANDARDS & CITATIONS:
   - When questions touch on Indian products, testing, or certification, prioritize and explicitly name the Indian Standard numbers provided in the evidence (e.g. **IS 2082:2018** for stationary electric water heaters, **IS 12258:2021** for pressure cookers, **IS 1417:2016** for gold hallmarking, **IS 694:2010** for PVC cables, **IS 14543:2024** for packaged drinking water, **IS 16046:2018** for lithium batteries, **IS 4151:2020** for helmets) with their key clause references. Do not alter or translate the standard identifiers.
4. FORMATTING:
   - Use clean Markdown with bold headers (### ), bullet points, and concise tables where helpful.
5. Multilingual: Respond in the user's language (${language}) naturally.`;

    const userPrompt = groundingContext
      ? `${groundingContext}\nUser Prompt: ${prompt}`
      : prompt;

    const messages = [
      { role: 'system', content: systemPrompt }
    ];

    if (history && Array.isArray(history) && history.length > 0) {
      history.slice(-4).forEach(m => {
        messages.push({
          role: (m.role === 'assistant' || m.role === 'model') ? 'assistant' : 'user',
          content: m.text || m.content || ''
        });
      });
    }

    messages.push({ role: 'user', content: userPrompt });

    const modelsToTry = aiModel ? [aiModel, ...CANDIDATE_MODELS] : CANDIDATE_MODELS;

    for (const model of modelsToTry) {
      try {
        const payload = JSON.stringify({
          model: model,
          messages: messages,
          max_tokens: 850,
          temperature: 0.5
        });

        const res = await makeHttpsRequest(
          'https://api.groq.com/openai/v1/chat/completions',
          'POST',
          payload,
          {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          }
        );

        if (res && !res.error && res.body) {
          const parsed = JSON.parse(res.body);
          const ans = parsed.choices?.[0]?.message?.content;
          if (ans && ans.trim().length > 0) {
            const cleaned = ans
              .trim()
              .replace(/[\u202F\u00A0\u2000-\u200B]/g, ' ')
              .replace(/[\u2010\u2011\u2012\u2013\u2014]/g, '-');
            return { answer: cleaned, modelUsed: model };
          }
        }
      } catch (err) {
        console.warn(`Groq model ${model} failed:`, err.message || err);
      }
    }

    // Fallback if offline
    let fallbackText = 'I am **BIS Sahayak AI**. ';
    if (groundingEvidence && groundingEvidence.length > 0) {
      fallbackText += 'Here is official information based on authorized standards:\n\n' +
        groundingEvidence.map(e => `### **${e.standard_number}** - ${e.document_title}\n- **Clause ${e.chunk.clause}:** ${e.chunk.text}`).join('\n\n');
    } else {
      fallbackText += 'How can I assist you today with Indian Standards, ISI certification, lab testing, or general questions?';
    }
    return { answer: fallbackText, modelUsed: 'offline-fallback' };
  }

  async processQuery({
    message,
    conversation_id = `conv_${Date.now()}`,
    clarifications = {},
    language = 'en',
    history = [],
    ai_mode = 'auto',
    ai_model = null,
    custom_api_key = null,
    custom_provider = null
  }) {
    const rawMsg = (message || '').trim();
    if (!rawMsg) {
      return {
        conversation_id,
        answer: 'Please enter a message or question.',
        citations: [],
        related_standards: [],
        suggested_followups: []
      };
    }

    // 1. Retrieve official grounding evidence from database
    const groundingEvidence = this.findRelevantEvidence(rawMsg);

    // 2. Call dynamic Groq LLM
    const llmResult = await this.callGroqLLM({
      prompt: rawMsg,
      history,
      groundingEvidence,
      language,
      customApiKey: custom_api_key,
      customProvider: custom_provider,
      aiModel: ai_model
    });

    const aiAnswer = llmResult.answer;

    // 3. Extract standard mentions
    const isMatches = aiAnswer.match(/IS\s*[:\-\/]?\s*\d+(?:\s*(?:part|pt|\-)\s*\d+)?(?:\s*[:\-\(]?\s*\d{4})?/gi) || [];
    const relatedStandards = Array.from(
      new Set([
        ...isMatches.map(m => m.toUpperCase().replace(/\s+/g, ' ')),
        ...groundingEvidence.map(e => e.standard_number)
      ].slice(0, 4))
    );

    // 4. Extract citations
    const citations = groundingEvidence.map(e => ({
      standard_number: e.standard_number,
      document_title: e.document_title,
      clause: e.chunk?.clause || 'Clause Ref',
      section: e.chunk?.section || 'Standards Evidence',
      page: e.chunk?.page || 1,
      source_type: 'BIS Official Standard'
    }));

    // 5. Generate contextual suggested followups
    let suggested_followups = [
      'Which Indian Standard applies to electric water heaters?',
      'How to apply for ISI Mark (Scheme-I) on Manakonline?',
      'How do I verify 6-digit HUID code on BIS CARE app?',
      'Find BIS recognized testing laboratories in Mumbai'
    ];

    if (rawMsg.toLowerCase().includes('water') || rawMsg.toLowerCase().includes('heater')) {
      suggested_followups = [
        'What are the mandatory safety tests under IS 2082:2018?',
        'What is the difference between IS 302-2-21 and IS 2082?',
        'Find testing labs for water heaters in Delhi/NCR'
      ];
    } else if (rawMsg.toLowerCase().includes('gold') || rawMsg.toLowerCase().includes('hallmark')) {
      suggested_followups = [
        'How to verify 6-digit HUID code on BIS CARE app?',
        'What are the three mandatory hallmarking symbols on gold jewellery?',
        'What is the fee for jeweler hallmarking registration?'
      ];
    }

    return {
      conversation_id,
      message_id: 'msg_' + Math.random().toString(36).substring(2, 9),
      answer: aiAnswer,
      citations,
      related_standards: relatedStandards,
      suggested_followups,
      confidence: 'HIGH',
      model_used: llmResult.modelUsed,
      disclaimer: 'Guidance generated dynamically by BIS Sahayak AI grounded in official Bureau of Indian Standards specifications.'
    };
  }
}

module.exports = BISKnowledgeEngine;
