import { Routes, Route, Link } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import { PrivateRoute } from './components/PrivateRoute'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignInPage/>} />
        <Route path="/signUp" element={<SignUpPage/>} />
        <Route path="/signIn" element={<SignInPage/>} />
        <Route element={}>

        </Route>
      </Routes>
    </>
  );
}

export default App;
