// src/components/Header.jsx
import React from "react";
import { MdMenu } from "react-icons/md";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const menuItems = [
  { icon: "🏠", label: "Home", path: "/" },
  { icon: "📊", label: "Dashboard", path: "/dashboard" },
  { icon: "🍽️", label: "Food Log", path: "/dashboard/foodlog" },
  { icon: "📈", label: "Reports", path: "/dashboard/reports" },
];

export default function Header({
  toggleSidebar,
  mobileOpen,
  setMobileOpen,
  user,
  logout,
}) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      if (logout) await logout();
    } catch (e) {
      console.log(e.message);
    }
    setMobileOpen(false);
    navigate("/auth", { replace: true });
  };

  return (
    <>
      {/* Fixed top header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white shadow h-16 flex items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          {/* Mobile hamburger */}
          <button
            onClick={toggleSidebar}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
            aria-label="Toggle menu"
          >
            <MdMenu size={24} />
          </button>
        </div>

        {/* Right: Logo + Title */}
        <div className="flex items-center gap-2">
          <img
            src="/images/Logo.png"
            alt="NutriTrack"
            className="h-10 w-auto object-contain"
          />
          <span className="text-lg font-semibold tracking-tight text-gray-800">
            NutriTrack
          </span>
        </div>
      </header>

      {/* Mobile dropdown (below header) */}
      {mobileOpen && (
        <div className="absolute top-16 left-0 right-0 z-30 md:hidden bg-white border-t shadow-lg">
          <nav>
            <ul className="flex flex-col divide-y">
              {menuItems.map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition"
                  >
                    <span className="w-6">{item.icon}</span>
                    <span className="text-gray-700">{item.label}</span>
                  </Link>
                </li>
              ))}

              <li>
                <button
                  onClick={handleLogout}
                  className="w-full text-left flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition"
                >
                  <FaSignOutAlt size={18} />
                  <span>Logout</span>
                </button>
              </li>

              <li>
                <div
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition cursor-pointer"
                  onClick={() => {
                    navigate("/dashboard/profile");
                    setMobileOpen(false);
                  }}
                >
                  <FaUserCircle size={22} className="text-gray-600" />
                  <div>
                    <div className="font-medium text-gray-800">
                      {user?.name || "User"}
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
