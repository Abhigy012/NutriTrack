// src/components/Sidebar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoHomeOutline, IoFastFoodSharp } from "react-icons/io5";
import { MdOutlineDashboard } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import { FaUserCircle } from "react-icons/fa";

const menuItems = [
  { icon: <IoHomeOutline size={18} />, label: "Home", path: "/" },
  {
    icon: <MdOutlineDashboard size={18} />,
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: <IoFastFoodSharp size={18} />,
    label: "Food Log",
    path: "/dashboard/foodlog",
  },
  {
    icon: <TbReportSearch size={18} />,
    label: "Reports",
    path: "/dashboard/reports",
  },
];

export default function Sidebar({ user = { name: "User" }, logout }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      if (logout) await logout();
    } catch (e) {
      console.log(e.message);
    }
    navigate("/auth", { replace: true });
  };

  return (
    <>
      {/* Desktop sidebar only */}
      <nav className="hidden md:fixed md:inset-y-0 md:left-0 md:w-64 md:flex md:flex-col bg-white border-r z-30">
        <div className="h-16 flex items-center px-4 shadow-sm gap-3">
          <img src="/images/Logo.png" alt="NutriTrack logo" className="h-8 w-auto" />
          <h1 className="text-xl font-semibold">NutriTrack</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <ul className="flex flex-col gap-1">
            {menuItems.map((it, idx) => (
              <li key={idx}>
                <Link
                  to={it.path}
                  className="flex items-center gap-3 p-2 rounded hover:bg-slate-100"
                >
                  <div className="w-6">{it.icon}</div>
                  <span>{it.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4 border-t flex items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer flex-1 hover:bg-slate-100 rounded-md"
            onClick={() => navigate("/dashboard/profile")}
          >
            <FaUserCircle size={26} className="text-slate-700" />
            <div className="flex flex-col">
              <span className="font-medium">{user?.name || "User"}</span>
              <span className="text-xs text-slate-500">Member</span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="px-3 py-1 rounded-md bg-red-500 text-white text-sm font-medium hover:bg-red-400"
          >
            Logout
          </button>
        </div>
      </nav>
    </>
  );
}
