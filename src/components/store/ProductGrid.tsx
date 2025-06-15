
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Package, Heart, Star } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/useTranslation';

interface Product {
  id: string;
  nombre: string;
  descripcion?: string;
  precio: number;
  imagen_url?: string;
  disponible: boolean;
  stock?: number;
}

interface StoreData {
  id: string;
  nombre: string;
}

interface ProductGridProps {
  products: Product[];
  store: StoreData;
}

export const ProductGrid = ({ products, store }: ProductGridProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const { t } = useTranslation();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'XAF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price).replace('XAF', 'XAF');
  };

  const handleAddToCart = (product: Product) => {
    // Convert product to cart format
    const cartProduct = {
      id: product.id, // Keep as string UUID
      name: product.nombre,
      price: formatPrice(product.precio),
      image: product.imagen_url || '/placeholder.svg',
      storeId: store.id, // Keep as string UUID
      rawPrice: product.precio // Add raw price for calculations
    };

    console.log('Adding product to cart:', cartProduct);
    
    addToCart(cartProduct, { name: store.nombre });
    
    toast({
      title: t('store.product_added'),
      description: t('store.product_added_desc', { productName: product.nombre }),
    });
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('store.our_products')}</h2>
        <p className="text-gray-600">{t('store.products_available', { count: products.length })}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-0 shadow-lg">
            <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
              {product.imagen_url ? (
                <img
                  src={product.imagen_url}
                  alt={product.nombre}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder.svg';
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
                  <Package className="h-16 w-16 text-gray-400" />
                </div>
              )}
              
              {/* Overlay con efectos */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
              
              {/* Badge de stock bajo */}
              {product.stock !== undefined && product.stock <= 5 && product.stock > 0 && (
                <Badge 
                  className="absolute top-3 left-3 bg-orange-500 text-white shadow-lg"
                  variant="secondary"
                >
                  {t('store.last_units', { count: product.stock })}
                </Badge>
              )}

              {/* Botón de favoritos */}
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/90 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
              >
                <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
              </Button>

              {/* Badge de disponibilidad */}
              {!product.disponible || (product.stock !== undefined && product.stock === 0) && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <Badge variant="destructive" className="text-white">
                    No disponible
                  </Badge>
                </div>
              )}
            </div>

            <div className="p-4 bg-white">
              {/* Rating simulado */}
              <div className="flex items-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className="h-3 w-3 fill-yellow-400 text-yellow-400" 
                  />
                ))}
                <span className="text-xs text-gray-500 ml-1">(4.5)</span>
              </div>

              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm leading-tight">
                {product.nombre}
              </h3>
              
              {product.descripcion && (
                <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                  {product.descripcion}
                </p>
              )}

              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-blue-600">
                    {formatPrice(product.precio)}
                  </span>
                  {product.stock !== undefined && (
                    <span className="text-xs text-gray-500">
                      Stock: {product.stock}
                    </span>
                  )}
                </div>
                
                <Button
                  size="sm"
                  onClick={() => handleAddToCart(product)}
                  disabled={!product.disponible || (product.stock !== undefined && product.stock === 0)}
                  className="flex items-center gap-1 text-xs px-3 py-1 h-8 bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <ShoppingCart className="h-3 w-3" />
                  {product.stock === 0 ? 'Agotado' : 'Agregar'}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
