
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { SEOHead } from '@/components/SEOHead';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { ShareStoreModal } from '@/components/ShareStoreModal';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Share2, 
  MapPin, 
  Phone, 
  Store,
  Star,
  ShoppingBag,
  ExternalLink
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

interface SEOData {
  meta_title?: string;
  meta_description?: string;
  og_image_url?: string;
}

const StoreProfile = () => {
  const { subdomain } = useParams<{ subdomain: string }>();
  const [store, setStore] = useState<StoreData | null>(null);
  const [seoData, setSeoData] = useState<SEOData>({});
  const [loading, setLoading] = useState(true);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (subdomain) {
      fetchStoreData(subdomain);
    }
  }, [subdomain]);

  const fetchStoreData = async (subdominio: string) => {
    try {
      // Obtener datos de la tienda
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

      // Obtener datos SEO
      if (storeData?.id) {
        const { data: seoData } = await supabase
          .from('tiendas_seo')
          .select('*')
          .eq('tienda_id', storeData.id)
          .maybeSingle();

        if (seoData) {
          setSeoData(seoData);
        }
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
            <Store className="h-6 w-6 text-white" />
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
  const seoTitle = seoData.meta_title || `${store.nombre} - Tienda en Umpla`;
  const seoDescription = seoData.meta_description || store.descripcion || `Visita la tienda ${store.nombre} en Umpla, la plataforma líder de comercio electrónico en Guinea Ecuatorial.`;
  const seoImage = seoData.og_image_url || store.logo_url || store.banner_url;

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead 
        title={seoTitle}
        description={seoDescription}
        image={seoImage}
        url={storeUrl}
      />

      {/* Banner Hero */}
      <section className="relative">
        {store.banner_url ? (
          <div 
            className="h-64 bg-cover bg-center relative"
            style={{ backgroundImage: `url(${store.banner_url})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          </div>
        ) : (
          <div className="h-64 bg-gradient-to-r from-blue-600 to-blue-800"></div>
        )}
        
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 w-full">
            <div className="flex items-end gap-6">
              {/* Logo */}
              <div className="w-24 h-24 bg-white rounded-xl shadow-lg flex items-center justify-center overflow-hidden border-4 border-white">
                {store.logo_url ? (
                  <img 
                    src={store.logo_url} 
                    alt={store.nombre}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Store className="h-12 w-12 text-blue-600" />
                )}
              </div>
              
              {/* Info */}
              <div className="flex-1 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold">{store.nombre}</h1>
                  {store.categoria && (
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      {store.categoria}
                    </Badge>
                  )}
                </div>
                {store.descripcion && (
                  <p className="text-lg opacity-90 max-w-2xl">{store.descripcion}</p>
                )}
              </div>

              {/* Share Button */}
              <Button 
                onClick={() => setShareModalOpen(true)}
                variant="secondary"
                className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Compartir
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contenido principal */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Información de contacto */}
            <div className="lg:col-span-1">
              <Card className="p-6 bg-white shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Información de contacto</h3>
                
                <div className="space-y-4">
                  {store.telefono && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Phone className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Teléfono</p>
                        <p className="font-medium text-gray-900">{store.telefono}</p>
                      </div>
                    </div>
                  )}

                  {store.ubicacion && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Ubicación</p>
                        <p className="font-medium text-gray-900">{store.ubicacion}</p>
                      </div>
                    </div>
                  )}

                  {store.telefono_whatsapp && (
                    <div className="pt-4 border-t border-gray-200">
                      <WhatsAppButton 
                        phoneNumber={store.telefono_whatsapp}
                        storeName={store.nombre}
                      />
                    </div>
                  )}
                </div>
              </Card>
            </div>

            {/* Contenido principal */}
            <div className="lg:col-span-2">
              <Card className="p-8 bg-white shadow-sm">
                <div className="text-center">
                  <ShoppingBag className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Bienvenido a {store.nombre}
                  </h2>
                  <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                    Esta tienda está creada con Umpla, la plataforma líder para crear tiendas online en Guinea Ecuatorial.
                  </p>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                    <h3 className="font-semibold text-blue-900 mb-2">¿Quieres crear tu propia tienda?</h3>
                    <p className="text-blue-700 text-sm mb-4">
                      Con Umpla puedes crear tu tienda online en minutos y empezar a vender hoy mismo.
                    </p>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Crear mi tienda gratis
                    </Button>
                  </div>

                  <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>Powered by Umpla</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp flotante */}
      {store.telefono_whatsapp && (
        <WhatsAppButton 
          phoneNumber={store.telefono_whatsapp}
          storeName={store.nombre}
          isFloating
        />
      )}

      {/* Modal de compartir */}
      <ShareStoreModal 
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        storeUrl={storeUrl}
        storeName={store.nombre}
      />
    </div>
  );
};

export default StoreProfile;
