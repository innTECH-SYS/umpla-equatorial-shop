
import { useState, useEffect } from 'react';
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
  fecha_pedido: string;
  metodo_pago: string;
  items_count?: number;
}

// Datos simulados hasta que se implementen las migraciones SQL
const mockOrders: Order[] = [
  {
    id: '1',
    numero_pedido: 'ORD-001',
    nombre_cliente: 'María Nsue Obiang',
    telefono_cliente: '+240 222 123 456',
    direccion_entrega: 'Malabo, Bioko Norte, Guinea Ecuatorial',
    estado: 'pendiente',
    total: 15000,
    divisa: 'XAF',
    fecha_pedido: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    metodo_pago: 'Efectivo',
    items_count: 3
  },
  {
    id: '2',
    numero_pedido: 'ORD-002',
    nombre_cliente: 'Carlos Nguema Mba',
    telefono_cliente: '+240 333 987 654',
    direccion_entrega: 'Bata, Litoral, Guinea Ecuatorial',
    estado: 'confirmado',
    total: 25000,
    divisa: 'XAF',
    fecha_pedido: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    metodo_pago: 'Transferencia bancaria',
    items_count: 2
  },
  {
    id: '3',
    numero_pedido: 'ORD-003',
    nombre_cliente: 'Ana Ondo Bile',
    telefono_cliente: '+240 555 555 123',
    direccion_entrega: 'Ebebiyín, Kié-Ntem, Guinea Ecuatorial',
    estado: 'enviado',
    total: 18500,
    divisa: 'XAF',
    fecha_pedido: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    metodo_pago: 'Mobile Money',
    items_count: 1
  },
  {
    id: '4',
    numero_pedido: 'ORD-004',
    nombre_cliente: 'Pedro Ela Nchama',
    telefono_cliente: '+240 666 111 222',
    direccion_entrega: 'Mongomo, Wele-Nzas, Guinea Ecuatorial',
    estado: 'entregado',
    total: 32000,
    divisa: 'XAF',
    fecha_pedido: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    metodo_pago: 'Efectivo',
    items_count: 4
  },
  {
    id: '5',
    numero_pedido: 'ORD-005',
    nombre_cliente: 'Isabel Mangue Owono',
    telefono_cliente: '+240 777 333 444',
    direccion_entrega: 'Evinayong, Centro Sur, Guinea Ecuatorial',
    estado: 'preparando',
    total: 12500,
    divisa: 'XAF',
    fecha_pedido: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    metodo_pago: 'Transferencia bancaria',
    items_count: 2
  }
];

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchOrders = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      // Simular una pequeña demora para mostrar el loading
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Por ahora usamos datos simulados
      setOrders(mockOrders);
      
      console.log('Orders loaded:', mockOrders.length);
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
      // Simular actualización en datos locales
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
