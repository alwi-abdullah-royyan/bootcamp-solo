import { useState } from "react";
import { isAdminUser, login, isAuthenticated, getCurrentUser } from "../../services/authService"; // Ensure these functions work correctly
import { useRouter } from "next/router";
import LoginPageTemplate from "../../components/templates/LoginFormTemplate";
import { useToast } from "@/services/ToastService";
import { useDispatch } from "react-redux";
import { setAuthState } from "@/redux/authSlice/authSlice";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { delayedToast } = useToast();
  const dispatch = useDispatch();

  const handleLogin = async ({ username, password }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await login(username, password);
      const token = response.data.token;

      // ✅ Store token first
      localStorage.setItem("token", token);

      // ✅ Wait for token to be stored before checking auth state
      setTimeout(() => {
        const userData = {
          authStatus: isAuthenticated(),
          username: getCurrentUser(),
          isAdmin: isAdminUser(),
        };

        // ✅ Dispatch updated auth state to Redux
        dispatch(setAuthState(userData));

        delayedToast("Welcome!");
        router.push("/");
      }, 0); // Allow time for token to be stored
    } catch (err) {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return <LoginPageTemplate onSubmit={handleLogin} loading={loading} error={error} />;
};

export default LoginPage;
