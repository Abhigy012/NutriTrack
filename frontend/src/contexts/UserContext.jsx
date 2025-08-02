// context/UserContext.js
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // optional
  const fetchUser = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
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

  return (
    <UserContext.Provider value={{ user, setUser, loading, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};
const useUser = () => useContext(UserContext);
export default useUser;
