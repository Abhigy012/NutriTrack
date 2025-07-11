import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

const url = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState("");

  const fetchUser = async () => {
    try {
      const res = await fetch(`${url}/food/dashboard`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Important: Sends cookies
      });

      const result = await res.json();
      console.log(result);
      if (res.ok) {
        setResponse(result.message);
        console.log("Success:", result.message);
      } else {
        console.error("Dashboard error:", result.error);
        setResponse("Unauthorized or session expired");
      }
    } catch (err) {
      console.error("Network error:", err.message);
      setResponse("Server error");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-100 text-black transition-all duration-300">
      {/* Sidebar */}
      <Sidebar open={open} toggleSidebar={() => setOpen(!open)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-6 ml-[60px]">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

        {/* Response message */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          {response ? (
            <p className="text-lg font-medium text-green-600">{response}</p>
          ) : (
            <p className="text-gray-500">Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
