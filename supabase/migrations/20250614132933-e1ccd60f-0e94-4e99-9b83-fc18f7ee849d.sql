
-- Tabla: usuarios (perfiles de usuario)
CREATE TABLE IF NOT EXISTS public.usuarios (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nombre TEXT,
  email TEXT UNIQUE,
  foto TEXT,
  rol TEXT DEFAULT 'vendedor',
  creado_el TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla: planes
CREATE TABLE IF NOT EXISTS public.planes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  precio INTEGER NOT NULL,
  limite_productos INTEGER,
  permite_dominio BOOLEAN DEFAULT FALSE,
  descripcion TEXT,
  creado_el TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla: tiendas
CREATE TABLE IF NOT EXISTS public.tiendas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID REFERENCES public.usuarios(id) ON DELETE CASCADE,
  nombre TEXT NOT NULL,
  categoria TEXT,
  logo_url TEXT,
  subdominio TEXT UNIQUE,
  dominio_personal TEXT,
  plan_id UUID REFERENCES public.planes(id),
  activa BOOLEAN DEFAULT TRUE,
  creado_el TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla: productos
CREATE TABLE IF NOT EXISTS public.productos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tienda_id UUID REFERENCES public.tiendas(id) ON DELETE CASCADE,
  nombre TEXT NOT NULL,
  descripcion TEXT,
  precio NUMERIC NOT NULL,
  imagen_url TEXT,
  tipo TEXT DEFAULT 'físico',
  stock INTEGER DEFAULT 0,
  activo BOOLEAN DEFAULT TRUE,
  creado_el TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla: metodos_pago
CREATE TABLE IF NOT EXISTS public.metodos_pago (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID REFERENCES public.usuarios(id) ON DELETE CASCADE,
  tipo TEXT NOT NULL,
  numero TEXT,
  titular TEXT,
  activo BOOLEAN DEFAULT TRUE,
  agregado_el TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insertar planes por defecto
INSERT INTO public.planes (nombre, precio, limite_productos, permite_dominio, descripcion)
VALUES 
  ('Gratuito', 0, 10, FALSE, 'Hasta 10 productos con subdominio gratuito'),
  ('Estándar', 5000, 50, TRUE, 'Hasta 50 productos con dominio personalizado'),
  ('Premium', 20000, -1, TRUE, 'Productos ilimitados con estadísticas avanzadas')
ON CONFLICT DO NOTHING;

-- Habilitar RLS (Row Level Security)
ALTER TABLE public.usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tiendas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.productos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.metodos_pago ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para usuarios
CREATE POLICY "Los usuarios pueden ver su propio perfil" ON public.usuarios
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Los usuarios pueden actualizar su propio perfil" ON public.usuarios
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Los usuarios pueden insertar su propio perfil" ON public.usuarios
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Políticas RLS para tiendas
CREATE POLICY "Los usuarios pueden ver sus propias tiendas" ON public.tiendas
  FOR SELECT USING (auth.uid() = usuario_id);

CREATE POLICY "Los usuarios pueden crear sus propias tiendas" ON public.tiendas
  FOR INSERT WITH CHECK (auth.uid() = usuario_id);

CREATE POLICY "Los usuarios pueden actualizar sus propias tiendas" ON public.tiendas
  FOR UPDATE USING (auth.uid() = usuario_id);

-- Políticas RLS para productos
CREATE POLICY "Los usuarios pueden ver productos de sus tiendas" ON public.productos
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.tiendas 
      WHERE tiendas.id = productos.tienda_id 
      AND tiendas.usuario_id = auth.uid()
    )
  );

CREATE POLICY "Los usuarios pueden crear productos en sus tiendas" ON public.productos
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.tiendas 
      WHERE tiendas.id = productos.tienda_id 
      AND tiendas.usuario_id = auth.uid()
    )
  );

-- Políticas RLS para métodos de pago
CREATE POLICY "Los usuarios pueden ver sus propios métodos de pago" ON public.metodos_pago
  FOR SELECT USING (auth.uid() = usuario_id);

CREATE POLICY "Los usuarios pueden crear sus propios métodos de pago" ON public.metodos_pago
  FOR INSERT WITH CHECK (auth.uid() = usuario_id);

-- Los planes son públicos para que todos puedan verlos
ALTER TABLE public.planes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Todos pueden ver los planes" ON public.planes
  FOR SELECT TO authenticated, anon USING (true);

-- Función para crear perfil automáticamente
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.usuarios (id, email, nombre)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para crear perfil automáticamente
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
