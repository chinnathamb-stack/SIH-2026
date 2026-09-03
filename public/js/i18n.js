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
    new_chat: "New Conversation",
    workspace: "WORKSPACE",
    nav_assistant: "AI Assistant",
    nav_analyzer: "Product Analyzer",
    nav_standards: "Standards Explorer",
    nav_labs: "Laboratory Finder (LIMS)",
    nav_services: "Official BIS Portals",
    nav_health: "Admin & Health",
    recent_chats: "RECENT SESSIONS",
    welcome_title: "How can I assist your BIS compliance today?",
    welcome_sub: "Ask about Indian Standards (IS), mandatory Quality Control Orders (QCOs), testing protocols, Scheme I (ISI Mark), Scheme II (CRS), or laboratory matching across India.",
    input_placeholder: "Ask about any product, IS standard, testing requirement, or lab...",
    analyzer_heading: "Product Compliance Analyzer & Dashboard",
    analyzer_sub: "Enter your product details to generate an automated BIS compliance roadmap, testing schedule, and licensing checklist.",
    standards_heading: "Indian Standards Explorer (KYS)",
    standards_sub: "Search authorized Bureau of Indian Standards (IS), explore clauses, safety limits, testing parameters, and Quality Control Orders.",
    labs_heading: "BIS-Recognized Laboratory Finder (LIMS)",
    labs_sub: "Search BIS Central/Regional Labs and NABL-accredited third party testing centers matched to your required test scopes.",
    services_heading: "Official BIS Ecosystem & Deep Links",
    services_sub: "Direct access to official government portals for license applications, verification, standard downloads, and laboratory tracking.",
    btn_listen: "Listen",
    btn_speaking: "Speaking...",
    btn_stop: "Stop",
    btn_copy: "Copy",
    btn_translate: "Translate",
    speaker_tooltip: "Listen to answer via voice speaker",
    auto_speak_label: "Auto-Speak"
  },
  hi: {
    lang_name: "हिंदी (Hindi)",
    new_chat: "नई बातचीत",
    workspace: "कार्यक्षेत्र (WORKSPACE)",
    nav_assistant: "एआई सहायक",
    nav_analyzer: "उत्पाद विश्लेषक",
    nav_standards: "भारतीय मानक (IS)",
    nav_labs: "प्रयोगशाला खोजक (LIMS)",
    nav_services: "आधिकारिक पोर्टल",
    nav_health: "सिस्टम स्वास्थ्य",
    recent_chats: "हालिया सत्र",
    welcome_title: "मैं आपकी बीआईएस (BIS) अनुपालन में कैसे मदद कर सकता हूँ?",
    welcome_sub: "भारतीय मानकों (IS), अनिवार्य गुणवत्ता नियंत्रण आदेशों (QCO), परीक्षण प्रोटोकॉल, ISI मार्क या प्रयोगशालाओं के बारे में पूछें।",
    input_placeholder: "किसी भी उत्पाद, IS मानक, परीक्षण या प्रयोगशाला के बारे में पूछें...",
    analyzer_heading: "उत्पाद अनुपालन विश्लेषक और डैशबोर्ड",
    analyzer_sub: "स्वचालित बीआईएस अनुपालन रोडमैप और लाइसेंसिंग चेकलिस्ट प्राप्त करने के लिए अपने उत्पाद का विवरण दर्ज करें।",
    standards_heading: "भारतीय मानक खोजक (KYS)",
    standards_sub: "अधिकृत भारतीय मानकों (IS), सुरक्षा सीमाओं और परीक्षण मानकों का अन्वेषण करें।",
    labs_heading: "बीआईएस मान्यता प्राप्त प्रयोगशालाएं (LIMS)",
    labs_sub: "अपने आवश्यक परीक्षण क्षेत्र से मेल खाने वाली प्रयोगशालाएं खोजें।",
    services_heading: "आधिकारिक बीआईएस पोर्टल",
    services_sub: "लाइसेंस आवेदन, मानक डाउनलोड और सत्यापन सेवाओं के लिए सीधे लिंक।",
    btn_listen: "सुनें",
    btn_speaking: "बोल रहा है...",
    btn_stop: "रोकें",
    btn_copy: "कॉपी",
    btn_translate: "हिंदी में अनुवाद करें",
    speaker_tooltip: "स्पीकर से उत्तर सुनें",
    auto_speak_label: "ऑटो-स्पीकर"
  },
  ta: {
    lang_name: "தமிழ் (Tamil)",
    new_chat: "புதிய உரையாடல்",
    workspace: "பணிமனை (WORKSPACE)",
    nav_assistant: "AI உதவியாளர்",
    nav_analyzer: "பொருட்கள் பகுப்பாய்வி",
    nav_standards: "இந்திய தரங்கள் (IS)",
    nav_labs: "ஆய்வகங்கள் (LIMS)",
    nav_services: "அதிகாரப்பூர்வ தளங்கள்",
    nav_health: "கணினி நிலை",
    recent_chats: "முந்தைய உரையாடல்கள்",
    welcome_title: "BIS வழிகாட்டுதலில் நான் உங்களுக்கு எவ்வாறு உதவட்டும்?",
    welcome_sub: "இந்திய தரநிலைகள் (IS), கட்டாய தரக் கட்டுப்பாட்டு ஆணைகள் (QCO), ISI முத்திரை, CRS பதிவு மற்றும் பரிசோதனை ஆய்வகங்கள் பற்றி கேளுங்கள்.",
    input_placeholder: "எந்தவொரு தயாரிப்பு, இந்திய தரம் (IS), பரிசோதனை அல்லது ஆய்வகம் பற்றி கேளுங்கள்...",
    analyzer_heading: "தயாரிப்பு சான்றிதழ் திட்டமிடல் பலகை",
    analyzer_sub: "உங்கள் தயாரிப்பு விவரங்களை உள்ளிட்டு BIS வழிகாட்டுதல்கள் மற்றும் சான்றிதழ் சரிபார்ப்பு பட்டியலை உடனடியாகப் பெறுங்கள்.",
    standards_heading: "இந்திய தரங்கள் தேடல் (KYS)",
    standards_sub: "அங்கீகரிக்கப்பட்ட இந்திய தரநிலைகள் (IS), பாதுகாப்பு விதிகளின் பிரிவுகள் மற்றும் விவரங்களை ஆராயுங்கள்.",
    labs_heading: "BIS அங்கீகரிக்கப்பட்ட ஆய்வகங்கள் (LIMS)",
    labs_sub: "உங்கள் தயாரிப்பைப் பரிசோதிக்கக்கூடிய மத்திய/மண்டல மற்றும் NABL அங்கீகாரம் பெற்ற ஆய்வகங்களைக் கண்டறியுங்கள்.",
    services_heading: "அதிகாரப்பூர்வ BIS இணையதளங்கள்",
    services_sub: "உரிமம் விண்ணப்பித்தல், HUID சரிபார்த்தல் மற்றும் BIS சேவைகளுக்கான நேரடி இணைப்புகள்.",
    btn_listen: "கேளுங்கள்",
    btn_speaking: "பேசுகிறது...",
    btn_stop: "நிறுத்து",
    btn_copy: "நகலெடு",
    btn_translate: "தமிழில் மொழிபெயர்",
    speaker_tooltip: "பதிலை குரல் மூலம் கேளுங்கள்",
    auto_speak_label: "தானியங்கி குரல்"
  },
  te: {
    lang_name: "తెలుగు (Telugu)",
    new_chat: "కొత్త సంభాషణ",
    workspace: "వర్క్‌స్పేస్ (WORKSPACE)",
    nav_assistant: "AI సహాయకుడు",
    nav_analyzer: "ఉత్పత్తి విశ్లేషణ",
    nav_standards: "భారతీయ ప్రమాణాలు (IS)",
    nav_labs: "ప్రయోగశాలల శోధన (LIMS)",
    nav_services: "అధికారిక BIS పోర్టల్స్",
    nav_health: "సిస్టమ్ ఆరోగ్యం",
    recent_chats: "ఇటీవలి సెషన్లు",
    welcome_title: "BIS నిబంధనలలో మీకు ఎలా సహాయం చేయగలను?",
    welcome_sub: "భారతీయ ప్రమాణాలు (IS), నాణ్యత నియంత్రణ ఆదేశాలు (QCOs), టెస్టింగ్ ప్రోటోకాల్స్, ISI మార్క్, లేదా పరీక్ష ప్రయోగశాలల గురించి అడగండి.",
    input_placeholder: "ఏదైనా ఉత్పత్తి, IS కోడ్, పరీక్ష లేదా ల్యాబ్ గురించి అడగండి...",
    analyzer_heading: "ఉత్పత్తి సమ్మతి విశ్లేషణ & డ్యాష్‌బోర్డ్",
    analyzer_sub: "మీ ఉత్పత్తి వివరాలను నమోదు చేసి BIS టెస్టింగ్ షెడ్యూల్ మరియు లైసెన్స్ చెక్‌లిస్ట్‌ను పొందండి.",
    standards_heading: "భారతీయ ప్రమాణాల అన్వేషణ (KYS)",
    standards_sub: "అధికారిక భారతీయ ప్రమాణాలు (IS), భద్రతా పరిమితులు మరియు పరీక్ష పారామితులను తెలుసుకోండి.",
    labs_heading: "BIS గుర్తింపు పొందిన ల్యాబ్‌లు (LIMS)",
    labs_sub: "మీ ఉత్పత్తి పరీక్షలకు సరిపోయే కేంద్ర మరియు NABL గుర్తింపు పొందిన ప్రయోగశాలలను కనుగొనండి.",
    services_heading: "అధికారిక BIS సేవల పోర్టల్స్",
    services_sub: "లైసెన్స్ దరఖాస్తు, ప్రమాణాల డౌన్‌లోడ్ మరియు ప్రయోగశాల ట్రాకింగ్ కోసం అధికారిక లింకులు.",
    btn_listen: "వినండి",
    btn_speaking: "మాట్లాడుతోంది...",
    btn_stop: "ఆపు",
    btn_copy: "కాపీ",
    btn_translate: "తెలుగులోకి అనువదించండి",
    speaker_tooltip: "వాయిస్ స్పీకర్ ద్వారా సమాధానం వినండి",
    auto_speak_label: "ఆటో-స్పీకర్"
  },
  bn: {
    lang_name: "বাংলা (Bengali)",
    new_chat: "নতুন কথোপকথন",
    workspace: "ওয়ার্কস্পেস (WORKSPACE)",
    nav_assistant: "AI সহকারী",
    nav_analyzer: "পণ্য বিশ্লেষক",
    nav_standards: "ভারতীয় মানদণ্ড (IS)",
    nav_labs: "পরীক্ষাগার সন্ধান (LIMS)",
    nav_services: "অফিসিয়াল পোর্টাল",
    nav_health: "সিস্টেম স্বাস্থ্য",
    recent_chats: "সাম্প্রতিক সেশন",
    welcome_title: "BIS কমপ্লায়েন্সে আপনাকে কীভাবে সাহায্য করতে পারি?",
    welcome_sub: "ভারতীয় মানদণ্ড (IS), গুণমান নিয়ন্ত্রণ আদেশ (QCO), টেস্টিং প্রোটোকল, ISI মার্ক, CRS বা ল্যাবরেটরি সম্পর্কে জিজ্ঞাসা করুন।",
    input_placeholder: "যে কোনও পণ্য, IS কোড, টেস্টিং বা ল্যাব সম্পর্কে জিজ্ঞাসা করুন...",
    analyzer_heading: "পণ্য কমপ্লায়েন্স বিশ্লেষক ও ড্যাশবোর্ড",
    analyzer_sub: "আপনার পণ্যের বিবরণ দিন এবং স্বয়ংক্রিয় BIS গাইডলাইন ও লাইসেন্স চেকলিস্ট পান।",
    standards_heading: "ভারতীয় মানদণ্ড এক্সপ্লোরার (KYS)",
    standards_sub: "অনুমোদিত ভারতীয় মান (IS), নিরাপত্তা সীমা এবং গুণমানের নিয়মাবলী অন্বেষণ করুন।",
    labs_heading: "BIS স্বীকৃত পরীক্ষাগার (LIMS)",
    labs_sub: "আপনার পণ্যের পরীক্ষার জন্য উপযুক্ত BIS এবং NABL স্বীকৃত ল্যাবরেটরি খুঁজুন।",
    services_heading: "অফিসিয়াল BIS পোর্টালসমূহ",
    services_sub: "লাইসেন্স আবেদন, মানদণ্ড ডাউনলোড ও ল্যাব ট্র্যাকিংয়ের সরকারি পোর্টাল লিংক।",
    btn_listen: "শুনুন",
    btn_speaking: "বলছে...",
    btn_stop: "থামুন",
    btn_copy: "কপি",
    btn_translate: "বাংলায় অনুবাদ করুন",
    speaker_tooltip: "স্পিকারে উত্তর শুনুন",
    auto_speak_label: "অটো-স্পিকার"
  },
  mr: {
    lang_name: "मराठी (Marathi)",
    new_chat: "नवीन संभाषण",
    workspace: "कार्यक्षेत्र (WORKSPACE)",
    nav_assistant: "एआय सहाय्यक",
    nav_analyzer: "उत्पादन विश्लेषक",
    nav_standards: "भारतीय मानके (IS)",
    nav_labs: "प्रयोगशाळा शोधक (LIMS)",
    nav_services: "अधिकृत पोर्टल्स",
    nav_health: "सिस्टम स्थिती",
    recent_chats: "अलीकडील संभाषणे",
    welcome_title: "BIS नियमांमध्ये मी तुम्हाला कशी मदत करू शकतो?",
    welcome_sub: "भारतीय मानके (IS), गुणवत्ता नियंत्रण आदेश (QCO), चाचणी निकष, ISI मार्क किंवा प्रयोगशाळांबद्दल विचारा.",
    input_placeholder: "कोणतेही उत्पादन, IS मानक, चाचणी किंवा लॅबबद्दल विचारा...",
    analyzer_heading: "उत्पादन अनुपालन विश्लेषक आणि डॅशबोर्ड",
    analyzer_sub: "तुमच्या उत्पादनाचा तपशील प्रविष्ट करा आणि BIS चाचणी व परवाना चेकलिस्ट मिळवा.",
    standards_heading: "भारतीय मानके एक्सप्लोरर (KYS)",
    standards_sub: "अधिकृत भारतीय मानके (IS), सुरक्षा मर्यादा आणि चाचणी निकष शोधा.",
    labs_heading: "BIS मान्यताप्राप्त प्रयोगशाळा (LIMS)",
    labs_sub: "तुमच्या उत्पादनाच्या चाचणीसाठी योग्य केंद्र आणि NABL प्रयोगशाळा शोधा.",
    services_heading: "अधिकृत BIS पोर्टल्स",
    services_sub: "परवाना अर्ज, मानके डाऊनलोड आणि पडताळणी सेवांसाठी अधिकृत दुवे.",
    btn_listen: "ऐका",
    btn_speaking: "बोलत आहे...",
    btn_stop: "थांबवा",
    btn_copy: "कॉपी",
    btn_translate: "मराठीत अनुवाद करा",
    speaker_tooltip: "स्पीकरद्वारे उत्तर ऐका",
    auto_speak_label: "ऑटो-स्पीकर"
  },
  gu: {
    lang_name: "ગુજરાતી (Gujarati)",
    new_chat: "નવી વાતચીત",
    workspace: "કાર્યક્ષેત્ર (WORKSPACE)",
    nav_assistant: "AI સહાયક",
    nav_analyzer: "ઉત્પાદન વિશ્લેષક",
    nav_standards: "ભારતીય ધોરણો (IS)",
    nav_labs: "પ્રયોગશાળા શોધક (LIMS)",
    nav_services: "સત્તાવાર પોર્ટલ",
    nav_health: "સિસ્ટમ સ્થિતિ",
    recent_chats: "તાજેતરના સત્રો",
    welcome_title: "BIS પાલનમાં હું તમારી કેવી રીતે મદદ કરી શકું?",
    welcome_sub: "ભારતીય ધોરણો (IS), ગુણવત્તા નિયંત્રણ આદેશો (QCO), ટેસ્ટિંગ પ્રોટોકોલ, ISI માર્ક અથવા લેબ વિશે પૂછો.",
    input_placeholder: "કોઈપણ ઉત્પાદન, IS ધોરણ, ટેસ્ટિંગ અથવા લેબ વિશે પૂછો...",
    analyzer_heading: "ઉત્પાદન અનુપાલન વિશ્લેષક અને ડેશબોર્ડ",
    analyzer_sub: "તમારા ઉત્પાદનની વિગતો દાખલ કરો અને BIS ટેસ્ટિંગ રોડમેપ અને લાઇસન્સ ચેકલિસ્ટ મેળવો.",
    standards_heading: "ભારતીય ધોરણો એક્સપ્લોરર (KYS)",
    standards_sub: "અધિકૃત ભારતીય ધોરણો (IS), સુરક્ષા સીમાઓ અને ગુણવત્તાના નિયમો શોધો.",
    labs_heading: "BIS માન્યતા પ્રાપ્ત પ્રયોગશાળાઓ (LIMS)",
    labs_sub: "તમારા ઉત્પાદન પરીક્ષણ માટે માન્યતા પ્રાપ્ત લેબોરેટરીઝ શોધો.",
    services_heading: "સત્તાવાર BIS પોર્ટલ",
    services_sub: "લાઇસન્સ અરજી, ધોરણો ડાઉનલોડ અને ચકાસણી માટેની સરકારી લિંક્સ.",
    btn_listen: "સાંભળો",
    btn_speaking: "બોલે છે...",
    btn_stop: "રોકો",
    btn_copy: "કોપી",
    btn_translate: "ગુજરાતીમાં અનુવાદ કરો",
    speaker_tooltip: "સ્પીકર દ્વારા જવાબ સાંભળો",
    auto_speak_label: "ઑટો-સ્પીકર"
  }
};

class I18nManager {
  constructor() {
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
    this.applyTranslations();
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
  }

  applyTranslations() {
    const dict = translations[this.currentLang] || translations.en;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key]) {
        el.setAttribute('placeholder', dict[key]);
      }
    });

    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      if (dict[key]) {
        el.setAttribute('title', dict[key]);
      }
    });
  }

  t(key) {
    const dict = translations[this.currentLang] || translations.en;
    return dict[key] || key;
  }
}

window.i18n = new I18nManager();
