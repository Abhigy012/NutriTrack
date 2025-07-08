import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const url = import.meta.env.VITE_API_URL;
function Login() {
  let navigate = useNavigate();
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
      let response = await fetch(`${url}/auth/login`, {
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
        console.error("Login error:", result.error);
      }
    } catch (err) {
      setError("Network error or server unavailable");
      console.error("Fetch error:", err);
    }
  };

  return (
    <div
      id="loginform"
      className="flex flex-col justify-center items-center gap-4 w-full"
    >
      {error && (
        <p className="bg-red-200 text-red-600 text-center p-2 rounded-md">
          {error}
        </p>
      )}
      <h1 className="text-center font-bold text-4xl text-black">
        Login to your account
      </h1>
      <h4 className="text-gray-500 text-center font-semibold">
        Get back on track!
      </h4>

      <form
        action="Login"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 mx-auto w-full max-w-md"
      >
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
            required: true,
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
            required: true,
            minLength: {
              value: 8,
            },
          })}
        />
        <input
          type="submit"
          value="Submit"
          className="bg-black p-3 rounded-md cursor-pointer text-white tracking-tighter transition-all duration-500 hover:bg-gray-800"
        />
      </form>
    </div>
  );
}
export default Login;
