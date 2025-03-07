import LoginForm from "../organisms/LoginForm";

const LoginPageTemplate = ({ onSubmit, loading, error }) => (
  <div className="flex flex-col items-center justify-center h-screen">
    <div className="border border-gray-300 p-6 rounded-lg shadow-lg bg-white">
      <LoginForm onSubmit={onSubmit} loading={loading} error={error} />
    </div>
  </div>
);

export default LoginPageTemplate;
