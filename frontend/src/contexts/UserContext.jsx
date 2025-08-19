// context/UserContext.js
import { createContext, useContext, useEffect, useState } from "react";
const url = import.meta.env.VITE_API_URL;

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // optional
  const fetchUser = async () => {
    try {
      const res = await fetch(`${url}/auth/me`, {
        method: "GET",
        credentials: "include", // needed for cookies/session
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        setUser(null); // not logged in
      }
    } catch (err) {
      console.error("Error fetching user:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  const logout = async () => {
  try {
    const res = await fetch(`${url}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    if (res.ok) {
      setUser(null);           // Clear user
      fetchUser();             // Refetch to confirm
    }
  } catch (error) {
    console.error("Logout failed:", error.message);
  }
};

  return (
    <UserContext.Provider value={{ user, setUser, loading, fetchUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => useContext(UserContext);
export default useUser;
