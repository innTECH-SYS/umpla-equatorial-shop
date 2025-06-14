
import { Button } from '@/components/ui/button';
import { 
  Home,
  Package,
  ShoppingCart,
  CreditCard,
  Store,
  Users,
  Plus
} from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onAddProductClick: () => void;
  onProductsClick: () => void;
  onPaymentMethodsClick: () => void;
  onCustomizeStoreClick: () => void;
  onReferralsClick: () => void;
}

export const MobileBottomNav = ({
  activeTab,
  onTabChange,
  onAddProductClick,
  onProductsClick,
  onPaymentMethodsClick,
  onCustomizeStoreClick,
  onReferralsClick
}: MobileBottomNavProps) => {
  const tabs = [
    { 
      id: 'home', 
      icon: <Home className="h-5 w-5" />, 
      label: 'Inicio',
      onClick: () => onTabChange('home')
    },
    { 
      id: 'products', 
      icon: <Package className="h-5 w-5" />, 
      label: 'Productos',
      onClick: onProductsClick
    },
    { 
      id: 'add', 
      icon: <Plus className="h-6 w-6" />, 
      label: 'Añadir',
      onClick: onAddProductClick,
      isSpecial: true
    },
    { 
      id: 'orders', 
      icon: <ShoppingCart className="h-5 w-5" />, 
      label: 'Pedidos',
      onClick: () => onTabChange('orders')
    },
    { 
      id: 'more', 
      icon: <Store className="h-5 w-5" />, 
      label: 'Más',
      onClick: () => onTabChange('more')
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-50 lg:hidden">
      <div className="flex justify-around items-center">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant="ghost"
            size="sm"
            className={`flex flex-col items-center gap-1 h-auto py-2 px-3 min-w-0 ${
              tab.isSpecial 
                ? 'bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3'
                : activeTab === tab.id 
                  ? 'text-blue-600' 
                  : 'text-gray-600'
            }`}
            onClick={tab.onClick}
          >
            {tab.icon}
            {!tab.isSpecial && (
              <span className="text-xs font-medium">{tab.label}</span>
            )}
          </Button>
        ))}
      </div>
    </div>
  );
};
