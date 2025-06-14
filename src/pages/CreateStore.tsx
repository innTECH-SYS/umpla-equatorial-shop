
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const CreateStore = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [storeName, setStoreName] = useState("");
  const [category, setCategory] = useState("");
  const [subdomain, setSubdomain] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [isCheckingDomain, setIsCheckingDomain] = useState(false);
  const [domainAvailable, setDomainAvailable] = useState<boolean | null>(null);

  const categories = [
    "Moda",
    "Tecnología", 
    "Belleza",
    "Comida",
    "Servicios",
    "Otros"
  ];

  const checkDomainAvailability = async (domain: string) => {
    if (!domain) {
      setDomainAvailable(null);
      return;
    }
    
    setIsCheckingDomain(true);
    // Simular verificación de dominio
    setTimeout(() => {
      // Simular algunos dominios como no disponibles
      const unavailableDomains = ['tienda', 'shop', 'store', 'moda', 'tech'];
      const isAvailable = !unavailableDomains.includes(domain.toLowerCase());
      setDomainAvailable(isAvailable);
      setIsCheckingDomain(false);
    }, 1000);
  };

  const handleSubdomainChange = (value: string) => {
    setSubdomain(value);
    checkDomainAvailability(value);
  };

  const handleCreateStore = () => {
    if (!storeName || !category || !subdomain) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa todos los campos obligatorios.",
        variant: "destructive"
      });
      return;
    }

    if (domainAvailable === false) {
      toast({
        title: "Dominio no disponible",
        description: "Por favor elige otro subdominio.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "¡Tienda creada!",
      description: `Tu tienda ${storeName} se ha creado exitosamente.`,
    });
    
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-4 py-4 md:px-8 md:py-6">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center space-x-2" onClick={() => navigate('/')} role="button">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">U</span>
            </div>
            <span className="text-xl md:text-2xl font-bold text-secondary">Umpla</span>
          </div>
          <Button variant="ghost" onClick={() => navigate('/')}>
            Volver
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-8 md:px-8 md:py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
            <div className="text-center mb-6 md:mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-secondary mb-2">
                Crear mi tienda
              </h1>
              <p className="text-gray-600 text-sm md:text-base">
                Configura tu tienda online en pocos pasos
              </p>
            </div>

            <div className="space-y-6">
              {/* Nombre de la tienda */}
              <div className="space-y-2">
                <Label htmlFor="storeName" className="text-sm font-medium">
                  Nombre de la tienda *
                </Label>
                <Input
                  id="storeName"
                  type="text"
                  placeholder="Ej: Mi Tienda Fantástica"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Categoría */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Categoría *
                </Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Logo */}
              <div className="space-y-2">
                <Label htmlFor="logo" className="text-sm font-medium">
                  Logotipo (opcional)
                </Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 md:p-6 text-center">
                  <input
                    id="logo"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setLogo(e.target.files?.[0] || null)}
                    className="hidden"
                  />
                  <label htmlFor="logo" className="cursor-pointer">
                    {logo ? (
                      <div className="space-y-2">
                        <div className="text-sm text-gray-600">✓ {logo.name}</div>
                        <div className="text-xs text-gray-500">Haz clic para cambiar</div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="text-gray-400 text-2xl md:text-3xl">📷</div>
                        <div className="text-sm text-gray-600">
                          Sube tu logotipo
                        </div>
                        <div className="text-xs text-gray-500">
                          Imagen cuadrada recomendada (JPG, PNG)
                        </div>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Subdominio */}
              <div className="space-y-2">
                <Label htmlFor="subdomain" className="text-sm font-medium">
                  Subdominio *
                </Label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input
                    id="subdomain"
                    type="text"
                    placeholder="tutienda"
                    value={subdomain}
                    onChange={(e) => handleSubdomainChange(e.target.value)}
                    className="flex-1"
                  />
                  <div className="flex items-center px-3 py-2 bg-gray-100 rounded-md text-sm text-gray-600 whitespace-nowrap">
                    .umpla.gq
                  </div>
                </div>
                
                {subdomain && (
                  <div className="text-sm">
                    {isCheckingDomain ? (
                      <span className="text-gray-500">Verificando disponibilidad...</span>
                    ) : domainAvailable === true ? (
                      <span className="text-green-600">✓ {subdomain}.umpla.gq está disponible</span>
                    ) : domainAvailable === false ? (
                      <span className="text-red-600">✗ {subdomain}.umpla.gq no está disponible</span>
                    ) : null}
                  </div>
                )}
              </div>

              {/* Plan Gratuito Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="text-primary text-xl">ℹ️</div>
                  <div>
                    <h3 className="font-medium text-primary mb-1">Plan Gratuito</h3>
                    <p className="text-sm text-gray-700">
                      Con el plan gratuito puedes subir hasta <strong>10 productos</strong> y tener tu tienda en línea gratis con subdominio <strong>.umpla.gq</strong>
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                onClick={handleCreateStore}
                className="w-full"
                size="lg"
                disabled={!storeName || !category || !subdomain || domainAvailable === false}
              >
                Crear mi tienda
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateStore;
