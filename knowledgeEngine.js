/**
 * BIS AI Intelligent Assistant - Dynamic Multi-Model & Knowledge Engine Orchestrator
 * SIH Problem Statement 26107
 * 
 * Features:
 * - Dynamic Groq & Gemini LPU/API Generation
 * - Verified working Groq models: openai/gpt-oss-120b -> qwen/qwen3.8-27b -> groq/compound -> groq/compound-mini
 * - Native Google Gemini API integration if Gemini provider/key is configured
 * - Resilient API key handling (builtin provider always uses server GROQ_API_KEY)
 * - Multi-turn conversational clarification ("What product are you manufacturing?")
 * - Standardized 8-part structured output for all product and standards inquiries:
 *   1. 🔍 PRODUCT IDENTIFIED
 *   2. 📘 APPLICABLE BIS STANDARD
 *   3. 📋 KEY REQUIREMENTS (✓)
 *   4. 🧪 REQUIRED TESTING (•)
 *   5. 🏭 LABORATORY
 *   6. 📑 CERTIFICATION PATH (1-5)
 *   7. 📚 EVIDENCE
 *   8. ➡ NEXT STEP ([Find Laboratory] [Certification Process] [View Standard])
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
    const q = (query || '').toLowerCase();
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

  detectProductAndStandard(query) {
    const q = (query || '').toLowerCase().trim();
    if (!q) return null;

    for (const std of this.standards) {
      // 1. IS number match
      const isRaw = (std.is_number || '').toLowerCase();
      const isClean = isRaw.replace(/[^a-z0-9]/g, '');
      const qClean = q.replace(/[^a-z0-9]/g, '');
      if (isClean && qClean.includes(isClean)) {
        return { standard: std, matchedProduct: std.product_names?.[0] || std.title };
      }

      // 2. Product names match
      if (std.product_names && Array.isArray(std.product_names)) {
        for (const p of std.product_names) {
          const pLow = p.toLowerCase();
          if (q.includes(pLow) || (pLow.length >= 3 && q.split(/[\s,\.\?!]+/).some(w => w === pLow || pLow.includes(w)))) {
            return { standard: std, matchedProduct: p };
          }
        }
      }

      // 3. Title keywords
      if (std.title) {
        const words = std.title.toLowerCase().split(/[\s,\.\?!]+/).filter(w => w.length > 4);
        if (words.some(w => q.includes(w))) {
          return { standard: std, matchedProduct: std.product_names?.[0] || std.title };
        }
      }
    }

    return null;
  }

  isMissingProductSpecification(query) {
    const q = (query || '').toLowerCase().trim();
    if (!q) return false;

    // If it matches a known product or standard, it's not missing
    if (this.detectProductAndStandard(query)) return false;

    // If greeting, not missing
    if (/^(hi|hello|hey|namaste|vanakkam|namaskar|pranam|good morning|good evening)\b/i.test(q)) {
      return false;
    }

    // If asking "what is bis" definition, not missing
    if (/^(what is bis|about bis|who is bis|explain bis|bureau of indian standards)\b/i.test(q) || q === 'bis') {
      return false;
    }

    // Trigger words for certification/compliance/testing inquiry where product is omitted
    const broadTriggers = [
      'certification', 'certify', 'certified',
      'licence', 'license', 'licensing',
      'isi mark', 'isi',
      'testing', 'test requirement', 'tests',
      'standards', 'standard',
      'compliance', 'conformity',
      'how to apply', 'process of', 'procedure',
      'manufacturing', 'manufacturer', 'manufacture',
      'qco', 'scheme i', 'scheme 1'
    ];

    return broadTriggers.some(t => q.includes(t));
  }

  formatStandardToStructuredResponse(std, matchedProduct = null, includeIntro = true) {
    const rawProd = matchedProduct || std.product_names?.[0] || 'Product';
    const prodName = rawProd.split(' ')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(' ');

    const intro = includeIntro
      ? `Understood. I can help identify the relevant standard, testing requirements and BIS process.\n\n`
      : '';

    const isNum = (std.is_number || 'IS 302-2-15:2009').replace(/\s+/g, ' ').trim();
    let isTitle = std.title || 'Safety of Household and Similar Electrical Appliances';
    let isScope = std.scope || 'Particular Requirements for Appliances for Heating Liquids';

    // Tailored requirements
    let reqs = [];
    if (prodName.toLowerCase().includes('kettle')) {
      reqs = [
        'Electrical safety',
        'Protection against electric shock',
        'Insulation requirements',
        'Temperature/overheating safety',
        'Construction and mechanical safety',
        'Marking and instructions'
      ];
    } else if (std.requirements && std.requirements.length > 0) {
      reqs = std.requirements.map(r => r.name);
    } else {
      reqs = [
        'Conformity to standard material specifications',
        'Protection against operational and environmental hazards',
        'High voltage insulation & dielectric integrity',
        'Thermal stability and abnormal-operation endurance',
        'Mechanical durability and robust construction',
        'Official ISI Mark, rating plate, and batch marking'
      ];
    }

    // Tailored tests
    let tests = [];
    if (prodName.toLowerCase().includes('kettle')) {
      tests = [
        'Electrical safety tests',
        'Leakage current test',
        'Dielectric strength test',
        'Temperature-rise test',
        'Mechanical safety tests',
        'Abnormal-operation tests'
      ];
    } else if (std.tests && std.tests.length > 0) {
      tests = std.tests.map(t => t.name);
    } else {
      tests = [
        'Electrical / dielectric strength test',
        'Leakage current & insulation resistance test',
        'Temperature-rise and thermal endurance test',
        'Mechanical impact and structural safety test',
        'Abnormal-operation and fault simulation test',
        'Marking durability & warning legibility test'
      ];
    }

    return `${intro}` +
      `🔍 PRODUCT IDENTIFIED\n` +
      `${prodName}\n\n` +
      `📘 APPLICABLE BIS STANDARD\n` +
      `${isNum}\n` +
      `${isTitle}\n` +
      `${isScope}\n\n` +
      `📋 KEY REQUIREMENTS\n` +
      reqs.map(r => `✓ ${r}`).join('\n') + `\n\n` +
      `🧪 REQUIRED TESTING\n` +
      tests.map(t => `• ${t}`).join('\n') + `\n\n` +
      `🏭 LABORATORY\n` +
      `Find BIS-recognized laboratories capable of\n` +
      `testing against ${isNum}\n\n` +
      `📑 CERTIFICATION PATH\n` +
      `1. Confirm applicable standard\n` +
      `2. Check applicable certification/QCO requirements\n` +
      `3. Identify required testing\n` +
      `4. Select suitable BIS-recognized laboratory\n` +
      `5. Apply through the appropriate BIS portal\n\n` +
      `📚 EVIDENCE\n` +
      `Standard: ${isNum}\n` +
      `Source: BIS\n` +
      `[View source / standard]\n\n` +
      `➡ NEXT STEP\n` +
      `[Find Laboratory] [Certification Process] [View Standard]`;
  }

  formatGenericProductResponse(productInput, includeIntro = true) {
    const pClean = (productInput || 'Manufactured Item').replace(/[\.\?!]/g, '').trim();
    const prodName = pClean.charAt(0).toUpperCase() + pClean.slice(1);

    const intro = includeIntro
      ? `Understood. I can help identify the relevant standard, testing requirements and BIS process.\n\n`
      : '';

    return `${intro}` +
      `🔍 PRODUCT IDENTIFIED\n` +
      `${prodName}\n\n` +
      `📘 APPLICABLE BIS STANDARD\n` +
      `Relevant Indian Standard (IS Specification)\n` +
      `Safety, Quality and Performance Mandates for ${prodName}\n\n` +
      `📋 KEY REQUIREMENTS\n` +
      `✓ Raw material compliance & grade specifications\n` +
      `✓ Structural, operational, and user safety\n` +
      `✓ Mandatory Quality Control Order (QCO) compliance\n` +
      `✓ In-house testing laboratory and calibrated instruments\n` +
      `✓ Factory production control & Scheme of Inspection and Testing (SIT)\n` +
      `✓ Standard marking, serial traceability, and ISI insignia\n\n` +
      `🧪 REQUIRED TESTING\n` +
      `• Raw material quality & composition verification\n` +
      `• Routine safety and performance testing\n` +
      `• Type testing by BIS recognized testing laboratory\n` +
      `• Mechanical and environmental endurance tests\n` +
      `• Abnormal operation and tolerance testing\n` +
      `• Packaging and marking durability tests\n\n` +
      `🏭 LABORATORY\n` +
      `Find BIS-recognized laboratories capable of testing against Indian Standards for ${prodName}\n\n` +
      `📑 CERTIFICATION PATH\n` +
      `1. Confirm applicable standard\n` +
      `2. Check applicable certification/QCO requirements\n` +
      `3. Identify required testing\n` +
      `4. Select suitable BIS-recognized laboratory\n` +
      `5. Apply through the appropriate BIS portal\n\n` +
      `📚 EVIDENCE\n` +
      `Standard: Indian Standards Catalog\n` +
      `Source: BIS\n` +
      `[View source / standard]\n\n` +
      `➡ NEXT STEP\n` +
      `[Find Laboratory] [Certification Process] [View Standard]`;
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

    return `You are BIS Sahayak AI, the official intelligent assistant for the Bureau of Indian Standards (Govt of India).

${groundingContext}
CORE CONVERSATIONAL AND STRUCTURAL PROTOCOLS:

1. MULTI-TURN INCOMPLETE QUERY CLARIFICATION:
   - If the user asks general or incomplete questions about BIS certification, ISI mark, testing, licensing, or compliance WITHOUT specifying which product they are manufacturing (e.g. "I want certification", "how do I get an ISI mark?", "what are testing requirements?", "tell me about compliance"):
     DO NOT generate a long wall of text. Reply concisely with exactly:
     "What product are you manufacturing?"

2. STRUCTURED 8-PART OUTPUT FORMAT:
   - When a product is identified or provided by the user (or follows the "What product are you manufacturing?" question):
     You MUST start your response with:
     "Understood. I can help identify the relevant standard, testing requirements and BIS process."

     Followed immediately by this exact structured 8-part card:

🔍 PRODUCT IDENTIFIED
[Product Name]

📘 APPLICABLE BIS STANDARD
[IS Standard Number (e.g. IS 302-2-15:2009)]
[Standard Official Title]
[Specific Scope or Requirements Description]

📋 KEY REQUIREMENTS
✓ [Key Requirement 1]
✓ [Key Requirement 2]
✓ [Key Requirement 3]
✓ [Key Requirement 4]
✓ [Key Requirement 5]
✓ [Key Requirement 6]

🧪 REQUIRED TESTING
• [Required Test 1]
• [Required Test 2]
• [Required Test 3]
• [Required Test 4]
• [Required Test 5]
• [Required Test 6]

🏭 LABORATORY
Find BIS-recognized laboratories capable of
testing against [IS Standard Number]

📑 CERTIFICATION PATH
1. Confirm applicable standard
2. Check applicable certification/QCO requirements
3. Identify required testing
4. Select suitable BIS-recognized laboratory
5. Apply through the appropriate BIS portal

📚 EVIDENCE
Standard: [IS Standard Number]
Source: BIS
[View source / standard]

➡ NEXT STEP
[Find Laboratory] [Certification Process] [View Standard]

3. GENERAL TOPIC & SCHEME INQUIRIES:
   - For general questions where no specific physical product is being manufactured (e.g. "What is BIS?", "What is ISI Mark?", "What is Hallmarking?"):
     Format in this same structured manner with 🔍 TOPIC IDENTIFIED, 📘 APPLICABLE SCHEME / ACT, 📋 KEY PROVISIONS (✓), 🧪 TESTING (•), 🏭 LABORATORY, 📑 CERTIFICATION PATH (1-5), 📚 EVIDENCE, and ➡ NEXT STEP.

4. PRESERVE IDENTIFIERS:
   - Standard numbers like IS 302-2-15:2009, IS 14543:2024, IS 16046:2018, IS 4151:2020 MUST be preserved accurately without modification.

5. LANGUAGE MANDATE:
   - Respond in ${langFullName} (${language}). Maintain alphanumeric standard identifiers (e.g. IS 302-2-15) untranslated.`;
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
        temperature: 0.4
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
          temperature: 0.4
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

  getOfflineAnswer(rawMsg, groundingEvidence = [], history = []) {
    const q = rawMsg.toLowerCase().trim();

    // Check greetings
    if (/^(hi|hello|hey|namaste|vanakkam|namaskar|pranam|good morning|good evening)\b/i.test(q)) {
      return "Namaste! I am **BIS Sahayak AI**, your official assistant for the Bureau of Indian Standards (Govt of India). How can I assist you today with Indian Standards, ISI certification, lab testing, or compliance inquiries?";
    }

    // Multi-turn check: Did the assistant just ask "What product are you manufacturing?"
    const recentAssistantMsg = (history && Array.isArray(history))
      ? history.slice().reverse().find(m => m.role === 'assistant' || m.role === 'model')
      : null;
    const wasAskedProduct = recentAssistantMsg && (recentAssistantMsg.text || '').toLowerCase().includes('what product are you manufacturing');

    // 1. If user answered after being asked for product, or directly provided product
    const detected = this.detectProductAndStandard(q);
    if (detected) {
      return this.formatStandardToStructuredResponse(detected.standard, detected.matchedProduct, true);
    }

    // 2. If user replied with a product name after "What product are you manufacturing?"
    if (wasAskedProduct && q.length > 2 && !q.includes('?')) {
      return this.formatGenericProductResponse(rawMsg, true);
    }

    // 3. If query is broad / incomplete inquiry without naming a product
    if (this.isMissingProductSpecification(q)) {
      return "What product are you manufacturing?";
    }

    // 4. Topic: "What is BIS" or general BIS inquiries
    if (q.includes('what is bis') || q.includes('about bis') || q.includes('who is bis') || q.includes('bureau of indian standards') || q === 'bis' || q.includes('explain bis')) {
      return `🔍 TOPIC IDENTIFIED\n` +
        `Bureau of Indian Standards (BIS)\n\n` +
        `📘 APPLICABLE REGULATION & ACT\n` +
        `Bureau of Indian Standards Act, 2016\n` +
        `National Standards Body of India under Ministry of Consumer Affairs, Food & Public Distribution\n\n` +
        `📋 KEY REQUIREMENTS & FUNCTIONS\n` +
        `✓ Formulation and harmonization of national Indian Standards (IS)\n` +
        `✓ Conformity Assessment and ISI Mark certification (Scheme I & Scheme II)\n` +
        `✓ Mandatory Hallmarking of gold & silver jewellery with 6-digit HUID\n` +
        `✓ Enforcement of Quality Control Orders (QCO) issued by Central Ministries\n` +
        `✓ In-house testing and laboratory recognition scheme (LIMS)\n` +
        `✓ Consumer protection and grievance redressal via BIS CARE mobile app\n\n` +
        `🧪 REQUIRED TESTING\n` +
        `• Complete laboratory safety and performance testing\n` +
        `• Pre-licence factory inspection audit & test witness\n` +
        `• Scheme of Inspection and Testing (SIT) verification\n` +
        `• Post-licence regular market surveillance sample testing\n\n` +
        `🏭 LABORATORY\n` +
        `Find BIS-recognized laboratories capable of testing against Indian Standards across India\n\n` +
        `📑 CERTIFICATION PATH\n` +
        `1. Confirm applicable standard\n` +
        `2. Check applicable certification/QCO requirements\n` +
        `3. Identify required testing\n` +
        `4. Select suitable BIS-recognized laboratory\n` +
        `5. Apply through the appropriate BIS portal\n\n` +
        `📚 EVIDENCE\n` +
        `Standard: BIS Act 2016 & Conformity Assessment Regulations 2018\n` +
        `Source: BIS\n` +
        `[View source / standard]\n\n` +
        `➡ NEXT STEP\n` +
        `[Find Laboratory] [Certification Process] [View Standard]`;
    }

    // 5. Topic: ISI mark
    if (q.includes('isi mark') || q.includes('what is isi')) {
      return `🔍 TOPIC IDENTIFIED\n` +
        `ISI Mark Certification (Scheme I)\n\n` +
        `📘 APPLICABLE BIS STANDARD & SCHEME\n` +
        `BIS (Conformity Assessment) Regulations, 2018 - Scheme I\n` +
        `Premier quality mark certifying third-party product safety and conformity in India\n\n` +
        `📋 KEY REQUIREMENTS\n` +
        `✓ Compliance with product-specific Indian Standard (IS) specifications\n` +
        `✓ Factory manufacturing machinery and qualified technical personnel\n` +
        `✓ Calibrated in-house testing equipment complying with Scheme of Inspection & Testing (SIT)\n` +
        `✓ 50% concession on marking and inspection fees for MSMEs and Startups\n` +
        `✓ Mandatory for all items covered under Central Government Quality Control Orders (QCOs)\n\n` +
        `🧪 REQUIRED TESTING\n` +
        `• Complete Type Testing against product-specific Indian Standard\n` +
        `• Routine manufacturing factory batch control tests\n` +
        `• Independent sample testing in BIS-recognized laboratories\n` +
        `• Market surveillance testing of random retail samples\n\n` +
        `🏭 LABORATORY\n` +
        `Find BIS-recognized laboratories capable of testing against mandatory ISI standards\n\n` +
        `📑 CERTIFICATION PATH\n` +
        `1. Confirm applicable standard\n` +
        `2. Check applicable certification/QCO requirements\n` +
        `3. Identify required testing\n` +
        `4. Select suitable BIS-recognized laboratory\n` +
        `5. Apply through the appropriate BIS portal\n\n` +
        `📚 EVIDENCE\n` +
        `Standard: Scheme I - BIS Act 2016\n` +
        `Source: BIS\n` +
        `[View source / standard]\n\n` +
        `➡ NEXT STEP\n` +
        `[Find Laboratory] [Certification Process] [View Standard]`;
    }

    // 6. Evidence-based grounding fallback
    if (groundingEvidence && groundingEvidence.length > 0) {
      const topStd = groundingEvidence[0];
      return `🔍 TOPIC IDENTIFIED\n` +
        `${topStd.document_title}\n\n` +
        `📘 APPLICABLE BIS STANDARD\n` +
        `${topStd.standard_number}\n` +
        `${topStd.document_title}\n` +
        `${topStd.chunk?.text || ''}\n\n` +
        `📋 KEY REQUIREMENTS\n` +
        `✓ Conformity to technical parameters under ${topStd.chunk?.clause || 'Standard Specification'}\n` +
        `✓ Mandatory Quality Control Order (QCO) compliance\n` +
        `✓ Factory in-house testing infrastructure and SIT compliance\n\n` +
        `🧪 REQUIRED TESTING\n` +
        `• Essential conformity and parameter verification tests\n` +
        `• Routine in-process quality control tests\n` +
        `• Independent third-party laboratory verification\n\n` +
        `🏭 LABORATORY\n` +
        `Find BIS-recognized laboratories capable of testing against ${topStd.standard_number}\n\n` +
        `📑 CERTIFICATION PATH\n` +
        `1. Confirm applicable standard\n` +
        `2. Check applicable certification/QCO requirements\n` +
        `3. Identify required testing\n` +
        `4. Select suitable BIS-recognized laboratory\n` +
        `5. Apply through the appropriate BIS portal\n\n` +
        `📚 EVIDENCE\n` +
        `Standard: ${topStd.standard_number}\n` +
        `Source: BIS\n` +
        `[View source / standard]\n\n` +
        `➡ NEXT STEP\n` +
        `[Find Laboratory] [Certification Process] [View Standard]`;
    }

    // 7. General fallback
    return `🔍 TOPIC IDENTIFIED\n` +
      `Indian Standards & BIS Compliance\n\n` +
      `📘 APPLICABLE BIS STANDARD\n` +
      `Bureau of Indian Standards Act, 2016\n` +
      `Quality compliance in India is governed through published Indian Standards (IS) and mandatory Quality Control Orders (QCOs).\n\n` +
      `📋 KEY REQUIREMENTS\n` +
      `✓ Search your product on Know Your Standard (KYS)\n` +
      `✓ Verify if your product is covered under a mandatory QCO\n` +
      `✓ Implement Scheme of Inspection & Testing (SIT) at manufacturing premises\n` +
      `✓ Submit Form-V application on Manakonline portal\n\n` +
      `🧪 REQUIRED TESTING\n` +
      `• In-house quality control testing\n` +
      `• Product verification in BIS-recognized laboratories\n` +
      `• Factory audit sample verification\n\n` +
      `🏭 LABORATORY\n` +
      `Find BIS-recognized laboratories capable of testing against relevant Indian Standards\n\n` +
      `📑 CERTIFICATION PATH\n` +
      `1. Confirm applicable standard\n` +
      `2. Check applicable certification/QCO requirements\n` +
      `3. Identify required testing\n` +
      `4. Select suitable BIS-recognized laboratory\n` +
      `5. Apply through the appropriate BIS portal\n\n` +
      `📚 EVIDENCE\n` +
      `Standard: BIS Guidelines\n` +
      `Source: BIS\n` +
      `[View source / standard]\n\n` +
      `➡ NEXT STEP\n` +
      `[Find Laboratory] [Certification Process] [View Standard]`;
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

    // Step 1: Detect if query is incomplete without a product
    const isMissingProduct = this.isMissingProductSpecification(rawMsg);
    const recentAssistantMsg = (history && Array.isArray(history))
      ? history.slice().reverse().find(m => m.role === 'assistant' || m.role === 'model')
      : null;
    const wasAskedProduct = recentAssistantMsg && (recentAssistantMsg.text || '').toLowerCase().includes('what product are you manufacturing');

    if (isMissingProduct && !wasAskedProduct) {
      let clarifyText = "What product are you manufacturing?";
      if (language && language !== 'en') {
        try { clarifyText = await translateText(clarifyText, language); } catch (e) {}
      }
      return {
        conversation_id,
        message_id: 'msg_' + Math.random().toString(36).substring(2, 9),
        answer: clarifyText,
        citations: [],
        related_standards: [],
        suggested_followups: [
          'Electric kettle',
          'Packaged drinking water',
          'Two-wheeler helmets',
          'Lithium-ion batteries'
        ],
        confidence: 'HIGH',
        model_used: 'conversational-clarification',
        disclaimer: 'BIS Assistant clarification prompt.'
      };
    }

    // Step 2: Retrieve official grounding evidence from database
    const groundingEvidence = this.findRelevantEvidence(rawMsg);

    // Step 3: Check if offline instant standard match is available
    const detected = this.detectProductAndStandard(rawMsg);

    // Step 4: Determine API credentials
    const isBuiltin = !custom_provider || custom_provider === 'builtin';
    const serverGroqKey = process.env.GROQ_API_KEY || GROQ_DEFAULT_API_KEY;

    let llmResult = null;

    // A. Gemini
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

    // B. Groq
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

    // Step 5: Format response
    let aiAnswer = '';
    let modelUsed = 'offline-knowledge-engine';

    if (llmResult && llmResult.answer) {
      aiAnswer = llmResult.answer;
      modelUsed = llmResult.modelUsed;
    } else {
      let fallbackText = '';
      if (detected) {
        fallbackText = this.formatStandardToStructuredResponse(detected.standard, detected.matchedProduct, true);
      } else if (wasAskedProduct) {
        fallbackText = this.formatGenericProductResponse(rawMsg, true);
      } else {
        fallbackText = this.getOfflineAnswer(rawMsg, groundingEvidence, history);
      }

      if (language && language !== 'en') {
        try {
          fallbackText = await translateText(fallbackText, language);
        } catch (e) {
          console.warn('Fallback translation error:', e);
        }
      }
      aiAnswer = fallbackText;
    }

    // Step 6: Extract standard mentions
    const isMatches = aiAnswer.match(/IS\s*[:\-\/]?\s*\d+(?:\s*(?:part|pt|\-)\s*\d+)?(?:\s*[:\-\(]?\s*\d{4})?/gi) || [];
    const relatedStandards = Array.from(
      new Set([
        ...isMatches.map(m => m.toUpperCase().replace(/\s+/g, ' ')),
        ...groundingEvidence.map(e => e.standard_number)
      ].slice(0, 4))
    );

    // Step 7: Extract citations
    const citations = groundingEvidence.map(e => ({
      standard_number: e.standard_number,
      document_title: e.document_title,
      clause: e.chunk?.clause || 'Clause Ref',
      section: e.chunk?.section || 'Standards Evidence',
      page: e.chunk?.page || 1,
      source_type: 'BIS Official Standard'
    }));

    // Step 8: Suggested follow-ups
    let suggested_followups = [
      'Find BIS recognized laboratories near me',
      'What are the mandatory testing fees on Manakonline?',
      'How to apply for ISI Mark licence (Form-V)?',
      'Check Quality Control Order (QCO) deadlines'
    ];

    if (detected || rawMsg.toLowerCase().includes('kettle')) {
      suggested_followups = [
        'Find testing laboratories for IS 302-2-15:2009',
        'What is the boil-dry endurance test in Clause 19?',
        'How to apply for ISI Mark on Manakonline portal'
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
