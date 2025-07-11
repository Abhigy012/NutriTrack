import { React, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
const url = import.meta.env.VITE_API_URL;

function FoodlogForm() {
  const navigate = useNavigate();
  let [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    let JSONdata = JSON.stringify(data);
    try {
      let response = await fetch(`${url}/food/addFoodLog`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSONdata,
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Success:", result.message);
        reset();
        setError("");
        navigate("/foodLog");
      } else {
        setError(result.error || "Unknown error occurred");
        console.error("FoodLog error:", result.error);
      }
    } catch (err) {
      setError("Network error or server unavailable");
      console.error("Fetch error:", err);
    }
  };
  return (
    <div id="foodlogform">
      {error && (
        <p className="bg-red-200 text-red-600 text-center p-2 rounded-md">
          {error}
        </p>
      )}
      <h1 className="text-center font-bold text-4xl text-black">
        Log new Food!
      </h1>
    </div>
  );
}
export default FoodlogForm;
