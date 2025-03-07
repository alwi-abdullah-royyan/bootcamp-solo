import { useRouter } from "next/router";

const UserCard = ({ user }) => {
  const router = useRouter();

  return (
    <div
      className="border text-black rounded-lg p-4 shadow-sm bg-white cursor-pointer"
      onClick={() => router.push(`/admin/user/detail/${user.id}`)}
    >
      <h3 className="text-lg font-semibold">{user.username}</h3>
      <p className="text-sm text-gray-600">{user.email}</p>
      <p className="font-bold text-blue-500">{user.role}</p>
      <p className="text-sm text-gray-500">Created: {user.createdAt}</p>
      <p className="text-sm text-gray-500">Updated: {user.updatedAt}</p>
    </div>
  );
};

export default UserCard;
