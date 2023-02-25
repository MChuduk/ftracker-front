import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();


  const logoutHandler = () => {
    logout((error, data) => {
      if (error) {
        return;
      }
      navigate('/signIn');
    });
  }

  return (
    <div>
      <p>dashboard</p>
      <button onClick={logoutHandler}>Logout</button>
    </div>
  );
}

export { DashboardPage };
