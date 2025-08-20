# NutriTrack

<p align="center">
  <img src="frontend/public/images/Logo.png" alt="NutriTrack Logo" width="180"/>
</p>

NutriTrack is a full-stack MERN application that leverages the **Google Gemini AI** to provide personalized nutrition tracking, health report analysis, and dietary recommendations.

---

## ✨ AI-Powered Features

NutriTrack uses the Google Gemini API to deliver intelligent health insights:

-   **AI Health Report Analysis**: Upload your PDF health reports. The AI reads the document, provides a simple summary, and automatically extracts a list of critical foods/ingredients to avoid.
-   **AI Personalized Diet Planning**: Based on your height, weight, age, lifestyle, and goals, the AI calculates your optimal daily calorie and macronutrient requirements.
-   **AI Nutritional Lookup**: Instantly get a detailed nutritional breakdown (calories, protein, carbs, fats) for any food or custom recipe you log.
-   **AI Dietary Alerts**: The system cross-references your food logs against your personalized "avoid list" and warns you if a food contains something you shouldn't eat.

---

## 🚀 Core Features

-   **User Authentication:** Secure signup and login using JWT.
-   **Food Logging:** Add, view, and manage daily food entries with AI-driven nutritional data.
-   **Health Reports:** Store and manage your health reports, with AI-generated summaries.
-   **Responsive Dashboard:** A modern, interactive UI for desktop and mobile.
-   **Protected Routes:** Ensures data privacy and secure access to personal health information.

---

## ⚙️ Tech Stack

| Layer      | Technology         |
|------------|-------------------|
| AI           | Google Gemini API |
| Frontend   | React, Vite       |
| Backend    | Node.js, Express  |
| Database   | MongoDB           |
| Auth       | JWT               |
| File Storage | Cloudinary        |

---

## 🛠️ Setup Instructions

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env   # Create and edit your .env file
npm run dev            # or npm start
```

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env   # Create and edit your .env file
npm run dev
```

### 3. Environment Variables

#### Backend `.env`
```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
GEMINI_API_KEY=your_google_gemini_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

#### Frontend `.env`
```
VITE_API_URL=http://localhost:5000/api
```

---

## 📚 API Endpoints

-   **Auth:** `/api/auth/*`
-   **Food:** `/api/food/*`
-   **Reports:** `/api/report/*`

---

## 📝 License

MIT License

---

**NutriTrack** – AI-powered nutrition, smarter health.
