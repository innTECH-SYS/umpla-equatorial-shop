
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { Users } from 'lucide-react';

export const AdminUsersTable = () => {
  const { data: users, isLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('usuarios')
        .select(`
          *,
          tiendas (
            id,
            nombre,
            activa
          )
        `)
        .order('creado_el', { ascending: false });

      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Gestión de Usuarios</CardTitle>
          <CardDescription>Cargando usuarios...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Gestión de Usuarios
        </CardTitle>
        <CardDescription>
          Administra todos los usuarios registrados en la plataforma
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Usuario</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Tiendas</TableHead>
              <TableHead>Fecha de Registro</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    {user.foto && (
                      <img 
                        src={user.foto} 
                        alt={user.nombre}
                        className="w-8 h-8 rounded-full"
                      />
                    )}
                    <div>
                      <div className="font-medium">{user.nombre || 'Sin nombre'}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant={user.email === 'desarrollos@inntech.gq' ? "destructive" : "secondary"}>
                    {user.email === 'desarrollos@inntech.gq' ? 'admin' : 'user'}
                  </Badge>
                </TableCell>
                <TableCell>
                  {user.tiendas ? (
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{user.tiendas.nombre}</span>
                      <Badge variant={user.tiendas.activa ? "default" : "destructive"} className="text-xs">
                        {user.tiendas.activa ? "Activa" : "Inactiva"}
                      </Badge>
                    </div>
                  ) : (
                    <span className="text-gray-500 text-sm">Sin tiendas</span>
                  )}
                </TableCell>
                <TableCell>
                  {new Date(user.creado_el).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
