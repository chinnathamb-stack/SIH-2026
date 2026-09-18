/**
 * BIS AI Intelligent Assistant - Dynamic Multi-Model & Knowledge Engine Orchestrator
 * SIH Problem Statement 26107
 * 
 * Features:
 * - Dynamic Groq & Gemini LPU/API Generation
 * - Verified working Groq models: openai/gpt-oss-120b -> qwen/qwen3.8-27b -> groq/compound -> groq/compound-mini
 * - Native Google Gemini API integration if Gemini provider/key is configured
 * - Resilient API key handling (builtin provider always uses server GROQ_API_KEY)
 * - Grounded RAG context injection across Indian Standards, Knowledge Base, Services & Online Portals
 * - Rich Offline Knowledge Base fallback (authoritative statutory knowledge, never blank greetings)
 * - KaTeX formula & math formatting support
 * - Adaptive concise response sizing & 7-language localization
 */

const https = require('https');
const http = require('http');
const { translateText, LANGUAGE_NAMES } = require('./translator');

const GROQ_DEFAULT_API_KEY = process.env.GROQ_API_KEY || '';

const CANDIDATE_MODELS = [
  'openai/gpt-oss-120b',
  'qwen/qwen3.8-27b',
  'groq/compound',
  'groq/compound-mini'
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

    // 1. Search standards
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

    // 2. Search Knowledge Base
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

    // 3. Search Official Services & Portals
    if (evidence.length < 3 && this.services && this.services.length > 0) {
      for (const srv of this.services) {
        const sMatch = q.includes(srv.name.toLowerCase()) ||
          q.includes((srv.badge || '').toLowerCase()) ||
          ((q.includes('service') || q.includes('portal') || q.includes('bis') || q.includes('scheme') || q.includes('apply') || q.includes('license') || q.includes('licence') || q.includes('manakonline') || q.includes('kys') || q.includes('lims')) &&
          srv.features && srv.features.some(f => q.includes(f.toLowerCase())));

        if (sMatch) {
          evidence.push({
            standard_number: srv.name,
            document_title: srv.category,
            scheme: srv.badge || 'Official Service',
            chunk: {
              clause: srv.official_url,
              section: 'BIS Online Portals',
              page: 1,
              text: `${srv.description} Key capabilities: ${(srv.features || []).join(', ')}`
            }
          });
        }
        if (evidence.length >= 4) break;
      }
    }

    return evidence;
  }

  buildSystemPrompt(groundingEvidence, language) {
    const langFullName = LANGUAGE_NAMES[language] || language;

    let groundingContext = '';
    if (groundingEvidence && groundingEvidence.length > 0) {
      groundingContext = '\n\n--- OFFICIAL AUTHORIZED INDIAN STANDARDS CORPUS EVIDENCE ---\n' +
        groundingEvidence.map(e =>
          `[Standard/Portal: ${e.standard_number} | Clause/URL: ${e.chunk?.clause || 'Standard'} | Section: ${e.chunk?.section || 'Specification'}]\nTitle: ${e.document_title}\nExcerpt: "${e.chunk?.text || ''}"`
        ).join('\n\n') +
        '\n--- END OF EVIDENCE ---\n';
    }

    return `You are BIS Sahayak AI, an intelligent, agile, and authoritative assistant for the Bureau of Indian Standards (Govt of India) and general user inquiries.

${groundingContext}
RESPONSE RULES:
1. ADAPTIVE LENGTH (VERY IMPORTANT):
   - Keep answers direct, punchy, and appropriately sized for the prompt. Do NOT generate unnecessary filler or huge walls of text for simple questions.
   - For greetings (e.g. 'vanakkam', 'namaste', 'hi', 'hello'), reply warmly and briefly (1-2 lines) in the user's language.
   - For factual or conceptual questions (e.g. 'what is BIS', 'what is ISI mark', 'how to apply on Manakonline'), provide a crisp, direct, and well-structured answer in 2-3 short sections or bullet points.
2. FORMULAS & MATH (KaTeX):
   - When writing mathematical, physical, or chemical formulas, ALWAYS use standard LaTeX/KaTeX format (e.g. inline $E = mc^2$ or block $$\\Delta U = Q - W$$).
3. BIS STANDARDS & CITATIONS:
   - When questions touch on Indian products, testing, or certification, prioritize and explicitly name the Indian Standard numbers provided in the evidence (e.g. **IS 2082:2018** for stationary electric water heaters, **IS 12258:2021** for pressure cookers, **IS 1417:2016** for gold hallmarking, **IS 694:2010** for PVC cables, **IS 14543:2024** for packaged drinking water, **IS 16046:2018** for lithium batteries, **IS 4151:2020** for helmets) with their key clause references. Do not alter or translate the standard identifiers.
4. FORMATTING:
   - Use clean Markdown with bold headers (### ), bullet points, and concise tables where helpful.
5. STRICT MULTILINGUAL MANDATE (CRITICAL):
   - The user has selected interface language: ${langFullName} (${language}).
   - You MUST generate your ENTIRE response in ${langFullName}, regardless of whether the user prompt or reference evidence was in English or another language.
   - Indian Standard codes and alphanumeric identifiers (e.g., IS 302-2-15, IS 14543, IS 16046, IS 4151, Cl. 13, 0.75mA, 230V AC) MUST be strictly preserved without translation or transliteration into other scripts.`;
  }

  async callGeminiLLM({ prompt, history = [], groundingEvidence = [], language = 'en', apiKey, aiModel = 'gemini-1.5-flash' }) {
    if (!apiKey) return null;
    const systemInstruction = this.buildSystemPrompt(groundingEvidence, language);
    const model = (aiModel && aiModel.includes('gemini')) ? aiModel : 'gemini-1.5-flash';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const contents = [];
    if (history && Array.isArray(history)) {
      history.slice(-4).forEach(m => {
        contents.push({
          role: (m.role === 'assistant' || m.role === 'model') ? 'model' : 'user',
          parts: [{ text: m.text || m.content || '' }]
        });
      });
    }
    contents.push({ role: 'user', parts: [{ text: prompt }] });

    const payload = JSON.stringify({
      system_instruction: { parts: [{ text: systemInstruction }] },
      contents: contents,
      generationConfig: {
        maxOutputTokens: 850,
        temperature: 0.5
      }
    });

    const res = await makeHttpsRequest(url, 'POST', payload, { 'Content-Type': 'application/json' });
    if (res && !res.error && res.body) {
      try {
        const parsed = JSON.parse(res.body);
        const ans = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
        if (ans && ans.trim()) {
          return { answer: ans.trim(), modelUsed: model };
        }
      } catch (e) {}
    }
    return null;
  }

  async callGroqLLM({ prompt, history = [], groundingEvidence = [], language = 'en', apiKey, aiModel = null }) {
    if (!apiKey) return null;
    const systemPrompt = this.buildSystemPrompt(groundingEvidence, language);

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

    messages.push({ role: 'user', content: prompt });

    const validCandidate = (aiModel && CANDIDATE_MODELS.includes(aiModel))
      ? [aiModel, ...CANDIDATE_MODELS.filter(m => m !== aiModel)]
      : CANDIDATE_MODELS;

    for (const model of validCandidate) {
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
          const choice = parsed.choices?.[0]?.message;
          const ans = choice?.content || choice?.reasoning;
          if (ans && ans.trim().length > 0) {
            const cleaned = ans
              .trim()
              .replace(/[\u202F\u00A0\u2000-\u200B]/g, ' ')
              .replace(/[\u2010\u2011\u2012\u2013\u2014]/g, '-');
            return { answer: cleaned, modelUsed: model };
          }
        }
      } catch (err) {
        console.warn(`Groq model ${model} error:`, err.message || err);
      }
    }
    return null;
  }

  getOfflineAnswer(rawMsg, groundingEvidence = []) {
    const q = rawMsg.toLowerCase().trim();

    // Check greetings
    if (/^(hi|hello|hey|namaste|vanakkam|namaskar|pranam|good morning|good evening)\b/i.test(q)) {
      return "Namaste! I am **BIS Sahayak AI**, your official assistant for the Bureau of Indian Standards (Govt of India). How can I assist you today with Indian Standards, ISI certification, lab testing, or compliance inquiries?";
    }

    // Check "What is BIS" or general BIS inquiries
    if (q.includes('what is bis') || q.includes('about bis') || q.includes('who is bis') || q.includes('bureau of indian standards') || q === 'bis' || q.includes('explain bis')) {
      return `### Bureau of Indian Standards (BIS)\n\n` +
        `The **Bureau of Indian Standards (BIS)** is the National Standards Body of India established under the **Bureau of Indian Standards Act, 2016** under the Ministry of Consumer Affairs, Food & Public Distribution, Government of India.\n\n` +
        `#### 🏛️ Core Functions & Pillars:\n` +
        `1. **Standard Formulation (Indian Standards - IS):** Developing, publishing, and updating harmonized quality and safety benchmarks across agriculture, mechanical, chemical, electrotechnical, IT, and medical sectors.\n` +
        `2. **Conformity Assessment & Product Certification (ISI Mark):** Implementing **Scheme I (ISI Mark)** and **Scheme II (CRS)** to ensure manufactured goods conform to mandatory Quality Control Orders (QCOs).\n` +
        `3. **Hallmarking:** Ensuring mandatory purity certification of gold and silver jewellery with 6-digit **Hallmark Unique Identification (HUID)** numbers.\n` +
        `4. **Laboratory Testing:** Operating a nationwide network of Central, Regional, and Branch Testing Laboratories alongside recognized NABL-accredited labs.\n\n` +
        `#### 💻 Official Digital Portals:\n` +
        `- **Manakonline (e-BIS):** [manakonline.in](https://www.manakonline.in/) - Online application submission (Form-V), licence tracking, and renewals.\n` +
        `- **Know Your Standard (KYS):** [standards.bis.gov.in](https://standards.bis.gov.in/) - Free search, preview, and download of Indian Standards.\n` +
        `- **BIS CARE App:** Official mobile app for consumers to verify ISI marks, check HUID authenticity, and register grievances.`;
    }

    // Check ISI mark
    if (q.includes('isi mark') || q.includes('what is isi')) {
      return `### The ISI Mark (Scheme I Certification)\n\n` +
        `The **ISI mark** is the premier quality certification mark in India issued by the Bureau of Indian Standards (BIS) under Scheme I of the BIS (Conformity Assessment) Regulations, 2018.\n\n` +
        `- **Purpose:** Certifies that an industrial product complies with the relevant Indian Standard (IS) regarding safety, health, and environmental performance.\n` +
        `- **Mandatory vs Voluntary:** Mandatory for products covered under Government Quality Control Orders (QCOs)—including packaged drinking water, electric appliances, cement, steel, helmets, toys, and cables.\n` +
        `- **How to Apply:** Domestic manufacturers submit **Form-V** on the **[Manakonline Portal](https://www.manakonline.in/)** with factory premises, manufacturing machinery, and calibrated in-house testing equipment.\n` +
        `- **Concessions:** Micro, Small & Medium Enterprises (MSMEs) and Startups enjoy a **50% concession** on marking and inspection fees.`;
    }

    // Grounding evidence fallback if available
    if (groundingEvidence && groundingEvidence.length > 0) {
      return `Here is official information grounded in authorized Indian Standards and BIS resources:\n\n` +
        groundingEvidence.map(e => `### **${e.standard_number}** - ${e.document_title}\n- **${e.chunk?.clause || 'Standard Reference'}:** ${e.chunk?.text || ''}`).join('\n\n');
    }

    // General intelligent advisory fallback
    return `Under the **Bureau of Indian Standards Act, 2016**, quality compliance in India is governed through published Indian Standards (IS) and mandatory Quality Control Orders (QCOs).\n\n` +
      `### Key Guidance:\n` +
      `1. **Standard Search:** Use **[Know Your Standard (KYS)](https://standards.bis.gov.in/)** to find the exact IS number for your product.\n` +
      `2. **Testing & Audit:** Ensure testing facilities comply with the Scheme of Inspection and Testing (SIT).\n` +
      `3. **Licensing:** Applications must be filed on **[Manakonline Portal](https://www.manakonline.in/)**.\n\n` +
      `💡 *Tip: Mention the exact product name (e.g. Electric Kettle, Packaged Water, Steel, Helmets, Gold) to receive specific standard clauses, test parameters, and fees.*`;
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
      let emptyMsg = 'Please enter a message or question.';
      if (language && language !== 'en') {
        try { emptyMsg = await translateText(emptyMsg, language); } catch (e) {}
      }
      return {
        conversation_id,
        answer: emptyMsg,
        citations: [],
        related_standards: [],
        suggested_followups: []
      };
    }

    // 1. Retrieve official grounding evidence from database
    const groundingEvidence = this.findRelevantEvidence(rawMsg);

    // 2. Determine API credentials
    const isBuiltin = !custom_provider || custom_provider === 'builtin';
    const serverGroqKey = process.env.GROQ_API_KEY || GROQ_DEFAULT_API_KEY;

    let llmResult = null;

    // A. If user chose Gemini and supplied a valid Gemini API key
    if (custom_provider === 'gemini' && custom_api_key && custom_api_key.trim()) {
      try {
        llmResult = await this.callGeminiLLM({
          prompt: rawMsg,
          history,
          groundingEvidence,
          language,
          apiKey: custom_api_key.trim(),
          aiModel: ai_model || 'gemini-1.5-flash'
        });
      } catch (err) {
        console.warn('Gemini LLM call failed:', err.message);
      }
    }

    // B. Call Groq LLM (if Gemini was not used or failed, and we have a Groq key)
    if (!llmResult) {
      const groqKey = (!isBuiltin && custom_api_key && custom_api_key.trim())
        ? custom_api_key.trim()
        : serverGroqKey;

      if (groqKey) {
        try {
          llmResult = await this.callGroqLLM({
            prompt: rawMsg,
            history,
            groundingEvidence,
            language,
            apiKey: groqKey,
            aiModel: ai_model
          });
        } catch (err) {
          console.warn('Groq LLM call failed:', err.message);
        }
      }
    }

    // 3. Fallback to resilient offline knowledge base if LLM is unavailable
    let aiAnswer = '';
    let modelUsed = 'offline-knowledge-engine';

    if (llmResult && llmResult.answer) {
      aiAnswer = llmResult.answer;
      modelUsed = llmResult.modelUsed;
    } else {
      let fallbackText = this.getOfflineAnswer(rawMsg, groundingEvidence);
      if (language && language !== 'en') {
        try {
          fallbackText = await translateText(fallbackText, language);
        } catch (e) {
          console.warn('Fallback translation error:', e);
        }
      }
      aiAnswer = fallbackText;
    }

    // 4. Extract standard mentions
    const isMatches = aiAnswer.match(/IS\s*[:\-\/]?\s*\d+(?:\s*(?:part|pt|\-)\s*\d+)?(?:\s*[:\-\(]?\s*\d{4})?/gi) || [];
    const relatedStandards = Array.from(
      new Set([
        ...isMatches.map(m => m.toUpperCase().replace(/\s+/g, ' ')),
        ...groundingEvidence.map(e => e.standard_number)
      ].slice(0, 4))
    );

    // 5. Extract citations
    const citations = groundingEvidence.map(e => ({
      standard_number: e.standard_number,
      document_title: e.document_title,
      clause: e.chunk?.clause || 'Clause Ref',
      section: e.chunk?.section || 'Standards Evidence',
      page: e.chunk?.page || 1,
      source_type: 'BIS Official Standard'
    }));

    // 6. Generate contextual suggested followups
    let suggested_followups = [
      'What is the difference between Scheme I (ISI) and Scheme II (CRS)?',
      'How do I apply for an ISI Mark licence on Manakonline?',
      'How to verify 6-digit HUID code on the BIS CARE app?',
      'Find BIS recognized testing laboratories in my state'
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

    if (language && language !== 'en') {
      try {
        suggested_followups = await Promise.all(
          suggested_followups.map(f => translateText(f, language).catch(() => f))
        );
      } catch (e) {}
    }

    return {
      conversation_id,
      message_id: 'msg_' + Math.random().toString(36).substring(2, 9),
      answer: aiAnswer,
      citations,
      related_standards: relatedStandards,
      suggested_followups,
      confidence: 'HIGH',
      model_used: modelUsed,
      disclaimer: 'Guidance generated dynamically by BIS Sahayak AI grounded in official Bureau of Indian Standards specifications.'
    };
  }
}

module.exports = BISKnowledgeEngine;
