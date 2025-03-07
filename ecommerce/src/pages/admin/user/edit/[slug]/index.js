import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { updateUser } from "@/services/userService";
import { getToken } from "@/services/authService";
import { useUserById } from "@/hooks/useUser";
import UserForm from "@/components/molecules/UserForm";

export default function EditUserPage() {
  const router = useRouter();
  const { slug } = router.query;
  const token = getToken();

  const { data: user, loading, error } = useUserById(slug, token);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
  });

  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [errorUpdate, setErrorUpdate] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (user?.data) {
      setFormData({
        username: user.data.username || "",
        email: user.data.email || "",
        role: user.data.role || "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingUpdate(true);
    setErrorUpdate("");
    setSuccess("");

    try {
      const response = await updateUser(slug, formData, token);
      console.log(response);

      if (response?.status !== 200) {
        setErrorUpdate(response.response.data.message);
        setLoadingUpdate(false);
        return;
      }
      setSuccess("User updated successfully!");
      setTimeout(() => router.push("/admin/user"), 1000);
    } catch (err) {
      setErrorUpdate("Failed to update user.");
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
      isAdmin={true}
    />
  );
}
