
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

type UserRole = 'admin' | 'moderator' | 'user';

export const useUserRole = () => {
  const { user } = useAuth();
  const [role, setRole] = useState<UserRole>('user');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserRole = async () => {
      if (!user) {
        setRole('user');
        setLoading(false);
        return;
      }

      // Por ahora asumimos que solo desarrollos@inntech.gq es admin
      // Más tarde se puede implementar con la tabla user_roles
      if (user.email === 'desarrollos@inntech.gq') {
        setRole('admin');
      } else {
        setRole('user');
      }
      setLoading(false);
    };

    loadUserRole();
  }, [user]);

  const isAdmin = role === 'admin';
  const isModerator = role === 'moderator' || role === 'admin';

  return {
    role,
    isAdmin,
    isModerator,
    loading
  };
};
