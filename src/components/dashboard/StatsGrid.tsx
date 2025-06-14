
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Package, Eye, ShoppingCart, TrendingUp } from 'lucide-react';

export const StatsGrid = () => {
  const stats = [
    { 
      title: 'Productos publicados', 
      value: '0/10', 
      subtitle: 'Límite del plan gratuito',
      icon: <Package className="h-5 w-5 text-blue-600" />
    },
    { 
      title: 'Visitas a la tienda', 
      value: '0', 
      subtitle: 'Últimos 30 días',
      icon: <Eye className="h-5 w-5 text-green-600" />
    },
    { 
      title: 'Pedidos', 
      value: '0', 
      subtitle: 'Total de pedidos',
      icon: <ShoppingCart className="h-5 w-5 text-purple-600" />
    },
    { 
      title: 'Plan actual', 
      value: 'Gratuito', 
      subtitle: 'Actualizar para más funciones',
      icon: <TrendingUp className="h-5 w-5 text-orange-600" />,
      hasButton: true
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="p-4 sm:p-6 bg-white border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              {stat.icon}
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
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
