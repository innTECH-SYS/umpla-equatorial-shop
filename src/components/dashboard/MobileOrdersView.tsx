
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, Clock, Truck, CheckCircle } from 'lucide-react';

export const MobileOrdersView = () => {
  // Datos de ejemplo para los pedidos
  const orders = [
    {
      id: 'ORD-001',
      customer: 'María García',
      total: 45.99,
      status: 'pendiente',
      items: 3,
      date: '2024-06-14'
    },
    {
      id: 'ORD-002',
      customer: 'Carlos López',
      total: 89.50,
      status: 'confirmado',
      items: 2,
      date: '2024-06-13'
    },
    {
      id: 'ORD-003',
      customer: 'Ana Rodríguez',
      total: 123.75,
      status: 'enviado',
      items: 5,
      date: '2024-06-12'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pendiente':
        return <Clock className="h-4 w-4" />;
      case 'confirmado':
        return <Package className="h-4 w-4" />;
      case 'enviado':
        return <Truck className="h-4 w-4" />;
      case 'entregado':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmado':
        return 'bg-blue-100 text-blue-800';
      case 'enviado':
        return 'bg-purple-100 text-purple-800';
      case 'entregado':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-4 space-y-4 pb-20">
      {orders.length === 0 ? (
        <Card className="p-8 text-center">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay pedidos aún</h3>
          <p className="text-gray-500">Cuando recibas tu primer pedido aparecerá aquí</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <Card key={order.id} className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">{order.id}</span>
                  <Badge className={`flex items-center gap-1 ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    {order.status}
                  </Badge>
                </div>
                <span className="font-semibold text-gray-900">${order.total}</span>
              </div>
              
              <div className="space-y-1 text-sm text-gray-600">
                <p><span className="font-medium">Cliente:</span> {order.customer}</p>
                <p><span className="font-medium">Productos:</span> {order.items} artículos</p>
                <p><span className="font-medium">Fecha:</span> {order.date}</p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
