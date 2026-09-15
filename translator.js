/**
 * BIS AI Intelligent Assistant - Universal Translation Helper
 * Supports 7 Official Languages:
 * en, hi, ta, te, bn, mr, gu
 */

const https = require('https');

const LANGUAGE_NAMES = {
  en: 'English',
  hi: 'Hindi (हिंदी)',
  ta: 'Tamil (தமிழ்)',
  te: 'Telugu (తెలుగు)',
  bn: 'Bengali (বাংলা)',
  mr: 'Marathi (मराठी)',
  gu: 'Gujarati (ગુજરાતી)'
};

function translateText(text, targetLang = 'en', sourceLang = 'auto') {
  if (!text || typeof text !== 'string' || !text.trim()) return Promise.resolve(text);
  if (targetLang === 'en' && (sourceLang === 'en' || !sourceLang)) return Promise.resolve(text);

  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${encodeURIComponent(sourceLang)}&tl=${encodeURIComponent(targetLang)}&dt=t&q=${encodeURIComponent(text.trim())}`;

  return new Promise((resolve) => {
    const req = https.get(url, { timeout: 6000 }, (res) => {
      let raw = '';
      res.on('data', chunk => raw += chunk);
      res.on('end', () => {
        try {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed) && Array.isArray(parsed[0])) {
              const fullTranslation = parsed[0].map(item => item[0]).filter(Boolean).join('');
              if (fullTranslation && fullTranslation.trim()) {
                return resolve(fullTranslation);
              }
            }
          }
          resolve(text);
        } catch (err) {
          resolve(text);
        }
      });
    });

    req.on('error', () => resolve(text));
    req.on('timeout', () => {
      req.destroy();
      resolve(text);
    });
  });
}

module.exports = {
  translateText,
  LANGUAGE_NAMES
};
