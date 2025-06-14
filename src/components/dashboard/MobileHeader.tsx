
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';

interface MobileHeaderProps {
  storeName: string;
  activeTab: string;
}

export const MobileHeader = ({ storeName, activeTab }: MobileHeaderProps) => {
  const getTitle = () => {
    switch (activeTab) {
      case 'home':
        return `¡Hola, ${storeName}!`;
      case 'products':
        return 'Mis Productos';
      case 'orders':
        return 'Mis Pedidos';
      case 'more':
        return 'Configuración';
      default:
        return `¡Hola, ${storeName}!`;
    }
  };

  const getSubtitle = () => {
    switch (activeTab) {
      case 'home':
        return 'Gestiona tu tienda desde Guinea Ecuatorial';
      case 'products':
        return 'Administra tu inventario';
      case 'orders':
        return 'Revisa tus ventas y pedidos';
      case 'more':
        return 'Opciones adicionales';
      default:
        return 'Gestiona tu tienda desde Guinea Ecuatorial';
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 lg:hidden sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-bold text-gray-900 truncate">{getTitle()}</h1>
          <p className="text-sm text-gray-600 truncate">{getSubtitle()}</p>
        </div>
        
        <Button variant="ghost" size="sm" className="p-2 flex-shrink-0">
          <Bell className="h-5 w-5 text-gray-600" />
        </Button>
      </div>
    </header>
  );
};
