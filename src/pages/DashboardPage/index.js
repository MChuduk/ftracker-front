import styles from "./DashboardPage.module.scss";
import { useLazyQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { CURRENT_USER_QUERY } from "../../components/AuthProvider/queries/currentUser";
import { useAuth } from "../../hooks/useAuth";
import { AuthService } from "../../api/auth-service";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [getUserQuery] = useLazyQuery(CURRENT_USER_QUERY, {
    fetchPolicy: "network-only",
  });
  const { logout, getCurrentUser, dispatchGraphqlRequest } = useAuth();

  const logoutHandler = async () => {
    const logoutData = await AuthService.logout({ fields: "id" });
    console.log("logout data", logoutData);
  };

  const currentUserHandler = async () => {
    const userData = await AuthService.getCurrentUser({ fields: "id" });
    console.log('userData: ', userData);
  };

  return (
    <div>
      <p>dashboard</p>
      <button onClick={() => AuthService.refreshTokens({ fields: "id" })}>Refresh tokens</button>
      <button onClick={logoutHandler}>Logout</button>
      <button onClick={currentUserHandler}>Get Current User</button>
    </div>
  );
};

export { DashboardPage };
