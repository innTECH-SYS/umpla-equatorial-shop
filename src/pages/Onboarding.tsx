
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ArrowLeft,
  Store,
  CreditCard,
  Package,
  Globe,
  BarChart3,
  Headphones,
  CheckCircle,
  Zap
} from 'lucide-react';

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Bienvenido a Umpla",
      subtitle: "Tu tienda online en minutos",
      content: (
        <div className="text-center space-y-6">
          <div className="bg-primary/10 p-6 rounded-2xl inline-block">
            <div className="w-20 h-20 bg-primary rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-3xl">U</span>
            </div>
          </div>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Vamos a configurar tu tienda online paso a paso. Es muy fácil y rápido.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-success" />
              <span>Solo 4 pasos</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-success" />
              <span>5 minutos</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Beneficios principales",
      subtitle: "Todo lo que obtienes con Umpla",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 bg-white border border-gray-100">
            <Store className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-semibold text-secondary mb-2">Tienda completa</h3>
            <p className="text-gray-600 text-sm">Vende productos físicos y digitales con catálogo ilimitado</p>
          </Card>
          <Card className="p-6 bg-white border border-gray-100">
            <CreditCard className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-semibold text-secondary mb-2">Pagos locales</h3>
            <p className="text-gray-600 text-sm">Métodos de pago populares en Guinea Ecuatorial integrados</p>
          </Card>
          <Card className="p-6 bg-white border border-gray-100">
            <Package className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-semibold text-secondary mb-2">Gestión fácil</h3>
            <p className="text-gray-600 text-sm">Inventario, pedidos y envíos automatizados</p>
          </Card>
          <Card className="p-6 bg-white border border-gray-100">
            <Globe className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-semibold text-secondary mb-2">Dominio propio</h3>
            <p className="text-gray-600 text-sm">Tu marca con dirección web personalizada</p>
          </Card>
        </div>
      )
    },
    {
      title: "Características del SaaS",
      subtitle: "Tecnología profesional a tu alcance",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-primary/10 p-4 rounded-xl inline-block mb-4">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-secondary mb-2">Dominio incluido</h3>
              <p className="text-gray-600 text-sm">tutienda.umpla.com o conecta tu dominio</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 p-4 rounded-xl inline-block mb-4">
                <Headphones className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-secondary mb-2">Soporte 24/7</h3>
              <p className="text-gray-600 text-sm">Asistencia técnica en español</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 p-4 rounded-xl inline-block mb-4">
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-secondary mb-2">Estadísticas</h3>
              <p className="text-gray-600 text-sm">Analíticas detalladas de ventas</p>
            </div>
          </div>
          <div className="bg-gray-50 p-6 rounded-xl">
            <h4 className="font-semibold text-secondary mb-3">¿Qué más incluye?</h4>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>Certificado SSL para seguridad</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>Respaldos automáticos diarios</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>Diseños responsive para móviles</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>SEO optimizado para buscadores</span>
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "¡Listo para comenzar!",
      subtitle: "Elige tu próximo paso",
      content: (
        <div className="text-center space-y-8">
          <div className="bg-success/10 p-6 rounded-2xl inline-block">
            <CheckCircle className="h-16 w-16 text-success mx-auto" />
          </div>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Ya conoces todo sobre Umpla. ¿Estás listo para crear tu tienda online?
          </p>
          <div className="space-y-4">
            <Link to="/dashboard" className="block">
              <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-white py-4 text-lg font-semibold">
                Crear mi tienda ahora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/store-example" className="block">
              <Button variant="outline" size="lg" className="w-full py-4 text-lg">
                Explorar Umpla primero
              </Button>
            </Link>
          </div>
        </div>
      )
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">U</span>
            </div>
            <span className="text-xl font-bold text-secondary">Umpla</span>
          </Link>
          
          {/* Progress Bar */}
          <div className="flex items-center justify-center space-x-2 mb-8">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-12 rounded-full transition-colors ${
                  index <= currentStep ? 'bg-primary' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <Card className="p-8 md:p-12 bg-white border-0 shadow-lg animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-2">
              {steps[currentStep].title}
            </h1>
            <p className="text-xl text-gray-600">
              {steps[currentStep].subtitle}
            </p>
          </div>

          <div className="mb-12">
            {steps[currentStep].content}
          </div>

          {/* Navigation */}
          {currentStep < steps.length - 1 && (
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Anterior
              </Button>
              
              <span className="text-sm text-gray-500">
                {currentStep + 1} de {steps.length}
              </span>
              
              <Button onClick={nextStep} className="flex items-center gap-2">
                Siguiente
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;
