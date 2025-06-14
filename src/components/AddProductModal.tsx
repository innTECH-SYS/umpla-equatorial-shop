
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Switch } from '@/components/ui/switch';
import { useUserPlan } from '@/hooks/useUserPlan';
import { useProducts } from '@/hooks/useProducts';
import { useChecklistProgress } from '@/hooks/useChecklistProgress';
import { Crown, Info, Plus, X } from 'lucide-react';

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
    imagenes: [''],
    destacado: false,
    disponible: true
  });
  
  const { canManageStock, maxImages, isPaidPlan } = useUserPlan();
  const { addProduct } = useProducts();
  const { updateProgress } = useChecklistProgress();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Filter valid images
      const imagenes = [formData.imagen_url, ...formData.imagenes].filter(url => url.trim() !== '');
      
      // Validate image count
      if (imagenes.length > maxImages) {
        throw new Error(`Tu plan permite hasta ${maxImages} imágenes`);
      }

      const productData = {
        nombre: formData.nombre,
        descripcion: formData.descripcion || undefined,
        precio: parseFloat(formData.precio),
        stock: canManageStock ? parseInt(formData.stock) || 0 : 0,
        tipo: formData.tipo,
        imagen_url: formData.imagen_url || undefined,
        imagenes: imagenes.length > 1 ? imagenes : undefined,
        destacado: formData.destacado,
        disponible: formData.disponible
      };

      const result = await addProduct(productData);
      
      if (result) {
        // Mark add-product as completed in checklist
        await updateProgress('add-product', true);
        
        // Reset form and close modal
        setFormData({
          nombre: '',
          descripcion: '',
          precio: '',
          stock: '',
          tipo: 'físico',
          imagen_url: '',
          imagenes: [''],
          destacado: false,
          disponible: true
        });
        onOpenChange(false);
      }
    } catch (error) {
      console.error('Error adding product:', error);
    } finally {
      setLoading(false);
    }
  };

  const validateImageFormat = (url: string) => {
    if (!url) return true;
    const validFormats = /\.(jpg|jpeg|png|webp)$/i;
    return validFormats.test(url);
  };

  const addImageField = () => {
    if (formData.imagenes.length < maxImages - 1) {
      setFormData({
        ...formData,
        imagenes: [...formData.imagenes, '']
      });
    }
  };

  const removeImageField = (index: number) => {
    const newImages = formData.imagenes.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      imagenes: newImages
    });
  };

  const updateImageField = (index: number, value: string) => {
    const newImages = [...formData.imagenes];
    newImages[index] = value;
    setFormData({
      ...formData,
      imagenes: newImages
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
                <span className="text-xs text-gray-500">
                  ({[formData.imagen_url, ...formData.imagenes].filter(Boolean).length}/{maxImages})
                </span>
              </div>
              <Input
                id="imagen_url"
                type="url"
                value={formData.imagen_url}
                onChange={(e) => setFormData({...formData, imagen_url: e.target.value})}
                placeholder="https://ejemplo.com/imagen.jpg"
              />
              {formData.imagen_url && !validateImageFormat(formData.imagen_url) && (
                <p className="text-sm text-red-500 mt-1">Solo se permiten archivos JPG, JPEG, PNG y WebP</p>
              )}
            </div>

            {/* Additional images for paid plans */}
            {isPaidPlan && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Imágenes adicionales</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addImageField}
                    disabled={formData.imagenes.length >= maxImages - 1}
                    className="h-8"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                {formData.imagenes.map((imagen, index) => (
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
                      className="h-10 w-10 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {/* Product options */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="destacado">Producto destacado</Label>
                  <p className="text-xs text-gray-500">Aparecerá en la sección de productos destacados</p>
                </div>
                <Switch
                  id="destacado"
                  checked={formData.destacado}
                  onCheckedChange={(checked) => setFormData({...formData, destacado: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="disponible">Disponible para venta</Label>
                  <p className="text-xs text-gray-500">Los clientes podrán ver y comprar este producto</p>
                </div>
                <Switch
                  id="disponible"
                  checked={formData.disponible}
                  onCheckedChange={(checked) => setFormData({...formData, disponible: checked})}
                />
              </div>
            </div>

            {!isPaidPlan && (formData.imagen_url || formData.imagenes.some(img => img)) && (
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
