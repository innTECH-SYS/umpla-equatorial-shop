
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: string;
  nombre: string;
  descripcion?: string;
  precio: number;
  stock?: number;
  tipo?: string;
  imagen_url?: string;
  imagenes?: string[];
  destacado?: boolean;
  disponible?: boolean;
  activo?: boolean;
  tienda_id: string;
  creado_el?: string;
}

export const useProducts = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    if (!user) {
      console.log('No user found, skipping product load');
      setProducts([]);
      setLoading(false);
      return;
    }

    try {
      console.log('Loading products for user:', user.id);
      
      // First get the user's store
      const { data: tienda, error: tiendaError } = await supabase
        .from('tiendas')
        .select('id')
        .eq('usuario_id', user.id)
        .single();

      if (tiendaError) {
        console.error('Error loading store:', tiendaError);
        if (tiendaError.code === 'PGRST116') {
          console.log('No store found for user');
          setProducts([]);
          return;
        }
        throw tiendaError;
      }

      if (!tienda) {
        console.log('No store found for user');
        setProducts([]);
        return;
      }

      console.log('Store found:', tienda.id);

      // Then get the products
      const { data, error } = await supabase
        .from('productos')
        .select('*')
        .eq('tienda_id', tienda.id)
        .order('creado_el', { ascending: false });

      if (error) {
        console.error('Error loading products:', error);
        throw error;
      }

      console.log('Products loaded:', data?.length || 0);
      setProducts(data || []);
    } catch (error) {
      console.error('Error in loadProducts:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los productos",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [user]);

  const addProduct = async (productData: Omit<Product, 'id' | 'tienda_id' | 'creado_el'>) => {
    if (!user) {
      console.error('No user found for adding product');
      return null;
    }

    try {
      console.log('Adding product for user:', user.id);
      
      // Get user's store
      const { data: tienda, error: tiendaError } = await supabase
        .from('tiendas')
        .select('id')
        .eq('usuario_id', user.id)
        .single();

      if (tiendaError || !tienda) {
        console.error('Error getting store for product creation:', tiendaError);
        toast({
          title: "Error",
          description: "No se encontró tu tienda",
          variant: "destructive"
        });
        return null;
      }

      console.log('Creating product for store:', tienda.id);

      const { data, error } = await supabase
        .from('productos')
        .insert({
          ...productData,
          tienda_id: tienda.id
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating product:', error);
        throw error;
      }

      console.log('Product created successfully:', data.id);
      setProducts(prev => [data, ...prev]);
      
      toast({
        title: "¡Producto añadido!",
        description: "Tu producto se ha añadido correctamente"
      });

      return data;
    } catch (error) {
      console.error('Error adding product:', error);
      toast({
        title: "Error",
        description: "No se pudo añadir el producto",
        variant: "destructive"
      });
      return null;
    }
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    if (!user) {
      console.error('No user found for updating product');
      return null;
    }

    try {
      console.log('Updating product:', id, 'with updates:', updates);
      
      // First verify the product exists and belongs to the user's store
      const { data: existingProduct, error: checkError } = await supabase
        .from('productos')
        .select('id, tienda_id')
        .eq('id', id)
        .single();

      if (checkError) {
        console.error('Error checking existing product:', checkError);
        if (checkError.code === 'PGRST116') {
          toast({
            title: "Error",
            description: "Producto no encontrado",
            variant: "destructive"
          });
          return null;
        }
        throw checkError;
      }

      if (!existingProduct) {
        console.error('Product not found:', id);
        toast({
          title: "Error",
          description: "Producto no encontrado",
          variant: "destructive"
        });
        return null;
      }

      console.log('Existing product found:', existingProduct);

      // Perform the update
      const { data, error } = await supabase
        .from('productos')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating product:', error);
        if (error.code === 'PGRST116') {
          toast({
            title: "Error",
            description: "No tienes permisos para actualizar este producto",
            variant: "destructive"
          });
          return null;
        }
        throw error;
      }

      console.log('Product updated successfully:', data);
      setProducts(prev => prev.map(p => p.id === id ? data : p));
      
      toast({
        title: "Producto actualizado",
        description: "Los cambios se han guardado correctamente"
      });

      return data;
    } catch (error) {
      console.error('Error updating product:', error);
      toast({
        title: "Error",
        description: "No se pudo actualizar el producto. Verifica tu conexión e inténtalo de nuevo.",
        variant: "destructive"
      });
      return null;
    }
  };

  const deleteProduct = async (id: string) => {
    if (!user) {
      console.error('No user found for deleting product');
      return;
    }

    try {
      console.log('Deleting product:', id);
      
      const { error } = await supabase
        .from('productos')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting product:', error);
        throw error;
      }

      console.log('Product deleted successfully');
      setProducts(prev => prev.filter(p => p.id !== id));
      
      toast({
        title: "Producto eliminado",
        description: "El producto se ha eliminado correctamente"
      });
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: "Error",
        description: "No se pudo eliminar el producto",
        variant: "destructive"
      });
    }
  };

  const toggleProductStatus = async (id: string, field: 'activo' | 'destacado' | 'disponible') => {
    const product = products.find(p => p.id === id);
    if (!product) {
      console.error('Product not found for toggle:', id);
      return;
    }

    console.log('Toggling product status:', id, field, 'current value:', product[field]);
    await updateProduct(id, { [field]: !product[field] });
  };

  return {
    products,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleProductStatus,
    refetch: loadProducts
  };
};
