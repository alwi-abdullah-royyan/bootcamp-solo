const UserForm = ({ formData, setFormData, onSubmit, loading, error, success, isAdmin }) => {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="my-10 bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-center text-white">{isAdmin ? "Edit User" : "Edit Profile"}</h1>

      {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      {success && <p className="text-green-500 text-center mt-2">{success}</p>}

      <form onSubmit={onSubmit} className="space-y-4 mt-4">
        {/* Username */}
        <div>
          <label className="block font-semibold text-white">Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 text-black rounded-md"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-semibold text-white">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 text-black rounded-md"
          />
        </div>

        {/* Role (Only visible to Admins) */}
        {isAdmin && (
          <div>
            <label className="block font-semibold text-white">Role:</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 text-black rounded-md"
            >
              <option value="CUSTOMER">Customer</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
        )}

        {/* Password */}
        <div>
          <label className="block font-semibold text-white">New Password (Optional):</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 text-black rounded-md"
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block font-semibold text-white">Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 text-black rounded-md"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-600 text-white py-2 rounded-md ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-800"
          }`}
        >
          {loading ? "Updating..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
