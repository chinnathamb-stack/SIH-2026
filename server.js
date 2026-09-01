const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Load datasets
const standardsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'standards.json'), 'utf8'));
const laboratoriesData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'laboratories.json'), 'utf8'));
const servicesData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'services.json'), 'utf8'));
const knowledgeBase = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'knowledge_base.json'), 'utf8'));

// In-memory feedback store
const feedbackStore = [];

// Helper: Find matching standards by query
function findMatchingStandards(query) {
  const q = query.toLowerCase().trim();
  return standardsData.filter(std => {
    const matchNumber = std.is_number.toLowerCase().includes(q);
    const matchTitle = std.title.toLowerCase().includes(q);
    const matchCategory = std.category.toLowerCase().includes(q);
    const matchProducts = std.product_names && std.product_names.some(p => q.includes(p) || p.includes(q));
    const matchScope = std.scope.toLowerCase().includes(q);
    return matchNumber || matchTitle || matchCategory || matchProducts || matchScope;
  });
}

// Helper: Match labs by IS standard or location
function findMatchingLabs(isNumberOrKeyword, state) {
  return laboratoriesData.filter(lab => {
    const matchesScope = !isNumberOrKeyword || lab.scopes.some(s => s.toLowerCase().includes(isNumberOrKeyword.toLowerCase()));
    const matchesState = !state || lab.state.toLowerCase().includes(state.toLowerCase()) || lab.district.toLowerCase().includes(state.toLowerCase());
    return matchesScope && matchesState;
  });
}

// -------------------------------------------------------------
// API ENDPOINTS (Specification Conformance)
// -------------------------------------------------------------

// 1. POST /api/v1/chat
app.post('/api/v1/chat', (req, res) => {
  const { message, conversation_id = `conv_${Date.now()}`, clarifications = {}, language = 'en' } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const query = message.toLowerCase();
  let matchedStandards = findMatchingStandards(query);

  // Fallback match keywords
  if (matchedStandards.length === 0) {
    if (query.includes('kettle') || query.includes('water boiler') || query.includes('heater') || query.includes('tea maker')) {
      matchedStandards = standardsData.filter(s => s.id === 'std_001');
    } else if (query.includes('water') || query.includes('packaged') || query.includes('bottle') || query.includes('mineral')) {
      matchedStandards = standardsData.filter(s => s.id === 'std_002');
    } else if (query.includes('battery') || query.includes('lithium') || query.includes('power bank') || query.includes('cell')) {
      matchedStandards = standardsData.filter(s => s.id === 'std_003');
    } else if (query.includes('helmet') || query.includes('bike') || query.includes('motorcycle') || query.includes('rider')) {
      matchedStandards = standardsData.filter(s => s.id === 'std_004');
    } else if (query.includes('toy') || query.includes('baby') || query.includes('plush') || query.includes('doll')) {
      matchedStandards = standardsData.filter(s => s.id === 'std_005');
    } else if (query.includes('solar') || query.includes('pv') || query.includes('photovoltaic') || query.includes('panel')) {
      matchedStandards = standardsData.filter(s => s.id === 'std_006');
    } else if (query.includes('cooker') || query.includes('pressure')) {
      matchedStandards = standardsData.filter(s => s.id === 'std_007');
    } else if (query.includes('gold') || query.includes('jewel') || query.includes('huid') || query.includes('hallmark')) {
      matchedStandards = standardsData.filter(s => s.id === 'std_008');
    }
  }

  const primaryStd = matchedStandards[0] || standardsData[0];
  const isKettleQuery = query.includes('kettle') || primaryStd.id === 'std_001';
  const hasProvidedClarification = Object.keys(clarifications).length > 0;

  // Check if clarification is needed (For electric kettles, check if user specified material/base)
  let needsClarification = false;
  let clarificationQuestions = [];

  if (isKettleQuery && !hasProvidedClarification && !query.includes('stainless') && !query.includes('cordless') && !query.includes('plastic')) {
    needsClarification = true;
    clarificationQuestions = knowledgeBase.clarification_templates.electric_kettle.questions;
  }

  // Find labs for standard
  const matchedLabs = findMatchingLabs(primaryStd.is_number.split(':')[0]);

  // Generate Grounded Citations
  const citations = (primaryStd.clauses || []).slice(0, 3).map((cl, idx) => ({
    evidence_id: `ev_${primaryStd.id}_${idx + 1}`,
    document: `${primaryStd.title} (${primaryStd.is_number})`,
    is_number: primaryStd.is_number,
    clause: cl.clause_no,
    heading: cl.heading,
    page: cl.page,
    text: cl.text,
    test_method: cl.test_method,
    official_url: primaryStd.source_url
  }));

  // Construct grounded response
  let answerText = '';
  if (language === 'ta') {
    answerText = `**${primaryStd.title}** குறித்த BIS சான்றிதழ் வழிகாட்டுதல்:\n\n` +
      `1. **பொருந்தும் இந்திய தரம் (Applicable Standard):** ${primaryStd.is_number}\n` +
      `2. **சான்றிதழ் முறை (Scheme):** ${primaryStd.scheme} (${primaryStd.mandatory_order})\n` +
      `3. **முக்கிய பாதுகாப்பு விதிகள்:** ${primaryStd.requirements.map(r => r.name).join(', ')}.\n` +
      `4. **பரிசோதனை ஆய்வகங்கள்:** ${matchedLabs.map(l => l.name).join(', ')}.\n` +
      `5. **அதிகாரப்பூர்வ நடவடிக்கை:** Manakonline இணையதளத்தில் புதிய உரிமத்திற்கு விண்ணப்பிக்கவும்.`;
  } else if (language === 'hi') {
    answerText = `**${primaryStd.title}** के लिए बीआईएस (BIS) अनुपालन दिशानिर्देश:\n\n` +
      `1. **लागू भारतीय मानक:** ${primaryStd.is_number}\n` +
      `2. **प्रमाणन योजना:** ${primaryStd.scheme}\n` +
      `3. **अनिवार्य परीक्षण:** ${primaryStd.tests.map(t => t.name).join(', ')}.\n` +
      `4. **मान्यता प्राप्त प्रयोगशालाएं:** ${matchedLabs.map(l => l.name).join(', ')}.\n` +
      `5. **अगला कदम:** आधिकारिक मानकऑनलाइन (Manakonline) पोर्टल पर आवेदन करें।`;
  } else {
    answerText = `Here is the comprehensive BIS compliance and standards advisory for **${primaryStd.product_names ? primaryStd.product_names[0].toUpperCase() : 'your product'}**:\n\n` +
      `### 1. Applicable Indian Standard\n` +
      `- **Standard:** \`${primaryStd.is_number}\`\n` +
      `- **Title:** ${primaryStd.title}\n` +
      `- **Regulatory Mandate:** ${primaryStd.mandatory_order} under **${primaryStd.scheme}**.\n\n` +
      `### 2. Mandatory Technical & Quality Requirements\n` +
      primaryStd.requirements.map(r => `- **${r.name}** (${r.category}) — *Refer ${r.clause}*`).join('\n') + '\n\n' +
      `### 3. Key Laboratory Tests Required\n` +
      primaryStd.tests.map(t => `- **${t.name}**: Reference *${t.standard_ref}* (${t.frequency})`).join('\n') + '\n\n' +
      `### 4. Matched BIS-Recognized Testing Laboratories\n` +
      matchedLabs.slice(0, 3).map(l => `- **${l.name}** (${l.district}, ${l.state}) — Validity: ${l.validity}`).join('\n') + '\n\n' +
      `### 5. Official BIS Next Action\n` +
      `Submit your application for Factory Inspection and Grant of Licence (GoL) on the official **Manakonline Portal** ([www.manakonline.in](https://www.manakonline.in/)).`;
  }

  const responsePayload = {
    conversation_id,
    intent: "product_compliance",
    needs_clarification: needsClarification,
    clarification_questions: clarificationQuestions,
    answer: answerText,
    product: {
      name: primaryStd.product_names ? primaryStd.product_names[0] : "Product",
      category: primaryStd.category,
      is_number: primaryStd.is_number,
      scheme: primaryStd.scheme,
      mandatory_order: primaryStd.mandatory_order,
      attributes: clarifications
    },
    standards: [
      {
        id: primaryStd.id,
        is_number: primaryStd.is_number,
        title: primaryStd.title,
        status: primaryStd.status,
        version: primaryStd.version,
        scheme: primaryStd.scheme,
        applicability_reason: `Product directly falls under the scope of ${primaryStd.is_number} as per Quality Control Orders.`,
        evidence_ids: citations.map(c => c.evidence_id)
      }
    ],
    requirements: primaryStd.requirements || [],
    tests: primaryStd.tests || [],
    laboratories: matchedLabs,
    citations: citations,
    official_actions: [
      {
        title: "Apply for Scheme I ISI Mark Licence",
        portal: "Manakonline (e-BIS)",
        url: "https://www.manakonline.in/",
        action_type: "online_application"
      },
      {
        title: "Verify Test Scopes in BIS LIMS",
        portal: "BIS LIMS",
        url: "https://www.lims.bis.gov.in/",
        action_type: "lab_search"
      },
      {
        title: "Download Full Standard & SIT",
        portal: "Know Your Standard (KYS)",
        url: primaryStd.source_url,
        action_type: "document_download"
      }
    ],
    limitations: [
      "Guidance provided is for advisory and technical preparation only.",
      "Final certification is granted solely by authorized BIS officers following factory audit and sample testing."
    ]
  };

  res.json(responsePayload);
});

// 2. POST /api/v1/products/analyze
app.post('/api/v1/products/analyze', (req, res) => {
  const { description, category, attributes = {} } = req.body;
  if (!description) {
    return res.status(400).json({ error: 'Product description is required' });
  }

  const matched = findMatchingStandards(description + ' ' + (category || ''));
  const std = matched[0] || standardsData[0];
  const labs = findMatchingLabs(std.is_number.split(':')[0]);

  res.json({
    product_profile: {
      name: description,
      detected_category: std.category,
      applicable_is: std.is_number,
      scheme: std.scheme,
      mandatory_order: std.mandatory_order,
      readiness_score: 85
    },
    standard: std,
    requirements: std.requirements,
    test_plan: std.tests,
    laboratories: labs,
    checklist: [
      { id: "chk_1", task: "Establish in-house testing equipment required by Scheme of Testing & Inspection (SIT)", status: "pending", category: "Infrastructure" },
      { id: "chk_2", task: `Ensure raw material compliance and food-grade / electrical safety certifications`, status: "pending", category: "Raw Materials" },
      { id: "chk_3", task: "Prepare Quality Manual and calibrate all measuring instruments with NABL traceablity", status: "pending", category: "Quality" },
      { id: "chk_4", task: "Submit Form-V application on Manakonline portal with statutory fees", status: "pending", category: "Application" },
      { id: "chk_5", task: "Undergo BIS Preliminary Factory Inspection and draw factory samples for independent testing", status: "pending", category: "Audit" }
    ]
  });
});

// 3. POST /api/v1/standards/search
app.post('/api/v1/standards/search', (req, res) => {
  const { query = '', category = '', status = '' } = req.body;
  let results = standardsData;

  if (query.trim()) {
    results = findMatchingStandards(query);
  }

  if (category) {
    results = results.filter(s => s.category.toLowerCase().includes(category.toLowerCase()));
  }

  if (status) {
    results = results.filter(s => s.status.toLowerCase().includes(status.toLowerCase()));
  }

  res.json({
    total: results.length,
    standards: results
  });
});

// 4. GET /api/v1/standards/:is_number
app.get('/api/v1/standards/:is_number', (req, res) => {
  const isNumber = decodeURIComponent(req.params.is_number).toLowerCase().trim();
  const std = standardsData.find(s => s.is_number.toLowerCase().includes(isNumber) || s.id.toLowerCase() === isNumber);

  if (!std) {
    return res.status(404).json({ error: 'Standard not found' });
  }

  res.json(std);
});

// 5. GET /api/v1/standards/:is_number/evidence
app.get('/api/v1/standards/:is_number/evidence', (req, res) => {
  const isNumber = decodeURIComponent(req.params.is_number).toLowerCase().trim();
  const std = standardsData.find(s => s.is_number.toLowerCase().includes(isNumber) || s.id.toLowerCase() === isNumber);

  if (!std) {
    return res.status(404).json({ error: 'Standard not found' });
  }

  res.json({
    is_number: std.is_number,
    title: std.title,
    source_url: std.source_url,
    total_clauses: (std.clauses || []).length,
    clauses: std.clauses || [],
    requirements: std.requirements || [],
    tests: std.tests || []
  });
});

// 6. POST /api/v1/compliance/plan
app.post('/api/v1/compliance/plan', (req, res) => {
  const { is_number, product_name } = req.body;
  const std = standardsData.find(s => s.is_number.toLowerCase().includes((is_number || '').toLowerCase())) || standardsData[0];

  res.json({
    plan_id: `plan_${Date.now()}`,
    product_name: product_name || std.product_names[0],
    is_number: std.is_number,
    scheme: std.scheme,
    estimated_timeline: "30 to 45 Days (Fast-track simplified procedure)",
    steps: [
      {
        step_number: 1,
        name: "Standard Procurement & Gap Analysis",
        description: `Review ${std.is_number} and Scheme of Inspection & Testing (SIT). Verify manufacturing capabilities against required specifications.`,
        duration: "3-5 Days",
        status: "Completed"
      },
      {
        step_number: 2,
        name: "In-House Laboratory & Testing Setup",
        description: "Install mandatory testing equipment specified in the SIT for routine and batch tests. Ensure proper calibration certificates.",
        duration: "7-10 Days",
        status: "In Progress"
      },
      {
        step_number: 3,
        name: "Online Application Submission (Manakonline)",
        description: "Submit Form-1 / Form-V on Manakonline along with factory layout, machinery list, test equipment list, and fee payment.",
        duration: "1-2 Days",
        status: "Pending"
      },
      {
        step_number: 4,
        name: "Factory Audit & Sample Drawing",
        description: "BIS inspecting officer visits the manufacturing premises to verify manufacturing capability, QC personnel, and in-house testing.",
        duration: "1 Day (Scheduled)",
        status: "Pending"
      },
      {
        step_number: 5,
        name: "Independent Sample Testing & Grant of Licence (GoL)",
        description: "Samples tested at BIS Regional Laboratory. Upon passing, BIS grants CM/L (Certification Marks Licence) with ISI mark rights.",
        duration: "15-20 Days",
        status: "Pending"
      }
    ],
    required_documents: [
      "Factory Registration / Incorporation Certificate (MSME / RoC / GST)",
      "List of Manufacturing Machinery & Installed Capacity",
      "List of In-House Testing Equipment with Calibration Certificates",
      "Quality Control Personnel Qualification & Experience Proof",
      "Process Flowchart with Critical Control Points (CCP)",
      "Authorization Letter / Board Resolution for Authorized Signatory"
    ],
    official_links: [
      { name: "Manakonline Application Portal", url: "https://www.manakonline.in/" },
      { name: "Know Your Standard (KYS)", url: std.source_url },
      { name: "BIS LIMS Lab Portal", url: "https://www.lims.bis.gov.in/" }
    ]
  });
});

// 7. GET /api/v1/labs/search
app.get('/api/v1/labs/search', (req, res) => {
  const { query = '', state = '', standard = '' } = req.query;
  let results = laboratoriesData;

  if (query.trim()) {
    const q = query.toLowerCase();
    results = results.filter(l =>
      l.name.toLowerCase().includes(q) ||
      l.district.toLowerCase().includes(q) ||
      l.state.toLowerCase().includes(q) ||
      l.scopes.some(s => s.toLowerCase().includes(q))
    );
  }

  if (state.trim()) {
    results = results.filter(l => l.state.toLowerCase().includes(state.toLowerCase()));
  }

  if (standard.trim()) {
    results = results.filter(l => l.scopes.some(s => s.toLowerCase().includes(standard.toLowerCase())));
  }

  res.json({
    total: results.length,
    laboratories: results
  });
});

// 8. GET /api/v1/services
app.get('/api/v1/services', (req, res) => {
  res.json({
    total: servicesData.length,
    services: servicesData
  });
});

// 9. POST /api/v1/feedback
app.post('/api/v1/feedback', (req, res) => {
  const { conversation_id, rating, comment, issue_type } = req.body;
  const feedbackItem = {
    id: `fb_${Date.now()}`,
    conversation_id,
    rating,
    comment,
    issue_type,
    created_at: new Date().toISOString()
  };
  feedbackStore.push(feedbackItem);
  res.json({ success: true, message: 'Feedback recorded successfully', feedback: feedbackItem });
});

// 10. GET /api/v1/health
app.get('/api/v1/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '2.0.0-JS',
    engine: 'Node.js Express BIS RAG Orchestrator',
    indexed_data: {
      standards: standardsData.length,
      laboratories: laboratoriesData.length,
      services: servicesData.length,
      feedback_count: feedbackStore.length
    }
  });
});

// Fallback to index.html for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`  BIS AI Intelligent Assistant (SIH Problem 26107)  `);
  console.log(`  Server running at http://localhost:${PORT}        `);
  console.log(`  100% JavaScript (Node.js + Modern UI)             `);
  console.log(`====================================================`);
});
