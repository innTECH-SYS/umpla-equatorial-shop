
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, Zap, Star } from 'lucide-react';
import { useUserPlan } from '@/hooks/useUserPlan';

export const PlanCard = () => {
  const { userPlan, loading } = useUserPlan();

  const plans = [
    {
      id: 'basic',
      name: 'Básico',
      price: 'Gratis',
      description: 'Perfecto para empezar',
      features: ['Hasta 10 productos', 'Hasta 2 imágenes', 'Tienda básica', 'Soporte por email'],
      icon: <Star className="h-5 w-5" />,
      buttonText: 'Plan actual',
      buttonVariant: 'outline' as const,
      current: userPlan === 'basic'
    },
    {
      id: 'professional',
      name: 'Profesional',
      price: '5,000 XAF',
      description: 'Para negocios en crecimiento',
      features: ['Hasta 50 productos', 'Hasta 5 imágenes', 'Gestión de stock', 'Personalización avanzada', 'Soporte prioritario'],
      icon: <Zap className="h-5 w-5" />,
      buttonText: userPlan === 'professional' ? 'Plan actual' : 'Actualizar plan',
      buttonVariant: userPlan === 'professional' ? 'outline' as const : 'default' as const,
      current: userPlan === 'professional',
      popular: true
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '10,000 XAF',
      description: 'Para negocios profesionales',
      features: ['Hasta 100 productos', 'Hasta 10 imágenes', 'Dominio .gq gratis', 'Múltiples métodos de pago', 'Productos extra con cuota', 'Soporte 24/7'],
      icon: <Crown className="h-5 w-5" />,
      buttonText: userPlan === 'premium' ? 'Plan actual' : 'Ver planes premium',
      buttonVariant: userPlan === 'premium' ? 'outline' as const : 'default' as const,
      current: userPlan === 'premium'
    }
  ];

  const handleUpgrade = (planId: string) => {
    if (planId !== userPlan) {
      window.location.href = '/pricing';
    }
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </Card>
    );
  }

  const currentPlan = plans.find(plan => plan.current);

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Crown className="h-5 w-5 text-yellow-600" />
          <h3 className="text-lg font-semibold">Tu Plan</h3>
        </div>

        <div className="space-y-3">
          {/* Plan actual */}
          {currentPlan && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {currentPlan.icon}
                  <span className="font-medium text-green-800">Plan {currentPlan.name}</span>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Activo
                </Badge>
              </div>
              <p className="text-sm text-green-600 mt-1">{currentPlan.price} • {currentPlan.description}</p>
            </div>
          )}

          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              {userPlan === 'premium' ? 'Tienes el plan más avanzado' : 'Mejora tu plan para acceder a más productos y funciones profesionales:'}
            </p>
            
            {userPlan !== 'premium' && (
              <div className="grid grid-cols-1 gap-2">
                {plans
                  .filter(plan => !plan.current && plan.id !== 'basic')
                  .map((plan) => (
                    <div key={plan.id} className={`flex items-center justify-between p-3 ${plan.id === 'professional' ? 'bg-blue-50 border border-blue-200' : 'bg-purple-50 border border-purple-200'} rounded-lg`}>
                      <div className="flex items-center gap-2">
                        {plan.icon}
                        <div>
                          <p className={`font-medium text-sm ${plan.id === 'professional' ? 'text-blue-800' : 'text-purple-800'}`}>{plan.name}</p>
                          <p className={`text-xs ${plan.id === 'professional' ? 'text-blue-600' : 'text-purple-600'}`}>{plan.price}/mes • {plan.description}</p>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => handleUpgrade(plan.id)}
                        className={plan.id === 'professional' ? 'bg-blue-600 hover:bg-blue-700' : ''}
                        variant={plan.id === 'professional' ? 'default' : 'outline'}
                      >
                        {plan.id === 'professional' ? 'Actualizar' : 'Ver planes'}
                      </Button>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
