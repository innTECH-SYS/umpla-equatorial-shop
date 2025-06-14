
-- Crear tabla para los pedidos
CREATE TABLE public.pedidos (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  numero_pedido text NOT NULL UNIQUE,
  tienda_id uuid REFERENCES public.tiendas(id) ON DELETE CASCADE,
  nombre_cliente text NOT NULL,
  telefono_cliente text NOT NULL,
  direccion_entrega text NOT NULL,
  estado text NOT NULL DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'confirmado', 'preparando', 'enviado', 'entregado', 'cancelado')),
  total numeric NOT NULL DEFAULT 0,
  divisa text NOT NULL DEFAULT 'XAF',
  metodo_pago text NOT NULL,
  notas text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Crear tabla para los items de cada pedido
CREATE TABLE public.pedido_items (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  pedido_id uuid REFERENCES public.pedidos(id) ON DELETE CASCADE,
  producto_id uuid REFERENCES public.productos(id) ON DELETE CASCADE,
  nombre_producto text NOT NULL,
  precio_unitario numeric NOT NULL,
  cantidad integer NOT NULL DEFAULT 1,
  subtotal numeric NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Habilitar RLS en ambas tablas
ALTER TABLE public.pedidos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pedido_items ENABLE ROW LEVEL SECURITY;

-- Políticas para pedidos - solo el dueño de la tienda puede ver sus pedidos
CREATE POLICY "Store owners can view their orders" 
  ON public.pedidos 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.tiendas 
      WHERE tiendas.id = pedidos.tienda_id 
      AND tiendas.usuario_id = auth.uid()
    )
  );

CREATE POLICY "Store owners can manage their orders" 
  ON public.pedidos 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.tiendas 
      WHERE tiendas.id = pedidos.tienda_id 
      AND tiendas.usuario_id = auth.uid()
    )
  );

-- Políticas para items de pedidos
CREATE POLICY "Store owners can view order items" 
  ON public.pedido_items 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.pedidos p
      JOIN public.tiendas t ON t.id = p.tienda_id 
      WHERE p.id = pedido_items.pedido_id 
      AND t.usuario_id = auth.uid()
    )
  );

CREATE POLICY "Store owners can manage order items" 
  ON public.pedido_items 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.pedidos p
      JOIN public.tiendas t ON t.id = p.tienda_id 
      WHERE p.id = pedido_items.pedido_id 
      AND t.usuario_id = auth.uid()
    )
  );

-- Función para generar número de pedido único
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS text AS $$
BEGIN
  RETURN 'ORD-' || LPAD(nextval('pedidos_seq')::text, 6, '0');
END;
$$ LANGUAGE plpgsql;

-- Crear secuencia para números de pedido
CREATE SEQUENCE IF NOT EXISTS pedidos_seq START 1;

-- Trigger para generar número de pedido automáticamente
CREATE OR REPLACE FUNCTION set_order_number()
RETURNS trigger AS $$
BEGIN
  IF NEW.numero_pedido IS NULL OR NEW.numero_pedido = '' THEN
    NEW.numero_pedido := generate_order_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_order_number_trigger
  BEFORE INSERT ON public.pedidos
  FOR EACH ROW
  EXECUTE FUNCTION set_order_number();

-- Trigger para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_pedidos_updated_at
  BEFORE UPDATE ON public.pedidos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Agregar campos faltantes a la tabla productos
ALTER TABLE public.productos 
ADD COLUMN IF NOT EXISTS destacado boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS disponible boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS imagenes text[];
