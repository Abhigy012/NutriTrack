import { useState } from "react";
import background from "/images/image1.jpg";
import Signup from "../components/Signup";
import Login from "../components/Login";

const AuthPage = () => {
  let [account, setAccount] = useState(false);

  return (
    <div className="flex md:min-h-screen w-full bg-slate-200 p-10">
      <div className="flex flex-col-reverse md:flex-row w-full max-w-7xl mx-auto bg-white rounded-4xl p-7 shadow-md select-none">
        {/* Form Side */}
        <div className="w-full md:w-1/2 flex flex-col justify-center transition-all duration-500">
          {account ? <Login /> : <Signup />}
          <span className="text-gray-400 text-center mt-4 font-semibold">
            {account ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              className="text-black cursor-pointer font-bold"
              onClick={() => setAccount((prev) => !prev)}
            >
              {account ? "Signup" : "Login"}
            </button>
          </span>
        </div>

        {/* Image Side */}
        <div
          className="w-full md:w-1/2 h-64 md:h-auto bg-cover bg-center rounded-md"
          style={{ backgroundImage: `url(${background})` }}
        ></div>
      </div>
    </div>
  );
};

export default AuthPage;
