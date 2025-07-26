import { useEffect, useState } from "react";
import FoodlogForm from "../components/FoodlogForm";
import FoodlogTable from "./FoodlogTable";
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
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchFoodLog();
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen gap-4 bg-slate-300 p-5">
      <div className="flex-grow flex gap-3 rounded-lg">
        <div
          id="todayfoodlogs"
          className="flex flex-col justify-center gap-3 p-3 w-3/4 bg-white rounded-lg"
        >
          {error && (
            <p className={`bg-red-200 text-red-600 text-center p-2 rounded-md`}>
              {error}
            </p>
          )}
          <h1 className="text-center font-bold text-xl">Today's Food Log</h1>
          <FoodlogTable foodLog={foodLog} />
        </div>
        <FoodlogForm
          fetchFoodLog={fetchFoodLog}
          setFoodLog={setFoodLog}
          id="foodlogform"
          className="w-1/4 bg-blue-300 rounded-lg"
        />
      </div>

      <div
        id="daywisefoodlogs"
        className="h-64 w-full rounded-lg bg-red-400"
      ></div>
    </div>
  );
};

export default FoodLog;
