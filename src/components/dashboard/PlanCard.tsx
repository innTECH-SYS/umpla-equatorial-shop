
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, Zap, Star } from 'lucide-react';

export const PlanCard = () => {
  const currentPlan = "básico"; // Esto debería venir del estado real del usuario

  const plans = [
    {
      id: 'basico',
      name: 'Básico',
      price: 'Gratis',
      description: 'Perfecto para empezar',
      features: ['Hasta 5 productos', 'Tienda básica', 'Soporte por email'],
      icon: <Star className="h-5 w-5" />,
      buttonText: 'Plan actual',
      buttonVariant: 'outline' as const,
      current: true
    },
    {
      id: 'profesional',
      name: 'Profesional',
      price: '5,000 XAF',
      description: 'Para negocios en crecimiento',
      features: ['Hasta 50 productos', 'Personalización avanzada', 'Analytics básicos', 'Soporte prioritario'],
      icon: <Zap className="h-5 w-5" />,
      buttonText: 'Actualizar plan',
      buttonVariant: 'default' as const,
      current: false,
      popular: true
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '10,000 XAF',
      description: 'Para negocios profesionales',
      features: ['Productos ilimitados', 'Dominio personalizado', 'Analytics avanzados', 'Soporte 24/7', 'Funciones exclusivas'],
      icon: <Crown className="h-5 w-5" />,
      buttonText: 'Ver planes premium',
      buttonVariant: 'default' as const,
      current: false
    }
  ];

  const handleUpgrade = (planId: string) => {
    // Tanto "actualizar plan" como "ver planes premium" van a la misma ruta
    window.location.href = '/pricing';
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Crown className="h-5 w-5 text-yellow-600" />
          <h3 className="text-lg font-semibold">Tu Plan</h3>
        </div>

        <div className="space-y-3">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-800">Plan Básico</span>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Activo
              </Badge>
            </div>
            <p className="text-sm text-green-600 mt-1">Gratis • Hasta 5 productos</p>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              Mejora tu plan para acceder a más productos y funciones profesionales:
            </p>
            
            <div className="grid grid-cols-1 gap-2">
              <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-800 text-sm">Profesional</p>
                    <p className="text-xs text-blue-600">5,000 XAF/mes • 50 productos</p>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  onClick={() => handleUpgrade('profesional')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Actualizar
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <Crown className="h-4 w-4 text-purple-600" />
                  <div>
                    <p className="font-medium text-purple-800 text-sm">Premium</p>
                    <p className="text-xs text-purple-600">10,000 XAF/mes • Ilimitado</p>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleUpgrade('premium')}
                  className="border-purple-300 text-purple-600 hover:bg-purple-50"
                >
                  Ver planes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
