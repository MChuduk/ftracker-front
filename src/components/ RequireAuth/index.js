import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const RequireAuth = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { getCurrentUser } = useAuth();

  useEffect(() => {
    getCurrentUser((error, user) => {
      console.log("current user", user);
      if (user) {
        setUser(user); 
      }
      setLoading(false);
    });
  }, []);

  if (loading) return;

  return user ? children : <Navigate to={"/signIn"} />;
};

export { RequireAuth };
