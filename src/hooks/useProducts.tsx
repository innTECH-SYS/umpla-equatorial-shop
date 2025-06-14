
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
    if (!user) return;

    try {
      // First get the user's store
      const { data: tienda, error: tiendaError } = await supabase
        .from('tiendas')
        .select('id')
        .eq('usuario_id', user.id)
        .single();

      if (tiendaError || !tienda) {
        setProducts([]);
        return;
      }

      // Then get the products
      const { data, error } = await supabase
        .from('productos')
        .select('*')
        .eq('tienda_id', tienda.id)
        .order('creado_el', { ascending: false });

      if (error) throw error;

      setProducts(data || []);
    } catch (error) {
      console.error('Error loading products:', error);
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
    if (!user) return null;

    try {
      // Get user's store
      const { data: tienda, error: tiendaError } = await supabase
        .from('tiendas')
        .select('id')
        .eq('usuario_id', user.id)
        .single();

      if (tiendaError || !tienda) {
        toast({
          title: "Error",
          description: "No se encontró tu tienda",
          variant: "destructive"
        });
        return null;
      }

      const { data, error } = await supabase
        .from('productos')
        .insert({
          ...productData,
          tienda_id: tienda.id
        })
        .select()
        .single();

      if (error) throw error;

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
    try {
      const { data, error } = await supabase
        .from('productos')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

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
        description: "No se pudo actualizar el producto",
        variant: "destructive"
      });
      return null;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const { error } = await supabase
        .from('productos')
        .delete()
        .eq('id', id);

      if (error) throw error;

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
    if (!product) return;

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
