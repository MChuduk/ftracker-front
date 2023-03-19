import { AuthService } from "../../api/auth-service";

const DashboardPage = () => {

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
