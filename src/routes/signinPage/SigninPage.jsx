import { SignIn } from "@clerk/clerk-react";
import "./signinPage.css";

const SigninPage = () => {
  return (
    <div className="signinPage">
      <SignIn path="/sign-in" />
    </div>
  );
};

export default SigninPage;
