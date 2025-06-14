
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { 
  Home,
  Package,
  ShoppingCart,
  CreditCard,
  Palette,
  BarChart3,
  Settings,
  HelpCircle,
  Bell,
  User,
  Plus,
  TrendingUp,
  Eye,
  Menu,
  X
} from 'lucide-react';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { icon: <Home className="h-5 w-5" />, label: 'Dashboard', active: true },
    { icon: <Package className="h-5 w-5" />, label: 'Productos' },
    { icon: <ShoppingCart className="h-5 w-5" />, label: 'Pedidos' },
    { icon: <CreditCard className="h-5 w-5" />, label: 'Pagos' },
    { icon: <Palette className="h-5 w-5" />, label: 'Diseño de tienda' },
    { icon: <BarChart3 className="h-5 w-5" />, label: 'Estadísticas' },
    { icon: <Settings className="h-5 w-5" />, label: 'Configuración' },
  ];

  const stats = [
    { title: 'Ventas del mes', value: '₣ 1,245,000', change: '+12%', trend: 'up' },
    { title: 'Pedidos', value: '38', change: '+5%', trend: 'up' },
    { title: 'Productos', value: '24', change: '0%', trend: 'neutral' },
    { title: 'Visitantes', value: '1,847', change: '+18%', trend: 'up' },
  ];

  const recentOrders = [
    { id: '#001', customer: 'María González', amount: '₣ 45,000', status: 'Completado', date: 'Hoy' },
    { id: '#002', customer: 'Carlos Mendez', amount: '₣ 78,500', status: 'Procesando', date: 'Ayer' },
    { id: '#003', customer: 'Ana López', amount: '₣ 32,000', status: 'Enviado', date: '2 días' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">U</span>
            </div>
            <span className="text-xl font-bold text-secondary">Umpla</span>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <nav className="mt-6">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                item.active
                  ? 'text-primary bg-primary/10 border-r-2 border-primary'
                  : 'text-gray-600 hover:text-primary hover:bg-gray-50'
              }`}
            >
              {item.icon}
              <span className="ml-3">{item.label}</span>
            </a>
          ))}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <Card className="p-4 bg-primary/5 border-primary/20">
            <HelpCircle className="h-8 w-8 text-primary mb-2" />
            <p className="text-sm font-medium text-secondary mb-1">¿Necesitas ayuda?</p>
            <p className="text-xs text-gray-600 mb-3">Contacta con nuestro equipo</p>
            <Button size="sm" variant="outline" className="w-full text-xs">
              Soporte 24/7
            </Button>
          </Card>
        </div>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden mr-4"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-bold text-secondary">Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link to="/store-example">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Ver tienda
                </Button>
              </Link>
              <Button size="sm" className="bg-success hover:bg-success/90 text-black">
                <Plus className="h-4 w-4 mr-2" />
                Nuevo producto
              </Button>
              <Button variant="ghost" size="sm">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">
          {/* Welcome Card */}
          <Card className="p-6 mb-8 bg-gradient-to-r from-primary to-primary/80 text-white border-0">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">¡Bienvenido a tu tienda!</h2>
                <p className="text-blue-100 mb-4">
                  Tu tienda "Mi Negocio GQ" está online y lista para recibir pedidos
                </p>
                <Link to="/store-example">
                  <Button variant="secondary" className="bg-white text-primary hover:bg-gray-50">
                    Ver mi tienda
                    <Eye className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="hidden md:block">
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Package className="h-10 w-10 text-white" />
                </div>
              </div>
            </div>
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="p-6 bg-white border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-secondary mt-1">{stat.value}</p>
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${
                    stat.trend === 'up' ? 'text-success' : stat.trend === 'down' ? 'text-red-500' : 'text-gray-500'
                  }`}>
                    {stat.trend === 'up' && <TrendingUp className="h-4 w-4" />}
                    <span>{stat.change}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Recent Orders */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 bg-white border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-secondary">Pedidos recientes</h3>
                <Button variant="ghost" size="sm" className="text-primary">
                  Ver todos
                </Button>
              </div>
              <div className="space-y-4">
                {recentOrders.map((order, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="font-medium text-secondary">{order.customer}</p>
                      <p className="text-sm text-gray-600">{order.id} • {order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-secondary">{order.amount}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        order.status === 'Completado' ? 'bg-success/20 text-success' :
                        order.status === 'Procesando' ? 'bg-blue-100 text-blue-600' :
                        'bg-yellow-100 text-yellow-600'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-white border border-gray-100">
              <h3 className="text-lg font-semibold text-secondary mb-6">Acciones rápidas</h3>
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="h-4 w-4 mr-3" />
                  Agregar producto
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Palette className="h-4 w-4 mr-3" />
                  Personalizar tienda
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="h-4 w-4 mr-3" />
                  Ver estadísticas
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-3" />
                  Configurar pagos
                </Button>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
