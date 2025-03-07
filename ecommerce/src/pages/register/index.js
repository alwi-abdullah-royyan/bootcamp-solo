import { useState } from "react";
import { useRouter } from "next/router";
import RegisterForm from "../../components/templates/RegisterForm";
import { register } from "@/services/userService";
import { useToast } from "@/services/ToastService";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { showToast } = useToast();
  const handleRegister = async ({ username, email, password, confirmPassword }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await register(username, email, password, confirmPassword);
      console.log(response);

      if (response.status != 200) {
        setError("error during register");
        return;
      }
      showToast("Register Success");

      router.push("/login");
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return <RegisterForm onSubmit={handleRegister} loading={loading} error={error} />;
};

export default LoginPage;
