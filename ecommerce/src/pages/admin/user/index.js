import { useState } from "react";
import { useAllUsers } from "@/hooks/useUser";
import { getToken } from "@/services/authService";
import UserList from "@/components/molecules/UserList";
import PaginationControls from "@/components/molecules/PaginationControls";

export default function UsersPage() {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const token = getToken();
  const { data, loading, error } = useAllUsers(page, size, token);
  console.log(data);

  return (
    <div className="max-w-6xl my-4 mx-auto px-4 pb-8">
      <h1 className="text-3xl font-bold text-center text-black mb-6">User List</h1>

      {/* Loading & Error Handling */}
      {loading && <p className="text-center">Loading users...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* User List */}
      {data && <UserList users={data.data} />}

      {/* Pagination Controls */}
      {<PaginationControls page={page} totalPages={data?.totalPages} setPage={setPage} />}
    </div>
  );
}
