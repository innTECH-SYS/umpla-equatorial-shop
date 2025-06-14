
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useProducts } from '@/hooks/useProducts';
import { Edit, Trash2, Star, Eye, EyeOff, Plus } from 'lucide-react';

interface ProductsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddProduct: () => void;
}

export const ProductsModal = ({ open, onOpenChange, onAddProduct }: ProductsModalProps) => {
  const { products, loading, deleteProduct, toggleProductStatus } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(product =>
    product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.descripcion?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar "${name}"?`)) {
      await deleteProduct(id);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Gestión de Productos</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex gap-4">
            <Input
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Button onClick={onAddProduct} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Nuevo Producto
            </Button>
          </div>

          <div className="overflow-y-auto max-h-[60vh]">
            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <Card key={i} className="p-4">
                    <div className="animate-pulse space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <Card className="p-8 text-center">
                <div className="text-gray-500">
                  {searchTerm ? 'No se encontraron productos' : 'Aún no tienes productos'}
                </div>
                {!searchTerm && (
                  <Button onClick={onAddProduct} className="mt-4">
                    Agregar tu primer producto
                  </Button>
                )}
              </Card>
            ) : (
              <div className="grid gap-4">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4 flex-1">
                        {product.imagen_url && (
                          <img
                            src={product.imagen_url}
                            alt={product.nombre}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium truncate">{product.nombre}</h3>
                            {product.destacado && (
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            )}
                          </div>
                          {product.descripcion && (
                            <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                              {product.descripcion}
                            </p>
                          )}
                          <div className="flex items-center gap-4 text-sm">
                            <span className="font-medium">₣{product.precio}</span>
                            {product.stock !== null && product.stock !== undefined && (
                              <span className="text-gray-500">Stock: {product.stock}</span>
                            )}
                            <Badge variant={product.activo ? 'default' : 'secondary'}>
                              {product.activo ? 'Activo' : 'Inactivo'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleProductStatus(product.id, 'disponible')}
                          title={product.disponible ? 'Ocultar producto' : 'Mostrar producto'}
                        >
                          {product.disponible ? (
                            <Eye className="h-4 w-4" />
                          ) : (
                            <EyeOff className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleProductStatus(product.id, 'destacado')}
                          title={product.destacado ? 'Quitar de destacados' : 'Marcar como destacado'}
                        >
                          <Star className={`h-4 w-4 ${product.destacado ? 'fill-current text-yellow-500' : ''}`} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          title="Editar producto"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(product.id, product.nombre)}
                          title="Eliminar producto"
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
