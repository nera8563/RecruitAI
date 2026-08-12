const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// POST /api/ai/evaluate  { conversation: [{ role, content, timestamp }] }
const evaluateConversation = async (req, res) => {
  try {
    const conversation = req.body.conversation || [];

    if (conversation.length === 0) {
      return res.status(200).json({
        success: true,
        evaluation: {
          communication: 0,
          technical: 0,
          problemSolving: 0,
          culturalFit: 0,
          confidence: 0,
          role: "Unknown",
          summary: "No transcript was provided.",
          suggestions: ["Provide interview transcript for evaluation."],
        },
      });
    }

    const chatLogs = conversation
      .map((m) => `${String(m.role).toUpperCase()}: ${m.content}`)
      .join("\n");

    const prompt = `
You are an expert interviewer. Evaluate the transcript below and return JSON with:
- communication, technical, problemSolving, culturalFit, confidence: each 0-100
- role: the most likely job role being interviewed for, e.g. "Software Engineer", "Data Scientist", etc.
- summary: string
- suggestions: string[]

Transcript:
${chatLogs}
`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();

    let evaluation;
    try {
      const jsonMatch = text.match(/```json([\s\S]*?)```/);
      const jsonString = jsonMatch ? jsonMatch[1].trim() : text;
      evaluation = JSON.parse(jsonString);
      if (!evaluation.role) evaluation.role = "Unknown";
    } catch (parseError) {
      evaluation = {
        summary: text,
        communication: 0,
        technical: 0,
        problemSolving: 0,
        culturalFit: 0,
        confidence: 0,
        suggestions: [],
        role: "Unknown",
      };
    }

    return res.status(200).json({ success: true, evaluation });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { evaluateConversation };
