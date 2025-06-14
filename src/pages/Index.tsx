
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ShoppingBag, Shield, Truck, Star, Store, MapPin, Phone } from 'lucide-react';
import { OnboardingFlow } from '@/components/OnboardingFlow';
import { BottomNavbar } from '@/components/BottomNavbar';
import { useFirstVisit } from '@/hooks/useFirstVisit';
import { useTranslation } from '@/hooks/useTranslation';
import { Link, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';

const Index = () => {
  const { isFirstVisit, markAsVisited } = useFirstVisit();
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Tiendas destacadas (simuladas)
  const featuredStores = [
    {
      id: 1,
      name: 'TechnoMax',
      description: 'Tecnología y electrónicos',
      products: 25,
      rating: 4.8,
      verified: true,
      location: 'Malabo',
      phone: '+240 222 123 456',
      category: 'Tecnología'
    },
    {
      id: 2,
      name: 'ModaStyle',
      description: 'Moda y accesorios',
      products: 42,
      rating: 4.9,
      verified: true,
      location: 'Bata',
      phone: '+240 222 234 567',
      category: 'Moda'
    },
    {
      id: 3,
      name: 'SuperMarket Express',
      description: 'Productos frescos y alimentación',
      products: 18,
      rating: 4.7,
      verified: true,
      location: 'Malabo',
      phone: '+240 222 345 678',
      category: 'Alimentación'
    }
  ];

  const handleOnboardingComplete = () => {
    markAsVisited();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Onboarding para primera visita */}
      {isFirstVisit && (
        <OnboardingFlow onComplete={handleOnboardingComplete} />
      )}

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t('home.hero.title')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              {t('home.hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/stores">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  {t('home.hero.cta')}
                </Button>
              </Link>
              <Link to="/auth">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  <Store className="mr-2 h-5 w-5" />
                  {t('home.hero.createStore')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('home.features.title')}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Store className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle>{t('home.features.local.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{t('home.features.local.description')}</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle>{t('home.features.secure.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{t('home.features.secure.description')}</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle>{t('home.features.delivery.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{t('home.features.delivery.description')}</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Stores Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('home.stores.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('home.stores.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {featuredStores.map((store) => (
              <Card key={store.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      {store.name}
                      {store.verified && (
                        <Badge className="bg-blue-600">
                          {t('stores.verified')}
                        </Badge>
                      )}
                    </CardTitle>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{store.rating}</span>
                    </div>
                  </div>
                  <CardDescription>{store.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="h-4 w-4" />
                      <span>{store.products} {t('stores.products')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{store.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>{store.phone}</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    <ArrowRight className="mr-2 h-4 w-4" />
                    {t('stores.visitStore')}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link to="/stores">
              <Button size="lg">
                {t('home.stores.viewAll')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <BottomNavbar />
    </div>
  );
};

export default Index;
