import { updateUser } from "@/services/userService";
import { getToken, logout } from "@/services/authService";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "@/hooks/useAuth";
import UserForm from "@/components/molecules/UserForm";
import { useToast } from "@/services/ToastService";

const EditProfile = () => {
  const { user, loading, error } = useUser();
  const token = getToken();
  const router = useRouter();
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [errorUpdate, setErrorUpdate] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password && formData.password !== formData.confirmPassword) {
      setErrorUpdate("Passwords do not match!");
      return;
    }

    setLoadingUpdate(true);
    setErrorUpdate("");
    setSuccess("");

    try {
      await updateUser(user.id, formData, token);
      setSuccess("Profile updated successfully!");
      showToast("Profile updated successfully, try relogin.");
      setTimeout(() => logout(), 1000);
    } catch (err) {
      setErrorUpdate("Failed to update profile.");
    }

    setLoadingUpdate(false);
  };

  return (
    <UserForm
      formData={formData}
      setFormData={setFormData}
      onSubmit={handleSubmit}
      loading={loadingUpdate}
      error={errorUpdate}
      success={success}
      isAdmin={false}
    />
  );
};

export default EditProfile;
