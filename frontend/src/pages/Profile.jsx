import { useEffect, useState } from "react";
import useUser from "../contexts/UserContext";

const url = import.meta.env.VITE_API_URL;

export default function Profile() {
  const { user, fetchUser } = useUser();
  const [form, setForm] = useState({
    name: "",
    height: "",
    weight: "",
    age: "",
    goal: "",
    activityLevel: "",
  });
  const [pw, setPw] = useState({ oldPassword: "", newPassword: "", newPassword2: "" });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        height: user.height || "",
        weight: user.weight || "",
        age: user.age || "",
        goal: user.goal || "",
        activityLevel: user.activityLevel || "",
      });
    }
  }, [user]);

  const updateProfile = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const res = await fetch(`${url}/auth/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setMsg("Profile updated");
        fetchUser();
      } else {
        setMsg(data.error || "Failed to update");
      }
    } catch (err) {
      setMsg("Network error");
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();
    setMsg("");
    if (!pw.oldPassword || !pw.newPassword || pw.newPassword !== pw.newPassword2) {
      setMsg("Fill all password fields correctly");
      return;
    }
    try {
      const res = await fetch(`${url}/auth/change-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ oldPassword: pw.oldPassword, newPassword: pw.newPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        setMsg("Password changed");
        setPw({ oldPassword: "", newPassword: "", newPassword2: "" });
      } else {
        setMsg(data.error || "Failed to change password");
      }
    } catch (err) {
      setMsg("Network error");
    }
  };

  return (
    <div className="max-w-3xl w-full bg-white rounded-lg p-4 shadow">
      {msg && <div className="mb-3 text-sm text-gray-700">{msg}</div>}
      <h2 className="text-xl font-bold mb-2">Profile</h2>
      <form onSubmit={updateProfile} className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <label className="flex flex-col text-sm">
          <span className="text-gray-600">Name</span>
          <input className="border rounded px-2 py-1" value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} />
        </label>
        <label className="flex flex-col text-sm">
          <span className="text-gray-600">Height (cm)</span>
          <input type="number" className="border rounded px-2 py-1" value={form.height} onChange={(e)=>setForm({...form, height:e.target.value})} />
        </label>
        <label className="flex flex-col text-sm">
          <span className="text-gray-600">Weight (kg)</span>
          <input type="number" className="border rounded px-2 py-1" value={form.weight} onChange={(e)=>setForm({...form, weight:e.target.value})} />
        </label>
        <label className="flex flex-col text-sm">
          <span className="text-gray-600">Age</span>
          <input type="number" className="border rounded px-2 py-1" value={form.age} onChange={(e)=>setForm({...form, age:e.target.value})} />
        </label>
        <label className="flex flex-col text-sm">
          <span className="text-gray-600">Goal</span>
          <select className="border rounded px-2 py-1" value={form.goal} onChange={(e)=>setForm({...form, goal:e.target.value})}>
            <option value="">Select</option>
            <option value="gain">Gain</option>
            <option value="lose">Lose</option>
            <option value="maintain">Maintain</option>
          </select>
        </label>
        <label className="flex flex-col text-sm">
          <span className="text-gray-600">Activity Level</span>
          <select className="border rounded px-2 py-1" value={form.activityLevel} onChange={(e)=>setForm({...form, activityLevel:e.target.value})}>
            <option value="">Select</option>
            <option value="sedentary">Sedentary</option>
            <option value="moderate">Moderate</option>
            <option value="active">Active</option>
          </select>
        </label>
        <div className="md:col-span-2">
          <button className="px-3 py-2 bg-black text-white rounded cursor-pointer">Save</button>
        </div>
      </form>

      <h2 className="text-xl font-bold mt-6 mb-2">Change Password</h2>
      <form onSubmit={changePassword} className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <label className="flex flex-col text-sm">
          <span className="text-gray-600">Old Password</span>
          <input type="password" className="border rounded px-2 py-1" value={pw.oldPassword} onChange={(e)=>setPw({...pw, oldPassword:e.target.value})} />
        </label>
        <label className="flex flex-col text-sm">
          <span className="text-gray-600">New Password</span>
          <input type="password" className="border rounded px-2 py-1" value={pw.newPassword} onChange={(e)=>setPw({...pw, newPassword:e.target.value})} />
        </label>
        <label className="flex flex-col text-sm">
          <span className="text-gray-600">Confirm New Password</span>
          <input type="password" className="border rounded px-2 py-1" value={pw.newPassword2} onChange={(e)=>setPw({...pw, newPassword2:e.target.value})} />
        </label>
        <div className="md:col-span-3">
          <button className="px-3 py-2 bg-black text-white rounded cursor-pointer">Change Password</button>
        </div>
      </form>
    </div>
  );
}


