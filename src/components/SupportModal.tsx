
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/useTranslation';
import { Mail, MessageCircle, Phone, Send } from 'lucide-react';

interface SupportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SupportModal = ({ open, onOpenChange }: SupportModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simular envío del formulario
    setTimeout(() => {
      toast({
        title: "Mensaje enviado",
        description: "Tu solicitud de soporte ha sido enviada. Te responderemos pronto."
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setLoading(false);
      onOpenChange(false);
    }, 1000);
  };

  const contactMethods = [
    {
      icon: <MessageCircle className="h-5 w-5" />,
      title: "Chat en vivo",
      description: "Respuesta inmediata",
      action: "Iniciar chat",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email",
      description: "soporte@umpla.com",
      action: "Enviar email",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: "WhatsApp",
      description: "+240 XXX XXX XXX",
      action: "Contactar",
      color: "bg-emerald-100 text-emerald-600"
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Centro de Soporte</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Métodos de contacto rápido */}
          <div>
            <h3 className="font-medium mb-3">Contacto directo</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {contactMethods.map((method, index) => (
                <Card key={index} className="p-4">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className={`p-2 rounded-lg ${method.color}`}>
                      {method.icon}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{method.title}</p>
                      <p className="text-xs text-gray-600">{method.description}</p>
                    </div>
                    <Button size="sm" variant="outline" className="w-full text-xs">
                      {method.action}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Formulario de soporte */}
          <div>
            <h3 className="font-medium mb-3">Enviar solicitud</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nombre</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="subject">Asunto</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="message">Mensaje</Label>
                <Textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                />
              </div>
              
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Enviando..." : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Enviar solicitud
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
