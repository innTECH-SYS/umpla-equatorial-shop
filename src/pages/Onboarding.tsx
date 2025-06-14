
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const steps = [
    {
      title: "Bienvenido a Umpla",
      description: "La plataforma más fácil para crear tu tienda online en Guinea Ecuatorial",
      content: (
        <div className="text-center space-y-4">
          <div className="text-4xl md:text-6xl mb-4">🏪</div>
          <p className="text-base md:text-lg text-gray-600 max-w-md mx-auto">
            Sin conocimientos técnicos, sin complicaciones. Solo necesitas unos minutos para tener tu tienda funcionando.
          </p>
        </div>
      )
    },
    {
      title: "Beneficios clave",
      description: "Todo lo que necesitas para vender online",
      content: (
        <div className="space-y-4 md:space-y-6">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white text-lg md:text-xl">🏪</span>
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-sm md:text-base">Crear tienda profesional</h3>
              <p className="text-xs md:text-sm text-gray-600">Diseños modernos y atractivos</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-success rounded-lg flex items-center justify-center">
              <span className="text-white text-lg md:text-xl">💳</span>
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-sm md:text-base">Pagos locales</h3>
              <p className="text-xs md:text-sm text-gray-600">Métodos de pago populares en GQ</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-premium rounded-lg flex items-center justify-center">
              <span className="text-white text-lg md:text-xl">📦</span>
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-sm md:text-base">Productos físicos y digitales</h3>
              <p className="text-xs md:text-sm text-gray-600">Vende cualquier tipo de producto</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Características del SaaS",
      description: "Herramientas profesionales para hacer crecer tu negocio",
      content: (
        <div className="space-y-4 md:space-y-6">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white text-lg md:text-xl">🌐</span>
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-sm md:text-base">Dominio personalizado</h3>
              <p className="text-xs md:text-sm text-gray-600">tutienda.umpla.gq incluido</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-success rounded-lg flex items-center justify-center">
              <span className="text-white text-lg md:text-xl">🛠️</span>
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-sm md:text-base">Soporte técnico</h3>
              <p className="text-xs md:text-sm text-gray-600">Ayuda cuando la necesites</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-premium rounded-lg flex items-center justify-center">
              <span className="text-white text-lg md:text-xl">📊</span>
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-sm md:text-base">Estadísticas avanzadas</h3>
              <p className="text-xs md:text-sm text-gray-600">Analiza tu rendimiento</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "¡Listo para empezar!",
      description: "Elige cómo quieres continuar",
      content: (
        <div className="text-center space-y-6">
          <div className="text-4xl md:text-6xl mb-4">🚀</div>
          <p className="text-base md:text-lg text-gray-600 max-w-md mx-auto">
            Tu tienda estará lista en menos de 5 minutos. ¡Comienza a vender hoy mismo!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button 
              size="lg" 
              onClick={() => navigate('/create-store')}
              className="w-full sm:w-auto"
            >
              Crear mi tienda
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => navigate('/store-example')}
              className="w-full sm:w-auto"
            >
              Explorar Umpla
            </Button>
          </div>
        </div>
      )
    }
  ];

  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-center space-x-2 mb-4">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors ${
                  index <= currentStep ? 'bg-primary' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          <div className="text-center text-xs md:text-sm text-gray-500">
            {currentStep + 1} de {steps.length}
          </div>
        </div>

        {/* Content */}
        <div className="text-center space-y-6 md:space-y-8">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold text-secondary mb-2 md:mb-4">
              {currentStepData.title}
            </h1>
            <p className="text-base md:text-xl text-gray-600 mb-6 md:mb-8">
              {currentStepData.description}
            </p>
          </div>

          <div className="mb-8 md:mb-12">
            {currentStepData.content}
          </div>

          {/* Navigation */}
          {currentStep < steps.length - 1 ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="outline" 
                onClick={() => navigate('/')}
                className="w-full sm:w-auto"
              >
                Saltar
              </Button>
              <Button 
                onClick={() => setCurrentStep(currentStep + 1)}
                className="w-full sm:w-auto"
              >
                Siguiente
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
