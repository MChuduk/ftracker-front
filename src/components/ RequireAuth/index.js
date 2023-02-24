import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Navigate, Outlet, Route } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { CURRENT_USER_QUERY } from "../AuthProvider/queries/currentUser";

const RequireAuth = ({ children }) => {
  const [user, setUser] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const { getCurrentUser } = useAuth();

  useEffect(() => {
    getCurrentUser((error, user) => {
      if (user) setUser(user);
      setIsChecking(false);
    });
  }, [user]);

  if (isChecking) return;

  return user ? children : <Navigate to={"/signIn"} />;
};

export { RequireAuth };
