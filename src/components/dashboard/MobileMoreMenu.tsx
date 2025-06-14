
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SupportModal } from '@/components/SupportModal';
import { ImprovedLanguageSelector } from '@/components/ImprovedLanguageSelector';
import { useState } from 'react';
import { 
  CreditCard,
  Store,
  Users,
  HelpCircle,
  Eye,
  Globe
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface MobileMoreMenuProps {
  onPaymentMethodsClick: () => void;
  onCustomizeStoreClick: () => void;
  onReferralsClick: () => void;
}

export const MobileMoreMenu = ({
  onPaymentMethodsClick,
  onCustomizeStoreClick,
  onReferralsClick
}: MobileMoreMenuProps) => {
  const [supportModalOpen, setSupportModalOpen] = useState(false);

  return (
    <div className="p-4 space-y-4 pb-20">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Más opciones</h2>
      
      <div className="grid grid-cols-1 gap-3">
        <Card className="p-4">
          <Button
            variant="ghost"
            className="w-full justify-start h-auto p-0"
            onClick={onPaymentMethodsClick}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <CreditCard className="h-5 w-5 text-purple-600" />
              </div>
              <div className="text-left">
                <div className="font-medium">Métodos de pago</div>
                <div className="text-sm text-gray-500">Configurar formas de cobro</div>
              </div>
            </div>
          </Button>
        </Card>

        <Card className="p-4">
          <Button
            variant="ghost"
            className="w-full justify-start h-auto p-0"
            onClick={onCustomizeStoreClick}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Store className="h-5 w-5 text-orange-600" />
              </div>
              <div className="text-left">
                <div className="font-medium">Personalizar tienda</div>
                <div className="text-sm text-gray-500">Diseño y configuración</div>
              </div>
            </div>
          </Button>
        </Card>

        <Card className="p-4">
          <Button
            variant="ghost"
            className="w-full justify-start h-auto p-0"
            onClick={onReferralsClick}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <div className="text-left">
                <div className="font-medium">Programa de referidos</div>
                <div className="text-sm text-gray-500">Invita y gana comisiones</div>
              </div>
            </div>
          </Button>
        </Card>

        <Card className="p-4">
          <Link to="/store-example">
            <Button
              variant="ghost"
              className="w-full justify-start h-auto p-0"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Eye className="h-5 w-5 text-blue-600" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Ver mi tienda</div>
                  <div className="text-sm text-gray-500">Previsualizar como cliente</div>
                </div>
              </div>
            </Button>
          </Link>
        </Card>

        <Card className="p-4">
          <Button
            variant="ghost"
            className="w-full justify-start h-auto p-0"
            onClick={() => setSupportModalOpen(true)}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <HelpCircle className="h-5 w-5 text-gray-600" />
              </div>
              <div className="text-left">
                <div className="font-medium">Soporte</div>
                <div className="text-sm text-gray-500">Ayuda y contacto</div>
              </div>
            </div>
          </Button>
        </Card>

        {/* Selector de idioma para móvil */}
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Globe className="h-5 w-5 text-indigo-600" />
            </div>
            <div className="flex-1">
              <div className="font-medium mb-2">Idioma</div>
              <ImprovedLanguageSelector variant="mobile" showLabel={false} />
            </div>
          </div>
        </Card>
      </div>

      <SupportModal 
        open={supportModalOpen} 
        onOpenChange={setSupportModalOpen} 
      />
    </div>
  );
};
