import { Routes, Route, Link, Navigate } from "react-router-dom";
import { SignUpPage } from "./pages/SignUpPage";
import { SignInPage } from "./pages/SignInPage";
import { WalletsPage } from "./pages/WalletsPage";
import { DashboardPage } from "./pages/DashboardPage";
import { RequireAuth } from "./components/RequireAuth";
import { Layout } from "./components/Layout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/signIn" element={<SignInPage />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <Layout />
            </RequireAuth>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="wallets" element={<WalletsPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
