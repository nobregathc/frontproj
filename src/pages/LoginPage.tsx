import "../css/LoginPage.css";
import LoginForm from "../components/LoginForm";

function LoginPage() {
  return (
    <div className="login-container">
      <div className="login-box">
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
