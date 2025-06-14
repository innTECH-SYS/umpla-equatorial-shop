
import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Manejar tokens en la URL (confirmación de email)
    const handleAuthCallback = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error getting session:', error);
      }
      if (data.session) {
        setSession(data.session);
        setUser(data.session.user);
        // Limpiar la URL de los tokens
        window.history.replaceState({}, document.title, window.location.pathname);
      }
      setLoading(false);
    };

    // Configurar listener de cambios de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        // Si es una confirmación de signup, redirigir al dashboard
        if (event === 'SIGNED_IN' && session) {
          window.history.replaceState({}, document.title, '/dashboard');
        }
      }
    );

    // Verificar si hay tokens en la URL al cargar
    if (window.location.hash) {
      handleAuthCallback();
    } else {
      // Obtener sesión actual si no hay tokens en la URL
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      });
    }

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
    }
  };

  return {
    user,
    session,
    loading,
    signOut
  };
};
