
-- Permitir insertar pedidos desde tiendas públicas (sin autenticación)
CREATE POLICY "Allow public order creation" 
  ON public.pedidos 
  FOR INSERT 
  WITH CHECK (true);

-- Permitir insertar items de pedidos asociados a pedidos válidos
CREATE POLICY "Allow public order items creation" 
  ON public.pedido_items 
  FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.pedidos 
      WHERE id = pedido_items.pedido_id
    )
  );

-- Permitir que cualquiera pueda leer productos activos para validación
CREATE POLICY "Allow public product reading" 
  ON public.productos 
  FOR SELECT 
  USING (activo = true AND disponible = true);
