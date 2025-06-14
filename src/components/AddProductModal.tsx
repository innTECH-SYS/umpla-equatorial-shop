
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useAuth } from '@/hooks/useAuth';
import { useUserPlan } from '@/hooks/useUserPlan';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Crown, Info } from 'lucide-react';

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
    imagen_url: '',
    imagenes_adicionales: ['']
  });
  const { user } = useAuth();
  const { toast } = useToast();
  const { canManageStock, maxImages, isPaidPlan } = useUserPlan();

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

      // Filtrar imágenes válidas
      const imagenes = [formData.imagen_url, ...formData.imagenes_adicionales].filter(url => url.trim() !== '');
      
      // Validar número de imágenes según el plan
      if (imagenes.length > maxImages) {
        toast({
          title: "Límite de imágenes excedido",
          description: `Tu plan permite hasta ${maxImages} imágenes. Actualiza tu plan para añadir más.`,
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
          stock: canManageStock ? parseInt(formData.stock) || 0 : 0,
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
        imagen_url: '',
        imagenes_adicionales: ['']
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

  const validateImageFormat = (url: string) => {
    if (!url) return true;
    const validFormats = /\.(jpg|jpeg|png)$/i;
    return validFormats.test(url);
  };

  const addImageField = () => {
    if (formData.imagenes_adicionales.length + 1 < maxImages) {
      setFormData({
        ...formData,
        imagenes_adicionales: [...formData.imagenes_adicionales, '']
      });
    } else {
      toast({
        title: "Límite de imágenes",
        description: `Tu plan permite hasta ${maxImages} imágenes. Actualiza tu plan para añadir más.`,
        variant: "destructive"
      });
    }
  };

  const removeImageField = (index: number) => {
    const newImages = formData.imagenes_adicionales.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      imagenes_adicionales: newImages
    });
  };

  const updateImageField = (index: number, value: string) => {
    const newImages = [...formData.imagenes_adicionales];
    newImages[index] = value;
    setFormData({
      ...formData,
      imagenes_adicionales: newImages
    });
  };

  return (
    <TooltipProvider>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
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
                <div className="flex items-center gap-2">
                  <Label htmlFor="stock">Stock</Label>
                  {!canManageStock && (
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>La gestión de stock está disponible en planes de pago</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
                <Input
                  id="stock"
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({...formData, stock: e.target.value})}
                  disabled={!canManageStock}
                  className={!canManageStock ? 'bg-gray-100 text-gray-400' : ''}
                  placeholder={!canManageStock ? 'Funcionalidad de pago' : '0'}
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
              <div className="flex items-center gap-2 mb-2">
                <Label htmlFor="imagen_url">Imagen principal</Label>
                {!isPaidPlan && (
                  <span className="text-xs text-gray-500">({formData.imagen_url ? 1 : 0}/{maxImages})</span>
                )}
              </div>
              <Input
                id="imagen_url"
                type="url"
                value={formData.imagen_url}
                onChange={(e) => setFormData({...formData, imagen_url: e.target.value})}
                placeholder="https://ejemplo.com/imagen.jpg"
              />
              {formData.imagen_url && !validateImageFormat(formData.imagen_url) && (
                <p className="text-sm text-red-500 mt-1">Solo se permiten archivos JPG, JPEG y PNG</p>
              )}
            </div>

            {/* Imágenes adicionales */}
            {isPaidPlan && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Imágenes adicionales</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addImageField}
                    disabled={formData.imagenes_adicionales.length >= maxImages - 1}
                  >
                    Añadir imagen
                  </Button>
                </div>
                {formData.imagenes_adicionales.map((imagen, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <Input
                      type="url"
                      value={imagen}
                      onChange={(e) => updateImageField(index, e.target.value)}
                      placeholder="https://ejemplo.com/imagen.jpg"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeImageField(index)}
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {!isPaidPlan && (formData.imagen_url || formData.imagenes_adicionales.some(img => img)) && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <Crown className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-blue-800">
                    Actualiza tu plan para añadir más imágenes por producto
                  </span>
                </div>
              </div>
            )}

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
    </TooltipProvider>
  );
};
