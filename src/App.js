import SignUpForm from "./components/Forms/SignUpForm";
import { Routes, Route, Link } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignUpPage/>} />
        <Route path="/signUp" element={<SignUpPage/>} />
        <Route path="/signIn" element={<SignInPage/>} />
      </Routes>
    </>
  );
}

export default App;
