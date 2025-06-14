
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { TrendingUp, Users, Store, ShoppingBag } from 'lucide-react';

export const AdminAnalytics = () => {
  const { data: analyticsData, isLoading } = useQuery({
    queryKey: ['admin-analytics'],
    queryFn: async () => {
      // Obtener datos de los últimos 30 días
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      // Tiendas por día
      const { data: storesByDay } = await supabase
        .from('tiendas')
        .select('creado_el')
        .gte('creado_el', thirtyDaysAgo.toISOString());

      // Usuarios por día
      const { data: usersByDay } = await supabase
        .from('usuarios')
        .select('creado_el')
        .gte('creado_el', thirtyDaysAgo.toISOString());

      // Pedidos por día
      const { data: ordersByDay } = await supabase
        .from('pedidos')
        .select('created_at, total')
        .gte('created_at', thirtyDaysAgo.toISOString());

      // Ventas por categoría
      const { data: storesByCategory } = await supabase
        .from('tiendas')
        .select('categoria');

      // Procesar datos para gráficos
      const dailyData = [];
      for (let i = 29; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        
        const storesCount = storesByDay?.filter(s => 
          s.creado_el?.startsWith(dateStr)
        ).length || 0;
        
        const usersCount = usersByDay?.filter(u => 
          u.creado_el?.startsWith(dateStr)
        ).length || 0;
        
        const ordersCount = ordersByDay?.filter(o => 
          o.created_at?.startsWith(dateStr)
        ).length || 0;
        
        const revenue = ordersByDay?.filter(o => 
          o.created_at?.startsWith(dateStr)
        ).reduce((sum, order) => sum + (order.total || 0), 0) || 0;

        dailyData.push({
          date: date.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' }),
          tiendas: storesCount,
          usuarios: usersCount,
          pedidos: ordersCount,
          ventas: revenue
        });
      }

      // Categorías más populares
      const categoryCounts = storesByCategory?.reduce((acc: any, store) => {
        const category = store.categoria || 'Sin categoría';
        acc[category] = (acc[category] || 0) + 1;
        return acc;
      }, {});

      const categoryData = Object.entries(categoryCounts || {}).map(([name, value]) => ({
        name,
        value
      }));

      return {
        dailyData,
        categoryData
      };
    }
  });

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="h-80">
            <CardContent className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Crecimiento de Tiendas
            </CardTitle>
            <CardDescription>Nuevas tiendas en los últimos 30 días</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={analyticsData?.dailyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="tiendas" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Nuevos Usuarios
            </CardTitle>
            <CardDescription>Registros de usuarios diarios</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={analyticsData?.dailyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="usuarios" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Actividad de Pedidos
            </CardTitle>
            <CardDescription>Pedidos procesados diariamente</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={analyticsData?.dailyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="pedidos" stroke="#ff7300" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Store className="h-5 w-5" />
              Categorías Populares
            </CardTitle>
            <CardDescription>Distribución por categorías de tienda</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={analyticsData?.categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {analyticsData?.categoryData?.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
