
-- Verificar si existen registros duplicados antes de añadir la restricción
-- (Esta consulta es solo informativa, no modifica datos)
SELECT usuario_id, COUNT(*) as cantidad_tiendas 
FROM tiendas 
WHERE usuario_id IS NOT NULL 
GROUP BY usuario_id 
HAVING COUNT(*) > 1;

-- Añadir restricción única a la columna usuario_id en la tabla tiendas
-- Esto permitirá que el upsert funcione correctamente
ALTER TABLE tiendas 
ADD CONSTRAINT tiendas_usuario_id_unique UNIQUE (usuario_id);
