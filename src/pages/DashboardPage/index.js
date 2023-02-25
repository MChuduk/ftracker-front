import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { logout, getCurrentUser } = useAuth();


  const logoutHandler = () => {
    logout((error, data) => {
      if (error) {
        return;
      }
      navigate('/signIn');
    });
  }

  const currentUserHandler = () => {
    getCurrentUser((error, user) => {
      if(error) {
        console.log("error -> ", error);
        return;
      }
      console.log("USER", user);
    }, { refetch: true });
  }

  return (
    <div>
      <p>dashboard</p>
      <button onClick={logoutHandler}>Logout</button>
      <button onClick={currentUserHandler} >Get Current User</button>
    </div>
  );
}

export { DashboardPage };
