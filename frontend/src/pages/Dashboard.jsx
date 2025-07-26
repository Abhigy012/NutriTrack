import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-100 text-black transition-all duration-300">
      {/* Sidebar (common across all child routes) */}
      <Sidebar open={open} toggleSidebar={() => setOpen(!open)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col p-6 ml-[60px]">
        {/* This is where child routes will render */}
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
