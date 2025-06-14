
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

export const useUserPlan = () => {
  const [userPlan, setUserPlan] = useState<string>('basic');
  const [loading, setLoading] = useState(true);
  const [kycStatus, setKycStatus] = useState<'none' | 'pending' | 'verified' | 'rejected'>('none');
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserPlan = async () => {
      if (!user) {
        setUserPlan('basic');
        setKycStatus('none');
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
          setKycStatus('none');
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

        // Simulación del estado KYC (aquí se consultaría una tabla real)
        // Por ahora solo simulamos estados para usuarios con planes de pago
        const planName = plan?.nombre.toLowerCase() || 'basic';
        if (planName === 'professional' || planName === 'premium') {
          // Simular diferentes estados KYC
          const randomStatus = Math.random();
          if (randomStatus > 0.7) setKycStatus('verified');
          else if (randomStatus > 0.5) setKycStatus('pending');
          else setKycStatus('none');
        } else {
          setKycStatus('none');
        }
      } catch (error) {
        console.error('Error fetching user plan:', error);
        setUserPlan('basic');
        setKycStatus('none');
      } finally {
        setLoading(false);
      }
    };

    fetchUserPlan();
  }, [user]);

  const isPaidPlan = userPlan === 'professional' || userPlan === 'premium';
  const canManageStock = isPaidPlan;
  
  // Límites de imágenes por plan
  const maxImages = userPlan === 'basic' ? 2 : userPlan === 'professional' ? 5 : 10;
  
  // Límites de productos por plan
  const maxProducts = userPlan === 'basic' ? 10 : userPlan === 'professional' ? 50 : 100;

  return {
    userPlan,
    loading,
    isPaidPlan,
    canManageStock,
    maxImages,
    maxProducts,
    kycStatus,
    isVerified: kycStatus === 'verified'
  };
};
