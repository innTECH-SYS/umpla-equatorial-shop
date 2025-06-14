
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Users, Store, ShoppingBag, DollarSign, TrendingUp, AlertTriangle } from 'lucide-react';

export const AdminStats = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      // Obtener estadísticas de tiendas
      const { data: tiendas, error: tiendasError } = await supabase
        .from('tiendas')
        .select('id, activa, creado_el');

      if (tiendasError) throw tiendasError;

      // Obtener estadísticas de usuarios
      const { data: usuarios, error: usuariosError } = await supabase
        .from('usuarios')
        .select('id, creado_el');

      if (usuariosError) throw usuariosError;

      // Obtener estadísticas de pedidos
      const { data: pedidos, error: pedidosError } = await supabase
        .from('pedidos')
        .select('id, total, created_at, estado');

      if (pedidosError) throw pedidosError;

      // Obtener estadísticas de productos
      const { data: productos, error: productosError } = await supabase
        .from('productos')
        .select('id, activo');

      if (productosError) throw productosError;

      const totalTiendas = tiendas?.length || 0;
      const tiendasActivas = tiendas?.filter(t => t.activa)?.length || 0;
      const totalUsuarios = usuarios?.length || 0;
      const totalPedidos = pedidos?.length || 0;
      const totalProductos = productos?.filter(p => p.activo)?.length || 0;
      const ventasTotal = pedidos?.reduce((sum, p) => sum + (p.total || 0), 0) || 0;

      // Pedidos del último mes
      const unMesAtras = new Date();
      unMesAtras.setMonth(unMesAtras.getMonth() - 1);
      const pedidosUltimoMes = pedidos?.filter(p => 
        new Date(p.created_at) > unMesAtras
      )?.length || 0;

      return {
        totalTiendas,
        tiendasActivas,
        totalUsuarios,
        totalPedidos,
        totalProductos,
        ventasTotal,
        pedidosUltimoMes
      };
    }
  });

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="space-y-0 pb-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tiendas</CardTitle>
            <Store className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalTiendas}</div>
            <p className="text-xs text-muted-foreground">
              {stats?.tiendasActivas} activas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Usuarios</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalUsuarios}</div>
            <p className="text-xs text-muted-foreground">
              Usuarios registrados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pedidos Totales</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalPedidos}</div>
            <p className="text-xs text-muted-foreground">
              {stats?.pedidosUltimoMes} este mes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventas Totales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.ventasTotal?.toLocaleString()} XAF</div>
            <p className="text-xs text-muted-foreground">
              Ingresos acumulados
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Resumen de Actividad
            </CardTitle>
            <CardDescription>
              Estadísticas generales de la plataforma
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Productos activos:</span>
              <span className="font-medium">{stats?.totalProductos}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Tiendas activas:</span>
              <span className="font-medium">{stats?.tiendasActivas}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Promedio pedidos/tienda:</span>
              <span className="font-medium">
                {stats?.tiendasActivas ? Math.round((stats?.totalPedidos || 0) / stats.tiendasActivas) : 0}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Alertas del Sistema
            </CardTitle>
            <CardDescription>
              Notificaciones importantes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-sm text-gray-600">
                • Sistema funcionando correctamente
              </div>
              <div className="text-sm text-gray-600">
                • {stats?.tiendasActivas} tiendas activas
              </div>
              <div className="text-sm text-gray-600">
                • {stats?.pedidosUltimoMes} pedidos este mes
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
