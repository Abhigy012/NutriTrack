import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Authform from "./pages/Authform";
import UserDashboard from "./pages/UserDashboard";
import FoodLog from "./components/FoodLog";

// 👇 Import the UserProvider
import { UserProvider } from "../src/contexts/UserContext"; // adjust the path if needed

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
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
