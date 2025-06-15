
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, UserPlus, Palette, Share2, Clock, Zap, DollarSign } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { BottomNavbar } from '@/components/BottomNavbar';

const ComoFunciona = () => {
  const { t } = useTranslation();

  const steps = [
    {
      icon: UserPlus,
      title: t('how_it_works.step1.title'),
      description: t('how_it_works.step1.description'),
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Palette,
      title: t('how_it_works.step2.title'),
      description: t('how_it_works.step2.description'),
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Share2,
      title: t('how_it_works.step3.title'),
      description: t('how_it_works.step3.description'),
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  const benefits = [
    {
      icon: Clock,
      title: t('how_it_works.ready_in_minutes'),
      description: 'Tu tienda estará lista en menos de 10 minutos'
    },
    {
      icon: Zap,
      title: t('how_it_works.no_tech_needed'),
      description: 'Interfaz súper simple, diseñada para cualquier persona'
    },
    {
      icon: DollarSign,
      title: t('how_it_works.free_to_start'),
      description: 'Comienza gratis, paga solo cuando vendas'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t('how_it_works.title')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              {t('how_it_works.subtitle')}
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge className="bg-green-500 text-white px-4 py-2 text-lg">
                {t('how_it_works.no_tech_needed')}
              </Badge>
              <Badge className="bg-yellow-500 text-white px-4 py-2 text-lg">
                {t('how_it_works.ready_in_minutes')}
              </Badge>
              <Badge className="bg-purple-500 text-white px-4 py-2 text-lg">
                {t('how_it_works.free_to_start')}
              </Badge>
            </div>
            <Link to="/auth">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                {t('how_it_works.cta')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Solo 3 pasos simples
            </h2>
            <p className="text-xl text-gray-600">
              Así de fácil es crear tu tienda online
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Card key={index} className="text-center relative">
                  <CardHeader>
                    <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{step.description}</CardDescription>
                  </CardContent>
                  
                  {/* Arrow for desktop */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ¿Por qué Umpla es diferente?
            </h2>
            <p className="text-xl text-gray-600">
              Pensado especialmente para Guinea Ecuatorial
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-gray-600" />
                    </div>
                    <CardTitle>{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{benefit.description}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-600 to-green-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Listo para empezar?
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Únete a cientos de comerciantes en Guinea Ecuatorial que ya venden online
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                {t('how_it_works.cta')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/stores">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
                Ver tiendas ejemplo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <BottomNavbar />
    </div>
  );
};

export default ComoFunciona;
