
-- Agregar campos necesarios a la tabla tiendas
ALTER TABLE public.tiendas 
ADD COLUMN IF NOT EXISTS telefono text,
ADD COLUMN IF NOT EXISTS ubicacion text,
ADD COLUMN IF NOT EXISTS telefono_whatsapp text,
ADD COLUMN IF NOT EXISTS descripcion text,
ADD COLUMN IF NOT EXISTS banner_url text;

-- Crear tabla para datos SEO de tiendas
CREATE TABLE IF NOT EXISTS public.tiendas_seo (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tienda_id uuid REFERENCES public.tiendas(id) ON DELETE CASCADE,
  meta_title text,
  meta_description text,
  og_image_url text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Habilitar RLS en la nueva tabla
ALTER TABLE public.tiendas_seo ENABLE ROW LEVEL SECURITY;

-- Política para permitir lectura pública de datos SEO
CREATE POLICY "SEO data is publicly readable" 
  ON public.tiendas_seo 
  FOR SELECT 
  USING (true);

-- Política para que solo el propietario pueda editar
CREATE POLICY "Store owners can manage SEO data" 
  ON public.tiendas_seo 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.tiendas 
      WHERE tiendas.id = tiendas_seo.tienda_id 
      AND tiendas.usuario_id = auth.uid()
    )
  );

-- Hacer que las tiendas sean públicamente legibles
ALTER TABLE public.tiendas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Stores are publicly readable" 
  ON public.tiendas 
  FOR SELECT 
  USING (activa = true);

CREATE POLICY "Store owners can manage their stores" 
  ON public.tiendas 
  FOR ALL 
  USING (usuario_id = auth.uid());
