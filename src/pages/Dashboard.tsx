
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { 
  Home,
  Package,
  ShoppingCart,
  CreditCard,
  Settings,
  HelpCircle,
  Plus,
  Menu,
  X,
  Store,
  Eye,
  TrendingUp,
  AlertCircle,
  Users
} from 'lucide-react';
import { AddProductModal } from '@/components/AddProductModal';
import { PaymentMethodsModal } from '@/components/PaymentMethodsModal';
import { CustomizeStoreModal } from '@/components/CustomizeStoreModal';
import { ReferralsModal } from '@/components/ReferralsModal';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [storeName] = useState("Mi Negocio GQ");
  const [hasPaymentMethod] = useState(false);
  
  // Estados para los modales
  const [addProductOpen, setAddProductOpen] = useState(false);
  const [paymentMethodsOpen, setPaymentMethodsOpen] = useState(false);
  const [customizeStoreOpen, setCustomizeStoreOpen] = useState(false);
  const [referralsOpen, setReferralsOpen] = useState(false);

  const menuItems = [
    { icon: <Home className="h-5 w-5" />, label: 'Inicio', active: true },
    { icon: <Package className="h-5 w-5" />, label: 'Mis productos' },
    { icon: <ShoppingCart className="h-5 w-5" />, label: 'Pedidos' },
    { icon: <CreditCard className="h-5 w-5" />, label: 'Métodos de pago', onClick: () => setPaymentMethodsOpen(true) },
    { icon: <Store className="h-5 w-5" />, label: 'Configuración de tienda', onClick: () => setCustomizeStoreOpen(true) },
    { icon: <Users className="h-5 w-5" />, label: 'Referidos', onClick: () => setReferralsOpen(true) },
    { icon: <HelpCircle className="h-5 w-5" />, label: 'Soporte' },
  ];

  const stats = [
    { 
      title: 'Productos publicados', 
      value: '0/10', 
      subtitle: 'Límite del plan gratuito',
      icon: <Package className="h-5 w-5 text-blue-600" />
    },
    { 
      title: 'Visitas a la tienda', 
      value: '0', 
      subtitle: 'Últimos 30 días',
      icon: <Eye className="h-5 w-5 text-green-600" />
    },
    { 
      title: 'Pedidos', 
      value: '0', 
      subtitle: 'Total de pedidos',
      icon: <ShoppingCart className="h-5 w-5 text-purple-600" />
    },
    { 
      title: 'Plan actual', 
      value: 'Gratuito', 
      subtitle: 'Actualizar para más funciones',
      icon: <TrendingUp className="h-5 w-5 text-orange-600" />,
      hasButton: true
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">U</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Umpla</span>
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
            <button
              key={index}
              onClick={item.onClick}
              className={`w-full flex items-center px-6 py-3 text-sm font-medium transition-colors text-left ${
                item.active
                  ? 'text-blue-600 bg-blue-50 border-r-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              {item.icon}
              <span className="ml-3">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <Card className="p-4 bg-blue-50 border-blue-200">
            <HelpCircle className="h-8 w-8 text-blue-600 mb-2" />
            <p className="text-sm font-medium text-gray-900 mb-1">¿Necesitas ayuda?</p>
            <p className="text-xs text-gray-600 mb-3">Contacta con nuestro equipo</p>
            <Button size="sm" variant="outline" className="w-full text-xs border-blue-200 text-blue-600 hover:bg-blue-100">
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
          <div className="flex items-center justify-between px-4 sm:px-6 py-4">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden mr-4"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">¡Hola, {storeName}!</h1>
                <p className="text-sm text-gray-600 mt-1">Aquí puedes gestionar tus productos, pedidos y configuración de tu tienda.</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link to="/store-example" className="hidden sm:block">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Ver tienda
                </Button>
              </Link>
              <Button 
                size="sm" 
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => setAddProductOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Añadir producto</span>
                <span className="sm:hidden">Añadir</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 sm:p-6">
          {/* Payment Method Reminder */}
          {!hasPaymentMethod && (
            <Card className="p-4 sm:p-6 mb-6 sm:mb-8 bg-amber-50 border-amber-200">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-amber-800 mb-2">
                    Aún no has configurado un método de pago. Hazlo aquí.
                  </p>
                  <Button 
                    size="sm" 
                    className="bg-amber-600 hover:bg-amber-700 text-white"
                    onClick={() => setPaymentMethodsOpen(true)}
                  >
                    Agregar método de pago
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="p-4 sm:p-6 bg-white border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {stat.icon}
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-lg sm:text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mb-3">{stat.subtitle}</p>
                {stat.hasButton && (
                  <Button size="sm" variant="outline" className="w-full text-xs border-blue-200 text-blue-600 hover:bg-blue-50">
                    Actualizar plan
                  </Button>
                )}
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-4 sm:p-6 bg-white border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Primeros pasos</h3>
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <Package className="h-5 w-5 text-blue-600 mr-3" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Añadir tu primer producto</p>
                    <p className="text-xs text-gray-600">Comienza subiendo productos a tu tienda</p>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setAddProductOpen(true)}
                  >
                    Añadir
                  </Button>
                </div>
                
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <CreditCard className="h-5 w-5 text-green-600 mr-3" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Configurar pagos</p>
                    <p className="text-xs text-gray-600">Acepta pagos de tus clientes</p>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setPaymentMethodsOpen(true)}
                  >
                    Configurar
                  </Button>
                </div>
                
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <Store className="h-5 w-5 text-purple-600 mr-3" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Personalizar tienda</p>
                    <p className="text-xs text-gray-600">Cambia colores, logo y diseño</p>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setCustomizeStoreOpen(true)}
                  >
                    Personalizar
                  </Button>
                </div>

                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <Users className="h-5 w-5 text-indigo-600 mr-3" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Programa de referidos</p>
                    <p className="text-xs text-gray-600">Invita amigos y gana productos extra</p>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setReferralsOpen(true)}
                  >
                    Ver referidos
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-4 sm:p-6 bg-white border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Plan Gratuito</h3>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">¿Qué incluye tu plan?</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Hasta 10 productos</li>
                    <li>• Subdominio .umpla.gq</li>
                    <li>• Carrito de compras</li>
                    <li>• Soporte básico</li>
                  </ul>
                </div>
                
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-600 mb-3">
                    ¿Necesitas más productos o un dominio personalizado?
                  </p>
                  <Link to="/pricing">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      Ver planes Premium
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>

      {/* Modales */}
      <AddProductModal 
        open={addProductOpen} 
        onOpenChange={setAddProductOpen} 
      />
      <PaymentMethodsModal 
        open={paymentMethodsOpen} 
        onOpenChange={setPaymentMethodsOpen} 
      />
      <CustomizeStoreModal 
        open={customizeStoreOpen} 
        onOpenChange={setCustomizeStoreOpen} 
      />
      <ReferralsModal 
        open={referralsOpen} 
        onOpenChange={setReferralsOpen} 
      />
    </div>
  );
};

export default Dashboard;
