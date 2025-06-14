
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { CreditCard, Smartphone, Wallet, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';

interface PaymentMethodsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface PaymentMethod {
  id: string;
  tipo: string;
  numero: string;
  titular: string;
  activo: boolean;
}

const paymentTypes = [
  { 
    value: 'muni_dinero', 
    label: 'Muni Dinero', 
    icon: <Smartphone className="h-5 w-5" />,
    disabled: true,
    comingSoon: true
  },
  { 
    value: 'rosa_money', 
    label: 'Rosa Money', 
    icon: <Smartphone className="h-5 w-5" />,
    disabled: true,
    comingSoon: true
  },
  { 
    value: 'efectivo', 
    label: 'Efectivo', 
    icon: <Wallet className="h-5 w-5" />,
    disabled: false,
    comingSoon: false
  },
  { 
    value: 'tarjeta_debito', 
    label: 'Tarjeta de Débito', 
    icon: <CreditCard className="h-5 w-5" />,
    disabled: false,
    comingSoon: false
  }
];

export const PaymentMethodsModal = ({ open, onOpenChange }: PaymentMethodsModalProps) => {
  const [loading, setLoading] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [newMethod, setNewMethod] = useState({
    tipo: '',
    numero: '',
    titular: ''
  });
  const [operationSuccess, setOperationSuccess] = useState<string | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (open && user) {
      loadPaymentMethods();
    }
  }, [open, user]);

  // Limpiar mensaje de éxito después de 3 segundos
  useEffect(() => {
    if (operationSuccess) {
      const timer = setTimeout(() => {
        setOperationSuccess(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [operationSuccess]);

  const loadPaymentMethods = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('metodos_pago')
        .select('*')
        .eq('usuario_id', user.id)
        .eq('activo', true);

      if (error) throw error;
      setPaymentMethods(data || []);
    } catch (error) {
      console.error('Error loading payment methods:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los métodos de pago",
        variant: "destructive"
      });
    }
  };

  const validateForm = () => {
    if (!newMethod.tipo) {
      toast({
        title: "Error de validación",
        description: "Selecciona un tipo de pago",
        variant: "destructive"
      });
      return false;
    }
    
    if (!newMethod.titular.trim()) {
      toast({
        title: "Error de validación",
        description: "El nombre del titular es requerido",
        variant: "destructive"
      });
      return false;
    }

    if (newMethod.tipo !== 'efectivo' && !newMethod.numero.trim()) {
      toast({
        title: "Error de validación",
        description: "El número es requerido para este tipo de pago",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleAddMethod = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !validateForm()) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('metodos_pago')
        .insert({
          usuario_id: user.id,
          tipo: newMethod.tipo,
          numero: newMethod.numero,
          titular: newMethod.titular
        });

      if (error) throw error;

      setOperationSuccess('added');
      toast({
        title: "¡Método de pago añadido!",
        description: "El método de pago se ha configurado correctamente."
      });

      setNewMethod({ tipo: '', numero: '', titular: '' });
      loadPaymentMethods();
    } catch (error) {
      console.error('Error adding payment method:', error);
      toast({
        title: "Error",
        description: "No se pudo añadir el método de pago.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMethod = async (id: string) => {
    try {
      const { error } = await supabase
        .from('metodos_pago')
        .update({ activo: false })
        .eq('id', id);

      if (error) throw error;

      setOperationSuccess('deleted');
      toast({
        title: "Método eliminado",
        description: "El método de pago se ha eliminado correctamente."
      });

      loadPaymentMethods();
    } catch (error) {
      console.error('Error deleting payment method:', error);
      toast({
        title: "Error",
        description: "No se pudo eliminar el método de pago.",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Configurar métodos de pago</DialogTitle>
        </DialogHeader>
        
        {/* Mensaje de éxito */}
        {operationSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <p className="text-sm text-green-800">
                {operationSuccess === 'added' 
                  ? 'Método de pago añadido exitosamente' 
                  : 'Método de pago eliminado exitosamente'
                }
              </p>
            </div>
          </div>
        )}
        
        <div className="space-y-6">
          {/* Métodos existentes */}
          <div>
            <h3 className="font-medium mb-3">Métodos configurados</h3>
            <div className="space-y-2">
              {paymentMethods.length === 0 ? (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-amber-600" />
                    <p className="text-sm text-amber-800">
                      No tienes métodos de pago configurados. Añade al menos uno para recibir pagos.
                    </p>
                  </div>
                </div>
              ) : (
                paymentMethods.map((method) => {
                  const typeInfo = paymentTypes.find(t => t.value === method.tipo);
                  return (
                    <Card key={method.id} className="p-3 bg-green-50 border-green-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {typeInfo?.icon}
                          <div>
                            <p className="font-medium">{typeInfo?.label}</p>
                            <p className="text-sm text-gray-600">
                              {method.numero && `${method.numero} - `}{method.titular}
                            </p>
                          </div>
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteMethod(method.id)}
                          className="hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                  );
                })
              )}
            </div>
          </div>

          {/* Añadir nuevo método */}
          <div>
            <h3 className="font-medium mb-3">Añadir nuevo método</h3>
            <form onSubmit={handleAddMethod} className="space-y-4">
              <div>
                <Label htmlFor="tipo">Tipo de pago *</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {paymentTypes.map((type) => (
                    <Button
                      key={type.value}
                      type="button"
                      variant={newMethod.tipo === type.value ? "default" : "outline"}
                      className={`justify-start relative ${type.disabled ? 'opacity-50' : ''}`}
                      onClick={() => !type.disabled && setNewMethod({...newMethod, tipo: type.value})}
                      disabled={type.disabled}
                    >
                      {type.icon}
                      <span className="ml-2">{type.label}</span>
                      {type.comingSoon && (
                        <span className="ml-2 text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded">
                          Pronto disponible
                        </span>
                      )}
                    </Button>
                  ))}
                </div>
              </div>

              {newMethod.tipo && newMethod.tipo !== 'efectivo' && (
                <div>
                  <Label htmlFor="numero">
                    {newMethod.tipo === 'tarjeta_debito' ? 'Número de tarjeta *' : 'Número de cuenta *'}
                  </Label>
                  <Input
                    id="numero"
                    value={newMethod.numero}
                    onChange={(e) => setNewMethod({...newMethod, numero: e.target.value})}
                    placeholder={newMethod.tipo === 'tarjeta_debito' ? '**** **** **** 1234' : '+240 6XX XXX XXX'}
                    required
                  />
                </div>
              )}

              <div>
                <Label htmlFor="titular">Nombre del titular *</Label>
                <Input
                  id="titular"
                  value={newMethod.titular}
                  onChange={(e) => setNewMethod({...newMethod, titular: e.target.value})}
                  placeholder="Nombre completo del titular"
                  required
                />
              </div>

              <Button 
                type="submit" 
                disabled={loading || !newMethod.tipo || !newMethod.titular.trim()} 
                className="w-full"
              >
                {loading ? "Añadiendo..." : "Añadir método de pago"}
              </Button>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
