require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const API_KEY = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);

// Choose a lightweight model for fast responses
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const getRequiredDiet = async (height, weight, lifestyle, goal, age) => {
  const prompt = `You are given a user's personal details:
  - Height: ${height} cm
  - Weight: ${weight} kg
  - Lifestyle: ${lifestyle}
  - Age : ${age} years
  - Goal: ${goal}

  Based on these inputs, calculate and return the **daily macronutrient requirements** in the following strict format:
  {"reqCal" : x, "reqCarbs" : y, "reqProteins" : z, "reqFats" : w}

  All values should be in grams, and calories in kcal. Return ONLY this object and nothing else — no explanation or extra text. If you're unable to calculate, return null.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const responseText = response.text();
    if (responseText) {
      const cleaned = responseText
        .replace(/```(?:json)?\s*([\s\S]*?)\s*```/, "$1")
        .trim();
      const responseJson = JSON.parse(cleaned);
      return responseJson;
    } else {
      console.error("❌ Macros object not found in response");
      return null;
    }
  } catch (err) {
    console.log(err.message);
    return null;
  }
};

module.exports = { getRequiredDiet };
