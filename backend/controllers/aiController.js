const { GoogleGenerativeAI } = require('@google/generative-ai');
const ResearchPaper = require('../models/ResearchPaper');
const Policy = require('../models/Policy');
const Dataset = require('../models/Dataset');

// @desc    Process AI Research & Policy Consultation
// @route   POST /api/ai/consult
// @access  Public
exports.consultAi = async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message || message.trim() === '') {
      return res.status(400).json({ message: 'Query message parameter is required' });
    }

    const queryStr = message.trim();
    const queryRegex = new RegExp(queryStr.split(' ').join('|'), 'i');

    // 1. Search relevant MongoDB Research Papers
    const matchedPapers = await ResearchPaper.find({
      $or: [
        { title: queryRegex },
        { abstract: queryRegex },
        { tags: queryRegex },
        { category: queryRegex }
      ]
    }).limit(4);

    // 2. Search relevant MongoDB State Policies
    const matchedPolicies = await Policy.find({
      $or: [
        { title: queryRegex },
        { summary: queryRegex },
        { state: queryRegex },
        { category: queryRegex }
      ]
    }).limit(4);

    // 3. Search relevant MongoDB Datasets
    const matchedDatasets = await Dataset.find({
      $or: [
        { title: queryRegex },
        { description: queryRegex },
        { spatialCoverage: queryRegex },
        { category: queryRegex }
      ]
    }).limit(4);

    // Prepare context for Gemini AI
    let aiSummaryText = '';
    const geminiKey = process.env.GEMINI_API_KEY;

    if (geminiKey) {
      try {
        const genAI = new GoogleGenerativeAI(geminiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const prompt = `
You are GeoPolicy Nexus AI Assistant, a senior land governance specialist & policy researcher for the Government of India.
User Query: "${queryStr}"

Available Context from National Database:
- Research Papers Matched: ${matchedPapers.map(p => p.title).join('; ') || 'None'}
- Policies Matched: ${matchedPolicies.map(p => p.title).join('; ') || 'None'}
- Datasets Matched: ${matchedDatasets.map(d => d.title).join('; ') || 'None'}

Instructions:
Provide a structured executive synthesis (3-4 paragraphs in clean Markdown) addressing:
1. Executive Overview & Policy Diagnosis regarding "${queryStr}".
2. Land Rights, Registration, or Spatial Boundary challenges.
3. Actionable Policy Recommendations & Digital Infrastructure (ULPIN, SVAMITVA, GIS) solutions.
`;

        const result = await model.generateContent(prompt);
        const responseText = await result.response.text();
        aiSummaryText = responseText;
      } catch (geminiError) {
        console.warn('Gemini API call failed, falling back to expert synthesis engine:', geminiError.message);
      }
    }

    // Expert Fallback Synthesis Engine if API Key isn't provided
    if (!aiSummaryText) {
      aiSummaryText = `### Executive Land Governance Synthesis: "${queryStr}"

**1. Strategic Overview & Diagnosis**
The query concerning **"${queryStr}"** addresses a core challenge in national land administration. In Indian jurisprudence, land tenure security requires seamless synchronization between spatial survey records (cadastral maps) and revenue rights registries (Record of Rights / RoR).

**2. Legal & Spatial Boundary Challenges**
* **Title Ambiguity:** Multi-generational informal ownership transfers without gazetted registration create title friction.
* **Cadastral Mismatch:** Discrepancies between physical boundary markers on-ground and historical revenue maps lead to protracted litigation.
* **Jurisdictional Overlaps:** Revenue board entries and urban development master plans frequently operate on unsynchronized coordinate reference systems.

**3. Actionable Policy & Technical Roadmap**
* **ULPIN Integration:** Mandate 14-digit geo-tagged ULPIN (Unique Land Parcel Identification Number) issuance across all contested parcels.
* **SVAMITVA High-Precision Drone Surveying:** Deploy CORS-enabled RTK drone surveys to map parcel boundaries down to 5cm accuracy.
* **Conclusive Titling Framework:** Transition state land policy from presumptive titling to state-guaranteed conclusive land titling.`;
    }

    res.json({
      query: message,
      aiSummary: aiSummaryText,
      researchPapers: matchedPapers,
      policies: matchedPolicies,
      datasets: matchedDatasets,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error in consultAi controller:', error);
    res.status(500).json({ message: error.message });
  }
};
