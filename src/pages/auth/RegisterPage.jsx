import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@config/constants';
import RegisterForm from '../../features/auth/components/RegisterForm';

export default function RegisterPage() {
  const navigate = useNavigate();

  const handleRegisterSubmit = (formData) => {
    void formData;
    navigate(ROUTES.WELCOME);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0d0f12] p-4">
      <RegisterForm onSubmit={handleRegisterSubmit} />
    </div>
  );
}
