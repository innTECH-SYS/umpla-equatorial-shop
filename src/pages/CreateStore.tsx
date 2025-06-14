
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Check, Crown, Star } from "lucide-react";

interface Plan {
  id: string;
  nombre: string;
  precio: number;
  limite_productos: number;
  permite_dominio: boolean;
  descripcion: string;
}

const CreateStore = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [storeName, setStoreName] = useState("");
  const [category, setCategory] = useState("");
  const [subdomain, setSubdomain] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [isCheckingDomain, setIsCheckingDomain] = useState(false);
  const [domainAvailable, setDomainAvailable] = useState<boolean | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [showPlanModal, setShowPlanModal] = useState(false);

  const categories = [
    "Moda",
    "Tecnología", 
    "Belleza",
    "Comida",
    "Servicios",
    "Otros"
  ];

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    const { data: plansData, error } = await supabase
      .from('planes')
      .select('*')
      .order('precio', { ascending: true });

    if (error) {
      console.error('Error fetching plans:', error);
      return;
    }

    setPlans(plansData || []);
    // Seleccionar plan gratuito por defecto
    const freePlan = plansData?.find(plan => plan.precio === 0);
    if (freePlan) {
      setSelectedPlan(freePlan);
    }
  };

  const checkDomainAvailability = async (domain: string) => {
    if (!domain) {
      setDomainAvailable(null);
      return;
    }
    
    setIsCheckingDomain(true);
    
    try {
      const { data, error } = await supabase
        .from('tiendas')
        .select('subdominio')
        .eq('subdominio', domain.toLowerCase())
        .single();

      if (error && error.code === 'PGRST116') {
        // No se encontró, está disponible
        setDomainAvailable(true);
      } else {
        // Se encontró, no está disponible
        setDomainAvailable(false);
      }
    } catch (error) {
      console.error('Error checking domain:', error);
      setDomainAvailable(false);
    }
    
    setIsCheckingDomain(false);
  };

  const handleSubdomainChange = (value: string) => {
    setSubdomain(value);
    checkDomainAvailability(value);
  };

  const handleCreateStore = async () => {
    if (!storeName || !category || !subdomain || !selectedPlan) {
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

    setIsCreating(true);

    try {
      // Verificar autenticación
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Error de autenticación",
          description: "Debes iniciar sesión para crear una tienda.",
          variant: "destructive"
        });
        navigate('/auth');
        return;
      }

      // Crear la tienda
      const { data: tiendaData, error: tiendaError } = await supabase
        .from('tiendas')
        .insert({
          usuario_id: user.id,
          nombre: storeName,
          categoria: category,
          subdominio: subdomain.toLowerCase(),
          plan_id: selectedPlan.id
        })
        .select()
        .single();

      if (tiendaError) {
        console.error('Error creating store:', tiendaError);
        toast({
          title: "Error al crear tienda",
          description: "Hubo un problema al crear tu tienda. Inténtalo de nuevo.",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "¡Tienda creada exitosamente!",
        description: `Tu tienda ${storeName} está lista en ${subdomain}.umpla.gq`,
      });
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);

    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error inesperado",
        description: "Ocurrió un error inesperado. Inténtalo de nuevo.",
        variant: "destructive"
      });
    } finally {
      setIsCreating(false);
    }
  };

  const formatPrice = (price: number) => {
    return price === 0 ? 'Gratis' : `${price.toLocaleString()} XAF`;
  };

  const getPlanIcon = (planName: string) => {
    switch (planName.toLowerCase()) {
      case 'premium':
        return <Crown className="h-5 w-5 text-yellow-500" />;
      case 'estándar':
        return <Star className="h-5 w-5 text-blue-500" />;
      default:
        return <Check className="h-5 w-5 text-green-500" />;
    }
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

              {/* Plan seleccionado */}
              {selectedPlan && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    {getPlanIcon(selectedPlan.nombre)}
                    <div className="flex-1">
                      <h3 className="font-medium text-primary mb-1">Plan {selectedPlan.nombre}</h3>
                      <p className="text-sm text-gray-700 mb-2">
                        {selectedPlan.descripcion}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-lg">{formatPrice(selectedPlan.precio)}</span>
                        <Dialog open={showPlanModal} onOpenChange={setShowPlanModal}>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              ¿Quieres usar tu propio dominio?
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl">
                            <DialogHeader>
                              <DialogTitle>Planes disponibles</DialogTitle>
                              <DialogDescription>
                                Elige el plan que mejor se adapte a tus necesidades
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                              {plans.map((plan) => (
                                <Card 
                                  key={plan.id} 
                                  className={`cursor-pointer transition-all ${
                                    selectedPlan?.id === plan.id 
                                      ? 'ring-2 ring-blue-500 bg-blue-50' 
                                      : 'hover:shadow-lg'
                                  }`}
                                  onClick={() => {
                                    setSelectedPlan(plan);
                                    setShowPlanModal(false);
                                  }}
                                >
                                  <CardHeader className="text-center">
                                    {getPlanIcon(plan.nombre)}
                                    <CardTitle className="text-xl">{plan.nombre}</CardTitle>
                                    <CardDescription className="text-2xl font-bold">
                                      {formatPrice(plan.precio)}
                                    </CardDescription>
                                  </CardHeader>
                                  <CardContent>
                                    <ul className="space-y-2 text-sm">
                                      <li className="flex items-center">
                                        <Check className="h-4 w-4 text-green-500 mr-2" />
                                        {plan.limite_productos === -1 
                                          ? 'Productos ilimitados' 
                                          : `Hasta ${plan.limite_productos} productos`
                                        }
                                      </li>
                                      <li className="flex items-center">
                                        <Check className="h-4 w-4 text-green-500 mr-2" />
                                        {plan.permite_dominio 
                                          ? 'Dominio personalizado' 
                                          : 'Subdominio gratuito'
                                        }
                                      </li>
                                      {plan.nombre === 'Premium' && (
                                        <li className="flex items-center">
                                          <Check className="h-4 w-4 text-green-500 mr-2" />
                                          Estadísticas avanzadas
                                        </li>
                                      )}
                                    </ul>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <Button 
                onClick={handleCreateStore}
                className="w-full"
                size="lg"
                disabled={!storeName || !category || !subdomain || domainAvailable === false || isCreating}
              >
                {isCreating ? 'Creando tienda...' : 'Crear mi tienda'}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateStore;
