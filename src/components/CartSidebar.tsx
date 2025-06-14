
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { X, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { PaymentMethodSelector } from './PaymentMethodSelector';
import { useToast } from '@/hooks/use-toast';

export const CartSidebar = () => {
  const { items, isOpen, closeCart, updateQuantity, getTotalPrice, getTotalItems, clearCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [customerData, setCustomerData] = useState({
    nombre: '',
    telefono: '',
    direccion: '',
    notas: ''
  });
  const { toast } = useToast();

  if (!isOpen) return null;

  const formatPrice = (price: number) => {
    return `₣ ${price.toLocaleString()}`;
  };

  const groupedByStore = items.reduce((acc, item) => {
    if (!acc[item.storeId]) {
      acc[item.storeId] = {
        storeName: item.storeName,
        items: []
      };
    }
    acc[item.storeId].items.push(item);
    return acc;
  }, {} as Record<number, { storeName: string; items: typeof items }>);

  const handleCheckout = () => {
    if (!customerData.nombre || !customerData.telefono || !customerData.direccion) {
      toast({
        title: "Datos incompletos",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive"
      });
      return;
    }
    setShowCheckout(true);
  };

  const handleOrderComplete = () => {
    toast({
      title: "¡Pedido realizado!",
      description: "Tu pedido ha sido enviado y será procesado pronto",
    });
    clearCart();
    closeCart();
    setShowCheckout(false);
    setCustomerData({ nombre: '', telefono: '', direccion: '', notas: '' });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-lg">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b p-4">
            <div className="flex items-center gap-2">
              {showCheckout && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowCheckout(false)}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
              <ShoppingBag className="h-5 w-5" />
              <h2 className="text-lg font-semibold">
                {showCheckout ? 'Finalizar Compra' : `Carrito (${getTotalItems()})`}
              </h2>
            </div>
            <Button variant="ghost" size="sm" onClick={closeCart}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <ShoppingBag className="h-12 w-12 mb-4 text-gray-300" />
                <p>Tu carrito está vacío</p>
              </div>
            ) : showCheckout ? (
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Datos de entrega</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="nombre">Nombre completo *</Label>
                      <Input
                        id="nombre"
                        value={customerData.nombre}
                        onChange={(e) => setCustomerData(prev => ({ ...prev, nombre: e.target.value }))}
                        placeholder="Tu nombre completo"
                      />
                    </div>
                    <div>
                      <Label htmlFor="telefono">Teléfono *</Label>
                      <Input
                        id="telefono"
                        value={customerData.telefono}
                        onChange={(e) => setCustomerData(prev => ({ ...prev, telefono: e.target.value }))}
                        placeholder="Tu número de teléfono"
                      />
                    </div>
                    <div>
                      <Label htmlFor="direccion">Dirección de entrega *</Label>
                      <Textarea
                        id="direccion"
                        value={customerData.direccion}
                        onChange={(e) => setCustomerData(prev => ({ ...prev, direccion: e.target.value }))}
                        placeholder="Dirección completa donde quieres recibir tu pedido"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="notas">Notas adicionales</Label>
                      <Textarea
                        id="notas"
                        value={customerData.notas}
                        onChange={(e) => setCustomerData(prev => ({ ...prev, notas: e.target.value }))}
                        placeholder="Instrucciones especiales para la entrega"
                        rows={2}
                      />
                    </div>
                  </div>
                </div>

                <PaymentMethodSelector 
                  storeIds={Object.keys(groupedByStore).map(Number)}
                  onOrderComplete={handleOrderComplete}
                  customerData={customerData}
                />
              </div>
            ) : (
              <div className="space-y-6">
                {Object.entries(groupedByStore).map(([storeId, store]) => (
                  <div key={storeId} className="space-y-3">
                    <h3 className="font-semibold text-secondary border-b pb-2">
                      {store.storeName}
                    </h3>
                    {store.items.map((item) => (
                      <div key={item.id} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{item.name}</h4>
                          <p className="text-primary font-semibold">{item.price}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="h-8 w-8 p-0"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-8 w-8 p-0"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t p-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-xl font-bold text-primary">
                  {formatPrice(getTotalPrice())}
                </span>
              </div>
              
              {!showCheckout && (
                <Button 
                  className="w-full"
                  onClick={handleCheckout}
                >
                  Proceder al pago
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
