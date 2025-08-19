// server.js or index.js
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const API_KEY = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);

// Choose a lightweight model for fast responses
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const getMacros = async (foodName, quantity = 0, foodRecipe) => {
  const prompt = `I have made a project in which user inputs the food name in the form of a string with his adjustments to the general recipe. and the quantity of food in grams. U have to fetch the macros as an object like {"proteins":x grams, "carbs" : y grams, "fats":z grams,"calories" : a }. Give me output for food:${foodName} quantity:${quantity} recipe:${foodRecipe} Output should look exactly like : {"proteins" : x, "carbs" : y,"fats" : z ,"calories" : a} , where everything is in grams. Nothing else in output! Just simply fetch the data and give it in output , you dont have to harcode or code anything. Dont give explanation and just return a string of the given type. if quantity is zero or recipe is null, assume yourself from the foodName and if not able to fetch that just return null.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const responseText = response.text();
    if (responseText) {
      let responseJson = JSON.parse(`${responseText}`);
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

module.exports = { getMacros };
