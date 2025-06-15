
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Eye, EyeOff, Mail, Lock, User, Chrome, Apple } from "lucide-react";

export const ImprovedAuth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("new-seller");
  
  // Estados para login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  // Estados para registro
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupName, setSignupName] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });

      if (error) {
        toast({
          title: "Error al iniciar sesión",
          description: error.message === "Invalid login credentials" ? 
            "Email o contraseña incorrectos" : error.message,
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "¡Bienvenido de vuelta!",
        description: "Has iniciado sesión correctamente.",
      });

      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Error inesperado",
        description: "Ocurrió un error al iniciar sesión.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email: signupEmail,
        password: signupPassword,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
          data: {
            full_name: signupName
          }
        }
      });

      if (error) {
        toast({
          title: "Error al registrarse",
          description: error.message === "User already registered" ? 
            "Ya existe una cuenta con este email" : error.message,
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "¡Cuenta creada exitosamente!",
        description: "Revisa tu email para confirmar tu cuenta.",
      });

      // Limpiar formulario
      setSignupEmail("");
      setSignupPassword("");
      setSignupName("");
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        title: "Error inesperado",
        description: "Ocurrió un error al crear la cuenta.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSSOClick = (provider: string) => {
    toast({
      title: "Próximamente",
      description: `Inicio de sesión con ${provider} estará disponible muy pronto.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">U</span>
            </div>
            <span className="text-3xl font-bold text-secondary">Umpla</span>
          </div>
          <h1 className="text-xl font-semibold text-gray-800 mb-2">
            Tu tienda online en Guinea Ecuatorial
          </h1>
          <p className="text-gray-600">
            Vende productos y servicios fácilmente
          </p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl">Acceder a Umpla</CardTitle>
            <CardDescription>
              Crea tu tienda o inicia sesión en tu cuenta existente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="new-seller" className="text-sm">
                  Nuevos Vendedores
                </TabsTrigger>
                <TabsTrigger value="existing" className="text-sm">
                  Ya tengo tienda
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="new-seller" className="space-y-4">
                <div className="text-center mb-4">
                  <h3 className="font-semibold text-lg text-gray-800">Crear mi tienda gratis</h3>
                  <p className="text-sm text-gray-600">Únete a cientos de vendedores exitosos</p>
                </div>

                {/* SSO Buttons */}
                <div className="space-y-3 mb-6">
                  <Button 
                    variant="outline" 
                    className="w-full h-12 text-left relative"
                    onClick={() => handleSSOClick('Google')}
                  >
                    <Chrome className="h-5 w-5 absolute left-4" />
                    <span className="flex-1 text-center">Continuar con Google</span>
                    <span className="absolute right-4 text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded">
                      Pronto
                    </span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full h-12 text-left relative"
                    onClick={() => handleSSOClick('Apple')}
                  >
                    <Apple className="h-5 w-5 absolute left-4" />
                    <span className="flex-1 text-center">Continuar con Apple</span>
                    <span className="absolute right-4 text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded">
                      Pronto
                    </span>
                  </Button>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">O registrarse con email</span>
                  </div>
                </div>

                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Nombre completo
                    </Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Tu nombre completo"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      required
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email
                    </Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="tu@email.com"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      required
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      Contraseña
                    </Label>
                    <div className="relative">
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Mínimo 6 caracteres"
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        required
                        minLength={6}
                        className="h-12 pr-12"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <Button type="submit" className="w-full h-12 text-lg" disabled={isLoading}>
                    {isLoading ? "Creando cuenta..." : "Crear mi tienda gratis"}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="existing" className="space-y-4">
                <div className="text-center mb-4">
                  <h3 className="font-semibold text-lg text-gray-800">Iniciar sesión</h3>
                  <p className="text-sm text-gray-600">Accede a tu tienda existente</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email
                    </Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="tu@email.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      Contraseña
                    </Label>
                    <div className="relative">
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Tu contraseña"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                        className="h-12 pr-12"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Button variant="link" className="p-0 h-auto text-sm">
                      ¿Olvidaste tu contraseña?
                    </Button>
                  </div>
                  
                  <Button type="submit" className="w-full h-12 text-lg" disabled={isLoading}>
                    {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                  </Button>
                </form>

                <div className="text-center pt-4">
                  <p className="text-sm text-gray-600">
                    ¿No tienes tienda?{" "}
                    <Button 
                      variant="link" 
                      className="p-0 h-auto text-primary"
                      onClick={() => setActiveTab("new-seller")}
                    >
                      Crear una gratis
                    </Button>
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Button variant="ghost" onClick={() => navigate('/')}>
            ← Volver al inicio
          </Button>
        </div>
      </div>
    </div>
  );
};
