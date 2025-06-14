
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Order {
  id: string;
  numero_pedido: string;
  nombre_cliente: string;
  telefono_cliente: string;
  direccion_entrega: string;
  estado: 'pendiente' | 'confirmado' | 'preparando' | 'enviado' | 'entregado' | 'cancelado';
  total: number;
  divisa: string;
  fecha_pedido: string;
  metodo_pago: string;
  items_count?: number;
}

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchOrders = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      // Primero obtener la tienda del usuario
      const { data: tienda, error: tiendaError } = await supabase
        .from('tiendas')
        .select('id')
        .eq('usuario_id', user.id)
        .single();

      if (tiendaError || !tienda) {
        console.log('No store found for user');
        setOrders([]);
        return;
      }

      // Obtener pedidos con conteo de items
      const { data: pedidos, error } = await supabase
        .from('pedidos')
        .select(`
          id,
          numero_pedido,
          nombre_cliente,
          telefono_cliente,
          direccion_entrega,
          estado,
          total,
          divisa,
          fecha_pedido,
          metodo_pago,
          pedido_items(id)
        `)
        .eq('tienda_id', tienda.id)
        .order('fecha_pedido', { ascending: false });

      if (error) throw error;

      const ordersWithCount = pedidos?.map(order => ({
        ...order,
        items_count: order.pedido_items?.length || 0
      })) || [];

      setOrders(ordersWithCount);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los pedidos",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: Order['estado']) => {
    try {
      const { error } = await supabase
        .from('pedidos')
        .update({ 
          estado: newStatus,
          fecha_confirmacion: newStatus === 'confirmado' ? new Date().toISOString() : undefined,
          fecha_entrega_real: newStatus === 'entregado' ? new Date().toISOString() : undefined
        })
        .eq('id', orderId);

      if (error) throw error;

      toast({
        title: "Estado actualizado",
        description: `El pedido ha sido marcado como ${newStatus}`
      });

      // Refrescar los pedidos
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
      toast({
        title: "Error",
        description: "No se pudo actualizar el estado del pedido",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  return {
    orders,
    loading,
    refetch: fetchOrders,
    updateOrderStatus
  };
};
