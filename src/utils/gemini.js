const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

export async function validateIdea(title, description, stage) {

  const prompt = `
    You are a startup idea analyst.
    Analyze this idea and return ONLY a valid JSON object.
    No markdown, no backticks, no extra text.

    Startup Title: ${title}
    Description: ${description}
    Current Stage: ${stage}

    Rules:
    - "buildItScore" must be a number between 0 and 100
    - "riskLevel" must be exactly one of: "Low", "Medium", "High", "Very High"
    - "categoryScores" values must be numbers between 0 and 10
    - "competitors" must be an array of 3 to 5 objects
    - "risks" must be an array of exactly 3 strings
    - "opportunities" must be an array of exactly 3 strings
    - "verdict" must be a detailed paragraph of at least 3 sentences

    Return exactly this JSON structure:
    {
      "summary": {
        "industry": "string",
        "targetAudience": "string"
      },
      "buildItScore": 0-100,
      "riskLevel": "Low | Medium | High | Very High",
      "categoryScores": {
        "marketOpportunity": 0-10,
        "competitionLevel": 0-10,
        "feasibility": 0-10,
        "monetizationPotential": 0-10
      },
      "competitors": [
        { "name": "string", "description": "string" }
      ],
      "risks": ["string", "string", "string"],
      "opportunities": ["string", "string", "string"],
      "verdict": "string"
    }
  `

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7 }
      })
    })

    const data = await response.json()
    const text = data.candidates[0].content.parts[0].text
    const cleaned = text.replace(/```json|```/g, "").trim()
    const result = JSON.parse(cleaned)

    return result

  } catch (error) {
    console.error("GEMINI API ERROR:", error)
    throw new Error("Failed to validate idea. Please try again later.")
  }
}