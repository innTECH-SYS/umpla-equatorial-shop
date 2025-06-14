
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Share2, Store, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';
import { ShareStoreModal } from '@/components/ShareStoreModal';
import { useCart } from '@/contexts/CartContext';

interface StoreData {
  id: string;
  nombre: string;
  descripcion?: string;
  categoria?: string;
  telefono?: string;
  ubicacion?: string;
  logo_url?: string;
  banner_url?: string;
  subdominio?: string;
}

interface PublicStoreHeaderProps {
  store: StoreData;
}

export const PublicStoreHeader = ({ store }: PublicStoreHeaderProps) => {
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const { openCart, getTotalItems } = useCart();

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo y nombre */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                {store.logo_url ? (
                  <img 
                    src={store.logo_url} 
                    alt={store.nombre}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Store className="h-5 w-5 text-gray-600" />
                )}
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">{store.nombre}</h1>
                {store.categoria && (
                  <Badge variant="secondary" className="text-xs">
                    {store.categoria}
                  </Badge>
                )}
              </div>
            </div>

            {/* Acciones */}
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShareModalOpen(true)}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Compartir
              </Button>
              
              <Button 
                size="sm"
                onClick={openCart}
                className="relative"
              >
                <span>Carrito</span>
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Banner */}
        {store.banner_url && (
          <div 
            className="h-48 bg-cover bg-center relative"
            style={{ backgroundImage: `url(${store.banner_url})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="absolute bottom-4 left-4 text-white">
              {store.descripcion && (
                <p className="text-lg max-w-2xl">{store.descripcion}</p>
              )}
            </div>
          </div>
        )}

        {/* Info adicional */}
        <div className="border-t border-gray-100 py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-6 text-sm text-gray-600">
              {store.ubicacion && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{store.ubicacion}</span>
                </div>
              )}
              {store.telefono && (
                <div className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  <span>{store.telefono}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <ShareStoreModal 
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        storeName={store.nombre}
      />
    </>
  );
};
