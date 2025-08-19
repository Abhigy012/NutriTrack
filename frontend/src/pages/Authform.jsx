import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useUser from "../contexts/UserContext.jsx";
import AuthPage from "./AuthPage.jsx";
import Loading from "../components/Loading.jsx";

function Authform() {
  const navigate = useNavigate();
  const { user, loading } = useUser();

  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  if (loading) {
    return <Loading />;
  }

  return <AuthPage />;
}

export default Authform;
