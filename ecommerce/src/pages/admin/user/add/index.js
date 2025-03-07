import { useState } from "react";
import { useRouter } from "next/router";
import { register } from "@/services/userService";
import { useToast } from "@/services/ToastService";
import RegisterUser from "@/components/organisms/RegisterUser";

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
      if (response.status != 200) {
        showToast("error during register");
      }
      showToast("User register Success");

      router.push("/admin/user");
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="border border-gray-300 p-6 rounded-lg shadow-lg bg-white">
        <RegisterUser onSubmit={handleRegister} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default LoginPage;
