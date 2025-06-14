
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Circle, Store, CreditCard, Palette, Users, Shield, ChevronRight } from 'lucide-react';
import { KYCModal } from '@/components/KYCModal';
import { useUserPlan } from '@/hooks/useUserPlan';

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactElement;
  action: () => void;
  actionText: string;
  completed: boolean;
  badge?: string;
}

export const StoreImprovementChecklist = () => {
  const { kycStatus } = useUserPlan();
  const [kycModalOpen, setKycModalOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const items: ChecklistItem[] = [
    {
      id: 'add-product',
      title: 'Agregar primer producto',
      description: 'Sube tu primer producto con imágenes y descripción detallada',
      icon: <Store className="h-5 w-5" />,
      action: () => window.dispatchEvent(new CustomEvent('openAddProductModal')),
      actionText: 'Agregar producto',
      completed: false
    },
    {
      id: 'kyc-verification',
      title: 'Verificar cuenta (KYC)',
      description: 'Verifica tu identidad para mayor confianza y acceso a todas las funciones',
      icon: <Shield className="h-5 w-5" />,
      action: () => setKycModalOpen(true),
      actionText: kycStatus === 'verified' ? 'Verificado' : kycStatus === 'pending' ? 'Pendiente' : 'Verificar',
      completed: kycStatus === 'verified',
      badge: kycStatus === 'verified' ? 'Verificado' : kycStatus === 'pending' ? 'Pendiente' : undefined
    },
    {
      id: 'customize-store',
      title: 'Personalizar tienda',
      description: 'Agrega tu logo, colores y banner para hacer tu tienda única',
      icon: <Palette className="h-5 w-5" />,
      action: () => window.dispatchEvent(new CustomEvent('openCustomizeStoreModal')),
      actionText: 'Personalizar',
      completed: false
    },
    {
      id: 'payment-methods',
      title: 'Configurar métodos de pago',
      description: 'Agrega formas de pago para recibir dinero de tus clientes',
      icon: <CreditCard className="h-5 w-5" />,
      action: () => window.dispatchEvent(new CustomEvent('openPaymentMethodsModal')),
      actionText: 'Configurar',
      completed: false
    },
    {
      id: 'referrals',
      title: 'Programa de referidos',
      description: 'Invita amigos y gana beneficios por cada referido exitoso',
      icon: <Users className="h-5 w-5" />,
      action: () => window.dispatchEvent(new CustomEvent('openReferralsModal')),
      actionText: 'Ver programa',
      completed: false
    }
  ];

  const completedCount = items.filter(item => item.completed || checkedItems.includes(item.id)).length;
  const progressPercentage = (completedCount / items.length) * 100;

  useEffect(() => {
    // Simular algunos items completados para demo
    setCheckedItems(['add-product']);
  }, []);

  const toggleItem = (itemId: string) => {
    setCheckedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <>
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Mejora tu tienda</h3>
              <p className="text-sm text-gray-600">Completa estos pasos para maximizar tus ventas</p>
            </div>
            <Badge variant="outline" className="text-sm">
              {completedCount}/{items.length} completados
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Progreso</span>
              <span className="font-medium">{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          <div className="space-y-3">
            {items.map((item) => {
              const isCompleted = item.completed || checkedItems.includes(item.id);
              
              return (
                <div
                  key={item.id}
                  className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                    isCompleted 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="flex-shrink-0"
                      disabled={item.completed}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="h-6 w-6 text-green-600" />
                      ) : (
                        <Circle className="h-6 w-6 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                    
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isCompleted ? 'bg-green-100' : 'bg-white'}`}>
                        <div className={isCompleted ? 'text-green-600' : 'text-gray-600'}>
                          {item.icon}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className={`font-medium ${isCompleted ? 'text-green-900' : 'text-gray-900'}`}>
                          {item.title}
                          {item.badge && (
                            <Badge 
                              className={`ml-2 ${
                                item.badge === 'Verificado' 
                                  ? 'bg-blue-500 text-white' 
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </h4>
                        <p className={`text-sm ${isCompleted ? 'text-green-700' : 'text-gray-600'}`}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {!isCompleted && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={item.action}
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      {item.actionText}
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              );
            })}
          </div>

          {progressPercentage === 100 && (
            <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle2 className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-medium text-green-900">¡Felicitaciones!</h4>
              <p className="text-sm text-green-700">Has completado todas las mejoras recomendadas</p>
            </div>
          )}
        </div>
      </Card>

      <KYCModal open={kycModalOpen} onOpenChange={setKycModalOpen} />
    </>
  );
};
