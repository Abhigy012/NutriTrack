# NutriTrack

<p align="center">
  <img src="frontend/public/images/Logo.png" alt="NutriTrack Logo" width="180"/>
</p>

A full-stack MERN application for tracking daily nutrition, food logs, and health reports.

---

## 🏗️ Project Structure

```
NutriTrack/
├── backend/      # Node.js/Express API
├── frontend/     # React + Vite client
```

## 🚀 Features

- User authentication (signup, login)
- Food logging and nutrition tracking
- Daily macro calculation
- Health reports
- Responsive dashboard
- Protected routes

## ⚙️ Tech Stack

| Layer      | Technology         |
|------------|-------------------|
| Frontend   | React, Vite       |
| Styling    | CSS               |
| Backend    | Node.js, Express  |
| Database   | MongoDB           |
| Auth       | JWT               |

## 📦 Backend Structure

- `app.js`, `server.js`: Entry points
- `models/`: Mongoose schemas (`user.js`, `food.js`, `report.js`)
- `controllers/`: Route logic (`authController.js`, `foodController.js`, `reportController.js`)
- `routes/`: API endpoints (`authRoutes.js`, `foodRoutes.js`, `reportRoutes.js`)
- `middlewares/`: Auth and token utilities
- `utils/`: Nutrition/diet helpers
- `config/db.js`: MongoDB connection

## 💻 Frontend Structure

- `src/components/`: UI components (Login, Signup, FoodLog, Sidebar, etc.)
- `src/pages/`: Main pages (Home, Dashboard, Profile, Reports)
- `src/contexts/`: React context for user state
- `src/hooks/`: Custom hooks
- `src/lib/`: Utility functions
- `public/images/`: Static assets

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
```

#### Frontend `.env`
```
VITE_API_URL=http://localhost:5000/api
```

## 📚 API Endpoints

- **Auth:** `/api/auth/*`
- **Food:** `/api/food/*`
- **Reports:** `/api/report/*`

## 📸 Screenshots

_Add screenshots of your app UI here._

## 📝 License

MIT License

---

**NutriTrack** – Track your nutrition,
