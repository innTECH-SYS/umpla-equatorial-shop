
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Store, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { normalizeStoreName } from '@/lib/storeUtils';
import { useTranslation } from '@/hooks/useTranslation';

interface StoreData {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  logo_url?: string;
  activa: boolean;
  productCount?: number;
}

export const FeaturedStores = () => {
  const { t } = useTranslation();
  const [stores, setStores] = useState<StoreData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedStores = async () => {
      try {
        // Obtener tiendas activas
        const { data: storesData, error: storesError } = await supabase
          .from('tiendas')
          .select('*')
          .eq('activa', true)
          .limit(6);

        if (storesError) throw storesError;

        // Para cada tienda, contar sus productos
        const storesWithProducts = await Promise.all(
          (storesData || []).map(async (store) => {
            const { count } = await supabase
              .from('productos')
              .select('*', { count: 'exact', head: true })
              .eq('tienda_id', store.id)
              .eq('activo', true)
              .eq('disponible', true);

            return {
              ...store,
              productCount: count || 0
            };
          })
        );

        setStores(storesWithProducts);
      } catch (error) {
        console.error('Error loading featured stores:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedStores();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              {t('home.stores.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('home.stores.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="p-6 animate-pulse">
                <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            {t('home.stores.title')}
          </h2>
          <p className="text-xl text-gray-600">
            {t('home.stores.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {stores.map((store) => (
            <Card key={store.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center relative">
                {store.logo_url ? (
                  <img 
                    src={store.logo_url} 
                    alt={store.nombre}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Store className="h-16 w-16 text-gray-400" />
                )}
                <Badge className="absolute top-3 right-3 bg-green-500 text-white">
                  {t('stores.verified')}
                </Badge>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-lg text-secondary">{store.nombre}</h3>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600">4.5</span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-3 line-clamp-2">{store.descripcion}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="secondary">{store.categoria}</Badge>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Package className="h-4 w-4" />
                    <span>{store.productCount} {t('stores.products')}</span>
                  </div>
                </div>
                
                <Link to={`/store/${normalizeStoreName(store.nombre)}`}>
                  <Button className="w-full">
                    {t('stores.visitStore')}
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/stores">
            <Button variant="outline" size="lg">
              {t('home.stores.viewAll')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
