
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

export const useUserPlan = () => {
  const [userPlan, setUserPlan] = useState<string>('basic');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserPlan = async () => {
      if (!user) {
        setUserPlan('basic');
        setLoading(false);
        return;
      }

      try {
        // Primero obtener la tienda del usuario
        const { data: tienda, error: tiendaError } = await supabase
          .from('tiendas')
          .select('plan_id')
          .eq('usuario_id', user.id)
          .single();

        if (tiendaError || !tienda?.plan_id) {
          setUserPlan('basic');
          setLoading(false);
          return;
        }

        // Obtener información del plan
        const { data: plan, error: planError } = await supabase
          .from('planes')
          .select('nombre')
          .eq('id', tienda.plan_id)
          .single();

        if (planError || !plan) {
          setUserPlan('basic');
        } else {
          setUserPlan(plan.nombre.toLowerCase());
        }
      } catch (error) {
        console.error('Error fetching user plan:', error);
        setUserPlan('basic');
      } finally {
        setLoading(false);
      }
    };

    fetchUserPlan();
  }, [user]);

  const isPaidPlan = userPlan === 'professional' || userPlan === 'premium';
  const canManageStock = isPaidPlan;
  const maxImages = isPaidPlan ? Infinity : 2;

  return {
    userPlan,
    loading,
    isPaidPlan,
    canManageStock,
    maxImages
  };
};
