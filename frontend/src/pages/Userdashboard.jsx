import { useState, useEffect } from "react";
import useUser from "../contexts/UserContext.jsx";
import Loading from "../components/Loading.jsx";
import DietPie from "../components/DietPie.jsx";
import FoodlogForm from "../components/FoodlogForm.jsx";
const url = import.meta.env.VITE_API_URL;

const UserDashboard = () => {
  const { loading, user, fetchUser } = useUser();
  const [date, setDate] = useState("");
  const [nutrition, setNutrition] = useState(null);

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setDate(newDate);
    fetchNutrition(newDate);
  };

  const fetchNutrition = async (forDate) => {
    try {
      const res = await fetch(`${url}/food/getTodayNutrition`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ date: forDate }),
      });
      const data = await res.json();
      setNutrition(data);
      // Also upsert the daily summary for this date (MVP)
      try {
        await fetch(`${url}/summary/daily`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ date: forDate }),
        });
      } catch (e) {
        console.log(e.message);
      }
    } catch (err) {
      console.error("fetchNutrition error:", err);
    }
  };

  useEffect(() => {
    const todayStr = new Date().toISOString().slice(0, 10);
    setDate(todayStr);
    fetchNutrition(todayStr);
  }, []);

  if (loading) {
    return <Loading />;
  }

  const todayStr = new Date().toISOString().slice(0, 10);

  const dietReady = Boolean(user?.diet && (user.diet.reqCal || 0) > 0);

  // Poll user profile briefly if diet is not ready yet (after signup background job)
  useEffect(() => {
    if (dietReady) return;
    let tries = 0;
    const id = setInterval(async () => {
      tries += 1;
      try {
        await fetchUser();
      } catch (e) {
        console.log(e.message);
      }
      if (user?.diet && (user.diet.reqCal || 0) > 0) {
        clearInterval(id);
      }
      if (tries > 10) {
        clearInterval(id); // stop after ~40s
      }
    }, 4000);
    return () => clearInterval(id);
  }, [dietReady, fetchUser, user?.diet]);

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-700">Date:</label>
          <input
            type="date"
            value={date}
            max={todayStr}
            onChange={handleDateChange}
            className="border rounded px-2 py-1"
          />
        </div>
        <div className="text-sm text-gray-600">
          Required: {user?.diet?.reqCal || 0} kcal | P{" "}
          {user?.diet?.reqProteins || 0}g, F {user?.diet?.reqFats || 0}g, C{" "}
          {user?.diet?.reqCarbs || 0}g
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 shadow min-h-[280px]">
        <h2 className="text-lg font-bold mb-2">Today's Intake</h2>
        {dietReady ? (
          <DietPie nutrition={nutrition} required={user?.diet} />
        ) : (
          <div className="flex items-center justify-center h-48">
            <img
              src="/images/Loading.gif"
              alt="Loading"
              className="h-12 w-12"
            />
          </div>
        )}
      </div>
      {/**/}
      <div>
        <FoodlogForm fetchNutrition={() => fetchNutrition(date)} />
      </div>
    </div>
  );
};

export default UserDashboard;
