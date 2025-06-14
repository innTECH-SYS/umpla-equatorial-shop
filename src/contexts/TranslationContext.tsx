
import React, { createContext, useState, ReactNode } from 'react';

interface TranslationContextType {
  t: (key: string, params?: Record<string, any>) => any;
  language: string;
  setLanguage: (lang: string) => void;
  changeLanguage: (lang: string) => void;
  currentLanguage: string;
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
    'admin.settings': 'Configuración',
    'pricing.basic.name': 'Básico',
    'pricing.basic.price': 'Gratis',
    'pricing.basic.description': 'Perfecto para empezar',
    'pricing.basic.features': ['Hasta 10 productos', 'Tienda básica', 'Soporte por email'],
    'pricing.basic.button': 'Plan Actual',
    'pricing.professional.name': 'Profesional',
    'pricing.professional.price': '$29',
    'pricing.professional.period': '/mes',
    'pricing.professional.description': 'Para negocios en crecimiento',
    'pricing.professional.features': ['Productos ilimitados', 'Análisis avanzados', 'Soporte prioritario'],
    'pricing.professional.button': 'Actualizar Plan',
    'pricing.premium.name': 'Premium',
    'pricing.premium.price': '$99',
    'pricing.premium.period': '/mes',
    'pricing.premium.description': 'Para empresas establecidas',
    'pricing.premium.features': ['Todo lo de Profesional', 'API personalizada', 'Soporte 24/7'],
    'pricing.premium.button': 'Actualizar Plan',
    'pricing.title': 'Planes y Precios',
    'pricing.subtitle': 'Elige el plan perfecto para tu negocio',
    'pricing.current_plan': 'Plan Actual:',
    'pricing.most_popular': 'Más Popular',
    'pricing.current': 'Actual',
    'pricing.back': 'Volver',
    'pricing.contact': '¿Necesitas ayuda?',
    'pricing.contact_us': 'Contáctanos'
  },
  en: {
    'store.product_added': 'Product added',
    'store.product_added_desc': 'added to cart',
    'store.our_products': 'Our Products',
    'store.products_available': 'products available',
    'store.last_units': 'Last units',
    'store.out_of_stock': 'Out of stock',
    'store.add_to_cart': 'Add to cart',
    'common.loading': 'Loading...',
    'admin.welcome': 'Welcome',
    'admin.view_main_site': 'View main site',
    'admin.title': 'Administration Panel',
    'admin.subtitle': 'Manage the entire Umpla platform',
    'admin.dashboard': 'Dashboard',
    'admin.analytics': 'Analytics',
    'admin.stores': 'Stores',
    'admin.users': 'Users',
    'admin.orders': 'Orders',
    'admin.moderation': 'Moderation',
    'admin.settings': 'Settings',
    'pricing.basic.name': 'Basic',
    'pricing.basic.price': 'Free',
    'pricing.basic.description': 'Perfect to get started',
    'pricing.basic.features': ['Up to 10 products', 'Basic store', 'Email support'],
    'pricing.basic.button': 'Current Plan',
    'pricing.professional.name': 'Professional',
    'pricing.professional.price': '$29',
    'pricing.professional.period': '/month',
    'pricing.professional.description': 'For growing businesses',
    'pricing.professional.features': ['Unlimited products', 'Advanced analytics', 'Priority support'],
    'pricing.professional.button': 'Upgrade Plan',
    'pricing.premium.name': 'Premium',
    'pricing.premium.price': '$99',
    'pricing.premium.period': '/month',
    'pricing.premium.description': 'For established companies',
    'pricing.premium.features': ['Everything in Professional', 'Custom API', '24/7 support'],
    'pricing.premium.button': 'Upgrade Plan',
    'pricing.title': 'Plans and Pricing',
    'pricing.subtitle': 'Choose the perfect plan for your business',
    'pricing.current_plan': 'Current Plan:',
    'pricing.most_popular': 'Most Popular',
    'pricing.current': 'Current',
    'pricing.back': 'Back',
    'pricing.contact': 'Need help?',
    'pricing.contact_us': 'Contact us'
  }
};

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState('es');

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
  };

  const t = (key: string, params?: Record<string, any>) => {
    let translation = translations[language as keyof typeof translations]?.[key as keyof typeof translations.es] || key;
    
    // Handle array return for features - return as is
    if (Array.isArray(translation)) {
      return translation;
    }
    
    // Handle string interpolation only for strings
    if (typeof translation === 'string' && params) {
      Object.entries(params).forEach(([paramKey, value]) => {
        translation = (translation as string).replace(`{{${paramKey}}}`, value);
        // También manejar interpolación directa para compatibilidad
        if (paramKey === 'productName') {
          translation = `${value} ${translation}`;
        }
        if (paramKey === 'count') {
          translation = (translation as string).replace(/\d+/, value.toString());
        }
      });
    }
    
    return translation;
  };

  return (
    <TranslationContext.Provider value={{ 
      t, 
      language, 
      setLanguage,
      changeLanguage,
      currentLanguage: language
    }}>
      {children}
    </TranslationContext.Provider>
  );
};
