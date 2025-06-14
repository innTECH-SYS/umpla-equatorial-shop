
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';

export const PlanCard = () => {
  return (
    <Card className="p-4 sm:p-6 bg-white border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Plan Gratuito</h3>
      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">¿Qué incluye tu plan?</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Hasta 10 productos</li>
            <li>• Subdominio .umpla.gq</li>
            <li>• Carrito de compras</li>
            <li>• Soporte básico</li>
          </ul>
        </div>
        
        <div className="border-t pt-4">
          <p className="text-sm text-gray-600 mb-3">
            ¿Necesitas más productos o un dominio personalizado?
          </p>
          <Link to="/pricing">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Ver planes Premium
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};
