
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="px-4 py-4 md:px-8 md:py-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg md:text-xl">U</span>
            </div>
            <span className="text-xl md:text-2xl font-bold text-secondary">Umpla</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Button variant="ghost" onClick={() => navigate('/pricing')}>Precios</Button>
            <Button variant="ghost" onClick={() => navigate('/store-example')}>Ejemplos</Button>
            <Button onClick={() => navigate('/create-store')}>Crear Tienda</Button>
          </nav>
          <Button className="md:hidden" onClick={() => navigate('/create-store')}>
            Crear Tienda
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 py-8 md:px-8 md:py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-secondary mb-4 md:mb-6">
            Tu tienda, sin límites
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto">
            Crea tu tienda online en Guinea Ecuatorial en minutos. Sin conocimientos técnicos, sin complicaciones.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="w-full sm:w-auto"
              onClick={() => navigate('/create-store')}
            >
              Crear mi tienda gratis
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => navigate('/onboarding')}
            >
              Ver cómo funciona
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-8 md:px-8 md:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-secondary mb-8 md:mb-12">
            Todo lo que necesitas para vender online
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-xl">🏪</span>
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">Tienda profesional</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Diseños modernos y responsive que se adaptan a cualquier dispositivo
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-success rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-xl">💳</span>
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">Pagos locales</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Acepta pagos con métodos populares en Guinea Ecuatorial
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-premium rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-xl">📊</span>
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">Estadísticas</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Analiza tus ventas y optimiza tu negocio con datos reales
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-8 md:px-8 md:py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-secondary mb-4 md:mb-6">
            Empieza gratis hoy mismo
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8">
            No necesitas tarjeta de crédito. Crea tu tienda en menos de 5 minutos.
          </p>
          <Button 
            size="lg" 
            className="w-full sm:w-auto"
            onClick={() => navigate('/create-store')}
          >
            Crear mi tienda ahora
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-white px-4 py-8 md:px-8 md:py-12">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">U</span>
            </div>
            <span className="text-xl font-bold">Umpla</span>
          </div>
          <p className="text-gray-400 text-sm md:text-base">
            La plataforma de comercio electrónico para Guinea Ecuatorial
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
