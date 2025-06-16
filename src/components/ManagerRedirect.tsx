import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ManagerRedirect: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === 'manager') {
      navigate('/manager-dashboard', { replace: true });
    }
  }, [user, navigate]);

  return null;
};

export default ManagerRedirect; 