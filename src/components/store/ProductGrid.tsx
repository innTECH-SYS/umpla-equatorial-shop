
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Package } from 'lucide-react';
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
          <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-square bg-gray-100 relative overflow-hidden">
              {product.imagen_url ? (
                <img
                  src={product.imagen_url}
                  alt={product.nombre}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="h-16 w-16 text-gray-400" />
                </div>
              )}
              
              {product.stock !== undefined && product.stock <= 5 && product.stock > 0 && (
                <Badge 
                  className="absolute top-2 right-2 bg-orange-500 text-white"
                  variant="secondary"
                >
                  {t('store.last_units', { count: product.stock })}
                </Badge>
              )}
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                {product.nombre}
              </h3>
              
              {product.descripcion && (
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {product.descripcion}
                </p>
              )}

              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-blue-600">
                  {formatPrice(product.precio)}
                </span>
                
                <Button
                  size="sm"
                  onClick={() => handleAddToCart(product)}
                  disabled={!product.disponible || (product.stock !== undefined && product.stock === 0)}
                  className="flex items-center gap-2"
                >
                  <ShoppingCart className="h-4 w-4" />
                  {product.stock === 0 ? t('store.out_of_stock') : t('store.add_to_cart')}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
