/**
 * BIS AI Intelligent Assistant - Internationalization (i18n)
 * Supports 7 Languages:
 * 1. English (en)
 * 2. Hindi - हिंदी (hi)
 * 3. Tamil - தமிழ் (ta)
 * 4. Telugu - తెలుగు (te)
 * 5. Bengali - বাংলা (bn)
 * 6. Marathi - मराठी (mr)
 * 7. Gujarati - ગુજરાતી (gu)
 */

const translations = {
  en: {
    lang_name: "English",
    brand_title: "BIS AI Assistant",
    brand_badge: "SIH 26107",
    brand_sub: "Official AI Verification Layer",
    brand_org: "Bureau of Indian Standards",
    new_chat: "New Conversation",
    nav_section_ai: "AI ASSISTANT",
    nav_bis_ai: "BIS Standards AI",
    workspace: "STANDARDS WORKSPACE",
    nav_analyzer: "Product Analyzer",
    nav_standards: "Standards Explorer",
    nav_labs: "Laboratory Finder (LIMS)",
    nav_services: "Official BIS Portals",
    nav_health: "Admin & Health",
    recent_chats: "RECENT SESSIONS",
    no_sessions: "No saved conversations yet",
    theme_dark: "Dark",
    theme_light: "Light",
    auto_speak: "Auto-Speak",

    // View Titles
    view_title_chat: "BIS AI Intelligent Assistant",
    view_title_analyzer: "Product Analyzer & Compliance Dashboard",
    view_title_standards: "Indian Standards Explorer (KYS)",
    view_title_labs: "BIS-Recognized Laboratory Finder (LIMS)",
    view_title_services: "Official BIS Ecosystem & Deep Links",
    view_title_health: "System Health & Ingestion Telemetry",

    // Welcome Hero
    welcome_badge: "Bureau of Indian Standards (BIS) — Official Compliance AI",
    welcome_title: "BIS Standards & Quality Compliance",
    welcome_sub: "Official guidance for Indian Standards (IS), mandatory certification schemes, test parameters, and NABL accredited laboratories.",

    // Prompt Chips
    chip1_title: "Electric Kettle (IS 302-2-15)",
    chip1_desc: "Safety Tests, BIS Scheme I, Lab Directory",
    chip1_prompt: "I want to manufacture an electric kettle. What BIS requirements must my product satisfy under IS 302-2-15, what tests are required, and which laboratory can test it?",

    chip2_title: "Packaged Drinking Water",
    chip2_desc: "IS 14543, FSSAI-BIS Mandate, In-house Lab",
    chip2_prompt: "What are the mandatory testing and licensing steps to setup a Packaged Drinking Water bottling plant under IS 14543?",

    chip3_title: "Lithium-ion Battery (CRS)",
    chip3_desc: "IS 16046 Part 2, MeitY Order, R-Number",
    chip3_prompt: "What is the Compulsory Registration Scheme (CRS) process and tests for Lithium-ion battery packs under IS 16046?",

    chip4_title: "Protective Helmets (IS 4151)",
    chip4_desc: "QCO Mandate, Impact Tests, Penalties",
    chip4_prompt: "What are the helmet testing parameters, QCO orders, and mandatory ISI mark rules under IS 4151?",

    chip5_title: "MSME 50% Fee Concession",
    chip5_desc: "Udyam Benefits & Marking Fee Rules",
    chip5_prompt: "How do MSME and startup manufacturers get the 50% concession on BIS marking and application fees?",

    chip6_title: "Scheme I vs Scheme II Process",
    chip6_desc: "Licensing Steps, Factory Audit & CRS",
    chip6_prompt: "What is the difference between Scheme I (ISI Mark) and Scheme II (CRS) under BIS Act 2016?",

    // Input Area
    attach_tooltip: "Attach Document / Spec",
    input_placeholder: "Ask about any product, IS standard, testing requirement, or lab...",
    voice_tooltip: "Voice Input (Speech-to-Text)",
    send_tooltip: "Send Message",
    input_disclaimer: "BIS AI Assistant provides authoritative guidance grounded in Indian Standards. Always confirm formal licensing on Manakonline.",

    // Message Actions
    btn_listen: "Listen",
    btn_speaking: "Speaking...",
    btn_stop: "Stop",
    btn_copy: "Copy",
    btn_copied: "Copied to clipboard!",
    btn_translate: "Translate",
    btn_translating: "Translating...",
    speaker_tooltip: "Listen to answer via voice speaker",
    translate_tooltip: "Translate response to currently selected language",

    // Product Analyzer
    analyzer_heading: "Product Compliance Analyzer & Dashboard",
    analyzer_sub: "Enter your product details to generate an automated BIS compliance roadmap, testing schedule, and licensing checklist.",
    analyzer_form_title: "Product Specification Input",
    label_prod_name: "Product Name / Description *",
    placeholder_prod_name: "e.g. Electric Kettle with Cordless Base",
    label_prod_category: "Industry Sector",
    cat_electrical: "Electrical & Electronics",
    cat_food: "Food & Agriculture",
    cat_crs: "Electronics & IT Goods (CRS)",
    cat_mech: "Mechanical / Road Safety",
    cat_toys: "Consumer Goods / Toys",
    cat_solar: "Renewable Energy / Solar",
    cat_kitchen: "Household & Kitchen Utensils",
    cat_precious: "Precious Metals & Hallmarking",
    label_prod_material: "Primary Body Material",
    placeholder_prod_material: "e.g. SS 304 / Food grade PP",
    label_prod_voltage: "Rated Voltage / Power",
    placeholder_prod_voltage: "e.g. 230V AC, 1800W",
    label_prod_capacity: "Rated Capacity / Size",
    placeholder_prod_capacity: "e.g. 1.8 Litres",
    label_prod_market: "Target Market / Channel",
    market_domestic: "Domestic Indian Market (Mandatory QCO)",
    market_export: "Export & Domestic Dual Compliance",
    market_gem: "Institutional & Government GeM Procurement",
    btn_generate_plan: "Generate Full Compliance Plan",
    analyzer_placeholder_title: "Ready to Analyze Product",
    analyzer_placeholder_desc: "Fill in the product specification and click Generate to see the grounded Indian Standard, testing matrix, and step-by-step checklist.",
    analyzer_readiness_score: "BIS Compliance Readiness Score",
    analyzer_checklist_title: "1. Preparation & Licensing Checklist",
    analyzer_export_plan: "Export Plan",
    analyzer_progress_hint: "Check off items in the checklist below to track preparation progress.",

    // Standards Explorer
    standards_heading: "Indian Standards Explorer (KYS)",
    standards_sub: "Search authorized Bureau of Indian Standards (IS), explore clauses, safety limits, testing parameters, and Quality Control Orders.",
    search_standards_placeholder: "Search standard by IS Number (e.g. IS 302, IS 14543), title, or product...",
    filter_all_categories: "All Categories",
    view_clauses_tests: "View Clauses & Tests",
    empty_standards: "No Indian Standards found matching your search.",
    indexed_clauses: "Indexed Clauses",
    standard_tests: "Standard Tests",
    version_label: "Version:",
    open_in_kys: "Open in Know Your Standard",

    // Laboratory Finder
    labs_heading: "BIS-Recognized Laboratory Finder (LIMS)",
    labs_sub: "Search BIS Central/Regional Labs and NABL-accredited third party testing centers matched to your required test scopes.",
    search_labs_placeholder: "Search by city, lab name, or test standard (e.g. Chennai, IS 302, Water)...",
    filter_all_states: "All States / Regions",
    location_label: "Location:",
    recognized_scopes: "Recognized Testing Scopes:",
    email_lab: "Email Lab",
    empty_labs: "No BIS-recognized laboratories found matching your criteria.",

    // Services Hub
    services_heading: "Official BIS Ecosystem & Deep Links",
    services_sub: "Direct access to official government portals for license applications, verification, standard downloads, and laboratory tracking.",
    key_functions: "Key Functions:",
    access_portal: "Access Portal",

    // System Health
    health_heading: "System Health & Ingestion Telemetry",
    health_sub: "Real-time status of backend services, RAG knowledge stores, citation verification pipelines, and audit logs.",
    metric_api_health: "API Server Health",
    metric_standards: "Ingested Indian Standards",
    metric_labs: "BIS-Recognized Test Centers",
    metric_services: "Integrated Official Services",
    status_operational: "Operational",
    telemetry_rules_title: "Orchestration & Verification Rules",
    rule_rag: "RAG Grounding: Only citations from verified Indian Standards (IS) clauses are returned.",
    rule_zero_hallucination: "Zero Hallucination Policy: Missing product attributes trigger interactive clarification cards.",
    rule_authority: "Regulatory Authority: Clear distinction between automated guidance and final official BIS licensing.",
    rule_language: "Language Engine: Technical identifiers (e.g., IS 302-2-15, Cl. 13, 0.75mA) are strictly preserved across English, Tamil, and Hindi translations.",

    // Drawer & Modal
    drawer_badge: "BIS Official Evidence",
    drawer_btn: "Open in Know Your Standard (KYS)",
    modal_badge: "AI Configuration",
    modal_title: "AI Engine & Model Settings",
    modal_desc: "Choose your preferred AI Intelligence Provider. You can use the high-performance Built-in Universal Brain (free & offline-capable) or connect your own API Key for Google Gemini, OpenAI, or Groq.",
    modal_active_provider: "Active AI Provider",
    modal_custom_key: "Custom API Key",
    btn_cancel: "Cancel",
    btn_save: "Save & Apply",
    btn_test_connection: "Test Connection",

    // Dynamic Cards in Chat
    card_applicable_std: "Applicable Standard",
    card_mandatory_under: "Mandatory under",
    card_view_full_scope: "View Full Scope & Clauses",
    card_suggested_followups: "Suggested Follow-ups",
    card_official_actions: "Official Next Actions",
    card_clarification_title: "Clarification Needed",
    fetching_evidence: "Fetching authoritative clause evidence...",
    no_evidence: "No clause evidence indexed for this standard yet."
  },

  hi: {
    lang_name: "हिंदी (Hindi)",
    brand_title: "बीआईएस एआई सहायक",
    brand_badge: "SIH 26107",
    brand_sub: "आधिकारिक एआई सत्यापन प्रणाली",
    brand_org: "भारतीय मानक ब्यूरो (BIS)",
    new_chat: "नई बातचीत",
    nav_section_ai: "एआई सहायक",
    nav_bis_ai: "बीआईएस मानक एआई",
    workspace: "कार्यक्षेत्र (WORKSPACE)",
    nav_assistant: "एआई सहायक",
    nav_analyzer: "उत्पाद विश्लेषक",
    nav_standards: "भारतीय मानक (IS)",
    nav_labs: "प्रयोगशाला खोजक (LIMS)",
    nav_services: "आधिकारिक पोर्टल",
    nav_health: "सिस्टम स्वास्थ्य",
    recent_chats: "हालिया सत्र",
    no_sessions: "अभी तक कोई सहेजा गया सत्र नहीं है",
    theme_dark: "डार्क",
    theme_light: "लाइट",
    auto_speak: "ऑटो-स्पीकर",

    // View Titles
    view_title_chat: "बीआईएस एआई बुद्धिमान सहायक",
    view_title_analyzer: "उत्पाद अनुपालन विश्लेषक और डैशबोर्ड",
    view_title_standards: "भारतीय मानक अन्वेषक (KYS)",
    view_title_labs: "बीआईएस मान्यता प्राप्त प्रयोगशाला खोजक (LIMS)",
    view_title_services: "आधिकारिक बीआईएस पोर्टल और लिंक",
    view_title_health: "सिस्टम स्वास्थ्य और टेलीमेट्री",

    // Welcome Hero
    welcome_badge: "भारतीय मानक ब्यूरो (BIS) — आधिकारिक अनुपालन एआई",
    welcome_title: "बीआईएस मानक और गुणवत्ता अनुपालन",
    welcome_sub: "भारतीय मानकों (IS), अनिवार्य गुणवत्ता नियंत्रण आदेशों (QCO), परीक्षण प्रोटोकॉल, ISI मार्क या प्रयोगशालाओं के बारे में पूछें।",

    // Prompt Chips
    chip1_title: "इलेक्ट्रिक केतली (IS 302-2-15)",
    chip1_desc: "सुरक्षा परीक्षण, बीआईएस स्कीम I, प्रयोगशाला निर्देशिका",
    chip1_prompt: "मैं इलेक्ट्रिक केतली बनाना चाहता हूँ। IS 302-2-15 के तहत मेरे उत्पाद को किन बीआईएस आवश्यकताओं को पूरा करना होगा?",

    chip2_title: "पैकेज्ड पेयजल (बोतलबंद पानी)",
    chip2_desc: "IS 14543, FSSAI-BIS आदेश, इन-हाउस लैब",
    chip2_prompt: "IS 14543 के तहत पैकेज्ड पेयजल बॉटलिंग प्लांट लगाने के लिए अनिवार्य परीक्षण और लाइसेंसिंग चरण क्या हैं?",

    chip3_title: "लिथियम-आयन बैटरी (CRS)",
    chip3_desc: "IS 16046 भाग 2, MeitY आदेश, R-नंबर",
    chip3_prompt: "IS 16046 के तहत लिथियम-आयन बैटरी पैक के लिए अनिवार्य पंजीकरण योजना (CRS) प्रक्रिया और परीक्षण क्या हैं?",

    chip4_title: "सुरक्षा हेलमेट (IS 4151)",
    chip4_desc: "QCO आदेश, इम्पैक्ट टेस्ट, अनिवार्य ISI नियम",
    chip4_prompt: "IS 4151 के तहत हेलमेट परीक्षण मानक, QCO आदेश और अनिवार्य ISI मार्क नियम क्या हैं?",

    chip5_title: "MSME 50% शुल्क छूट",
    chip5_desc: "उद्यम लाभ और मार्किंग शुल्क नियम",
    chip5_prompt: "MSME और स्टार्टअप निर्माताओं को बीआईएस मार्किंग और आवेदन शुल्क पर 50% की छूट कैसे मिलती है?",

    chip6_title: "स्कीम I बनाम स्कीम II प्रक्रिया",
    chip6_desc: "लाइसेंसिंग चरण, फैक्टरी ऑडिट और CRS",
    chip6_prompt: "बीआईएस अधिनियम 2016 के तहत स्कीम I (ISI मार्क) और स्कीम II (CRS) में क्या अंतर है?",

    // Input Area
    attach_tooltip: "दस्तावेज़ / विवरण संलग्न करें",
    input_placeholder: "किसी भी उत्पाद, IS मानक, परीक्षण या प्रयोगशाला के बारे में पूछें...",
    voice_tooltip: "आवाज़ इनपुट (स्पीच-टू-टेक्स्ट)",
    send_tooltip: "संदेश भेजें",
    input_disclaimer: "बीआईएस एआई सहायक भारतीय मानकों पर आधारित आधिकारिक मार्गदर्शन प्रदान करता है। Manakonline पर पुष्टि करें।",

    // Message Actions
    btn_listen: "सुनें",
    btn_speaking: "बोल रहा है...",
    btn_stop: "रोकें",
    btn_copy: "कॉपी",
    btn_copied: "क्लिपबोर्ड पर कॉपी किया गया!",
    btn_translate: "हिंदी में अनुवाद करें",
    btn_translating: "अनुवाद हो रहा है...",
    speaker_tooltip: "स्पीकर से उत्तर सुनें",
    translate_tooltip: "उत्तर को वर्तमान चयनित भाषा में अनुवाद करें",

    // Product Analyzer
    analyzer_heading: "उत्पाद अनुपालन विश्लेषक और डैशबोर्ड",
    analyzer_sub: "स्वचालित बीआईएस अनुपालन रोडमैप और लाइसेंसिंग चेकलिस्ट प्राप्त करने के लिए अपने उत्पाद का विवरण दर्ज करें।",
    analyzer_form_title: "उत्पाद विनिर्देश इनपुट",
    label_prod_name: "उत्पाद का नाम / विवरण *",
    placeholder_prod_name: "उदा. इलेक्ट्रिक केतली कॉर्डलेस बेस के साथ",
    label_prod_category: "उद्योग क्षेत्र",
    cat_electrical: "इलेक्ट्रिकल और इलेक्ट्रॉनिक्स",
    cat_food: "खाद्य और कृषि",
    cat_crs: "इलेक्ट्रॉनिक्स और आईटी सामान (CRS)",
    cat_mech: "मैकेनिकल / सड़क सुरक्षा",
    cat_toys: "उपभोक्ता सामान / खिलौने",
    cat_solar: "नवीकरणीय ऊर्जा / सौर",
    cat_kitchen: "घरेलू और रसोई के बर्तन",
    cat_precious: "कीमती धातु और हॉलमार्किंग",
    label_prod_material: "प्राथमिक सामग्री",
    placeholder_prod_material: "उदा. SS 304 / फ़ूड ग्रेड PP",
    label_prod_voltage: "रेटेड वोल्टेज / पावर",
    placeholder_prod_voltage: "उदा. 230V AC, 1800W",
    label_prod_capacity: "रेटेड क्षमता / आकार",
    placeholder_prod_capacity: "उदा. 1.8 लीटर",
    label_prod_market: "लक्षित बाजार / चैनल",
    market_domestic: "घरेलू भारतीय बाजार (अनिवार्य QCO)",
    market_export: "निर्यात और घरेलू अनुपालन",
    market_gem: "सरकारी GeM खरीद",
    btn_generate_plan: "पूर्ण अनुपालन योजना बनाएं",
    analyzer_placeholder_title: "उत्पाद विश्लेषण के लिए तैयार",
    analyzer_placeholder_desc: "उत्पाद विनिर्देश भरें और भारतीय मानक, परीक्षण मैट्रिक्स और चेकलिस्ट देखने के लिए जनरेट पर क्लिक करें।",
    analyzer_readiness_score: "बीआईएस अनुपालन तत्परता स्कोर",
    analyzer_checklist_title: "1. तैयारी और लाइसेंसिंग चेकलिस्ट",
    analyzer_export_plan: "योजना निर्यात करें",
    analyzer_progress_hint: "प्रगति ट्रैक करने के लिए नीचे दी गई चेकलिस्ट में आइटम मार्क करें।",

    // Standards Explorer
    standards_heading: "भारतीय मानक खोजक (KYS)",
    standards_sub: "अधिकृत भारतीय मानकों (IS), सुरक्षा सीमाओं और परीक्षण मानकों का अन्वेषण करें।",
    search_standards_placeholder: "IS नंबर (उदा. IS 302, IS 14543), शीर्षक या उत्पाद से खोजें...",
    filter_all_categories: "सभी श्रेणियां",
    view_clauses_tests: "क्लॉज और परीक्षण देखें",
    empty_standards: "आपकी खोज से मेल खाने वाला कोई भारतीय मानक नहीं मिला।",
    indexed_clauses: "अनुक्रमित क्लॉज",
    standard_tests: "मानक परीक्षण",
    version_label: "संस्करण:",
    open_in_kys: "Know Your Standard में खोलें",

    // Laboratory Finder
    labs_heading: "बीआईएस मान्यता प्राप्त प्रयोगशालाएं (LIMS)",
    labs_sub: "अपने आवश्यक परीक्षण क्षेत्र से मेल खाने वाली प्रयोगशालाएं खोजें।",
    search_labs_placeholder: "शहर, प्रयोगशाला नाम या मानक द्वारा खोजें (उदा. चेन्नई, IS 302)...",
    filter_all_states: "सभी राज्य / क्षेत्र",
    location_label: "स्थान:",
    recognized_scopes: "मान्यता प्राप्त परीक्षण क्षेत्र:",
    email_lab: "ईमेल लैब",
    empty_labs: "आपके मानदंडों से मेल खाने वाली कोई मान्यता प्राप्त प्रयोगशाला नहीं मिली।",

    // Services Hub
    services_heading: "आधिकारिक बीआईएस पोर्टल",
    services_sub: "लाइसेंस आवेदन, मानक डाउनलोड और सत्यापन सेवाओं के लिए सीधे लिंक।",
    key_functions: "मुख्य कार्य:",
    access_portal: "पोर्टल खोलें",

    // System Health
    health_heading: "सिस्टम स्वास्थ्य और टेलीमेट्री",
    health_sub: "बैकएंड सेवाओं, आरएजी ज्ञान भंडार और ऑडिट लॉग की वास्तविक स्थिति।",
    metric_api_health: "एपीआई सर्वर स्वास्थ्य",
    metric_standards: "शामिल भारतीय मानक",
    metric_labs: "मान्यता प्राप्त परीक्षण केंद्र",
    metric_services: "एकीकृत आधिकारिक सेवाएं",
    status_operational: "सक्रिय (कार्यशील)",
    telemetry_rules_title: "ऑर्केस्ट्रेशन और सत्यापन नियम",
    rule_rag: "RAG ग्राउंडिंग: केवल सत्यापित भारतीय मानक (IS) क्लॉज के उद्धरण दिए जाते हैं।",
    rule_zero_hallucination: "शून्य भ्रम नीति: लापता उत्पाद विशेषताओं पर स्पष्टीकरण कार्ड दिखाए जाते हैं।",
    rule_authority: "नियामक प्राधिकरण: स्वचालित मार्गदर्शन और अंतिम आधिकारिक बीआईएस लाइसेंसिंग में स्पष्ट अंतर।",
    rule_language: "भाषा इंजन: तकनीकी पहचानकर्ता (उदा. IS 302-2-15) अनुवादों में सुरक्षित रहते हैं।",

    // Drawer & Modal
    drawer_badge: "बीआईएस आधिकारिक साक्ष्य",
    drawer_btn: "Know Your Standard (KYS) में खोलें",
    modal_badge: "एआई विन्यास",
    modal_title: "एआई इंजन और मॉडल सेटिंग्स",
    modal_desc: "अपना पसंदीदा एआई प्रदाता चुनें। आप अंतर्निहित यूनिवर्सल ब्रेन का उपयोग कर सकते हैं या अपनी एपीआई कुंजी जोड़ सकते हैं।",
    modal_active_provider: "सक्रिय एआई प्रदाता",
    modal_custom_key: "कस्टम एपीआई कुंजी",
    btn_cancel: "रद्द करें",
    btn_save: "सहेजें और लागू करें",
    btn_test_connection: "कनेक्शन जांचें",

    // Dynamic Cards
    card_applicable_std: "लागू भारतीय मानक",
    card_mandatory_under: "के तहत अनिवार्य",
    card_view_full_scope: "पूर्ण कार्यक्षेत्र और क्लॉज देखें",
    card_suggested_followups: "सुझाए गए अनुवर्ती प्रश्न",
    card_official_actions: "आधिकारिक अगले कदम",
    card_clarification_title: "स्पष्टीकरण आवश्यक है",
    fetching_evidence: "प्रामाणिक क्लॉज साक्ष्य लोड हो रहा है...",
    no_evidence: "इस मानक के लिए अभी तक कोई क्लॉज अनुक्रमित नहीं है।"
  },

  ta: {
    lang_name: "தமிழ் (Tamil)",
    brand_title: "BIS AI உதவியாளர்",
    brand_badge: "SIH 26107",
    brand_sub: "அதிகாரப்பூர்வ AI சரிபார்ப்பு தளம்",
    brand_org: "இந்திய தரநிலைகள் பணியகம் (BIS)",
    new_chat: "புதிய உரையாடல்",
    nav_section_ai: "AI உதவியாளர்",
    nav_bis_ai: "BIS தரநிலைகள் AI",
    workspace: "பணிமனை (WORKSPACE)",
    nav_assistant: "AI உதவியாளர்",
    nav_analyzer: "பொருட்கள் பகுப்பாய்வி",
    nav_standards: "இந்திய தரங்கள் (IS)",
    nav_labs: "ஆய்வகங்கள் (LIMS)",
    nav_services: "அதிகாரப்பூர்வ தளங்கள்",
    nav_health: "கணினி நிலை",
    recent_chats: "முந்தைய உரையாடல்கள்",
    no_sessions: "முந்தைய உரையாடல்கள் எதுவும் இல்லை",
    theme_dark: "இருண்ட பயன்முறை",
    theme_light: "வெளிச்ச பயன்முறை",
    auto_speak: "தானியங்கி குரல்",

    // View Titles
    view_title_chat: "BIS AI நுண்ணறிவு உதவியாளர்",
    view_title_analyzer: "தயாரிப்பு சான்றிதழ் திட்டமிடல் பலகை",
    view_title_standards: "இந்திய தரநிலைகள் தேடல் (KYS)",
    view_title_labs: "BIS அங்கீகரிக்கப்பட்ட ஆய்வகங்கள் (LIMS)",
    view_title_services: "அதிகாரப்பூர்வ BIS இணையதளங்கள்",
    view_title_health: "கணினி நிலை மற்றும் செயல்பாட்டு விவரங்கள்",

    // Welcome Hero
    welcome_badge: "இந்திய தரநிலைகள் பணியகம் (BIS) — அதிகாரப்பூர்வ AI வழிகாட்டி",
    welcome_title: "BIS வழிகாட்டுதலில் நான் உங்களுக்கு எவ்வாறு உதவட்டும்?",
    welcome_sub: "இந்திய தரநிலைகள் (IS), கட்டாய தரக் கட்டுப்பாட்டு ஆணைகள் (QCO), ISI முத்திரை, CRS பதிவு மற்றும் பரிசோதனை ஆய்வகங்கள் பற்றி கேளுங்கள்.",

    // Prompt Chips
    chip1_title: "மின்சார கெட்டில் (IS 302-2-15)",
    chip1_desc: "பாதுகாப்பு சோதனைகள், BIS திட்டம் I, ஆய்வக விவரங்கள்",
    chip1_prompt: "நான் ஒரு மின்சார கெட்டில் தயாரிக்க விரும்புகிறேன். IS 302-2-15 கீழ் எனது தயாரிப்பு என்னென்ன BIS தேவைகளை பூர்த்தி செய்ய வேண்டும்?",

    chip2_title: "பேக்கேஜ் செய்யப்பட்ட குடிநீர்",
    chip2_desc: "IS 14543, FSSAI-BIS கட்டாயம், உள்ளக ஆய்வகம்",
    chip2_prompt: "IS 14543 இன் கீழ் பேக்கேஜ் செய்யப்பட்ட குடிநீர் ஆலை அமைப்பதற்கான கட்டாய சோதனைகள் மற்றும் உரிமம் பெறும் வழிகள் என்ன?",

    chip3_title: "லித்தியம்-அயன் பேட்டரி (CRS)",
    chip3_desc: "IS 16046 பகுதி 2, MeitY ஆணை, R-எண் பதிவு",
    chip3_prompt: "IS 16046 இன் கீழ் லித்தியம்-அயன் பேட்டரிகளுக்கான கட்டாய பதிவு திட்டம் (CRS) செயல்முறை மற்றும் சோதனைகள் என்ன?",

    chip4_title: "பாதுகாப்பு தலைக்கவசம் (IS 4151)",
    chip4_desc: "QCO ஆணை, தாக்க சோதனைகள், ISI விதிகள்",
    chip4_prompt: "IS 4151 இன் கீழ் ஹெல்மெட் சோதனை அளவுகோல்கள், QCO ஆணைகள் மற்றும் கட்டாய ISI முத்திரை விதிகள் என்ன?",

    chip5_title: "MSME 50% கட்டணச் சலுகை",
    chip5_desc: "உத்யம் சலுகைகள் மற்றும் ஆய்வுக் கட்டண விதிகள்",
    chip5_prompt: "MSME மற்றும் ஸ்டார்ட்-அப் உற்பத்தியாளர்கள் BIS கட்டணங்களில் 50% சலுகையை எவ்வாறு பெறுவது?",

    chip6_title: "திட்டம் I vs திட்டம் II செயல்முறை",
    chip6_desc: "உரிமம் பெறும் படிகள், தொழிற்சாலை ஆய்வு, CRS",
    chip6_prompt: "BIS சட்டம் 2016 இன் கீழ் திட்டம் I (ISI முத்திரை) மற்றும் திட்டம் II (CRS) ஆகியவற்றுக்கு இடையேயான வித்தியாசம் என்ன?",

    // Input Area
    attach_tooltip: "ஆவணத்தை இணைக்கவும்",
    input_placeholder: "எந்தவொரு தயாரிப்பு, இந்திய தரம் (IS), பரிசோதனை அல்லது ஆய்வகம் பற்றி கேளுங்கள்...",
    voice_tooltip: "குரல் வழி உள்ளீடு (பேசி தட்டச்சு செய்க)",
    send_tooltip: "செய்தி அனுப்புக",
    input_disclaimer: "BIS AI உதவியாளர் அதிகாரப்பூர்வ இந்திய தரநிலைகளின் அடிப்படையில் வழிகாட்டுகிறது. Manakonline தளத்தில் இறுதி உரிமத்தை உறுதிப்படுத்தவும்.",

    // Message Actions
    btn_listen: "கேளுங்கள்",
    btn_speaking: "பேசுகிறது...",
    btn_stop: "நிறுத்து",
    btn_copy: "நகலெடு",
    btn_copied: "நகலெடுக்கப்பட்டது!",
    btn_translate: "தமிழில் மொழிபெயர்",
    btn_translating: "மொழிபெயர்க்கிறது...",
    speaker_tooltip: "பதிலை குரல் மூலம் கேளுங்கள்",
    translate_tooltip: "பதிலை தேர்ந்தெடுக்கப்பட்ட மொழிக்கு மொழிபெயர்க்கவும்",

    // Product Analyzer
    analyzer_heading: "தயாரிப்பு சான்றிதழ் திட்டமிடல் பலகை",
    analyzer_sub: "உங்கள் தயாரிப்பு விவரங்களை உள்ளிட்டு BIS வழிகாட்டுதல்கள் மற்றும் சான்றிதழ் சரிபார்ப்பு பட்டியலை உடனடியாகப் பெறுங்கள்.",
    analyzer_form_title: "தயாரிப்பு விவர உள்ளீடு",
    label_prod_name: "தயாரிப்பு பெயர் / விளக்கம் *",
    placeholder_prod_name: "எ.கா. மின்சார கெட்டில் (Electric Kettle)",
    label_prod_category: "தொழில் துறை",
    cat_electrical: "மின்சாரம் & மின்னணுவியல்",
    cat_food: "உணவு & விவசாயம்",
    cat_crs: "மின்னணு & தகவல் தொழில்நுட்ப பொருட்கள் (CRS)",
    cat_mech: "இயந்திரவியல் / சாலை பாதுகாப்பு",
    cat_toys: "நுகர்வோர் பொருட்கள் / பொம்மைகள்",
    cat_solar: "புதுப்பிக்கத்தக்க ஆற்றல் / சூரிய மின்சாரம்",
    cat_kitchen: "வீட்டு உபயோக & சமையல் பாத்திரங்கள்",
    cat_precious: "விலைமதிப்பற்ற உலோகங்கள் & ஹால்மார்க்கிங்",
    label_prod_material: "உற்பத்திப் பொருள்",
    placeholder_prod_material: "எ.கா. SS 304 ஸ்டெயின்லெஸ் ஸ்டீல்",
    label_prod_voltage: "மின்னழுத்தம் / பவர்",
    placeholder_prod_voltage: "எ.கா. 230V AC, 1500W",
    label_prod_capacity: "அளவு / கொள்ளளவு",
    placeholder_prod_capacity: "எ.கா. 1.8 லிட்டர்",
    label_prod_market: "இலக்கு சந்தை",
    market_domestic: "இந்திய உள்நாட்டு சந்தை (கட்டாய QCO)",
    market_export: "ஏற்றுமதி மற்றும் உள்நாட்டு விற்பனை",
    market_gem: "அரசு GeM கொள்முதல்",
    btn_generate_plan: "முழு வழிகாட்டுதல் திட்டத்தை உருவாக்குக",
    analyzer_placeholder_title: "பகுப்பாய்வுக்கு தயாராக உள்ளது",
    analyzer_placeholder_desc: "தயாரிப்பு விவரங்களை நிரப்பி, இந்திய தரநிலைகள், சோதனை அட்டவணை மற்றும் சரிபார்ப்பு பட்டியலைக் காண பொத்தானை அழுத்தவும்.",
    analyzer_readiness_score: "BIS தயார்நிலை மதிப்பீடு",
    analyzer_checklist_title: "1. தயாரிப்பு மற்றும் உரிம சரிபார்ப்பு பட்டியல்",
    analyzer_export_plan: "திட்டத்தை பதிவிறக்கு",
    analyzer_progress_hint: "முன்னேற்றத்தைக் கண்காணிக்க கீழே உள்ள சரிபார்ப்புப் பட்டியலில் குறிக்கவும்.",

    // Standards Explorer
    standards_heading: "இந்திய தரங்கள் தேடல் (KYS)",
    standards_sub: "அங்கீகரிக்கப்பட்ட இந்திய தரநிலைகள் (IS), பாதுகாப்பு விதிகளின் பிரிவுகள் மற்றும் விவரங்களை ஆராயுங்கள்.",
    search_standards_placeholder: "IS எண் (எ.கா. IS 302, IS 14543), தலைப்பு அல்லது தயாரிப்பு மூலம் தேடுக...",
    filter_all_categories: "அனைத்து துறைகளும்",
    view_clauses_tests: "விதிகள் மற்றும் சோதனைகளைக் காண்க",
    empty_standards: "உங்கள் தேடலுக்குரிய இந்திய தரநிலைகள் எதுவும் கிடைக்கவில்லை.",
    indexed_clauses: "அட்டவணைப்படுத்தப்பட்ட பிரிவுகள்",
    standard_tests: "நிலையான சோதனைகள்",
    version_label: "பதிப்பு:",
    open_in_kys: "Know Your Standard தளத்தில் திறக்கவும்",

    // Laboratory Finder
    labs_heading: "BIS அங்கீகரிக்கப்பட்ட ஆய்வகங்கள் (LIMS)",
    labs_sub: "உங்கள் தயாரிப்பைப் பரிசோதிக்கக்கூடிய மத்திய/மண்டல மற்றும் NABL அங்கீகாரம் பெற்ற ஆய்வகங்களைக் கண்டறியுங்கள்.",
    search_labs_placeholder: "நகரம், ஆய்வக பெயர் அல்லது தரம் மூலம் தேடுக (எ.கா. சென்னை, IS 302)...",
    filter_all_states: "அனைத்து மாநிலங்கள் / பகுதிகள்",
    location_label: "இடம்:",
    recognized_scopes: "அங்கீகரிக்கப்பட்ட சோதனைப் பிரிவுகள்:",
    email_lab: "மின்னஞ்சல் அனுப்புக",
    empty_labs: "உங்கள் தேவைகளுக்குப் பொருத்தமான ஆய்வகங்கள் எதுவும் கிடைக்கவில்லை.",

    // Services Hub
    services_heading: "அதிகாரப்பூர்வ BIS இணையதளங்கள்",
    services_sub: "உரிமம் விண்ணப்பித்தல், HUID சரிபார்த்தல் மற்றும் BIS சேவைகளுக்கான நேரடி இணைப்புகள்.",
    key_functions: "முக்கிய செயல்பாடுகள்:",
    access_portal: "இணையதளத்திற்கு செல்க",

    // System Health
    health_heading: "கணினி நிலை மற்றும் செயல்பாட்டு விவரங்கள்",
    health_sub: "பின்னணி சேவைகள், RAG அறிவுத் தளம் மற்றும் தணிக்கை பதிவுகளின் நேரடி நிலை.",
    metric_api_health: "API சேவையக நிலை",
    metric_standards: "சேர்க்கப்பட்ட இந்திய தரங்கள்",
    metric_labs: "அங்கீகரிக்கப்பட்ட ஆய்வகங்கள்",
    metric_services: "இணைக்கப்பட்ட அரசு சேவைகள்",
    status_operational: "சிறப்பாக இயங்குகிறது",
    telemetry_rules_title: "செயல்பாட்டு விதிகள் & சரிபார்ப்புக் கோட்பாடுகள்",
    rule_rag: "RAG கட்டமைப்பு: சரிபார்க்கப்பட்ட இந்திய தரநிலைகள் (IS) பிரிவுகளில் இருந்து மட்டுமே ஆதாரங்கள் வழங்கப்படும்.",
    rule_zero_hallucination: "பிழையற்ற தகவல் கொள்கை: விடுபட்ட தயாரிப்பு விவரங்களுக்கு கூடுதல் விளக்கக் கேள்விகள் கேட்கப்படும்.",
    rule_authority: "அதிகாரப்பூர்வ வரம்பு: தானியங்கி வழிகாட்டலுக்கும் இறுதி BIS உரிமத்திற்கும் இடையிலான தெளிவான வேறுபாடு.",
    rule_language: "மொழிப் பாதுகாப்பு: தொழில்நுட்ப குறியீடுகள் (எ.கா. IS 302-2-15) துல்லியமாக பாதுகாக்கப்படுகின்றன.",

    // Drawer & Modal
    drawer_badge: "BIS அதிகாரப்பூர்வ சான்றுகள்",
    drawer_btn: "Know Your Standard (KYS) தளத்தில் திறக்கவும்",
    modal_badge: "AI கட்டமைப்பு",
    modal_title: "AI எஞ்சின் மற்றும் மாதிரி அமைப்புகள்",
    modal_desc: "உங்களுக்கு விருப்பமான AI வழங்குநரைத் தேர்ந்தெடுக்கவும். உள்ளமைக்கப்பட்ட Universal Brain அல்லது உங்கள் சொந்த API சாவியைப் பயன்படுத்தலாம்.",
    modal_active_provider: "செயலில் உள்ள AI வழங்குநர்",
    modal_custom_key: "தனிப்பயன் API சாவி",
    btn_cancel: "ரத்து செய்",
    btn_save: "சேமித்து செயல்படுத்து",
    btn_test_connection: "இணைப்பைச் சோதிக்கவும்",

    // Dynamic Cards
    card_applicable_std: "பொருந்தக்கூடிய இந்திய தரம்",
    card_mandatory_under: "இதன் கீழ் கட்டாயம்",
    card_view_full_scope: "முழு விவரங்கள் மற்றும் பிரிவுகளைக் காண்க",
    card_suggested_followups: "பரிந்துரைக்கப்பட்ட அடுத்த கேள்விகள்",
    card_official_actions: "அதிகாரப்பூர்வ அடுத்த நடவடிக்கைகள்",
    card_clarification_title: "கூடுதல் விளக்கம் தேவை",
    fetching_evidence: "அதிகாரப்பூர்வ சான்றுகள் பெறப்படுகின்றன...",
    no_evidence: "இந்த தரநிலைக்கு தற்போது சான்றுகள் அட்டவணைப்படுத்தப்படவில்லை."
  },

  te: {
    lang_name: "తెలుగు (Telugu)",
    brand_title: "BIS AI సహాయకుడు",
    brand_badge: "SIH 26107",
    brand_sub: "అధికారిక AI ధృవీకరణ వేదిక",
    brand_org: "భారతీయ ప్రమాణాల బ్యూరో (BIS)",
    new_chat: "కొత్త సంభాషణ",
    nav_section_ai: "AI సహాయకుడు",
    nav_bis_ai: "BIS ప్రమాణాలు AI",
    workspace: "వర్క్‌స్పేస్ (WORKSPACE)",
    nav_assistant: "AI సహాయకుడు",
    nav_analyzer: "ఉత్పత్తి విశ్లేషణ",
    nav_standards: "భారతీయ ప్రమాణాలు (IS)",
    nav_labs: "ప్రయోగశాలల శోధన (LIMS)",
    nav_services: "అధికారిక BIS పోర్టల్స్",
    nav_health: "సిస్టమ్ ఆరోగ్యం",
    recent_chats: "ఇటీవలి సెషన్లు",
    no_sessions: "ఇంతవరకు సంభాషణలు ఏవీ లేవు",
    theme_dark: "డార్క్ మోడ్",
    theme_light: "లైట్ మోడ్",
    auto_speak: "ఆటో-స్పీకర్",

    // View Titles
    view_title_chat: "BIS AI ఇంటెలిజెంట్ అసిస్టెంట్",
    view_title_analyzer: "ఉత్పత్తి సమ్మతి విశ్లేషణ & డ్యాష్‌బోర్డ్",
    view_title_standards: "భారతీయ ప్రమాణాల అన్వేషణ (KYS)",
    view_title_labs: "BIS గుర్తింపు పొందిన ల్యాబ్‌ల శోధన (LIMS)",
    view_title_services: "అధికారిక BIS సేవల పోర్టల్స్",
    view_title_health: "సిస్టమ్ ఆరోగ్యం & టెలిమెట్రీ",

    // Welcome Hero
    welcome_badge: "బ్యూరో ఆఫ్ ఇండియన్ స్టాండర్డ్స్ (BIS) — అధికారిక AI",
    welcome_title: "BIS నిబంధనలలో మీకు ఎలా సహాయం చేయగలను?",
    welcome_sub: "భారతీయ ప్రమాణాలు (IS), నాణ్యత నియంత్రణ ఆదేశాలు (QCOs), టెస్టింగ్ ప్రోటోకాల్స్, ISI మార్క్, లేదా పరీక్ష ప్రయోగశాలల గురించి అడగండి.",

    // Prompt Chips
    chip1_title: "ఎలక్ట్రిక్ కెటిల్ (IS 302-2-15)",
    chip1_desc: "భద్రతా పరీక్షలు, BIS స్కీమ్ I, ల్యాబ్ వివరాలు",
    chip1_prompt: "నేను ఎలక్ట్రిక్ కెటిల్ తయారు చేయాలనుకుంటున్నాను. IS 302-2-15 కింద నా ఉత్పత్తి ఏయే BIS అవసరాలను తీర్చాలి?",

    chip2_title: "ప్యాకేజ్డ్ తాగునీరు",
    chip2_desc: "IS 14543, FSSAI-BIS తప్పనిసరి నిబంధన",
    chip2_prompt: "IS 14543 కింద ప్యాకేజ్డ్ తాగునీటి బాట్లింగ్ ప్లాంట్ ఏర్పాటుకు అవసరమైన పరీక్షలు మరియు లైసెన్సింగ్ విధానం ఏమిటి?",

    chip3_title: "లిథియం-అయాన్ బ్యాటరీ (CRS)",
    chip3_desc: "IS 16046 భాగం 2, MeitY ఆర్డర్, R-సంఖ్య",
    chip3_prompt: "IS 16046 కింద లిథియం-అయాన్ బ్యాటరీ ప్యాక్‌ల కోసం తప్పనిసరి రిజిస్ట్రేషన్ పథకం (CRS) విధానం ఏమిటి?",

    chip4_title: "రక్షణ హెల్మెట్లు (IS 4151)",
    chip4_desc: "QCO ఆర్డర్, ఇంపాక్ట్ పరీక్షలు, ISI నిబంధనలు",
    chip4_prompt: "IS 4151 కింద హెల్మెట్ టెస్టింగ్ ప్రమాణాలు, QCO ఆర్డర్లు మరియు తప్పనిసరి ISI మార్క్ నిబంధనలు ఏమిటి?",

    chip5_title: "MSME 50% ఫీజు రాయితీ",
    chip5_desc: "ఉద్యమ్ ప్రయోజనాలు & మార్కింగ్ ఫీజు నియమాలు",
    chip5_prompt: "MSME మరియు స్టార్టప్ తయారీదారులు BIS మార్కింగ్ మరియు దరఖాస్తు ఫీజులలో 50% రాయితీని ఎలా పొందగలరు?",

    chip6_title: "స్కీమ్ I vs స్కీమ్ II ప్రక్రియ",
    chip6_desc: "లైసెన్సింగ్ దశలు, ఫ్యాక్టరీ ఆడిట్ & CRS",
    chip6_prompt: "BIS చట్టం 2016 కింద స్కీమ్ I (ISI మార్క్) మరియు స్కీమ్ II (CRS) మధ్య తేడా ఏమిటి?",

    // Input Area
    attach_tooltip: "పత్రాన్ని జతచేయండి",
    input_placeholder: "ఏదైనా ఉత్పత్తి, IS కోడ్, పరీక్ష లేదా ల్యాబ్ గురించి అడగండి...",
    voice_tooltip: "వాయిస్ ఇన్‌పుట్ (మాట్లాడి టైప్ చేయండి)",
    send_tooltip: "సందేశం పంపండి",
    input_disclaimer: "BIS AI సహాయకుడు భారతీయ ప్రమాణాల ఆధారంగా అధికారిక మార్గదర్శకత్వాన్ని అందిస్తుంది. Manakonline లో నిర్ధారించండి.",

    // Message Actions
    btn_listen: "వినండి",
    btn_speaking: "మాట్లాడుతోంది...",
    btn_stop: "ఆపు",
    btn_copy: "కాపీ",
    btn_copied: "కాపీ చేయబడింది!",
    btn_translate: "తెలుగులోకి అనువదించండి",
    btn_translating: "అనువదిస్తోంది...",
    speaker_tooltip: "వాయిస్ స్పీకర్ ద్వారా సమాధానం వినండి",
    translate_tooltip: "సమాధానాన్ని ప్రస్తుతం ఎంచుకున్న భాషలోకి అనువదించండి",

    // Product Analyzer
    analyzer_heading: "ఉత్పత్తి సమ్మతి విశ్లేషణ & డ్యాష్‌బోర్డ్",
    analyzer_sub: "మీ ఉత్పత్తి వివరాలను నమోదు చేసి BIS టెస్టింగ్ షెడ్యూల్ మరియు లైసెన్స్ చెక్‌లిస్ట్‌ను పొందండి.",
    analyzer_form_title: "ఉత్పత్తి వివరాల నమోదు",
    label_prod_name: "ఉత్పత్తి పేరు / వివరణ *",
    placeholder_prod_name: "ఉదా. ఎలక్ట్రిక్ కెటిల్",
    label_prod_category: "పరిశ్రమ రంగం",
    cat_electrical: "ఎలక్ట్రికల్ & ఎలక్ట్రానిక్స్",
    cat_food: "ఆహారం & వ్యవసాయం",
    cat_crs: "ఎలక్ట్రానిక్స్ & ఐటీ వస్తువులు (CRS)",
    cat_mech: "మెకానికల్ / రోడ్ భద్రత",
    cat_toys: "వినియోగదారు వస్తువులు / బొమ్మలు",
    cat_solar: "పునరుత్పాదక శక్తి / సౌర శక్తి",
    cat_kitchen: "గృహ & వంట పాత్రలు",
    cat_precious: "విలువైన లోహాలు & హాల్‌మార్కింగ్",
    label_prod_material: "ప్రాథమిక పదార్థం",
    placeholder_prod_material: "ఉదా. SS 304 స్టెయిన్‌లెస్ స్టీల్",
    label_prod_voltage: "వోల్టేజ్ / పవర్",
    placeholder_prod_voltage: "ఉదా. 230V AC, 1800W",
    label_prod_capacity: "పరిమాణం / సామర్థ్యం",
    placeholder_prod_capacity: "ఉదా. 1.8 లీటర్లు",
    label_prod_market: "లక్ష్య మార్కెట్",
    market_domestic: "దేశీయ భారతీయ మార్కెట్ (తప్పనిసరి QCO)",
    market_export: "ఎగుమతి మరియు దేశీయ అమ్మకాలు",
    market_gem: "ప్రభుత్వ GeM సేకరణ",
    btn_generate_plan: "పూర్తి ప్రణాళికను రూపొందించండి",
    analyzer_placeholder_title: "విశ్లేషణకు సిద్ధంగా ఉంది",
    analyzer_placeholder_desc: "ఉత్పత్తి వివరాలను నమోదు చేసి, భారతీయ ప్రమాణాలు మరియు చెక్‌లిస్ట్‌ను చూడటానికి బటన్‌ను క్లిక్ చేయండి.",
    analyzer_readiness_score: "BIS సన్నద్ధత స్కోరు",
    analyzer_checklist_title: "1. తయారీ & లైసెన్సింగ్ చెక్‌లిస్ట్",
    analyzer_export_plan: "ప్లాన్ డౌన్‌లోడ్",
    analyzer_progress_hint: "పురోగతిని ట్రాక్ చేయడానికి క్రింది చెక్‌లిస్ట్‌ను ఉపయోగించండి.",

    // Standards Explorer
    standards_heading: "భారతీయ ప్రమాణాల అన్వేషణ (KYS)",
    standards_sub: "అధికారిక భారతీయ ప్రమాణాలు (IS), భద్రతా పరిమితులు మరియు పరీక్ష పారామితులను తెలుసుకోండి.",
    search_standards_placeholder: "IS నంబర్ (ఉదా. IS 302, IS 14543), శీర్షిక లేదా ఉత్పత్తి ద్వారా శోధించండి...",
    filter_all_categories: "అన్ని రంగాలు",
    view_clauses_tests: "నిబంధనలు & పరీక్షలను వీక్షించండి",
    empty_standards: "మీ శోధనకు తగిన భారతీయ ప్రమాణాలు ఏవీ కనుగొనబడలేదు.",
    indexed_clauses: "ఇండెక్స్ చేయబడిన నిబంధనలు",
    standard_tests: "ప్రామాణిక పరీక్షలు",
    version_label: "వెర్షన్:",
    open_in_kys: "Know Your Standard లో తెరవండి",

    // Laboratory Finder
    labs_heading: "BIS గుర్తింపు పొందిన ల్యాబ్‌లు (LIMS)",
    labs_sub: "మీ ఉత్పత్తి పరీక్షలకు సరిపోయే కేంద్ర మరియు NABL గుర్తింపు పొందిన ప్రయోగశాలలను కనుగొనండి.",
    search_labs_placeholder: "నగరం, ల్యాబ్ పేరు లేదా ప్రమాణం ద్వారా శోధించండి (ఉదా. చెన్నై, IS 302)...",
    filter_all_states: "అన్ని రాష్ట్రాలు / ప్రాంతాలు",
    location_label: "ప్రాంతం:",
    recognized_scopes: "గుర్తింపు పొందిన టెస్టింగ్ పరిధులు:",
    email_lab: "ఈమెయిల్ ల్యాబ్",
    empty_labs: "మీ ప్రమాణాలకు సరిపోయే ల్యాబ్‌లు ఏవీ కనుగొనబడలేదు.",

    // Services Hub
    services_heading: "అధికారిక BIS సేవల పోర్టల్స్",
    services_sub: "లైసెన్స్ దరఖాస్తు, ప్రమాణాల డౌన్‌లోడ్ మరియు ప్రయోగశాల ట్రాకింగ్ కోసం అధికారిక లింకులు.",
    key_functions: "కీలక విధులు:",
    access_portal: "పోర్టల్‌ను తెరవండి",

    // System Health
    health_heading: "సిస్టమ్ ఆరోగ్యం & టెలిమెట్రీ",
    health_sub: "బ్యాకెండ్ సేవలు, RAG నాలెడ్జ్ బేస్ మరియు ఆడిట్ లాగ్‌ల ప్రత్యక్ష స్థితి.",
    metric_api_health: "API సర్వర్ ఆరోగ్యం",
    metric_standards: "చేర్చబడిన భారతీయ ప్రమాణాలు",
    metric_labs: "గుర్తింపు పొందిన ల్యాబ్‌లు",
    metric_services: "అనుసంధానించబడిన అధికారిక సేవలు",
    status_operational: "సజావుగా పనిచేస్తోంది",
    telemetry_rules_title: "ధృవీకరణ నియమాలు",
    rule_rag: "RAG గ్రౌండింగ్: అధికారిక భారతీయ ప్రమాణాల (IS) నుండి మాత్రమే ఆధారాలు ఇవ్వబడతాయి.",
    rule_zero_hallucination: "ఖచ్చితత్వ విధానం: తప్పిపోయిన ఉత్పత్తి వివరాలపై వివరణ కార్డులు చూపబడతాయి.",
    rule_authority: "అధికారిక పరిధి: ఆటోమేటెడ్ మార్గదర్శకత్వానికి మరియు తుది BIS లైసెన్స్‌కు స్పష్టమైన తేడా ఉంది.",
    rule_language: "భాషా ఇంజిన్: సాంకేతిక కోడ్‌లు (ఉదా. IS 302) అనువాదాలలో యథాతథంగా ఉంటాయి.",

    // Drawer & Modal
    drawer_badge: "BIS అధికారిక సాక్ష్యాలు",
    drawer_btn: "Know Your Standard (KYS) లో తెరవండి",
    modal_badge: "AI కాన్ఫిగరేషన్",
    modal_title: "AI ఇంజిన్ & మోడల్ సెట్టింగ్‌లు",
    modal_desc: "మీకు కావలసిన AI ప్రొవైడర్‌ను ఎంచుకోండి. ఉచిత Universal Brain లేదా మీ సొంత API కీని ఉపయోగించండి.",
    modal_active_provider: "యాక్టివ్ AI ప్రొవైడర్",
    modal_custom_key: "కస్టమ్ API కీ",
    btn_cancel: "రద్దు చేయండి",
    btn_save: "సేవ్ చేసి వర్తింపజేయండి",
    btn_test_connection: "కనెక్షన్ పరీక్షించండి",

    // Dynamic Cards
    card_applicable_std: "వర్తించే భారతీయ ప్రమాణం",
    card_mandatory_under: "కింద తప్పనిసరి",
    card_view_full_scope: "పూర్తి నిబంధనలు చూడండి",
    card_suggested_followups: "సూచించిన తదుపరి ప్రశ్నలు",
    card_official_actions: "అధికారిక తదుపరి చర్యలు",
    card_clarification_title: "వివరణ అవసరం",
    fetching_evidence: "సాక్ష్యాలను లోడ్ చేస్తోంది...",
    no_evidence: "ఈ ప్రమాణానికి ఇంకా వివరాలు చేర్చబడలేదు."
  },

  bn: {
    lang_name: "বাংলা (Bengali)",
    brand_title: "BIS AI সহকারী",
    brand_badge: "SIH 26107",
    brand_sub: "অফিসিয়াল AI যাচাইকরণ স্তর",
    brand_org: "ব্যুরো অফ ইন্ডিয়ান স্ট্যান্ডার্ডস (BIS)",
    new_chat: "নতুন কথোপকথন",
    nav_section_ai: "AI সহকারী",
    nav_bis_ai: "BIS মানদণ্ড AI",
    workspace: "ওয়ার্কস্পেস (WORKSPACE)",
    nav_assistant: "AI সহকারী",
    nav_analyzer: "পণ্য বিশ্লেষক",
    nav_standards: "ভারতীয় মানদণ্ড (IS)",
    nav_labs: "পরীক্ষাগার সন্ধান (LIMS)",
    nav_services: "অফিসিয়াল পোর্টাল",
    nav_health: "সিস্টেম স্বাস্থ্য",
    recent_chats: "সাম্প্রতিক সেশন",
    no_sessions: "এখনও কোনও সংরক্ষিত কথোপকথন নেই",
    theme_dark: "ডার্ক মোড",
    theme_light: "লাইট মোড",
    auto_speak: "অটো-স্পিকার",

    // View Titles
    view_title_chat: "BIS AI বুদ্ধিমান সহকারী",
    view_title_analyzer: "পণ্য কমপ্লায়েন্স বিশ্লেষক ও ড্যাশবোর্ড",
    view_title_standards: "ভারতীয় মানদণ্ড এক্সপ্লোরার (KYS)",
    view_title_labs: "BIS স্বীকৃত ল্যাবরেটরি ফাইন্ডার (LIMS)",
    view_title_services: "অফিসিয়াল BIS পোর্টালসমূহ",
    view_title_health: "সিস্টেম স্বাস্থ্য ও টেলিমেট্রি",

    // Welcome Hero
    welcome_badge: "ব্যুরো অফ ইন্ডিয়ান স্ট্যান্ডার্ডস (BIS) — অফিসিয়াল AI",
    welcome_title: "BIS কমপ্লায়েন্সে আপনাকে কীভাবে সাহায্য করতে পারি?",
    welcome_sub: "ভারতীয় মানদণ্ড (IS), গুণমান নিয়ন্ত্রণ আদেশ (QCO), টেস্টিং প্রোটোকল, ISI মার্ক, CRS বা ল্যাবরেটরি সম্পর্কে জিজ্ঞাসা করুন।",

    // Prompt Chips
    chip1_title: "ইলেকট্রিক কেটলি (IS 302-2-15)",
    chip1_desc: "নিরাপত্তা পরীক্ষা, BIS স্কিম I, ল্যাব তালিকা",
    chip1_prompt: "আমি একটি ইলেকট্রিক কেটলি তৈরি করতে চাই। IS 302-2-15 এর অধীনে আমার পণ্যকে কোন BIS প্রয়োজনীয়তা পূরণ করতে হবে?",

    chip2_title: "প্যাকেজড পানীয় জল",
    chip2_desc: "IS 14543, FSSAI-BIS নির্দেশ, ইন-হাউস ল্যাব",
    chip2_prompt: "IS 14543 এর অধীনে প্যাকেজড পানীয় জলের প্ল্যান্ট স্থাপনের জন্য বাধ্যতামূলক পরীক্ষা এবং লাইসেন্সিং প্রক্রিয়া কী?",

    chip3_title: "লিথিয়াম-আয়ন ব্যাটারি (CRS)",
    chip3_desc: "IS 16046 পার্ট 2, MeitY আদেশ, R-নম্বর",
    chip3_prompt: "IS 16046 এর অধীনে লিথিয়াম-আয়ন ব্যাটারি প্যাকের জন্য বাধ্যতামূলক নিবন্ধন প্রকল্পের (CRS) প্রক্রিয়া কী?",

    chip4_title: "প্রতিরক্ষামূলক হেলমেট (IS 4151)",
    chip4_desc: "QCO আদেশ, প্রভাব পরীক্ষা, ISI নিয়মাবলী",
    chip4_prompt: "IS 4151 এর অধীনে হেলমেট পরীক্ষার মানদণ্ড, QCO আদেশ এবং বাধ্যতামূলক ISI মার্কের নিয়মগুলি কী?",

    chip5_title: "MSME 50% ফি ছাড়",
    chip5_desc: "উদ্যম সুবিধা ও আবেদন ফি নিয়ম",
    chip5_prompt: "MSME এবং স্টার্টআপ নির্মাতারা কীভাবে BIS মার্কিং এবং আবেদন ফিতে 50% ছাড় পেতে পারেন?",

    chip6_title: "স্কিম I বনাম স্কিম II প্রক্রিয়া",
    chip6_desc: "লাইসেন্সিং ধাপ, কারখানা নিরীক্ষা ও CRS",
    chip6_prompt: "BIS আইন 2016 এর অধীনে স্কিম I (ISI মার্ক) এবং স্কিম II (CRS) এর মধ্যে পার্থক্য কী?",

    // Input Area
    attach_tooltip: "নথি সংযুক্ত করুন",
    input_placeholder: "যে কোনও পণ্য, IS কোড, টেস্টিং বা ল্যাব সম্পর্কে জিজ্ঞাসা করুন...",
    voice_tooltip: "ভয়েস ইনপুট (কথা বলে লিখুন)",
    send_tooltip: "বার্তা পাঠান",
    input_disclaimer: "BIS AI সহকারী ভারতীয় মানদণ্ডের ভিত্তিতে নির্ভরযোগ্য নির্দেশনা দেয়। Manakonline-এ যাচাই করুন।",

    // Message Actions
    btn_listen: "শুনুন",
    btn_speaking: "বলছে...",
    btn_stop: "থামুন",
    btn_copy: "কপি",
    btn_copied: "কপি করা হয়েছে!",
    btn_translate: "বাংলায় অনুবাদ করুন",
    btn_translating: "অনুবাদ করা হচ্ছে...",
    speaker_tooltip: "স্পিকারে উত্তর শুনুন",
    translate_tooltip: "বর্তমান নির্বাচিত ভাষায় অনুবাদ করুন",

    // Product Analyzer
    analyzer_heading: "পণ্য কমপ্লায়েন্স বিশ্লেষক ও ড্যাশবোর্ড",
    analyzer_sub: "আপনার পণ্যের বিবরণ দিন এবং স্বয়ংক্রিয় BIS গাইডলাইন ও লাইসেন্স চেকলিস্ট পান।",
    analyzer_form_title: "পণ্যের স্পেসিফিকেশন ইনপুট",
    label_prod_name: "পণ্যের নাম / বিবরণ *",
    placeholder_prod_name: "যেমন: ইলেকট্রিক কেটলি",
    label_prod_category: "শিল্প ক্ষেত্র",
    cat_electrical: "বৈদ্যুতিক ও ইলেকট্রনিক্স",
    cat_food: "খাদ্য ও কৃষি",
    cat_crs: "ইলেকট্রনিক্স ও আইটি পণ্য (CRS)",
    cat_mech: "মেকানিক্যাল / সড়ক নিরাপত্তা",
    cat_toys: "ভোক্তা পণ্য / খেলনা",
    cat_solar: "নবায়নযোগ্য শক্তি / সৌর",
    cat_kitchen: "গৃহস্থালি ও রান্নাঘরের জিনিসপত্র",
    cat_precious: "মূল্যবান ধাতু ও হলমার্কিং",
    label_prod_material: "মূল উপাদান",
    placeholder_prod_material: "যেমন: SS 304 স্টেইনলেস স্টিল",
    label_prod_voltage: "ভোল্টেজ / ক্ষমতা",
    placeholder_prod_voltage: "যেমন: 230V AC, 1800W",
    label_prod_capacity: "আকার / ধারণক্ষমতা",
    placeholder_prod_capacity: "যেমন: 1.8 লিটার",
    label_prod_market: "লক্ষ্য বাজার",
    market_domestic: "ভারতীয় অভ্যন্তরীণ বাজার (বাধ্যতামূলক QCO)",
    market_export: "রপ্তানি এবং অভ্যন্তরীণ বিক্রয়",
    market_gem: "সরকারি GeM সংগ্রহ",
    btn_generate_plan: "সম্পূর্ণ কমপ্লায়েন্স প্ল্যান তৈরি করুন",
    analyzer_placeholder_title: "বিশ্লেষণের জন্য প্রস্তুত",
    analyzer_placeholder_desc: "পণ্যের বিবরণ পূরণ করুন এবং ভারতীয় মানদণ্ড ও চেকলিস্ট দেখতে বোতামে ক্লিক করুন।",
    analyzer_readiness_score: "BIS প্রস্তুতি স্কোর",
    analyzer_checklist_title: "১. প্রস্তুতি ও লাইসেন্সিং চেকলিস্ট",
    analyzer_export_plan: "প্ল্যান ডাউনলোড",
    analyzer_progress_hint: "অগ্রগতি ট্র্যাক করতে নিচের চেকলিস্ট ব্যবহার করুন।",

    // Standards Explorer
    standards_heading: "ভারতীয় মানদণ্ড এক্সপ্লোরার (KYS)",
    standards_sub: "অনুমোদিত ভারতীয় মান (IS), নিরাপত্তা সীমা এবং গুণমানের নিয়মাবলী অন্বেষণ করুন।",
    search_standards_placeholder: "IS নম্বর (যেমন IS 302, IS 14543), শিরোনাম বা পণ্য দিয়ে অনুসন্ধান করুন...",
    filter_all_categories: "সমস্ত বিভাগ",
    view_clauses_tests: "ধারা এবং পরীক্ষা দেখুন",
    empty_standards: "আপনার অনুসন্ধানের সাথে মেলে এমন কোনও ভারতীয় মানদণ্ড পাওয়া যায়নি।",
    indexed_clauses: "সূচীবদ্ধ ধারা",
    standard_tests: "মানক পরীক্ষা",
    version_label: "সংস্করণ:",
    open_in_kys: "Know Your Standard-এ খুলুন",

    // Laboratory Finder
    labs_heading: "BIS স্বীকৃত পরীক্ষাগার (LIMS)",
    labs_sub: "আপনার পণ্যের পরীক্ষার জন্য উপযুক্ত BIS এবং NABL স্বীকৃত ল্যাবরেটরি খুঁজুন।",
    search_labs_placeholder: "শহর, ল্যাব নাম বা মানদণ্ড দিয়ে অনুসন্ধান করুন (যেমন কলকাতা, IS 302)...",
    filter_all_states: "সমস্ত রাজ্য / অঞ্চল",
    location_label: "অবস্থান:",
    recognized_scopes: "স্বীকৃত পরীক্ষার ক্ষেত্র:",
    email_lab: "ইমেল ল্যাব",
    empty_labs: "আপনার মানদণ্ডের সাথে মেলে এমন কোনও পরীক্ষাগার পাওয়া যায়নি।",

    // Services Hub
    services_heading: "অফিসিয়াল BIS পোর্টালসমূহ",
    services_sub: "লাইসেন্স আবেদন, মানদণ্ড ডাউনলোড ও ল্যাব ট্র্যাকিংয়ের সরকারি পোর্টাল লিংক।",
    key_functions: "মূল কার্যাবলী:",
    access_portal: "পোর্টাল খুলুন",

    // System Health
    health_heading: "সিস্টেম স্বাস্থ্য ও টেলিমেট্রি",
    health_sub: "ব্যাকএন্ড পরিষেবা, RAG জ্ঞান ভাণ্ডার এবং অডিট লগের লাইভ স্থিতি।",
    metric_api_health: "API সার্ভার স্বাস্থ্য",
    metric_standards: "যুক্ত ভারতীয় মানদণ্ড",
    metric_labs: "স্বীকৃত পরীক্ষাগার",
    metric_services: "সংযুক্ত অফিসিয়াল পরিষেবা",
    status_operational: "সক্রিয় ও কার্যক্ষম",
    telemetry_rules_title: "যাচাইকরণ নিয়মাবলী",
    rule_rag: "RAG গ্রাউন্ডিং: শুধুমাত্র যাচাইকৃত ভারতীয় মানদণ্ড (IS) ধারা থেকে তথ্য সরবরাহ করা হয়।",
    rule_zero_hallucination: "নির্ভুলতা নীতি: অনুপস্থিত পণ্য বৈশিষ্ট্যের জন্য স্পষ্টীকরণ কার্ড দেখানো হয়।",
    rule_authority: "নিয়ন্ত্রক কর্তৃত্ব: স্বয়ংক্রিয় নির্দেশিকা এবং চূড়ান্ত BIS লাইসেন্সিংয়ের মধ্যে স্পষ্ট পার্থক্য রয়েছে।",
    rule_language: "ভাষা ইঞ্জিন: প্রযুক্তিগত কোডগুলি (যেমন IS 302) অনুবাদের সময় অপরিবর্তিত থাকে।",

    // Drawer & Modal
    drawer_badge: "BIS অফিসিয়াল প্রমাণ",
    drawer_btn: "Know Your Standard (KYS)-এ খুলুন",
    modal_badge: "AI কনফিগারেশন",
    modal_title: "AI ইঞ্জিন এবং মডেল সেটিংস",
    modal_desc: "আপনার পছন্দের AI প্রদানকারী চয়ন করুন। আপনি বিনামূল্যের Universal Brain বা নিজস্ব API কী ব্যবহার করতে পারেন।",
    modal_active_provider: "সক্রিয় AI প্রদানকারী",
    modal_custom_key: "কাস্টম API কী",
    btn_cancel: "বাতিল",
    btn_save: "সংরক্ষণ করুন",
    btn_test_connection: "সংযোগ পরীক্ষা করুন",

    // Dynamic Cards
    card_applicable_std: "প্রযোজ্য ভারতীয় মানদণ্ড",
    card_mandatory_under: "এর অধীনে বাধ্যতামূলক",
    card_view_full_scope: "সম্পূর্ণ বিবরণ ও ধারা দেখুন",
    card_suggested_followups: "প্রস্তাবিত পরবর্তী প্রশ্নসমূহ",
    card_official_actions: "অফিসিয়াল পরবর্তী পদক্ষেপ",
    card_clarification_title: "স্পষ্টীকরণ প্রয়োজন",
    fetching_evidence: "প্রমাণ লোড করা হচ্ছে...",
    no_evidence: "এই মানদণ্ডের জন্য এখনও কোনও ধারা সূচীবদ্ধ করা হয়নি।"
  },

  mr: {
    lang_name: "मराठी (Marathi)",
    brand_title: "BIS AI सहाय्यक",
    brand_badge: "SIH 26107",
    brand_sub: "अधिकृत AI पडताळणी प्रणाली",
    brand_org: "भारतीय मानक ब्युरो (BIS)",
    new_chat: "नवीन संभाषण",
    nav_section_ai: "AI सहाय्यक",
    nav_bis_ai: "BIS मानके AI",
    workspace: "कार्यक्षेत्र (WORKSPACE)",
    nav_assistant: "एआय सहाय्यक",
    nav_analyzer: "उत्पादन विश्लेषक",
    nav_standards: "भारतीय मानके (IS)",
    nav_labs: "प्रयोगशाळा शोधक (LIMS)",
    nav_services: "अधिकृत पोर्टल्स",
    nav_health: "सिस्टम स्थिती",
    recent_chats: "अलीकडील संभाषणे",
    no_sessions: "अद्याप कोणतीही संभाषणे जतन केलेली नाहीत",
    theme_dark: "डार्क मोड",
    theme_light: "लाइट मोड",
    auto_speak: "ऑटो-स्पीकर",

    // View Titles
    view_title_chat: "BIS AI बुद्धिमान सहाय्यक",
    view_title_analyzer: "उत्पादन अनुपालन विश्लेषक आणि डॅशबोर्ड",
    view_title_standards: "भारतीय मानके एक्सप्लोरर (KYS)",
    view_title_labs: "BIS मान्यताप्राप्त प्रयोगशाळा शोधक (LIMS)",
    view_title_services: "अधिकृत BIS पोर्टल्स आणि दुवे",
    view_title_health: "सिस्टम आरोग्य आणि टेलिमेट्री",

    // Welcome Hero
    welcome_badge: "भारतीय मानक ब्युरो (BIS) — अधिकृत अनुपालन AI",
    welcome_title: "BIS नियमांमध्ये मी तुम्हाला कशी मदत करू शकतो?",
    welcome_sub: "भारतीय मानके (IS), गुणवत्ता नियंत्रण आदेश (QCO), चाचणी निकष, ISI मार्क किंवा प्रयोगशाळांबद्दल विचारा.",

    // Prompt Chips
    chip1_title: "इलेक्ट्रिक किटली (IS 302-2-15)",
    chip1_desc: "सुरक्षा चाचण्या, BIS योजना I, प्रयोगशाळा निर्देशिका",
    chip1_prompt: "मला इलेक्ट्रिक किटली बनवायची आहे. IS 302-2-15 अंतर्गत माझ्या उत्पादनास कोणत्या BIS आवश्यकता पूर्ण कराव्या लागतील?",

    chip2_title: "पॅकेज केलेले पिण्याचे पाणी",
    chip2_desc: "IS 14543, FSSAI-BIS आदेश, इन-हाउस लॅब",
    chip2_prompt: "IS 14543 अंतर्गत पॅकेज केलेल्या पिण्याच्या पाण्याचा प्लांट सुरू करण्यासाठी अनिवार्य चाचण्या आणि परवाना प्रक्रिया काय आहे?",

    chip3_title: "लिथियम-आयन बॅटरी (CRS)",
    chip3_desc: "IS 16046 भाग 2, MeitY आदेश, R-क्रमांक",
    chip3_prompt: "IS 16046 अंतर्गत लिथियम-आयन बॅटरी पॅकसाठी अनिवार्य नोंदणी योजना (CRS) प्रक्रिया काय आहे?",

    chip4_title: "संरक्षक हेल्मेट (IS 4151)",
    chip4_desc: "QCO आदेश, आघात चाचण्या, अनिवार्य ISI नियम",
    chip4_prompt: "IS 4151 अंतर्गत हेल्मेट चाचणी निकष, QCO आदेश आणि अनिवार्य ISI मार्क नियम काय आहेत?",

    chip5_title: "MSME 50% शुल्क सवलत",
    chip5_desc: "उद्यम फायदे आणि मार्किंग फी नियम",
    chip5_prompt: "MSME आणि स्टार्टअप उत्पादकांना BIS मार्किंग आणि अर्ज शुल्कावर 50% सवलत कशी मिळते?",

    chip6_title: "योजना I विरुद्ध योजना II प्रक्रिया",
    chip6_desc: "परवाना टप्पे, कारखाना ऑडिट आणि CRS",
    chip6_prompt: "BIS कायदा 2016 अंतर्गत योजना I (ISI मार्क) आणि योजना II (CRS) मध्ये काय फरक आहे?",

    // Input Area
    attach_tooltip: "कागदपत्र जोडा",
    input_placeholder: "कोणतेही उत्पादन, IS मानक, चाचणी किंवा लॅबबद्दल विचारा...",
    voice_tooltip: "आवाज इनपुट (बोलून टाइप करा)",
    send_tooltip: "संदेश पाठवा",
    input_disclaimer: "BIS AI सहाय्यक अधिकृत भारतीय मानकांवर आधारित मार्गदर्शन प्रदान करतो. Manakonline वर अंतिम परवाना तपासा.",

    // Message Actions
    btn_listen: "ऐका",
    btn_speaking: "बोलत आहे...",
    btn_stop: "थांबवा",
    btn_copy: "कॉपी",
    btn_copied: "कॉपी केले!",
    btn_translate: "मराठीत अनुवाद करा",
    btn_translating: "भाषांतर करत आहे...",
    speaker_tooltip: "स्पीकरद्वारे उत्तर ऐका",
    translate_tooltip: "उत्तर सध्या निवडलेल्या भाषेत अनुवादित करा",

    // Product Analyzer
    analyzer_heading: "उत्पादन अनुपालन विश्लेषक आणि डॅशबोर्ड",
    analyzer_sub: "तुमच्या उत्पादनाचा तपशील प्रविष्ट करा आणि BIS चाचणी व परवाना चेकलिस्ट मिळवा.",
    analyzer_form_title: "उत्पादन तपशील इनपुट",
    label_prod_name: "उत्पादनाचे नाव / वर्णन *",
    placeholder_prod_name: "उदा. इलेक्ट्रिक किटली",
    label_prod_category: "उद्योग क्षेत्र",
    cat_electrical: "इलेक्ट्रिकल आणि इलेक्ट्रॉनिक्स",
    cat_food: "अन्न आणि कृषी",
    cat_crs: "इलेक्ट्रॉनिक्स आणि आयटी वस्तू (CRS)",
    cat_mech: "यांत्रिक / रस्ते सुरक्षा",
    cat_toys: "ग्राहक वस्तू / खेळणी",
    cat_solar: "सौर आणि अक्षय ऊर्जा",
    cat_kitchen: "घरगुती आणि स्वयंपाकघरातील भांडी",
    cat_precious: "मौल्यवान धातू आणि हॉलमार्किंग",
    label_prod_material: "मुख्य घटक साहित्य",
    placeholder_prod_material: "उदा. SS 304 स्टेनलेस स्टील",
    label_prod_voltage: "व्होल्टेज / पॉवर",
    placeholder_prod_voltage: "उदा. 230V AC, 1800W",
    label_prod_capacity: "आकार / क्षमता",
    placeholder_prod_capacity: "उदा. 1.8 लिटर",
    label_prod_market: "लक्षित बाजारपेठ",
    market_domestic: "भारतीय देशांतर्गत बाजार (अनिवार्य QCO)",
    market_export: "निर्यात आणि देशांतर्गत विक्री",
    market_gem: "सरकारी GeM खरेदी",
    btn_generate_plan: "पूर्ण अनुपालन योजना तयार करा",
    analyzer_placeholder_title: "विश्लेषणासाठी सज्ज",
    analyzer_placeholder_desc: "उत्पादन तपशील भरा आणि भारतीय मानके, चाचणी मॅट्रिक्स आणि चेकलिस्ट पाहण्यासाठी बटणावर क्लिक करा.",
    analyzer_readiness_score: "BIS तयारी स्कोअर",
    analyzer_checklist_title: "१. तयारी आणि परवाना चेकलिस्ट",
    analyzer_export_plan: "प्लॅन डाउनलोड",
    analyzer_progress_hint: "प्रगती ट्रॅक करण्यासाठी खालील चेकलिस्ट वापरा.",

    // Standards Explorer
    standards_heading: "भारतीय मानके एक्सप्लोरर (KYS)",
    standards_sub: "अधिकृत भारतीय मानके (IS), सुरक्षा मर्यादा आणि चाचणी निकष शोधा.",
    search_standards_placeholder: "IS क्रमांक (उदा. IS 302, IS 14543), शीर्षक किंवा उत्पादनाद्वारे शोधा...",
    filter_all_categories: "सर्व वर्ग",
    view_clauses_tests: "कलमे आणि चाचण्या पहा",
    empty_standards: "तुमच्या शोधाशी जुळणारे कोणतेही भारतीय मानक आढळले नाही.",
    indexed_clauses: "अनुक्रमित कलमे",
    standard_tests: "मानक चाचण्या",
    version_label: "आवृत्ती:",
    open_in_kys: "Know Your Standard मध्ये उघडा",

    // Laboratory Finder
    labs_heading: "BIS मान्यताप्राप्त प्रयोगशाळा (LIMS)",
    labs_sub: "तुमच्या उत्पादनाच्या चाचणीसाठी योग्य केंद्र आणि NABL प्रयोगशाळा शोधा.",
    search_labs_placeholder: "शहर, प्रयोगशाळेचे नाव किंवा मानकाद्वारे शोधा (उदा. मुंबई, IS 302)...",
    filter_all_states: "सर्व राज्ये / प्रदेश",
    location_label: "स्थान:",
    recognized_scopes: "मान्यताप्राप्त चाचणी क्षेत्रे:",
    email_lab: "ईमेल लॅब",
    empty_labs: "तुमच्या निकषांशी जुळणारी कोणतीही प्रयोगशाळा आढळली नाही.",

    // Services Hub
    services_heading: "अधिकृत BIS पोर्टल्स",
    services_sub: "परवाना अर्ज, मानके डाऊनलोड आणि पडताळणी सेवांसाठी अधिकृत दुवे.",
    key_functions: "मुख्य कार्ये:",
    access_portal: "पोर्टल उघडा",

    // System Health
    health_heading: "सिस्टम आरोग्य आणि टेलिमेट्री",
    health_sub: "बॅकएंड सेवा, RAG ज्ञान भांडार आणि ऑडिट लॉगची थेट स्थिती.",
    metric_api_health: "API सर्व्हर आरोग्य",
    metric_standards: "समाविष्ट भारतीय मानके",
    metric_labs: "मान्यताप्राप्त प्रयोगशाळा",
    metric_services: "एकीकृत अधिकृत सेवा",
    status_operational: "सक्रिय आणि सुरळीत",
    telemetry_rules_title: "पडताळणी नियम",
    rule_rag: "RAG ग्राउंडिंग: केवळ सत्यापित भारतीय मानक (IS) कलमांमधून माहिती दिली जाते.",
    rule_zero_hallucination: "अचूकता धोरण: गहाळ उत्पादन गुणधर्मांवर स्पष्टीकरण कार्ड दाखवले जातात.",
    rule_authority: "अधिकृत मर्यादा: स्वयंचलित मार्गदर्शन आणि अंतिम BIS परवान्यामध्ये स्पष्ट फरक आहे.",
    rule_language: "भाषा इंजिन: तांत्रिक कोड (उदा. IS 302) भाषांतरामध्ये मूळ स्वरूपात राहतात.",

    // Drawer & Modal
    drawer_badge: "BIS अधिकृत पुरावा",
    drawer_btn: "Know Your Standard (KYS) मध्ये उघडा",
    modal_badge: "AI कॉन्फिगरेशन",
    modal_title: "AI इंजिन आणि मॉडेल सेटिंग्ज",
    modal_desc: "तुमचा पसंतीचा AI प्रदाता निवडा. तुम्ही विनामूल्य Universal Brain किंवा तुमची स्वतःची API की वापरू शकता.",
    modal_active_provider: "सक्रिय AI प्रदाता",
    modal_custom_key: "सानुकूल API की",
    btn_cancel: "रद्द करा",
    btn_save: "जतन करा",
    btn_test_connection: "कनेक्शन तपासा",

    // Dynamic Cards
    card_applicable_std: "लागू भारतीय मानक",
    card_mandatory_under: "अंतर्गत अनिवार्य",
    card_view_full_scope: "पूर्ण तपशील आणि कलमे पहा",
    card_suggested_followups: "सुचवलेले पुढील प्रश्न",
    card_official_actions: "अधिकृत पुढील पावले",
    card_clarification_title: "स्पष्टीकरण आवश्यक आहे",
    fetching_evidence: "पुरावे लोड होत आहेत...",
    no_evidence: "या मानकासाठी अद्याप कोणतीही कलमे अनुक्रमित केलेली नाहीत."
  },

  gu: {
    lang_name: "ગુજરાતી (Gujarati)",
    brand_title: "BIS AI સહાયક",
    brand_badge: "SIH 26107",
    brand_sub: "સત્તાવાર AI ચકાસણી પ્લેટફોર્મ",
    brand_org: "બ્યુરો ઓફ ઇન્ડિયન સ્ટાન્ડર્ડ્સ (BIS)",
    new_chat: "નવી વાતચીત",
    nav_section_ai: "AI સહાયક",
    nav_bis_ai: "BIS ધોરણો AI",
    workspace: "કાર્યક્ષેત્ર (WORKSPACE)",
    nav_assistant: "AI સહાયક",
    nav_analyzer: "ઉત્પાદન વિશ્લેષક",
    nav_standards: "ભારતીય ધોરણો (IS)",
    nav_labs: "પ્રયોગશાળા શોધક (LIMS)",
    nav_services: "સત્તાવાર પોર્ટલ",
    nav_health: "સિસ્ટમ સ્થિતિ",
    recent_chats: "તાજેતરના સત્રો",
    no_sessions: "હજુ સુધી કોઈ વાતચીત સાચવેલ નથી",
    theme_dark: "ડાર્ક મોડ",
    theme_light: "લાઇટ મોડ",
    auto_speak: "ઑટો-સ્પીકર",

    // View Titles
    view_title_chat: "BIS AI બુદ્ધિશાળી સહાયક",
    view_title_analyzer: "ઉત્પાદન અનુપાલન વિશ્લેષક અને ડેશબોર્ડ",
    view_title_standards: "ભારતીય ધોરણો એક્સપ્લોરર (KYS)",
    view_title_labs: "BIS માન્યતા પ્રાપ્ત પ્રયોગશાળા શોધક (LIMS)",
    view_title_services: "સત્તાવાર BIS પોર્ટલ અને લિંક્સ",
    view_title_health: "સિસ્ટમ સ્થિતિ અને ટેલિમેટ્રી",

    // Welcome Hero
    welcome_badge: "બ્યુરો ઓફ ઇન્ડિયન સ્ટાન્ડર્ડ્સ (BIS) — સત્તાવાર AI",
    welcome_title: "BIS પાલનમાં હું તમારી કેવી રીતે મદદ કરી શકું?",
    welcome_sub: "ભારતીય ધોરણો (IS), ગુણવત્તા નિયંત્રણ આદેશો (QCO), ટેસ્ટિંગ પ્રોટોકોલ, ISI માર્ક અથવા લેબ વિશે પૂછો.",

    // Prompt Chips
    chip1_title: "ઇલેક્ટ્રિક કેટલ (IS 302-2-15)",
    chip1_desc: "સુરક્ષા પરીક્ષણો, BIS સ્કીમ I, લેબ યાદી",
    chip1_prompt: "હું ઇલેક્ટ્રિક કેટલ બનાવવા માંગુ છું. IS 302-2-15 હેઠળ મારા ઉત્પાદને કઈ BIS આવશ્યકતાઓ પૂર્ણ કરવી પડશે?",

    chip2_title: "પેકેજ્ડ પીવાનું પાણી",
    chip2_desc: "IS 14543, FSSAI-BIS ફરજિયાત આદેશ, લેબ જરૂરિયાત",
    chip2_prompt: "IS 14543 હેઠળ પેકેજ્ડ પીવાના પાણીનો પ્લાન્ટ શરૂ કરવા માટે ફરજિયાત પરીક્ષણો અને લાયસન્સિંગ પ્રક્રિયા શું છે?",

    chip3_title: "લિથિયમ-આયન બેટરી (CRS)",
    chip3_desc: "IS 16046 ભાગ 2, MeitY ઓર્ડર, R-નંબર",
    chip3_prompt: "IS 16046 હેઠળ લિથિયમ-આયન બેટરી પેક માટે ફરજિયાત નોંધણી યોજના (CRS) પ્રક્રિયા શું છે?",

    chip4_title: "રક્ષણાત્મક હેલ્મેટ (IS 4151)",
    chip4_desc: "QCO ઓર્ડર, ઇમ્પેક્ટ ટેસ્ટ, ISI નિયમો",
    chip4_prompt: "IS 4151 હેઠળ હેલ્મેટ પરીક્ષણ પરિમાણો, QCO ઓર્ડર અને ફરજિયાત ISI માર્કના નિયમો શું છે?",

    chip5_title: "MSME 50% ફી રાહત",
    chip5_desc: "ઉદ્યમ લાભો અને માર્કિંગ ફી નિયમો",
    chip5_prompt: "MSME અને સ્ટાર્ટઅપ ઉત્પાદકોને BIS માર્કિંગ અને અરજી ફી પર 50% રાહત કેવી રીતે મળે છે?",

    chip6_title: "સ્કીમ I વિરુદ્ધ સ્કીમ II પ્રક્રિયા",
    chip6_desc: "લાયસન્સિંગ પગલાં, ફેક્ટરી ઓડિટ અને CRS",
    chip6_prompt: "BIS એક્ટ 2016 હેઠળ સ્કીમ I (ISI માર્ક) અને સ્કીમ II (CRS) વચ્ચે શું તફાવત છે?",

    // Input Area
    attach_tooltip: "દસ્તાવેજ જોડો",
    input_placeholder: "કોઈપણ ઉત્પાદન, IS ધોરણ, ટેસ્ટિંગ અથવા લેબ વિશે પૂછો...",
    voice_tooltip: "વોઇસ ઇનપુટ (બોલીને ટાઇપ કરો)",
    send_tooltip: "સંદેશ મોકલો",
    input_disclaimer: "BIS AI સહાયક ભારતીય ધોરણોના આધારે સત્તાવાર માર્ગદર્શન પૂરું પાડે છે. Manakonline પર ખાતરી કરો.",

    // Message Actions
    btn_listen: "સાંભળો",
    btn_speaking: "બોલે છે...",
    btn_stop: "રોકો",
    btn_copy: "કોપી",
    btn_copied: "કોપી થઈ ગયું!",
    btn_translate: "ગુજરાતીમાં અનુવાદ કરો",
    btn_translating: "અનુવાદ થઈ રહ્યો છે...",
    speaker_tooltip: "સ્પીકર દ્વારા જવાબ સાંભળો",
    translate_tooltip: "જવાબને હાલમાં પસંદ કરેલી ભાષામાં અનુવાદિત કરો",

    // Product Analyzer
    analyzer_heading: "ઉત્પાદન અનુપાલન વિશ્લેષક અને ડેશબોર્ડ",
    analyzer_sub: "તમારા ઉત્પાદનની વિગતો દાખલ કરો અને BIS ટેસ્ટિંગ રોડમેપ અને લાઇસન્સ ચેકલિસ્ટ મેળવો.",
    analyzer_form_title: "ઉત્પાદન વિગત ઇનપુટ",
    label_prod_name: "ઉત્પાદનનું નામ / વર્ણન *",
    placeholder_prod_name: "દા.ત. ઇલેક્ટ્રિક કેટલ",
    label_prod_category: "ઉદ્યોગ ક્ષેત્ર",
    cat_electrical: "ઇલેક્ટ્રિકલ અને ઇલેક્ટ્રોનિક્સ",
    cat_food: "ખોરાક અને કૃષિ",
    cat_crs: "ઇલેક્ટ્રોનિક્સ અને IT માલ (CRS)",
    cat_mech: "મિકેનિકલ / માર્ગ સુરક્ષા",
    cat_toys: "ગ્રાહક માલ / રમકડાં",
    cat_solar: "સૌર અને રિન્યુએબલ એનર્જી",
    cat_kitchen: "ઘરેલું અને રસોડાના વાસણો",
    cat_precious: "કિંમતી ધાતુઓ અને હોલમાર્કિંગ",
    label_prod_material: "મુખ્ય સામગ્રી",
    placeholder_prod_material: "દા.ત. SS 304 સ્ટેનલેસ સ્ટીલ",
    label_prod_voltage: "વોલ્ટેજ / પાવર",
    placeholder_prod_voltage: "દા.ત. 230V AC, 1800W",
    label_prod_capacity: "કદ / ક્ષમતા",
    placeholder_prod_capacity: "દા.ત. 1.8 લિટર",
    label_prod_market: "લક્ષ્ય બજાર",
    market_domestic: "ભારતીય સ્થાનિક બજાર (ફરજિયાત QCO)",
    market_export: "નિકાસ અને સ્થાનિક વેચાણ",
    market_gem: "સરકારી GeM ખરીદી",
    btn_generate_plan: "સંપૂર્ણ યોજના બનાવો",
    analyzer_placeholder_title: "વિશ્લેષણ માટે તૈયાર",
    analyzer_placeholder_desc: "ઉત્પાદન વિગતો ભરો અને ભારતીય ધોરણો અને ચેકલિસ્ટ જોવા માટે બટન પર ક્લિક કરો.",
    analyzer_readiness_score: "BIS સજ્જતા સ્કોર",
    analyzer_checklist_title: "૧. તૈયારી અને લાયસન્સિંગ ચેકલિસ્ટ",
    analyzer_export_plan: "પ્લાન ડાઉનલોડ",
    analyzer_progress_hint: "પ્રગતિ ટ્રૅક કરવા માટે નીચેની ચેકલિસ્ટનો ઉપયોગ કરો.",

    // Standards Explorer
    standards_heading: "ભારતીય ધોરણો એક્સપ્લોરર (KYS)",
    standards_sub: "અધિકૃત ભારતીય ધોરણો (IS), સુરક્ષા સીમાઓ અને ગુણવત્તાના નિયમો શોધો.",
    search_standards_placeholder: "IS નંબર (દા.ત. IS 302, IS 14543), શીર્ષક અથવા ઉત્પાદન દ્વારા શોધો...",
    filter_all_categories: "બધા વર્ગો",
    view_clauses_tests: "કલમો અને પરીક્ષણો જુઓ",
    empty_standards: "તમારી શોધ સાથે મેળ ખાતું કોઈ ભારતીય ધોરણ મળ્યું નથી.",
    indexed_clauses: "અનુક્રમિત કલમો",
    standard_tests: "માનક પરીક્ષણો",
    version_label: "આવૃત્તિ:",
    open_in_kys: "Know Your Standard માં ખોલો",

    // Laboratory Finder
    labs_heading: "BIS માનયતા પ્રાપ્ત પ્રયોગશાળાઓ (LIMS)",
    labs_sub: "તમારા ઉત્પાદન પરીક્ષણ માટે માન્યતા પ્રાપ્ત લેબોરેટરીઝ શોધો.",
    search_labs_placeholder: "શહેર, લેબનું નામ અથવા ધોરણ દ્વારા શોધો (દા.ત. અમદાવાદ, IS 302)...",
    filter_all_states: "બધા રાજ્યો / પ્રદેશો",
    location_label: "સ્થળ:",
    recognized_scopes: "માન્યતા પ્રાપ્ત પરીક્ષણ ક્ષેત્રો:",
    email_lab: "ઇમેઇલ લેબ",
    empty_labs: "તમારા માપદંડ સાથે મેળ ખાતી કોઈ લેબ મળી નથી.",

    // Services Hub
    services_heading: "સત્તાવાર BIS પોર્ટલ",
    services_sub: "લાઇસન્સ અરજી, ધોરણો ડાઉનલોડ અને ચકાસણી માટેની સરકારી લિંક્સ.",
    key_functions: "મુખ્ય કાર્યો:",
    access_portal: "પોર્ટલ ખોલો",

    // System Health
    health_heading: "સિસ્ટમ સ્થિતિ અને ટેલિમેટ્રી",
    health_sub: "બેકએન્ડ સેવાઓ, RAG નોલેજ બેઝ અને ઓડિટ લોગની જીવંત સ્થિતિ.",
    metric_api_health: "API સર્વર સ્થિતિ",
    metric_standards: "સમાવિષ્ટ ભારતીય ધોરણો",
    metric_labs: "માન્યતા પ્રાપ્ત લેબ્સ",
    metric_services: "જોડાયેલ સત્તાવાર સેવાઓ",
    status_operational: "સક્રિય અને કાર્યરત",
    telemetry_rules_title: "ચકાસણી નિયમો",
    rule_rag: "RAG ગ્રાઉન્ડિંગ: માત્ર ચકાસાયેલ ભારતીય ધોરણો (IS) માંથી જ પુરાવા આપવામાં આવે છે.",
    rule_zero_hallucination: "ચોકસાઈ નીતિ: ખૂટતી ઉત્પાદન વિગતો પર સ્પષ્ટતા કાર્ડ બતાવવામાં આવે છે.",
    rule_authority: "સત્તાવાર મર્યાદા: સ્વયંચાલિત માર્ગદર્શન અને અંતિમ BIS લાઇસન્સ વચ્ચે સ્પષ્ટ તફાવત છે.",
    rule_language: "ભાષા એન્જિન: તકનીકી કોડ્સ (દા.ત. IS 302) અનુવાદમાં યથાવત રહે છે.",

    // Drawer & Modal
    drawer_badge: "BIS સત્તાવાર પુરાવા",
    drawer_btn: "Know Your Standard (KYS) માં ખોલો",
    modal_badge: "AI રૂપરેખાંકન",
    modal_title: "AI એન્જિન અને મોડલ સેટિંગ્સ",
    modal_desc: "તમારો મનપસંદ AI પ્રદાતા પસંદ કરો. તમે મફત Universal Brain અથવા તમારી પોતાની API કી વાપરી શકો છો.",
    modal_active_provider: "સક્રિય AI પ્રદાતા",
    modal_custom_key: "કસ્ટમ API કી",
    btn_cancel: "રદ કરો",
    btn_save: "સાચવો અને લાગુ કરો",
    btn_test_connection: "જોડાણ ચકાસો",

    // Dynamic Cards
    card_applicable_std: "લાગુ પડતું ભારતીય ધોરણ",
    card_mandatory_under: "હેઠળ ફરજિયાત",
    card_view_full_scope: "સંપૂર્ણ વિગતો અને કલમો જુઓ",
    card_suggested_followups: "સૂચવેલા આગામી પ્રશ્નો",
    card_official_actions: "સત્તાવાર આગળના પગલાં",
    card_clarification_title: "સ્પષ્ટતા જરૂરી છે",
    fetching_evidence: "પુરાવા લોડ થઈ રહ્યા છે...",
    no_evidence: "આ ધોરણ માટે હજુ સુધી કોઈ કલમો અનુક્રમિત નથી."
  }
};

class I18nManager {
  constructor() {
    this.translations = translations;
    this.currentLang = localStorage.getItem('bis_lang') || 'en';
  }

  init() {
    const selector = document.getElementById('langSelector');
    if (selector) {
      selector.value = this.currentLang;
      selector.addEventListener('change', (e) => {
        this.setLanguage(e.target.value);
      });
    }
    this.applyTranslations();
  }

  setLanguage(lang) {
    if (!translations[lang]) return;
    this.currentLang = lang;
    localStorage.setItem('bis_lang', lang);
    
    // Synchronize select dropdown value if triggered programmatically
    const selector = document.getElementById('langSelector');
    if (selector && selector.value !== lang) {
      selector.value = lang;
    }

    this.applyTranslations();
    
    // Dispatch rich event for all view controllers
    window.dispatchEvent(new CustomEvent('languageChanged', { 
      detail: { 
        lang, 
        langName: translations[lang].lang_name,
        dict: translations[lang] 
      } 
    }));
  }

  applyTranslations(rootEl = document) {
    const dict = translations[this.currentLang] || translations.en;

    // 1. Text Content Translation: [data-i18n]
    rootEl.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    // 2. Input Placeholders: [data-i18n-placeholder]
    rootEl.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key]) {
        el.setAttribute('placeholder', dict[key]);
      }
    });

    // 3. Tooltips and Titles: [data-i18n-title]
    rootEl.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      if (dict[key]) {
        el.setAttribute('title', dict[key]);
      }
    });

    // 4. Accessibility Aria Labels: [data-i18n-aria-label]
    rootEl.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
      const key = el.getAttribute('data-i18n-aria-label');
      if (dict[key]) {
        el.setAttribute('aria-label', dict[key]);
      }
    });

    // 5. Prompt Chip Prompts: [data-i18n-prompt]
    rootEl.querySelectorAll('[data-i18n-prompt]').forEach(el => {
      const key = el.getAttribute('data-i18n-prompt');
      if (dict[key]) {
        el.setAttribute('data-prompt', dict[key]);
      }
    });

    // 6. Select Option Translations: [data-i18n-option]
    rootEl.querySelectorAll('option[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    // Update html lang attribute
    document.documentElement.setAttribute('lang', this.currentLang);
  }

  t(key, fallback = '') {
    const dict = translations[this.currentLang] || translations.en;
    return dict[key] || fallback || key;
  }

  getAvailableLanguages() {
    return Object.keys(translations).map(code => ({
      code,
      name: translations[code].lang_name
    }));
  }
}

window.i18n = new I18nManager();
