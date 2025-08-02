import useUser from "../contexts/UserContext";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
const Home = () => {
  let { user, loading } = useUser();
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="min-h-screen w-full flex justify-center bg-slate-600 items-center text-white gap-5">
      <h1 className="font-bold underline tracking-tighter">This is home!</h1>
      {user ? (
        <Link to="/dashboard">Go to dashboard!</Link>
      ) : (
        <Link to="/auth">Go to authForm!</Link>
      )}
    </div>
  );
};
export default Home;
