
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { 
  Home,
  Package,
  ShoppingCart,
  CreditCard,
  HelpCircle,
  Menu,
  X,
  Store,
  Users
} from 'lucide-react';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  onPaymentMethodsClick: () => void;
  onCustomizeStoreClick: () => void;
  onReferralsClick: () => void;
  onProductsClick: () => void;
}

export const Sidebar = ({ 
  sidebarOpen, 
  setSidebarOpen, 
  onPaymentMethodsClick,
  onCustomizeStoreClick,
  onReferralsClick,
  onProductsClick
}: SidebarProps) => {
  const menuItems = [
    { icon: <Home className="h-5 w-5" />, label: 'Inicio', active: true },
    { icon: <Package className="h-5 w-5" />, label: 'Mis productos', onClick: onProductsClick },
    { icon: <ShoppingCart className="h-5 w-5" />, label: 'Pedidos' },
    { icon: <CreditCard className="h-5 w-5" />, label: 'Métodos de pago', onClick: onPaymentMethodsClick },
    { icon: <Store className="h-5 w-5" />, label: 'Configuración de tienda', onClick: onCustomizeStoreClick },
    { icon: <Users className="h-5 w-5" />, label: 'Referidos', onClick: onReferralsClick },
    { icon: <HelpCircle className="h-5 w-5" />, label: 'Soporte' },
  ];

  return (
    <>
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">U</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Umpla</span>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <nav className="mt-6">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className={`w-full flex items-center px-6 py-3 text-sm font-medium transition-colors text-left ${
                item.active
                  ? 'text-blue-600 bg-blue-50 border-r-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              {item.icon}
              <span className="ml-3">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <Card className="p-4 bg-blue-50 border-blue-200">
            <HelpCircle className="h-8 w-8 text-blue-600 mb-2" />
            <p className="text-sm font-medium text-gray-900 mb-1">¿Necesitas ayuda?</p>
            <p className="text-xs text-gray-600 mb-3">Contacta con nuestro equipo</p>
            <Button size="sm" variant="outline" className="w-full text-xs border-blue-200 text-blue-600 hover:bg-blue-100">
              Soporte 24/7
            </Button>
          </Card>
        </div>
      </div>

      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
};
