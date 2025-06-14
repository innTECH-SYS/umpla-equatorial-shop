
import React, { createContext, useState, ReactNode } from 'react';

interface TranslationContextType {
  t: (key: string, params?: Record<string, any>) => string;
  language: string;
  setLanguage: (lang: string) => void;
}

export const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

const translations = {
  es: {
    'store.product_added': 'Producto agregado',
    'store.product_added_desc': 'se agregó al carrito',
    'store.our_products': 'Nuestros Productos',
    'store.products_available': 'productos disponibles',
    'store.last_units': 'Últimas unidades',
    'store.out_of_stock': 'Sin stock',
    'store.add_to_cart': 'Agregar al carrito',
    'common.loading': 'Cargando...',
    'admin.welcome': 'Bienvenido',
    'admin.view_main_site': 'Ver sitio principal',
    'admin.title': 'Panel de Administración',
    'admin.subtitle': 'Gestiona toda la plataforma Umpla',
    'admin.dashboard': 'Dashboard',
    'admin.analytics': 'Análisis',
    'admin.stores': 'Tiendas',
    'admin.users': 'Usuarios',
    'admin.orders': 'Pedidos',
    'admin.moderation': 'Moderación',
    'admin.settings': 'Configuración'
  }
};

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState('es');

  const t = (key: string, params?: Record<string, any>) => {
    let translation = translations[language as keyof typeof translations]?.[key as keyof typeof translations.es] || key;
    
    if (params) {
      Object.entries(params).forEach(([paramKey, value]) => {
        translation = translation.replace(`{{${paramKey}}}`, value);
        // También manejar interpolación directa para compatibilidad
        if (paramKey === 'productName') {
          translation = `${value} ${translation}`;
        }
        if (paramKey === 'count') {
          translation = translation.replace(/\d+/, value.toString());
        }
      });
    }
    
    return translation;
  };

  return (
    <TranslationContext.Provider value={{ t, language, setLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
};
