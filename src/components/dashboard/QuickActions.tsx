
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Package, CreditCard, Palette, Users } from 'lucide-react';

interface QuickActionsProps {
  onAddProductClick: () => void;
  onProductsClick: () => void;
  onPaymentMethodsClick: () => void;
  onCustomizeStoreClick: () => void;
  onReferralsClick: () => void;
}

export const QuickActions = ({
  onAddProductClick,
  onProductsClick,
  onPaymentMethodsClick,
  onCustomizeStoreClick,
  onReferralsClick
}: QuickActionsProps) => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Acciones rápidas</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Button
          variant="outline"
          className="flex items-center gap-2 justify-start h-auto p-4"
          onClick={onAddProductClick}
        >
          <Plus className="h-5 w-5 text-blue-600" />
          <div className="text-left">
            <div className="font-medium">Añadir producto</div>
            <div className="text-sm text-gray-500">Agregar nuevo producto</div>
          </div>
        </Button>

        <Button
          variant="outline"
          className="flex items-center gap-2 justify-start h-auto p-4"
          onClick={onProductsClick}
        >
          <Package className="h-5 w-5 text-green-600" />
          <div className="text-left">
            <div className="font-medium">Ver productos</div>
            <div className="text-sm text-gray-500">Gestionar inventario</div>
          </div>
        </Button>

        <Button
          variant="outline"
          className="flex items-center gap-2 justify-start h-auto p-4"
          onClick={onPaymentMethodsClick}
        >
          <CreditCard className="h-5 w-5 text-purple-600" />
          <div className="text-left">
            <div className="font-medium">Métodos de pago</div>
            <div className="text-sm text-gray-500">Configurar pagos</div>
          </div>
        </Button>

        <Button
          variant="outline"
          className="flex items-center gap-2 justify-start h-auto p-4"
          onClick={onCustomizeStoreClick}
        >
          <Palette className="h-5 w-5 text-orange-600" />
          <div className="text-left">
            <div className="font-medium">Personalizar</div>
            <div className="text-sm text-gray-500">Diseño de tienda</div>
          </div>
        </Button>
      </div>
    </Card>
  );
};
