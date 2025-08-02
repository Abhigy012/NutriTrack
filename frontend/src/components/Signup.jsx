import { React, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
const url = import.meta.env.VITE_API_URL;
function Signup() {
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
      let response = await fetch(`${url}/auth/signup`, {
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
        navigate("/dashboard");
      } else {
        setError(result.error || "Unknown error occurred");
        console.error("Signup error:", result.error);
      }
    } catch (err) {
      setError("Network error or server unavailable");
      console.error("Fetch error:", err);
    }
  };

  return (
    <div
      id="signupform"
      className="flex flex-col justify-center items-center gap-4 w-full"
    >
      {error && (
        <p className="bg-red-200 text-red-600 text-center p-2 rounded-md">
          {error}
        </p>
      )}
      <h1 className="text-center font-bold text-4xl text-black">
        Create an account
      </h1>
      <h4 className="text-gray-500 text-center font-semibold">
        Fill up a quick form to get personalized guidance
      </h4>

      <form
        action="signup"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 mx-auto w-full max-w-md"
      >
        {/* Name */}
        <input
          type="text"
          placeholder="Name"
          className={`border-2 p-2 rounded-md transition-all duration-500 ${
            errors.name
              ? "border-red-500 shadow shadow-red-300"
              : "border-gray-300"
          }`}
          {...register("name", { required: "Name is required" })}
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className={`border-2 p-2 rounded-md transition-all duration-500 ${
            errors.email
              ? "border-red-500 shadow shadow-red-300"
              : "border-gray-300"
          }`}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format",
            },
          })}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className={`border-2 p-2 rounded-md transition-all duration-500 ${
            errors.password
              ? "border-red-500 shadow shadow-red-300"
              : "border-gray-300"
          }`}
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />

        {/* Height, Weight, Age */}
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Height (cm)"
            className={`border-2 p-2 rounded-md w-full transition-all duration-500 ${
              errors.height
                ? "border-red-500 shadow shadow-red-300"
                : "border-gray-300"
            }`}
            {...register("height", { required: "Height is required" })}
          />
          <input
            type="number"
            placeholder="Weight (kg)"
            className={`border-2 p-2 rounded-md w-full transition-all duration-500 ${
              errors.weight
                ? "border-red-500 shadow shadow-red-300"
                : "border-gray-300"
            }`}
            {...register("weight", { required: "Weight is required" })}
          />
          <input
            type="number"
            placeholder="Age (yrs)"
            className={`border-2 p-2 rounded-md w-full transition-all duration-500 ${
              errors.age
                ? "border-red-500 shadow shadow-red-300"
                : "border-gray-300"
            }`}
            {...register("age", { required: "Age is required" })}
          />
        </div>

        {/* Gender */}
        <div className="flex items-center gap-2">
          <label htmlFor="gender" className="w-1/3 text-gray-700 font-medium">
            Gender:
          </label>
          <select
            className={`border-2 p-2 rounded-md w-2/3 transition-all duration-500 ${
              errors.gender
                ? "border-red-500 shadow shadow-red-300"
                : "border-gray-300"
            }`}
            {...register("gender", { required: "Gender is required" })}
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Goal */}
        <div className="flex items-center gap-2">
          <label htmlFor="goal" className="w-1/3 text-gray-700 font-medium">
            Goal:
          </label>
          <select
            className={`border-2 p-2 rounded-md w-2/3 transition-all duration-500 ${
              errors.goal
                ? "border-red-500 shadow shadow-red-300"
                : "border-gray-300"
            }`}
            {...register("goal", { required: "Goal is required" })}
          >
            <option value="">Select</option>
            <option value="gain">Gain</option>
            <option value="lose">Lose</option>
            <option value="maintain">Maintain</option>
          </select>
        </div>

        {/* Activity */}
        <div className="flex items-center gap-2">
          <label htmlFor="activity" className="w-1/3 text-gray-700 font-medium">
            Activity:
          </label>
          <select
            className={`border-2 p-2 rounded-md w-2/3 transition-all duration-500 ${
              errors.activity
                ? "border-red-500 shadow shadow-red-300"
                : "border-gray-300"
            }`}
            {...register("activity", {
              required: "Activity level is required",
            })}
          >
            <option value="">Select</option>
            <option value="sedentary">Sedentary</option>
            <option value="moderate">Moderate</option>
            <option value="active">Active</option>
          </select>
        </div>

        {/* Submit */}
        <input
          type="submit"
          value="Submit"
          className="bg-black p-3 rounded-md cursor-pointer text-white tracking-tighter transition-all duration-500 hover:bg-gray-800"
        />
      </form>
    </div>
  );
}

export default Signup;
