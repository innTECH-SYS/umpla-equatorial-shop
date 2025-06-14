
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Share, Copy, Users, Gift, Check } from 'lucide-react';

interface ReferralsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Referral {
  id: string;
  referido_id: string;
  valido: boolean;
  activado_el: string | null;
  created_at: string;
  usuarios: {
    nombre: string;
    email: string;
  };
}

export const ReferralsModal = ({ open, onOpenChange }: ReferralsModalProps) => {
  const [loading, setLoading] = useState(false);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [referralCode, setReferralCode] = useState('');
  const [copied, setCopied] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (open && user) {
      loadReferralData();
    }
  }, [open, user]);

  const loadReferralData = async () => {
    if (!user) return;

    try {
      // Cargar código de referido del usuario
      const { data: userData, error: userError } = await supabase
        .from('usuarios')
        .select('codigo_referido')
        .eq('id', user.id)
        .single();

      if (userError) throw userError;

      let code = userData?.codigo_referido;
      if (!code) {
        // Generar código de referido si no existe
        code = generateReferralCode();
        await supabase
          .from('usuarios')
          .update({ codigo_referido: code })
          .eq('id', user.id);
      }
      setReferralCode(code);

      // Cargar referidos
      const { data: referralsData, error: referralsError } = await supabase
        .from('referidos')
        .select(`
          id,
          referido_id,
          valido,
          activado_el,
          created_at,
          usuarios:referido_id (
            nombre,
            email
          )
        `)
        .eq('referente_id', user.id)
        .order('created_at', { ascending: false });

      if (referralsError) throw referralsError;
      setReferrals(referralsData || []);
    } catch (error) {
      console.error('Error loading referral data:', error);
    }
  };

  const generateReferralCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const copyReferralLink = async () => {
    const referralLink = `${window.location.origin}/auth?ref=${referralCode}`;
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      toast({
        title: "¡Enlace copiado!",
        description: "El enlace de referido se ha copiado al portapapeles."
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

  const shareReferralLink = async () => {
    const referralLink = `${window.location.origin}/auth?ref=${referralCode}`;
    const shareText = `¡Únete a Umpla con mi código de referido y obtén beneficios especiales! ${referralLink}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Únete a Umpla',
          text: shareText,
          url: referralLink
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback para dispositivos que no soportan Web Share API
      copyReferralLink();
    }
  };

  const validReferrals = referrals.filter(r => r.valido);
  const pendingReferrals = referrals.filter(r => !r.valido);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Programa de referidos
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Código de referido */}
          <Card className="p-4 bg-blue-50 border-blue-200">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2 text-blue-600">
                <Gift className="h-5 w-5" />
                <span className="font-medium">Tu código de referido</span>
              </div>
              
              <div className="bg-white p-3 rounded-lg border">
                <code className="text-lg font-mono font-bold text-blue-600">{referralCode}</code>
              </div>

              <div className="flex gap-2">
                <Button onClick={copyReferralLink} variant="outline" className="flex-1">
                  {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                  {copied ? "¡Copiado!" : "Copiar enlace"}
                </Button>
                <Button onClick={shareReferralLink} className="flex-1">
                  <Share className="h-4 w-4 mr-2" />
                  Compartir
                </Button>
              </div>
            </div>
          </Card>

          {/* Estadísticas */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{referrals.length}</div>
              <div className="text-sm text-gray-600">Total referidos</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{validReferrals.length}</div>
              <div className="text-sm text-gray-600">Activos</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{pendingReferrals.length}</div>
              <div className="text-sm text-gray-600">Pendientes</div>
            </Card>
          </div>

          {/* Beneficios */}
          <Card className="p-4">
            <h3 className="font-medium mb-3">Beneficios del programa</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Gift className="h-4 w-4 text-green-600" />
                <span>Por cada referido activo: +5 productos extra en tu tienda</span>
              </div>
              <div className="flex items-center gap-2">
                <Gift className="h-4 w-4 text-green-600" />
                <span>Tu referido obtiene un descuento especial al registrarse</span>
              </div>
            </div>
          </Card>

          {/* Lista de referidos */}
          <div>
            <h3 className="font-medium mb-3">Tus referidos</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {referrals.length === 0 ? (
                <p className="text-gray-500 text-sm text-center py-4">
                  Aún no tienes referidos. ¡Comparte tu código para empezar!
                </p>
              ) : (
                referrals.map((referral) => (
                  <Card key={referral.id} className="p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{referral.usuarios?.nombre || 'Usuario'}</p>
                        <p className="text-sm text-gray-600">{referral.usuarios?.email}</p>
                        <p className="text-xs text-gray-500">
                          Registrado: {new Date(referral.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          referral.valido 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-orange-100 text-orange-800'
                        }`}>
                          {referral.valido ? 'Activo' : 'Pendiente'}
                        </span>
                        {referral.activado_el && (
                          <p className="text-xs text-gray-500 mt-1">
                            Activado: {new Date(referral.activado_el).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
