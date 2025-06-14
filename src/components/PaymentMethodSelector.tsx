
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowLeft, CreditCard, Smartphone, Building, Wallet, Shield, AlertTriangle } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useUserPlan } from '@/hooks/useUserPlan';
import { KYCModal } from './KYCModal';

interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: string;
  fee?: string;
  disabled?: boolean;
  comingSoon?: boolean;
  requiresKYC?: boolean;
}

const availablePaymentMethods: PaymentMethod[] = [
  {
    id: 'mobile_money_mtn',
    name: 'Muni Dinero',
    description: 'Pagos móviles',
    icon: 'smartphone',
    fee: '2% + ₣500',
    disabled: true,
    comingSoon: true
  },
  {
    id: 'mobile_money_orange',
    name: 'Rosa Money',
    description: 'Pagos móviles',
    icon: 'smartphone',
    fee: '2% + ₣500',
    disabled: true,
    comingSoon: true
  },
  {
    id: 'bank_transfer',
    name: 'Transferencia Bancaria',
    description: 'BANGE, CCEI Bank, BGFIBank',
    icon: 'building',
    fee: '₣1,000'
  },
  {
    id: 'credit_card',
    name: 'Tarjeta de Crédito/Débito',
    description: 'Visa, Mastercard',
    icon: 'credit-card',
    fee: '3.5%',
    requiresKYC: true
  },
  {
    id: 'cash_delivery',
    name: 'Pago contra entrega',
    description: 'Paga en efectivo al recibir',
    icon: 'wallet',
    fee: 'Gratis'
  }
];

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'smartphone': return <Smartphone className="h-5 w-5" />;
    case 'building': return <Building className="h-5 w-5" />;
    case 'credit-card': return <CreditCard className="h-5 w-5" />;
    case 'wallet': return <Wallet className="h-5 w-5" />;
    default: return <CreditCard className="h-5 w-5" />;
  }
};

interface PaymentMethodSelectorProps {
  storeIds: number[];
  onBack: () => void;
}

export const PaymentMethodSelector = ({ storeIds, onBack }: PaymentMethodSelectorProps) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [kycModalOpen, setKycModalOpen] = useState(false);
  const { clearCart, closeCart, getTotalPrice } = useCart();
  const { kycStatus } = useUserPlan();

  // Simulate store payment methods (in real app, this would come from store settings)
  const storePaymentMethods = {
    0: ['bank_transfer', 'credit_card', 'cash_delivery'], // Mi Negocio GQ
    1: ['credit_card', 'cash_delivery'], // Moda Elegante
    2: ['bank_transfer', 'credit_card', 'cash_delivery'], // Hogar Perfecto
    3: ['credit_card'], // Deporte Total
    4: ['bank_transfer', 'credit_card'] // Salud y Belleza
  };

  // Get payment methods available for all stores in cart
  const availableMethods = availablePaymentMethods.filter(method => {
    if (method.disabled) return false;
    return storeIds.every(storeId => 
      storePaymentMethods[storeId as keyof typeof storePaymentMethods]?.includes(method.id)
    );
  });

  const handleMethodSelection = (methodId: string) => {
    const method = availablePaymentMethods.find(m => m.id === methodId);
    
    if (method?.requiresKYC && kycStatus !== 'verified') {
      // Show KYC modal for methods that require verification
      setKycModalOpen(true);
      return;
    }
    
    setSelectedMethod(methodId);
  };

  const handlePayment = () => {
    if (!selectedMethod) return;

    const method = availablePaymentMethods.find(m => m.id === selectedMethod);
    
    if (method?.requiresKYC && kycStatus !== 'verified') {
      setKycModalOpen(true);
      return;
    }

    // Simulate payment processing
    alert(`Procesando pago con ${method?.name}...\n\nTotal: ₣ ${getTotalPrice().toLocaleString()}\n\n¡Gracias por tu compra!`);
    clearCart();
    closeCart();
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h3 className="font-semibold">Método de pago</h3>
        </div>

        {/* KYC status notice */}
        {kycStatus !== 'verified' && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
              <div className="text-sm">
                <p className="text-amber-800 font-medium">Verificación recomendada</p>
                <p className="text-amber-700 mt-1">
                  Para acceder a todos los métodos de pago (como tarjetas), considera verificar tu cuenta.
                </p>
                <Button 
                  variant="link" 
                  size="sm" 
                  className="text-amber-800 p-0 h-auto mt-1"
                  onClick={() => setKycModalOpen(true)}
                >
                  Verificar ahora →
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Mostrar métodos próximamente disponibles */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-600">Próximamente disponibles:</h4>
          {availablePaymentMethods.filter(method => method.comingSoon).map((method) => (
            <div key={method.id} className="flex items-center gap-3 p-3 border rounded-lg bg-gray-50 opacity-75">
              <div className="text-gray-400">
                {getIcon(method.icon)}
              </div>
              <div className="flex-1">
                <div className="font-medium text-sm text-gray-600">{method.name}</div>
                <div className="text-xs text-gray-500">{method.description}</div>
              </div>
              <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded">
                Pronto disponible
              </span>
            </div>
          ))}
        </div>

        {availableMethods.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
            <p className="text-sm">No hay métodos de pago disponibles entre todas las tiendas seleccionadas.</p>
            <p className="text-xs mt-1">Contacta con las tiendas para más opciones.</p>
          </div>
        ) : (
          <>
            <div>
              <h4 className="text-sm font-medium text-gray-600 mb-3">Métodos disponibles:</h4>
              <RadioGroup value={selectedMethod} onValueChange={handleMethodSelection}>
                <div className="space-y-3">
                  {availableMethods.map((method) => (
                    <div key={method.id} className="flex items-start space-x-3">
                      <RadioGroupItem 
                        value={method.id} 
                        id={method.id} 
                        className="mt-1"
                        disabled={method.requiresKYC && kycStatus !== 'verified'}
                      />
                      <label htmlFor={method.id} className="flex-1 cursor-pointer">
                        <div className={`flex items-center gap-3 p-3 border rounded-lg transition-colors ${
                          method.requiresKYC && kycStatus !== 'verified' 
                            ? 'bg-gray-50 opacity-60' 
                            : 'hover:bg-gray-50'
                        }`}>
                          <div className="text-primary">
                            {getIcon(method.icon)}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-sm flex items-center gap-2">
                              {method.name}
                              {method.requiresKYC && kycStatus !== 'verified' && (
                                <Shield className="h-3 w-3 text-amber-500" />
                              )}
                            </div>
                            <div className="text-xs text-gray-600">{method.description}</div>
                            {method.requiresKYC && kycStatus !== 'verified' && (
                              <div className="text-xs text-amber-600 mt-1">
                                Requiere verificación KYC
                              </div>
                            )}
                            {method.fee && (
                              <div className="text-xs text-gray-500 mt-1">
                                Comisión: {method.fee}
                              </div>
                            )}
                          </div>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <Button 
              className="w-full"
              onClick={handlePayment}
              disabled={!selectedMethod}
            >
              Confirmar pago
            </Button>
          </>
        )}
      </div>

      <KYCModal open={kycModalOpen} onOpenChange={setKycModalOpen} />
    </>
  );
};
