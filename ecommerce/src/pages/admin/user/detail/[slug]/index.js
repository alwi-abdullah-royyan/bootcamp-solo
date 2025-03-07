import { useUserById } from "@/hooks/useUser";
import { getToken } from "@/services/authService";
import { useRouter } from "next/router";
import { deleteUser } from "@/services/userService";
import { useToast } from "@/services/ToastService";
import UserInfo from "@/components/molecules/UserInfo";

export default function UserDetailsPage() {
  const router = useRouter();
  const { slug } = router.query;
  const token = getToken();
  const { showToast } = useToast();

  const { data, loading, error } = useUserById(slug, token);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;
    try {
      await deleteUser(slug, token);
      showToast("User deleted successfully.");
      router.push("/admin/user");
    } catch (err) {
      showToast("Failed to delete user.", "error");
    }
  };

  return (
    <UserInfo
      user={data?.data}
      loading={loading}
      error={error}
      onEdit={() => router.push(`/admin/user/edit/${slug}`)}
      onDelete={handleDelete}
      isAdmin={true}
    />
  );
}
