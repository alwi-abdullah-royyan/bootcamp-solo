import RegisterForm from "../organisms/RegisterForm";

const LoginPageTemplate = ({ onSubmit, loading, error }) => (
  <div className="flex flex-col items-center justify-center h-screen">
    <div className="border border-gray-300 p-6 rounded-lg shadow-lg bg-white">
      <RegisterForm onSubmit={onSubmit} loading={loading} error={error} />
    </div>
  </div>
);

export default LoginPageTemplate;
