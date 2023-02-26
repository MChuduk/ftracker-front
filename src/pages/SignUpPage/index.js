import { Link } from "react-router-dom";
import { SignUpForm } from "../../components/Forms/SignUpForm";

function SignUpPage() {
  return (
    <div>
      <SignUpForm />
      <Link to="/signIn">Sign In</Link>
    </div>
  );
}

export default SignUpPage;
