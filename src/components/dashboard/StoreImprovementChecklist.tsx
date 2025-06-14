
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  Check, 
  X, 
  Image, 
  Package, 
  Phone, 
  MapPin, 
  Palette, 
  Share2, 
  Users, 
  FileText,
  Target,
  Lightbulb
} from 'lucide-react';

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  tip: string;
  icon: React.ReactNode;
  completed: boolean;
  actionText: string;
  actionHandler?: () => void;
}

interface StoreData {
  tienda: any;
  productos: any[];
  referidos: any[];
}

export const StoreImprovementChecklist = () => {
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [completedCount, setCompletedCount] = useState(0);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      loadStoreDataAndChecklist();
    }
  }, [user]);

  const loadStoreDataAndChecklist = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Cargar datos de la tienda
      const { data: tienda } = await supabase
        .from('tiendas')
        .select('*')
        .eq('usuario_id', user.id)
        .single();

      // Cargar productos
      const { data: productos } = await supabase
        .from('productos')
        .select('*')
        .eq('tienda_id', tienda?.id);

      // Cargar referidos válidos
      const { data: referidos } = await supabase
        .from('referidos')
        .select('*')
        .eq('referente_id', user.id)
        .eq('valido', true);

      const storeData: StoreData = {
        tienda,
        productos: productos || [],
        referidos: referidos || []
      };

      // Generar checklist basado en los datos
      const items = generateChecklistItems(storeData);
      setChecklistItems(items);
      setCompletedCount(items.filter(item => item.completed).length);

    } catch (error) {
      console.error('Error loading store data:', error);
      toast({
        title: "Error",
        description: "No se pudo cargar la información de tu tienda.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const generateChecklistItems = (data: StoreData): ChecklistItem[] => {
    const { tienda, productos, referidos } = data;
    
    return [
      {
        id: 'tiene_productos',
        title: 'He publicado al menos 1 producto',
        description: 'Tu tienda necesita productos para que los clientes puedan comprar',
        tip: 'Agrega productos atractivos con buenas descripciones para atraer más clientes.',
        icon: <Package className="h-5 w-5" />,
        completed: productos.length > 0,
        actionText: 'Agregar producto',
        actionHandler: () => window.dispatchEvent(new CustomEvent('openAddProductModal'))
      },
      {
        id: 'productos_con_imagen',
        title: 'Todos mis productos tienen imagen destacada',
        description: 'Las imágenes son esenciales para las ventas online',
        tip: 'Agrega imágenes llamativas, idealmente con fondo blanco y buena iluminación.',
        icon: <Image className="h-5 w-5" />,
        completed: productos.length > 0 && productos.every(p => p.imagen_url),
        actionText: 'Editar productos'
      },
      {
        id: 'productos_con_descripcion',
        title: 'He agregado una descripción clara a mis productos',
        description: 'Los clientes necesitan saber qué están comprando',
        tip: 'Incluye características, beneficios y detalles importantes de cada producto.',
        icon: <FileText className="h-5 w-5" />,
        completed: productos.length > 0 && productos.every(p => p.descripcion && p.descripcion.length > 10),
        actionText: 'Mejorar descripciones'
      },
      {
        id: 'categoria_definida',
        title: 'He definido mi categoría principal correctamente',
        description: 'Ayuda a los clientes a encontrar tu tipo de negocio',
        tip: 'Elige una categoría que represente bien tu negocio principal.',
        icon: <Target className="h-5 w-5" />,
        completed: tienda?.categoria && tienda.categoria.length > 0,
        actionText: 'Definir categoría',
        actionHandler: () => window.dispatchEvent(new CustomEvent('openCustomizeStoreModal'))
      },
      {
        id: 'tiene_telefono_whatsapp',
        title: 'He activado el botón de contacto vía WhatsApp',
        description: 'Facilita que los clientes te contacten directamente',
        tip: 'Agrega tu número de WhatsApp para recibir consultas y pedidos directos.',
        icon: <Phone className="h-5 w-5" />,
        completed: tienda?.telefono_whatsapp && tienda.telefono_whatsapp.length > 0,
        actionText: 'Agregar WhatsApp',
        actionHandler: () => window.dispatchEvent(new CustomEvent('openCustomizeStoreModal'))
      },
      {
        id: 'tiene_logo',
        title: 'He personalizado el logo de mi tienda',
        description: 'Un logo profesional genera más confianza',
        tip: 'Sube un logo claro y profesional que represente tu marca.',
        icon: <Palette className="h-5 w-5" />,
        completed: tienda?.logo_url && tienda.logo_url.length > 0,
        actionText: 'Agregar logo',
        actionHandler: () => window.dispatchEvent(new CustomEvent('openCustomizeStoreModal'))
      },
      {
        id: 'tiene_ubicacion',
        title: 'He añadido número de teléfono y ubicación',
        description: 'Los clientes necesitan saber cómo encontrarte',
        tip: 'Agrega tu ubicación y teléfono para generar confianza y facilitar entregas.',
        icon: <MapPin className="h-5 w-5" />,
        completed: tienda?.telefono && tienda?.ubicacion,
        actionText: 'Agregar contacto',
        actionHandler: () => window.dispatchEvent(new CustomEvent('openCustomizeStoreModal'))
      },
      {
        id: 'minimo_tres_productos',
        title: 'Mi tienda tiene al menos 3 productos publicados',
        description: 'Una variedad mínima hace tu tienda más atractiva',
        tip: 'Agrega más productos para ofrecer variedad y aumentar las ventas.',
        icon: <Package className="h-5 w-5" />,
        completed: productos.length >= 3,
        actionText: 'Agregar más productos',
        actionHandler: () => window.dispatchEvent(new CustomEvent('openAddProductModal'))
      },
      {
        id: 'ha_compartido_tienda',
        title: 'He compartido mi tienda por WhatsApp',
        description: 'Promociona tu tienda con familiares y amigos',
        tip: 'Comparte tu tienda usando el botón de WhatsApp para atraer más clientes.',
        icon: <Share2 className="h-5 w-5" />,
        completed: false, // Esto podría rastrearse con eventos o marcarse manualmente
        actionText: 'Compartir tienda'
      },
      {
        id: 'tiene_referido_valido',
        title: 'He usado el link de referidos y conseguido 1 usuario válido',
        description: 'Gana productos extra refiriendo nuevos usuarios',
        tip: 'Comparte tu código de referido para ganar productos extra en tu plan.',
        icon: <Users className="h-5 w-5" />,
        completed: referidos.length > 0,
        actionText: 'Ver referidos',
        actionHandler: () => window.dispatchEvent(new CustomEvent('openReferralsModal'))
      }
    ].filter(item => {
      // Mostrar solo ítems relevantes
      if (item.id === 'productos_con_imagen' || item.id === 'productos_con_descripcion') {
        return productos.length > 0;
      }
      if (item.id === 'minimo_tres_productos') {
        return productos.length < 3;
      }
      return true;
    });
  };

  const getMotivationalMessage = () => {
    const totalItems = checklistItems.length;
    const percentage = totalItems > 0 ? (completedCount / totalItems) * 100 : 0;

    if (percentage === 100) {
      return "¡Felicitaciones! Tu tienda está optimizada al máximo 🎉";
    } else if (percentage >= 80) {
      return "¡Excelente trabajo! Solo faltan algunos detalles 💪";
    } else if (percentage >= 60) {
      return "¡Vas por buen camino! Continúa mejorando tu tienda 📈";
    } else if (percentage >= 40) {
      return "¡Sigue así! Cada paso cuenta para el éxito 🚀";
    } else {
      return "¡Comencemos a mejorar tu tienda paso a paso! 💡";
    }
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="text-center">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mx-auto mb-2">
            <span className="text-white font-bold text-lg">U</span>
          </div>
          <p className="text-gray-600">Cargando consejos...</p>
        </div>
      </Card>
    );
  }

  const totalItems = checklistItems.length;
  const progressPercentage = totalItems > 0 ? (completedCount / totalItems) * 100 : 0;

  return (
    <Card className="p-6 bg-gradient-to-br from-blue-50 to-green-50 border-blue-200">
      <div className="space-y-6">
        {/* Header con progreso */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-blue-600">
            <Lightbulb className="h-6 w-6" />
            <h2 className="text-xl font-bold">Consejos para mejorar mi tienda online</h2>
          </div>
          
          <div className="space-y-2">
            <div className="text-sm text-gray-600">
              Has completado <span className="font-bold text-green-600">{completedCount}</span> de{" "}
              <span className="font-bold">{totalItems}</span> pasos para mejorar tu tienda
            </div>
            <Progress value={progressPercentage} className="h-3" />
            <p className="text-sm font-medium text-blue-600">{getMotivationalMessage()}</p>
          </div>
        </div>

        {/* Lista de checklist */}
        <div className="space-y-3">
          {checklistItems.map((item) => (
            <Card 
              key={item.id} 
              className={`p-4 transition-all duration-200 hover:shadow-md ${
                item.completed 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-white border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  item.completed 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {item.completed ? <Check className="h-5 w-5" /> : item.icon}
                </div>
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className={`font-medium ${
                        item.completed ? 'text-green-800 line-through' : 'text-gray-800'
                      }`}>
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                    
                    {!item.completed && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="ml-4 flex-shrink-0 border-blue-300 text-blue-600 hover:bg-blue-50"
                        onClick={item.actionHandler}
                      >
                        {item.actionText}
                      </Button>
                    )}
                  </div>
                  
                  {!item.completed && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        <Lightbulb className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-blue-700">{item.tip}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Footer motivacional */}
        {completedCount === totalItems && (
          <Card className="p-4 bg-gradient-to-r from-green-500 to-blue-500 text-white text-center">
            <h3 className="font-bold text-lg">¡Tu tienda está perfecta! 🎉</h3>
            <p className="text-sm opacity-90">
              Has completado todos los pasos recomendados. ¡Ahora es momento de vender!
            </p>
          </Card>
        )}
      </div>
    </Card>
  );
};
