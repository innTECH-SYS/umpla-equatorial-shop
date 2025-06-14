
-- Crear tabla para rastrear el progreso del checklist de mejoras de tienda
CREATE TABLE public.checklist_progreso (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  usuario_id UUID NOT NULL,
  item_id TEXT NOT NULL,
  completado BOOLEAN NOT NULL DEFAULT false,
  completado_el TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(usuario_id, item_id)
);

-- Habilitar RLS
ALTER TABLE public.checklist_progreso ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para que los usuarios solo vean su propio progreso
CREATE POLICY "Users can view their own checklist progress" 
  ON public.checklist_progreso 
  FOR SELECT 
  USING (auth.uid() = usuario_id);

CREATE POLICY "Users can insert their own checklist progress" 
  ON public.checklist_progreso 
  FOR INSERT 
  WITH CHECK (auth.uid() = usuario_id);

CREATE POLICY "Users can update their own checklist progress" 
  ON public.checklist_progreso 
  FOR UPDATE 
  USING (auth.uid() = usuario_id);

-- Función para actualizar timestamp automáticamente
CREATE OR REPLACE FUNCTION update_checklist_progreso_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  IF NEW.completado = true AND OLD.completado = false THEN
    NEW.completado_el = now();
  ELSIF NEW.completado = false THEN
    NEW.completado_el = NULL;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar automáticamente updated_at y completado_el
CREATE TRIGGER update_checklist_progreso_updated_at_trigger
  BEFORE UPDATE ON public.checklist_progreso
  FOR EACH ROW
  EXECUTE FUNCTION update_checklist_progreso_updated_at();
