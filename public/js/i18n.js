/**
 * BIS AI Intelligent Assistant - Internationalization (i18n)
 * English, Tamil (தமிழ்), and Hindi (हिंदी)
 */

const translations = {
  en: {
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
    services_sub: "Direct access to official government portals for license applications, verification, standard downloads, and laboratory tracking."
  },
  ta: {
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
    services_sub: "உரிமம் விண்ணப்பித்தல், HUID சரிபார்த்தல் மற்றும் BIS சேவைகளுக்கான நேரடி இணைப்புகள்."
  },
  hi: {
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
    services_sub: "लाइसेंस आवेदन, मानक डाउनलोड और सत्यापन सेवाओं के लिए सीधे लिंक।"
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
  }

  t(key) {
    const dict = translations[this.currentLang] || translations.en;
    return dict[key] || key;
  }
}

window.i18n = new I18nManager();
