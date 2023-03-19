import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthService } from "../../api/auth-service";

const RequireAuth = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await AuthService.getCurrentUser({ fields: "id" });
      setUser(userData);
      setLoading(false);
    }
    fetchUser();
  }, []);

  if (loading) return;

  return user ? children : <Navigate to={"/signIn"} />;
};

export { RequireAuth };
