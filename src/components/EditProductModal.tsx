
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useProducts } from '@/hooks/useProducts';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: string;
  nombre: string;
  descripcion?: string;
  precio: number;
  stock?: number;
  tipo?: string;
  imagen_url?: string;
  destacado?: boolean;
  disponible?: boolean;
  activo?: boolean;
}

interface EditProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
}

export const EditProductModal = ({ open, onOpenChange, product }: EditProductModalProps) => {
  const { updateProduct } = useProducts();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    tipo: 'físico',
    imagen_url: '',
    destacado: false,
    disponible: true,
    activo: true
  });

  useEffect(() => {
    if (product) {
      setFormData({
        nombre: product.nombre || '',
        descripcion: product.descripcion || '',
        precio: product.precio?.toString() || '',
        stock: product.stock?.toString() || '',
        tipo: product.tipo || 'físico',
        imagen_url: product.imagen_url || '',
        destacado: product.destacado || false,
        disponible: product.disponible !== false,
        activo: product.activo !== false
      });
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    if (!formData.nombre || !formData.precio) {
      toast({
        title: "Error",
        description: "El nombre y precio son obligatorios",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      const updateData = {
        nombre: formData.nombre,
        descripcion: formData.descripcion || null,
        precio: parseFloat(formData.precio),
        stock: formData.stock ? parseInt(formData.stock) : 0,
        tipo: formData.tipo,
        imagen_url: formData.imagen_url || null,
        destacado: formData.destacado,
        disponible: formData.disponible,
        activo: formData.activo
      };

      await updateProduct(product.id, updateData);
      onOpenChange(false);
    } catch (error) {
      console.error('Error updating product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Producto</DialogTitle>
          <DialogDescription>
            Modifica los detalles de tu producto
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre del producto *</Label>
            <Input
              id="nombre"
              value={formData.nombre}
              onChange={(e) => handleInputChange('nombre', e.target.value)}
              placeholder="Ej: Aceite de palma artesanal"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="descripcion">Descripción</Label>
            <Textarea
              id="descripcion"
              value={formData.descripcion}
              onChange={(e) => handleInputChange('descripcion', e.target.value)}
              placeholder="Describe tu producto..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="precio">Precio (XAF) *</Label>
              <Input
                id="precio"
                type="number"
                value={formData.precio}
                onChange={(e) => handleInputChange('precio', e.target.value)}
                placeholder="5000"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">Stock disponible</Label>
              <Input
                id="stock"
                type="number"
                value={formData.stock}
                onChange={(e) => handleInputChange('stock', e.target.value)}
                placeholder="10"
                min="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tipo">Tipo de producto</Label>
            <Select value={formData.tipo} onValueChange={(value) => handleInputChange('tipo', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="físico">Producto físico</SelectItem>
                <SelectItem value="digital">Producto digital</SelectItem>
                <SelectItem value="servicio">Servicio</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="imagen_url">URL de imagen</Label>
            <Input
              id="imagen_url"
              value={formData.imagen_url}
              onChange={(e) => handleInputChange('imagen_url', e.target.value)}
              placeholder="https://ejemplo.com/imagen.jpg"
              type="url"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="destacado">Producto destacado</Label>
              <Switch
                id="destacado"
                checked={formData.destacado}
                onCheckedChange={(checked) => handleInputChange('destacado', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="disponible">Disponible para venta</Label>
              <Switch
                id="disponible"
                checked={formData.disponible}
                onCheckedChange={(checked) => handleInputChange('disponible', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="activo">Producto activo</Label>
              <Switch
                id="activo"
                checked={formData.activo}
                onCheckedChange={(checked) => handleInputChange('activo', checked)}
              />
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Guardando...' : 'Guardar Cambios'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
