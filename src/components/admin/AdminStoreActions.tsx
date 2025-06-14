
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { generateStoreUrl } from '@/lib/storeUtils';
import { MoreHorizontal, Eye, Ban, CheckCircle, Edit, Trash2 } from 'lucide-react';

interface AdminStoreActionsProps {
  store: any;
  onUpdate: () => void;
}

export const AdminStoreActions = ({ store, onUpdate }: AdminStoreActionsProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const toggleStoreStatus = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('tiendas')
        .update({ activa: !store.activa })
        .eq('id', store.id);

      if (error) throw error;

      toast({
        title: store.activa ? "Tienda desactivada" : "Tienda activada",
        description: `La tienda ${store.nombre} ha sido ${store.activa ? 'desactivada' : 'activada'} correctamente`
      });

      onUpdate();
    } catch (error) {
      console.error('Error updating store status:', error);
      toast({
        title: "Error",
        description: "No se pudo cambiar el estado de la tienda",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteStore = async () => {
    if (!confirm(`¿Estás seguro de que quieres eliminar la tienda "${store.nombre}"? Esta acción no se puede deshacer.`)) {
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('tiendas')
        .delete()
        .eq('id', store.id);

      if (error) throw error;

      toast({
        title: "Tienda eliminada",
        description: `La tienda ${store.nombre} ha sido eliminada correctamente`
      });

      onUpdate();
    } catch (error) {
      console.error('Error deleting store:', error);
      toast({
        title: "Error",
        description: "No se pudo eliminar la tienda",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const viewStore = () => {
    const storeUrl = generateStoreUrl(store.nombre);
    window.open(storeUrl, '_blank');
  };

  return (
    <div className="flex items-center gap-2">
      <Badge variant={store.activa ? "default" : "destructive"}>
        {store.activa ? "Activa" : "Inactiva"}
      </Badge>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" disabled={loading}>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={viewStore}>
            <Eye className="h-4 w-4 mr-2" />
            Ver Tienda
          </DropdownMenuItem>
          <DropdownMenuItem onClick={toggleStoreStatus}>
            {store.activa ? (
              <>
                <Ban className="h-4 w-4 mr-2" />
                Desactivar
              </>
            ) : (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Activar
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={deleteStore}
            className="text-red-600 focus:text-red-600"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
