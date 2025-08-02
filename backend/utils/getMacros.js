const API_KEY =
  "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";

const getMacros = async (foodName, quantity = 0, foodRecipe = null) => {
  let response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
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
          content: `I have made a project in which user inputs the food name in the form of a string with his adjustments to the general recipe. and the quantity of food in grams. U have to fetch the macros as an object like {"protein":x grams, "carbs" : y grams, "fats":z grams,"quantity" : a grams}. Give me output for food:${foodName} quantity:${quantity} recipe:${foodRecipe} Ouput should look exactly like : {"proteins : x, "carbs" : y,"fats" : z ,"quantity" : a} , where everything is in grams. Nothing else in output! Just simply fetch the data and give it in output , you dont have to harcode or code anything. Dont give explanation and just return a string of the given type. if quantity is zero or recipe is null, assume yourself from the foodName and if not able to fetch that just return null. if quantity is given put quantity there and if not then fetch it and then give`,
        },
      ],
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      const responseText = data.choices?.[0]?.message?.content || "";
      if (responseText) {
        let responseJson = JSON.parse(`${responseText}`);
        return responseJson;
      } else {
        console.error("❌ Macros object not found in response");
        return null;
      }
    })
    .catch((err) => {
      console.error("❌ Error:", err.message);
      return null;
    });
  return response;
};
module.exports = { getMacros };
