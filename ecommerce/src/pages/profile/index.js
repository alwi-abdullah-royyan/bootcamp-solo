import { useUser } from "@/hooks/useAuth";
import { deleteUser } from "@/services/userService";
import { getToken } from "@/services/authService";
import { useRouter } from "next/router";
import { useToast } from "@/services/ToastService";
import UserInfo from "@/components/molecules/UserInfo";

const UserProfile = () => {
  const { user, loading, error } = useUser();
  const token = getToken();
  const router = useRouter();
  const { showToast } = useToast();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete your account? This action cannot be undone.")) return;
    try {
      await deleteUser(user.id, token);
      showToast("Account deleted successfully.");
      router.push("/");
    } catch (err) {
      showToast("Failed to delete account.", "error");
    }
  };

  return (
    <UserInfo
      user={user}
      loading={loading}
      error={error}
      onEdit={() => router.push("/profile/edit")}
      onDelete={handleDelete}
      isAdmin={false}
    />
  );
};

export default UserProfile;
