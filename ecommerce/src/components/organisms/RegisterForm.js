import { useState } from "react";
import InputField from "../molecules/InputField";
import Button from "../atoms/ButtonOnclick";
import FormError from "../molecules/FormError";
import Link from "next/link";

const LoginForm = ({ onSubmit, loading, error }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ username, email, password, confirmPassword });
  };

  return (
    <form onSubmit={handleSubmit} className="text-black">
      <h2 className="text-2xl font-semibold mb-4">Register</h2>
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
        label="Email"
        type="email"
        placeholder="Enter your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        name="email"
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
      <InputField
        label="Confirm Password"
        type="password"
        placeholder="Enter your password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        name="confirmPassword"
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
        already have an account?{" "}
        <Link href="/login" className="text-blue-800 hover:underline">
          login
        </Link>{" "}
      </p>
    </form>
  );
};

export default LoginForm;
