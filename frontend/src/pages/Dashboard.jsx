// src/pages/Dashboard.jsx
import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import useUser from "../contexts/UserContext.jsx";
import Loading from "../components/Loading.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";

const Dashboard = () => {
  const { user, loading, logout } = useUser();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (loading) return <Loading />;
  if (!user) return <Navigate to="/auth" replace />;

  return (
    <div className="min-h-screen flex bg-slate-100 text-black">
      <Sidebar user={user} logout={logout} />
      <div className="flex-1 flex flex-col">
        <Header
          toggleSidebar={() => setMobileOpen((s) => !s)}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          user={user}
          logout={logout}
        />

        <main className="flex-1 p-4 md:p-6 md:ml-64 mt-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
