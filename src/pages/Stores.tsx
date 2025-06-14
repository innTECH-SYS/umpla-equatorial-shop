
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BottomNavbar } from '@/components/BottomNavbar';
import { useTranslation } from '@/hooks/useTranslation';
import { supabase } from '@/integrations/supabase/client';
import { normalizeStoreName } from '@/lib/storeUtils';
import { 
  Search, 
  Store, 
  MapPin, 
  Star, 
  Package,
  Shield,
  Loader2
} from 'lucide-react';

interface Store {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  ubicacion: string;
  logo_url?: string;
  telefono?: string;
  activa: boolean;
  productos_count?: number;
}

const Stores = () => {
  const { t } = useTranslation();
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: t('stores.categories.all') },
    { id: 'Tecnología', label: t('stores.categories.technology') },
    { id: 'Moda', label: t('stores.categories.fashion') },
    { id: 'Alimentación', label: t('stores.categories.food') },
  ];

  useEffect(() => {
    loadStores();
  }, []);

  const loadStores = async () => {
    try {
      const { data: storesData, error } = await supabase
        .from('tiendas')
        .select('*')
        .eq('activa', true)
        .order('creado_el', { ascending: false });

      if (error) throw error;

      // Get product counts for each store
      const storesWithCounts = await Promise.all(
        (storesData || []).map(async (store) => {
          const { count } = await supabase
            .from('productos')
            .select('*', { count: 'exact', head: true })
            .eq('tienda_id', store.id)
            .eq('activo', true);

          return {
            ...store,
            productos_count: count || 0
          };
        })
      );

      setStores(storesWithCounts);
    } catch (error) {
      console.error('Error loading stores:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredStores = stores.filter(store => {
    const matchesSearch = store.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         store.descripcion?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || store.categoria === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-gray-600">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {t('stores.title')}
            </h1>
            <p className="text-gray-600">
              {t('stores.subtitle')}
            </p>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder={t('stores.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="whitespace-nowrap"
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Stores Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredStores.length === 0 ? (
          <div className="text-center py-12">
            <Store className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {t('stores.noStores')}
            </h3>
            <p className="text-gray-600">
              Intenta cambiar los filtros de búsqueda
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredStores.map((store) => (
              <Card key={store.id} className="hover:shadow-lg transition-shadow group cursor-pointer">
                <CardContent className="p-0">
                  <Link to={`/store/${normalizeStoreName(store.nombre)}`}>
                    {/* Store Header */}
                    <div className="relative h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-t-lg">
                      <div className="absolute inset-0 bg-black/20 rounded-t-lg" />
                      <div className="absolute bottom-4 left-4">
                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-lg">
                          <Store className="h-6 w-6 text-gray-700" />
                        </div>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-green-500 text-white">
                          <Shield className="h-3 w-3 mr-1" />
                          {t('stores.verified')}
                        </Badge>
                      </div>
                    </div>

                    {/* Store Info */}
                    <div className="p-4">
                      <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-primary transition-colors">
                        {store.nombre}
                      </h3>
                      
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {store.descripcion}
                      </p>

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{store.ubicacion}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>4.8</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Package className="h-4 w-4" />
                          <span>{store.productos_count} {t('stores.products')}</span>
                        </div>
                        
                        <Badge variant="secondary">
                          {store.categoria}
                        </Badge>
                      </div>
                    </div>

                    <div className="px-4 pb-4">
                      <Button className="w-full group-hover:bg-primary/90 transition-colors">
                        {t('stores.visitStore')}
                      </Button>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <BottomNavbar />
    </div>
  );
};

export default Stores;
