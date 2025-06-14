
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Shield, Upload, CheckCircle, Clock, AlertCircle, Star } from 'lucide-react';
import { useUserPlan } from '@/hooks/useUserPlan';

interface KYCModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const KYCModal = ({ open, onOpenChange }: KYCModalProps) => {
  const { isPaidPlan } = useUserPlan();
  const [formData, setFormData] = useState({
    fullName: '',
    idNumber: '',
    phone: '',
    address: '',
    businessType: '',
    businessDescription: ''
  });
  const [documents, setDocuments] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [kycStatus] = useState<'none' | 'pending' | 'verified' | 'rejected'>('none');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulación de envío
    setTimeout(() => {
      setSubmitting(false);
      onOpenChange(false);
      // Aquí se enviarían los datos a Supabase
    }, 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setDocuments(Array.from(e.target.files));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            Verificación KYC
          </DialogTitle>
          <DialogDescription>
            Verifica tu identidad para obtener el badge de cuenta verificada y mayor confianza de tus clientes.
          </DialogDescription>
        </DialogHeader>

        {kycStatus !== 'none' && (
          <div className="mb-6">
            {kycStatus === 'pending' && (
              <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <Clock className="h-4 w-4 text-amber-600" />
                <span className="text-amber-800 text-sm">Tu solicitud está siendo revisada</span>
                <Badge variant="secondary" className="bg-amber-100 text-amber-800">Pendiente</Badge>
              </div>
            )}
            {kycStatus === 'verified' && (
              <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-green-800 text-sm">Tu cuenta ha sido verificada</span>
                <Badge className="bg-green-500 text-white">Verificado</Badge>
              </div>
            )}
            {kycStatus === 'rejected' && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <span className="text-red-800 text-sm">Tu solicitud fue rechazada. Por favor, contacta soporte.</span>
                <Badge variant="destructive">Rechazado</Badge>
              </div>
            )}
          </div>
        )}

        {/* Beneficios del KYC */}
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-3 flex items-center gap-2">
            <Star className="h-4 w-4" />
            Beneficios de la verificación KYC
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-blue-800">
            <div className="space-y-2">
              <div>• Badge de cuenta verificada</div>
              <div>• Mayor confianza de los clientes</div>
              <div>• Acceso a pagos con tarjeta</div>
            </div>
            <div className="space-y-2">
              <div>• Soporte prioritario</div>
              <div>• Límites de pago más altos</div>
              {isPaidPlan && <div>• Funciones premium exclusivas</div>}
            </div>
          </div>
          {!isPaidPlan && (
            <div className="mt-3 p-2 bg-blue-100 rounded border-l-4 border-blue-500">
              <p className="text-xs text-blue-700">
                💡 Con un plan de pago obtienes beneficios adicionales como funciones premium y límites más altos.
              </p>
            </div>
          )}
        </div>

        {kycStatus === 'none' && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Nombre completo *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="idNumber">Número de cédula *</Label>
                <Input
                  id="idNumber"
                  value={formData.idNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, idNumber: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Dirección *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessType">Tipo de negocio *</Label>
              <Input
                id="businessType"
                value={formData.businessType}
                onChange={(e) => setFormData(prev => ({ ...prev, businessType: e.target.value }))}
                placeholder="Ej: Tienda de ropa, Restaurante, etc."
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessDescription">Descripción del negocio</Label>
              <Textarea
                id="businessDescription"
                value={formData.businessDescription}
                onChange={(e) => setFormData(prev => ({ ...prev, businessDescription: e.target.value }))}
                placeholder="Describe brevemente tu negocio y actividades principales"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="documents">Documentos *</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">
                  Subir cédula de identidad (frente y reverso)
                </p>
                <Input
                  id="documents"
                  type="file"
                  multiple
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  required
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('documents')?.click()}
                >
                  Seleccionar archivos
                </Button>
                {documents.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500">
                      {documents.length} archivo(s) seleccionado(s)
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
                Cancelar
              </Button>
              <Button type="submit" disabled={submitting} className="flex-1">
                {submitting ? 'Enviando...' : 'Enviar solicitud'}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
