
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Share2, Copy, MessageCircle, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { QRCodeSVG } from 'qrcode.react';
import { generateStoreUrl } from '@/lib/storeUtils';

interface ShareStoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  storeName: string;
}

export const ShareStoreModal = ({ isOpen, onClose, storeName }: ShareStoreModalProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const storeUrl = `${window.location.origin}${generateStoreUrl(storeName)}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(storeUrl);
      setCopied(true);
      toast({
        title: "¡Enlace copiado!",
        description: "El enlace de tu tienda se ha copiado al portapapeles.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo copiar el enlace.",
        variant: "destructive"
      });
    }
  };

  const handleShareWhatsApp = () => {
    const message = encodeURIComponent(`¡Visita mi tienda ${storeName} en Umpla! ${storeUrl}`);
    const whatsappUrl = `https://wa.me/?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Compartir tienda
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* QR Code */}
          <div className="flex justify-center">
            <div className="bg-white p-4 rounded-lg border">
              <QRCodeSVG 
                value={storeUrl} 
                size={200}
                level="M"
                includeMargin={true}
              />
            </div>
          </div>

          {/* URL */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Enlace de tu tienda
            </label>
            <div className="flex gap-2">
              <Input 
                value={storeUrl} 
                readOnly 
                className="flex-1"
              />
              <Button 
                onClick={handleCopyLink}
                variant="outline"
                size="sm"
                className="px-3"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Share buttons */}
          <div className="space-y-3">
            <Button 
              onClick={handleShareWhatsApp}
              className="w-full bg-green-500 hover:bg-green-600 text-white"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Compartir por WhatsApp
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
