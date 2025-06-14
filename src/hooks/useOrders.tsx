
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
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
  created_at: string;
  metodo_pago: string;
  notas?: string;
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
      
      // Obtener la tienda del usuario
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
      const { data: pedidosData, error: pedidosError } = await supabase
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
          created_at,
          metodo_pago,
          notas
        `)
        .eq('tienda_id', tienda.id)
        .order('created_at', { ascending: false });

      if (pedidosError) throw pedidosError;

      // Obtener conteo de items para cada pedido
      const ordersWithItemCount = await Promise.all(
        (pedidosData || []).map(async (pedido) => {
          const { count } = await supabase
            .from('pedido_items')
            .select('*', { count: 'exact', head: true })
            .eq('pedido_id', pedido.id);

          return {
            ...pedido,
            estado: pedido.estado as Order['estado'],
            items_count: count || 0
          };
        })
      );

      setOrders(ordersWithItemCount);
      console.log('Orders loaded from database:', ordersWithItemCount.length);
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
        .update({ estado: newStatus })
        .eq('id', orderId);

      if (error) throw error;

      // Actualizar estado local
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId 
            ? { ...order, estado: newStatus }
            : order
        )
      );

      toast({
        title: "Estado actualizado",
        description: `El pedido ha sido marcado como ${newStatus}`
      });

      console.log(`Order ${orderId} status updated to ${newStatus}`);
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
