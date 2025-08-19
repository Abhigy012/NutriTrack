require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

async function checkFoodAgainstAvoids(foodName, foodRecipe, avoidList) {
  try {
    if (!Array.isArray(avoidList) || avoidList.length === 0) return [];
    const prompt = `You are given a user's avoid list and a food they plan to eat. From the given avoid list, return only the items that are likely present in this food. Reply strictly with a JSON array of strings from the avoid list. If none, reply []. Do not add any new items.

Avoid list: ${JSON.stringify(avoidList)}
Food: ${String(foodName || "").slice(0,100)}
Recipe/Notes: ${String(foodRecipe || "").slice(0,400)}
`;
    const res = await model.generateContent(prompt);
    const text = res.response.text();
    const cleaned = String(text)
      .replace(/```(?:json)?\s*([\s\S]*?)\s*```/, "$1")
      .trim();
    const parsed = JSON.parse(cleaned);
    if (Array.isArray(parsed)) {
      return parsed.map((s) => String(s)).filter(Boolean);
    }
    return [];
  } catch (err) {
    return [];
  }
}

module.exports = { checkFoodAgainstAvoids };


