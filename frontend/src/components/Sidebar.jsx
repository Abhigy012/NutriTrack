import React from "react";
import { MdMenuOpen } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { TbReportSearch } from "react-icons/tb";
import { MdOutlineDashboard } from "react-icons/md";
import { IoFastFoodSharp } from "react-icons/io5";
import { FaChartColumn } from "react-icons/fa6";
import { FcPaid } from "react-icons/fc";

const menuItems = [
  { icons: <IoHomeOutline size={30} />, label: "Home" },
  { icons: <MdOutlineDashboard size={30} />, label: "Dashboard" },
  { icons: <IoFastFoodSharp size={30} />, label: "Food Log" },
  { icons: <TbReportSearch size={30} />, label: "Reports" },
  { icons: <FaChartColumn size={30} />, label: "Summary" },
  { icons: <FcPaid size={30} />, label: "Pro" },
];

export default function Sidebar({ open, toggleSidebar }) {
  return (
    <nav
      className={`fixed top-0 left-0 h-screen p-2 flex flex-col duration-300 bg-white text-black z-50 ${
        open ? "w-60" : "w-16"
      }`}
    >
      {/* Top Toggle Button */}
      <div className="px-3 py-2 h-20 flex justify-between items-center">
        <MdMenuOpen
          size={34}
          className={`duration-500 cursor-pointer ${!open && "rotate-180"}`}
          onClick={toggleSidebar}
        />
      </div>

      {/* Menu Items */}
      <ul className="flex-1">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="px-3 py-2 my-2 hover:bg-slate-200 rounded-md duration-300 cursor-pointer flex items-center gap-3 relative group"
          >
            {/* Icon */}
            <div className="min-w-[30px]">{item.icons}</div>

            {/* Label (Visible when open) */}
            <p
              className={`transition-all duration-300 whitespace-nowrap overflow-hidden ${
                open ? "opacity-100 w-auto" : "opacity-0 w-0"
              }`}
            >
              {item.label}
            </p>

            {/* Tooltip on hover when closed */}
            {!open && (
              <span className="absolute left-16 z-10 bg-white text-black text-sm whitespace-nowrap rounded-md shadow-md px-2 py-1 opacity-0 group-hover:opacity-100 group-hover:delay-100 transition-all duration-300">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ul>

      {/* User Info */}
      <div className="flex items-center gap-3 px-3 py-2">
        <div className="min-w-[30px] flex justify-center items-center">
          <FaUserCircle size={30} />
        </div>
        <div
          className={`transition-all duration-300 whitespace-nowrap overflow-hidden ${
            open ? "opacity-100 w-auto" : "opacity-0 w-0"
          }`}
        >
          <p>Saheb</p>
          <span className="text-xs">saheb@gmail.com</span>
        </div>
      </div>
    </nav>
  );
}
