import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Package, Clock, Truck, CheckCircle, Eye, MoreVertical, RefreshCw } from 'lucide-react';
import { useOrders } from '@/hooks/useOrders';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';

export const MobileOrdersView = () => {
  const { orders, loading, refetch, updateOrderStatus } = useOrders();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pendiente':
        return <Clock className="h-4 w-4" />;
      case 'confirmado':
      case 'preparando':
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
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmado':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'preparando':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'enviado':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'entregado':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelado':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'XAF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount).replace('XAF', 'XAF');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getStatusTransitions = (currentStatus: string) => {
    const transitions: Record<string, string[]> = {
      'pendiente': ['confirmado', 'cancelado'],
      'confirmado': ['preparando', 'cancelado'],
      'preparando': ['enviado', 'cancelado'],
      'enviado': ['entregado'],
      'entregado': [],
      'cancelado': []
    };
    return transitions[currentStatus] || [];
  };

  if (loading) {
    return (
      <div className="p-4 space-y-4 pb-20">
        <div className="flex items-center justify-center py-8">
          <RefreshCw className="h-6 w-6 animate-spin text-gray-400" />
          <span className="ml-2 text-gray-500">Cargando pedidos...</span>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="p-4 pb-20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Mis Pedidos</h2>
          <Button variant="outline" size="sm" onClick={refetch}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualizar
          </Button>
        </div>
        <Card className="p-8 text-center">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay pedidos aún</h3>
          <p className="text-gray-500">Cuando recibas tu primer pedido aparecerá aquí</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 pb-20">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Mis Pedidos</h2>
        <Button variant="outline" size="sm" onClick={refetch}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Actualizar
        </Button>
      </div>

      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="space-y-3 pr-2">
          {orders.map((order) => (
            <Card key={order.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900 text-sm">{order.numero_pedido}</span>
                  <Badge className={`flex items-center gap-1 text-xs border ${getStatusColor(order.estado)}`}>
                    {getStatusIcon(order.estado)}
                    {order.estado}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-blue-600">{formatCurrency(order.total)}</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        Ver detalles
                      </DropdownMenuItem>
                      {getStatusTransitions(order.estado).map((status) => (
                        <DropdownMenuItem
                          key={status}
                          onClick={() => updateOrderStatus(order.id, status as any)}
                        >
                          {getStatusIcon(status)}
                          <span className="ml-2">Marcar como {status}</span>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p><span className="font-medium text-gray-700">Cliente:</span></p>
                    <p className="truncate">{order.nombre_cliente}</p>
                  </div>
                  <div>
                    <p><span className="font-medium text-gray-700">Teléfono:</span></p>
                    <p>{order.telefono_cliente || 'No especificado'}</p>
                  </div>
                </div>
                
                <div>
                  <p><span className="font-medium text-gray-700">Dirección:</span></p>
                  <p className="text-xs bg-gray-50 p-2 rounded border">{order.direccion_entrega}</p>
                </div>
                
                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-4 text-xs">
                    <span><strong>{order.items_count || 0}</strong> productos</span>
                    <span>Pago: <strong>{order.metodo_pago || 'No especificado'}</strong></span>
                  </div>
                  <span className="text-xs text-gray-500">{formatDate(order.created_at)}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
