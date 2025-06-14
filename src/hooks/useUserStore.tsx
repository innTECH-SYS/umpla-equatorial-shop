
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface UserStore {
  id: string;
  nombre: string;
  activa: boolean;
}

export const useUserStore = () => {
  const { user } = useAuth();
  const [store, setStore] = useState<UserStore | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasStore, setHasStore] = useState(false);

  useEffect(() => {
    const loadUserStore = async () => {
      if (!user) {
        setStore(null);
        setHasStore(false);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('tiendas')
          .select('id, nombre, activa')
          .eq('usuario_id', user.id)
          .maybeSingle();

        if (error) {
          console.error('Error loading user store:', error);
          setStore(null);
          setHasStore(false);
        } else {
          setStore(data);
          setHasStore(!!data);
        }
      } catch (error) {
        console.error('Error loading user store:', error);
        setStore(null);
        setHasStore(false);
      } finally {
        setLoading(false);
      }
    };

    loadUserStore();
  }, [user]);

  return {
    store,
    hasStore,
    loading
  };
};
