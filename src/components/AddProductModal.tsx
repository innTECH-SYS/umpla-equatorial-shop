
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AddProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddProductModal = ({ open, onOpenChange }: AddProductModalProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    tipo: 'físico',
    imagen_url: ''
  });
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      // Primero obtener la tienda del usuario
      const { data: tienda, error: tiendaError } = await supabase
        .from('tiendas')
        .select('id')
        .eq('usuario_id', user.id)
        .single();

      if (tiendaError || !tienda) {
        toast({
          title: "Error",
          description: "No se encontró tu tienda. Crea una tienda primero.",
          variant: "destructive"
        });
        return;
      }

      // Crear el producto
      const { error } = await supabase
        .from('productos')
        .insert({
          nombre: formData.nombre,
          descripcion: formData.descripcion,
          precio: parseFloat(formData.precio),
          stock: parseInt(formData.stock),
          tipo: formData.tipo,
          imagen_url: formData.imagen_url || null,
          tienda_id: tienda.id
        });

      if (error) throw error;

      toast({
        title: "¡Producto añadido!",
        description: "Tu producto se ha añadido correctamente a tu tienda."
      });

      // Resetear form y cerrar modal
      setFormData({
        nombre: '',
        descripcion: '',
        precio: '',
        stock: '',
        tipo: 'físico',
        imagen_url: ''
      });
      onOpenChange(false);
    } catch (error) {
      console.error('Error adding product:', error);
      toast({
        title: "Error",
        description: "No se pudo añadir el producto. Inténtalo de nuevo.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Añadir nuevo producto</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="nombre">Nombre del producto</Label>
            <Input
              id="nombre"
              value={formData.nombre}
              onChange={(e) => setFormData({...formData, nombre: e.target.value})}
              required
            />
          </div>

          <div>
            <Label htmlFor="descripcion">Descripción</Label>
            <Textarea
              id="descripcion"
              value={formData.descripcion}
              onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="precio">Precio (₣)</Label>
              <Input
                id="precio"
                type="number"
                step="0.01"
                value={formData.precio}
                onChange={(e) => setFormData({...formData, precio: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({...formData, stock: e.target.value})}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="tipo">Tipo de producto</Label>
            <Select value={formData.tipo} onValueChange={(value) => setFormData({...formData, tipo: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="físico">Físico</SelectItem>
                <SelectItem value="digital">Digital</SelectItem>
                <SelectItem value="servicio">Servicio</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="imagen_url">URL de imagen (opcional)</Label>
            <Input
              id="imagen_url"
              type="url"
              value={formData.imagen_url}
              onChange={(e) => setFormData({...formData, imagen_url: e.target.value})}
              placeholder="https://ejemplo.com/imagen.jpg"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "Añadiendo..." : "Añadir producto"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
