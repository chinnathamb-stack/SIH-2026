const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'knowledgeEngine.js');

const code = `/**
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
// 2. MULTI-PROVIDER GENERATIVE AI GATEWAY (Gemini, OpenAI, Groq, Open-AI)
// =========================================================================

const CHATGPT_MASTER_SYSTEM_PROMPT = \`You are a general-purpose AI assistant designed to be helpful, harmless, and honest across a wide range of tasks and conversations.

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

**Tone:** Helpful, clear, friendly, and professional—never condescending or overly formal unless the user prefers it.\`;

async function callGenerativeAI({ prompt, history = [], systemPrompt = CHATGPT_MASTER_SYSTEM_PROMPT, customApiKey = null, customProvider = null, aiModel = null }) {
  const activeSysPrompt = systemPrompt || CHATGPT_MASTER_SYSTEM_PROMPT;

  // Provider 1: Google Gemini API
  const geminiKey = customApiKey && customProvider === 'gemini' ? customApiKey : process.env.GEMINI_API_KEY;
  if (geminiKey) {
    try {
      const modelName = aiModel && aiModel.startsWith('gemini') ? aiModel : 'gemini-1.5-flash';
      const url = \`https://generativelanguage.googleapis.com/v1beta/models/\${modelName}:generateContent?key=\${geminiKey}\`;

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
        parts: [{ text: \`\${activeSysPrompt}\\n\\nUser Question:\\n\${prompt}\` }]
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
        'Authorization': \`Bearer \${openaiKey}\`
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
        'Authorization': \`Bearer \${groqKey}\`
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

  /**
   * Evaluates if query contains general math/calculation intent
   */
  solveMathOrCalculation(query) {
    const q = query.toLowerCase().trim();

    // Check for direct arithmetic expressions: e.g. "what is 25 * 4", "calculate 120 / 5", "50 + 75"
    const mathMatch = q.match(/(?:what is|calculate|evaluate|solve|compute)?\\s*([\\d\\.\\s\\+\\-\\*\\/\\^\\(\\)\\%]+)\\s*(?:\\?|$)/i);
    if (mathMatch && mathMatch[1]) {
      const expr = mathMatch[1].trim();
      if (/[\\+\\-\\*\\/\\^\\%]/.test(expr) && /\\d/.test(expr) && !/[a-z]/i.test(expr)) {
        try {
          const sanitized = expr.replace(/\\^/g, '**');
          if (/^[\\d\\.\\s\\+\\-\\*\\/\\(\\)\\%]+$/.test(sanitized)) {
            // eslint-disable-next-line no-eval
            const result = Function(\`'use strict'; return (\${sanitized})\`)();
            if (typeof result === 'number' && !isNaN(result) && isFinite(result)) {
              return \`### 🧮 Mathematical Calculation\\n\\n**Expression:** \`\${expr}\`\\n\\n**Result:** **\${result}**\\n\\n💡 **Breakdown:**\\n- Evaluating \`\${expr}\` gives exactly **\${result}**.\\n- Let me know if you want to perform further algebraic or statistical calculations!\`;
            }
          }
        } catch (e) {
          // ignore error
        }
      }
    }

    // Square root
    const sqrtMatch = q.match(/(?:square root of|sqrt\\s*of?|√)\\s*(\\d+(?:\\.\\d+)?)/i);
    if (sqrtMatch) {
      const num = parseFloat(sqrtMatch[1]);
      const res = Math.sqrt(num);
      return \`### 📐 Square Root\\n\\n**Expression:** $\\\\sqrt{\${num}}$\\n\\n**Result:** **\${res}** (or approx. \${res.toFixed(4)})\\n\\n💡 Since \${res} × \${res} = \${num}.\`;
    }

    // Percentage: "what is 18% of 2500"
    const pctMatch = q.match(/(?:what is\\s*)?(\\d+(?:\\.\\d+)?)\\s*%\\s*of\\s*(\\d+(?:\\.\\d+)?)/i);
    if (pctMatch) {
      const pct = parseFloat(pctMatch[1]);
      const total = parseFloat(pctMatch[2]);
      const res = (pct / 100) * total;
      return \`### 📊 Percentage Calculation\\n\\n**Formula:** $\\\\frac{\${pct}}{100} \\\\times \${total}$\\n\\n**Result:** **\${res}**\\n\\n- \${pct}% of \${total} is **\${res}**.\`;
    }

    // Temperature Conversion
    const cToF = q.match(/(\\d+(?:\\.\\d+)?)\\s*(?:c|celsius|°c)\\s*(?:to|in)\\s*(?:f|fahrenheit|°f)/i);
    if (cToF) {
      const c = parseFloat(cToF[1]);
      const f = (c * 9/5) + 32;
      return \`### 🌡️ Temperature Conversion\\n\\n**\${c}°C = \${f.toFixed(2)}°F**\\n\\n**Formula:** $(\${c} \\\\times 9/5) + 32 = \${f.toFixed(2)}°F$\`;
    }

    const fToC = q.match(/(\\d+(?:\\.\\d+)?)\\s*(?:f|fahrenheit|°f)\\s*(?:to|in)\\s*(?:c|celsius|°c)/i);
    if (fToC) {
      const f = parseFloat(fToC[1]);
      const c = (f - 32) * 5/9;
      return \`### 🌡️ Temperature Conversion\\n\\n**\${f}°F = \${c.toFixed(2)}°C**\\n\\n**Formula:** $(\${f} - 32) \\\\times 5/9 = \${c.toFixed(2)}°C$\`;
    }

    if (q.includes('quadratic formula') || q.includes('solve quadratic')) {
      return \`### 📐 Quadratic Formula & Solution\\n\\nFor any quadratic equation in standard form:\\n$$ax^2 + bx + c = 0$$\\n\\nThe roots are given by:\\n$$x = \\\\frac{-b \\\\pm \\\\sqrt{b^2 - 4ac}}{2a}$$\\n\\n**Where:**\\n- $D = b^2 - 4ac$ is the **Discriminant**\\n- If $D > 0$: Two distinct real roots\\n- If $D = 0$: One repeated real root ($-\\\\frac{b}{2a}$)\\n- If $D < 0$: Two complex conjugate roots\\n\\n*Provide specific values for $a$, $b$, and $c$ to calculate the exact roots!*\`;
    }

    return null;
  }

  /**
   * General Programming & Code Generation
   */
  generateCodeOrTechResponse(query) {
    const q = query.toLowerCase();

    // Palindrome check
    if (q.includes('palindrome')) {
      return \`### 💡 Check If a String is a Palindrome

A string is a **palindrome** if it reads the same forward and backward (ignoring punctuation and letter casing).

### 1. Python Solution (Two-Pointer $O(1)$ Space)
\`\`\`python
import re

def is_palindrome(s: str) -> bool:
    # 1. Clean string: remove non-alphanumeric and convert to lowercase
    cleaned = re.sub(r'[^a-zA-Z0-9]', '', s).lower()
    
    # 2. Two-pointer check
    left, right = 0, len(cleaned) - 1
    while left < right:
        if cleaned[left] != cleaned[right]:
            return False
        left += 1
        right -= 1
    return True

# Test Cases
print(is_palindrome("A man, a plan, a canal: Panama")) # True
print(is_palindrome("race a car"))                     # False
print(is_palindrome("madam"))                          # True
\`\`\`

### 2. JavaScript Solution
\`\`\`javascript
function isPalindrome(str) {
  const clean = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  return clean === clean.split('').reverse().join('');
}

console.log(isPalindrome("radar")); // true
console.log(isPalindrome("hello")); // false
\`\`\`

**Complexity Analysis:**
- **Time Complexity:** $O(n)$ where $n$ is string length.
- **Space Complexity:** $O(1)$ auxiliary space with two-pointer.\`;
    }

    // Web Scraping Python
    if ((q.includes('scrape') || q.includes('scraper') || q.includes('web scraping')) && (q.includes('python') || q.includes('code'))) {
      return \`Here is a complete, production-ready **Python Web Scraper** using \`BeautifulSoup4\` and \`requests\`:

### Installation
\`\`\`bash
pip install requests beautifulsoup4
\`\`\`

### Complete Python Script
\`\`\`python
import requests
from bs4 import BeautifulSoup
import json

def scrape_headlines(url: str):
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    }
    
    try:
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, "html.parser")
        headlines = []
        
        for item in soup.find_all(["h1", "h2", "h3"]):
            title = item.get_text(strip=True)
            if title and len(title) > 10:
                headlines.append(title)
                
        return headlines
        
    except requests.exceptions.RequestException as e:
        print(f"Error scraping {url}: {e}")
        return []

if __name__ == "__main__":
    results = scrape_headlines("https://news.ycombinator.com")
    print(f"Found {len(results)} headlines:")
    for i, h in enumerate(results[:5], 1):
        print(f"{i}. {h}")
\`\`\`

💡 **Best Practices:**
- Always inspect \`robots.txt\` before scraping.
- Add small delays (\`time.sleep\`) between requests to avoid rate limits.\`;
    }

    // Two Sum LeetCode
    if (q.includes('two sum') || (q.includes('sum') && q.includes('target') && q.includes('array'))) {
      return \`### 💡 Two Sum Problem Solution

**Problem:** Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

### Optimal Hash Map Solution ($O(n)$ Time & $O(n)$ Space)
\`\`\`python
def two_sum(nums: list[int], target: int) -> list[int]:
    seen = {} # Maps value -> index
    
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
        
    return []

# Test Run
print(two_sum([2, 7, 11, 15], 9)) # Output: [0, 1]
print(two_sum([3, 2, 4], 6))       # Output: [1, 2]
\`\`\`\`;
    }

    // Binary Search
    if (q.includes('binary search')) {
      return \`### 🔍 Binary Search Algorithm ($O(\\\\log n)$ Time)

\`\`\`python
def binary_search(arr: list[int], target: int) -> int:
    """Returns index of target if found in sorted array, else -1."""
    low = 0
    high = len(arr) - 1
    
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
            
    return -1

# Array MUST be sorted
numbers = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
target = 23
result = binary_search(numbers, target)
print(f"Target {target} found at index: {result}") # Output: 5
\`\`\`\`;
    }

    // Sorting Algorithms (Merge Sort / Quick Sort)
    if (q.includes('merge sort') || q.includes('quick sort') || q.includes('sorting algorithm') || q.includes('sort an array')) {
      return \`### ⚡ Merge Sort Algorithm ($O(n \\\\log n)$ Time, Stable)

\`\`\`python
def merge_sort(arr: list[int]) -> list[int]:
    if len(arr) <= 1:
        return arr
        
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    return merge(left, right)

def merge(left: list[int], right: list[int]) -> list[int]:
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result

print(merge_sort([38, 27, 43, 3, 9, 82, 10]))
# Output: [3, 9, 10, 27, 38, 43, 82]
\`\`\`\`;
    }

    // Python - String reversal
    if (q.includes('reverse') && q.includes('string')) {
      return \`Here are the cleanest and most efficient ways to **reverse a string in Python**:

### 1. Using Slicing (Fastest & Most Pythonic 🚀)
\`\`\`python
def reverse_string(s: str) -> str:
    return s[::-1]

print(reverse_string("Hello World")) # "dlroW olleH"
\`\`\`

### 2. Using \`reversed()\` & \`join()\`
\`\`\`python
def reverse_string_join(s: str) -> str:
    return "".join(reversed(s))
\`\`\`\`;
    }

    // SQL queries / Joins
    if (q.includes('sql') && (q.includes('join') || q.includes('query') || q.includes('select'))) {
      return \`### 🗄️ SQL Joins Cheat Sheet & Examples

| Join Type | Description |
|---|---|
| **INNER JOIN** | Returns rows when there is a match in both tables |
| **LEFT JOIN** | Returns all rows from the left table and matched rows from right |
| **RIGHT JOIN** | Returns all rows from right table and matched rows from left |
| **FULL OUTER JOIN** | Returns all rows when there is a match in either table |

### Example SQL Query
\`\`\`sql
SELECT 
    c.customer_id,
    c.customer_name,
    COUNT(o.order_id) AS total_orders,
    COALESCE(SUM(o.amount), 0) AS total_spent
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
WHERE c.status = 'ACTIVE'
GROUP BY c.customer_id, c.customer_name
HAVING SUM(o.amount) > 1000
ORDER BY total_spent DESC;
\`\`\`\`;
    }

    return null;
  }

  /**
   * Brainstorming & Creative Projects
   */
  generateCreativeOrIdeationResponse(query) {
    const q = query.toLowerCase();

    if (q.includes('remote team') || (q.includes('app idea') && q.includes('remote')) || (q.includes('brainstorm') && q.includes('remote'))) {
      return \`Here are **3 creative app ideas designed specifically for remote & hybrid teams**:

---

### 1. ☕ "Virtual Watercooler" (Async Casual Sandbox)
- **The Problem:** Remote workers miss spontaneous, casual conversations that build team chemistry.
- **How It Works:** A 2D spatial virtual lounge or lightweight voice room where team members can drop in for a 5-minute coffee chat, play quick 30-second trivia, or share daily photo prompts.
- **Key Features:** Ambient background office sounds, mood check-ins, automatic cross-team 1-on-1 lunch pairings.
- **Monetization:** Freemium ($4/seat/month for enterprise analytics & custom integrations).

---

### 2. ⚡ "TimePulse" (Global Timezone & Energy Sync)
- **The Problem:** Scheduling across multiple global time zones leads to burnout and meeting fatigue.
- **How It Works:** A smart calendar overlay that maps not just working hours, but team members' peak focus hours and preferred asynchronous communication windows.
- **Key Features:** "Best time for async vs sync" recommendations, automatic video snippet handoffs at end-of-day.
- **Monetization:** B2B SaaS subscription with Slack & Google Workspace integration.

---

### 3. 🎯 "Handoff HQ" (Async Standup & Milestone Relay)
- **The Problem:** Daily standup meetings interrupt deep work and become repetitive status updates.
- **How It Works:** AI-powered async standup dashboard that automatically aggregates GitHub PRs, Jira tickets, and Figma updates into a 60-second morning executive summary for each team lead.
- **Key Features:** AI blocker detection, smart meeting reducer, daily team velocity recap.
- **Monetization:** $8/user/month with automated AI summary reports.

---

💡 *Would you like me to create a technical architecture, database schema, or UI wireframe for any of these ideas?*\`;
    }

    if (q.includes('startup idea') || q.includes('business idea') || q.includes('ai startup')) {
      return \`Here are **3 high-potential AI startup ideas** with market demand and monetization models:

1. **AI Legal Compliance & Contract Auditor for SMBs:**
   - Automatically scans vendor contracts, NDAs, and regulatory compliance requirements in seconds, flagging high-risk clauses.
   - *Monetization:* Tiered SaaS ($49 - $299/month).

2. **Automated Customer Onboarding Copilot:**
   - An interactive in-app guide that watches user behavior and dynamically generates customized step-by-step video tutorials and tooltips.
   - *Monetization:* Usage-based per active onboarded user.

3. **Smart Inventory & Demand Forecaster for Local Retail:**
   - Connects to POS systems and local weather/festival trends to predict exact restocking quantities, cutting food and goods waste.
   - *Monetization:* $39/store/month + revenue share on waste reduction.\`;
    }

    return null;
  }

  /**
   * Professional Writing & Drafting (Emails, Letters, Essays)
   */
  generateWritingResponse(query) {
    const q = query.toLowerCase();

    // Leave application email
    if (q.includes('leave') && (q.includes('email') || q.includes('letter') || q.includes('application') || q.includes('write'))) {
      const isSick = q.includes('sick') || q.includes('medical') || q.includes('fever') || q.includes('health');
      const isCasual = q.includes('casual') || q.includes('personal') || q.includes('vacation');
      
      return \`Here is a clean, professional **Leave Application Email** template:

---

**Subject:** Leave Application: [Your Full Name] - [Start Date] to [End Date]

Dear [Manager / Supervisor's Name],

I am writing to formally request leave from **[Start Date]** to **[End Date]** (\${isSick ? 'due to medical illness / recovery' : isCasual ? 'due to important personal commitments' : 'for personal reasons'}). I will resume work on **[Return Date]**.

**During my absence:**
- I have handed over ongoing tasks to **[Colleague's Name]** to ensure project continuity.
- All urgent deliverables for this week have been completed or scheduled.
- In case of an emergency, I will be reachable via email or phone at **[Your Mobile Number]**.

Thank you for your understanding.

Warm regards,

**[Your Full Name]**  
[Your Role / Department]  
[Your Contact Information]

---\`;
    }

    // Resignation Letter
    if (q.includes('resignation') || q.includes('resign')) {
      return \`### ✉️ Professional Resignation Letter

---

**Subject:** Formal Resignation - [Your Full Name]

Dear [Manager's Name],

Please accept this letter as formal notification that I am resigning from my position as **[Your Job Title]** at **[Company Name]**. My last working day will be **[Last Working Date]**, in accordance with my notice period.

I want to sincerely thank you and the team for the guidance, support, and rewarding experiences during my tenure here. I have appreciated the opportunity to contribute to our collective projects.

During the remaining period, I am fully committed to completing pending assignments and ensuring a smooth transition of my duties to [Colleague's Name or Team].

I wish the organization continued success in the future.

Sincerely,

**[Your Full Name]**  
[Your Phone Number / Email Address]\`;
    }

    // Cover Letter / Job application
    if (q.includes('cover letter') || (q.includes('job') && q.includes('application') && q.includes('letter'))) {
      return \`### 📄 Standard Professional Cover Letter

---

**[Your Full Name]**  
[Your Email] | [Your Phone] | [LinkedIn Profile URL]  
[Date]

**Hiring Team / [Hiring Manager's Name]**  
[Company Name]  
[Company Address / City]

**Subject:** Application for [Job Title] Role (Ref: [Job ID if any])

Dear Hiring Team,

I am writing to express my enthusiastic interest in the **[Job Title]** position at **[Company Name]**. With my background in **[Your Core Skill Area, e.g. Software Engineering / Data Analytics]** and proven experience in **[Key Strength / Achievement]**, I am eager to contribute effectively to your organization's mission.

In my previous role at **[Previous Company]**, I successfully:
- **[Key Achievement 1]:** Delivered a key initiative resulting in [X% growth / performance boost].
- **[Key Achievement 2]:** Collaborated across teams to optimize workflows and reduce turnaround time.

What excites me most about **[Company Name]** is your commitment to [Company Project / Value]. I am confident that my technical skills and proactive mindset will make me a strong asset to your team.

Thank you for your time and consideration. I look forward to discussing how my experience aligns with your goals.

Sincerely,

**[Your Full Name]**\`;
    }

    return null;
  }

  /**
   * General Knowledge, Science & Everyday Explanations
   */
  generateScienceOrGeneralResponse(query) {
    const q = query.toLowerCase();

    // Quantum Computing
    if (q.includes('quantum computing') || q.includes('quantum computer')) {
      return \`### ⚛️ What is Quantum Computing?

**Quantum Computing** is a computing paradigm that harnesses the laws of **quantum mechanics** to solve complex calculations that would take classical supercomputers thousands of years.

---

### 🔑 Core Principles
1. **Qubits (Quantum Bits):**
   - Classical computers use bits (\`0\` or \`1\`).
   - Quantum computers use **Qubits**, which can exist as \`0\`, \`1\`, or both simultaneously via **Superposition**.
2. **Quantum Entanglement:**
   - Qubits become interconnected such that the state of one instantly influences another, allowing massive computational parallelism.
3. **Quantum Interference:**
   - Used to amplify correct answers and cancel out incorrect computational paths.

---

### 🚀 Real-World Applications
- **Molecular Simulation & Medicine:** Discovering drugs and simulating chemical reactions.
- **Cryptography:** Post-quantum cryptography and quantum key distribution (QKD).
- **Logistics & Optimization:** Solving supply chain and routing challenges in seconds.\`;
    }

    // Machine Learning & AI
    if (q.includes('machine learning') || q.includes('what is ml') || q.includes('deep learning')) {
      return \`### 🧠 What is Machine Learning (ML)?

**Machine Learning** is a branch of **Artificial Intelligence (AI)** focused on building algorithms that learn from data and improve accuracy over time without being explicitly programmed for every scenario.

---

### 🔑 The 3 Core Paradigms
1. **Supervised Learning (Labeled Data):**
   - Algorithm learns on labeled pairs $(X \\rightarrow Y)$.
   - *Examples:* Linear Regression, Random Forest, Neural Networks.
   - *Use Cases:* Spam filters, disease diagnosis, price forecasting.

2. **Unsupervised Learning (Unlabeled Data):**
   - Finds hidden patterns and clustering in raw data.
   - *Examples:* K-Means Clustering, PCA.
   - *Use Cases:* Customer segmentation, anomaly detection.

3. **Reinforcement Learning (Trial & Reward):**
   - Agent takes actions in an environment to maximize cumulative reward.
   - *Examples:* Q-Learning, PPO.
   - *Use Cases:* Robotics, self-driving cars, game-playing AIs.

---

### 🚀 Standard ML Workflow
$$\\\\text{Data Collection} \\\\longrightarrow \\\\text{Preprocessing} \\\\longrightarrow \\\\text{Model Training} \\\\longrightarrow \\\\text{Evaluation} \\\\longrightarrow \\\\text{Deployment}$$\`;
    }

    // Photosynthesis
    if (q.includes('photosynthesis')) {
      return \`### 🌿 How Photosynthesis Works

**Photosynthesis** is the process by which green plants, algae, and some bacteria convert light energy into chemical energy (glucose) using water and carbon dioxide.

---

### 🧪 Chemical Formula
$$
6\\\\text{CO}_2 + 6\\\\text{H}_2\\\\text{O} + \\\\text{Light Energy} \\\\longrightarrow \\\\text{C}_6\\\\text{H}_{12}\\\\text{O}_6 + 6\\\\text{O}_2
$$
*(Carbon Dioxide + Water + Sunlight $\\\\rightarrow$ Glucose + Oxygen)*

---

### 🔬 The Two Stages
1. **Light-Dependent Reactions (Thylakoids):** Chlorophyll absorbs sunlight, splits water molecules ($H_2O$), and releases **Oxygen ($O_2$)**.
2. **Calvin Cycle (Stroma):** Uses ATP energy to convert $CO_2$ into **Glucose ($C_6H_{12}O_6$)**.\`;
    }

    // Newton's Laws
    if (q.includes('newton') && (q.includes('law') || q.includes('motion'))) {
      return \`### 🍎 Sir Isaac Newton's Three Laws of Motion

1. **First Law (Inertia):**
   > *An object remains at rest or in uniform motion unless acted upon by a net external force.*
   - *Example:* A moving car stops abruptly, causing passengers to lean forward.

2. **Second Law (Force & Acceleration):**
   > *The force applied to an object equals its mass times acceleration.*
   $$\\\\mathbf{F} = m \\\\cdot \\\\mathbf{a}$$
   - *Example:* A heavier box requires more force to accelerate at the same rate.

3. **Third Law (Action & Reaction):**
   > *For every action, there is an equal and opposite reaction.*
   - *Example:* A rocket expels burning exhaust gases downward, driving the rocket upward.\`;
    }

    return null;
  }

  /**
   * Tamil / Tanglish Conversational Handler
   */
  handleTamilOrTanglish(clean) {
    if (clean.includes('vanakkam') || clean.includes('epdi iruka') || clean.includes('eppadi irukeenga') || clean.includes('tamil') || clean.includes('nandri') || clean.includes('solu') || clean.includes('pannu')) {
      if (clean.includes('epdi iruka') || clean.includes('eppadi irukeenga')) {
        return \`வணக்கம்! நான் நலமாக இருக்கிறேன் (I am doing great!). உங்களுக்கு நான் இன்று எவ்வாறு உதவ வேண்டும்? நீங்கள் எதை வேண்டுமானாலும் கேட்கலாம் (Coding, Math, Science, Writing, or BIS Standards)!\`;
      }
      if (clean.includes('vanakkam')) {
        return \`வணக்கம்! (Vanakkam!) உங்களுக்கு நான் என்ன உதவி செய்ய வேண்டும்? கோடிங் (Coding), அறிவியல் (Science), கணக்கு (Math), அல்லது BIS தரநிலைகள் பற்றி என்னிடம் கேட்கலாம்.\`;
      }
      if (clean.includes('nandri') || clean.includes('thanks')) {
        return \`மிக்க நன்றி! (You're welcome!) உங்களுக்கு மேலும் ஏதேனும் கேள்விகள் இருந்தால் தயங்காமல் கேளுங்கள்!\`;
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
  constructor(standardsData = [], laboratoriesData = [], servicesData = [], knowledgeBase = {}) {
    this.standardsData = standardsData;
    this.laboratoriesData = laboratoriesData;
    this.servicesData = servicesData;
    this.knowledgeBase = knowledgeBase;
  }

  isBISQuery(raw, clean) {
    // Exact standard codes: IS 302, IS 14543, IS:694, IS-1786, etc.
    if (/\\bis[\\s:\\-]*\\d{2,6}\\b/i.test(raw)) return true;

    const bisKeywords = [
      'bureau of indian standards', 'indian standard', 'isi mark', 'isi certification', 'qco order', 
      'quality control order', 'hallmarking', 'huid', 'manakonline', 'manak online', 'know your standard', 
      'compulsory registration scheme', 'crs registration', 'fmcs certification', 'bis lims', 
      'bis laboratory', 'bis testing', 'grant of licence', 'grant of license', 'cm/l', 'nabl accredited', 
      'electric kettle standard', 'packaged drinking water standard', 'helmet standard', 'battery standard', 
      'cement standard', 'steel standard', 'toys standard', 'footwear standard', 'solar panel standard', 
      'cables standard', 'eco mark scheme'
    ];

    if (bisKeywords.some(kw => raw.includes(kw) || clean.includes(kw))) return true;

    // Single words specific to BIS
    const bisSingleWords = ['bis', 'isi', 'qco', 'huid', 'manakonline', 'fmcs'];
    const words = clean.split(/\\s+/);
    if (bisSingleWords.some(w => words.includes(w))) return true;

    return false;
  }

  /**
   * Process any user query (Universal ChatGPT Intelligence + BIS Domain Expertise)
   */
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

      const topicKey = this.matchDetailedTopic(cleanQ);
      if (topicKey) {
        const topRes = this.handleDetailedTopicResponse(topicKey, conversation_id, language);
        return await this.localizeResponse(topRes, language);
      }
    }

    // 6. Try Live Generative AI Providers (Gemini, OpenAI, Groq)
    const activeSystemPrompt = (ai_mode === 'bis') ? 
      \`You are an authoritative Bureau of Indian Standards (BIS) Specialist. Provide accurate, clause-grounded Indian Standards (IS), QCO regulatory orders, mandatory testing procedures, and lab audit guidance. Use clear markdown formatting. Language: \${language}.\` :
      \`\${CHATGPT_MASTER_SYSTEM_PROMPT}\\n\\nLanguage: \${language}.\`;

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
    // A. Ideation / Creative / Brainstorming
    const creativeAns = universalBrain.generateCreativeOrIdeationResponse(rawMsg);
    if (creativeAns) {
      return await this.localizeResponse({
        conversation_id,
        intent: "creative_ideation",
        answer: creativeAns,
        suggested_followups: ["Give me more details on Idea #1", "How do I monetize this?", "Create a tech architecture"]
      }, language);
    }

    // B. Mathematics & Calculations
    const mathAns = universalBrain.solveMathOrCalculation(rawMsg);
    if (mathAns) {
      return await this.localizeResponse({
        conversation_id,
        intent: "mathematics_calculation",
        answer: mathAns,
        suggested_followups: ["Explain the formula used", "Solve another calculation", "Show alternative method"]
      }, language);
    }

    // C. Programming & Tech
    const codeAns = universalBrain.generateCodeOrTechResponse(rawMsg);
    if (codeAns) {
      return await this.localizeResponse({
        conversation_id,
        intent: "programming_tech",
        answer: codeAns,
        suggested_followups: ["Can you explain line by line?", "How do I optimize this?", "Rewrite in another language"]
      }, language);
    }

    // D. Writing & Drafting
    const writingAns = universalBrain.generateWritingResponse(rawMsg);
    if (writingAns) {
      return await this.localizeResponse({
        conversation_id,
        intent: "writing_drafting",
        answer: writingAns,
        suggested_followups: ["Make it more formal", "Make it shorter", "Add more specific points"]
      }, language);
    }

    // E. Science & General Concepts
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
      const answer = \`### 🇮🇳 Bureau of Indian Standards (BIS) Guidance\\n\\n\` +
        \`Thank you for your question regarding **Indian Standards & Quality Compliance**!\\n\\n\` +
        \`Under the **Bureau of Indian Standards Act, 2016**, product certification in India is governed through structured Quality Control Orders (QCOs) and published Indian Standards (IS).\\n\\n\` +
        \`### Key Steps for BIS Compliance in India:\\n\` +
        \`1. **Standard Identification:** Ascertain if product falls under **Scheme I (ISI Mark)** or **Scheme II (Compulsory Registration - CRS)**.\\n\` +
        \`2. **In-House Testing Setup:** Procure the *Scheme of Inspection & Testing (SIT)* from the [Know Your Standard (KYS)](https://www.services.bis.gov.in/) portal.\\n\` +
        \`3. **Online Application:** Submit Form-V on **[Manakonline](https://www.manakonline.in/)** with factory & test machinery details.\\n\` +
        \`4. **Independent Lab Audit:** BIS officers inspect premises and test samples at recognized BIS/NABL laboratories.\\n\` +
        \`5. **Grant of Licence (GoL):** BIS issues your CM/L number permitting official ISI marking.\\n\\n\` +
        \`💡 *Mention any specific product (e.g., Electric Kettle, Water, Steel, Cement, Toys, Helmet, Cables) for exact clause specifications, fees, and test parameters!*\`;

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

    const answer = \`Here is a helpful, structured overview regarding **\${userMessage}**:

1. **Direct Answer:** Depending on your goal, the most effective approach is to break this down into clear actionable steps and verify each part.
2. **Key Concepts:** Focus on core principles, practical implementation, and testing edge cases.
3. **Next Steps:** If you would like me to write specific code, draft a document, solve a formula, or explain any sub-topic in detail, let me know!\`;

    return {
      conversation_id,
      intent: "chatgpt_conversational_reasoning",
      answer,
      suggested_followups: [
        "Can you write a code example for this?",
        "Can you explain step-by-step in simpler terms?",
        "What are the best practices and common pitfalls?",
        "Draft a formal summary or documentation"
      ]
    };
  }

  isPureGreeting(clean) {
    const greetings = ['hi', 'hello', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening', 'namaste', 'vanakkam'];
    return greetings.includes(clean);
  }

  handleGreeting(conversation_id, language) {
    return {
      conversation_id,
      intent: "greeting",
      answer: "Hello! 👋 I am your AI assistant. How can I help you today? You can ask me to write code, solve math, brainstorm ideas, draft emails, or ask about BIS Indian Standards.",
      suggested_followups: [
        "Write a Python script",
        "Explain Quantum Computing",
        "Draft a 1-day leave email",
        "Electric Kettle (IS 302-2-15) requirements"
      ]
    };
  }

  handleCasualChat(clean, conversation_id, language) {
    if (clean.includes('who are you') || clean.includes('what are you')) {
      return {
        conversation_id,
        intent: "general_inquiry",
        answer: "I am a general-purpose AI assistant designed to help with coding, writing, research, analysis, learning, and official Bureau of Indian Standards (BIS) compliance!",
        suggested_followups: ["What topics can you help with?", "Write a Python script", "Explain Machine Learning"]
      };
    }
    if (clean.includes('thank you') || clean.includes('thanks')) {
      return {
        conversation_id,
        intent: "general_inquiry",
        answer: "You're very welcome! 😊 Feel free to ask if you need anything else.",
        suggested_followups: ["Ask another question", "Explain something else"]
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
      answer: "### 🔬 BIS Recognized Testing Laboratories\\n\\nBIS operates Central & Regional Laboratories across India (CL Sahibabad, NRO Mohali, WRO Mumbai, SRO Chennai, ERO Kolkata) and recognizes NABL-accredited private laboratories for product conformity testing.",
      laboratories: this.laboratoriesData.slice(0, 4),
      suggested_followups: ["Search lab by product name", "How to submit samples for testing", "In-house lab requirements"]
    };
  }

  findIndexedStandards(clean) {
    return this.standardsData.find(s => clean.includes(s.is_number.toLowerCase().replace(/[^a-z0-9]/g, '')) || clean.includes(s.product_name.toLowerCase()));
  }

  handleIndexedStandard(standard, clean, clarifications, conversation_id, language) {
    return {
      conversation_id,
      intent: "product_compliance",
      answer: \`### 🇮🇳 Standard: **\${standard.is_number}** - \${standard.title}\\n\\n**Applicable Product:** \${standard.product_name}\\n**Certification Scheme:** \${standard.scheme}\\n**Mandatory Order:** \${standard.mandatory ? 'Yes (QCO Enforced)' : 'Voluntary'}\\n\\n#### Key Testing Clauses:\\n- Electrical & Safety compliance under official BIS clauses.\\n- Sample submission and factory audit guidelines.\`,
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
    let testTable = '| Test Parameter | Clause | Acceptance Limit |\\n|---|---|---|\\n';
    std.test_parameters.forEach(t => {
      testTable += \`| **\${t.name}** | \${t.clause} | \${t.limit} |\\n\`;
    });

    const answer = \`### 🇮🇳 Official Standard: **\${std.is_number}**\\n\\n**Title:** \${std.title}\\n\\n**Certification Scheme:** \${std.scheme} (\${std.mandatory ? 'Mandatory under ' + std.qco_order : 'Voluntary'})\\n\\n### 🔬 Key Technical Testing Parameters\\n\${testTable}\\n\\n**Sample Size for Testing:** \${std.sample_size}\\n\\n**Fee Structure:** \${std.fee_overview}\`;

    return {
      conversation_id,
      intent: "product_compliance",
      answer,
      standards: [std],
      suggested_followups: ["Where can I test this product?", "How to submit application on Manakonline?", "What in-house testing equipment is required?"]
    };
  }

  matchDetailedTopic(clean) {
    return null;
  }

  handleDetailedTopicResponse(topicKey, conversation_id, language) {
    return null;
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
    const url = \`https://translate.googleapis.com/translate_a/single?client=gtx&sl=\${encodeURIComponent(sourceLang)}&tl=\${encodeURIComponent(targetLang)}&dt=t&q=\${encodeURIComponent(text.trim())}\`;

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
}

module.exports = BISKnowledgeEngine;
`;

fs.writeFileSync(targetPath, code, 'utf8');
console.log('✅ knowledgeEngine.js has been completely rebuilt with Master ChatGPT Intelligence & BIS Grounding!');
