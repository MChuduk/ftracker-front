import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
    const isAuth = true;

    return isAuth ? <Outlet /> : <Navigate to="/signIn" />
}

export default PrivateRoute;