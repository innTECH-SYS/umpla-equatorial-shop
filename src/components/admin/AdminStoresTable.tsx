
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { Store } from 'lucide-react';
import { AdminStoreActions } from './AdminStoreActions';

export const AdminStoresTable = () => {
  const { data: stores, isLoading, refetch } = useQuery({
    queryKey: ['admin-stores'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tiendas')
        .select(`
          *,
          usuarios (
            nombre,
            email
          ),
          productos (
            id
          )
        `)
        .order('creado_el', { ascending: false });

      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Gestión de Tiendas</CardTitle>
          <CardDescription>Cargando tiendas...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Store className="h-5 w-5" />
          Gestión de Tiendas
        </CardTitle>
        <CardDescription>
          Administra todas las tiendas registradas en la plataforma
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tienda</TableHead>
              <TableHead>Propietario</TableHead>
              <TableHead>Productos</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Fecha de Creación</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stores?.map((store) => (
              <TableRow key={store.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    {store.logo_url && (
                      <img 
                        src={store.logo_url} 
                        alt={store.nombre}
                        className="w-8 h-8 rounded-full"
                      />
                    )}
                    <div>
                      <div className="font-medium">{store.nombre}</div>
                      {store.subdominio && (
                        <div className="text-sm text-gray-500">{store.subdominio}.umpla.gq</div>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{store.usuarios?.nombre || 'Sin nombre'}</div>
                    <div className="text-sm text-gray-500">{store.usuarios?.email}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{store.productos?.length || 0} productos</span>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{store.categoria || 'Sin categoría'}</Badge>
                </TableCell>
                <TableCell>
                  {new Date(store.creado_el).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Badge variant={store.activa ? "default" : "destructive"}>
                    {store.activa ? "Activa" : "Inactiva"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <AdminStoreActions store={store} onUpdate={refetch} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
