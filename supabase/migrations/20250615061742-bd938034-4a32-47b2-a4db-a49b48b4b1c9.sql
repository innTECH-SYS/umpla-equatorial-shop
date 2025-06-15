
-- Primero, actualizar las políticas RLS para permitir pedidos públicos
DROP POLICY IF EXISTS "Allow public order creation" ON public.pedidos;
DROP POLICY IF EXISTS "Allow public order items creation" ON public.pedido_items;

-- Crear política más permisiva para crear pedidos desde tiendas públicas
CREATE POLICY "Enable public order creation for stores" 
  ON public.pedidos 
  FOR INSERT 
  WITH CHECK (
    tienda_id IS NOT NULL AND 
    EXISTS (
      SELECT 1 FROM public.tiendas 
      WHERE id = tienda_id AND activa = true
    )
  );

-- Permitir que cualquiera pueda crear items de pedidos
CREATE POLICY "Enable public order items creation" 
  ON public.pedido_items 
  FOR INSERT 
  WITH CHECK (
    pedido_id IS NOT NULL AND
    EXISTS (
      SELECT 1 FROM public.pedidos 
      WHERE id = pedido_items.pedido_id
    )
  );

-- Crear datos de demostración - Usuarios
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_user_meta_data)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'bayam@demo.com', '$2a$10$dummy', now(), now(), now(), '{"full_name": "Bayam Sellam"}'),
  ('22222222-2222-2222-2222-222222222222', 'techno@demo.com', '$2a$10$dummy', now(), now(), now(), '{"full_name": "TechnoMax Store"}'),
  ('33333333-3333-3333-3333-333333333333', 'moda@demo.com', '$2a$10$dummy', now(), now(), now(), '{"full_name": "ModaStyle Store"}')
ON CONFLICT (id) DO NOTHING;

-- Crear usuarios en tabla usuarios
INSERT INTO public.usuarios (id, email, nombre, rol, codigo_referido)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'bayam@demo.com', 'Bayam Sellam', 'vendedor', 'BAYAM2024'),
  ('22222222-2222-2222-2222-222222222222', 'techno@demo.com', 'TechnoMax Store', 'vendedor', 'TECH2024'),
  ('33333333-3333-3333-3333-333333333333', 'moda@demo.com', 'ModaStyle Store', 'vendedor', 'MODA2024')
ON CONFLICT (id) DO NOTHING;

-- Crear planes si no existen
INSERT INTO public.planes (id, nombre, descripcion, precio, limite_productos, permite_dominio)
VALUES 
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Gratuito', 'Plan básico para empezar', 0, 10, false),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Profesional', 'Para negocios en crecimiento', 15000, 100, false),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Premium', 'Para empresas establecidas', 30000, -1, true)
ON CONFLICT (id) DO NOTHING;

-- Actualizar tienda bayamsellam y crear otras tiendas
UPDATE public.tiendas 
SET 
  usuario_id = '11111111-1111-1111-1111-111111111111',
  plan_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  descripcion = 'Productos frescos y de calidad directo del productor',
  categoria = 'Alimentación',
  telefono = '+240 222 123 456',
  ubicacion = 'Malabo, Guinea Ecuatorial'
WHERE nombre = 'Bayam Sellam';

-- Crear tiendas adicionales
INSERT INTO public.tiendas (id, nombre, descripcion, categoria, usuario_id, plan_id, telefono, ubicacion, activa)
VALUES 
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'TechnoMax', 'Tecnología y electrónicos de última generación', 'Tecnología', '22222222-2222-2222-2222-222222222222', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '+240 222 234 567', 'Bata, Guinea Ecuatorial', true),
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'ModaStyle', 'Moda y accesorios para toda la familia', 'Moda', '33333333-3333-3333-3333-333333333333', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '+240 222 345 678', 'Malabo, Guinea Ecuatorial', true)
ON CONFLICT (id) DO NOTHING;

-- Obtener el ID de la tienda Bayam Sellam para los productos
DO $$
DECLARE
    bayam_store_id uuid;
    techno_store_id uuid := 'dddddddd-dddd-dddd-dddd-dddddddddddd';
    moda_store_id uuid := 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee';
BEGIN
    -- Obtener ID de Bayam Sellam
    SELECT id INTO bayam_store_id FROM public.tiendas WHERE nombre = 'Bayam Sellam' LIMIT 1;
    
    IF bayam_store_id IS NOT NULL THEN
        -- Productos para Bayam Sellam
        INSERT INTO public.productos (tienda_id, nombre, descripcion, precio, stock, tipo, activo, disponible, destacado)
        VALUES 
          (bayam_store_id, 'Plátanos Frescos', 'Plátanos maduros de la mejor calidad, recién cosechados', 2500, 100, 'físico', true, true, true),
          (bayam_store_id, 'Yuca Premium', 'Yuca fresca y natural, ideal para cualquier preparación', 3000, 50, 'físico', true, true, false),
          (bayam_store_id, 'Malanga Selecta', 'Malanga de primera calidad, perfecta para sus comidas', 3500, 30, 'físico', true, true, true),
          (bayam_store_id, 'Piña Tropical', 'Piñas dulces y jugosas, directas del campo', 4000, 25, 'físico', true, true, false),
          (bayam_store_id, 'Aguacates Cremosos', 'Aguacates maduros y cremosos, ricos en nutrientes', 5000, 40, 'físico', true, true, true)
        ON CONFLICT DO NOTHING;
    END IF;
    
    -- Productos para TechnoMax
    INSERT INTO public.productos (tienda_id, nombre, descripcion, precio, stock, tipo, activo, disponible, destacado)
    VALUES 
      (techno_store_id, 'Smartphone Samsung Galaxy', 'Último modelo con cámara de alta resolución', 450000, 10, 'físico', true, true, true),
      (techno_store_id, 'Laptop HP Pavilion', 'Computadora portátil ideal para trabajo y estudio', 650000, 5, 'físico', true, true, true),
      (techno_store_id, 'Auriculares Bluetooth', 'Auriculares inalámbricos con cancelación de ruido', 85000, 20, 'físico', true, true, false),
      (techno_store_id, 'Tablet Android', 'Tablet de 10 pulgadas para entretenimiento', 250000, 8, 'físico', true, true, false),
      (techno_store_id, 'Cargador Inalámbrico', 'Carga rápida para dispositivos compatibles', 35000, 15, 'físico', true, true, false)
    ON CONFLICT DO NOTHING;
    
    -- Productos para ModaStyle
    INSERT INTO public.productos (tienda_id, nombre, descripcion, precio, stock, tipo, activo, disponible, destacado)
    VALUES 
      (moda_store_id, 'Vestido Elegante', 'Vestido de gala para ocasiones especiales', 85000, 12, 'físico', true, true, true),
      (moda_store_id, 'Camisa Formal Hombre', 'Camisa de vestir de alta calidad', 45000, 25, 'físico', true, true, false),
      (moda_store_id, 'Zapatos de Cuero', 'Zapatos elegantes para hombre y mujer', 120000, 18, 'físico', true, true, true),
      (moda_store_id, 'Bolso de Mano', 'Bolso elegante para dama, varios colores', 65000, 15, 'físico', true, true, true),
      (moda_store_id, 'Reloj Clásico', 'Reloj de pulsera con diseño clásico', 95000, 10, 'físico', true, true, false)
    ON CONFLICT DO NOTHING;
END $$;
