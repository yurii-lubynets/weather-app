import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import useAuth from './useAuth';

const useLogout = (): () => Promise<void> => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = useCallback(async (): Promise<void> => {
    try {
      await logout();
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  }, [logout, navigate]);

  return handleLogout;
};

export default useLogout;
