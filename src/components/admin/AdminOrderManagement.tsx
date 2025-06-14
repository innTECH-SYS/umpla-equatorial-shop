
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ShoppingBag, Eye, Truck, Package, CheckCircle } from 'lucide-react';

export const AdminOrderManagement = () => {
  const { toast } = useToast();
  const [updatingOrder, setUpdatingOrder] = useState<string | null>(null);

  const { data: orders, isLoading, refetch } = useQuery({
    queryKey: ['admin-order-management'],
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
          ),
          pedido_items (
            id,
            nombre_producto,
            cantidad,
            precio_unitario
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    }
  });

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    setUpdatingOrder(orderId);
    try {
      const { error } = await supabase
        .from('pedidos')
        .update({ estado: newStatus })
        .eq('id', orderId);

      if (error) throw error;

      toast({
        title: "Estado actualizado",
        description: `El pedido ha sido marcado como ${getStatusLabel(newStatus)}`
      });

      refetch();
    } catch (error) {
      console.error('Error updating order status:', error);
      toast({
        title: "Error",
        description: "No se pudo actualizar el estado del pedido",
        variant: "destructive"
      });
    } finally {
      setUpdatingOrder(null);
    }
  };

  const getStatusBadge = (estado: string) => {
    switch (estado) {
      case 'pendiente':
        return <Badge variant="secondary">Pendiente</Badge>;
      case 'confirmado':
        return <Badge variant="default">Confirmado</Badge>;
      case 'preparando':
        return <Badge className="bg-blue-500">Preparando</Badge>;
      case 'enviado':
        return <Badge className="bg-purple-500">Enviado</Badge>;
      case 'entregado':
        return <Badge className="bg-green-500">Entregado</Badge>;
      case 'cancelado':
        return <Badge variant="destructive">Cancelado</Badge>;
      default:
        return <Badge variant="outline">{estado}</Badge>;
    }
  };

  const getStatusLabel = (estado: string) => {
    switch (estado) {
      case 'pendiente': return 'Pendiente';
      case 'confirmado': return 'Confirmado';
      case 'preparando': return 'Preparando';
      case 'enviado': return 'Enviado';
      case 'entregado': return 'Entregado';
      case 'cancelado': return 'Cancelado';
      default: return estado;
    }
  };

  const getStatusIcon = (estado: string) => {
    switch (estado) {
      case 'preparando': return <Package className="h-4 w-4" />;
      case 'enviado': return <Truck className="h-4 w-4" />;
      case 'entregado': return <CheckCircle className="h-4 w-4" />;
      default: return <ShoppingBag className="h-4 w-4" />;
    }
  };

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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5" />
          Gestión Centralizada de Pedidos
        </CardTitle>
        <CardDescription>
          Administra todos los pedidos de la plataforma desde un solo lugar
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pedido</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Tienda</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders?.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <div className="font-mono text-sm font-medium">
                    {order.numero_pedido}
                  </div>
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
                  <div className="text-sm">
                    {order.pedido_items?.length || 0} productos
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{order.total} {order.divisa}</div>
                </TableCell>
                <TableCell>
                  {getStatusBadge(order.estado)}
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    {new Date(order.created_at).toLocaleDateString()}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Select
                      value={order.estado}
                      onValueChange={(value) => updateOrderStatus(order.id, value)}
                      disabled={updatingOrder === order.id}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pendiente">
                          <div className="flex items-center gap-2">
                            <ShoppingBag className="h-4 w-4" />
                            Pendiente
                          </div>
                        </SelectItem>
                        <SelectItem value="confirmado">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4" />
                            Confirmado
                          </div>
                        </SelectItem>
                        <SelectItem value="preparando">
                          <div className="flex items-center gap-2">
                            <Package className="h-4 w-4" />
                            Preparando
                          </div>
                        </SelectItem>
                        <SelectItem value="enviado">
                          <div className="flex items-center gap-2">
                            <Truck className="h-4 w-4" />
                            Enviado
                          </div>
                        </SelectItem>
                        <SelectItem value="entregado">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4" />
                            Entregado
                          </div>
                        </SelectItem>
                        <SelectItem value="cancelado">
                          <div className="flex items-center gap-2">
                            <ShoppingBag className="h-4 w-4" />
                            Cancelado
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4" />
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
