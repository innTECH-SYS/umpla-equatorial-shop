
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { ShoppingBag } from 'lucide-react';

export const AdminOrdersTable = () => {
  const { data: orders, isLoading } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pedidos')
        .select(`
          *,
          tiendas (
            nombre,
            usuarios (
              nombre,
              email
            )
          )
        `)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Gestión de Pedidos</CardTitle>
          <CardDescription>Cargando pedidos...</CardDescription>
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

  const getStatusBadge = (estado: string) => {
    switch (estado) {
      case 'pendiente':
        return <Badge variant="secondary">Pendiente</Badge>;
      case 'confirmado':
        return <Badge variant="default">Confirmado</Badge>;
      case 'en_proceso':
        return <Badge variant="secondary">En Proceso</Badge>;
      case 'enviado':
        return <Badge>Enviado</Badge>;
      case 'entregado':
        return <Badge variant="default">Entregado</Badge>;
      case 'cancelado':
        return <Badge variant="destructive">Cancelado</Badge>;
      default:
        return <Badge variant="outline">{estado}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5" />
          Gestión de Pedidos
        </CardTitle>
        <CardDescription>
          Vista global de todos los pedidos en la plataforma (últimos 50)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Número</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Tienda</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Método de Pago</TableHead>
              <TableHead>Fecha</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders?.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <div className="font-mono text-sm">{order.numero_pedido}</div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{order.nombre_cliente}</div>
                    <div className="text-sm text-gray-500">{order.telefono_cliente}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{order.tiendas?.nombre}</div>
                    <div className="text-sm text-gray-500">
                      {order.tiendas?.usuarios?.nombre}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{order.total} {order.divisa}</div>
                </TableCell>
                <TableCell>
                  {getStatusBadge(order.estado)}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{order.metodo_pago}</Badge>
                </TableCell>
                <TableCell>
                  {new Date(order.created_at).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
