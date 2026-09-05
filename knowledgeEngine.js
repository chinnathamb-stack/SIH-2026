/**
 * BIS AI Intelligent Assistant & Universal ChatGPT Intelligence Engine
 * Dual-Core Architecture: Universal Problem-Solving + Authoritative BIS Grounding
 * SIH Problem Statement 26107
 */

const https = require('https');
const http = require('http');

// =========================================================================
// 1. EXTENDED STATIC REGULATORY KNOWLEDGE (IS Standards, Schemes, QCOs)
// =========================================================================

const EXTENDED_STANDARDS_DATABASE = {
  "is 302-2-15": {
    is_number: "IS 302-2-15: 2009",
    title: "Safety of Household and Similar Electrical Appliances - Part 2: Particular Requirements for Electric Kettles",
    scheme: "Scheme I (ISI Mark)",
    mandatory: true,
    qco_order: "Electrical Appliances (Quality Control) Order, 2020",
    ministry: "Ministry of Commerce and Industry / DPIIT",
    applicable_products: ["Electric Kettles", "Cordless Kettles", "Liquid Heaters", "Electric Tea/Coffee Makers"],
    test_parameters: [
      { name: "Input Power and Current", clause: "Clause 10", limit: "Deviation +5% to -10% of rated wattage" },
      { name: "Heating Under Normal Operation", clause: "Clause 11", limit: "Max handle temp ≤ 60°C, element enclosure safe" },
      { name: "Leakage Current at Operating Temp", clause: "Clause 13", limit: "≤ 0.75 mA for Class I portable appliances" },
      { name: "Moisture & Overflow Resistance", clause: "Clause 15", limit: "1% saline overflow spillage test; IPX0 compliance" },
      { name: "Abnormal Operation (Boil Dry)", clause: "Clause 19", limit: "Thermal cut-out triggers without flame or hazard" },
      { name: "Dielectric High-Voltage Strength", clause: "Clause 16", limit: "1000 V AC for 1 min without breakdown" },
      { name: "Earthing Continuity Resistance", clause: "Clause 27", limit: "≤ 0.1 Ω with 25A test current" }
    ],
    sample_size: "3 complete commercial units + 2 spare heating elements",
    in_house_testing: ["High Voltage Flash Tester (1.5 kV)", "Earth Continuity Tester", "Digital Wattmeter & Ammeter", "Boil-dry Test Chamber"],
    fee_overview: "Application Fee: ₹1,000 | Annual Marking Fee: ₹75,000/year (50% concession for registered MSMEs)."
  },
  "is 14543": {
    is_number: "IS 14543: 2024",
    title: "Packaged Drinking Water (Other Than Packaged Natural Mineral Water) - Specification",
    scheme: "Scheme I (Mandatory ISI Certification)",
    mandatory: true,
    qco_order: "FSSAI Food Safety & Standards Regulations & BIS Quality Order",
    ministry: "Ministry of Consumer Affairs & FSSAI",
    applicable_products: ["Packaged Drinking Water", "Bottled Water 20L jars", "PET bottled water"],
    test_parameters: [
      { name: "Microbiological - Total Coliform", clause: "Table 1, Cl. 5.1", limit: "Nil / 250 ml (Membrane Filtration)" },
      { name: "Microbiological - E. coli", clause: "Table 1, Cl. 5.2", limit: "Absent in 250 ml sample" },
      { name: "Total Dissolved Solids (TDS)", clause: "Table 2, Cl. 5.3", limit: "75 to 500 mg/L" },
      { name: "pH Value", clause: "Table 2, Cl. 5.4", limit: "6.5 to 8.5" },
      { name: "Heavy Metals - Lead (Pb)", clause: "Table 3, Cl. 5.5", limit: "Max 0.01 mg/L" },
      { name: "Pesticide Residues (Individual)", clause: "Table 4, Cl. 5.6", limit: "Below detection limit (Max 0.0001 mg/L)" }
    ],
    sample_size: "12 liters packed in sealed retail containers from production line",
    in_house_testing: ["Laminar Airflow Chamber", "Incubator 37°C & 44°C", "Autoclave", "pH & TDS meter", "Turbidimeter"],
    fee_overview: "Application Fee: ₹1,000 | Marking Fee: ₹160,000/unit/year (50% concession for MSMEs)."
  },
  "is 16046": {
    is_number: "IS 16046 (Part 2): 2018 / IEC 62133-2: 2017",
    title: "Secondary Cells and Batteries Containing Alkaline or Other Non-Acid Electrolytes (Lithium Systems)",
    scheme: "Scheme II (Compulsory Registration Scheme - CRS)",
    mandatory: true,
    qco_order: "Electronics and Information Technology Goods (Requirement for Compulsory Registration) Order",
    ministry: "Ministry of Electronics and Information Technology (MeitY)",
    applicable_products: ["Lithium-ion Cells", "Li-ion Battery Packs", "Smartphone Batteries", "Power Banks"],
    test_parameters: [
      { name: "External Short Circuit (Cell & Pack)", clause: "Clause 7.3.1 / 7.3.2", limit: "No fire, no explosion at 55°C ± 5°C" },
      { name: "Continuous Charging at Constant Voltage", clause: "Clause 7.2.1", limit: "No fire, no explosion after 7 days" },
      { name: "Overcharge Safety Protection", clause: "Clause 7.3.6", limit: "BMS cutoff operates safely; no explosion" },
      { name: "Drop Test (Concrete surface)", clause: "Clause 7.3.3", limit: "No fire, no leakage, no rupture after 1m drop" },
      { name: "Thermal Abuse / Exposure Test", clause: "Clause 7.3.4", limit: "No fire or explosion at 130°C for 10 min" }
    ],
    sample_size: "15 to 25 cells / battery packs depending on model series",
    in_house_testing: ["N/A - Direct testing at BIS Recognized Third-party Laboratory"],
    fee_overview: "Registration Fee: ₹25,000 for 2 years (MeitY Portal) + Lab testing charges."
  },
  "is 4151": {
    is_number: "IS 4151: 2020",
    title: "Protective Helmets for Drivers and Passengers of Two-Wheeled Motor Vehicles",
    scheme: "Scheme I (Mandatory ISI Mark)",
    mandatory: true,
    qco_order: "Two-Wheeler Helmets (Quality Control) Order",
    ministry: "Ministry of Road Transport and Highways (MoRTH)",
    applicable_products: ["Full-face Helmets", "Open-face Helmets", "Motorcycle Helmets"],
    test_parameters: [
      { name: "Impact Attenuation Test", clause: "Clause 9.1", limit: "Peak acceleration ≤ 300 g; Headform safe" },
      { name: "Retention System Dynamic Strength", clause: "Clause 9.2", limit: "Displacement ≤ 35 mm under dynamic drop" },
      { name: "Rigidity and Deformation Test", clause: "Clause 9.3", limit: "Transverse deformation ≤ 40 mm at 630 N load" },
      { name: "Visor Optical & Impact Quality", clause: "Clause 9.4", limit: "Luminous transmittance ≥ 85%; shatterproof" }
    ],
    sample_size: "6 helmets per shell size",
    in_house_testing: ["Drop Impact Rig", "Retention Dynamic Tester", "Visor Optical Rig"],
    fee_overview: "Application Fee: ₹1,000 | Annual Marking Fee: ₹84,000/year (50% concession for MSMEs)."
  }
};

// =========================================================================
// 2. MULTI-PROVIDER GENERATIVE AI GATEWAY (Gemini, OpenAI, Groq)
// =========================================================================

const CHATGPT_MASTER_SYSTEM_PROMPT = `You are a general-purpose AI assistant designed to be helpful, harmless, and honest across a wide range of tasks and conversations.

**Your core purpose:** Assist users with questions, creative projects, analysis, coding, writing, research, problem-solving, and learning—adapting your approach to what each user needs.

**How you interact:**
- Be conversational and natural; match the user's tone and formality level
- Provide clear, direct answers; when complexity warrants it, break information into digestible parts
- Admit uncertainty honestly—say "I don't know" or "I'm not sure" rather than guess
- Ask clarifying questions when a request is ambiguous, but don't over-explain or be pedantic
- Balance brevity with completeness; don't pad responses with unnecessary detail, but give enough context to be useful

**What you do:**
- Answer factual questions across any topic (history, science, current events, practical advice)
- Help with writing: drafting, editing, brainstorming, explaining grammar or style
- Assist with analysis: summarize documents, compare options, break down complex ideas
- Support coding: write code, debug, explain concepts, suggest improvements
- Engage in creative work: storytelling, worldbuilding, character development, ideation
- Tutor and explain: break down difficult concepts, provide examples, teach step-by-step
- Reason through problems: help users think through decisions, trade-offs, and solutions

**What you don't do:**
- Create content for deception, fraud, or illegal activity
- Generate hateful, sexually explicit, or abusive content
- Impersonate real people or organizations
- Violate privacy or confidentiality
- Pretend to have capabilities you don't (like real-time web access or the ability to perform actions outside conversation)

**On limitations:**
- Be transparent about your knowledge cutoff date
- Acknowledge when something is outside your training or capability
- Don't speculate confidently about very recent events, personal data, or specialized domains where you lack training

**Tone:** Helpful, clear, friendly, and professional—never condescending or overly formal unless the user prefers it.`;

async function callGenerativeAI({ prompt, history = [], systemPrompt = CHATGPT_MASTER_SYSTEM_PROMPT, customApiKey = null, customProvider = null, aiModel = null }) {
  const activeSysPrompt = systemPrompt || CHATGPT_MASTER_SYSTEM_PROMPT;

  // Provider 1: Google Gemini API
  const geminiKey = customApiKey && customProvider === 'gemini' ? customApiKey : process.env.GEMINI_API_KEY;
  if (geminiKey) {
    try {
      const modelName = aiModel && aiModel.startsWith('gemini') ? aiModel : 'gemini-1.5-flash';
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${geminiKey}`;

      const contents = [];
      if (history && history.length > 0) {
        history.slice(-6).forEach(msg => {
          contents.push({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text || msg.content || '' }]
          });
        });
      }
      contents.push({
        role: 'user',
        parts: [{ text: `${activeSysPrompt}\n\nUser Question:\n${prompt}` }]
      });

      const body = JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048,
          topP: 0.95
        }
      });

      const resText = await makeHttpsRequest(url, 'POST', body, { 'Content-Type': 'application/json' });
      if (resText) {
        const parsed = JSON.parse(resText);
        const ans = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
        if (ans && ans.trim()) return ans;
      }
    } catch (err) {
      console.warn('Gemini API call warning:', err.message);
    }
  }

  // Provider 2: OpenAI API
  const openaiKey = customApiKey && customProvider === 'openai' ? customApiKey : process.env.OPENAI_API_KEY;
  if (openaiKey) {
    try {
      const modelName = aiModel && aiModel.startsWith('gpt') ? aiModel : 'gpt-4o-mini';
      const messages = [{ role: 'system', content: activeSysPrompt }];
      if (history && history.length > 0) {
        history.slice(-6).forEach(msg => {
          messages.push({
            role: msg.role === 'user' ? 'user' : 'assistant',
            content: msg.text || msg.content || ''
          });
        });
      }
      messages.push({ role: 'user', content: prompt });

      const body = JSON.stringify({ model: modelName, messages, temperature: 0.7 });
      const resText = await makeHttpsRequest('https://api.openai.com/v1/chat/completions', 'POST', body, {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiKey}`
      });
      if (resText) {
        const parsed = JSON.parse(resText);
        const ans = parsed.choices?.[0]?.message?.content;
        if (ans && ans.trim()) return ans;
      }
    } catch (err) {
      console.warn('OpenAI API call warning:', err.message);
    }
  }

  // Provider 3: Groq Cloud API
  const groqKey = customApiKey && customProvider === 'groq' ? customApiKey : process.env.GROQ_API_KEY;
  if (groqKey) {
    try {
      const modelName = aiModel && aiModel.includes('llama') ? aiModel : 'llama-3.3-70b-versatile';
      const messages = [{ role: 'system', content: activeSysPrompt }];
      if (history && history.length > 0) {
        history.slice(-6).forEach(msg => {
          messages.push({
            role: msg.role === 'user' ? 'user' : 'assistant',
            content: msg.text || msg.content || ''
          });
        });
      }
      messages.push({ role: 'user', content: prompt });

      const body = JSON.stringify({ model: modelName, messages, temperature: 0.7 });
      const resText = await makeHttpsRequest('https://api.groq.com/openai/v1/chat/completions', 'POST', body, {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${groqKey}`
      });
      if (resText) {
        const parsed = JSON.parse(resText);
        const ans = parsed.choices?.[0]?.message?.content;
        if (ans && ans.trim()) return ans;
      }
    } catch (err) {
      console.warn('Groq API call warning:', err.message);
    }
  }

  return null;
}

function makeHttpsRequest(urlStr, method = 'GET', data = null, headers = {}) {
  return new Promise((resolve) => {
    try {
      const urlObj = new URL(urlStr);
      const options = {
        hostname: urlObj.hostname,
        port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
        path: urlObj.pathname + urlObj.search,
        method: method,
        headers: headers,
        timeout: 10000
      };

      const lib = urlObj.protocol === 'https:' ? https : http;
      const req = lib.request(options, (res) => {
        let raw = '';
        res.on('data', chunk => raw += chunk);
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(raw);
          } else {
            resolve(null);
          }
        });
      });

      req.on('error', () => resolve(null));
      req.on('timeout', () => {
        req.destroy();
        resolve(null);
      });

      if (data) req.write(data);
      req.end();
    } catch (e) {
      resolve(null);
    }
  });
}

// =========================================================================
// 3. COMPREHENSIVE BUILT-IN UNIVERSAL INTELLIGENCE BRAIN
// =========================================================================

class UniversalKnowledgeEngine {
  constructor() {
    this.mathConstants = { pi: Math.PI, e: Math.E };
  }

  solveMathOrCalculation(query) {
    const q = query.toLowerCase().trim();

    // Check for explicit math commands or pure arithmetic expressions
    const hasMathIntent = /^(?:what is|calculate|evaluate|solve|compute)?\s*[\d\.\s\+\-\*\/\^\(\)\%]+(?:\?|$)/i.test(q) ||
      /\d+\s*[\+\*\/]\s*\d+/.test(q) ||
      /^(?:what is\s*)?\d+\s*-\s*\d+\s*(?:\?|$)/i.test(q);

    if (hasMathIntent) {
      const mathMatch = q.match(/(?:what is|calculate|evaluate|solve|compute)?\s*([\d\.\s\+\-\*\/\^\(\)\%]+)\s*(?:\?|$)/i);
      if (mathMatch && mathMatch[1]) {
        const expr = mathMatch[1].trim();
        if (/[\+\-\*\/\^\%]/.test(expr) && /\d/.test(expr) && !/[a-z]/i.test(expr)) {
          try {
            const sanitized = expr.replace(/\^/g, '**');
            if (/^[\d\.\s\+\-\*\/\(\)\%]+$/.test(sanitized)) {
              // eslint-disable-next-line no-eval
              const result = Function(`'use strict'; return (${sanitized})`)();
              if (typeof result === 'number' && !isNaN(result) && isFinite(result)) {
                return `### 🧮 Mathematical Calculation\n\n**Expression:** \`${expr}\`\n\n**Result:** **${result}**\n\n💡 **Breakdown:**\n- Evaluating \`${expr}\` gives exactly **${result}**.\n- Let me know if you want to perform further calculations!`;
              }
            }
          } catch (e) {
            // ignore
          }
        }
      }
    }

    // Square root
    const sqrtMatch = q.match(/(?:square root of|sqrt\s*of?|√)\s*(\d+(?:\.\d+)?)/i);
    if (sqrtMatch) {
      const num = parseFloat(sqrtMatch[1]);
      const res = Math.sqrt(num);
      return `### 📐 Square Root\n\n**Expression:** $\\sqrt{${num}}$\n\n**Result:** **${res}** (or approx. ${res.toFixed(4)})\n\n💡 Since ${res} × ${res} = ${num}.`;
    }

    // Percentage: "what is 18% of 2500"
    const pctMatch = q.match(/(?:what is\s*)?(\d+(?:\.\d+)?)\s*%\s*of\s*(\d+(?:\.\d+)?)/i);
    if (pctMatch) {
      const pct = parseFloat(pctMatch[1]);
      const total = parseFloat(pctMatch[2]);
      const res = (pct / 100) * total;
      return `### 📊 Percentage Calculation\n\n**Formula:** $\\frac{${pct}}{100} \\times ${total}$\n\n**Result:** **${res}**\n\n- ${pct}% of ${total} is **${res}**.`;
    }

    // Temperature Conversion
    const cToF = q.match(/(\d+(?:\.\d+)?)\s*(?:c|celsius|°c)\s*(?:to|in)\s*(?:f|fahrenheit|°f)/i);
    if (cToF) {
      const c = parseFloat(cToF[1]);
      const f = (c * 9/5) + 32;
      return `### 🌡️ Temperature Conversion\n\n**${c}°C = ${f.toFixed(2)}°F**\n\n**Formula:** $(${c} \\times 9/5) + 32 = ${f.toFixed(2)}°F$`;
    }

    const fToC = q.match(/(\d+(?:\.\d+)?)\s*(?:f|fahrenheit|°f)\s*(?:to|in)\s*(?:c|celsius|°c)/i);
    if (fToC) {
      const f = parseFloat(fToC[1]);
      const c = (f - 32) * 5/9;
      return `### 🌡️ Temperature Conversion\n\n**${f}°F = ${c.toFixed(2)}°C**\n\n**Formula:** $(${f} - 32) \\times 5/9 = ${c.toFixed(2)}°C$`;
    }

    if (q.includes('quadratic formula') || q.includes('solve quadratic')) {
      return `### 📐 Quadratic Formula & Solution\n\nFor any quadratic equation in standard form:\n$$ax^2 + bx + c = 0$$\n\nThe roots are given by:\n$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$\n\n**Where:**\n- $D = b^2 - 4ac$ is the **Discriminant**\n- If $D > 0$: Two distinct real roots\n- If $D = 0$: One repeated real root ($-b/2a$)\n- If $D < 0$: Two complex conjugate roots`;
    }

    return null;
  }

  generateCodeOrTechResponse(query) {
    const q = query.toLowerCase();

    // Palindrome check
    if (q.includes('palindrome')) {
      return `### 💡 Check If a String is a Palindrome\n\nA string is a **palindrome** if it reads the same forward and backward (ignoring punctuation and letter casing).\n\n### 1. Python Solution (Two-Pointer $O(1)$ Space)\n\`\`\`python\nimport re\n\ndef is_palindrome(s: str) -> bool:\n    # 1. Clean string: remove non-alphanumeric and convert to lowercase\n    cleaned = re.sub(r'[^a-zA-Z0-9]', '', s).lower()\n    \n    # 2. Two-pointer check\n    left, right = 0, len(cleaned) - 1\n    while left < right:\n        if cleaned[left] != cleaned[right]:\n            return False\n        left += 1\n        right -= 1\n    return True\n\n# Test Cases\nprint(is_palindrome("A man, a plan, a canal: Panama")) # True\nprint(is_palindrome("race a car"))                     # False\nprint(is_palindrome("madam"))                          # True\n\`\`\`\n\n### 2. JavaScript Solution\n\`\`\`javascript\nfunction isPalindrome(str) {\n  const clean = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();\n  return clean === clean.split('').reverse().join('');\n}\n\nconsole.log(isPalindrome("radar")); // true\nconsole.log(isPalindrome("hello")); // false\n\`\`\`\n\n**Complexity Analysis:**\n- **Time Complexity:** $O(n)$ where $n$ is string length.\n- **Space Complexity:** $O(1)$ auxiliary space with two-pointer.`;
    }

    // Web Scraping Python
    if ((q.includes('scrape') || q.includes('scraper') || q.includes('web scraping')) && (q.includes('python') || q.includes('code'))) {
      return `Here is a complete, production-ready **Python Web Scraper** using \`BeautifulSoup4\` and \`requests\`:\n\n### Installation\n\`\`\`bash\npip install requests beautifulsoup4\n\`\`\`\n\n### Complete Python Script\n\`\`\`python\nimport requests\nfrom bs4 import BeautifulSoup\n\ndef scrape_headlines(url: str):\n    headers = {\n        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"\n    }\n    \n    try:\n        response = requests.get(url, headers=headers, timeout=10)\n        response.raise_for_status()\n        \n        soup = BeautifulSoup(response.text, "html.parser")\n        headlines = []\n        \n        for item in soup.find_all(["h1", "h2", "h3"]):\n            title = item.get_text(strip=True)\n            if title and len(title) > 10:\n                headlines.append(title)\n                \n        return headlines\n        \n    except requests.exceptions.RequestException as e:\n        print(f"Error scraping {url}: {e}")\n        return []\n\nif __name__ == "__main__":\n    results = scrape_headlines("https://news.ycombinator.com")\n    print(f"Found {len(results)} headlines:")\n    for i, h in enumerate(results[:5], 1):\n        print(f"{i}. {h}")\n\`\`\`\n\n💡 **Best Practices:**\n- Always inspect \`robots.txt\` before scraping.\n- Add small delays (\`time.sleep\`) between requests to avoid rate limits.`;
    }

    // Two Sum
    if (q.includes('two sum') || (q.includes('sum') && q.includes('target') && q.includes('array'))) {
      return `### 💡 Two Sum Problem Solution\n\n**Problem:** Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.\n\n### Optimal Hash Map Solution ($O(n)$ Time & $O(n)$ Space)\n\`\`\`python\ndef two_sum(nums: list[int], target: int) -> list[int]:\n    seen = {} # Maps value -> index\n    \n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in seen:\n            return [seen[complement], i]\n        seen[num] = i\n        \n    return []\n\n# Test Run\nprint(two_sum([2, 7, 11, 15], 9)) # Output: [0, 1]\nprint(two_sum([3, 2, 4], 6))       # Output: [1, 2]\n\`\`\``;
    }

    // Binary Search
    if (q.includes('binary search')) {
      return `### 🔍 Binary Search Algorithm ($O(\\log n)$ Time)\n\n\`\`\`python\ndef binary_search(arr: list[int], target: int) -> int:\n    """Returns index of target if found in sorted array, else -1."""\n    low = 0\n    high = len(arr) - 1\n    \n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n            \n    return -1\n\n# Array MUST be sorted\nnumbers = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]\ntarget = 23\nresult = binary_search(numbers, target)\nprint(f"Target {target} found at index: {result}") # Output: 5\n\`\`\``;
    }

    // Sorting Algorithms
    if (q.includes('merge sort') || q.includes('quick sort') || q.includes('sorting algorithm') || q.includes('sort an array')) {
      return `### ⚡ Merge Sort Algorithm ($O(n \\log n)$ Time, Stable)\n\n\`\`\`python\ndef merge_sort(arr: list[int]) -> list[int]:\n    if len(arr) <= 1:\n        return arr\n        \n    mid = len(arr) // 2\n    left = merge_sort(arr[:mid])\n    right = merge_sort(arr[mid:])\n    \n    return merge(left, right)\n\ndef merge(left: list[int], right: list[int]) -> list[int]:\n    result = []\n    i = j = 0\n    while i < len(left) and j < len(right):\n        if left[i] <= right[j]:\n            result.append(left[i])\n            i += 1\n        else:\n            result.append(right[j])\n            j += 1\n    result.extend(left[i:])\n    result.extend(right[j:])\n    return result\n\nprint(merge_sort([38, 27, 43, 3, 9, 82, 10]))\n# Output: [3, 9, 10, 27, 38, 43, 82]\n\`\`\``;
    }

    // String reversal
    if (q.includes('reverse') && q.includes('string')) {
      return `Here are the cleanest ways to **reverse a string in Python**:\n\n### 1. Using Slicing (Fastest & Most Pythonic 🚀)\n\`\`\`python\ndef reverse_string(s: str) -> str:\n    return s[::-1]\n\nprint(reverse_string("Hello World")) # "dlroW olleH"\n\`\`\`\n\n### 2. Using \`reversed()\` & \`join()\`\n\`\`\`python\ndef reverse_string_join(s: str) -> str:\n    return "".join(reversed(s))\n\`\`\``;
    }

    // SQL queries
    if (q.includes('sql') && (q.includes('join') || q.includes('query') || q.includes('select'))) {
      return `### 🗄️ SQL Joins Cheat Sheet & Examples\n\n| Join Type | Description |\n|---|---|\n| **INNER JOIN** | Returns rows when there is a match in both tables |\n| **LEFT JOIN** | Returns all rows from the left table and matched rows from right |\n| **RIGHT JOIN** | Returns all rows from right table and matched rows from left |\n| **FULL OUTER JOIN** | Returns all rows when there is a match in either table |\n\n### Example SQL Query\n\`\`\`sql\nSELECT \n    c.customer_id,\n    c.customer_name,\n    COUNT(o.order_id) AS total_orders,\n    COALESCE(SUM(o.amount), 0) AS total_spent\nFROM customers c\nLEFT JOIN orders o ON c.customer_id = o.customer_id\nWHERE c.status = 'ACTIVE'\nGROUP BY c.customer_id, c.customer_name\nHAVING SUM(o.amount) > 1000\nORDER BY total_spent DESC;\n\`\`\``;
    }

    return null;
  }

  generateCreativeOrIdeationResponse(query) {
    const q = query.toLowerCase();

    if (q.includes('remote team') || (q.includes('app idea') && q.includes('remote')) || (q.includes('brainstorm') && q.includes('remote'))) {
      return `Here are **3 creative app ideas designed specifically for remote & hybrid teams**:\n\n---\n\n### 1. ☕ "Virtual Watercooler" (Async Casual Sandbox)\n- **The Problem:** Remote workers miss spontaneous, casual conversations that build team chemistry.\n- **How It Works:** A 2D spatial virtual lounge or lightweight voice room where team members can drop in for a 5-minute coffee chat, play quick 30-second trivia, or share daily photo prompts.\n- **Key Features:** Ambient background office sounds, mood check-ins, automatic cross-team 1-on-1 lunch pairings.\n- **Monetization:** Freemium ($4/seat/month for enterprise analytics & custom integrations).\n\n---\n\n### 2. ⚡ "TimePulse" (Global Timezone & Energy Sync)\n- **The Problem:** Scheduling across multiple global time zones leads to burnout and meeting fatigue.\n- **How It Works:** A smart calendar overlay that maps not just working hours, but team members' peak focus hours and preferred asynchronous communication windows.\n- **Key Features:** "Best time for async vs sync" recommendations, automatic video snippet handoffs at end-of-day.\n- **Monetization:** B2B SaaS subscription with Slack & Google Workspace integration.\n\n---\n\n### 3. 🎯 "Handoff HQ" (Async Standup & Milestone Relay)\n- **The Problem:** Daily standup meetings interrupt deep work and become repetitive status updates.\n- **How It Works:** AI-powered async standup dashboard that automatically aggregates GitHub PRs, Jira tickets, and Figma updates into a 60-second morning executive summary for each team lead.\n- **Key Features:** AI blocker detection, smart meeting reducer, daily team velocity recap.\n- **Monetization:** $8/user/month with automated AI summary reports.\n\n---\n\n💡 *Would you like me to create a technical architecture, database schema, or UI wireframe for any of these ideas?*`;
    }

    if (q.includes('startup idea') || q.includes('business idea') || q.includes('ai startup')) {
      return `Here are **3 high-potential AI startup ideas** with market demand and monetization models:\n\n1. **AI Legal Compliance & Contract Auditor for SMBs:**\n   - Automatically scans vendor contracts, NDAs, and regulatory compliance requirements in seconds, flagging high-risk clauses.\n   - *Monetization:* Tiered SaaS ($49 - $299/month).\n\n2. **Automated Customer Onboarding Copilot:**\n   - An interactive in-app guide that watches user behavior and dynamically generates customized step-by-step video tutorials and tooltips.\n   - *Monetization:* Usage-based per active onboarded user.\n\n3. **Smart Inventory & Demand Forecaster for Local Retail:**\n   - Connects to POS systems and local weather/festival trends to predict exact restocking quantities, cutting food and goods waste.\n   - *Monetization:* $39/store/month + revenue share on waste reduction.`;
    }

    return null;
  }

  generateWritingResponse(query) {
    const q = query.toLowerCase();

    // Leave application email
    if (q.includes('leave') && (q.includes('email') || q.includes('letter') || q.includes('application') || q.includes('write'))) {
      const isSick = q.includes('sick') || q.includes('medical') || q.includes('fever') || q.includes('health');
      const isCasual = q.includes('casual') || q.includes('personal') || q.includes('vacation');
      
      return `Here is a clean, professional **Leave Application Email** template:\n\n---\n\n**Subject:** Leave Application: [Your Full Name] - [Start Date] to [End Date]\n\nDear [Manager / Supervisor's Name],\n\nI am writing to formally request leave from **[Start Date]** to **[End Date]** (${isSick ? 'due to medical illness / recovery' : isCasual ? 'due to important personal commitments' : 'for personal reasons'}). I will resume work on **[Return Date]**.\n\n**During my absence:**\n- I have handed over ongoing tasks to **[Colleague's Name]** to ensure project continuity.\n- All urgent deliverables for this week have been completed or scheduled.\n- In case of an emergency, I will be reachable via email or phone at **[Your Mobile Number]**.\n\nThank you for your understanding.\n\nWarm regards,\n\n**[Your Full Name]**  \n[Your Role / Department]  \n[Your Contact Information]\n\n---`;
    }

    // Resignation Letter
    if (q.includes('resignation') || q.includes('resign')) {
      return `### ✉️ Professional Resignation Letter\n\n---\n\n**Subject:** Formal Resignation - [Your Full Name]\n\nDear [Manager's Name],\n\nPlease accept this letter as formal notification that I am resigning from my position as **[Your Job Title]** at **[Company Name]**. My last working day will be **[Last Working Date]**, in accordance with my notice period.\n\nI want to sincerely thank you and the team for the guidance, support, and rewarding experiences during my tenure here. I have appreciated the opportunity to contribute to our collective projects.\n\nDuring the remaining period, I am fully committed to completing pending assignments and ensuring a smooth transition of my duties to [Colleague's Name or Team].\n\nI wish the organization continued success in the future.\n\nSincerely,\n\n**[Your Full Name]**  \n[Your Phone Number / Email Address]`;
    }

    // Cover Letter / Job application
    if (q.includes('cover letter') || (q.includes('job') && q.includes('application') && q.includes('letter'))) {
      return `### 📄 Standard Professional Cover Letter\n\n---\n\n**[Your Full Name]**  \n[Your Email] | [Your Phone] | [LinkedIn Profile URL]  \n[Date]\n\n**Hiring Team / [Hiring Manager's Name]**  \n[Company Name]  \n[Company Address / City]\n\n**Subject:** Application for [Job Title] Role (Ref: [Job ID if any])\n\nDear Hiring Team,\n\nI am writing to express my enthusiastic interest in the **[Job Title]** position at **[Company Name]**. With my background in **[Your Core Skill Area, e.g. Software Engineering / Data Analytics]** and proven experience in **[Key Strength / Achievement]**, I am eager to contribute effectively to your organization's mission.\n\nIn my previous role at **[Previous Company]**, I successfully:\n- **[Key Achievement 1]:** Delivered a key initiative resulting in [X% growth / performance boost].\n- **[Key Achievement 2]:** Collaborated across teams to optimize workflows and reduce turnaround time.\n\nWhat excites me most about **[Company Name]** is your commitment to [Company Project / Value]. I am confident that my technical skills and proactive mindset will make me a strong asset to your team.\n\nThank you for your time and consideration. I look forward to discussing how my experience aligns with your goals.\n\nSincerely,\n\n**[Your Full Name]**`;
    }

    return null;
  }

  generateScienceOrGeneralResponse(query) {
    const q = query.toLowerCase();

    // Quantum Computing
    if (q.includes('quantum computing') || q.includes('quantum computer')) {
      return `### ⚛️ What is Quantum Computing?\n\n**Quantum Computing** is a computing paradigm that harnesses the laws of **quantum mechanics** to solve complex calculations that would take classical supercomputers thousands of years.\n\n---\n\n### 🔑 Core Principles\n1. **Qubits (Quantum Bits):**\n   - Classical computers use bits (\`0\` or \`1\`).\n   - Quantum computers use **Qubits**, which can exist as \`0\`, \`1\`, or both simultaneously via **Superposition**.\n2. **Quantum Entanglement:**\n   - Qubits become interconnected such that the state of one instantly influences another, allowing massive computational parallelism.\n3. **Quantum Interference:**\n   - Used to amplify correct answers and cancel out incorrect computational paths.\n\n---\n\n### 🚀 Real-World Applications\n- **Molecular Simulation & Medicine:** Discovering drugs and simulating chemical reactions.\n- **Cryptography:** Post-quantum cryptography and quantum key distribution (QKD).\n- **Logistics & Optimization:** Solving supply chain and routing challenges in seconds.`;
    }

    // Machine Learning
    if (q.includes('machine learning') || q.includes('what is ml') || q.includes('deep learning')) {
      return `### 🧠 What is Machine Learning (ML)?\n\n**Machine Learning** is a branch of **Artificial Intelligence (AI)** focused on building algorithms that learn from data and improve accuracy over time without being explicitly programmed for every scenario.\n\n---\n\n### 🔑 The 3 Core Paradigms\n1. **Supervised Learning (Labeled Data):**\n   - Algorithm learns on labeled pairs $(X \\rightarrow Y)$.\n   - *Examples:* Linear Regression, Random Forest, Neural Networks.\n   - *Use Cases:* Spam filters, disease diagnosis, price forecasting.\n\n2. **Unsupervised Learning (Unlabeled Data):**\n   - Finds hidden patterns and clustering in raw data.\n   - *Examples:* K-Means Clustering, PCA.\n   - *Use Cases:* Customer segmentation, anomaly detection.\n\n3. **Reinforcement Learning (Trial & Reward):**\n   - Agent takes actions in an environment to maximize cumulative reward.\n   - *Examples:* Q-Learning, PPO.\n   - *Use Cases:* Robotics, self-driving cars, game-playing AIs.`;
    }
    if (q.includes('photosynthesis')) {
      return `### 🌿 How Photosynthesis Works\n\n**Photosynthesis** is the process by which green plants, algae, and some bacteria convert light energy into chemical energy (glucose) using water and carbon dioxide.\n\n---\n\n### 🧪 Chemical Formula\n$$\n6\\text{CO}_2 + 6\\text{H}_2\\text{O} + \\text{Light Energy} \\longrightarrow \\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\text{O}_2\n$$\n*(Carbon Dioxide + Water + Sunlight $\\rightarrow$ Glucose + Oxygen)*\n\n---\n\n### 🔬 The Two Stages\n1. **Light-Dependent Reactions (Thylakoids):** Chlorophyll absorbs sunlight, splits water molecules ($H_2O$), and releases **Oxygen ($O_2$)**.\n2. **Calvin Cycle (Stroma):** Uses ATP energy to convert $CO_2$ into **Glucose ($C_6H_{12}O_6$)**.\n\n💡 *Let me know if you want to explore the light vs dark reactions in more detail!*`;
    }

    // Newton's Laws
    if (q.includes('newton') && (q.includes('law') || q.includes('motion'))) {
      return `### 🍎 Sir Isaac Newton's Three Laws of Motion\n\n1. **First Law (Inertia):**\n   > *An object remains at rest or in uniform motion unless acted upon by a net external force.*\n   - *Example:* A moving car stops abruptly, causing passengers to lean forward.\n\n2. **Second Law (Force & Acceleration):**\n   > *The force applied to an object equals its mass times acceleration.*\n   $$\\mathbf{F} = m \\cdot \\mathbf{a}$$\n   - *Example:* A heavier box requires more force to accelerate at the same rate.\n\n3. **Third Law (Action & Reaction):**\n   > *For every action, there is an equal and opposite reaction.*\n   - *Example:* A rocket expels burning exhaust gases downward, driving the rocket upward.`;
    }

    // Why is the sky blue
    if (q.includes('sky') && q.includes('blue')) {
      return `### 🌌 Why is the Sky Blue?\n\nThe sky appears blue because of a phenomenon called **Rayleigh Scattering**!\n\n1. **Sunlight is White Light:** Sunlight is made of all the colors of the rainbow combined.\n2. **Wavelengths:** Blue and violet light travel in smaller, shorter waves, while red and yellow light travel in longer, wider waves.\n3. **Scattering in Atmosphere:** When sunlight hits the gases (nitrogen and oxygen) in Earth's atmosphere, the shorter blue light waves scatter in all directions much more than other colors.\n4. **Why not Violet?** Violet light is scattered even more than blue, but our eyes are much more sensitive to blue light, and the Sun emits more blue light than violet!`;
    }

    return null;
  }

  /**
   * Conversational, Emotional, Entertainment & Fun Handler
   */
  generateEmotionalOrConversationalResponse(query) {
    const q = query.toLowerCase().trim();

    // 1. Boredom & Need for Entertainment
    if (q.includes('boring') || q.includes('bored') || q.includes('nothing to do') || q.includes('pass time') || q.includes('entertain me') || q.includes('entertain') || q.includes('time pass')) {
      return `I hear you! Boredom is the worst, but we can fix that right now! 😄

Here are a few fun things we can do together:

1. 🎮 **Play a Game:** We can play **20 Questions**, a **Trivia Quiz**, or a **Riddle Challenge**!
2. 🎬 **Entertainment Picks:** Tell me what genre you like (Sci-Fi, Comedy, Thriller, Anime), and I'll give you a great movie or series recommendation!
3. 🧠 **Mind-Blowing Facts:** I can share some bizarre, incredible facts about space, deep ocean creatures, or ancient history!
4. ✍️ **Story Time:** We can create an interactive, choose-your-own-adventure story together where *you* make the choices!

What sounds most fun to you right now? Or just tell me what kind of mood you're in!`;
    }

    // 2. Emotions: Sad / Down / Stressed / Overwhelmed
    if (q.includes('sad') || q.includes('feeling down') || q.includes('unhappy') || q.includes('depressed') || q.includes('lonely') || q.includes('crying') || q.includes('bad day')) {
      return `I'm really sorry you're feeling down today. 💙 

It's completely okay to feel this way sometimes. If you'd like to vent or talk about what's going on, I'm here to listen without judgment. 

Or if you'd rather take your mind off things with a funny joke, a comforting story, or a lighthearted distraction, just let me know. Take it easy on yourself today! 🌿`;
    }

    if (q.includes('stressed') || q.includes('anxious') || q.includes('overwhelmed') || q.includes('too much pressure') || q.includes('burnout')) {
      return `Take a slow, deep breath in... and let it out. 🌿

When everything feels like too much, remember you don't have to solve everything all at once. Just focus on the very next step.

Would you like to:
- Talk through whatever is on your mind?
- Do a quick 2-minute calming breathing exercise?
- Take a quick mental break with some light trivia or a fun story?

I'm here for you!`;
    }

    // 3. Emotions: Tired / Sleepy / Can't Sleep
    if (q.includes('tired') || q.includes('exhausted') || q.includes('sleepy') || q.includes('cant sleep') || q.includes('can\'t sleep') || q.includes('insomnia')) {
      return `Sounds like you've had a long day! 🛋️ 

Make sure to give your eyes and mind a rest. If you're having trouble falling asleep, here are a few things that can help:
- Turn down screen brightness and set a blue light filter.
- Try the **4-7-8 breathing method** (Inhale for 4 seconds, hold for 7, exhale slowly for 8).
- If you'd like, I can write a calming, gentle bedtime story for you to read!

Rest well! 🌙`;
    }

    // 4. Emotions: Happy / Excited / Celebrating
    if (q.includes('happy') || q.includes('excited') || q.includes('great day') || q.includes('good news') || q.includes('celebrate') || q.includes('i did it') || q.includes('won')) {
      return `That is amazing! 🎉 Congratulations! 

I love hearing good news! What happened? Tell me all about it—I'd love to hear the story! 🥳✨`;
    }

    // 5. Storytelling
    if (/(?:tell|give|write|narrate)\s+(?:me\s+)?(?:a\s+)?(?:story|tale|bedtime\s+story)/i.test(q) || q.includes('tell me a story') || q.includes('short story')) {
      return `Here is a short story for you:

### 🌟 The Clockmaker of Chronos

In the misty alleys of Old Prague lived Maestro Karel, a clockmaker who built timepieces that didn't just measure seconds—they captured moments.

One rainy evening, a young girl named Maya visited his workshop holding a rusted bronze pocket watch. *"Maestro,"* she whispered, *"this belonged to my grandmother. It stopped ticking on the day she last smiled."*

Karel placed the watch beneath his magnifying lens. Deep inside the gears, he found no broken spring, only a tiny crystalized drop of morning dew. He gently polished the escapement wheel and turned the winding crown three times.

The hands began to sweep smoothly again, and as they did, the scent of lavender and the faint sound of cheerful laughter filled the cozy workshop. 

Maya smiled, and Maestro Karel whispered: *"Time never truly stops, little one. It just waits for us to remember the warmth of the moments we cherish."*

---
💡 *Would you like another story, or want us to write a sci-fi/fantasy story together?*`;
    }

    // 6. Movie / Anime / Series recommendations
    if (/(?:recommend|suggest|watch|best|top|good)\s+(?:a\s+)?(?:great\s+|good\s+)?(?:movie|film|cinema|show|series|anime|drama)/i.test(q) ||
        /(?:movie|film|anime)\s+(?:recommendation|suggestion)/i.test(q) ||
        /(?:what|which)\s+(?:movie|film|show)\s+(?:should\s+i\s+watch|to\s+watch)/i.test(q)) {
      return `Here are some top movie & show recommendations across popular genres:

🎬 **Mind-Bending Sci-Fi / Thriller:**
- *Interstellar* (Epic space exploration & emotional journey)
- *Inception* (Dreams within dreams, brilliant pacing)
- *Arrival* (Fascinating story about language and time)

🍿 **Feel-Good & Fun Comedy:**
- *The Grand Budapest Hotel* (Visually stunning and hilarious)
- *Knives Out* (Clever murder mystery with great humor)

🔥 **Top Anime Picks:**
- *Fullmetal Alchemist: Brotherhood* (Incredible plot and characters)
- *Frieren: Beyond Journey's End* (Beautiful, peaceful, and deep)
- *Attack on Titan* (Intense action and jaw-dropping twists)

Tell me your favorite genre or mood, and I'll give you a tailored recommendation! 🍿`;
    }

    // 7. Fun Facts & Trivia
    if (/(?:tell|give|share)\s+(?:me\s+)?(?:something\s+)?(?:interesting|cool|new|fun|mind\s*blowing|crazy)/i.test(q) ||
        /(?:interesting|fun|cool)\s+(?:fact|facts|trivia)/i.test(q) ||
        q === 'tell me something interesting' || q.includes('fun fact') || q.includes('interesting fact') || q.includes('did you know') || q.includes('trivia')) {
      return `Here are **3 mind-blowing facts** you might not know! 🤯

1. 🌌 **Neutron Stars are Incredibly Dense:** A single teaspoon of a neutron star would weigh about **6 billion tons** on Earth—roughly the weight of Mount Everest!
2. 🐙 **Octopuses Have Three Hearts & Blue Blood:** Two hearts pump blood to the gills, while the third circulates blood to the rest of the body. Their blood is blue because it uses copper rather than iron!
3. 🍯 **Honey Never Spoils:** Archaeologists have found pots of 3,000-year-old honey in ancient Egyptian tombs that are still perfectly edible!

Want another round of fun facts or a quick trivia quiz? 😄`;
    }

    // 8. Jokes
    if (/(?:tell|give|share)\s+(?:me\s+)?(?:a\s+)?(?:joke|funny)/i.test(q) || q.includes('joke') || q.includes('make me laugh')) {
      return `😄 Here's a good one for you:

**Why do programmers always mix up Halloween and Christmas?**  
*Because Oct 31 == Dec 25!* 🎃🎄

Here's one more:  
**Why don't scientists trust atoms?**  
*Because they make up everything!* ⚛️

Want another joke or a riddle? 😄`;
    }

    // 9. Riddles & Games
    if (/(?:play|start)\s+(?:a\s+)?(?:game|riddle|quiz|trivia)/i.test(q) || q.includes('riddle') || q.includes('play a game') || q.includes('quiz')) {
      return `Let's play a **Riddle Game**! 🧩

Here is your riddle:

> *"I speak without a mouth and hear without ears.*  
> *I have no body, but I come alive with wind.*  
> *What am I?"*

Think you know the answer? Reply with your guess and let's see if you're right! 🎯`;
    }

    // 10. Motivation & Habits
    if (/(?:stay\s+motivated|motivation|inspire\s+me|life\s+advice|be\s+happy|focus\s+on\s+studies|overcome\s+procrastination)/i.test(q)) {
      return `### 🌟 Powerful Tips to Build Focus & Momentum

1. **The 5-Minute Rule:** When you don't feel like doing a task, commit to doing just 5 minutes of it. Starting is 80% of the battle!
2. **Break it Down:** Big goals feel overwhelming. Break them into micro-steps that take 10 minutes each.
3. **Environment Design:** Keep your phone in another room or out of sight when doing deep work.
4. **Celebrate Tiny Wins:** Momentum builds through small, consistent completions rather than huge bursts of effort.

*"You don't have to be great to start, but you have to start to be great."* 🚀 What specific goal are you working on right now?`;
    }

    return null;
  }

  handleTamilOrTanglish(clean) {
    if (clean.includes('vanakkam') || clean.includes('epdi iruka') || clean.includes('eppadi irukeenga') || clean.includes('tamil') || clean.includes('nandri') || clean.includes('solu') || clean.includes('pannu') || clean.includes('solradha') || clean.includes('panna')) {
      if (clean.includes('solradha') || clean.includes('puriyala') || clean.includes('matra') || clean.includes('sariya')) {
        return `மன்னிக்கவும்! நீங்கள் என்ன செய்ய வேண்டும் என்று தெளிவாக தமிழில் அல்லது ஆங்கிலத்தில் கூறினால், நான் அதை துல்லியமாக செய்து தருகிறேன். 

உங்களுக்கு நான் என்ன செய்ய வேண்டும்? 
1. **ஏதேனும் கோடிங் எழுத வேண்டுமா (Python, JavaScript, etc.)?**
2. **ஏதேனும் கடிதம் / மின்னஞ்சல் எழுத வேண்டுமா?**
3. **கணக்கு அல்லது அறிவியல் கேள்விக்கு விடை வேண்டுமா?**
4. **BIS இந்திய தரநிலைகள் பற்றி தகவல்கள் வேண்டுமா?**

உங்கள் கேள்வியை நேரடியாக கேளுங்கள், உடனடியாக சரியான பதிலை தருகிறேன்!`;
      }
      if (clean.includes('epdi iruka') || clean.includes('eppadi irukeenga')) {
        return `வணக்கம்! நான் நலமாக இருக்கிறேன் (I am doing great!). உங்களுக்கு நான் இன்று எவ்வாறு உதவ வேண்டும்? நீங்கள் எதை வேண்டுமானாலும் கேட்கலாம் (Coding, Math, Science, Writing, or BIS Standards)!`;
      }
      if (clean.includes('vanakkam')) {
        return `வணக்கம்! (Vanakkam!) உங்களுக்கு நான் என்ன உதவி செய்ய வேண்டும்? கோடிங் (Coding), அறிவியல் (Science), கணக்கு (Math), அல்லது BIS தரநிலைகள் பற்றி என்னிடம் கேட்கலாம்.`;
      }
      if (clean.includes('nandri') || clean.includes('thanks')) {
        return `மிக்க நன்றி! (You're welcome!) உங்களுக்கு மேலும் ஏதேனும் கேள்விகள் இருந்தால் தயங்காமல் கேளுங்கள்!`;
      }
    }
    return null;
  }
}

const universalBrain = new UniversalKnowledgeEngine();

// =========================================================================
// 4. BIS INTELLIGENT KNOWLEDGE & CONVERSATIONAL ENGINE
// =========================================================================

class BISKnowledgeEngine {
  constructor(standardsData = [], laboratoriesData = [], servicesData = [], knowledgeBase = {}, onlineInfo = null) {
    this.standardsData = standardsData;
    this.laboratoriesData = laboratoriesData;
    this.servicesData = servicesData;
    this.knowledgeBase = knowledgeBase;
    this.onlineInfo = onlineInfo;
  }

  isBISQuery(raw, clean) {
    if (/\bis[\s:\-]*\d{2,6}\b/i.test(raw)) return true;

    const bisKeywords = [
      'bureau of indian standards', 'indian standard', 'isi mark', 'isi certification', 'qco order', 
      'quality control order', 'hallmarking', 'huid', 'manakonline', 'manak online', 'know your standard', 
      'compulsory registration scheme', 'crs registration', 'fmcs certification', 'bis lims', 
      'bis laboratory', 'bis testing', 'grant of licence', 'grant of license', 'cm/l', 'nabl accredited', 
      'electric kettle standard', 'packaged drinking water standard', 'helmet standard', 'battery standard', 
      'cement standard', 'steel standard', 'toys standard', 'footwear standard', 'solar panel standard', 
      'cables standard', 'eco mark scheme', 'online information', 'domestic manufacturer', 'form v', 
      'form-v', 'hallmarking report', 'licence report', 'simplified procedure', 'online application'
    ];

    if (bisKeywords.some(kw => raw.includes(kw) || clean.includes(kw))) return true;

    const bisSingleWords = ['bis', 'isi', 'qco', 'huid', 'manakonline', 'fmcs', 'cml'];
    const words = clean.split(/\s+/);
    if (bisSingleWords.some(w => words.includes(w))) return true;

    return false;
  }

  async processQuery({
    message,
    conversation_id,
    clarifications = {},
    language = 'en',
    history = [],
    ai_mode = 'chatgpt',
    ai_model = 'gemini-1.5-flash',
    custom_api_key = null,
    custom_provider = null
  }) {
    const rawMsg = message.trim();
    const q = rawMsg.toLowerCase();
    let cleanQ = q.replace(/[^a-zA-Z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();

    // 1. Contextual Query Resolution (Multi-Turn History)
    cleanQ = this.extractContextualQuery(cleanQ, history);

    // 2. Tamil / Tanglish natural conversational check
    const tamilAns = universalBrain.handleTamilOrTanglish(cleanQ);
    if (tamilAns && ai_mode === 'chatgpt') {
      return {
        conversation_id,
        intent: "chatgpt_conversational_reasoning",
        answer: tamilAns,
        suggested_followups: ["Python coding example", "Explain in detail", "Draft a message"]
      };
    }

    // 3. Pure Greetings & Conversational Friendly Interaction
    if (this.isPureGreeting(cleanQ)) {
      const greet = this.handleGreeting(conversation_id, language);
      return greet;
    }

    // 4. Casual Chit-Chat & Appreciation
    const casual = this.handleCasualChat(cleanQ, conversation_id, language);
    if (casual) return casual;

    // 5. If in BIS mode OR (in auto mode and explicitly asking about BIS):
    const isExplicitBIS = this.isBISQuery(q, cleanQ);
    if (ai_mode === 'bis' || (ai_mode === 'auto' && isExplicitBIS)) {
      // Check What is BIS query
      const whatIsBisRes = this.handleWhatIsBIS(cleanQ, rawMsg, conversation_id, language);
      if (whatIsBisRes) return await this.localizeResponse(whatIsBisRes, language);

      // Check Online Information / Portals query
      const onlineInfoRes = this.handleOnlineInformationQuery(cleanQ, rawMsg, conversation_id, language);
      if (onlineInfoRes) return await this.localizeResponse(onlineInfoRes, language);

      if (this.isLabSearchQuery(cleanQ)) {
        const labRes = this.handleLabSearch(cleanQ, conversation_id, language);
        if (labRes) return await this.localizeResponse(labRes, language);
      }

      const matchedIndexed = this.findIndexedStandards(cleanQ);
      if (matchedIndexed) {
        const indRes = this.handleIndexedStandard(matchedIndexed, cleanQ, clarifications, conversation_id, language);
        return await this.localizeResponse(indRes, language);
      }

      const matchedExtended = this.findExtendedStandard(cleanQ);
      if (matchedExtended) {
        const extRes = this.handleExtendedStandard(matchedExtended, conversation_id, language);
        return await this.localizeResponse(extRes, language);
      }
    }

    // 6. Try Live Generative AI Providers (Gemini, OpenAI, Groq)
    const activeSystemPrompt = (ai_mode === 'bis') ? 
      `You are an authoritative Bureau of Indian Standards (BIS) Specialist. Provide accurate, clause-grounded Indian Standards (IS), QCO regulatory orders, mandatory testing procedures, and lab audit guidance. Use clear markdown formatting. Language: ${language}.` :
      `${CHATGPT_MASTER_SYSTEM_PROMPT}\n\nLanguage: ${language}.`;

    try {
      const generativeAnswer = await callGenerativeAI({
        prompt: rawMsg,
        history,
        systemPrompt: activeSystemPrompt,
        customApiKey: custom_api_key,
        customProvider: custom_provider,
        aiModel: ai_model
      });

      if (generativeAnswer && generativeAnswer.trim()) {
        const followups = this.generateSmartFollowups(rawMsg, isExplicitBIS);
        return {
          conversation_id,
          intent: isExplicitBIS ? "bis_compliance" : "chatgpt_general",
          needs_clarification: false,
          clarification_questions: [],
          answer: generativeAnswer,
          suggested_followups: followups,
          product: null,
          standards: [],
          requirements: [],
          tests: [],
          laboratories: [],
          citations: [],
          official_actions: isExplicitBIS ? [
            { title: "Manakonline Portal", portal: "e-BIS", url: "https://www.manakonline.in/", action_type: "online_application" },
            { title: "Know Your Standard (KYS)", portal: "BIS KYS", url: "https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/indian_standards/isdetails", action_type: "document_download" }
          ] : [],
          limitations: []
        };
      }
    } catch (err) {
      console.warn('Live AI generation failed, using Universal Brain:', err.message);
    }

    // 7. Built-in Universal Intelligence Brain
    // A. Emotional, Entertainment, Boredom, Stories & Fun
    const emotionalAns = universalBrain.generateEmotionalOrConversationalResponse(rawMsg);
    if (emotionalAns) {
      return await this.localizeResponse({
        conversation_id,
        intent: "conversational_entertainment",
        answer: emotionalAns,
        suggested_followups: ["Tell me a fun fact", "Play a riddle game", "Tell me a short story", "Recommend a great movie"]
      }, language);
    }

    // B. Ideation / Creative / Brainstorming
    const creativeAns = universalBrain.generateCreativeOrIdeationResponse(rawMsg);
    if (creativeAns) {
      return await this.localizeResponse({
        conversation_id,
        intent: "creative_ideation",
        answer: creativeAns,
        suggested_followups: ["Give me more details on Idea #1", "How do I monetize this?", "Create a tech architecture"]
      }, language);
    }

    // C. Mathematics & Calculations
    const mathAns = universalBrain.solveMathOrCalculation(rawMsg);
    if (mathAns) {
      return await this.localizeResponse({
        conversation_id,
        intent: "mathematics_calculation",
        answer: mathAns,
        suggested_followups: ["Explain the formula used", "Solve another calculation", "Show alternative method"]
      }, language);
    }

    // D. Programming & Tech
    const codeAns = universalBrain.generateCodeOrTechResponse(rawMsg);
    if (codeAns) {
      return await this.localizeResponse({
        conversation_id,
        intent: "programming_tech",
        answer: codeAns,
        suggested_followups: ["Can you explain line by line?", "How do I optimize this?", "Rewrite in another language"]
      }, language);
    }

    // E. Writing & Drafting
    const writingAns = universalBrain.generateWritingResponse(rawMsg);
    if (writingAns) {
      return await this.localizeResponse({
        conversation_id,
        intent: "writing_drafting",
        answer: writingAns,
        suggested_followups: ["Make it more formal", "Make it shorter", "Add more specific points"]
      }, language);
    }

    // F. Science & General Concepts
    const scienceAns = universalBrain.generateScienceOrGeneralResponse(rawMsg);
    if (scienceAns) {
      return await this.localizeResponse({
        conversation_id,
        intent: "science_general_knowledge",
        answer: scienceAns,
        suggested_followups: ["Explain in simpler terms", "Give real-world examples", "What are future developments?"]
      }, language);
    }

    // 8. Dynamic Universal Conversational Fallback
    const dynamicFallback = this.handleUniversalDynamicReasoning(rawMsg, cleanQ, conversation_id, language, isExplicitBIS);
    return await this.localizeResponse(dynamicFallback, language);
  }

  handleUniversalDynamicReasoning(userMessage, clean, conversation_id, language, isExplicitBIS) {
    if (isExplicitBIS) {
      const answer = `### 🇮🇳 Bureau of Indian Standards (BIS) Guidance\n\n` +
        `Thank you for your question regarding **Indian Standards & Quality Compliance**!\n\n` +
        `Under the **Bureau of Indian Standards Act, 2016**, product certification in India is governed through structured Quality Control Orders (QCOs) and published Indian Standards (IS).\n\n` +
        `### Key Steps for BIS Compliance in India:\n` +
        `1. **Standard Identification:** Ascertain if product falls under **Scheme I (ISI Mark)** or **Scheme II (Compulsory Registration - CRS)**.\n` +
        `2. **In-House Testing Setup:** Procure the *Scheme of Inspection & Testing (SIT)* from the [Know Your Standard (KYS)](https://www.services.bis.gov.in/) portal.\n` +
        `3. **Online Application:** Submit Form-V on **[Manakonline](https://www.manakonline.in/)** with factory & test machinery details.\n` +
        `4. **Independent Lab Audit:** BIS officers inspect premises and test samples at recognized BIS/NABL laboratories.\n` +
        `5. **Grant of Licence (GoL):** BIS issues your CM/L number permitting official ISI marking.\n\n` +
        `💡 *Mention any specific product (e.g., Electric Kettle, Water, Steel, Cement, Toys, Helmet, Cables) for exact clause specifications, fees, and test parameters!*`;

      return {
        conversation_id,
        intent: "bis_general_guidance",
        answer,
        suggested_followups: [
          "Tell me about Electric Kettle (IS 302-2-15)",
          "Tell me about Packaged Drinking Water (IS 14543)",
          "Tell me about Lithium-ion Batteries (IS 16046)",
          "How do I get 50% MSME concession on fees?"
        ],
        official_actions: [
          { title: "Know Your Standard (KYS)", portal: "BIS KYS", url: "https://www.services.bis.gov.in/", action_type: "document_download" },
          { title: "Manakonline Application", portal: "e-BIS", url: "https://www.manakonline.in/", action_type: "online_application" }
        ]
      };
    }

    const answer = `I hear you! 😊 

Tell me a bit more about what you're thinking or what you'd like to do! Whether you'd like to:
- 💡 **Learn or discuss something exciting**
- 🎮 **Play a trivia game or riddle**
- 💻 **Work on a coding or technical problem**
- ✍️ **Write or edit a document or creative piece**

I'm ready whenever you are—what should we dive into?`;

    return {
      conversation_id,
      intent: "chatgpt_conversational_reasoning",
      answer,
      suggested_followups: [
        "Tell me a fun fact",
        "Can you write a Python script?",
        "Help me brainstorm ideas",
        "Tell me a story"
      ]
    };
  }

  handleOnlineInformationQuery(clean, raw, conversation_id, language) {
    const q = (raw + ' ' + clean).toLowerCase();

    const isOnlineInfo = 
      q.includes('online information') ||
      q.includes('online portal') ||
      q.includes('domestic manufacturer') ||
      q.includes('form v') ||
      q.includes('form-v') ||
      q.includes('hallmarking report') ||
      q.includes('licence report') ||
      q.includes('license report') ||
      q.includes('simplified procedure') ||
      (q.includes('how to apply') && (q.includes('online') || q.includes('portal') || q.includes('form'))) ||
      (q.includes('where to apply') && (q.includes('online') || q.includes('portal'))) ||
      q.includes('https www bis gov in product certification online information') ||
      q.includes('product-certification/online-information');

    if (!isOnlineInfo) return null;

    const answer = `### 🌐 BIS Product Certification — Official Online Information & Digital Portals

Source & Guidelines: **[BIS Product Certification Online Information](https://www.bis.gov.in/product-certification/online-information/?lang=en)**

---

### 1. 🏭 Product Certification Scheme (Domestic Manufacturer)
* **Official Portal:** [Manakonline Conformity Assessment Portal](https://www.manakonline.in/MANAK/ConformityAssessment)
* **Scheme Type:** Scheme I (ISI Mark Product Certification)
* **Key Online Capabilities:**
  - **Online Form-V Submission:** Apply digitally for new Grant of Licence (GoL) for domestic manufacturing premises.
  - **Simplified Procedure:** Expedited 30-day licensing by submitting prior test reports from NABL accredited labs before verification audit.
  - **Normal Procedure:** Standard application workflow with preliminary factory inspection and sample drawing.
  - **Licence Inclusions & Endorsements:** Apply to add new sizes, models, varieties, or brand names to an existing CM/L licence.
  - **Fee Concessions:** 50% discount on Application and Minimum Marking Fees (MMF) for Micro Enterprises (Udyam registered) and DPIIT-recognized Startups.

---

### 2. 💎 Hallmarking Scheme & Online Reports Directory
* **Official Portals:**
  - 📊 [Hallmarking Licence Related Reports](https://www.manakonline.in/MANAK/ApplicationHMLicenceRelatedrpt)
  - 🔍 [Application & Licence Public Directory](https://www.manakonline.in/MANAK/ApplicationLicenceRelatedrpt)
  - 🏛️ [Assaying & Hallmarking Centres (AHC) Directory](https://huid.manakonline.in/MANAK/AHCListForWebsite)
  - ⚠️ [Suspended / Cancelled Hallmarking Centres](https://huid.manakonline.in/MANAK/AHCSuspendCancelledAppsForWebsite)
* **Key Online Capabilities:**
  - Search licensed jewellers by State, District, and PIN Code.
  - Search active Assaying & Hallmarking Centres (AHCs) for gold & silver hallmarking.
  - Verify BIS-licensed gold refineries and mints under IS 1417 / IS 1418.
  - Verify authenticity of 6-digit alphanumeric HUID (Hallmark Unique Identification) codes.

---

### 3. 📋 Step-by-Step Online Certification Roadmap
1. **Identify Standard:** Find your product standard & SIT on **[Know Your Standard (KYS)](https://standards.bis.gov.in/website/know-your-standards)**.
2. **Install In-House Lab:** Equip factory with mandatory testing apparatus required by the Scheme of Inspection and Testing (SIT).
3. **Register on Manakonline:** Create an account on **[Manakonline (e-BIS)](https://www.manakonline.in/MANAK/ConformityAssessment)** and submit Form-V.
4. **Choose Procedure:**
   - *Simplified Procedure:* Upload NABL lab test report for fast-track processing.
   - *Normal Procedure:* BIS officer conducts factory audit and draws samples for independent lab testing.
5. **Grant of Licence (GoL):** BIS issues official CM/L number permitting use of the ISI Mark on your products.`;

    return {
      conversation_id,
      intent: "bis_online_information",
      answer,
      suggested_followups: [
        "How to apply under Simplified Procedure?",
        "What are the fees for Domestic Manufacturer Scheme?",
        "How to verify a Jeweller's Hallmarking Licence?",
        "How do I search testing labs on BIS LIMS?"
      ],
      official_actions: [
        { title: "Domestic Manufacturer Portal", portal: "e-BIS", url: "https://www.manakonline.in/MANAK/ConformityAssessment", action_type: "online_application" },
        { title: "Hallmarking Reports Portal", portal: "e-BIS", url: "https://www.manakonline.in/MANAK/ApplicationHMLicenceRelatedrpt", action_type: "document_download" },
        { title: "BIS Online Information Page", portal: "BIS Official", url: "https://www.bis.gov.in/product-certification/online-information/?lang=en", action_type: "online_application" }
      ]
    };
  }

  handleWhatIsBIS(clean, rawMsg, conversation_id, language) {
    const q = clean.toLowerCase().trim();
    if (q === 'what is bis' || q === 'who is bis' || q === 'tell me about bis' || q === 'what is bureau of indian standards' || q === 'explain bis' || q === 'about bis' || q === 'bis definition' || q === 'bis meaning' || q === 'what is the bureau of indian standards') {
      const answer = `### 🏛️ What is the Bureau of Indian Standards (BIS)?

The **Bureau of Indian Standards (BIS)** is the **National Standards Body of India**, established under the **Bureau of Indian Standards Act, 2016** under the Ministry of Consumer Affairs, Food & Public Distribution, Government of India.

---

### 🔑 Core Roles and Mandate:
1. **Standardization:** Formulates and publishes **Indian Standards (IS)** across all technical sectors (Engineering, Electronics, Chemicals, Food, Civil, Medical).
2. **Conformity Assessment & ISI Mark (Scheme I):** Grants licences to domestic and international manufacturers allowing them to use the prestigious **ISI Mark** on compliant products.
3. **Mandatory Quality Control Orders (QCO):** Enforces mandatory quality standards across 650+ critical consumer and industrial items (e.g. Helmets, Toys, Packaged Drinking Water, Steel, Cement, Electrical Appliances).
4. **Hallmarking of Gold & Silver:** Operates mandatory Hallmarking with 6-digit **HUID** (Hallmark Unique Identification) ensuring purity of precious jewellery.
5. **Compulsory Registration Scheme (CRS - Scheme II):** Regulates electronics, IT goods, and solar products via self-declaration based on testing in recognized laboratories.
6. **Laboratory Testing & LIMS:** Operates central, regional, and branch testing laboratories and empanels NABL-accredited labs across India.
7. **Consumer Protection & Verification:** Enables consumers to verify licences, check HUID authenticity, and lodge grievances via the **BIS CARE App**.

---

### 🌐 Official Portals & Services:
* **BIS Main Website:** [https://www.bis.gov.in](https://www.bis.gov.in)
* **Standards Discovery (KYS):** [Know Your Standard Portal](https://standards.bis.gov.in/website/know-your-standards)
* **Online Manufacturer Portal (e-BIS):** [Manakonline](https://www.manakonline.in/MANAK/ConformityAssessment)
* **Laboratory Search (LIMS):** [BIS LIMS](https://lims.bis.gov.in/)`;

      return {
        conversation_id,
        intent: "bis_general_guidance",
        answer,
        suggested_followups: [
          "How to apply for ISI Mark on Manakonline?",
          "What products are under mandatory QCO?",
          "How does Gold Hallmarking HUID work?",
          "Tell me about 50% MSME fee discount"
        ],
        official_actions: [
          { title: "BIS Main Portal", portal: "BIS Official", url: "https://www.bis.gov.in/?lang=en", action_type: "online_application" },
          { title: "Know Your Standard (KYS)", portal: "BIS KYS", url: "https://standards.bis.gov.in/website/know-your-standards", action_type: "document_download" },
          { title: "Manakonline e-BIS", portal: "e-BIS", url: "https://www.manakonline.in/", action_type: "online_application" }
        ]
      };
    }
    return null;
  }

  isPureGreeting(clean) {
    if (!clean) return false;
    const c = clean.toLowerCase().trim();

    // Regex matching any greeting like hi, hii, hiii, hey, heyy, hello, helloo, hola, howdy, yo, sup, etc.
    if (/^(h+i+|h+e+y+|h+e+l+l+o+|h+o+l+a+|howdy|sup|yo|wassup|vanakkam|namaste|good\s*(?:morning|afternoon|evening|day))$/i.test(c) ||
        /^(h+i+|h+e+y+|h+e+l+l+o+|vanakkam|namaste)\s*(?:there|buddy|friend|assistant|bot|ai|sir|bro)?$/i.test(c)) {
      return true;
    }

    return false;
  }

  handleGreeting(conversation_id, language) {
    return {
      conversation_id,
      intent: "greeting",
      answer: "Hi! 👋 How can I help you today? Feel free to ask me anything—whether it's writing, coding, math, brainstorming ideas, or Indian Standards!",
      suggested_followups: [
        "Can you write a Python script?",
        "Brainstorm 3 app ideas for remote teams",
        "Explain Quantum Computing",
        "Draft a leave application email"
      ]
    };
  }

  handleCasualChat(clean, conversation_id, language) {
    const c = clean.toLowerCase().trim();

    // How are you
    if (c.includes('how are you') || c.includes('how r u') || c.includes('how do you do') || c.includes('hows it going') || c.includes('how is it going')) {
      return {
        conversation_id,
        intent: "general_inquiry",
        answer: "I'm doing great, thank you for asking! 😊 How are you doing today? How can I assist you?",
        suggested_followups: ["I need help with coding", "Help me write an email", "Explain a science topic"]
      };
    }

    // What's up / sup
    if (c.includes('whats up') || c.includes('what is up') || c === 'sup' || c === 'wassup') {
      return {
        conversation_id,
        intent: "general_inquiry",
        answer: "Not much! Just here and ready to help you with whatever you're working on. What's on your mind? 😊",
        suggested_followups: ["Write some code", "Brainstorm startup ideas", "Ask a question"]
      };
    }

    // Who are you / what can you do
    if (c.includes('who are you') || c.includes('what are you') || c.includes('what can you do') || c.includes('tell me about yourself')) {
      return {
        conversation_id,
        intent: "general_inquiry",
        answer: `I am your general-purpose AI assistant! 🚀

Here are some things I can help you with:
- 💻 **Coding & Debugging:** Python, JavaScript, SQL, C++, web apps, algorithms.
- ✍️ **Writing & Drafting:** Emails, resignation letters, essays, cover letters.
- 🧮 **Math & Calculations:** Arithmetic, algebra, percentages, unit conversions.
- 🔬 **Science & Technology:** AI, Quantum Computing, Physics, Chemistry, Biology.
- 💡 **Brainstorming:** Creative project ideas, startup concepts, marketing strategies.
- 🏛️ **BIS & Standards:** Indian Standards (IS), ISI mark, QCO orders, and testing clauses.

What would you like to explore today?`,
        suggested_followups: ["Write a Python palindrome function", "Brainstorm app ideas", "Draft a leave email"]
      };
    }

    // Can you help me / need help
    if (c === 'can you help me' || c === 'i need help' || c === 'help me' || c === 'help') {
      return {
        conversation_id,
        intent: "general_inquiry",
        answer: "Of course! I would be happy to help. 😊 What are you working on or what question do you have?",
        suggested_followups: ["Write a Python function", "Draft an email", "Solve a math problem"]
      };
    }

    // Thank you
    if (c.includes('thank you') || c.includes('thanks') || c.includes('tysm') || c === 'thx') {
      return {
        conversation_id,
        intent: "general_inquiry",
        answer: "You're very welcome! 😊 Let me know if you need help with anything else.",
        suggested_followups: ["Ask another question", "Help me with coding", "Explain something else"]
      };
    }

    // Acknowledgements: ok, cool, great, awesome, nice
    if (/^(ok|okay|cool|great|awesome|nice|sounds good|got it|sure|alright|fine|perfect)$/i.test(c)) {
      return {
        conversation_id,
        intent: "general_inquiry",
        answer: "Awesome! Let me know whenever you're ready for the next question or task. 👍",
        suggested_followups: ["Write a Python script", "Ask a math question", "Brainstorm ideas"]
      };
    }

    // Farewells: bye, goodbye, see you, good night
    if (/^(bye|goodbye|see you|cya|good night|take care)$/i.test(c)) {
      return {
        conversation_id,
        intent: "general_inquiry",
        answer: "Goodbye! Have a wonderful day ahead! 👋 Feel free to reach out whenever you need help.",
        suggested_followups: ["Hello", "Can you help me?"]
      };
    }

    // Jokes
    if (c.includes('joke') || c.includes('funny') || c.includes('make me laugh')) {
      return {
        conversation_id,
        intent: "general_inquiry",
        answer: `😄 Here's a quick joke for you:

**Why do programmers prefer dark mode?**  
*Because light attracts bugs!* 🐛💻

Let me know if you want another joke or need help with a project!`,
        suggested_followups: ["Tell me another joke", "Write some code", "Brainstorm ideas"]
      };
    }

    return null;
  }

  extractContextualQuery(clean, history) {
    if (clean === 'how do i fix this' || clean === 'explain that' || clean === 'why' || clean === 'how to solve this') {
      if (history && history.length > 0) {
        const lastUser = [...history].reverse().find(m => m.role === 'user');
        if (lastUser) return lastUser.text || clean;
      }
    }
    return clean;
  }

  isLabSearchQuery(clean) {
    return clean.includes('lab') || clean.includes('laboratory') || clean.includes('testing center');
  }

  handleLabSearch(clean, conversation_id, language) {
    return {
      conversation_id,
      intent: "laboratory_lookup",
      answer: "### 🔬 BIS Recognized Testing Laboratories\n\nBIS operates Central & Regional Laboratories across India (CL Sahibabad, NRO Mohali, WRO Mumbai, SRO Chennai, ERO Kolkata) and recognizes NABL-accredited private laboratories for product conformity testing.",
      laboratories: this.laboratoriesData.slice(0, 4),
      suggested_followups: ["Search lab by product name", "How to submit samples for testing", "In-house lab requirements"]
    };
  }

  findIndexedStandards(clean) {
    if (!clean || !Array.isArray(this.standardsData)) return null;
    const cleanNoSpace = clean.replace(/[^a-z0-9]/g, '');

    // 1. Match IS Number
    const isMatch = this.standardsData.find(s => {
      if (!s || !s.is_number) return false;
      const isNum = s.is_number.toLowerCase().replace(/[^a-z0-9]/g, '');
      return isNum && cleanNoSpace.includes(isNum);
    });
    if (isMatch) return isMatch;

    // 2. Match exact product names
    const prodMatch = this.standardsData.find(s => {
      if (!s) return false;
      if (Array.isArray(s.product_names)) {
        return s.product_names.some(pn => typeof pn === 'string' && (clean.includes(pn.toLowerCase()) || pn.toLowerCase().includes(clean)));
      }
      if (typeof s.product_name === 'string') {
        return clean.includes(s.product_name.toLowerCase()) || s.product_name.toLowerCase().includes(clean);
      }
      return false;
    });
    if (prodMatch) return prodMatch;

    return null;
  }

  handleIndexedStandard(standard, clean, clarifications, conversation_id, language) {
    const prodName = Array.isArray(standard.product_names) ? standard.product_names[0] : (standard.product_name || standard.title || "Indian Standard Product");
    return {
      conversation_id,
      intent: "product_compliance",
      answer: `### 🇮🇳 Standard: **${standard.is_number}** - ${standard.title}\n\n**Applicable Product:** ${prodName}\n**Certification Scheme:** ${standard.scheme || 'Scheme I (ISI Mark)'}\n**Status:** ${standard.status || 'Active / Mandatory'}\n\n#### Key Testing Clauses & Requirements:\n${(standard.clauses || []).slice(0, 4).map(c => `- **${c.clause_no} (${c.heading}):** ${c.text}`).join('\n') || '- Electrical & Safety compliance under official BIS clauses.\n- Sample submission and factory audit guidelines.'}\n\n💡 *You can apply for Grant of Licence on the official [Manakonline Portal](https://www.manakonline.in/).*`,
      standards: [standard],
      requirements: standard.requirements || [],
      tests: standard.tests || [],
      citations: standard.citations || [],
      suggested_followups: ["What are the testing laboratory locations?", "How do I apply on Manakonline?", "MSME 50% fee discount rule"]
    };
  }

  findExtendedStandard(clean) {
    for (const key of Object.keys(EXTENDED_STANDARDS_DATABASE)) {
      if (clean.includes(key.replace(/[^a-z0-9]/g, '')) || clean.includes(key)) {
        return EXTENDED_STANDARDS_DATABASE[key];
      }
    }
    return null;
  }

  handleExtendedStandard(std, conversation_id, language) {
    let testTable = '| Test Parameter | Clause | Acceptance Limit |\n|---|---|---|\n';
    std.test_parameters.forEach(t => {
      testTable += `| **${t.name}** | ${t.clause} | ${t.limit} |\n`;
    });

    const answer = `### 🇮🇳 Official Standard: **${std.is_number}**\n\n**Title:** ${std.title}\n\n**Certification Scheme:** ${std.scheme} (${std.mandatory ? 'Mandatory under ' + std.qco_order : 'Voluntary'})\n\n### 🔬 Key Technical Testing Parameters\n${testTable}\n\n**Sample Size for Testing:** ${std.sample_size}\n\n**Fee Structure:** ${std.fee_overview}`;

    return {
      conversation_id,
      intent: "product_compliance",
      answer,
      standards: [std],
      suggested_followups: ["Where can I test this product?", "How to submit application on Manakonline?", "What in-house testing equipment is required?"]
    };
  }

  generateSmartFollowups(message, isBIS) {
    if (isBIS) {
      return [
        "What are the testing laboratory locations?",
        "How do I submit application on Manakonline?",
        "What is the MSME 50% fee discount rule?",
        "What are the in-house testing equipment requirements?"
      ];
    }
    return [
      "Can you provide a code example for this?",
      "Can you explain this in simpler terms?",
      "What are the key advantages and drawbacks?",
      "How do I apply this in a real project?"
    ];
  }

  async localizeResponse(responseObj, targetLanguage) {
    if (targetLanguage === 'en' || !targetLanguage) return responseObj;
    if (responseObj.answer) {
      responseObj.answer = await this.translateText(responseObj.answer, targetLanguage, 'en');
    }
    return responseObj;
  }

  async translateText(text, targetLang = 'en', sourceLang = 'en') {
    if (!text || typeof text !== 'string' || !text.trim() || targetLang === sourceLang || targetLang === 'en') return text;
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
                const translated = parsed[0].map(item => item[0]).filter(Boolean).join('');
                if (translated && translated.trim()) return resolve(translated);
              }
            }
          } catch (e) {
            // ignore
          }
          resolve(text);
        });
      });
      req.on('error', () => resolve(text));
      req.on('timeout', () => { req.destroy(); resolve(text); });
    });
  }


  /**
   * Localize payload answer & followups if non-English
   */
  async localizeResponse(payload, language) {
    if (!payload || !payload.answer || language === 'en') return payload;

    // If greeting, already localized
    if (payload.intent === 'greeting') return payload;

    // If already localized in handleIndexedStandard for ta or hi
    if ((language === 'ta' || language === 'hi') && payload.intent === 'product_compliance' && payload.answer.includes(language === 'ta' ? 'பொருந்தக்கூடிய' : 'लागू भारतीय मानक')) {
      return payload;
    }

    try {
      const translatedAnswer = await this.translateText(payload.answer, language, 'en');
      if (translatedAnswer && translatedAnswer.trim()) {
        payload.answer = translatedAnswer;
      }

      if (payload.suggested_followups && payload.suggested_followups.length > 0) {
        const translatedFollowups = await Promise.all(
          payload.suggested_followups.map(f => this.translateText(f, language, 'en'))
        );
        payload.suggested_followups = translatedFollowups;
      }
    } catch (e) {
      console.warn('Localization fallback:', e.message);
    }

    return payload;
  }

  /**
   * Extract context from multi-turn chat history if user asks a follow-up
   */
  extractContextualQuery(cleanQ, history = []) {
    if (!history || history.length === 0) return cleanQ;

    const isFollowup = cleanQ.includes('it') || cleanQ.includes('this') || cleanQ.includes('test') || 
      cleanQ.includes('fee') || cleanQ.includes('lab') || cleanQ.includes('cost') || 
      cleanQ.includes('step') || cleanQ.includes('apply') || cleanQ.includes('procedure') ||
      cleanQ.includes('where') || cleanQ.includes('document') || cleanQ.includes('clause');

    if (isFollowup) {
      // Look back through history for the last mentioned standard or product
      for (let i = history.length - 1; i >= 0; i--) {
        const item = history[i];
        const pastText = (item.content || item.text || '').toLowerCase();
        
        for (const std of this.standardsData) {
          if (std.product_names) {
            for (const p of std.product_names) {
              if (pastText.includes(p.toLowerCase())) {
                return `${cleanQ} ${p}`;
              }
            }
          }
          const isClean = std.is_number.toLowerCase().replace(/[^a-z0-9]/g, '');
          if (pastText.includes(isClean)) {
            return `${cleanQ} ${std.is_number}`;
          }
        }

        // Check extended standards
        for (const key of Object.keys(EXTENDED_STANDARDS)) {
          if (pastText.includes(key)) {
            return `${cleanQ} ${key}`;
          }
        }
      }
    }

    return cleanQ;
  }

  /**
   * Pure Greeting Handler (Warm, Enthusiastic, ChatGPT-like)
   */
  isPureGreeting(clean) {
    const pureGreetings = [
      'hi', 'hii', 'hiii', 'hello', 'helloo', 'hey', 'heyy', 'namaste', 'vanakkam', 
      'good morning', 'good afternoon', 'good evening', 'who are you', 'what can you do', 
      'how are you', 'what is your name', 'can you help me', 'help me', 
      'வணக்கம்', 'नमस्ते', 'నమస్కారం', 'নমস্কার', 'नमस्कार', 'નમસ્તે',
      'kem cho', 'bagunnara', 'kemon acho'
    ];
    return pureGreetings.includes(clean) || clean.startsWith('hi ') || clean.startsWith('hello ') || clean.startsWith('hey ');
  }

  handleGreeting(conversation_id, language) {
    let answer = '';
    let followups = [];

    if (language === 'ta') {
      answer = `வணக்கம்! 😊 நான் உங்கள் **BIS AI அறிவார்ந்த வழிகாட்டி (BIS AI Intelligent Assistant)**.\n\n` +
        `இந்திய தரநிலைகள் பணியகம் (BIS) தொடர்பான தகவல்களை எளிதாக தெரிந்துகொள்ள நான் உதவுகிறேன்! தயாரிப்பு சான்றிதழ் (ISI மார்க்), கட்டாயப் பதிவுத் திட்டம் (CRS), கட்டாயப் பரிசோதனை முறைகள் மற்றும் ஆய்வகங்கள் பற்றி என்னிடம் கேளுங்கள்.\n\n` +
        `நீங்கள் இன்று எந்த தயாரிப்பு அல்லது திட்டம் குறித்து அறிய விரும்புகிறீர்கள்? நீங்கள் தொடங்குவதற்கு கீழே உள்ள விருப்பங்களில் ஒன்றைத் தேர்வுசெய்யலாம்:`;
      followups = [
        "மின்சார கெண்டி (Electric Kettle) IS 302-2-15 சோதனை முறைகள் என்ன?",
        "பாட்டிலில் அடைக்கப்பட்ட குடிநீர் (IS 14543) உரிமம் பெறுவது எப்படி?",
        "ISI முத்திரைக்கும் CRS பதிவிற்கும் உள்ள வேறுபாடு என்ன?",
        "Manakonline-ல் உரிமத்திற்கு எவ்வாறு விண்ணப்பிப்பது?",
        "தங்க நகை ஹால்மார்க்கிங் (HUID) சரிபார்ப்பது எப்படி?"
      ];
    } else if (language === 'hi') {
      answer = `नमस्ते! 😊 मैं आपका **बीआईएस एआई सहायक (BIS AI Intelligent Assistant)** हूँ।\n\n` +
        `भारतीय मानक ब्यूरो (BIS) से संबंधित सभी नियमों, ISI मार्क, अनिवार्य QCO आदेशों, परीक्षण प्रयोगशालाओं और लाइसेंस आवेदन प्रक्रिया को समझना अब बहुत आसान है।\n\n` +
        `आज आप किस उत्पाद या मानक के बारे में जानकारी प्राप्त करना चाहते हैं? आप नीचे दिए गए सुझावों में से किसी एक पर क्लिक कर सकते हैं:`;
      followups = [
        "इलेक्ट्रिक केतली (IS 302-2-15) के लिए आवश्यक परीक्षण क्या हैं?",
        "पैकेज्ड पेयजल (IS 14543) प्लांट के लिए लाइसेंस कैसे लें?",
        "ISI मार्क और CRS रजिस्ट्रेशन में क्या अंतर है?",
        "मानकऑनलाइन (Manakonline) पर आवेदन कैसे करें?",
        "सोने के हॉलमार्किंग HUID की जांच कैसे करें?"
      ];
    } else if (language === 'te') {
      answer = `నమస్కారం! 😊 నేను మీ **BIS AI ఇంటెలిజెంట్ అసిస్టెంట్‌ని (BIS AI Intelligent Assistant)**.\n\n` +
        `బ్యూరో ఆఫ్ ఇండియన్ స్టాండర్డ్స్ (BIS), ISI మార్క్, తప్పనిసరి QCO ఆర్డర్లు, టెస్టింగ్ ప్రయోగశాలలు మరియు లైసెన్సింగ్ విధానాల గురించి పూర్తి వివరాలను ఇక్కడ సులభంగా తెలుసుకోవచ్చు.\n\n` +
        `ఈరోజు మీరు ఏ ఉత్పత్తి లేదా ప్రమాణం గురించి తెలుసుకోవాలనుకుంటున్నారు? ప్రారంభించడానికి క్రింది అంశాలలో ఒకదాన్ని ఎంచుకోండి:`;
      followups = [
        "ఎలక్ట్రిక్ కేటిల్ (IS 302-2-15) కోసం అవసరమైన పరీక్షలు ఏమిటి?",
        "ప్యాకేజ్డ్ తాగునీటి (IS 14543) ప్లాంట్ కోసం లైసెన్స్ ఎలా పొందాలి?",
        "ISI మార్క్ మరియు CRS రిజిస్ట్రేషన్ మధ్య తేడా ఏమిటి?",
        "Manakonline పోర్టల్‌లో లైసెన్స్ కోసం ఎలా దరఖాస్తు చేయాలి?",
        "బంగారు ఆభరణాల హాల్‌మార్కింగ్ HUID ఎలా తనిఖీ చేయాలి?"
      ];
    } else if (language === 'bn') {
      answer = `নমস্কার! 😊 আমি আপনার **BIS AI ইন্টেলিজেন্ট অ্যাসিস্ট্যান্ট (BIS AI Intelligent Assistant)**।\n\n` +
        `ব্যুরো অফ ইন্ডিয়ান স্ট্যান্ডার্ডস (BIS), ISI মার্ক, বাধ্যতামূলক QCO নির্দেশিকা, ল্যাবরেটরি টেস্ট এবং লাইসেন্সিং প্রক্রিয়ার সমস্ত তথ্য জানতে আমি আপনাকে সাহায্য করতে প্রস্তুত।\n\n` +
        `আজ আপনি কোন পণ্য বা স্ট্যান্ডার্ড সম্পর্কে জানতে চান? নিচে দেওয়া অপশনগুলি থেকে বেছে নিতে পারেন:`;
      followups = [
        "ইলেকট্রিক কেটলি (IS 302-2-15)-র জন্য কী কী পরীক্ষা প্রয়োজন?",
        "প্যাকেজড পানীয় জলের (IS 14543) প্ল্যান্টের লাইসেন্স কীভাবে পাবেন?",
        "ISI মার্ক এবং CRS রেজিস্ট্রেশনের মধ্যে পার্থক্য কী?",
        "Manakonline পোর্টালে কীভাবে আবেদন করবেন?",
        "সোনার হলমার্কিং HUID কীভাবে যাচাই করবেন?"
      ];
    } else if (language === 'mr') {
      answer = `नमस्कार! 😊 मी तुमचा **BIS AI इंटेलिजंट असिस्टंट (BIS AI Intelligent Assistant)** आहे.\n\n` +
        `भारतीय मानक ब्युरो (BIS), ISI मार्क, अनिवार्य QCO नियम, चाचणी प्रयोगशाळा आणि परवाना अर्ज प्रक्रियेबद्दल अधिकृत माहिती मिळवणे आता अत्यंत सोपे आहे.\n\n` +
        `आज आपण कोणत्या उत्पादनाबद्दल किंवा मानकाबद्दल माहिती जाणून घेऊ इच्छिता? सुरुवात करण्यासाठी खालीलपैकी एका पर्यायावर क्लिक करा:`;
      followups = [
        "इलेक्ट्रिक किटली (IS 302-2-15) साठी आवश्यक चाचण्या कोणत्या आहेत?",
        "पॅकेज्ड पिण्याच्या पाण्याचा (IS 14543) प्लांट सुरू करण्यासाठी परवाना कसा मिळवावा?",
        "ISI मार्क आणि CRS नोंदणीमध्ये काय फरक आहे?",
        "Manakonline वर परवान्यासाठी अर्ज कसा करावा?",
        "सोन्याचे हॉलमार्किंग HUID कसे तपासायचे?"
      ];
    } else if (language === 'gu') {
      answer = `નમસ્તે! 😊 હું તમારો **BIS AI ઇન્ટેલિજન્ટ આસિસ્ટન્ટ (BIS AI Intelligent Assistant)** છું.\n\n` +
        `બ્યુરો ઓફ ઇન્ડિયન સ્ટાન્ડર્ડ્સ (BIS), ISI માર્ક, ફરજિયાત QCO ઓર્ડર, ટેસ્ટિંગ લેબોરેટરીઝ અને લાયસન્સ અરજી પ્રક્રિયા વિશેની અધિકૃત માહિતી અહીં સરળતાથી મેળવો.\n\n` +
        `આજે તમે કયા ઉત્પાદન અથવા ધોરણ વિશે માહિતી મેળવવા માંગો છો? શરૂ કરવા માટે નીચેના વિકલ્પોમાંથી એક પસંદ કરો:`;
      followups = [
        "ઇલેક્ટ્રિક કેટલ (IS 302-2-15) માટે કયા પરીક્ષણો જરૂરી છે?",
        "પેકેજ્ડ પીવાના પાણી (IS 14543) પ્લાન્ટ માટે લાયસન્સ કેવી રીતે મેળવવું?",
        "ISI માર્ક અને CRS નોંધણી વચ્ચે શું તફાવત છે?",
        "Manakonline પોર્ટલ પર લાયસન્સ માટે કેવી રીતે અરજી કરવી?",
        "સોનાના હોલમાર્કિંગ HUID ની ચકાસણી કેવી રીતે કરવી?"
      ];
    } else {
      answer = `Hey there! 😊 Great to connect with you! I'm your friendly **BIS AI Intelligent Assistant** — think of me as your dedicated guide for everything related to Indian Standards, quality certifications, and testing in India. 🇮🇳\n\n` +
        `### How I can help you today:\n` +
        `- 🔍 **Find Applicable Indian Standards (IS):** Inquire about compliance for any product (Electric Kettles, Packaged Water, Helmets, Lithium-ion Batteries, Cement, Steel, Toys, Footwear, Cables, Solar).\n` +
        `- 📜 **Certification Roadmaps:** Step-by-step navigation for **Scheme I (ISI Mark)**, **Scheme II (CRS)**, and **FMCS (Foreign Manufacturers)**.\n` +
        `- 🧪 **Testing Protocols & SIT:** Mandatory quality and safety limits, in-house laboratory setup, and test frequencies.\n` +
        `- 🔬 **Find Recognized Labs (LIMS):** Match testing centers across India for your specific product.\n` +
        `- 💰 **Fees & Concessions:** Accurate fee breakdown with **50% MSME/Startup discounts**.\n` +
        `- 🏷️ **Gold Hallmarking & HUID:** Consumer and jeweller verification guidelines.\n\n` +
        `What product or project are you working on today? Feel free to ask anything, or click one of the quick topics below! 👇`;
      followups = [
        "I want to manufacture an Electric Kettle (IS 302-2-15)",
        "Packaged Drinking Water plant setup under IS 14543",
        "Lithium-ion Battery testing under CRS (IS 16046)",
        "Two-Wheeler Helmet safety requirements (IS 4151)",
        "What are the BIS license fees & MSME 50% discount?",
        "What is the difference between ISI Mark and CRS Registration?"
      ];
    }

    return {
      conversation_id,
      intent: "greeting",
      needs_clarification: false,
      clarification_questions: [],
      answer,
      suggested_followups: followups,
      product: null,
      standards: [],
      requirements: [],
      tests: [],
      laboratories: [],
      citations: [],
      official_actions: [
        { title: "Manakonline (e-BIS Portal)", portal: "e-BIS", url: "https://www.manakonline.in/", action_type: "online_application" },
        { title: "Know Your Standard (KYS)", portal: "BIS KYS", url: "https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/indian_standards/isdetails", action_type: "document_download" }
      ],
      limitations: []
    };
  }

  /**
   * Casual Conversation & Empathetic Chat (ChatGPT-style)
   */
  handleCasualChat(clean, conversation_id, language) {
    if (clean.includes('thank') || clean.includes('thanks') || clean.includes('nandri') || clean.includes('dhanyawad') || clean.includes('நன்றி') || clean.includes('धन्यवाद')) {
      return {
        conversation_id,
        intent: "casual_chat",
        needs_clarification: false,
        clarification_questions: [],
        answer: `You're very welcome! 😊 I'm always delighted to help you navigate Indian Standards and product compliance. Is there any specific test, laboratory, or licensing step you'd like to explore next?`,
        suggested_followups: [
          "What is the difference between ISI and CRS?",
          "How do I apply for an ISI mark on Manakonline?",
          "Where are BIS testing laboratories located?",
          "What are the statutory fees with MSME discount?"
        ],
        product: null,
        standards: [],
        requirements: [],
        tests: [],
        laboratories: [],
        citations: [],
        official_actions: [],
        limitations: []
      };
    }

    if (clean.includes('how are you') || clean.includes('how r u') || clean.includes('how do you do')) {
      return {
        conversation_id,
        intent: "casual_chat",
        needs_clarification: false,
        clarification_questions: [],
        answer: `I'm doing great, thank you for asking! 😊 I'm ready to help you with anything related to Indian Standards, quality certifications, testing protocols, or laboratory matching across India. What product or standard can we look into together?`,
        suggested_followups: [
          "Tell me about Electric Kettle compliance",
          "What are the requirements for Packaged Drinking Water?",
          "How do I apply for a license on Manakonline?"
        ],
        product: null,
        standards: [],
        requirements: [],
        tests: [],
        laboratories: [],
        citations: [],
        official_actions: [],
        limitations: []
      };
    }

    if (clean.includes('good') || clean.includes('great') || clean.includes('awesome') || clean.includes('nice') || clean.includes('cool')) {
      return {
        conversation_id,
        intent: "casual_chat",
        needs_clarification: false,
        clarification_questions: [],
        answer: `Glad you found that helpful! 😊 I'm here whenever you need detailed standards analysis, in-house lab checklists, or licensing roadmaps. What topic should we dive into next?`,
        suggested_followups: [
          "Tell me about cement quality standards",
          "What are the helmet safety requirements?",
          "How to verify gold HUID hallmarking?",
          "What are the penalties for non-compliance?"
        ],
        product: null,
        standards: [],
        requirements: [],
        tests: [],
        laboratories: [],
        citations: [],
        official_actions: [],
        limitations: []
      };
    }

    return null;
  }

  /**
   * Laboratory Search Handler
   */
  isLabSearchQuery(clean) {
    const isLabWord = clean.includes('lab') || clean.includes('laboratory') || clean.includes('testing center') || 
      clean.includes('where to test') || clean.includes('where can i test') || clean.includes('lims') || 
      clean.includes('ஆய்வகம்') || clean.includes('प्रयोगशाला');
    const isTestQuestion = clean.includes('what tests are required') || clean.includes('what are the tests') || clean.includes('testing parameters');
    return isLabWord && !isTestQuestion;
  }

  handleLabSearch(clean, conversation_id, language) {
    let matchedLabs = this.laboratoriesData;

    if (clean.includes('chennai') || clean.includes('tamil nadu') || clean.includes('south')) {
      matchedLabs = this.laboratoriesData.filter(l => l.state.toLowerCase().includes('tamil nadu') || l.district.toLowerCase().includes('chennai'));
    } else if (clean.includes('mumbai') || clean.includes('maharashtra') || clean.includes('west')) {
      matchedLabs = this.laboratoriesData.filter(l => l.state.toLowerCase().includes('maharashtra') || l.district.toLowerCase().includes('mumbai'));
    } else if (clean.includes('sahibabad') || clean.includes('delhi') || clean.includes('uttar pradesh') || clean.includes('ghaziabad') || clean.includes('noida')) {
      matchedLabs = this.laboratoriesData.filter(l => l.state.toLowerCase().includes('uttar pradesh') || l.id === 'lab_001');
    } else if (clean.includes('kolkata') || clean.includes('bengal') || clean.includes('east')) {
      matchedLabs = this.laboratoriesData.filter(l => l.state.toLowerCase().includes('west bengal'));
    } else if (clean.includes('bangalore') || clean.includes('bengaluru') || clean.includes('karnataka')) {
      matchedLabs = this.laboratoriesData.filter(l => l.state.toLowerCase().includes('karnataka'));
    } else if (clean.includes('chandigarh') || clean.includes('punjab') || clean.includes('haryana') || clean.includes('north')) {
      matchedLabs = this.laboratoriesData.filter(l => l.state.toLowerCase().includes('punjab') || l.district.toLowerCase().includes('chandigarh'));
    }

    const answer = `Here are the official **BIS-Recognized & Regional Testing Laboratories (BIS LIMS)** matching your location/scope:\n\n` +
      matchedLabs.map(l => (
        `### 🔬 ${l.name} (${l.category})\n` +
        `- **Location:** ${l.address}, ${l.district}, ${l.state} - ${l.pincode}\n` +
        `- **Accreditation:** ${l.status} (Valid up to ${l.validity})\n` +
        `- **Contact:** 📞 ${l.contact.phone} | ✉️ ${l.contact.email}\n` +
        `- **Recognized Testing Scopes:**\n` +
        l.scopes.map(s => `  - \`${s}\``).join('\n')
      )).join('\n\n') +
      `\n\n💡 **Sample Submission Tip:** You can generate an electronic test request and track sample progress online via the **[BIS LIMS Portal](https://www.lims.bis.gov.in/)**.\n\n` +
      `Would you like to know the specific testing fees for any of these standards or see how to prepare test samples?`;

    return {
      conversation_id,
      intent: "laboratory_search",
      needs_clarification: false,
      clarification_questions: [],
      answer,
      suggested_followups: [
        "How do I submit test samples to BIS LIMS?",
        "What are the testing charges for my product?",
        "How do I apply for an ISI mark on Manakonline?",
        "What in-house testing equipment is required at my factory?"
      ],
      product: null,
      standards: [],
      requirements: [],
      tests: [],
      laboratories: matchedLabs,
      citations: [],
      official_actions: [
        { title: "BIS LIMS Portal", portal: "LIMS", url: "https://www.lims.bis.gov.in/", action_type: "lab_search" },
        { title: "Manakonline e-BIS", portal: "e-BIS", url: "https://www.manakonline.in/", action_type: "online_application" }
      ],
      limitations: []
    };
  }

  /**
   * Indexed Standards Matcher
   */
  findIndexedStandards(clean) {
    for (const std of this.standardsData) {
      // Check IS number
      const isNumClean = std.is_number.toLowerCase().replace(/[^a-z0-9]/g, '');
      const qNumClean = clean.replace(/[^a-z0-9]/g, '');
      if (qNumClean.length >= 4 && isNumClean.includes(qNumClean)) return std;

      // Check product names
      if (std.product_names) {
        for (const p of std.product_names) {
          const pClean = p.toLowerCase();
          if (clean.includes(pClean)) return std;
        }
      }
    }
    return null;
  }

  handleIndexedStandard(std, clean, clarifications, conversation_id, language) {
    const isKettleQuery = clean.includes('kettle') || std.id === 'std_001';
    const hasProvidedClarification = Object.keys(clarifications).length > 0;

    let needsClarification = false;
    let clarificationQuestions = [];

    if (isKettleQuery && !hasProvidedClarification && !clean.includes('stainless') && !clean.includes('cordless') && !clean.includes('plastic')) {
      needsClarification = true;
      clarificationQuestions = this.knowledgeBase.clarification_templates?.electric_kettle?.questions || [];
    }

    const matchedLabs = this.laboratoriesData.filter(lab => 
      lab.scopes.some(s => s.toLowerCase().includes(std.is_number.split(':')[0].toLowerCase()))
    );

    const citations = (std.clauses || []).slice(0, 3).map((cl, idx) => ({
      evidence_id: `ev_${std.id}_${idx + 1}`,
      document: `${std.title} (${std.is_number})`,
      is_number: std.is_number,
      clause: cl.clause_no,
      heading: cl.heading,
      page: cl.page,
      text: cl.text,
      test_method: cl.test_method,
      official_url: std.source_url
    }));

    let answerText = '';
    const prodTitle = std.product_names ? std.product_names[0] : std.title;

    if (language === 'ta') {
      answerText = `மகிழ்ச்சி! **${prodTitle}** தயாரிப்புக்கான முழுமையான BIS தரநிலைகள் மற்றும் வழிகாட்டுதல் இதோ:\n\n` +
        `### 1. பொருந்தக்கூடிய இந்திய தரநிலை (IS Code)\n` +
        `- **தரநிலை எண்:** \`${std.is_number}\`\n` +
        `- **தலைப்பு:** ${std.title}\n` +
        `- **சான்றிதழ் திட்டம்:** **${std.scheme}** (${std.mandatory_order})\n\n` +
        `### 2. முக்கிய தொழில்நுட்ப மற்றும் பாதுகாப்பு தேவைகள்\n` +
        std.requirements.map(r => `- **${r.name}** (${r.category}) — *பிரிவு ${r.clause}*`).join('\n') + '\n\n' +
        `### 3. கட்டாய ஆய்வக சோதனைகள் (SIT)\n` +
        std.tests.map(t => `- **${t.name}**: குறிப்பு *${t.standard_ref}* (${t.frequency})`).join('\n') + '\n\n' +
        `### 4. அங்கீகரிக்கப்பட்ட BIS ஆய்வகங்கள்\n` +
        (matchedLabs.length > 0 ? matchedLabs.slice(0, 3).map(l => `- **${l.name}** (${l.district}, ${l.state})`).join('\n') : '- BIS மத்திய மற்றும் பிராந்திய ஆய்வகங்கள்.') + '\n\n' +
        `### 5. அடுத்த கட்ட நடவடிக்கை\n` +
        `தொழிற்சாலை ஆய்வு மற்றும் உரிமம் (Grant of Licence) பெற **[Manakonline Portal](https://www.manakonline.in/)**-ல் Form-V விண்ணப்பத்தை சமர்ப்பிக்கவும்.`;
    } else if (language === 'hi') {
      answerText = `शानदार! **${prodTitle}** के लिए भारतीय मानक ब्यूरो (BIS) के नियम और परीक्षण विवरण यहाँ दिए गए हैं:\n\n` +
        `### 1. लागू भारतीय मानक (IS Code) और योजना\n` +
        `- **मानक संख्या:** \`${std.is_number}\`\n` +
        `- **शीर्षक:** ${std.title}\n` +
        `- **अनिवार्य आदेश:** **${std.scheme}** (${std.mandatory_order})\n\n` +
        `### 2. मुख्य गुणवत्ता और सुरक्षा आवश्यकताएं\n` +
        std.requirements.map(r => `- **${r.name}** (${r.category}) — *क्लॉज ${r.clause}*`).join('\n') + '\n\n' +
        `### 3. अनिवार्य प्रयोगशाला परीक्षण (SIT)\n` +
        std.tests.map(t => `- **${t.name}**: मानक संदर्भ *${t.standard_ref}* (${t.frequency})`).join('\n') + '\n\n' +
        `### 4. मान्यता प्राप्त BIS परीक्षण प्रयोगशालाएं\n` +
        (matchedLabs.length > 0 ? matchedLabs.slice(0, 3).map(l => `- **${l.name}** (${l.district}, ${l.state})`).join('\n') : '- BIS केंद्रीय और क्षेत्रीय प्रयोगशालाएं.') + '\n\n' +
        `### 5. लाइसेंस आवेदन प्रक्रिया\n` +
        `फैक्ट्री निरीक्षण और ISI मार्क के लिए आधिकारिक **[Manakonline Portal](https://www.manakonline.in/)** पर Form-V जमा करें।`;
    } else {
      answerText = `Awesome! Here is the complete, authoritative compliance and testing roadmap for **${prodTitle.toUpperCase()}**:\n\n` +
        `### 1. Applicable Indian Standard & Regulatory Mandate 📌\n` +
        `- **Standard Code:** \`${std.is_number}\`\n` +
        `- **Full Title:** ${std.title}\n` +
        `- **Certification Scheme:** **${std.scheme}**\n` +
        `- **Mandatory Regulatory Order:** ${std.mandatory_order}\n\n` +
        `### 2. Crucial Safety & Quality Parameters 🛡️\n` +
        std.requirements.map(r => `- **${r.name}** (${r.category}) — *Refer ${r.clause}*`).join('\n') + '\n\n' +
        `### 3. Prescribed Testing Matrix (Scheme of Testing & Inspection) 🧪\n` +
        `| Test Parameter | Standard Reference | Test Frequency |\n` +
        `| :--- | :--- | :--- |\n` +
        std.tests.map(t => `| **${t.name}** | ${t.standard_ref} | ${t.frequency} |`).join('\n') + '\n\n' +
        `### 4. Recognized Testing Laboratories (BIS LIMS) 🔬\n` +
        (matchedLabs.length > 0 
          ? matchedLabs.slice(0, 3).map(l => `- **${l.name}** (${l.district}, ${l.state}) — *Valid up to ${l.validity}*`).join('\n')
          : `- **BIS Central Laboratory** (Sahibabad, UP) and **BIS Southern Regional Laboratory** (Chennai, TN)`) + '\n\n' +
        `### 5. Next Steps for Grant of Licence (GoL) 🚀\n` +
        `1. Download the complete *Scheme of Inspection and Testing (SIT)* from **[Know Your Standard (KYS)](https://www.services.bis.gov.in/)**.\n` +
        `2. Ensure in-house calibrated test equipment is installed at your factory.\n` +
        `3. Submit your **Form-V Application** online at **[Manakonline](https://www.manakonline.in/)** for factory audit and licence grant.\n\n` +
        `*Would you like me to detail the factory testing equipment checklist, calculate statutory fees with 50% MSME concession, or find laboratories in your specific state?*`;
    }

    return {
      conversation_id,
      intent: "product_compliance",
      needs_clarification: needsClarification,
      clarification_questions: clarificationQuestions,
      answer: answerText,
      suggested_followups: [
        `What are the in-house testing equipment required for ${prodTitle}?`,
        `How much does the BIS licence fee cost with MSME discount?`,
        `Which testing laboratories are located in my region?`,
        `What are the step-by-step documents required on Manakonline?`
      ],
      product: {
        name: prodTitle,
        is_number: std.is_number,
        title: std.title,
        scheme: std.scheme
      },
      standards: [std],
      requirements: std.requirements,
      tests: std.tests,
      laboratories: matchedLabs,
      citations: citations,
      official_actions: [
        { title: "Apply on Manakonline", portal: "e-BIS", url: "https://www.manakonline.in/", action_type: "online_application" },
        { title: "View Standard in KYS", portal: "BIS KYS", url: std.source_url, action_type: "document_download" },
        { title: "Track in BIS LIMS", portal: "BIS LIMS", url: "https://www.lims.bis.gov.in/", action_type: "lab_search" }
      ],
      limitations: [
        "Guidance based on Bureau of Indian Standards Act 2016 and published Indian Standards."
      ]
    };
  }

  /**
   * Extended Standards Matcher (Cement, Steel, Cables, Toys, Footwear, Solar, Helmets, Gold)
   */
  findExtendedStandard(clean) {
    for (const [key, data] of Object.entries(EXTENDED_STANDARDS)) {
      if (clean.includes(key)) return { key, ...data };
      const isNumClean = data.is_number.toLowerCase().replace(/[^a-z0-9]/g, '');
      const qNumClean = clean.replace(/[^a-z0-9]/g, '');
      if (qNumClean.length >= 4 && isNumClean.includes(qNumClean)) return { key, ...data };
    }
    return null;
  }

  handleExtendedStandard(std, conversation_id, language) {
    const matchedLabs = this.laboratoriesData.slice(0, 3);
    const prodName = std.key.charAt(0).toUpperCase() + std.key.slice(1);

    const answer = `Great question! Here is the comprehensive BIS regulatory breakdown for **${prodName.toUpperCase()}** (${std.title}):\n\n` +
      `### 1. Applicable Indian Standard & Mandate 📌\n` +
      `- **Standard:** \`${std.is_number}\`\n` +
      `- **Certification Scheme:** **${std.scheme}**\n` +
      `- **Mandatory Quality Control Order (QCO):** ${std.mandatory_order}\n\n` +
      `### 2. Core Quality & Safety Specifications 🛡️\n` +
      std.key_requirements.map(r => `- ${r}`).join('\n') + '\n\n' +
      `### 3. Prescribed Testing Matrix (SIT Protocol) 🧪\n` +
      `| Mandatory Test | Clause Reference | Frequency |\n` +
      `| :--- | :--- | :--- |\n` +
      std.key_tests.map(t => `| **${t.name}** | ${t.clause} | ${t.frequency} |`).join('\n') + '\n\n' +
      `### 4. In-House Factory Laboratory Setup (SIT)\n` +
      `${std.sit_summary}\n\n` +
      `### 5. Fee & Concession Overview 💰\n` +
      `${std.fee_overview}\n\n` +
      `### 6. Official Application Steps 🚀\n` +
      `Submit your Form-V on **[Manakonline Portal](https://www.manakonline.in/)** with factory layout, machinery list, and in-house calibration records.\n\n` +
      `*Would you like to explore laboratory test charges, download the SIT guidelines, or calculate the exact fee for your production capacity?*`;

    return {
      conversation_id,
      intent: "product_compliance",
      needs_clarification: false,
      clarification_questions: [],
      answer,
      suggested_followups: [
        `What are the in-house testing equipment for ${prodName}?`,
        `How to apply for an ISI mark for ${prodName} on Manakonline?`,
        `What are the penalties for non-compliance under BIS Act 2016?`,
        `Find BIS-recognized testing laboratories near me`
      ],
      product: {
        name: prodName,
        is_number: std.is_number,
        title: std.title,
        scheme: std.scheme
      },
      standards: [{
        id: `ext_${std.key}`,
        is_number: std.is_number,
        title: std.title,
        category: std.category,
        scheme: std.scheme,
        status: "Active / Mandatory QCO",
        source_url: "https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/indian_standards/isdetails"
      }],
      requirements: std.key_requirements.map((r, i) => ({ name: r, category: "Quality Specification", mandatory: true, clause: `Clause ${i + 1}` })),
      tests: std.key_tests.map(t => ({ name: t.name, standard_ref: t.clause, frequency: t.frequency })),
      laboratories: matchedLabs,
      citations: [],
      official_actions: [
        { title: "Manakonline Application", portal: "e-BIS", url: "https://www.manakonline.in/", action_type: "online_application" },
        { title: "Know Your Standard (KYS)", portal: "BIS KYS", url: "https://www.services.bis.gov.in/", action_type: "document_download" }
      ],
      limitations: []
    };
  }

  /**
   * Procedural Topics Matcher
   */
  matchDetailedTopic(clean) {
    for (const [key, topic] of Object.entries(REGULATORY_TOPICS)) {
      for (const kw of topic.keywords) {
        if (clean.includes(kw)) return key;
      }
    }
    return null;
  }

  handleDetailedTopicResponse(topicKey, conversation_id, language) {
    const topic = REGULATORY_TOPICS[topicKey];

    return {
      conversation_id,
      intent: "regulatory_procedure",
      needs_clarification: false,
      clarification_questions: [],
      answer: topic.content,
      suggested_followups: [
        "What are the testing requirements for electric kettles?",
        "How do I apply for a license on Manakonline?",
        "What is the difference between Scheme I and Scheme II?",
        "Where can I find recognized laboratories in Chennai?"
      ],
      product: null,
      standards: [],
      requirements: [],
      tests: [],
      laboratories: [],
      citations: [],
      official_actions: [
        { title: "Manakonline (e-BIS Portal)", portal: "e-BIS", url: "https://www.manakonline.in/", action_type: "online_application" },
        { title: "Know Your Standard (KYS)", portal: "BIS KYS", url: "https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/indian_standards/isdetails", action_type: "document_download" }
      ],
      limitations: []
    };
  }

  /**
   * Dynamic Intelligent Reasoning Fallback
   */
  handleDynamicReasoning(userMessage, clean, conversation_id, language) {
    let answer = `Thank you for your question! 😊\n\n` +
      `Under the **Bureau of Indian Standards Act, 2016**, product certification and standards compliance in India are governed through structured Quality Control Orders (QCOs) and published Indian Standards (IS).\n\n` +
      `### General Compliance Procedure in India:\n` +
      `1. **Standard Identification:** Check if your product falls under **Scheme I (ISI Mark)** or **Scheme II (Compulsory Registration Scheme - CRS)**.\n` +
      `2. **In-House Testing Setup:** Procure the specific *Scheme of Inspection and Testing (SIT)* from the [Know Your Standard (KYS)](https://www.services.bis.gov.in/) portal and install calibrated equipment.\n` +
      `3. **Online Application:** Submit Form-V on **[Manakonline](https://www.manakonline.in/)** with factory incorporation and machinery details.\n` +
      `4. **Factory Audit & Sample Testing:** BIS officers inspect premises and draw independent samples for BIS-recognized laboratory testing.\n` +
      `5. **Grant of Licence (GoL):** Upon passing tests, BIS issues your CM/L number permitting official ISI marking.\n\n` +
      `💡 **Tip:** Mention the specific product name (e.g. *Electric Kettle, Packaged Water, Cement, Steel, Battery, Helmet, Toys, Footwear, Cables*) and I will give you the exact standard code, testing parameter matrix, fees, and matched laboratories!`;

    return {
      conversation_id,
      intent: "dynamic_regulatory_reasoning",
      needs_clarification: false,
      clarification_questions: [],
      answer,
      suggested_followups: [
        "Tell me about Electric Kettle (IS 302-2-15)",
        "Tell me about Packaged Drinking Water (IS 14543)",
        "Tell me about Lithium-ion Batteries (IS 16046)",
        "What are the fees with MSME 50% discount?",
        "How do I apply for an ISI mark on Manakonline?"
      ],
      product: null,
      standards: [],
      requirements: [],
      tests: [],
      laboratories: [],
      citations: [],
      official_actions: [
        { title: "Know Your Standard (KYS)", portal: "BIS KYS", url: "https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/indian_standards/isdetails", action_type: "document_download" },
        { title: "Manakonline Application", portal: "e-BIS Portal", url: "https://www.manakonline.in/", action_type: "online_application" }
      ],
      limitations: [
        "Advisory guidance based on Bureau of Indian Standards Act 2016 and published Quality Control Orders."
      ]
    };
  }

}

module.exports = BISKnowledgeEngine;
