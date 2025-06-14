
-- Crear usuarios de demostración
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_user_meta_data, aud, role)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'technomax@demo.com', '$2a$10$demo', now(), now(), now(), '{"full_name": "Carlos Mendez"}', 'authenticated', 'authenticated'),
  ('22222222-2222-2222-2222-222222222222', 'modastyle@demo.com', '$2a$10$demo', now(), now(), now(), '{"full_name": "Maria Santos"}', 'authenticated', 'authenticated'),
  ('33333333-3333-3333-3333-333333333333', 'supermarket@demo.com', '$2a$10$demo', now(), now(), now(), '{"full_name": "Pedro Obiang"}', 'authenticated', 'authenticated');

-- Crear perfiles de usuarios
INSERT INTO usuarios (id, email, nombre, rol, codigo_referido)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'technomax@demo.com', 'Carlos Mendez', 'vendedor', 'TECH001'),
  ('22222222-2222-2222-2222-222222222222', 'modastyle@demo.com', 'Maria Santos', 'vendedor', 'MODA001'),
  ('33333333-3333-3333-3333-333333333333', 'supermarket@demo.com', 'Pedro Obiang', 'vendedor', 'SUPER001');

-- Crear tiendas de demostración
INSERT INTO tiendas (id, nombre, descripcion, categoria, usuario_id, telefono, ubicacion, activa)
VALUES 
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'TechnoMax', 'Tu tienda de tecnología en Guinea Ecuatorial. Los mejores precios en electrónicos.', 'Electrónicos', '11111111-1111-1111-1111-111111111111', '+240 555 123 456', 'Malabo, Bioko Norte', true),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'ModaStyle', 'Moda y estilo para toda la familia. Ropa de calidad a precios accesibles.', 'Moda y Ropa', '22222222-2222-2222-2222-222222222222', '+240 555 234 567', 'Bata, Litoral', true),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'SuperMarket GQ', 'Tu supermercado de confianza. Productos frescos y de calidad todos los días.', 'Alimentación', '33333333-3333-3333-3333-333333333333', '+240 555 345 678', 'Malabo Centro', true);

-- Productos para TechnoMax (Electrónicos)
INSERT INTO productos (id, nombre, descripcion, precio, tienda_id, imagen_url, activo, disponible, stock, destacado)
VALUES 
  ('prod0001-0001-0001-0001-000000000001', 'iPhone 15 Pro', 'El último iPhone con chip A17 Pro y cámara de 48MP. Incluye cargador.', 850000, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400', true, true, 15, true),
  ('prod0001-0001-0001-0001-000000000002', 'Samsung Galaxy S24', 'Smartphone premium con pantalla AMOLED y cámara profesional.', 720000, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400', true, true, 12, true),
  ('prod0001-0001-0001-0001-000000000003', 'MacBook Air M2', 'Laptop ultradelgada con chip M2 de Apple. Perfecta para trabajo y estudio.', 1200000, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400', true, true, 8, true),
  ('prod0001-0001-0001-0001-000000000004', 'iPad Pro 12.9"', 'Tablet profesional con pantalla Liquid Retina y Apple Pencil incluido.', 950000, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400', true, true, 6, false),
  ('prod0001-0001-0001-0001-000000000005', 'AirPods Pro', 'Auriculares inalámbricos con cancelación de ruido activa.', 180000, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400', true, true, 25, false),
  ('prod0001-0001-0001-0001-000000000006', 'Dell XPS 13', 'Laptop ultrabook con procesador Intel Core i7 y 16GB RAM.', 980000, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400', true, true, 4, false),
  ('prod0001-0001-0001-0001-000000000007', 'Nintendo Switch', 'Consola híbrida para jugar en casa o portátil. Incluye Joy-Con.', 320000, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400', true, true, 10, true),
  ('prod0001-0001-0001-0001-000000000008', 'Canon EOS R5', 'Cámara mirrorless profesional con video 8K y 45MP.', 2500000, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400', true, true, 3, false);

-- Productos para ModaStyle (Ropa)
INSERT INTO productos (id, nombre, descripcion, precio, tienda_id, imagen_url, activo, disponible, stock, destacado)
VALUES 
  ('prod0002-0002-0002-0002-000000000001', 'Camisa Formal Blanca', 'Camisa de algodón premium para ocasiones especiales. Tallas S-XXL.', 35000, 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400', true, true, 20, true),
  ('prod0002-0002-0002-0002-000000000002', 'Vestido Casual Floral', 'Vestido ligero perfecto para el clima tropical. Diseño exclusivo.', 45000, 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400', true, true, 15, true),
  ('prod0002-0002-0002-0002-000000000003', 'Pantalón Chino Azul', 'Pantalón versátil para uso diario. Corte moderno y cómodo.', 28000, 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400', true, true, 18, false),
  ('prod0002-0002-0002-0002-000000000004', 'Blusa de Seda Elegante', 'Blusa de seda natural en varios colores. Ideal para oficina.', 55000, 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'https://images.unsplash.com/photo-1564257577-87a5d2370d31?w=400', true, true, 12, true),
  ('prod0002-0002-0002-0002-000000000005', 'Zapatos de Cuero', 'Zapatos formales de cuero genuino. Fabricados en España.', 85000, 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400', true, true, 8, false),
  ('prod0002-0002-0002-0002-000000000006', 'Polo Deportivo', 'Polo transpirable para actividades deportivas. Material de secado rápido.', 22000, 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=400', true, true, 25, false),
  ('prod0002-0002-0002-0002-000000000007', 'Falda Midi Negra', 'Falda elegante hasta la rodilla. Perfecta para cualquier ocasión.', 38000, 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'https://images.unsplash.com/photo-1583496661160-fb5886a13d44?w=400', true, true, 14, true),
  ('prod0002-0002-0002-0002-000000000008', 'Chaqueta Denim', 'Chaqueta de mezclilla clásica. Nunca pasa de moda.', 42000, 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'https://images.unsplash.com/photo-1544966503-7cc1a37657ef?w=400', true, true, 10, false);

-- Productos para SuperMarket (Alimentación)
INSERT INTO productos (id, nombre, descripcion, precio, tienda_id, imagen_url, activo, disponible, stock, destacado)
VALUES 
  ('prod0003-0003-0003-0003-000000000001', 'Plátanos Frescos', 'Plátanos maduros de cultivo local. Ricos en potasio y vitaminas.', 1500, 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400', true, true, 100, true),
  ('prod0003-0003-0003-0003-000000000002', 'Arroz Premium 5kg', 'Arroz de grano largo importado. Ideal para toda la familia.', 8500, 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400', true, true, 50, true),
  ('prod0003-0003-0003-0003-000000000003', 'Aceite de Palma', 'Aceite de palma puro 100% natural. Producido localmente.', 3200, 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400', true, true, 75, false),
  ('prod0003-0003-0003-0003-000000000004', 'Pescado Fresco', 'Pescado del día capturado en aguas locales. Ultra fresco.', 12000, 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=400', true, true, 20, true),
  ('prod0003-0003-0003-0003-000000000005', 'Cassava (Yuca)', 'Yuca fresca pelada y lista para cocinar. Base de la dieta local.', 2800, 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'https://images.unsplash.com/photo-1586888893434-7fc0ad4c4746?w=400', true, true, 60, false),
  ('prod0003-0003-0003-0003-000000000006', 'Café Local', 'Café tostado de las montañas de Guinea Ecuatorial. Sabor único.', 15000, 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=400', true, true, 30, true),
  ('prod0003-0003-0003-0003-000000000007', 'Huevos Frescos (12 unidades)', 'Huevos de gallinas criadas en libertad. Garantía de frescura.', 4500, 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?w=400', true, true, 40, false),
  ('prod0003-0003-0003-0003-000000000008', 'Frutas Tropicales Mix', 'Mezcla de frutas tropicales: mango, papaya y piña. 2kg.', 6500, 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400', true, true, 25, true);

-- Crear pedidos de demostración
INSERT INTO pedidos (id, numero_pedido, tienda_id, nombre_cliente, telefono_cliente, direccion_entrega, metodo_pago, total, estado, created_at)
VALUES 
  ('order001-0001-0001-0001-000000000001', 'ORD-000001', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Ana Esono', '+240 555 111 222', 'Barrio Ela Nguema, Casa 15', 'mobile_money', 1030000, 'entregado', now() - interval '5 days'),
  ('order001-0001-0001-0001-000000000002', 'ORD-000002', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Roberto Mba', '+240 555 222 333', 'Centro Comercial Bata', 'efectivo', 127000, 'enviado', now() - interval '2 days'),
  ('order001-0001-0001-0001-000000000003', 'ORD-000003', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'Carmen Nguema', '+240 555 333 444', 'Malabo II, Calle Principal', 'mobile_money', 42500, 'entregado', now() - interval '1 day'),
  ('order001-0001-0001-0001-000000000004', 'ORD-000004', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Miguel Nsue', '+240 555 444 555', 'Sipopo, Zona Residencial', 'tarjeta', 1920000, 'preparando', now() - interval '1 hour'),
  ('order001-0001-0001-0001-000000000005', 'ORD-000005', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Sofia Ela', '+240 555 555 666', 'Bata Centro, Edificio Azul', 'mobile_money', 93000, 'confirmado', now() - interval '3 hours');

-- Items de pedidos
INSERT INTO pedido_items (pedido_id, producto_id, nombre_producto, cantidad, precio_unitario, subtotal)
VALUES 
  -- Pedido 1: iPhone + AirPods
  ('order001-0001-0001-0001-000000000001', 'prod0001-0001-0001-0001-000000000001', 'iPhone 15 Pro', 1, 850000, 850000),
  ('order001-0001-0001-0001-000000000001', 'prod0001-0001-0001-0001-000000000005', 'AirPods Pro', 1, 180000, 180000),
  
  -- Pedido 2: Ropa variada
  ('order001-0001-0001-0001-000000000002', 'prod0002-0002-0002-0002-000000000001', 'Camisa Formal Blanca', 2, 35000, 70000),
  ('order001-0001-0001-0001-000000000002', 'prod0002-0002-0002-0002-000000000004', 'Blusa de Seda Elegante', 1, 55000, 55000),
  
  -- Pedido 3: Compra de supermercado
  ('order001-0001-0001-0001-000000000003', 'prod0003-0003-0003-0003-000000000001', 'Plátanos Frescos', 5, 1500, 7500),
  ('order001-0001-0001-0001-000000000003', 'prod0003-0003-0003-0003-000000000002', 'Arroz Premium 5kg', 2, 8500, 17000),
  ('order001-0001-0001-0001-000000000003', 'prod0003-0003-0003-0003-000000000006', 'Café Local', 1, 15000, 15000),
  ('order001-0001-0001-0001-000000000003', 'prod0003-0003-0003-0003-000000000007', 'Huevos Frescos (12 unidades)', 1, 4500, 4500),
  
  -- Pedido 4: MacBook + iPad
  ('order001-0001-0001-0001-000000000004', 'prod0001-0001-0001-0001-000000000003', 'MacBook Air M2', 1, 1200000, 1200000),
  ('order001-0001-0001-0001-000000000004', 'prod0001-0001-0001-0001-000000000007', 'Nintendo Switch', 1, 320000, 320000),
  ('order001-0001-0001-0001-000000000004', 'prod0001-0001-0001-0001-000000000002', 'Samsung Galaxy S24', 1, 720000, 720000),
  
  -- Pedido 5: Vestido + Zapatos
  ('order001-0001-0001-0001-000000000005', 'prod0002-0002-0002-0002-000000000002', 'Vestido Casual Floral', 1, 45000, 45000),
  ('order001-0001-0001-0001-000000000005', 'prod0002-0002-0002-0002-000000000003', 'Pantalón Chino Azul', 1, 28000, 28000),
  ('order001-0001-0001-0001-000000000005', 'prod0002-0002-0002-0002-000000000006', 'Polo Deportivo', 1, 22000, 22000);

-- Crear algunos productos pendientes de moderación
INSERT INTO productos (id, nombre, descripcion, precio, tienda_id, imagen_url, activo, disponible, stock, destacado)
VALUES 
  ('prodpend-0001-0001-0001-000000000001', 'Smartphone Genérico', 'Teléfono sin marca para revisión', 150000, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400', false, true, 5, false),
  ('prodpend-0002-0002-0002-000000000001', 'Ropa Imitación', 'Producto que requiere verificación de autenticidad', 25000, 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400', false, true, 10, false);
