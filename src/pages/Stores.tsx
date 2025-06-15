
import { useState, useEffect } from 'react';
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Star, Store, Package, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from '@/integrations/supabase/client';
import { normalizeStoreName } from '@/lib/storeUtils';
import { BottomNavbar } from "@/components/BottomNavbar";
import { useTranslation } from "@/hooks/useTranslation";

interface StoreData {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  logo_url?: string;
  activa: boolean;
  productCount?: number;
}

const Stores = () => {
  const { t } = useTranslation();
  const [stores, setStores] = useState<StoreData[]>([]);
  const [filteredStores, setFilteredStores] = useState<StoreData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { key: 'all', label: t('stores.categories.all') },
    { key: 'Tecnología', label: t('stores.categories.technology') },
    { key: 'Moda', label: t('stores.categories.fashion') },
    { key: 'Alimentación', label: t('stores.categories.food') },
    { key: 'Salud', label: t('stores.categories.health') },
    { key: 'Belleza', label: t('stores.categories.beauty') },
    { key: 'Deportes', label: t('stores.categories.sports') }
  ];

  useEffect(() => {
    const loadStores = async () => {
      try {
        const { data: storesData, error: storesError } = await supabase
          .from('tiendas')
          .select('*')
          .eq('activa', true)
          .order('creado_el', { ascending: false });

        if (storesError) throw storesError;

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
        setFilteredStores(storesWithProducts);
      } catch (error) {
        console.error('Error loading stores:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStores();
  }, []);

  useEffect(() => {
    let filtered = stores;

    if (searchTerm) {
      filtered = filtered.filter(store =>
        store.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(store => store.categoria === selectedCategory);
    }

    setFilteredStores(filtered);
  }, [searchTerm, selectedCategory, stores]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary mb-4">
            {t('stores.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('stores.subtitle')}
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder={t('stores.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category.key}
                variant={selectedCategory === category.key ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.key)}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Stores Grid */}
        {loading ? (
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
        ) : filteredStores.length === 0 ? (
          <div className="text-center py-12">
            <Store className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {t('stores.noStores')}
            </h3>
            <p className="text-gray-500">
              Intenta ajustar los filtros de búsqueda
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStores.map((store) => (
              <Card key={store.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                <div className="aspect-video bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center relative group-hover:scale-105 transition-transform duration-300">
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
                    <h3 className="font-bold text-lg text-secondary group-hover:text-primary transition-colors">
                      {store.nombre}
                    </h3>
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
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      {t('stores.visitStore')}
                    </Button>
                  </Link>
                </div>
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
