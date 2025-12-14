import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useAuthStore } from '@/store/authStore';

export const useAuth = () => {
  const { data: session, status } = useSession();
  const { user, isAuthenticated, isLoading, setUser, setLoading, logout } = useAuthStore();

  useEffect(() => {
    setLoading(status === 'loading');

    if (status === 'authenticated' && session?.user) {
      setUser({
        id: session.user.id || '',
        email: session.user.email || '',
        name: session.user.name || undefined,
      });
    } else if (status === 'unauthenticated') {
      setUser(null);
    }
  }, [session, status, setUser, setLoading]);

  return {
    user,
    isAuthenticated,
    isLoading: status === 'loading' || isLoading,
    logout,
  };
};