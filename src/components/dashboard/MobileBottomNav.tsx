import { Home, Package, ShoppingCart, BarChart3, MoreHorizontal, Plus } from 'lucide-react';

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
  const navItems = [
    { id: 'home', label: 'Inicio', icon: Home },
    { id: 'products', label: 'Productos', icon: Package },
    { id: 'orders', label: 'Pedidos', icon: ShoppingCart },
    { id: 'analytics', label: 'Reportes', icon: BarChart3 },
    { id: 'more', label: 'Más', icon: MoreHorizontal }
  ];

  const handleTabClick = (tabId: string) => {
    if (tabId === 'products') {
      onProductsClick();
    } else {
      onTabChange(tabId);
    }
  };

  return (
    <>
      <nav className="bg-white border-t border-gray-200 px-4 py-2 flex items-center justify-around sticky bottom-0 z-50">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors ${
                isActive 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Floating Action Button */}
      <button
        onClick={onAddProductClick}
        className="fixed bottom-20 right-4 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-colors z-40"
        aria-label="Agregar producto"
      >
        <Plus className="h-6 w-6" />
      </button>
    </>
  );
};
