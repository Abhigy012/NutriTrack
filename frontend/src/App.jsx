import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Authform from "./pages/Authform.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";
import FoodLog from "./components/FoodLog.jsx";
import Reports from "./pages/Reports.jsx";
import Profile from "./pages/Profile.jsx";

// 👇 Import the UserProvider
import { UserProvider } from "../src/contexts/UserContext"; // adjust the path if needed
import Loading from "./components/Loading";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/*" element={<Authform />} />

          {/* Dashboard with nested routes */}
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<UserDashboard />} />
            <Route path="foodlog" element={<FoodLog />} />
            <Route path="reports" element={<Reports />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
