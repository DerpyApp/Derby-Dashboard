import RegisterForm from '../../features/auth/components/RegisterForm';

export default function RegisterPage() {
  const handleRegisterSubmit = (data) => {
    // Proceed to Step 2
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0d0f12] p-4">
      <RegisterForm onSubmit={handleRegisterSubmit} />
    </div>
  );
}