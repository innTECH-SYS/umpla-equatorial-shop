
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { Eye, Ban, CheckCircle, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const AdminStoresTable = () => {
  const { toast } = useToast();

  const { data: stores, isLoading, refetch } = useQuery({
    queryKey: ['admin-stores'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tiendas')
        .select(`
          *,
          usuarios!inner (
            nombre,
            email
          )
        `)
        .order('creado_el', { ascending: false });

      if (error) throw error;
      return data;
    }
  });

  const toggleStoreStatus = async (storeId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('tiendas')
        .update({ activa: !currentStatus })
        .eq('id', storeId);

      if (error) throw error;

      toast({
        title: "Estado actualizado",
        description: `La tienda ha sido ${!currentStatus ? 'activada' : 'suspendida'} correctamente`,
      });

      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo actualizar el estado de la tienda",
        variant: "destructive",
      });
    }
  };

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
        <CardTitle>Gestión de Tiendas</CardTitle>
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
              <TableHead>Estado</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Fecha de Registro</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stores?.map((store) => (
              <TableRow key={store.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{store.nombre}</div>
                    {store.subdominio && (
                      <div className="text-sm text-gray-500">
                        {store.subdominio}.umpla.gq
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{store.usuarios?.nombre}</div>
                    <div className="text-sm text-gray-500">{store.usuarios?.email}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={store.activa ? "success" : "destructive"}>
                    {store.activa ? "Activa" : "Suspendida"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {store.categoria || "Sin categoría"}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(store.creado_el).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {store.subdominio && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => window.open(`/store/${store.subdominio}`, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant={store.activa ? "destructive" : "default"}
                      onClick={() => toggleStoreStatus(store.id, store.activa)}
                    >
                      {store.activa ? (
                        <Ban className="h-4 w-4" />
                      ) : (
                        <CheckCircle className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
