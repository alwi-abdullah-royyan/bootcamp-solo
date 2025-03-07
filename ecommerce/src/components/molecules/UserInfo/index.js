const UserInfo = ({ user, loading, error, onEdit, onDelete, isAdmin }) => {
  if (loading) return <p className="text-center text-gray-400">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!user) return <p className="text-center text-gray-400">No user data found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-4 mt-4 bg-gray-900 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-white">
        {isAdmin ? "User Details (Admin)" : "User Profile"}
      </h2>

      <div className="p-4 bg-gray-800 rounded-md">
        <p className="text-white">
          <strong>ID:</strong> {user.id}
        </p>
        <p className="text-white">
          <strong>Username:</strong> {user.username}
        </p>
        <p className="text-white">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="text-white">
          <strong>Role:</strong> {user.role}
        </p>
        <p className="text-gray-400 text-sm">
          <strong>Joined:</strong> {new Date(user.createdAt).toLocaleString()}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-4">
        <button onClick={onEdit} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Edit Profile
        </button>

        <button onClick={onDelete} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
