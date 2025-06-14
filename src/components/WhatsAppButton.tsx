
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WhatsAppButtonProps {
  phoneNumber: string;
  storeName: string;
  isFloating?: boolean;
}

export const WhatsAppButton = ({ phoneNumber, storeName, isFloating = false }: WhatsAppButtonProps) => {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(`Hola, quiero saber más sobre tu tienda ${storeName} en Umpla`);
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  if (isFloating) {
    return (
      <button
        onClick={handleWhatsAppClick}
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle size={24} />
      </button>
    );
  }

  return (
    <Button 
      onClick={handleWhatsAppClick}
      className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-2"
    >
      <MessageCircle size={18} />
      Contactar por WhatsApp
    </Button>
  );
};
