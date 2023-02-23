import { Link } from "react-router-dom";
import SignInForm from "../../components/Forms/SignInForm";

function SignInPage() {
  return (
    <div>
      <SignInForm />
      <Link to="/signUp">Sign Up</Link>
    </div>
  );
}

export default SignInPage;
