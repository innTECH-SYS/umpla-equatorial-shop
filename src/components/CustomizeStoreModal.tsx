
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface CustomizeStoreModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface StoreData {
  nombre: string;
  descripcion: string;
  categoria: string;
  telefono: string;
  telefono_whatsapp: string;
  ubicacion: string;
  logo_url: string;
  banner_url: string;
}

const categories = [
  'Moda y Ropa',
  'Electrónicos',
  'Hogar y Jardín',
  'Deportes',
  'Salud y Belleza',
  'Comida y Bebidas',
  'Libros y Educación',
  'Arte y Manualidades',
  'Automóviles',
  'Servicios',
  'Otro'
];

const guineaEcuatorialCities = [
  'Malabo',
  'Bata', 
  'Ebebiyín',
  'Aconibe',
  'Añisoc',
  'Luba',
  'Evinayong',
  'Mongomo',
  'Mengomeyén',
  'Acurenam',
  'Cogo',
  'Mikomeseng',
  'Nsang',
  'Ayene',
  'Mbini',
  'Kogo',
  'Río Campo',
  'Corisco'
];

export const CustomizeStoreModal = ({ open, onOpenChange }: CustomizeStoreModalProps) => {
  const [loading, setLoading] = useState(false);
  const [storeData, setStoreData] = useState<StoreData>({
    nombre: '',
    descripcion: '',
    categoria: '',
    telefono: '',
    telefono_whatsapp: '',
    ubicacion: '',
    logo_url: '',
    banner_url: ''
  });
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (open && user) {
      loadStoreData();
    }
  }, [open, user]);

  const loadStoreData = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('tiendas')
        .select('*')
        .eq('usuario_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (data) {
        setStoreData({
          nombre: data.nombre || '',
          descripcion: data.descripcion || '',
          categoria: data.categoria || '',
          telefono: data.telefono || '',
          telefono_whatsapp: data.telefono_whatsapp || '',
          ubicacion: data.ubicacion || '',
          logo_url: data.logo_url || '',
          banner_url: data.banner_url || ''
        });
      }
    } catch (error) {
      console.error('Error loading store data:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('tiendas')
        .upsert({
          usuario_id: user.id,
          nombre: storeData.nombre,
          descripcion: storeData.descripcion,
          categoria: storeData.categoria,
          telefono: storeData.telefono,
          telefono_whatsapp: storeData.telefono_whatsapp,
          ubicacion: storeData.ubicacion,
          logo_url: storeData.logo_url || null,
          banner_url: storeData.banner_url || null
        }, {
          onConflict: 'usuario_id'
        });

      if (error) throw error;

      toast({
        title: "¡Tienda actualizada!",
        description: "La configuración de tu tienda se ha guardado correctamente."
      });

      onOpenChange(false);
    } catch (error) {
      console.error('Error updating store:', error);
      toast({
        title: "Error",
        description: "No se pudo actualizar la tienda. Inténtalo de nuevo.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Personalizar tienda</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[70vh] pr-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nombre">Nombre de la tienda</Label>
                <Input
                  id="nombre"
                  value={storeData.nombre}
                  onChange={(e) => setStoreData({...storeData, nombre: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="categoria">Categoría</Label>
                <Select value={storeData.categoria} onValueChange={(value) => setStoreData({...storeData, categoria: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="descripcion">Descripción de la tienda</Label>
              <Textarea
                id="descripcion"
                value={storeData.descripcion}
                onChange={(e) => setStoreData({...storeData, descripcion: e.target.value})}
                rows={3}
                placeholder="Describe tu tienda y los productos que vendes..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="telefono">Teléfono</Label>
                <Input
                  id="telefono"
                  value={storeData.telefono}
                  onChange={(e) => setStoreData({...storeData, telefono: e.target.value})}
                  placeholder="+240 XXX XXX XXX"
                />
              </div>
              <div>
                <Label htmlFor="telefono_whatsapp">WhatsApp</Label>
                <Input
                  id="telefono_whatsapp"
                  value={storeData.telefono_whatsapp}
                  onChange={(e) => setStoreData({...storeData, telefono_whatsapp: e.target.value})}
                  placeholder="+240 XXX XXX XXX"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="ubicacion">Ubicación</Label>
              <Select value={storeData.ubicacion} onValueChange={(value) => setStoreData({...storeData, ubicacion: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona tu ciudad" />
                </SelectTrigger>
                <SelectContent>
                  {guineaEcuatorialCities.map((city) => (
                    <SelectItem key={city} value={city}>{city}, Guinea Ecuatorial</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="logo_url">URL del logo</Label>
              <Input
                id="logo_url"
                value={storeData.logo_url}
                onChange={(e) => setStoreData({...storeData, logo_url: e.target.value})}
                placeholder="https://ejemplo.com/logo.png"
              />
              <p className="text-sm text-gray-500 mt-1">
                Recomendado: 200x200px, formato PNG o JPG
              </p>
            </div>

            <div>
              <Label htmlFor="banner_url">URL del banner</Label>
              <Input
                id="banner_url"
                value={storeData.banner_url}
                onChange={(e) => setStoreData({...storeData, banner_url: e.target.value})}
                placeholder="https://ejemplo.com/banner.jpg"
              />
              <p className="text-sm text-gray-500 mt-1">
                Recomendado: 1200x400px, formato JPG o PNG
              </p>
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? "Guardando..." : "Guardar cambios"}
              </Button>
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
