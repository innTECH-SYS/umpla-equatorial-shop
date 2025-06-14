
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Menu, Plus, Eye } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { ImprovedLanguageSelector } from '@/components/ImprovedLanguageSelector';

interface HeaderProps {
  storeName: string;
  setSidebarOpen: (open: boolean) => void;
  onAddProductClick: () => void;
}

export const Header = ({ storeName, setSidebarOpen, onAddProductClick }: HeaderProps) => {
  const { t } = useTranslation();

  return (
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
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              {t('dashboard.hello', { storeName })}
            </h1>
            <p className="text-sm text-gray-600 mt-1">{t('dashboard.subtitle')}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Selector de idioma visible en desktop */}
          <div className="hidden lg:block">
            <ImprovedLanguageSelector variant="compact" />
          </div>
          
          <Link to="/store-example" className="hidden sm:block">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Ver tienda
            </Button>
          </Link>
          <Button 
            size="sm" 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={onAddProductClick}
          >
            <Plus className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">{t('dashboard.add_product')}</span>
            <span className="sm:hidden">Añadir</span>
          </Button>
        </div>
      </div>
    </header>
  );
};
