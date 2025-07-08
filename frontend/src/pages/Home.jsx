import { useNavigate } from "react-router-dom";

const Home = () => {
  let navigate = useNavigate();
  return (
    <div className="min-h-screen w-full flex justify-center bg-slate-600 items-center text-white gap-5">
      <h1 className="font-bold underline tracking-tighter">This is home!</h1>
      <button onClick={() => navigate("/auth")} className="cursor-pointer">
        Go to login route
      </button>
    </div>
  );
};
export default Home;
