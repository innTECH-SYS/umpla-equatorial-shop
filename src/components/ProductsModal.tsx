import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Package, Plus, MoreVertical, Edit, Star, Eye, Power, Trash2 } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { EditProductModal } from '@/components/EditProductModal';

interface ProductsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddProduct: () => void;
}

export const ProductsModal = ({ open, onOpenChange, onAddProduct }: ProductsModalProps) => {
  const { products, loading, deleteProduct, toggleProductStatus } = useProducts();
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'XAF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount).replace('XAF', 'XAF');
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
  };

  const handleCloseEdit = () => {
    setEditingProduct(null);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Mis Productos
            </DialogTitle>
            <DialogDescription>
              Gestiona tu inventario de productos
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-hidden">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-500">Cargando productos...</span>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-8">
                <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No tienes productos aún</h3>
                <p className="text-gray-500 mb-4">Comienza agregando tu primer producto a la tienda</p>
                <Button onClick={onAddProduct}>
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Producto
                </Button>
              </div>
            ) : (
              <ScrollArea className="h-full">
                <div className="grid gap-4 p-1">
                  {products.map((product) => (
                    <Card key={product.id} className="p-4">
                      <div className="flex items-start gap-4">
                        {product.imagen_url ? (
                          <img 
                            src={product.imagen_url} 
                            alt={product.nombre}
                            className="w-16 h-16 object-cover rounded-lg bg-gray-100"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                            <Package className="h-6 w-6 text-gray-400" />
                          </div>
                        )}
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-gray-900 truncate">{product.nombre}</h3>
                              <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.descripcion || 'Sin descripción'}</p>
                              <div className="flex items-center gap-4 mt-2">
                                <span className="font-bold text-blue-600">{formatCurrency(product.precio)}</span>
                                <span className="text-sm text-gray-500">Stock: {product.stock || 0}</span>
                                <span className="text-sm text-gray-500">{product.tipo || 'físico'}</span>
                              </div>
                            </div>
                            
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleEdit(product)}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Editar
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => toggleProductStatus(product.id, 'destacado')}
                                >
                                  <Star className="h-4 w-4 mr-2" />
                                  {product.destacado ? 'Quitar destacado' : 'Destacar'}
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => toggleProductStatus(product.id, 'disponible')}
                                >
                                  <Eye className="h-4 w-4 mr-2" />
                                  {product.disponible ? 'Ocultar' : 'Mostrar'}
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => toggleProductStatus(product.id, 'activo')}
                                  className={product.activo ? 'text-orange-600' : 'text-green-600'}
                                >
                                  <Power className="h-4 w-4 mr-2" />
                                  {product.activo ? 'Desactivar' : 'Activar'}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  onClick={() => deleteProduct(product.id)}
                                  className="text-red-600"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Eliminar
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          
                          <div className="flex items-center gap-2 mt-3">
                            {product.destacado && (
                              <Badge variant="secondary" className="text-xs">
                                <Star className="h-3 w-3 mr-1" />
                                Destacado
                              </Badge>
                            )}
                            {!product.disponible && (
                              <Badge variant="outline" className="text-xs">
                                Oculto
                              </Badge>
                            )}
                            {!product.activo && (
                              <Badge variant="destructive" className="text-xs">
                                Inactivo
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            )}
          </div>

          <div className="flex gap-2 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cerrar
            </Button>
            <Button onClick={onAddProduct} className="flex-1">
              <Plus className="h-4 w-4 mr-2" />
              Agregar Producto
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <EditProductModal 
        open={!!editingProduct}
        onOpenChange={handleCloseEdit}
        product={editingProduct}
      />
    </>
  );
};
