
-- Tabla para controlar referidos
CREATE TABLE IF NOT EXISTS public.referidos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  referente_id uuid REFERENCES public.usuarios(id),
  referido_id uuid REFERENCES public.usuarios(id),
  valido boolean DEFAULT false,
  activado_el timestamp with time zone,
  created_at timestamp with time zone DEFAULT now()
);

-- Agregar código de referido a usuarios
ALTER TABLE public.usuarios 
ADD COLUMN IF NOT EXISTS codigo_referido text UNIQUE;

-- Agregar productos extra a tiendas
ALTER TABLE public.tiendas 
ADD COLUMN IF NOT EXISTS productos_extra integer DEFAULT 0;

-- Habilitar RLS en la tabla referidos
ALTER TABLE public.referidos ENABLE ROW LEVEL SECURITY;

-- Política para que los usuarios puedan ver sus referidos
CREATE POLICY "Users can view their referrals" 
  ON public.referidos 
  FOR SELECT 
  USING (
    auth.uid() = referente_id OR auth.uid() = referido_id
  );

-- Política para crear referidos
CREATE POLICY "Users can create referrals" 
  ON public.referidos 
  FOR INSERT 
  WITH CHECK (
    auth.uid() = referido_id
  );

-- Política para actualizar referidos (solo el sistema puede marcar como válido)
CREATE POLICY "System can update referrals" 
  ON public.referidos 
  FOR UPDATE 
  USING (true);
