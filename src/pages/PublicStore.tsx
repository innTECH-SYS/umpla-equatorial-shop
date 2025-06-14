
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';
import { CartSidebar } from '@/components/CartSidebar';
import { supabase } from '@/integrations/supabase/client';
import { normalizeStoreName } from '@/lib/storeUtils';
import { TranslationProvider } from '@/contexts/TranslationContext';
import { 
  ShoppingCart, 
  Heart,
  Star,
  Truck,
  Shield,
  Phone,
  Mail,
  MapPin,
  Package
} from 'lucide-react';

const PublicStoreContent = () => {
  const { storename } = useParams();
  const { toast } = useToast();
  const { addToCart, openCart, isCartOpen, closeCart, getTotalItems } = useCart();
  const [store, setStore] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStore = async () => {
      try {
        console.log('Loading store for storename:', storename);
        
        // Get all stores and find the one that matches the normalized name
        const { data: allStores, error: storeError } = await supabase
          .from('tiendas')
          .select('*')
          .eq('activa', true);

        if (storeError) throw storeError;

        // Find store by normalized name
        const matchingStore = allStores?.find(store => 
          normalizeStoreName(store.nombre) === storename
        );

        if (!matchingStore) {
          throw new Error('Store not found');
        }

        console.log('Store found:', matchingStore);
        setStore(matchingStore);

        const { data: productsData, error: productsError } = await supabase
          .from('productos')
          .select('*')
          .eq('tienda_id', matchingStore.id)
          .eq('activo', true)
          .eq('disponible', true);

        if (productsError) throw productsError;
        console.log('Products loaded:', productsData?.length || 0);
        setProducts(productsData || []);
      } catch (error) {
        console.error('Error loading store:', error);
        toast({
          title: "Error",
          description: "No se pudo cargar la tienda",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (storename) {
      loadStore();
    }
  }, [storename, toast]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'XAF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price).replace('XAF', 'XAF');
  };

  const handleAddToCart = (product: any) => {
    console.log('Adding product to cart:', product);
    
    // Convertir producto al formato del carrito
    const cartProduct = {
      id: product.id,
      name: product.nombre,
      price: formatPrice(product.precio),
      image: product.imagen_url || '/placeholder.svg',
      storeId: store.id,
      rawPrice: product.precio
    };

    addToCart(cartProduct, { name: store.nombre });
    
    toast({
      title: "Producto agregado",
      description: `${product.nombre} se agregó al carrito`,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando tienda...</p>
        </div>
      </div>
    );
  }

  if (!store) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Tienda no encontrada</h1>
          <p className="text-gray-600">La tienda que buscas no existe o no está disponible.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={closeCart} 
        storeName={store.nombre}
        storeId={store.id}
      />
      
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="/" className="text-gray-600 hover:text-primary">
              Volver a Umpla
            </a>
            
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">U</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-secondary">{store.nombre}</h1>
                <p className="text-xs text-gray-500">{store.descripcion}</p>
              </div>
            </div>
            
            <Button className="relative" onClick={openCart}>
              <ShoppingCart className="h-5 w-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Bienvenido a {store.nombre}
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              {store.descripcion} - Envío a toda Guinea Ecuatorial
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                <span>Envío gratis mayor a ₣50,000</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <span>Garantía de calidad</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                <span>Soporte 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-secondary mb-8">Nuestros Productos</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="bg-white border border-gray-100 hover:shadow-lg transition-all duration-300 group overflow-hidden">
                <div className="relative">
                  {product.imagen_url ? (
                    <img 
                      src={product.imagen_url} 
                      alt={product.nombre}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                      <Package className="h-16 w-16 text-gray-400" />
                    </div>
                  )}
                  {product.destacado && (
                    <span className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-semibold bg-blue-500 text-white">
                      Destacado
                    </span>
                  )}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-gray-700">4.5</span>
                    </div>
                    <span className="text-sm text-gray-500">(100 reseñas)</span>
                  </div>
                  
                  <h4 className="font-semibold text-secondary mb-3 group-hover:text-primary transition-colors">
                    {product.nombre}
                  </h4>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-bold text-secondary">{formatPrice(product.precio)}</span>
                  </div>
                  
                  <Button 
                    className="w-full bg-primary hover:opacity-90"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Agregar al carrito
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-secondary mb-4">Contáctanos</h3>
            <p className="text-gray-600">Estamos aquí para ayudarte con cualquier pregunta</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 text-center bg-gray-50 border-0">
              <Phone className="h-8 w-8 text-primary mx-auto mb-4" />
              <h4 className="font-semibold text-secondary mb-2">Teléfono</h4>
              <p className="text-gray-600">{store.telefono || '+240 555 123 456'}</p>
              <p className="text-sm text-gray-500 mt-1">Lun-Vie 8AM-6PM</p>
            </Card>
            
            <Card className="p-6 text-center bg-gray-50 border-0">
              <Mail className="h-8 w-8 text-primary mx-auto mb-4" />
              <h4 className="font-semibold text-secondary mb-2">Email</h4>
              <p className="text-gray-600">info@{normalizeStoreName(store.nombre)}.com</p>
              <p className="text-sm text-gray-500 mt-1">Respuesta en 24h</p>
            </Card>
            
            <Card className="p-6 text-center bg-gray-50 border-0">
              <MapPin className="h-8 w-8 text-primary mx-auto mb-4" />
              <h4 className="font-semibold text-secondary mb-2">Ubicación</h4>
              <p className="text-gray-600">{store.ubicacion || 'Malabo, Guinea Ecuatorial'}</p>
              <p className="text-sm text-gray-500 mt-1">Entregas locales</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">U</span>
              </div>
              <span className="text-xl font-bold text-white">Umpla</span>
            </div>
            <p className="text-gray-400 mb-6">
              Tienda online creada con Umpla - La plataforma líder en Guinea Ecuatorial
            </p>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
              Crear mi tienda como esta
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

const PublicStore = () => {
  return (
    <TranslationProvider>
      <PublicStoreContent />
    </TranslationProvider>
  );
};

export default PublicStore;
