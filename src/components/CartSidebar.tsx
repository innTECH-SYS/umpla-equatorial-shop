
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { PaymentMethodSelector } from "@/components/PaymentMethodSelector";
import { supabase } from "@/integrations/supabase/client";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  storeName: string;
  storeId: string;
}

export const CartSidebar = ({ isOpen, onClose, storeName, storeId }: CartSidebarProps) => {
  const { items, updateQuantity, removeFromCart, clearCart, getTotalPrice } = useCart();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  
  // Checkout form data
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  const handleProcessOrder = async () => {
    // Validar campos requeridos
    if (!customerName.trim() || !customerPhone.trim() || !deliveryAddress.trim() || !selectedPaymentMethod) {
      toast({
        title: "Datos incompletos",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      const total = getTotalPrice();
      
      // Crear el pedido
      const { data: pedido, error: pedidoError } = await supabase
        .from('pedidos')
        .insert({
          tienda_id: storeId,
          nombre_cliente: customerName,
          telefono_cliente: customerPhone,
          direccion_entrega: deliveryAddress,
          metodo_pago: selectedPaymentMethod,
          total: total,
          notas: notes || null,
          estado: 'pendiente'
        })
        .select()
        .single();

      if (pedidoError) throw pedidoError;

      // Crear los items del pedido
      const pedidoItems = items.map(item => ({
        pedido_id: pedido.id,
        producto_id: item.id.toString(),
        nombre_producto: item.name,
        precio_unitario: Number(item.price),
        cantidad: item.quantity,
        subtotal: Number(item.price) * item.quantity
      }));

      const { error: itemsError } = await supabase
        .from('pedido_items')
        .insert(pedidoItems);

      if (itemsError) throw itemsError;

      toast({
        title: "¡Pedido enviado!",
        description: `Tu pedido #${pedido.numero_pedido} ha sido enviado correctamente`,
      });

      // Limpiar carrito y cerrar sidebar
      clearCart();
      onClose();
      setShowCheckout(false);
      
      // Limpiar formulario
      setCustomerName('');
      setCustomerPhone('');
      setDeliveryAddress('');
      setNotes('');
      setSelectedPaymentMethod('');

    } catch (error) {
      console.error('Error processing order:', error);
      toast({
        title: "Error",
        description: "No se pudo procesar el pedido. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const goToCheckout = () => {
    if (items.length === 0) {
      toast({
        title: "Carrito vacío",
        description: "Agrega productos antes de continuar",
        variant: "destructive",
      });
      return;
    }
    setShowCheckout(true);
  };

  const goBackToCart = () => {
    setShowCheckout(false);
  };

  if (!showCheckout) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Tu Carrito
            </SheetTitle>
            <SheetDescription>
              Productos de {storeName}
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">Tu carrito está vacío</p>
              </div>
            ) : (
              <>
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 border rounded-lg">
                    {item.image && (
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <p className="text-primary font-semibold">{item.price} XAF</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => removeFromCart(item.id)}
                          className="ml-2"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-xl font-bold text-primary">{getTotalPrice()} XAF</span>
                  </div>
                  
                  <Button 
                    onClick={goToCheckout}
                    className="w-full"
                    size="lg"
                  >
                    Proceder al Checkout
                  </Button>
                </div>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Finalizar Pedido</SheetTitle>
          <SheetDescription>
            Completa tus datos para recibir el pedido
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          <div className="border rounded-lg p-4 bg-gray-50">
            <h4 className="font-medium mb-2">Resumen del pedido</h4>
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm mb-1">
                <span>{item.name} x{item.quantity}</span>
                <span>{Number(item.price) * item.quantity} XAF</span>
              </div>
            ))}
            <div className="border-t pt-2 mt-2 font-semibold">
              Total: {getTotalPrice()} XAF
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="customerName">Nombre completo *</Label>
              <Input
                id="customerName"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Tu nombre completo"
                required
              />
            </div>

            <div>
              <Label htmlFor="customerPhone">Teléfono *</Label>
              <Input
                id="customerPhone"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="Tu número de teléfono"
                required
              />
            </div>

            <div>
              <Label htmlFor="deliveryAddress">Dirección de entrega *</Label>
              <Textarea
                id="deliveryAddress"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="Dirección completa donde quieres recibir el pedido"
                required
              />
            </div>

            <div>
              <Label htmlFor="notes">Notas adicionales</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Instrucciones especiales para la entrega (opcional)"
              />
            </div>

            <div>
              <Label htmlFor="paymentMethod">Método de pago *</Label>
              <select 
                id="paymentMethod"
                value={selectedPaymentMethod}
                onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                required
              >
                <option value="">Selecciona un método de pago</option>
                <option value="bank_transfer">Transferencia Bancaria</option>
                <option value="cash_delivery">Pago contra entrega</option>
                <option value="mobile_money">Dinero móvil</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button 
              variant="outline" 
              onClick={goBackToCart}
              className="flex-1"
            >
              Volver al Carrito
            </Button>
            <Button 
              onClick={handleProcessOrder}
              disabled={isProcessing}
              className="flex-1"
            >
              {isProcessing ? 'Procesando...' : 'Confirmar Pedido'}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
