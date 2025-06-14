
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const PublicStoreFooter = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-blue-900 mb-2">¿Quieres crear tu propia tienda?</h3>
            <p className="text-blue-700 text-sm mb-4">
              Con Umpla puedes crear tu tienda online en minutos y empezar a vender hoy mismo.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <ExternalLink className="h-4 w-4 mr-2" />
              Crear mi tienda gratis
            </Button>
          </div>

          <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
            <span>Powered by Umpla</span>
            <span>•</span>
            <span>Guinea Ecuatorial</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
