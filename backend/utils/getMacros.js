const API_KEY =
  "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";
console.log(API_KEY);
const prompt = `I have made a project in which user inputs the food name in the form of a string with his adjustments to the general recipe. and the quantity of food in grams. U have to fetch the macros as an object like macros {protein:xgrams, carbs : y grams, fats:z grams}. Give me an example output for : {input : bhel puri with some soya chunks and peanuts and 1 whole egg york for protein, quantity : 500 gm} Ouput should look exactly like : macros:{proteins : x, carbs : y,fats : z }, where everything is in grams. Nothing else in output!`;

const getMacros = () => {
  let response = 
  fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "deepseek/deepseek-r1-0528:free",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      const responseText = data.choices?.[0]?.message?.content || "";
      const match = responseText.match(/macros\s*:\s*\{[^}]+\}/i);

      if (match) {
        console.log(match[0]); // prints only the macros object
      } else {
        console.error("❌ Macros object not found in response");
        console.log("Raw response:", responseText);
      }
    })
    .catch((err) => console.error("❌ Error:", err.message));
};
