
-- Actualizar la tienda bayamsellam con imagen por defecto
UPDATE productos 
SET imagen_url = 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400'
WHERE tienda_id IN (
  SELECT id FROM tiendas WHERE nombre = 'Bayam Sellam'
) AND imagen_url IS NULL;

-- Asegurar que el producto esté activo y disponible
UPDATE productos 
SET activo = true, disponible = true
WHERE tienda_id IN (
  SELECT id FROM tiendas WHERE nombre = 'Bayam Sellam'
);
