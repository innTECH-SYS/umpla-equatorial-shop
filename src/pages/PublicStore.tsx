
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { SEOHead } from '@/components/SEOHead';
import { PublicStoreHeader } from '@/components/store/PublicStoreHeader';
import { PublicStoreFooter } from '@/components/store/PublicStoreFooter';
import { ProductGrid } from '@/components/store/ProductGrid';
import { CartSidebar } from '@/components/CartSidebar';
import { useToast } from '@/hooks/use-toast';
import { ShoppingBag } from 'lucide-react';

interface StoreData {
  id: string;
  nombre: string;
  descripcion?: string;
  categoria?: string;
  telefono?: string;
  telefono_whatsapp?: string;
  ubicacion?: string;
  logo_url?: string;
  banner_url?: string;
  subdominio?: string;
  activa: boolean;
}

interface Product {
  id: string;
  nombre: string;
  descripcion?: string;
  precio: number;
  imagen_url?: string;
  disponible: boolean;
  activo: boolean;
  stock?: number;
}

const PublicStore = () => {
  const { subdomain } = useParams<{ subdomain: string }>();
  const [store, setStore] = useState<StoreData | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (subdomain) {
      fetchStoreData(subdomain);
    }
  }, [subdomain]);

  const fetchStoreData = async (subdominio: string) => {
    try {
      // Get store data
      const { data: storeData, error: storeError } = await supabase
        .from('tiendas')
        .select('*')
        .eq('subdominio', subdominio)
        .eq('activa', true)
        .single();

      if (storeError) {
        console.error('Error fetching store:', storeError);
        toast({
          title: "Tienda no encontrada",
          description: "La tienda que buscas no existe o no está disponible.",
          variant: "destructive"
        });
        return;
      }

      setStore(storeData);

      // Get store products
      const { data: productsData, error: productsError } = await supabase
        .from('productos')
        .select('*')
        .eq('tienda_id', storeData.id)
        .eq('activo', true)
        .eq('disponible', true)
        .order('destacado', { ascending: false })
        .order('creado_el', { ascending: false });

      if (productsError) {
        console.error('Error fetching products:', productsError);
      } else {
        setProducts(productsData || []);
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Ocurrió un error al cargar la tienda.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4 animate-pulse">
            <ShoppingBag className="h-6 w-6 text-white" />
          </div>
          <p className="text-gray-600">Cargando tienda...</p>
        </div>
      </div>
    );
  }

  if (!store) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Tienda no encontrada</h1>
          <p className="text-gray-600">La tienda que buscas no existe o no está disponible.</p>
        </div>
      </div>
    );
  }

  const storeUrl = `${window.location.origin}/tienda/${store.subdominio}`;
  const seoTitle = `${store.nombre} - Tienda en Umpla`;
  const seoDescription = store.descripcion || `Visita la tienda ${store.nombre} en Umpla, la plataforma líder de comercio electrónico en Guinea Ecuatorial.`;

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead 
        title={seoTitle}
        description={seoDescription}
        image={store.logo_url || store.banner_url}
        url={storeUrl}
      />

      <PublicStoreHeader store={store} />
      
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {products.length > 0 ? (
            <ProductGrid products={products} store={store} />
          ) : (
            <div className="text-center py-12">
              <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No hay productos disponibles
              </h3>
              <p className="text-gray-500">
                Esta tienda aún no tiene productos en venta.
              </p>
            </div>
          )}
        </div>
      </main>

      <PublicStoreFooter />
      <CartSidebar />
    </div>
  );
};

export default PublicStore;
