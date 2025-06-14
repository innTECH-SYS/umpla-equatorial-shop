
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

interface PaymentMethodReminderProps {
  hasPaymentMethod: boolean;
  onPaymentMethodsClick: () => void;
}

export const PaymentMethodReminder = ({ hasPaymentMethod, onPaymentMethodsClick }: PaymentMethodReminderProps) => {
  if (hasPaymentMethod) return null;

  return (
    <Card className="p-4 sm:p-6 mb-6 sm:mb-8 bg-amber-50 border-amber-200">
      <div className="flex items-start space-x-3">
        <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-medium text-amber-800 mb-2">
            Aún no has configurado un método de pago. Hazlo aquí.
          </p>
          <Button 
            size="sm" 
            className="bg-amber-600 hover:bg-amber-700 text-white"
            onClick={onPaymentMethodsClick}
          >
            Agregar método de pago
          </Button>
        </div>
      </div>
    </Card>
  );
};
