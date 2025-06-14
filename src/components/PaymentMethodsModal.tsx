
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { CreditCard, Smartphone, Wallet, Trash2 } from 'lucide-react';

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
  { value: 'muni_dinero', label: 'Muni Dinero', icon: <Smartphone className="h-5 w-5" /> },
  { value: 'rosa_money', label: 'Rosa Money', icon: <Smartphone className="h-5 w-5" /> },
  { value: 'efectivo', label: 'Efectivo', icon: <Wallet className="h-5 w-5" /> },
  { value: 'tarjeta_debito', label: 'Tarjeta de Débito', icon: <CreditCard className="h-5 w-5" /> }
];

export const PaymentMethodsModal = ({ open, onOpenChange }: PaymentMethodsModalProps) => {
  const [loading, setLoading] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [newMethod, setNewMethod] = useState({
    tipo: '',
    numero: '',
    titular: ''
  });
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (open && user) {
      loadPaymentMethods();
    }
  }, [open, user]);

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
    }
  };

  const handleAddMethod = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newMethod.tipo) return;

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
        
        <div className="space-y-6">
          {/* Métodos existentes */}
          <div>
            <h3 className="font-medium mb-3">Métodos configurados</h3>
            <div className="space-y-2">
              {paymentMethods.length === 0 ? (
                <p className="text-gray-500 text-sm">No tienes métodos de pago configurados.</p>
              ) : (
                paymentMethods.map((method) => {
                  const typeInfo = paymentTypes.find(t => t.value === method.tipo);
                  return (
                    <Card key={method.id} className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {typeInfo?.icon}
                          <div>
                            <p className="font-medium">{typeInfo?.label}</p>
                            <p className="text-sm text-gray-600">
                              {method.numero && `${method.numero} - `}{method.titular}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteMethod(method.id)}
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
                <Label htmlFor="tipo">Tipo de pago</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {paymentTypes.map((type) => (
                    <Button
                      key={type.value}
                      type="button"
                      variant={newMethod.tipo === type.value ? "default" : "outline"}
                      className="justify-start"
                      onClick={() => setNewMethod({...newMethod, tipo: type.value})}
                    >
                      {type.icon}
                      <span className="ml-2">{type.label}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {newMethod.tipo && newMethod.tipo !== 'efectivo' && (
                <div>
                  <Label htmlFor="numero">
                    {newMethod.tipo === 'tarjeta_debito' ? 'Número de tarjeta' : 'Número de cuenta'}
                  </Label>
                  <Input
                    id="numero"
                    value={newMethod.numero}
                    onChange={(e) => setNewMethod({...newMethod, numero: e.target.value})}
                    placeholder={newMethod.tipo === 'tarjeta_debito' ? '**** **** **** 1234' : '+237 6XX XXX XXX'}
                  />
                </div>
              )}

              <div>
                <Label htmlFor="titular">Nombre del titular</Label>
                <Input
                  id="titular"
                  value={newMethod.titular}
                  onChange={(e) => setNewMethod({...newMethod, titular: e.target.value})}
                  required
                />
              </div>

              <Button type="submit" disabled={loading || !newMethod.tipo} className="w-full">
                {loading ? "Añadiendo..." : "Añadir método de pago"}
              </Button>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
