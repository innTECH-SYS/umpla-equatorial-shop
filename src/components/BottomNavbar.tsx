
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';
import { 
  Home, 
  Store, 
  Search, 
  User, 
  ShoppingCart,
  MessageCircle
} from 'lucide-react';

export const BottomNavbar = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const navItems = [
    {
      icon: Home,
      label: t('nav.home'),
      path: '/',
      key: 'home'
    },
    {
      icon: Store,
      label: t('nav.stores'),
      path: '/stores',
      key: 'stores'
    },
    {
      icon: Search,
      label: 'Buscar',
      path: '/search',
      key: 'search'
    },
    {
      icon: ShoppingCart,
      label: 'Carrito',
      path: '/cart',
      key: 'cart'
    },
    {
      icon: User,
      label: 'Perfil',
      path: '/auth',
      key: 'profile'
    }
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Spacer for mobile */}
      <div className="h-20 lg:hidden" />
      
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 lg:hidden">
        <div className="grid grid-cols-5 h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <Link
                key={item.key}
                to={item.path}
                className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                  active 
                    ? 'text-primary bg-blue-50' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className={`h-5 w-5 ${active ? 'text-primary' : ''}`} />
                <span className={`text-xs font-medium ${active ? 'text-primary' : ''}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Desktop Footer */}
      <footer className="hidden lg:block bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">U</span>
                </div>
                <span className="text-xl font-bold">Umpla</span>
              </div>
              <p className="text-gray-400 mb-4">
                La plataforma de comercio electrónico líder en Guinea Ecuatorial. 
                Conectamos compradores y vendedores locales.
              </p>
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-primary" />
                <span className="text-sm">Soporte 24/7 disponible</span>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Enlaces</h3>
              <div className="space-y-2">
                <Link to="/" className="block text-gray-400 hover:text-white transition-colors">
                  {t('nav.home')}
                </Link>
                <Link to="/stores" className="block text-gray-400 hover:text-white transition-colors">
                  {t('nav.stores')}
                </Link>
                <Link to="/auth" className="block text-gray-400 hover:text-white transition-colors">
                  Crear cuenta
                </Link>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Soporte</h3>
              <div className="space-y-2">
                <p className="text-gray-400">
                  <span className="block">Email: soporte@umpla.gq</span>
                  <span className="block">Tel: +240 333 123 456</span>
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Umpla. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};
