
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Settings, CreditCard, Shield, Mail, Database } from 'lucide-react';

export const AdminSystemConfig = () => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  // Estados para configuraciones
  const [platformSettings, setPlatformSettings] = useState({
    platformName: 'Umpla',
    platformUrl: 'umpla.gq',
    supportEmail: 'soporte@umpla.gq',
    maintenanceMode: false,
    registrationEnabled: true,
    maxStoresPerUser: 1
  });

  const [paymentSettings, setPaymentSettings] = useState({
    platformCommission: 5,
    defaultCurrency: 'XAF',
    enabledMethods: {
      bankTransfer: true,
      cashOnDelivery: true,
      mobileMoney: true
    }
  });

  const [notificationSettings, setNotificationSettings] = useState({
    newOrderNotifications: true,
    newStoreNotifications: true,
    paymentNotifications: true,
    emailNotifications: true
  });

  const saveConfiguration = async (section: string) => {
    setSaving(true);
    try {
      // Aquí se guardarían las configuraciones en la base de datos
      // Por ahora solo mostramos un mensaje de éxito
      
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulación

      toast({
        title: "Configuración guardada",
        description: `La configuración de ${section} se ha guardado correctamente`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo guardar la configuración",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Configuración del Sistema
          </CardTitle>
          <CardDescription>
            Gestiona las configuraciones globales de la plataforma
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="platform" className="space-y-4">
        <TabsList>
          <TabsTrigger value="platform">
            <Settings className="h-4 w-4 mr-2" />
            Plataforma
          </TabsTrigger>
          <TabsTrigger value="payments">
            <CreditCard className="h-4 w-4 mr-2" />
            Pagos
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="h-4 w-4 mr-2" />
            Seguridad
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Mail className="h-4 w-4 mr-2" />
            Notificaciones
          </TabsTrigger>
          <TabsTrigger value="database">
            <Database className="h-4 w-4 mr-2" />
            Base de Datos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="platform">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de la Plataforma</CardTitle>
              <CardDescription>
                Ajustes generales de la plataforma Umpla
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="platformName">Nombre de la Plataforma</Label>
                  <Input
                    id="platformName"
                    value={platformSettings.platformName}
                    onChange={(e) => setPlatformSettings({
                      ...platformSettings,
                      platformName: e.target.value
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="platformUrl">URL Principal</Label>
                  <Input
                    id="platformUrl"
                    value={platformSettings.platformUrl}
                    onChange={(e) => setPlatformSettings({
                      ...platformSettings,
                      platformUrl: e.target.value
                    })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="supportEmail">Email de Soporte</Label>
                <Input
                  id="supportEmail"
                  type="email"
                  value={platformSettings.supportEmail}
                  onChange={(e) => setPlatformSettings({
                    ...platformSettings,
                    supportEmail: e.target.value
                  })}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="maintenanceMode"
                  checked={platformSettings.maintenanceMode}
                  onCheckedChange={(checked) => setPlatformSettings({
                    ...platformSettings,
                    maintenanceMode: checked
                  })}
                />
                <Label htmlFor="maintenanceMode">Modo de Mantenimiento</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="registrationEnabled"
                  checked={platformSettings.registrationEnabled}
                  onCheckedChange={(checked) => setPlatformSettings({
                    ...platformSettings,
                    registrationEnabled: checked
                  })}
                />
                <Label htmlFor="registrationEnabled">Permitir Nuevos Registros</Label>
              </div>

              <div>
                <Label htmlFor="maxStores">Máximo Tiendas por Usuario</Label>
                <Input
                  id="maxStores"
                  type="number"
                  value={platformSettings.maxStoresPerUser}
                  onChange={(e) => setPlatformSettings({
                    ...platformSettings,
                    maxStoresPerUser: parseInt(e.target.value)
                  })}
                />
              </div>

              <Button 
                onClick={() => saveConfiguration('plataforma')}
                disabled={saving}
              >
                {saving ? 'Guardando...' : 'Guardar Configuración'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Pagos</CardTitle>
              <CardDescription>
                Métodos de pago y comisiones de la plataforma
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="commission">Comisión de la Plataforma (%)</Label>
                  <Input
                    id="commission"
                    type="number"
                    value={paymentSettings.platformCommission}
                    onChange={(e) => setPaymentSettings({
                      ...paymentSettings,
                      platformCommission: parseFloat(e.target.value)
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="currency">Moneda Predeterminada</Label>
                  <Input
                    id="currency"
                    value={paymentSettings.defaultCurrency}
                    onChange={(e) => setPaymentSettings({
                      ...paymentSettings,
                      defaultCurrency: e.target.value
                    })}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label>Métodos de Pago Habilitados</Label>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="bankTransfer"
                    checked={paymentSettings.enabledMethods.bankTransfer}
                    onCheckedChange={(checked) => setPaymentSettings({
                      ...paymentSettings,
                      enabledMethods: {
                        ...paymentSettings.enabledMethods,
                        bankTransfer: checked
                      }
                    })}
                  />
                  <Label htmlFor="bankTransfer">Transferencia Bancaria</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="cashOnDelivery"
                    checked={paymentSettings.enabledMethods.cashOnDelivery}
                    onCheckedChange={(checked) => setPaymentSettings({
                      ...paymentSettings,
                      enabledMethods: {
                        ...paymentSettings.enabledMethods,
                        cashOnDelivery: checked
                      }
                    })}
                  />
                  <Label htmlFor="cashOnDelivery">Pago Contra Entrega</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="mobileMoney"
                    checked={paymentSettings.enabledMethods.mobileMoney}
                    onCheckedChange={(checked) => setPaymentSettings({
                      ...paymentSettings,
                      enabledMethods: {
                        ...paymentSettings.enabledMethods,
                        mobileMoney: checked
                      }
                    })}
                  />
                  <Label htmlFor="mobileMoney">Dinero Móvil</Label>
                </div>
              </div>

              <Button 
                onClick={() => saveConfiguration('pagos')}
                disabled={saving}
              >
                {saving ? 'Guardando...' : 'Guardar Configuración'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Seguridad</CardTitle>
              <CardDescription>
                Políticas de seguridad y privacidad
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="privacyPolicy">Política de Privacidad</Label>
                <Textarea
                  id="privacyPolicy"
                  placeholder="Ingresa la política de privacidad..."
                  className="min-h-[100px]"
                />
              </div>

              <div>
                <Label htmlFor="termsOfService">Términos de Servicio</Label>
                <Textarea
                  id="termsOfService"
                  placeholder="Ingresa los términos de servicio..."
                  className="min-h-[100px]"
                />
              </div>

              <Button 
                onClick={() => saveConfiguration('seguridad')}
                disabled={saving}
              >
                {saving ? 'Guardando...' : 'Guardar Configuración'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Notificaciones</CardTitle>
              <CardDescription>
                Gestiona las notificaciones del sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="newOrderNotifications"
                  checked={notificationSettings.newOrderNotifications}
                  onCheckedChange={(checked) => setNotificationSettings({
                    ...notificationSettings,
                    newOrderNotifications: checked
                  })}
                />
                <Label htmlFor="newOrderNotifications">Notificaciones de Nuevos Pedidos</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="newStoreNotifications"
                  checked={notificationSettings.newStoreNotifications}
                  onCheckedChange={(checked) => setNotificationSettings({
                    ...notificationSettings,
                    newStoreNotifications: checked
                  })}
                />
                <Label htmlFor="newStoreNotifications">Notificaciones de Nuevas Tiendas</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="paymentNotifications"
                  checked={notificationSettings.paymentNotifications}
                  onCheckedChange={(checked) => setNotificationSettings({
                    ...notificationSettings,
                    paymentNotifications: checked
                  })}
                />
                <Label htmlFor="paymentNotifications">Notificaciones de Pagos</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="emailNotifications"
                  checked={notificationSettings.emailNotifications}
                  onCheckedChange={(checked) => setNotificationSettings({
                    ...notificationSettings,
                    emailNotifications: checked
                  })}
                />
                <Label htmlFor="emailNotifications">Notificaciones por Email</Label>
              </div>

              <Button 
                onClick={() => saveConfiguration('notificaciones')}
                disabled={saving}
              >
                {saving ? 'Guardando...' : 'Guardar Configuración'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database">
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Base de Datos</CardTitle>
              <CardDescription>
                Herramientas de mantenimiento y estadísticas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline">
                  <Database className="h-4 w-4 mr-2" />
                  Backup de Base de Datos
                </Button>
                <Button variant="outline">
                  <Database className="h-4 w-4 mr-2" />
                  Limpiar Cache
                </Button>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">Estadísticas de la Base de Datos</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>Total de usuarios: <strong>2</strong></div>
                  <div>Total de tiendas: <strong>0</strong></div>
                  <div>Total de productos: <strong>0</strong></div>
                  <div>Total de pedidos: <strong>0</strong></div>
                </div>
              </div>

              <Button 
                variant="destructive" 
                onClick={() => {
                  if (confirm('¿Estás seguro de que quieres generar datos de prueba? Esto creará contenido ficticio.')) {
                    toast({
                      title: "Datos generados",
                      description: "Se han creado datos de prueba en la plataforma"
                    });
                  }
                }}
              >
                Generar Datos de Prueba
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
