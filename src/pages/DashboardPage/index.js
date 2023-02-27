import styles from "./DashboardPage.module.scss";
import { useLazyQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { CURRENT_USER_QUERY } from "../../components/AuthProvider/queries/currentUser";
import { useAuth } from "../../hooks/useAuth";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [getUserQuery] = useLazyQuery(CURRENT_USER_QUERY, {
    fetchPolicy: "network-only",
  });
  const { logout, getCurrentUser, dispatchGraphqlRequest } = useAuth();

  const logoutHandler = () => {
    logout((error, data) => {
      if (error) {
        return;
      }
      navigate("/signIn");
    });
  };

  const currentUserHandler = () => {
    dispatchGraphqlRequest(getUserQuery, (error, data) => {
      if (error) {
        return;
      }
      console.log("data user", data);
    });
    // getCurrentUser(
    //   (error, user) => {
    //     if (error) {
    //       console.log("error -> ", error);
    //       return;
    //     }
    //     console.log("USER", user);
    //   },
    //   { refetch: true }
    // );
  };

  return (
    <div>
      <p>dashboard</p>
      <button onClick={logoutHandler}>Logout</button>
      <button onClick={currentUserHandler}>Get Current User</button>
    </div>
  );
};

export { DashboardPage };
