
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Pricing = () => {
  const plans = [
    {
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
      buttonText: 'Comenzar gratis',
      popular: false
    },
    {
      name: 'Professional',
      price: '₣5,000',
      period: '/mes',
      description: 'Para negocios en crecimiento',
      features: [
        'Hasta 100 productos',
        'Tienda personalizada',
        'Soporte prioritario',
        'Gestión completa de stock',
        'Imágenes ilimitadas por producto',
        'Análisis avanzados'
      ],
      buttonText: 'Comenzar ahora',
      popular: true
    },
    {
      name: 'Premium',
      price: '₣10,000',
      period: '/mes',
      description: 'Para empresas establecidas',
      features: [
        'Productos ilimitados',
        'Tienda completamente personalizada',
        'Soporte 24/7',
        'Gestión completa de stock',
        'Imágenes ilimitadas por producto',
        'Análisis avanzados',
        'Dominio personalizado',
        'Múltiples métodos de pago'
      ],
      buttonText: 'Comenzar ahora',
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">TuTienda</h1>
            <Button variant="outline">Volver al inicio</Button>
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? 'ring-2 ring-blue-500 shadow-lg scale-105' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Más popular
                  </span>
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
                  className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                  variant={plan.popular ? 'default' : 'outline'}
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
