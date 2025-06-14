
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { 
  Check, 
  Star,
  ArrowRight,
  Zap,
  Crown,
  Rocket
} from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: "Básico",
      price: "₣ 15,000",
      period: "/mes",
      description: "Perfecto para empezar tu negocio online",
      icon: <Zap className="h-6 w-6" />,
      popular: false,
      features: [
        "Hasta 50 productos",
        "Tienda online completa",
        "Dominio umpla.com",
        "Certificado SSL",
        "Soporte por email",
        "Diseños responsive",
        "Estadísticas básicas",
        "Métodos de pago locales"
      ],
      cta: "Empezar gratis",
      ctaVariant: "outline" as const
    },
    {
      name: "Profesional",
      price: "₣ 35,000",
      period: "/mes",
      description: "Ideal para negocios en crecimiento",
      icon: <Star className="h-6 w-6" />,
      popular: true,
      features: [
        "Productos ilimitados",
        "Dominio personalizado",
        "Estadísticas avanzadas",
        "Soporte prioritario 24/7",
        "Marketing por email",
        "Descuentos y cupones",
        "Múltiples métodos de pago",
        "Integración con redes sociales",
        "Respaldos automáticos",
        "SEO optimizado"
      ],
      cta: "Empezar ahora",
      ctaVariant: "default" as const
    },
    {
      name: "Premium",
      price: "₣ 65,000",
      period: "/mes",
      description: "Para empresas que buscan máximo rendimiento",
      icon: <Crown className="h-6 w-6" />,
      popular: false,
      features: [
        "Todo de Profesional +",
        "Múltiples tiendas",
        "API personalizada",
        "Gerente de cuenta dedicado",
        "Diseño personalizado",
        "Análisis de comportamiento",
        "Automatización avanzada",
        "Integración con inventarios",
        "Reportes personalizados",
        "Capacitación personalizada"
      ],
      cta: "Contactar ventas",
      ctaVariant: "outline" as const
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
            Planes que se adaptan a{' '}
            <span className="text-primary">tu negocio</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Comienza gratis y crece con planes diseñados para emprendedores en Guinea Ecuatorial
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-success" />
              <span>14 días gratis</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-success" />
              <span>Sin compromiso</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-success" />
              <span>Cancela cuando quieras</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative p-8 bg-white transition-all duration-300 hover:shadow-xl ${
                plan.popular 
                  ? 'border-2 border-primary shadow-lg scale-105' 
                  : 'border border-gray-200 hover:border-primary/30'
              }`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                      <Rocket className="h-4 w-4" />
                      Más popular
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <div className={`inline-flex p-3 rounded-xl mb-4 ${
                    plan.popular ? 'bg-primary/10' : 'bg-gray-100'
                  }`}>
                    <div className={plan.popular ? 'text-primary' : 'text-gray-600'}>
                      {plan.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-secondary mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-secondary">{plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                  
                  <Link to="/onboarding">
                    <Button 
                      className={`w-full py-3 text-lg font-semibold ${
                        plan.popular 
                          ? 'bg-primary hover:bg-primary/90 text-white' 
                          : plan.ctaVariant === 'outline' 
                            ? 'border-2 border-primary text-primary hover:bg-primary hover:text-white'
                            : ''
                      }`}
                      variant={plan.popular ? 'default' : plan.ctaVariant}
                    >
                      {plan.cta}
                      {plan.cta !== 'Contactar ventas' && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>
                  </Link>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-secondary text-center mb-4">¿Qué incluye?</h4>
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <div className={`p-1 rounded-full ${
                        plan.popular ? 'bg-primary/10' : 'bg-gray-100'
                      }`}>
                        <Check className={`h-3 w-3 ${
                          plan.popular ? 'text-primary' : 'text-gray-600'
                        }`} />
                      </div>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              Preguntas frecuentes
            </h2>
            <p className="text-xl text-gray-600">
              Todo lo que necesitas saber sobre nuestros planes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-secondary mb-2">¿Puedo cambiar de plan?</h3>
              <p className="text-gray-600 text-sm mb-6">Sí, puedes cambiar tu plan en cualquier momento desde tu dashboard. Los cambios se aplican inmediatamente.</p>
              
              <h3 className="font-semibold text-secondary mb-2">¿Hay período de prueba?</h3>
              <p className="text-gray-600 text-sm mb-6">Todos los planes incluyen 14 días gratis. No se requiere tarjeta de crédito para comenzar.</p>
              
              <h3 className="font-semibold text-secondary mb-2">¿Qué métodos de pago acepto?</h3>
              <p className="text-gray-600 text-sm">Integramos los métodos de pago más populares en Guinea Ecuatorial, incluyendo transferencias bancarias y móviles.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-secondary mb-2">¿Incluyen soporte técnico?</h3>
              <p className="text-gray-600 text-sm mb-6">Sí, todos los planes incluyen soporte en español. El plan Profesional y Premium tienen soporte prioritario 24/7.</p>
              
              <h3 className="font-semibold text-secondary mb-2">¿Puedo usar mi propio dominio?</h3>
              <p className="text-gray-600 text-sm mb-6">Los planes Profesional y Premium incluyen dominio personalizado. El plan Básico usa subdominio de Umpla.</p>
              
              <h3 className="font-semibold text-secondary mb-2">¿Hay límite de ventas?</h3>
              <p className="text-gray-600 text-sm">No hay límites en el número de ventas o ingresos que puedes generar con tu tienda Umpla.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            ¿Listo para empezar?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Únete a cientos de emprendedores que ya están vendiendo con éxito en Guinea Ecuatorial
          </p>
          <Link to="/onboarding">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-50 px-8 py-4 text-lg font-semibold">
              Empezar gratis por 14 días
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
