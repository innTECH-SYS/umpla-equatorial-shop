
-- Habilitar Row Level Security en la tabla productos
ALTER TABLE public.productos ENABLE ROW LEVEL SECURITY;

-- Política para que los usuarios puedan ver los productos de su propia tienda
CREATE POLICY "Users can view their store products" 
  ON public.productos 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.tiendas 
      WHERE tiendas.id = productos.tienda_id 
      AND tiendas.usuario_id = auth.uid()
    )
  );

-- Política para que los usuarios puedan crear productos en su propia tienda
CREATE POLICY "Users can create products in their store" 
  ON public.productos 
  FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.tiendas 
      WHERE tiendas.id = productos.tienda_id 
      AND tiendas.usuario_id = auth.uid()
    )
  );

-- Política para que los usuarios puedan actualizar productos de su propia tienda
CREATE POLICY "Users can update their store products" 
  ON public.productos 
  FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM public.tiendas 
      WHERE tiendas.id = productos.tienda_id 
      AND tiendas.usuario_id = auth.uid()
    )
  );

-- Política para que los usuarios puedan eliminar productos de su propia tienda
CREATE POLICY "Users can delete their store products" 
  ON public.productos 
  FOR DELETE 
  USING (
    EXISTS (
      SELECT 1 FROM public.tiendas 
      WHERE tiendas.id = productos.tienda_id 
      AND tiendas.usuario_id = auth.uid()
    )
  );
