import { React, useState } from "react";
import { useForm } from "react-hook-form";
import Loading from "./Loading";
const url = import.meta.env.VITE_API_URL;

function FoodlogForm({ fetchFoodLog }) {
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading((prev) => !prev);
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
        fetchFoodLog();
      } else {
        setError(result.error || "Unknown error occurred");
        console.error("FoodLog error:", result.error);
      }
    } catch (err) {
      setError("Network error or server unavailable");
      console.error("Fetch error:", err);
    } finally {
      setLoading((prev) => !prev);
    }
  };
  return (
    <div id="foodlogform" className="flex flex-col gap-2 items-center">
      {error && (
        <p className={`bg-red-200 text-red-600 text-center p-2 rounded-md `}>
          {error}
        </p>
      )}

      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-center font-bold text-4xl text-black">
          Log new Food!
        </h1>
        <label className="flex gap-1 justify-between items-center">
          Food :
          <input
            className={`bg-white p-2 border-1 text-black rounded-md ${
              errors.foodName
                ? "border-red-500 shadow shadow-red-300"
                : "border-gray-300"
            }`}
            type="text"
            placeholder="Food Name"
            {...register("foodName", {
              required: true,
            })}
          />
        </label>

        <label className="flex gap-1 justify-between items-center">
          Quantity :
          <input
            className={`bg-white p-2 border-1 text-black rounded-md ${
              errors.quantity
                ? "border-red-500 shadow shadow-red-300"
                : "border-gray-300"
            }`}
            type="number"
            placeholder="0 to fetch"
            {...register("quantity", {
              required: true,
            })}
          />
        </label>
        <label className="flex gap-1 justify-between items-center">
          Food recipe :
          <input
            className={`bg-white p-2 border-1 text-black rounded-md ${
              errors.foodRecipe
                ? "border-red-500 shadow shadow-red-300"
                : "border-gray-300"
            }`}
            type="text"
            placeholder="Recipe"
            {...register("foodRecipe")}
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 cursor-pointer hover:bg-blue-600 transition-all rounded-md p-3 text-white tracking-tighter"
        >
          Submit
        </button>
      </form>
      {loading ? (
        <div className="block h-20 w-20">
          <img
            src="/images/Loading.gif"
            className="h-full w-full"
            alt="awdaw"
          />
        </div>
      ) : null}
      {}
    </div>
  );
}
export default FoodlogForm;
