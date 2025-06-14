
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, TrendingUp, TrendingDown, Package, DollarSign, Users, Clock } from 'lucide-react';
import { useState } from 'react';
import { useOrders } from '@/hooks/useOrders';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

export const SalesReports = () => {
  const { orders } = useOrders();
  const [period, setPeriod] = useState('7d');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'XAF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount).replace('XAF', 'XAF');
  };

  // Calcular estadísticas
  const completedOrders = orders.filter(order => order.estado === 'entregado');
  const pendingOrders = orders.filter(order => ['pendiente', 'confirmado', 'preparando'].includes(order.estado));
  const totalRevenue = completedOrders.reduce((sum, order) => sum + order.total, 0);
  const averageOrderValue = completedOrders.length > 0 ? totalRevenue / completedOrders.length : 0;

  // Datos para gráficos
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split('T')[0];
  }).reverse();

  const salesByDay = last7Days.map(date => {
    const dayOrders = completedOrders.filter(order => 
      order.created_at.startsWith(date)
    );
    const dayRevenue = dayOrders.reduce((sum, order) => sum + order.total, 0);
    
    return {
      date: new Date(date).toLocaleDateString('es-ES', { weekday: 'short' }),
      ingresos: dayRevenue,
      pedidos: dayOrders.length
    };
  });

  const ordersByStatus = [
    { name: 'Entregado', value: orders.filter(o => o.estado === 'entregado').length, color: '#10b981' },
    { name: 'Enviado', value: orders.filter(o => o.estado === 'enviado').length, color: '#f59e0b' },
    { name: 'Preparando', value: orders.filter(o => o.estado === 'preparando').length, color: '#8b5cf6' },
    { name: 'Confirmado', value: orders.filter(o => o.estado === 'confirmado').length, color: '#3b82f6' },
    { name: 'Pendiente', value: orders.filter(o => o.estado === 'pendiente').length, color: '#ef4444' },
  ];

  const paymentMethods = orders.reduce((acc, order) => {
    acc[order.metodo_pago] = (acc[order.metodo_pago] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const paymentMethodsData = Object.entries(paymentMethods).map(([method, count]) => ({
    metodo: method,
    cantidad: count
  }));

  const stats = [
    {
      title: 'Ingresos Totales',
      value: formatCurrency(totalRevenue),
      icon: <DollarSign className="h-5 w-5 text-green-600" />,
      trend: '+12%',
      trendUp: true
    },
    {
      title: 'Pedidos Completados',
      value: completedOrders.length.toString(),
      icon: <Package className="h-5 w-5 text-blue-600" />,
      trend: '+8%',
      trendUp: true
    },
    {
      title: 'Valor Promedio',
      value: formatCurrency(averageOrderValue),
      icon: <TrendingUp className="h-5 w-5 text-purple-600" />,
      trend: '+5%',
      trendUp: true
    },
    {
      title: 'Pedidos Pendientes',
      value: pendingOrders.length.toString(),
      icon: <Clock className="h-5 w-5 text-orange-600" />,
      trend: '-3%',
      trendUp: false
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Reportes de Ventas</h2>
        <div className="flex items-center gap-4">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Últimos 7 días</SelectItem>
              <SelectItem value="30d">Últimos 30 días</SelectItem>
              <SelectItem value="90d">Últimos 3 meses</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              {stat.icon}
            </div>
            <div className="flex items-center mt-4">
              {stat.trendUp ? (
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
              )}
              <span className={`text-sm font-medium ${stat.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                {stat.trend}
              </span>
              <span className="text-sm text-gray-500 ml-1">vs mes anterior</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Tendencia de Ventas</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesByDay}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'ingresos' ? formatCurrency(value as number) : value,
                  name === 'ingresos' ? 'Ingresos' : 'Pedidos'
                ]}
              />
              <Line type="monotone" dataKey="ingresos" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Orders by Status */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Pedidos por Estado</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={ordersByStatus}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {ordersByStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Payment Methods */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Métodos de Pago</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={paymentMethodsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="metodo" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="cantidad" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Top Performing Days */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Rendimiento Diario</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesByDay}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'pedidos' ? value : formatCurrency(value as number),
                  name === 'pedidos' ? 'Pedidos' : 'Ingresos'
                ]}
              />
              <Bar dataKey="pedidos" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
};
