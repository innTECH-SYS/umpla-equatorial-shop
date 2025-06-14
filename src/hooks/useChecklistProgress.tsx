
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface ChecklistProgress {
  item_id: string;
  completado: boolean;
  completado_el?: string;
}

export const useChecklistProgress = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [progress, setProgress] = useState<ChecklistProgress[]>([]);
  const [loading, setLoading] = useState(true);

  // Load progress from database
  useEffect(() => {
    if (!user) return;

    const loadProgress = async () => {
      try {
        const { data, error } = await supabase
          .from('checklist_progreso')
          .select('item_id, completado, completado_el')
          .eq('usuario_id', user.id);

        if (error) throw error;

        setProgress(data || []);
      } catch (error) {
        console.error('Error loading checklist progress:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProgress();
  }, [user]);

  const updateProgress = async (itemId: string, completed: boolean) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('checklist_progreso')
        .upsert({
          usuario_id: user.id,
          item_id: itemId,
          completado: completed,
          completado_el: completed ? new Date().toISOString() : null
        });

      if (error) throw error;

      // Update local state
      setProgress(prev => {
        const existing = prev.find(p => p.item_id === itemId);
        if (existing) {
          return prev.map(p => 
            p.item_id === itemId 
              ? { ...p, completado: completed, completado_el: completed ? new Date().toISOString() : undefined }
              : p
          );
        } else {
          return [...prev, { 
            item_id: itemId, 
            completado: completed, 
            completado_el: completed ? new Date().toISOString() : undefined 
          }];
        }
      });

      toast({
        title: completed ? "¡Progreso guardado!" : "Progreso actualizado",
        description: completed ? "Has completado esta tarea" : "Tarea marcada como pendiente"
      });
    } catch (error) {
      console.error('Error updating progress:', error);
      toast({
        title: "Error",
        description: "No se pudo guardar el progreso",
        variant: "destructive"
      });
    }
  };

  const isCompleted = (itemId: string) => {
    return progress.find(p => p.item_id === itemId)?.completado || false;
  };

  return {
    progress,
    loading,
    updateProgress,
    isCompleted
  };
};
