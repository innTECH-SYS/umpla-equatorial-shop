
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Package, CreditCard, Store, Users } from 'lucide-react';

interface QuickActionsProps {
  onAddProductClick: () => void;
  onPaymentMethodsClick: () => void;
  onCustomizeStoreClick: () => void;
  onReferralsClick: () => void;
}

export const QuickActions = ({ 
  onAddProductClick, 
  onPaymentMethodsClick, 
  onCustomizeStoreClick,
  onReferralsClick 
}: QuickActionsProps) => {
  return (
    <Card className="p-4 sm:p-6 bg-white border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Primeros pasos</h3>
      <div className="space-y-3">
        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
          <Package className="h-5 w-5 text-blue-600 mr-3" />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">Añadir tu primer producto</p>
            <p className="text-xs text-gray-600">Comienza subiendo productos a tu tienda</p>
          </div>
          <Button 
            size="sm" 
            variant="outline"
            onClick={onAddProductClick}
          >
            Añadir
          </Button>
        </div>
        
        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
          <CreditCard className="h-5 w-5 text-green-600 mr-3" />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">Configurar pagos</p>
            <p className="text-xs text-gray-600">Acepta pagos de tus clientes</p>
          </div>
          <Button 
            size="sm" 
            variant="outline"
            onClick={onPaymentMethodsClick}
          >
            Configurar
          </Button>
        </div>
        
        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
          <Store className="h-5 w-5 text-purple-600 mr-3" />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">Personalizar tienda</p>
            <p className="text-xs text-gray-600">Cambia colores, logo y diseño</p>
          </div>
          <Button 
            size="sm" 
            variant="outline"
            onClick={onCustomizeStoreClick}
          >
            Personalizar
          </Button>
        </div>

        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
          <Users className="h-5 w-5 text-indigo-600 mr-3" />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">Programa de referidos</p>
            <p className="text-xs text-gray-600">Invita amigos y gana productos extra</p>
          </div>
          <Button 
            size="sm" 
            variant="outline"
            onClick={onReferralsClick}
          >
            Ver referidos
          </Button>
        </div>
      </div>
    </Card>
  );
};
