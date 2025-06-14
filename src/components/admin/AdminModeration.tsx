
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, XCircle, AlertTriangle, Eye, Flag } from 'lucide-react';

export const AdminModeration = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState<string | null>(null);

  const { data: pendingProducts, refetch: refetchProducts } = useQuery({
    queryKey: ['admin-pending-products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('productos')
        .select(`
          *,
          tiendas (
            nombre,
            usuarios (
              nombre,
              email
            )
          )
        `)
        .eq('activo', false)
        .order('creado_el', { ascending: false });

      if (error) throw error;
      return data;
    }
  });

  const { data: flaggedContent, refetch: refetchFlagged } = useQuery({
    queryKey: ['admin-flagged-content'],
    queryFn: async () => {
      // Simulamos contenido reportado ya que no tenemos tabla de reportes
      const { data: stores, error } = await supabase
        .from('tiendas')
        .select(`
          *,
          usuarios (
            nombre,
            email
          )
        `)
        .order('creado_el', { ascending: false })
        .limit(10);

      if (error) throw error;
      return stores?.map(store => ({
        ...store,
        type: 'store',
        flagged: Math.random() > 0.7, // Simulación
        reason: 'Contenido inapropiado'
      })).filter(item => item.flagged) || [];
    }
  });

  const approveProduct = async (productId: string) => {
    setLoading(productId);
    try {
      const { error } = await supabase
        .from('productos')
        .update({ activo: true })
        .eq('id', productId);

      if (error) throw error;

      toast({
        title: "Producto aprobado",
        description: "El producto ha sido aprobado y es visible al público"
      });

      refetchProducts();
    } catch (error) {
      console.error('Error approving product:', error);
      toast({
        title: "Error",
        description: "No se pudo aprobar el producto",
        variant: "destructive"
      });
    } finally {
      setLoading(null);
    }
  };

  const rejectProduct = async (productId: string) => {
    setLoading(productId);
    try {
      const { error } = await supabase
        .from('productos')
        .delete()
        .eq('id', productId);

      if (error) throw error;

      toast({
        title: "Producto rechazado",
        description: "El producto ha sido eliminado de la plataforma"
      });

      refetchProducts();
    } catch (error) {
      console.error('Error rejecting product:', error);
      toast({
        title: "Error",
        description: "No se pudo rechazar el producto",
        variant: "destructive"
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flag className="h-5 w-5" />
            Centro de Moderación
          </CardTitle>
          <CardDescription>
            Gestiona el contenido de la plataforma y mantén la calidad
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="products" className="space-y-4">
        <TabsList>
          <TabsTrigger value="products">
            Productos Pendientes
            {pendingProducts && pendingProducts.length > 0 && (
              <Badge variant="destructive" className="ml-2">
                {pendingProducts.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="flagged">
            Contenido Reportado
            {flaggedContent && flaggedContent.length > 0 && (
              <Badge variant="destructive" className="ml-2">
                {flaggedContent.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Productos Esperando Aprobación</CardTitle>
              <CardDescription>
                Revisa y aprueba productos antes de que sean visibles al público
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!pendingProducts || pendingProducts.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 mx-auto text-green-500 mb-4" />
                  <p className="text-gray-500">No hay productos pendientes de aprobación</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Producto</TableHead>
                      <TableHead>Tienda</TableHead>
                      <TableHead>Precio</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            {product.imagen_url && (
                              <img 
                                src={product.imagen_url} 
                                alt={product.nombre}
                                className="w-12 h-12 object-cover rounded"
                              />
                            )}
                            <div>
                              <div className="font-medium">{product.nombre}</div>
                              <div className="text-sm text-gray-500 max-w-xs truncate">
                                {product.descripcion}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{product.tiendas?.nombre}</div>
                            <div className="text-sm text-gray-500">
                              {product.tiendas?.usuarios?.nombre}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">{product.precio} XAF</span>
                        </TableCell>
                        <TableCell>
                          {new Date(product.creado_el).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => approveProduct(product.id)}
                              disabled={loading === product.id}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Aprobar
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => rejectProduct(product.id)}
                              disabled={loading === product.id}
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Rechazar
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="flagged">
          <Card>
            <CardHeader>
              <CardTitle>Contenido Reportado</CardTitle>
              <CardDescription>
                Contenido que ha sido reportado por usuarios
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!flaggedContent || flaggedContent.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 mx-auto text-green-500 mb-4" />
                  <p className="text-gray-500">No hay contenido reportado</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Contenido</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Motivo</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {flaggedContent.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            {item.logo_url && (
                              <img 
                                src={item.logo_url} 
                                alt={item.nombre}
                                className="w-8 h-8 rounded-full"
                              />
                            )}
                            <div>
                              <div className="font-medium">{item.nombre}</div>
                              <div className="text-sm text-gray-500">
                                {item.usuarios?.nombre}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">Tienda</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="destructive">{item.reason}</Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(item.creado_el).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-1" />
                              Revisar
                            </Button>
                            <Button size="sm" variant="destructive">
                              <AlertTriangle className="h-4 w-4 mr-1" />
                              Tomar Acción
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
