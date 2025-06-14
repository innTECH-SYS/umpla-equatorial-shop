
import { Check, Crown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useUserPlan } from '@/hooks/useUserPlan';

const Pricing = () => {
  const { userPlan, loading } = useUserPlan();

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 'Gratis',
      period: '',
      description: 'Perfecto para empezar tu negocio online',
      features: [
        'Hasta 10 productos',
        'Tienda básica',
        'Soporte por email',
        'Sin gestión de stock',
        'Hasta 2 imágenes por producto'
      ],
      buttonText: 'Plan actual',
      popular: false,
      current: userPlan === 'basic'
    },
    {
      id: 'professional',
      name: 'Professional',
      price: '₣5,000',
      period: '/mes',
      description: 'Para negocios en crecimiento',
      features: [
        'Hasta 50 productos',
        'Tienda personalizada',
        'Soporte prioritario',
        'Gestión completa de stock',
        'Hasta 5 imágenes por producto',
        'Análisis básicos',
        'Verificación KYC disponible'
      ],
      buttonText: userPlan === 'professional' ? 'Plan actual' : 'Actualizar plan',
      popular: true,
      current: userPlan === 'professional'
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '₣10,000',
      period: '/mes',
      description: 'Para empresas establecidas',
      features: [
        'Hasta 100 productos',
        'Productos extra con cuota adicional',
        'Tienda completamente personalizada',
        'Soporte 24/7',
        'Gestión completa de stock',
        'Hasta 10 imágenes por producto',
        'Análisis avanzados',
        'Dominio .gq gratuito por 1 año',
        'Múltiples métodos de pago',
        'Verificación KYC disponible'
      ],
      buttonText: userPlan === 'premium' ? 'Plan actual' : 'Actualizar plan',
      popular: false,
      current: userPlan === 'premium'
    }
  ];

  const handleClose = () => {
    window.history.back();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mx-auto mb-2">
            <span className="text-white font-bold text-lg">T</span>
          </div>
          <p className="text-gray-600">Cargando planes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">TuTienda</h1>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={handleClose}>
                Volver
              </Button>
              <Button variant="ghost" size="icon" onClick={handleClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Elige el plan perfecto para tu negocio
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comienza gratis y escala tu negocio con nuestros planes diseñados para crecer contigo
          </p>
        </div>

        {/* Current Plan Indicator */}
        {userPlan && (
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
              <Crown className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-blue-800">
                Tu plan actual: <span className="font-semibold capitalize">{userPlan}</span>
              </span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? 'ring-2 ring-blue-500 shadow-lg scale-105' : ''} ${plan.current ? 'ring-2 ring-green-500' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Más popular
                  </span>
                </div>
              )}

              {plan.current && (
                <div className="absolute -top-4 right-4">
                  <Badge className="bg-green-500 text-white">
                    Plan actual
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>
                <CardDescription className="mt-2">{plan.description}</CardDescription>
              </CardHeader>

              <CardContent className="pt-4">
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full ${plan.popular && !plan.current ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                  variant={plan.current ? 'outline' : plan.popular ? 'default' : 'outline'}
                  disabled={plan.current}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ or Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-gray-600">
            ¿Tienes preguntas? <a href="#" className="text-blue-600 hover:underline">Contáctanos</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
