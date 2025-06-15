
-- Crear métodos de pago para las tiendas de demostración
INSERT INTO public.metodos_pago (usuario_id, tipo, numero, titular, activo)
VALUES 
  -- Métodos para Bayam Sellam (usuario_id: 11111111-1111-1111-1111-111111111111)
  ('11111111-1111-1111-1111-111111111111', 'bank_transfer', 'BANGE-001-12345678', 'Bayam Sellam', true),
  ('11111111-1111-1111-1111-111111111111', 'cash_delivery', NULL, 'Bayam Sellam', true),
  ('11111111-1111-1111-1111-111111111111', 'mobile_money', '+240-222-123-456', 'Bayam Sellam', true),
  
  -- Métodos para TechnoMax (usuario_id: 22222222-2222-2222-2222-222222222222)
  ('22222222-2222-2222-2222-222222222222', 'bank_transfer', 'CCEI-002-87654321', 'TechnoMax Store', true),
  ('22222222-2222-2222-2222-222222222222', 'credit_card', 'VISA-****-****-1234', 'TechnoMax Store', true),
  ('22222222-2222-2222-2222-222222222222', 'cash_delivery', NULL, 'TechnoMax Store', true),
  
  -- Métodos para ModaStyle (usuario_id: 33333333-3333-3333-3333-333333333333)
  ('33333333-3333-3333-3333-333333333333', 'bank_transfer', 'BGFIBank-003-11223344', 'ModaStyle Store', true),
  ('33333333-3333-3333-3333-333333333333', 'credit_card', 'MASTERCARD-****-****-5678', 'ModaStyle Store', true),
  ('33333333-3333-3333-3333-333333333333', 'cash_delivery', NULL, 'ModaStyle Store', true),
  ('33333333-3333-3333-3333-333333333333', 'mobile_money', '+240-222-345-678', 'ModaStyle Store', true)
ON CONFLICT DO NOTHING;

-- Crear tabla para relacionar tiendas con métodos de pago disponibles
CREATE TABLE IF NOT EXISTS public.tienda_metodos_pago (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  tienda_id uuid REFERENCES public.tiendas(id) ON DELETE CASCADE,
  metodo_tipo text NOT NULL,
  activo boolean DEFAULT true,
  comision_porcentaje numeric DEFAULT 0,
  comision_fija numeric DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE(tienda_id, metodo_tipo)
);

-- Insertar métodos de pago disponibles por tienda
DO $$
DECLARE
    bayam_store_id uuid;
    techno_store_id uuid := 'dddddddd-dddd-dddd-dddd-dddddddddddd';
    moda_store_id uuid := 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee';
BEGIN
    -- Obtener ID de Bayam Sellam
    SELECT id INTO bayam_store_id FROM public.tiendas WHERE nombre = 'Bayam Sellam' LIMIT 1;
    
    IF bayam_store_id IS NOT NULL THEN
        -- Métodos para Bayam Sellam
        INSERT INTO public.tienda_metodos_pago (tienda_id, metodo_tipo, comision_porcentaje, comision_fija)
        VALUES 
          (bayam_store_id, 'bank_transfer', 0, 1000),
          (bayam_store_id, 'cash_delivery', 0, 0),
          (bayam_store_id, 'mobile_money', 2, 500)
        ON CONFLICT DO NOTHING;
    END IF;
    
    -- Métodos para TechnoMax
    INSERT INTO public.tienda_metodos_pago (tienda_id, metodo_tipo, comision_porcentaje, comision_fija)
    VALUES 
      (techno_store_id, 'bank_transfer', 0, 1000),
      (techno_store_id, 'credit_card', 3.5, 0),
      (techno_store_id, 'cash_delivery', 0, 0)
    ON CONFLICT DO NOTHING;
    
    -- Métodos para ModaStyle
    INSERT INTO public.tienda_metodos_pago (tienda_id, metodo_tipo, comision_porcentaje, comision_fija)
    VALUES 
      (moda_store_id, 'bank_transfer', 0, 1000),
      (moda_store_id, 'credit_card', 3.5, 0),
      (moda_store_id, 'cash_delivery', 0, 0),
      (moda_store_id, 'mobile_money', 2, 500)
    ON CONFLICT DO NOTHING;
END $$;
