/**
 * BIS AI Intelligent Assistant - Comprehensive Knowledge & Conversational Reasoning Engine
 * SIH Problem Statement 26107
 * 
 * Delivers warm, engaging, ChatGPT-style conversational intelligence grounded in:
 * - Bureau of Indian Standards Act, 2016
 * - Indian Standards (IS Codes), Scheme I (ISI Mark), Scheme II (CRS), FMCS, Hallmarking
 * - Scheme of Testing and Inspection (SIT)
 * - Quality Control Orders (QCOs)
 * - NABL / BIS LIMS testing laboratories
 * - Manakonline e-BIS licensing portals
 * - Trilingual localization (English, Tamil, Hindi)
 * - Multi-turn conversation context memory
 */

const https = require('https');

// =========================================================================
// 1. EXTENDED STANDARDS KNOWLEDGE REPOSITORY
// =========================================================================
const EXTENDED_STANDARDS = {
  "cement": {
    is_number: "IS 1489 (Part 1): 2015 / IS 269: 2015",
    title: "Portland Pozzolana Cement (PPC) & Ordinary Portland Cement (OPC 33/43/53)",
    category: "Civil Engineering & Construction Materials",
    scheme: "Scheme I (ISI Mark Certification)",
    mandatory_order: "Cement (Quality Control) Order - 100% Mandatory for manufacture, sale, and import in India",
    key_requirements: [
      "Compressive Strength at 3, 7, and 28 days meeting grade limits (e.g. Min 53 MPa for OPC 53)",
      "Initial setting time (Not less than 30 mins) & Final setting time (Not more than 600 mins)",
      "Fineness by specific surface (Blaine's air permeability method >= 300 m²/kg for PPC)",
      "Soundness by Le-Chatelier expansion (Max 10mm) and Autoclave expansion (Max 0.8%)",
      "Chemical limits on insoluble residue, magnesia (Max 6.0%), and total loss on ignition"
    ],
    key_tests: [
      { name: "Compressive Strength Test", clause: "IS 4031 (Part 6)", frequency: "Every 50 MT Batch" },
      { name: "Setting Time & Consistency", clause: "IS 4031 (Part 5)", frequency: "Daily Production" },
      { name: "Soundness (Le-Chatelier / Autoclave)", clause: "IS 4031 (Part 3)", frequency: "Every 100 MT Batch" },
      { name: "Fineness by Blaine Air Permeability", clause: "IS 4031 (Part 2)", frequency: "Hourly Routine Control" }
    ],
    sit_summary: "Physical test laboratory with compressive testing machine (CTM), Le-Chatelier water bath, Blaine apparatus, vicat needle apparatus, and analytical chemical testing lab.",
    fee_overview: "Application Fee: ₹1,000 | Inspection Charges: ₹7,000/man-day | Annual Marking Fee: approx ₹38,000 to ₹1,20,000 depending on volume (50% concession for registered MSMEs)."
  },
  "steel": {
    is_number: "IS 1786: 2008 / IS 2062: 2011",
    title: "High Strength Deformed Steel Bars (TMT Fe 415/500/550D) & Structural Steel",
    category: "Metallurgical Engineering & Structural Steel",
    scheme: "Scheme I (ISI Mark Certification)",
    mandatory_order: "Steel and Steel Products (Quality Control) Order - Mandatory under Ministry of Steel",
    key_requirements: [
      "0.2% Proof Stress / Yield Stress (Min 500 N/mm² for Fe 500, Min 550 N/mm² for Fe 550D)",
      "Tensile Strength and TS/YS Ratio (Min 1.10 / 1.12 for seismic grade 'D')",
      "Total Elongation at fracture and uniform elongation at maximum force (Min 16% for Fe 500D)",
      "Bend and Re-bend test without rupture or visible cracking at mandrel diameter",
      "Chemical composition limits on Carbon (Max 0.25%), Sulphur (Max 0.040%), Phosphorus (Max 0.040%), and Carbon Equivalent"
    ],
    key_tests: [
      { name: "Tensile, Yield & Elongation Test", clause: "IS 1608 / IS 1786 Cl. 8", frequency: "Every Cast / Heat Batch" },
      { name: "Bend and Re-bend Test", clause: "IS 1599 / IS 1786 Cl. 9", frequency: "Every Cast / Heat Batch" },
      { name: "Chemical Spectrometric Analysis", clause: "IS 228 / Cl. 4", frequency: "Every Molten Ladle" },
      { name: "Nominal Mass & Cross-Sectional Area", clause: "IS 1786 Cl. 6", frequency: "Every 100 Metres" }
    ],
    sit_summary: "In-house Universal Testing Machine (UTM >= 100 Tonne calibrated), optical emission spectrometer (OES), bend test fixtures, weighing balance.",
    fee_overview: "Application Fee: ₹1,000 | Annual Marking Fee: based on tonnage produced (50% discount for MSMEs/Startups)."
  },
  "cables": {
    is_number: "IS 694: 2010 / IS 7098 (Part 1): 1988",
    title: "PVC Insulated Cables for Working Voltages up to 1100 V & XLPE Insulated Power Cables",
    category: "Electrotechnical & Power Transmission",
    scheme: "Scheme I (ISI Mark Certification)",
    mandatory_order: "Electrical Wires and Cables (Quality Control) Order",
    key_requirements: [
      "Conductor resistance at 20°C conforming to IS 8130 (High conductivity annealed copper / aluminum)",
      "Insulation resistance and spark testing during extrusion (No puncture under high voltage)",
      "High voltage water immersion test at 3 kV AC for 5 minutes without breakdown",
      "Tensile strength and percentage elongation of PVC insulation before and after thermal ageing",
      "Oxygen index (> 29%) and smoke density rating for FRLS (Flame Retardant Low Smoke) variants"
    ],
    key_tests: [
      { name: "Conductor Resistance Test", clause: "IS 10810 (Part 5)", frequency: "Every Extruded Drum" },
      { name: "Spark Test on Insulation", clause: "IS 10810 (Part 44)", frequency: "100% Continuous Line" },
      { name: "High Voltage AC Withstand Test", clause: "IS 10810 (Part 45)", frequency: "Every Finished Coil / Drum" },
      { name: "Flammability & Flammability Index", clause: "IS 10810 (Part 53)", frequency: "Periodic Batch Test" }
    ],
    sit_summary: "Kelvin double bridge / digital micro-ohmmeter, spark tester on extrusion line, high voltage test set (up to 10 kV), tensile testing machine with hot air ageing oven.",
    fee_overview: "Application Fee: ₹1,000 | Inspection Charges: ₹7,000 | Marking Fee: approx ₹45,000/year (50% MSME concession)."
  },
  "toys": {
    is_number: "IS 9873 (Parts 1 to 9) / IS 15644: 2006",
    title: "Safety of Toys (Mechanical, Physical, Flammability, Heavy Metal Migration & Electric Toys)",
    category: "Consumer Products & Child Safety",
    scheme: "Scheme I (ISI Mark Certification)",
    mandatory_order: "Toys (Quality Control) Order - Mandatory ISI mark for domestic manufacturers and foreign exporters",
    key_requirements: [
      "Part 1: Mechanical and physical safety (No sharp edges, choke hazards, small parts for under 36 months, drop impact)",
      "Part 2: Flammability limits (No rapid surface flash, burn rate < 30 mm/s)",
      "Part 3: Migration of 8 toxic heavy metals (Antimony, Arsenic, Barium, Cadmium, Chromium, Lead, Mercury, Selenium)",
      "IS 15644: Safety of electric toys (Low voltage operation < 24V, no overheating, battery enclosure safety)"
    ],
    key_tests: [
      { name: "Drop, Torque & Tension Tests", clause: "IS 9873 (Part 1) Cl. 5", frequency: "Every Production Lot" },
      { name: "Sharp Edge & Point Test", clause: "IS 9873 (Part 1) Cl. 5.8", frequency: "Routine QC Sampling" },
      { name: "Flammability Assessment", clause: "IS 9873 (Part 2) Cl. 4", frequency: "Weekly Batch Sample" },
      { name: "Heavy Metals Migration ICP-OES", clause: "IS 9873 (Part 3) Cl. 7", frequency: "Raw Material Inward" }
    ],
    sit_summary: "Drop test apparatus, sharp point/edge testers, small parts test cylinder, tension/compression gauges, flammability test chamber.",
    fee_overview: "Application Fee: ₹1,000 | MSME Concessions: 50% discount on marking and application fees for micro/small enterprises."
  },
  "footwear": {
    is_number: "IS 15844: 2010 / IS 17043: 2018 / IS 6721: 1972",
    title: "Sports Footwear, Leather Safety Footwear & PVC Moulded Boots",
    category: "Textiles & Leather Safety Goods",
    scheme: "Scheme I (ISI Mark Certification)",
    mandatory_order: "Footwear Made from Leather and Other Materials (Quality Control) Order",
    key_requirements: [
      "Upper material tensile strength, tear strength, and water vapor permeability",
      "Outsole abrasion resistance (Max volume loss 250 mm³) and flexing resistance (30,000 flexes without crack growth)",
      "Upper-to-sole adhesion / bond peel strength (Min 3.0 N/mm)",
      "For Safety Shoes: Steel toe cap impact resistance (200 Joules) and compression resistance (15 kN)"
    ],
    key_tests: [
      { name: "Sole Adhesion / Peel Strength", clause: "IS 15844 Cl. 4.2", frequency: "Every 500 Pairs" },
      { name: "Bennewart Sole Flexing Test", clause: "IS 15844 Cl. 4.5", frequency: "Weekly Batch" },
      { name: "Toe Cap Impact 200J (Safety Shoes)", clause: "IS 15298 (Part 2)", frequency: "Batch Qualification" },
      { name: "DIN Abrasion Resistance", clause: "IS 3400 (Part 3)", frequency: "Raw Sole Batch" }
    ],
    sit_summary: "Universal tensile peel tester, DIN abrasion tester, Bennewart flex machine, thickness gauges, impact tester for safety footwear.",
    fee_overview: "50% fee concession for Micro & Small Enterprises under DPIIT/MSME Udyam scheme."
  },
  "solar": {
    is_number: "IS 14286 / IS/IEC 61215: 2016 / IS/IEC 61730 (Parts 1 & 2)",
    title: "Terrestrial Photovoltaic (PV) Modules & Solar Inverters / Power Converters",
    category: "Renewable Energy & Solar Electrotechnical",
    scheme: "Scheme II (Compulsory Registration Scheme - CRS) / Scheme I",
    mandatory_order: "Solar Photovoltaics, Systems, Devices and Components Goods (Requirements for Compulsory Registration) Order under MNRE",
    key_requirements: [
      "Visual inspection, maximum power determination (STC output verification)",
      "Insulation test and wet leakage current test (Insulation resistance > 40 MΩ·m²)",
      "Thermal cycling (200 cycles from -40°C to +85°C) & Damp heat test (1000 hrs at 85°C/85% RH)",
      "Mechanical load test (2400 Pa wind / 5400 Pa snow load) and hail impact test"
    ],
    key_tests: [
      { name: "Wet Leakage Current Test", clause: "IS 14286 Cl. 10.15", frequency: "Third-party Lab Certification" },
      { name: "Thermal Cycling & Damp Heat", clause: "IS 14286 Cl. 10.11", frequency: "Type Approval Testing" },
      { name: "Hail Impact Test (25mm ice ball)", clause: "IS 14286 Cl. 10.17", frequency: "Type Qualification" }
    ],
    sit_summary: "Solar flash simulator (Class AAA), high voltage insulation tester, electroluminescence (EL) crack detection camera.",
    fee_overview: "CRS Registration Fee: ₹10,000 per model series | BIS Lab Testing Fee: based on module rating."
  },
  "helmets": {
    is_number: "IS 4151: 2020",
    title: "Protective Helmets for Two-Wheeler Riders",
    category: "Mechanical & Road Safety Equipment",
    scheme: "Scheme I (ISI Mark Certification)",
    mandatory_order: "Two-Wheeler Helmets (Quality Control) Order - MoRTH / DPIIT Mandate",
    key_requirements: [
      "Maximum total weight of helmet capped at 1.2 kg (1200 grams) to avoid cervical strain",
      "Impact absorption test (Headform peak acceleration must NOT exceed 300g)",
      "Dynamic retention system (chin strap stretch must not exceed 25mm under 1 kN dynamic load)",
      "Visor optical and mechanical performance conforming to IS 9973 (Min 85% luminous transmittance, scratch & shatter resistant)",
      "Rigidity test across lateral axis (Deformation must not exceed 40mm)"
    ],
    key_tests: [
      { name: "Impact Absorption Headform Drop", clause: "IS 4151 Cl. 9.1", frequency: "Every 200 Helmets" },
      { name: "Dynamic Retention System Test", clause: "IS 4151 Cl. 9.2", frequency: "Every 200 Helmets" },
      { name: "Visor Luminous Transmittance & Optical Clarity", clause: "IS 4151 Cl. 9.3", frequency: "Every Batch of Visors" },
      { name: "Rigidity and Penetration Resistance", clause: "IS 4151 Cl. 9.4", frequency: "Periodic Sampling" }
    ],
    sit_summary: "Headform impact drop tower with tri-axial accelerometer, dynamic retention test rig, conditioning chambers (-10°C, +50°C, and water immersion).",
    fee_overview: "Application Fee: ₹1,000 | Annual Marking Fee: approx ₹40,000 | 50% concession for MSMEs."
  },
  "gold": {
    is_number: "IS 1417: 2019 / IS 15820: 2009",
    title: "Gold and Gold Alloys, Jewellery/Artefacts — Fineness and Marking (Hallmarking)",
    category: "Precious Metals & Hallmarking",
    scheme: "Hallmarking Scheme (AHC Recognized Centres)",
    mandatory_order: "Hallmarking of Gold Jewellery and Gold Artefacts Order under Consumer Affairs Ministry",
    key_requirements: [
      "Mandatory 3 Marks on genuine hallmarked jewellery: (1) BIS Logo, (2) Purity in Karat & Fineness (e.g., 22K916, 18K750, 14K585), (3) 6-digit alphanumeric HUID (Hallmark Unique Identification)",
      "Assaying by Fire Assay method (X-ray Fluorescence XRF for non-destructive screening, cupellation for confirmation)",
      "Mandatory jeweller registration on Manakonline with zero registration fee for micro enterprises"
    ],
    key_tests: [
      { name: "Fire Assay (Cupellation) Test", clause: "IS 1417 Annex A", frequency: "Every Hallmarking Batch" },
      { name: "X-Ray Fluorescence (XRF) Screening", clause: "IS 1417 Cl. 6", frequency: "100% Inward Pieces" },
      { name: "Laser Inscription of 6-digit HUID", clause: "IS 15820 Cl. 7", frequency: "Every Certified Piece" }
    ],
    sit_summary: "Assaying and Hallmarking Centre (AHC) setup with high-precision micro-balance (0.001 mg), cupellation furnace (1100°C), parting acid bath, and Nd:YAG laser marker.",
    fee_overview: "Jeweller Registration: ₹0 for turnover up to ₹5 Cr | Hallmarking Charge: ₹45 + GST per gold article paid to AHC."
  }
};

// =========================================================================
// 2. PROCEDURAL & REGULATORY TOPICS
// =========================================================================
const REGULATORY_TOPICS = {
  "fees": {
    keywords: ["fee", "cost", "charge", "pricing", "how much", "renewal fee", "marking fee", "concession", "msme discount", "payment", "statutory fee"],
    title: "BIS Application, Inspection & Marking Fee Structure",
    content: `Here is the official **BIS Fee Structure & MSME Concession Matrix** under Scheme I (ISI Mark) and Scheme II (CRS):\n\n` +
      `### 1. Scheme I (ISI Mark) Statutory Fee Breakdown\n` +
      `| Fee Component | Large Enterprise | Micro / Small MSME (50% Concession) | Women Entrepreneurs / Startups |\n` +
      `| :--- | :--- | :--- | :--- |\n` +
      `| **Application Fee (Form-V)** | ₹1,000 | ₹500 (50% off) | ₹500 (50% off) |\n` +
      `| **Preliminary Factory Audit** | ₹7,000 / man-day | ₹3,500 / man-day | ₹3,500 / man-day |\n` +
      `| **Sample Testing Charges** | Actual Lab Rate | Actual Lab Rate | Actual Lab Rate |\n` +
      `| **Annual Licence Fee** | ₹1,000 / year | ₹500 / year | ₹500 / year |\n` +
      `| **Minimum Marking Fee** | Specific to Product | **50% Discount** | **50% Discount** |\n\n` +
      `### 2. Scheme II (CRS - Electronics & IT)\n` +
      `- **Application Processing Fee:** ₹10,000 per base model series.\n` +
      `- **Renewal Fee:** ₹10,000 for 2 years validity.\n` +
      `- **Lab Testing:** Paid directly to BIS-recognized test laboratory (e.g. UL, ERTL, TUV, SRL).\n\n` +
      `💡 **Special Benefits for Indian MSMEs & Startups:**\n` +
      `- 50% concession on application fee, audit charges, and annual minimum marking fee for **Udyam-registered Micro & Small enterprises**.\n` +
      `- Additional 10% fee reduction for manufacturers holding ZED (Zero Defect Zero Effect) Gold/Platinum certification.\n\n` +
      `🔗 **Portal:** Calculate and pay directly on **[Manakonline Fee Portal](https://www.manakonline.in/)**.`
  },
  "schemes_difference": {
    keywords: ["difference between isi and crs", "isi vs crs", "scheme 1 vs scheme 2", "types of schemes", "certification schemes", "scheme i", "scheme ii", "fmcs"],
    title: "Comparison of BIS Certification Schemes (Scheme I vs Scheme II vs FMCS)",
    content: `Here is the comprehensive comparison of the main **BIS Certification Schemes** operating in India:\n\n` +
      `| Feature / Parameter | Scheme I (ISI Mark) | Scheme II (CRS Registration) | Scheme X / FMCS (Foreign) |\n` +
      `| :--- | :--- | :--- | :--- |\n` +
      `| **Governing Regulation** | Scheme I of BIS Conformity Reg. 2018 | Scheme II of BIS Conformity Reg. 2018 | Foreign Manufacturers Certification Scheme |\n` +
      `| **Applicable Products** | Electrical appliances, Cement, Steel, Water, Helmets, Toys, Chemicals | Electronics, IT Goods, Laptops, Mobile, Li-ion Batteries, Solar | All products manufactured outside India for import into India |\n` +
      `| **Factory Audit Required?** | **YES** (Mandatory preliminary inspection) | **NO** (Self-declaration based on 3rd party lab test) | **YES** (Physical overseas audit by BIS officers) |\n` +
      `| **In-house Test Lab (SIT)** | **Mandatory** setup at manufacturing premises | Recommended but not audited physically | **Mandatory** at foreign facility |\n` +
      `| **Marking on Product** | Standard **ISI Monogram + CM/L-XXXXXXXXX** | Standard **CRS Border + R-XXXXXXXX** | Standard **ISI Mark + CM/L Number** |\n` +
      `| **Validity Period** | 1 to 2 Years (Renewable up to 5 yrs) | 2 Years (Renewable up to 5 yrs) | 1 to 2 Years |\n` +
      `| **Processing Timeline** | 30 to 60 Days (Simplified Procedure) | 15 to 25 Days | 3 to 6 Months |`
  },
  "manakonline_steps": {
    keywords: ["how to apply", "application procedure", "step by step", "registration process", "manakonline", "form 5", "form v", "form 1", "documents required"],
    title: "Step-by-Step Procedure to Apply for BIS Licence on Manakonline",
    content: `Here is the complete **Step-by-Step Roadmap** to register and obtain a BIS Licence (CM/L or CRS R-Number) through **[Manakonline](https://www.manakonline.in/)**:\n\n` +
      `### Phase 1: Preparation & Factory Readiness (Days 1–10)\n` +
      `1. **Procure Standard & SIT:** Download the specific Indian Standard and *Scheme of Inspection and Testing (SIT)* from the [Know Your Standard (KYS)](https://www.services.bis.gov.in/) portal.\n` +
      `2. **Establish In-House Lab:** Install calibrated testing equipment listed in the SIT. Ensure valid calibration certificates traceable to NABL/NPL.\n` +
      `3. **Employ Qualified QC Personnel:** Appoint a certified quality control engineer/technician.\n\n` +
      `### Phase 2: Online Application Submission (Day 11–15)\n` +
      `1. Register on **[www.manakonline.in](https://www.manakonline.in/)** under *Conformity Assessment Portal (e-BIS)*.\n` +
      `2. Fill **Form-V** (for ISI Scheme I) or **Form-I** (for CRS Scheme II).\n` +
      `3. **Upload Mandatory Documents:**\n` +
      `   - Factory incorporation & address proof (MSME Udyam / GST / Factory Licence)\n` +
      `   - Process Flow Chart & Machinery List with installed capacity\n` +
      `   - In-house Testing Equipment List with Calibration Certificates\n` +
      `   - Raw Material Test Certificates & Source Agreements\n` +
      `   - Brand Name / Trademark Registration or Authorization letter\n` +
      `4. Pay statutory application fees online.\n\n` +
      `### Phase 3: Factory Inspection & Sample Testing (Days 16–35)\n` +
      `1. A BIS Inspecting Officer visits your manufacturing premises to verify infrastructure, quality controls, and in-house testing.\n` +
      `2. Officer draws production samples, seals them, and dispatches to a recognized BIS Regional Lab (LIMS).\n\n` +
      `### Phase 4: Grant of Licence (GoL) (Days 36–45)\n` +
      `Upon receiving satisfactory independent test reports, BIS issues your **Certificate of Licence (CM/L-XXXXXXXXX)** permitting official use of the standard ISI Mark.`
  },
  "penalties": {
    keywords: ["penalty", "fine", "imprisonment", "illegal", "punishment", "fake isi", "misuse", "section 29", "bis act 2016", "violation"],
    title: "Legal Provisions, Offences & Penalties under the BIS Act, 2016",
    content: `Under the **Bureau of Indian Standards Act, 2016 (Section 29 & Section 30)**, manufacturing, storing, or selling goods notified under mandatory Quality Control Orders (QCOs) without a valid BIS license is a **cognizable criminal offence**.\n\n` +
      `### Statutory Penalties for Non-Compliance:\n` +
      `1. **Imprisonment:** Up to **2 years** imprisonment for the first offence, extendable up to 5 years for repeat offences.\n` +
      `2. **Monetary Fines:**\n` +
      `   - Minimum fine of **₹2,00,000** for the first contravention.\n` +
      `   - Fine can extend up to **10 times the total value** of manufactured or sold goods.\n` +
      `   - For second or subsequent convictions: Minimum fine of **₹5,00,000**.\n` +
      `3. **Seizure & Confiscation:** Enforcement officers have statutory authority to raid premises, seize entire inventories of substandard/counterfeit goods, and seal premises.\n` +
      `4. **Public Warning & Blacklisting:** Publication of violator details on official BIS consumer advisories.\n\n` +
      `🛡️ **Consumer Tip:** Always verify 7/8-digit CM/L numbers or 6-digit Gold HUIDs using the official **BIS CARE Mobile App**.`
  }
};

// =========================================================================
// 3. OPTIONAL GEMINI GENERATIVE AI CLIENT
// =========================================================================
async function callGeminiGenerativeAI(prompt, systemContext) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const requestBody = JSON.stringify({
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `${systemContext}\n\nUSER QUESTION: ${prompt}\n\nPlease provide a warm, conversational, friendly, and structured response grounded in Indian Standards.`
          }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.3,
      maxOutputTokens: 1024,
      topP: 0.95
    }
  });

  return new Promise((resolve) => {
    const req = https.request(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(requestBody)
      },
      timeout: 10000
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            const parsed = JSON.parse(data);
            const text = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
            resolve(text || null);
          } else {
            resolve(null);
          }
        } catch (e) {
          resolve(null);
        }
      });
    });

    req.on('error', () => resolve(null));
    req.on('timeout', () => {
      req.destroy();
      resolve(null);
    });

    req.write(requestBody);
    req.end();
  });
}

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

  /**
   * Process any user query dynamically and return a warm, context-aware,
   * logically reasoned response.
   */
  async processQuery({ message, conversation_id, clarifications = {}, language = 'en', history = [] }) {
    const q = message.toLowerCase().trim();
    let cleanQ = q.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, ' ').replace(/\s+/g, ' ').trim();

    // 1. Contextual Query Resolution (Multi-Turn History)
    cleanQ = this.extractContextualQuery(cleanQ, history);

    let result = null;

    // 2. Pure Greetings & Friendly Interaction (ChatGPT style)
    if (this.isPureGreeting(cleanQ)) {
      result = this.handleGreeting(conversation_id, language);
      return result; // Already natively localized
    }

    // 3. Casual Chit-Chat, Appreciation & Empathetic Dialogue
    if (!result) {
      result = this.handleCasualChat(cleanQ, conversation_id, language);
    }

    // 4. Check for Lab Search Intent (e.g. "where to test in Chennai", "BIS labs in Mumbai")
    if (!result && this.isLabSearchQuery(cleanQ)) {
      result = this.handleLabSearch(cleanQ, conversation_id, language);
    }

    // 5. Match Specific Product in Indexed Local standards.json
    if (!result) {
      const matchedIndexed = this.findIndexedStandards(cleanQ);
      if (matchedIndexed) {
        result = this.handleIndexedStandard(matchedIndexed, cleanQ, clarifications, conversation_id, language);
      }
    }

    // 6. Match Specific Product in Extended Standards Database (Cement, Steel, Cables, etc.)
    if (!result) {
      const matchedExtended = this.findExtendedStandard(cleanQ);
      if (matchedExtended) {
        result = this.handleExtendedStandard(matchedExtended, conversation_id, language);
      }
    }

    // 7. Match Procedural & Conceptual Topics (Fees, Timelines, Validity, Penalties, Schemes, HUID, etc.)
    if (!result) {
      const topicKey = this.matchDetailedTopic(cleanQ);
      if (topicKey) {
        result = this.handleDetailedTopicResponse(topicKey, conversation_id, language);
      }
    }

    // 8. Try Gemini Generative AI if API key is provided
    if (!result) {
      const geminiSystemPrompt = `You are the Official BIS AI Assistant for the Bureau of Indian Standards (Govt of India, SIH Problem 26107). 
Talk in a warm, friendly, conversational, enthusiastic, and helpful manner like a friendly expert pair programmer or ChatGPT.
Provide authoritative, accurate, and structured advice grounded in Indian Standards (IS), Scheme I (ISI Mark), Scheme II (CRS), Hallmarking, Quality Control Orders (QCOs), Manakonline, and BIS LIMS. 
Always include IS numbers, safety clauses, and regulatory context where known. Language: ${language}.`;
      
      const geminiAnswer = await callGeminiGenerativeAI(message, geminiSystemPrompt);
      if (geminiAnswer) {
        result = {
          conversation_id,
          intent: "general_advisory",
          needs_clarification: false,
          clarification_questions: [],
          answer: geminiAnswer,
          suggested_followups: [
            "How do I apply for this licence on Manakonline?",
            "What testing laboratories are recognized for this?",
            "What are the application fees with MSME discount?",
            "Can you detail the in-house testing equipment requirements?"
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
          limitations: ["Guidance based on standard specifications and regulatory orders."]
        };
      }
    }

    // 9. Intelligent Fallback Reasoning
    if (!result) {
      result = this.handleDynamicReasoning(message, cleanQ, conversation_id, language);
    }

    // 10. Localize response dynamically for the selected language (7 Languages)
    return await this.localizeResponse(result, language);
  }

  /**
   * Translate text dynamically into target language
   */
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
            resolve(text);
          } catch (e) {
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
