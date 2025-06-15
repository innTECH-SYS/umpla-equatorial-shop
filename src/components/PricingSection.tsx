
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { SupportModal } from './SupportModal';

export const PricingSection = () => {
  const { t } = useTranslation();
  const [supportModalOpen, setSupportModalOpen] = useState(false);

  const plans = [
    {
      id: 'gratuito',
      name: 'Gratuito',
      price: 0,
      description: 'Perfecto para empezar',
      features: [
        'Hasta 10 productos',
        'Tienda básica personalizable',
        'Procesamiento de pedidos',
        'Soporte por email',
        'Subdominios umpla.gq'
      ],
      cta: 'Comenzar gratis',
      popular: false
    },
    {
      id: 'profesional',
      name: 'Profesional',
      price: 15000,
      description: 'Para negocios en crecimiento',
      features: [
        'Hasta 100 productos',
        'Tienda avanzada',
        'Analytics detallados',
        'Soporte prioritario',
        'Integración WhatsApp',
        'SEO optimizado'
      ],
      cta: 'Elegir Profesional',
      popular: true
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 30000,
      description: 'Para empresas establecidas',
      features: [
        'Productos ilimitados',
        'Dominio personalizado',
        'API avanzada',
        'Soporte 24/7',
        'Marketing automatizado',
        'Integraciones premium',
        'Reportes avanzados'
      ],
      cta: 'Elegir Premium',
      popular: false
    }
  ];

  return (
    <>
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              Planes y Precios
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Elige el plan perfecto para tu negocio. Todos incluyen hosting y seguridad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`relative p-8 ${plan.popular ? 'ring-2 ring-primary scale-105' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                      Más Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-secondary mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-primary">
                      {plan.price === 0 ? 'Gratis' : `${plan.price.toLocaleString()} XAF`}
                    </span>
                    {plan.price > 0 && <span className="text-gray-600">/mes</span>}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/auth" className="block">
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90' : 'bg-secondary hover:bg-secondary/90'}`}
                    size="lg"
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              ¿Necesitas algo diferente? Contáctanos para planes empresariales personalizados.
            </p>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => setSupportModalOpen(true)}
            >
              Hablar con ventas
            </Button>
          </div>
        </div>
      </section>

      <SupportModal 
        open={supportModalOpen} 
        onOpenChange={setSupportModalOpen}
      />
    </>
  );
};
