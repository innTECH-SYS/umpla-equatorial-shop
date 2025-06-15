
import React, { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Minus, Plus, ShoppingCart, Trash2, CreditCard, Building, Smartphone, Wallet, Clock } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";

interface PaymentMethod {
  id: string;
  tipo: string;
  numero?: string;
  titular: string;
  activo: boolean;
  comision_porcentaje?: number;
  comision_fija?: number;
}

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  storeName: string;
  storeId: string;
}

export const ImprovedCartSidebar = ({ isOpen, onClose, storeName, storeId }: CartSidebarProps) => {
  const { items, updateQuantity, removeFromCart, clearCart, getTotalPrice } = useCart();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  
  // Checkout form data
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (showCheckout && storeId) {
      loadPaymentMethods();
    }
  }, [showCheckout, storeId]);

  const loadPaymentMethods = async () => {
    try {
      // Get store owner's payment methods
      const { data: storeData } = await supabase
        .from('tiendas')
        .select('usuario_id')
        .eq('id', storeId)
        .single();

      if (!storeData) return;

      // Get all payment methods for the store (active and inactive)
      const { data: methods, error } = await supabase
        .from('metodos_pago')
        .select('*')
        .eq('usuario_id', storeData.usuario_id)
        .order('activo', { ascending: false }); // Show active methods first

      if (error) throw error;
      setPaymentMethods(methods || []);
      
      // Auto-select cash delivery if available
      const cashMethod = methods?.find(m => m.tipo === 'cash_delivery' && m.activo);
      if (cashMethod) {
        setSelectedPaymentMethod(cashMethod.tipo);
      }
    } catch (error) {
      console.error('Error loading payment methods:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los métodos de pago",
        variant: "destructive",
      });
    }
  };

  const getPaymentIcon = (tipo: string) => {
    switch (tipo) {
      case 'credit_card': return <CreditCard className="h-4 w-4" />;
      case 'bank_transfer': return <Building className="h-4 w-4" />;
      case 'mobile_money': return <Smartphone className="h-4 w-4" />;
      case 'cash_delivery': return <Wallet className="h-4 w-4" />;
      default: return <CreditCard className="h-4 w-4" />;
    }
  };

  const getPaymentLabel = (tipo: string) => {
    switch (tipo) {
      case 'credit_card': return 'Tarjeta de Crédito';
      case 'bank_transfer': return 'Transferencia Bancaria';
      case 'mobile_money': return 'Dinero Móvil';
      case 'cash_delivery': return 'Pago contra entrega';
      default: return tipo;
    }
  };

  const handleProcessOrder = async () => {
    if (!customerName.trim() || !customerPhone.trim() || !deliveryAddress.trim() || !selectedPaymentMethod) {
      toast({
        title: "Datos incompletos",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive",
      });
      return;
    }

    if (items.length === 0) {
      toast({
        title: "Carrito vacío",
        description: "Agrega productos antes de continuar",
        variant: "destructive",
      });
      return;
    }

    // Verificar que el método de pago esté activo
    const selectedMethod = paymentMethods.find(m => m.tipo === selectedPaymentMethod);
    if (!selectedMethod?.activo) {
      toast({
        title: "Método no disponible",
        description: "Este método de pago no está disponible actualmente",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      const total = getTotalPrice();
      
      // Generate order number
      const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
      
      // Create order
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
          estado: 'pendiente',
          numero_pedido: orderNumber
        })
        .select()
        .single();

      if (pedidoError) throw pedidoError;

      // Create order items
      const pedidoItems = items.map(item => ({
        pedido_id: pedido.id,
        producto_id: item.id,
        nombre_producto: item.name,
        precio_unitario: item.rawPrice || parseInt(item.price.replace(/[^\d]/g, '')),
        cantidad: item.quantity,
        subtotal: (item.rawPrice || parseInt(item.price.replace(/[^\d]/g, ''))) * item.quantity
      }));

      const { error: itemsError } = await supabase
        .from('pedido_items')
        .insert(pedidoItems);

      if (itemsError) throw itemsError;

      toast({
        title: "¡Pedido enviado!",
        description: `Tu pedido #${pedido.numero_pedido} ha sido enviado correctamente`,
      });

      clearCart();
      onClose();
      setShowCheckout(false);
      
      // Reset form
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
                  <div key={item.id} className="flex items-center gap-3 p-3 border rounded-lg bg-white shadow-sm">
                    {item.image && (
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg shadow-sm"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder.svg';
                        }}
                      />
                    )}
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <p className="text-primary font-semibold">{item.price}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                          className="h-8 w-8 p-0"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => removeFromCart(item.id)}
                          className="ml-2 h-8 w-8 p-0"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="border-t pt-4 bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-xl font-bold text-primary">{getTotalPrice()} XAF</span>
                  </div>
                  
                  <Button 
                    onClick={() => setShowCheckout(true)}
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
                <span>{(item.rawPrice || parseInt(item.price.replace(/[^\d]/g, ''))) * item.quantity} XAF</span>
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
              <Label htmlFor="paymentMethod">Método de pago *</Label>
              <div className="space-y-2 mt-2">
                {paymentMethods.length === 0 ? (
                  <p className="text-sm text-gray-500">Cargando métodos de pago...</p>
                ) : (
                  paymentMethods.map((method) => (
                    <div key={method.id} className="flex items-center space-x-3">
                      <input
                        type="radio"
                        id={method.id}
                        name="paymentMethod"
                        value={method.tipo}
                        checked={selectedPaymentMethod === method.tipo}
                        onChange={(e) => method.activo && setSelectedPaymentMethod(e.target.value)}
                        disabled={!method.activo}
                        className="w-4 h-4 text-primary"
                      />
                      <label 
                        htmlFor={method.id} 
                        className={`flex items-center gap-2 cursor-pointer flex-1 ${!method.activo ? 'opacity-60' : ''}`}
                      >
                        {getPaymentIcon(method.tipo)}
                        <span className="text-sm">{getPaymentLabel(method.tipo)}</span>
                        {method.numero && method.activo && (
                          <span className="text-xs text-gray-500">({method.numero})</span>
                        )}
                        {!method.activo && (
                          <Badge variant="secondary" className="ml-auto">
                            <Clock className="h-3 w-3 mr-1" />
                            Próximamente
                          </Badge>
                        )}
                      </label>
                    </div>
                  ))
                )}
              </div>
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
          </div>

          <div className="flex gap-2 pt-4">
            <Button 
              variant="outline" 
              onClick={() => setShowCheckout(false)}
              className="flex-1"
            >
              Volver al Carrito
            </Button>
            <Button 
              onClick={handleProcessOrder}
              disabled={isProcessing || paymentMethods.length === 0 || !paymentMethods.some(m => m.activo)}
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
