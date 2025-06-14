
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowLeft, CreditCard, Smartphone, Building, Wallet } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: string;
  fee?: string;
}

const availablePaymentMethods: PaymentMethod[] = [
  {
    id: 'mobile_money',
    name: 'Mobile Money',
    description: 'MTN Mobile Money, Orange Money',
    icon: 'smartphone',
    fee: '2% + ₣500'
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
    fee: '3.5%'
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
  const { clearCart, closeCart, getTotalPrice } = useCart();

  // Simulate store payment methods (in real app, this would come from store settings)
  const storePaymentMethods = {
    0: ['mobile_money', 'bank_transfer', 'credit_card', 'cash_delivery'], // Mi Negocio GQ
    1: ['mobile_money', 'credit_card', 'cash_delivery'], // Moda Elegante
    2: ['bank_transfer', 'credit_card', 'cash_delivery'], // Hogar Perfecto
    3: ['mobile_money', 'credit_card'], // Deporte Total
    4: ['mobile_money', 'bank_transfer', 'credit_card'] // Salud y Belleza
  };

  // Get payment methods available for all stores in cart
  const availableMethods = availablePaymentMethods.filter(method => 
    storeIds.every(storeId => 
      storePaymentMethods[storeId as keyof typeof storePaymentMethods]?.includes(method.id)
    )
  );

  const handlePayment = () => {
    if (!selectedMethod) return;

    // Simulate payment processing
    alert(`Procesando pago con ${availablePaymentMethods.find(m => m.id === selectedMethod)?.name}...\n\nTotal: ₣ ${getTotalPrice().toLocaleString()}\n\n¡Gracias por tu compra!`);
    clearCart();
    closeCart();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h3 className="font-semibold">Método de pago</h3>
      </div>

      {availableMethods.length === 0 ? (
        <div className="text-center py-4 text-gray-500">
          <p className="text-sm">No hay métodos de pago compatibles entre todas las tiendas seleccionadas.</p>
          <p className="text-xs mt-1">Contacta con las tiendas para más opciones.</p>
        </div>
      ) : (
        <>
          <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod}>
            <div className="space-y-3">
              {availableMethods.map((method) => (
                <div key={method.id} className="flex items-start space-x-3">
                  <RadioGroupItem value={method.id} id={method.id} className="mt-1" />
                  <label htmlFor={method.id} className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50">
                      <div className="text-primary">
                        {getIcon(method.icon)}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{method.name}</div>
                        <div className="text-xs text-gray-600">{method.description}</div>
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
  );
};
