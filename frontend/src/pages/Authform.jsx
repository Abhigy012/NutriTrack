import { Route, Routes, useNavigate } from "react-router-dom";
import useUser from "../contexts/UserContext";
import AuthPage from "./AuthPage";
import Loading from "../components/Loading";
function Authform() {
  let navigate = useNavigate();
  let { user, loading } = useUser();

  if (loading) {
    return <Loading />;
  }
  if (user) {
    navigate("/dashboard", { replace: true });
    return null;
  }
  return <AuthPage />;
}
export default Authform;
