import { useState } from "react";
import InputField from "../molecules/InputField";
import Button from "../atoms/ButtonOnclick";
import FormError from "../molecules/FormError";
import Link from "next/link";

const LoginForm = ({ onSubmit, loading, error }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ username, password });
  };

  return (
    <form onSubmit={handleSubmit} className="text-black">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <InputField
        label="Username"
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        name="username"
        className="p-2"
      />
      <InputField
        label="Password"
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        name="password"
        className="p-2"
      />
      <FormError message={error} />

      <Button
        label="Login"
        type="submit"
        disabled={loading}
        className="text-white px-5 py-2  bg-blue-700 rounded-md w-full"
      />
      <p className="p-2">
        don&apos;t have account?{" "}
        <Link href="/register" className="text-blue-800 hover:underline">
          register
        </Link>{" "}
      </p>
    </form>
  );
};

export default LoginForm;
