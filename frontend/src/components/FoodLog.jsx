import { useEffect, useState } from "react";
import FoodlogForm from "../components/FoodlogForm.jsx";
import FoodlogTable from "./FoodlogTable.jsx";
const url = import.meta.env.VITE_API_URL;

const FoodLog = () => {
  let [error, setError] = useState("");
  let [foodLog, setFoodLog] = useState([]);

  const fetchFoodLog = async () => {
    try {
      const response = await fetch(`${url}/food/getTodayFoodLogs`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (response.ok) {
        const responseData = await response.json();
        setFoodLog(responseData);
      } else {
        setError("Unable to fetch the food log.");
        setFoodLog(null);
      }
    } catch (error) {
      setFoodLog(null);
      setError(error.message);
    }
  };

  const handleDeleted = (id) => {
    setFoodLog((prev) => (prev || []).filter((f) => f._id !== id));
  };

  useEffect(() => {
    fetchFoodLog();
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen gap-4 bg-slate-100 p-5">
      <div className="flex-grow flex flex-col gap-3 rounded-lg lg:flex-row">
        {/* Food logs */}
        <div
          id="todayfoodlogs"
          className="flex flex-col gap-3 p-4 w-full bg-white rounded-lg shadow lg:w-3/4"
        >
          {error && (
            <p className="bg-red-200 text-red-600 text-center p-2 rounded-md">
              {error}
            </p>
          )}
          <h1 className="text-left font-bold text-xl">Today's Food Log</h1>
          <FoodlogTable foodLog={foodLog} onDeleted={handleDeleted} />
        </div>

        {/* Food log form */}
        <div className="w-full lg:w-1/4">
          <FoodlogForm
            fetchFoodLog={fetchFoodLog}
            setFoodLog={setFoodLog}
            id="foodlogform"
          />
        </div>
      </div>

      {/* Future daywise logs */}
      <div id="daywisefoodlogs" className="hidden"></div>
    </div>
  );
};

export default FoodLog;
