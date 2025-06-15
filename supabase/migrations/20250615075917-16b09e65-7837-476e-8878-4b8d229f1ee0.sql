
-- Actualizar productos de Bayam Sellam con imágenes de comida atractivas
UPDATE productos 
SET imagen_url = CASE 
  WHEN nombre ILIKE '%tomate%' THEN 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&h=500&fit=crop'
  WHEN nombre ILIKE '%cebolla%' THEN 'https://images.unsplash.com/photo-1508747703725-719777637510?w=500&h=500&fit=crop'
  WHEN nombre ILIKE '%zanahoria%' THEN 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500&h=500&fit=crop'
  WHEN nombre ILIKE '%lechuga%' THEN 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=500&h=500&fit=crop'
  WHEN nombre ILIKE '%plátano%' OR nombre ILIKE '%banana%' THEN 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500&h=500&fit=crop'
  WHEN nombre ILIKE '%manzana%' THEN 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&h=500&fit=crop'
  WHEN nombre ILIKE '%naranja%' THEN 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=500&h=500&fit=crop'
  WHEN nombre ILIKE '%papa%' OR nombre ILIKE '%patata%' THEN 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&h=500&fit=crop'
  WHEN nombre ILIKE '%arroz%' THEN 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&h=500&fit=crop'
  WHEN nombre ILIKE '%frijol%' OR nombre ILIKE '%judía%' THEN 'https://images.unsplash.com/photo-1621857556802-bf5e5b0a8c1e?w=500&h=500&fit=crop'
  ELSE 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&h=500&fit=crop'
END
WHERE tienda_id IN (SELECT id FROM tiendas WHERE nombre = 'Bayam Sellam');

-- Actualizar productos de TechnoMax con imágenes de tecnología
UPDATE productos 
SET imagen_url = CASE 
  WHEN nombre ILIKE '%laptop%' OR nombre ILIKE '%portátil%' THEN 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop'
  WHEN nombre ILIKE '%teléfono%' OR nombre ILIKE '%móvil%' OR nombre ILIKE '%celular%' THEN 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop'
  WHEN nombre ILIKE '%tablet%' THEN 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=500&fit=crop'
  WHEN nombre ILIKE '%auricular%' OR nombre ILIKE '%audífono%' THEN 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop'
  WHEN nombre ILIKE '%mouse%' OR nombre ILIKE '%ratón%' THEN 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop'
  WHEN nombre ILIKE '%teclado%' THEN 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500&h=500&fit=crop'
  WHEN nombre ILIKE '%monitor%' OR nombre ILIKE '%pantalla%' THEN 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&h=500&fit=crop'
  WHEN nombre ILIKE '%cámara%' THEN 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&h=500&fit=crop'
  WHEN nombre ILIKE '%smartwatch%' OR nombre ILIKE '%reloj%' THEN 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop'
  WHEN nombre ILIKE '%cable%' THEN 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500&h=500&fit=crop'
  ELSE 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&h=500&fit=crop'
END
WHERE tienda_id IN (SELECT id FROM tiendas WHERE nombre = 'TechnoMax');

-- Actualizar productos de ModaStyle con imágenes de moda
UPDATE productos 
SET imagen_url = CASE 
  WHEN nombre ILIKE '%camisa%' OR nombre ILIKE '%blusa%' THEN 'https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?w=500&h=500&fit=crop'
  WHEN nombre ILIKE '%pantalón%' OR nombre ILIKE '%jean%' THEN 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop'
  WHEN nombre ILIKE '%vestido%' THEN 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=500&fit=crop'
  WHEN nombre ILIKE '%zapato%' OR nombre ILIKE '%calzado%' THEN 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop'
  WHEN nombre ILIKE '%bolso%' OR nombre ILIKE '%cartera%' THEN 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop'
  WHEN nombre ILIKE '%chaqueta%' OR nombre ILIKE '%abrigo%' THEN 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5c?w=500&h=500&fit=crop'
  WHEN nombre ILIKE '%falda%' THEN 'https://images.unsplash.com/photo-1583496661160-fb5886a13c0e?w=500&h=500&fit=crop'
  WHEN nombre ILIKE '%accesorio%' OR nombre ILIKE '%collar%' THEN 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=500&fit=crop'
  WHEN nombre ILIKE '%gorra%' OR nombre ILIKE '%sombrero%' THEN 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=500&h=500&fit=crop'
  WHEN nombre ILIKE '%reloj%' THEN 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&h=500&fit=crop'
  ELSE 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=500&fit=crop'
END
WHERE tienda_id IN (SELECT id FROM tiendas WHERE nombre = 'ModaStyle');

-- Crear métodos de pago demo para todas las tiendas (solo efectivo activo)
INSERT INTO metodos_pago (usuario_id, tipo, titular, activo)
SELECT DISTINCT t.usuario_id, 'cash_delivery', 'Pago contra entrega', true
FROM tiendas t
WHERE NOT EXISTS (
  SELECT 1 FROM metodos_pago mp 
  WHERE mp.usuario_id = t.usuario_id AND mp.tipo = 'cash_delivery'
);

-- Crear métodos "coming soon" para todas las tiendas demo
INSERT INTO metodos_pago (usuario_id, tipo, titular, activo)
SELECT DISTINCT t.usuario_id, tipo_pago, 'Próximamente disponible', false
FROM tiendas t
CROSS JOIN (
  VALUES 
    ('credit_card'),
    ('bank_transfer'),
    ('mobile_money')
) AS tipos(tipo_pago)
WHERE NOT EXISTS (
  SELECT 1 FROM metodos_pago mp 
  WHERE mp.usuario_id = t.usuario_id AND mp.tipo = tipos.tipo_pago
);
