
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Package, Eye, ShoppingCart, TrendingUp } from 'lucide-react';
import { useOrders } from '@/hooks/useOrders';
import { useUserPlan } from '@/hooks/useUserPlan';

export const StatsGrid = () => {
  const { orders } = useOrders();
  const { userPlan, maxProducts } = useUserPlan();

  // Calcular estadísticas reales
  const totalOrders = orders.length;
  const totalRevenue = orders
    .filter(order => order.estado === 'entregado')
    .reduce((sum, order) => sum + order.total, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'XAF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount).replace('XAF', 'XAF');
  };

  const stats = [
    { 
      title: 'Productos publicados', 
      value: `0/${maxProducts}`, 
      subtitle: `Límite del plan ${userPlan}`,
      icon: <Package className="h-5 w-5 text-blue-600" />
    },
    { 
      title: 'Ingresos totales', 
      value: formatCurrency(totalRevenue), 
      subtitle: 'Pedidos entregados',
      icon: <TrendingUp className="h-5 w-5 text-green-600" />
    },
    { 
      title: 'Pedidos', 
      value: totalOrders.toString(), 
      subtitle: 'Total de pedidos',
      icon: <ShoppingCart className="h-5 w-5 text-purple-600" />
    },
    { 
      title: 'Plan actual', 
      value: userPlan.charAt(0).toUpperCase() + userPlan.slice(1), 
      subtitle: 'Actualizar para más funciones',
      icon: <Eye className="h-5 w-5 text-orange-600" />,
      hasButton: true
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="p-4 sm:p-6 bg-white border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              {stat.icon}
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900 mt-1 truncate">{stat.value}</p>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 mb-3">{stat.subtitle}</p>
          {stat.hasButton && (
            <Button size="sm" variant="outline" className="w-full text-xs border-blue-200 text-blue-600 hover:bg-blue-50">
              Actualizar plan
            </Button>
          )}
        </Card>
      ))}
    </div>
  );
};
