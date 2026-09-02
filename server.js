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

// Initialize Unified Database
const BISDatabase = require('./database');
const bisDb = new BISDatabase(path.join(__dirname, 'data'));

// Load datasets from DB
const standardsData = bisDb.standards;
const laboratoriesData = bisDb.laboratories;
const servicesData = bisDb.services;
const knowledgeBase = bisDb.knowledgeBase;

// Initialize Intelligent Knowledge Engine
const BISKnowledgeEngine = require('./knowledgeEngine');
const knowledgeEngine = new BISKnowledgeEngine(standardsData, laboratoriesData, servicesData, knowledgeBase);

// In-memory feedback store
const feedbackStore = [];

// Helper: Find matching standards by query
function findMatchingStandards(query) {
  return bisDb.searchStandards(query);
}

// Helper: Match labs by IS standard or location
function findMatchingLabs(isNumberOrKeyword, state) {
  return bisDb.searchLaboratories('', state, isNumberOrKeyword);
}

// -------------------------------------------------------------
// API ENDPOINTS (Specification Conformance)
// -------------------------------------------------------------

// 1. POST /api/v1/chat (Dynamic Context-Aware Intelligence with Session History)
app.post('/api/v1/chat', async (req, res) => {
  const { message, conversation_id = `conv_${Date.now()}`, clarifications = {}, language = 'en' } = req.body;

  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    // Retrieve existing conversation session
    let session = bisDb.getConversation(conversation_id);
    if (!session) {
      session = {
        id: conversation_id,
        title: message.trim().slice(0, 36) + (message.trim().length > 36 ? '...' : ''),
        created_at: new Date().toISOString(),
        messages: []
      };
    }

    const history = session.messages || [];

    const responsePayload = await knowledgeEngine.processQuery({
      message: message.trim(),
      conversation_id,
      clarifications,
      language,
      history
    });

    // Record user message
    session.messages.push({
      id: `msg_user_${Date.now()}`,
      role: 'user',
      text: message.trim(),
      timestamp: new Date().toISOString()
    });

    // Record assistant message with full payload
    session.messages.push({
      id: `msg_asst_${Date.now()}`,
      role: 'assistant',
      text: responsePayload.answer,
      payload: responsePayload,
      timestamp: new Date().toISOString()
    });

    // Update title if first message
    if (session.messages.length <= 2) {
      if (responsePayload.product?.name) {
        session.title = `${responsePayload.product.name} Compliance`;
      } else {
        session.title = message.trim().slice(0, 32);
      }
    }

    bisDb.saveConversation(conversation_id, session);

    res.json(responsePayload);
  } catch (err) {
    console.error('Error processing chat query:', err);
    res.status(500).json({ error: 'Failed to process inquiry', details: err.message });
  }
});

// 1.1. GET /api/v1/chat/sessions (List all conversation sessions)
app.get('/api/v1/chat/sessions', (req, res) => {
  const list = bisDb.getAllConversations().map(c => ({
    id: c.id,
    title: c.title || 'Conversation',
    created_at: c.created_at,
    updated_at: c.updated_at,
    message_count: (c.messages || []).length,
    preview: (c.messages && c.messages[0]) ? c.messages[0].text.slice(0, 50) : ''
  }));
  res.json({ total: list.length, sessions: list });
});

// 1.2. GET /api/v1/chat/sessions/:id (Get full conversation history)
app.get('/api/v1/chat/sessions/:id', (req, res) => {
  const session = bisDb.getConversation(req.params.id);
  if (!session) {
    return res.status(404).json({ error: 'Conversation session not found' });
  }
  res.json(session);
});

// 1.3. POST /api/v1/chat/sessions/new (Create new conversation)
app.post('/api/v1/chat/sessions/new', (req, res) => {
  const newId = `conv_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const newSession = {
    id: newId,
    title: 'New Conversation',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    messages: []
  };
  bisDb.saveConversation(newId, newSession);
  res.json(newSession);
});

// 1.4. DELETE /api/v1/chat/sessions/:id (Delete conversation)
app.delete('/api/v1/chat/sessions/:id', (req, res) => {
  const deleted = bisDb.deleteConversation(req.params.id);
  res.json({ success: deleted });
});

// 2. POST /api/v1/products/analyze
app.post('/api/v1/products/analyze', (req, res) => {
  const { description, category, attributes = {} } = req.body;
  if (!description) {
    return res.status(400).json({ error: 'Product description is required' });
  }

  const query = (description + ' ' + (category || '')).toLowerCase();
  const matched = findMatchingStandards(query);

  let std = null;
  let labs = [];

  if (matched.length > 0) {
    std = matched[0];
    labs = findMatchingLabs(std.is_number.split(':')[0]);
  } else {
    // Check extended standards repository
    const extStd = knowledgeEngine.findExtendedStandard(query);
    if (extStd) {
      std = {
        id: `ext_${Date.now()}`,
        is_number: extStd.is_number,
        title: extStd.title,
        category: extStd.category,
        scheme: extStd.scheme,
        mandatory_order: extStd.mandatory_order,
        requirements: extStd.key_requirements.map((r, i) => ({ name: r, category: "Quality & Safety", mandatory: true, clause: `Clause ${i+1}` })),
        tests: extStd.key_tests.map(t => ({ name: t, standard_ref: extStd.is_number, frequency: "Routine / Batch" }))
      };
      labs = findMatchingLabs(extStd.is_number.split(' ')[1] || '');
    } else {
      // General product fallback
      std = {
        id: `gen_${Date.now()}`,
        is_number: "Quality Control Order (QCO) Assessment",
        title: `${description} - BIS Conformity Assessment`,
        category: category || "General Industrial / Consumer Goods",
        scheme: "Scheme I (ISI Mark) / Scheme II (CRS)",
        mandatory_order: "Applicable Sectoral Quality Control Order",
        requirements: [
          { name: "Raw material conformity to relevant IS specifications", category: "Raw Materials", mandatory: true, clause: "Section 1" },
          { name: "In-house Scheme of Testing and Inspection (SIT) equipment setup", category: "Infrastructure", mandatory: true, clause: "Section 2" },
          { name: "Product performance & safety limit adherence", category: "Performance", mandatory: true, clause: "Section 3" }
        ],
        tests: [
          { name: "Routine Quality & Verification Test", standard_ref: "Relevant IS Code", frequency: "Every Production Batch" },
          { name: "Type / Qualification Safety Test", standard_ref: "National Testing Protocol", frequency: "Initial / Annual" }
        ]
      };
      labs = laboratoriesData.slice(0, 2);
    }
  }

  res.json({
    product_profile: {
      name: description,
      detected_category: std.category,
      applicable_is: std.is_number,
      scheme: std.scheme,
      mandatory_order: std.mandatory_order,
      readiness_score: 75
    },
    standard: std,
    requirements: std.requirements || [],
    test_plan: std.tests || [],
    laboratories: labs,
    checklist: [
      { id: "chk_1", task: "Procure standard specifications and Scheme of Testing & Inspection (SIT) from KYS portal", status: "pending", category: "Infrastructure" },
      { id: "chk_2", task: "Establish in-house testing equipment with NABL-traceable calibration certificates", status: "pending", category: "Quality" },
      { id: "chk_3", task: "Ensure raw material compliance and supplier test certificates", status: "pending", category: "Raw Materials" },
      { id: "chk_4", task: "Submit Form-V application on Manakonline portal with statutory fees", status: "pending", category: "Application" },
      { id: "chk_5", task: "Undergo BIS Preliminary Factory Inspection and draw samples for independent lab testing", status: "pending", category: "Audit" }
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

// 9. GET /api/v1/faqs
app.get('/api/v1/faqs', (req, res) => {
  const { query = '' } = req.query;
  const results = bisDb.searchFAQs(query);
  res.json({
    total: results.length,
    faqs: results
  });
});

// 10. GET /api/v1/qco
app.get('/api/v1/qco', (req, res) => {
  const { query = '' } = req.query;
  const results = bisDb.searchQCO(query);
  res.json({
    total: results.length,
    qco_orders: results
  });
});

// 11. POST /api/v1/feedback
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

// 12. GET /api/v1/health
app.get('/api/v1/health', (req, res) => {
  const stats = bisDb.getStats();
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '2.0.0-JS',
    engine: 'Node.js Express BIS RAG & Database Orchestrator',
    indexed_data: {
      standards: stats.standards_count,
      laboratories: stats.laboratories_count,
      services: stats.services_count,
      faqs: stats.faqs_count,
      qco_orders: stats.qco_orders_count,
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
