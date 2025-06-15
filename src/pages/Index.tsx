
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Store, Truck, Shield, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { FeaturedStores } from "@/components/FeaturedStores";
import { PricingSection } from "@/components/PricingSection";
import { BottomNavbar } from "@/components/BottomNavbar";
import { useTranslation } from "@/hooks/useTranslation";

const Index = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-secondary mb-6">
              {t('home.hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {t('home.hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/stores">
                <Button size="lg" variant="outline" className="text-lg px-8 py-3">
                  {t('home.hero.cta')}
                </Button>
              </Link>
              <Link to="/auth">
                <Button size="lg" className="text-lg px-8 py-3">
                  {t('home.hero.createStore')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              {t('home.features.title')}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 text-center border-0 shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Store className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-secondary mb-4">
                {t('home.features.local.title')}
              </h3>
              <p className="text-gray-600">
                {t('home.features.local.description')}
              </p>
            </Card>

            <Card className="p-8 text-center border-0 shadow-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-secondary mb-4">
                {t('home.features.secure.title')}
              </h3>
              <p className="text-gray-600">
                {t('home.features.secure.description')}
              </p>
            </Card>

            <Card className="p-8 text-center border-0 shadow-lg">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-secondary mb-4">
                {t('home.features.delivery.title')}
              </h3>
              <p className="text-gray-600">
                {t('home.features.delivery.description')}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Stores Section */}
      <FeaturedStores />

      {/* Pricing Section */}
      <PricingSection />

      {/* CTA Section */}
      <section className="bg-primary py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            ¿Listo para crear tu tienda online?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Únete a cientos de vendedores que ya confían en Umpla
          </p>
          <Link to="/auth">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
              {t('home.hero.createStore')}
            </Button>
          </Link>
        </div>
      </section>

      <BottomNavbar />
    </div>
  );
};

export default Index;
