import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Authform from "./components/AuthForm";
import FoodLog from "./components/FoodLog";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Authform />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/foodlog" element={<FoodLog />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
