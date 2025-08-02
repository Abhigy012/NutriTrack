import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet, redirect } from "react-router-dom";
import useUser from "../contexts/UserContext";
import Loading from "./Loading";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  let { user, loading } = useUser();
  const [open, setOpen] = useState(false);
  if (loading) {
    return <Loading />;
  }
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
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
