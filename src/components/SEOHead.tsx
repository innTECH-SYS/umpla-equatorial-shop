
import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  image?: string;
  url: string;
}

export const SEOHead = ({ title, description, image, url }: SEOHeadProps) => {
  useEffect(() => {
    // Actualizar título
    document.title = title;

    // Crear o actualizar meta tags
    const updateMetaTag = (name: string, content: string, property?: string) => {
      let meta = property 
        ? document.querySelector(`meta[property="${property}"]`) 
        : document.querySelector(`meta[name="${name}"]`);
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', property);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Meta tags básicos
    updateMetaTag('description', description);
    
    // OpenGraph
    updateMetaTag('', title, 'og:title');
    updateMetaTag('', description, 'og:description');
    updateMetaTag('', url, 'og:url');
    updateMetaTag('', 'website', 'og:type');
    if (image) {
      updateMetaTag('', image, 'og:image');
    }

    // Twitter Card
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    if (image) {
      updateMetaTag('twitter:image', image);
    }

  }, [title, description, image, url]);

  return null;
};
