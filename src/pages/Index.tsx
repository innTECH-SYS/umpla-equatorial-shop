
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OnboardingFlow } from "@/components/OnboardingFlow";
import { BottomNavbar } from "@/components/BottomNavbar";
import { useFirstVisit } from "@/hooks/useFirstVisit";
import { useTranslation } from "@/hooks/useTranslation";
import { supabase } from "@/integrations/supabase/client";
import { normalizeStoreName } from "@/lib/storeUtils";
import { 
  Store, 
  Shield, 
  Truck, 
  CreditCard, 
  ChevronRight,
  MapPin,
  Star,
  Package,
  Users,
  TrendingUp,
  Heart
} from "lucide-react";

interface FeaturedStore {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  ubicacion: string;
  productos_count?: number;
}

const Index = () => {
  const { t } = useTranslation();
  const { isFirstVisit, isChecking, markAsVisited } = useFirstVisit();
  const [featuredStores, setFeaturedStores] = useState<FeaturedStore[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedStores();
  }, []);

  const loadFeaturedStores = async () => {
    try {
      const { data: storesData, error } = await supabase
        .from('tiendas')
        .select('*')
        .eq('activa', true)
        .limit(3);

      if (error) throw error;

      // Get product counts
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

      setFeaturedStores(storesWithCounts);
    } catch (error) {
      console.error('Error loading featured stores:', error);
    } finally {
      setLoading(false);
    }
  };

  if (isChecking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">U</span>
        </div>
      </div>
    );
  }

  if (isFirstVisit) {
    return <OnboardingFlow onComplete={markAsVisited} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">U</span>
              </div>
              <span className="font-bold text-xl text-gray-900">Umpla</span>
            </div>
            
            <div className="hidden lg:flex items-center gap-8">
              <Link to="/" className="text-gray-700 hover:text-primary">
                {t('nav.home')}
              </Link>
              <Link to="/stores" className="text-gray-700 hover:text-primary">
                {t('nav.stores')}
              </Link>
              <Link to="/auth" className="text-gray-700 hover:text-primary">
                {t('nav.login')}
              </Link>
            </div>

            <Button asChild className="hidden lg:inline-flex">
              <Link to="/auth">
                {t('nav.register')}
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white py-20">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {t('home.hero.title')}
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            {t('home.hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-white text-blue-600 hover:bg-gray-100">
              <Link to="/stores">
                <Store className="h-5 w-5 mr-2" />
                {t('home.hero.cta')}
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-blue-600">
              <Link to="/auth">
                {t('home.hero.createStore')}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('home.features.title')}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t('home.features.local.title')}
              </h3>
              <p className="text-gray-600">
                {t('home.features.local.description')}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t('home.features.secure.title')}
              </h3>
              <p className="text-gray-600">
                {t('home.features.secure.description')}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t('home.features.delivery.title')}
              </h3>
              <p className="text-gray-600">
                {t('home.features.delivery.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Stores */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {t('home.stores.title')}
              </h2>
              <p className="text-gray-600">
                {t('home.stores.subtitle')}
              </p>
            </div>
            <Button variant="outline" asChild className="hidden sm:inline-flex">
              <Link to="/stores">
                {t('home.stores.viewAll')}
                <ChevronRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredStores.map((store) => (
              <Card key={store.id} className="hover:shadow-lg transition-shadow group">
                <CardContent className="p-0">
                  <Link to={`/store/${normalizeStoreName(store.nombre)}`}>
                    {/* Store Header */}
                    <div className="relative h-40 bg-gradient-to-br from-blue-500 to-purple-600 rounded-t-lg">
                      <div className="absolute inset-0 bg-black/20 rounded-t-lg" />
                      <div className="absolute bottom-4 left-4">
                        <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-lg">
                          <Store className="h-8 w-8 text-gray-700" />
                        </div>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-green-500 text-white">
                          <Shield className="h-3 w-3 mr-1" />
                          Verificada
                        </Badge>
                      </div>
                    </div>

                    {/* Store Info */}
                    <div className="p-6">
                      <h3 className="font-semibold text-xl text-gray-900 mb-2 group-hover:text-primary transition-colors">
                        {store.nombre}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {store.descripcion}
                      </p>

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
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
                          <span>{store.productos_count} productos</span>
                        </div>
                        
                        <Badge variant="secondary">
                          {store.categoria}
                        </Badge>
                      </div>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8 sm:hidden">
            <Button asChild>
              <Link to="/stores">
                {t('home.stores.viewAll')}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">100+</div>
              <div className="text-gray-600">Tiendas verificadas</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">5000+</div>
              <div className="text-gray-600">Productos disponibles</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">98%</div>
              <div className="text-gray-600">Satisfacción del cliente</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-gray-600">Soporte disponible</div>
            </div>
          </div>
        </div>
      </section>

      <BottomNavbar />
    </div>
  );
};

export default Index;
