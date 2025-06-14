
import { useContext } from 'react';
import { TranslationContext } from '@/contexts/TranslationContext';

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    // Fallback when translation context is not available
    return {
      t: (key: string, params?: Record<string, any>) => {
        // Simple fallback translations for key parts
        const fallbackTranslations: Record<string, any> = {
          'store.product_added': 'Producto agregado',
          'store.product_added_desc': `${params?.productName || 'Producto'} se agregó al carrito`,
          'store.our_products': 'Nuestros Productos',
          'store.products_available': `${params?.count || 0} productos disponibles`,
          'store.last_units': `Últimas ${params?.count || 0} unidades`,
          'store.out_of_stock': 'Sin stock',
          'store.add_to_cart': 'Agregar al carrito',
          'common.loading': 'Cargando...',
          'pricing.basic.features': ['Hasta 10 productos', 'Tienda básica', 'Soporte por email'],
          'pricing.professional.features': ['Productos ilimitados', 'Análisis avanzados', 'Soporte prioritario'],
          'pricing.premium.features': ['Todo lo de Profesional', 'API personalizada', 'Soporte 24/7']
        };
        return fallbackTranslations[key] || key;
      },
      language: 'es',
      setLanguage: () => {},
      changeLanguage: () => {},
      currentLanguage: 'es'
    };
  }
  return context;
};
