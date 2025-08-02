import { useState, useEffect } from "react";
import useUser from "../contexts/UserContext";

const UserDashboard = () => {
  const { user, loading } = useUser();
  if (loading) {
    return <p>Loading...</p>;
  }
  if (!user) {
    return <p>You are not Logged in!</p>;
  }
  return <h1>Welcome , {user.name}</h1>;
};

export default UserDashboard;
