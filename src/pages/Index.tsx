
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { 
  Store, 
  CreditCard, 
  Globe, 
  BarChart3, 
  Shield, 
  Headphones,
  ArrowRight,
  CheckCircle,
  Zap
} from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: <Store className="h-6 w-6" />,
      title: "Tienda Completa",
      description: "Crea tu tienda online con productos físicos y digitales"
    },
    {
      icon: <CreditCard className="h-6 w-6" />,
      title: "Pagos Locales",
      description: "Acepta pagos con métodos populares en Guinea Ecuatorial"
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Dominio Propio",
      description: "Tu marca con dominio personalizado incluido"
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Estadísticas",
      description: "Analiza ventas y comportamiento de clientes"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Seguridad",
      description: "Protección SSL y respaldos automáticos"
    },
    {
      icon: <Headphones className="h-6 w-6" />,
      title: "Soporte 24/7",
      description: "Asistencia técnica en español siempre disponible"
    }
  ];

  const benefits = [
    "Sin conocimientos técnicos necesarios",
    "Configuración en menos de 5 minutos",
    "Diseños profesionales y responsive",
    "Inventario y pedidos automatizados"
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center animate-fade-in">
            <div className="flex justify-center mb-8">
              <div className="bg-primary/10 p-4 rounded-2xl">
                <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">U</span>
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-secondary mb-6">
              Tu tienda,{' '}
              <span className="text-primary">sin límites</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Crea tu tienda online en Guinea Ecuatorial sin conocimientos técnicos. 
              Vende productos físicos y digitales con pagos locales integrados.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/onboarding">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg font-semibold">
                  Crear mi tienda gratis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/store-example">
                <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                  Ver ejemplo
                </Button>
              </Link>
            </div>
            
            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>Sin tarjeta de crédito</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-success" />
                <span>Listo en 5 minutos</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              ¿Por qué elegir Umpla?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Diseñado específicamente para emprendedores en Guinea Ecuatorial
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <Card key={index} className="p-6 text-center bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
                <CheckCircle className="h-8 w-8 text-success mx-auto mb-4" />
                <p className="text-gray-700 font-medium">{benefit}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              Todo lo que necesitas
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Herramientas profesionales para hacer crecer tu negocio online
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-8 bg-white border border-gray-100 hover:border-primary/20 hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-center mb-4">
                  <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <div className="text-primary">
                      {feature.icon}
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-secondary mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
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
            Únete a cientos de emprendedores que ya están vendiendo online con Umpla
          </p>
          <Link to="/onboarding">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-50 px-8 py-4 text-lg font-semibold">
              Comenzar ahora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">U</span>
              </div>
              <span className="text-xl font-bold text-white">Umpla</span>
            </div>
            <p className="text-gray-400 mb-8">
              La plataforma de comercio electrónico líder en Guinea Ecuatorial
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-gray-400">
              <Link to="/pricing" className="hover:text-white transition-colors">
                Precios
              </Link>
              <Link to="/store-example" className="hover:text-white transition-colors">
                Ejemplo
              </Link>
              <Link to="/onboarding" className="hover:text-white transition-colors">
                Empezar
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
