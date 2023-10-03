import { LoginView } from "../loginView/login-view";

const LoginPage = () => {
  const handleLogin = () => {
    // Handle successful login
  };

  return <LoginView onLoggedIn={handleLogin} />;
};

export default LoginPage;
