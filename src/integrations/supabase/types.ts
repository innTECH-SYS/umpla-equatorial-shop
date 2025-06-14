export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      donations: {
        Row: {
          amount: number | null
          created_at: string | null
          description: string | null
          donation_type: string
          id: string
          location: string | null
          request_id: string | null
          status: string | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          amount?: number | null
          created_at?: string | null
          description?: string | null
          donation_type: string
          id?: string
          location?: string | null
          request_id?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          amount?: number | null
          created_at?: string | null
          description?: string | null
          donation_type?: string
          id?: string
          location?: string | null
          request_id?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "donations_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "help_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "donations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      help_matches: {
        Row: {
          admin_notes: string | null
          approved_by: string | null
          created_at: string | null
          donation_id: string | null
          help_request_id: string
          id: string
          inventory_id: string | null
          match_score: number | null
          matched_at: string | null
          status: string
        }
        Insert: {
          admin_notes?: string | null
          approved_by?: string | null
          created_at?: string | null
          donation_id?: string | null
          help_request_id: string
          id?: string
          inventory_id?: string | null
          match_score?: number | null
          matched_at?: string | null
          status?: string
        }
        Update: {
          admin_notes?: string | null
          approved_by?: string | null
          created_at?: string | null
          donation_id?: string | null
          help_request_id?: string
          id?: string
          inventory_id?: string | null
          match_score?: number | null
          matched_at?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "help_matches_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "help_matches_donation_id_fkey"
            columns: ["donation_id"]
            isOneToOne: false
            referencedRelation: "donations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "help_matches_help_request_id_fkey"
            columns: ["help_request_id"]
            isOneToOne: false
            referencedRelation: "help_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "help_matches_inventory_id_fkey"
            columns: ["inventory_id"]
            isOneToOne: false
            referencedRelation: "inventory"
            referencedColumns: ["id"]
          },
        ]
      }
      help_requests: {
        Row: {
          category: string | null
          created_at: string | null
          description: string
          id: string
          location: string | null
          priority: number | null
          status: Database["public"]["Enums"]["help_request_status"] | null
          title: string
          updated_at: string | null
          urgency_level: string | null
          user_id: string
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description: string
          id?: string
          location?: string | null
          priority?: number | null
          status?: Database["public"]["Enums"]["help_request_status"] | null
          title: string
          updated_at?: string | null
          urgency_level?: string | null
          user_id: string
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string
          id?: string
          location?: string | null
          priority?: number | null
          status?: Database["public"]["Enums"]["help_request_status"] | null
          title?: string
          updated_at?: string | null
          urgency_level?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "help_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      inventory: {
        Row: {
          created_at: string | null
          description: string | null
          donated_by: string | null
          expiration_date: string | null
          id: string
          item_name: string
          item_type: string
          location: string | null
          pharmacy_id: string | null
          quantity: number
          status: string
          unit: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          donated_by?: string | null
          expiration_date?: string | null
          id?: string
          item_name: string
          item_type: string
          location?: string | null
          pharmacy_id?: string | null
          quantity?: number
          status?: string
          unit?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          donated_by?: string | null
          expiration_date?: string | null
          id?: string
          item_name?: string
          item_type?: string
          location?: string | null
          pharmacy_id?: string | null
          quantity?: number
          status?: string
          unit?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "inventory_donated_by_fkey"
            columns: ["donated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_pharmacy_id_fkey"
            columns: ["pharmacy_id"]
            isOneToOne: false
            referencedRelation: "pharmacies"
            referencedColumns: ["id"]
          },
        ]
      }
      metodos_pago: {
        Row: {
          activo: boolean | null
          agregado_el: string | null
          id: string
          numero: string | null
          tipo: string
          titular: string | null
          usuario_id: string | null
        }
        Insert: {
          activo?: boolean | null
          agregado_el?: string | null
          id?: string
          numero?: string | null
          tipo: string
          titular?: string | null
          usuario_id?: string | null
        }
        Update: {
          activo?: boolean | null
          agregado_el?: string | null
          id?: string
          numero?: string | null
          tipo?: string
          titular?: string | null
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "metodos_pago_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      pharmacies: {
        Row: {
          address: string
          contact_email: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          hours: string | null
          id: string
          is_on_duty: boolean | null
          is_open: boolean | null
          latitude: number | null
          license_number: string | null
          longitude: number | null
          medications_available: string[] | null
          name: string
          phone: string | null
          services: string[] | null
          updated_at: string | null
        }
        Insert: {
          address: string
          contact_email?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          hours?: string | null
          id?: string
          is_on_duty?: boolean | null
          is_open?: boolean | null
          latitude?: number | null
          license_number?: string | null
          longitude?: number | null
          medications_available?: string[] | null
          name: string
          phone?: string | null
          services?: string[] | null
          updated_at?: string | null
        }
        Update: {
          address?: string
          contact_email?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          hours?: string | null
          id?: string
          is_on_duty?: boolean | null
          is_open?: boolean | null
          latitude?: number | null
          license_number?: string | null
          longitude?: number | null
          medications_available?: string[] | null
          name?: string
          phone?: string | null
          services?: string[] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pharmacies_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      planes: {
        Row: {
          creado_el: string | null
          descripcion: string | null
          id: string
          limite_productos: number | null
          nombre: string
          permite_dominio: boolean | null
          precio: number
        }
        Insert: {
          creado_el?: string | null
          descripcion?: string | null
          id?: string
          limite_productos?: number | null
          nombre: string
          permite_dominio?: boolean | null
          precio: number
        }
        Update: {
          creado_el?: string | null
          descripcion?: string | null
          id?: string
          limite_productos?: number | null
          nombre?: string
          permite_dominio?: boolean | null
          precio?: number
        }
        Relationships: []
      }
      prescription_estimations: {
        Row: {
          created_at: string | null
          estimated_cost: number | null
          id: string
          input_method:
            | Database["public"]["Enums"]["prescription_input_method"]
            | null
          notes: string | null
          status: Database["public"]["Enums"]["prescription_status"] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          estimated_cost?: number | null
          id?: string
          input_method?:
            | Database["public"]["Enums"]["prescription_input_method"]
            | null
          notes?: string | null
          status?: Database["public"]["Enums"]["prescription_status"] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          estimated_cost?: number | null
          id?: string
          input_method?:
            | Database["public"]["Enums"]["prescription_input_method"]
            | null
          notes?: string | null
          status?: Database["public"]["Enums"]["prescription_status"] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "prescription_estimations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      prescription_items: {
        Row: {
          created_at: string | null
          dosage: string | null
          drug_name: string
          id: string
          prescription_id: string
          quantity: number
          total_price: number | null
          unit_price: number | null
        }
        Insert: {
          created_at?: string | null
          dosage?: string | null
          drug_name: string
          id?: string
          prescription_id: string
          quantity?: number
          total_price?: number | null
          unit_price?: number | null
        }
        Update: {
          created_at?: string | null
          dosage?: string | null
          drug_name?: string
          id?: string
          prescription_id?: string
          quantity?: number
          total_price?: number | null
          unit_price?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "prescription_items_prescription_id_fkey"
            columns: ["prescription_id"]
            isOneToOne: false
            referencedRelation: "prescription_estimations"
            referencedColumns: ["id"]
          },
        ]
      }
      productos: {
        Row: {
          activo: boolean | null
          creado_el: string | null
          descripcion: string | null
          id: string
          imagen_url: string | null
          nombre: string
          precio: number
          stock: number | null
          tienda_id: string | null
          tipo: string | null
        }
        Insert: {
          activo?: boolean | null
          creado_el?: string | null
          descripcion?: string | null
          id?: string
          imagen_url?: string | null
          nombre: string
          precio: number
          stock?: number | null
          tienda_id?: string | null
          tipo?: string | null
        }
        Update: {
          activo?: boolean | null
          creado_el?: string | null
          descripcion?: string | null
          id?: string
          imagen_url?: string | null
          nombre?: string
          precio?: number
          stock?: number | null
          tienda_id?: string | null
          tipo?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "productos_tienda_id_fkey"
            columns: ["tienda_id"]
            isOneToOne: false
            referencedRelation: "tiendas"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          location: string | null
          phone: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          location?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          location?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          created_at: string | null
          expires_at: string | null
          id: string
          plan_type: string
          started_at: string | null
          status: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          plan_type?: string
          started_at?: string | null
          status?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          plan_type?: string
          started_at?: string | null
          status?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tiendas: {
        Row: {
          activa: boolean | null
          banner_url: string | null
          categoria: string | null
          creado_el: string | null
          descripcion: string | null
          dominio_personal: string | null
          id: string
          logo_url: string | null
          nombre: string
          plan_id: string | null
          subdominio: string | null
          telefono: string | null
          telefono_whatsapp: string | null
          ubicacion: string | null
          usuario_id: string | null
        }
        Insert: {
          activa?: boolean | null
          banner_url?: string | null
          categoria?: string | null
          creado_el?: string | null
          descripcion?: string | null
          dominio_personal?: string | null
          id?: string
          logo_url?: string | null
          nombre: string
          plan_id?: string | null
          subdominio?: string | null
          telefono?: string | null
          telefono_whatsapp?: string | null
          ubicacion?: string | null
          usuario_id?: string | null
        }
        Update: {
          activa?: boolean | null
          banner_url?: string | null
          categoria?: string | null
          creado_el?: string | null
          descripcion?: string | null
          dominio_personal?: string | null
          id?: string
          logo_url?: string | null
          nombre?: string
          plan_id?: string | null
          subdominio?: string | null
          telefono?: string | null
          telefono_whatsapp?: string | null
          ubicacion?: string | null
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tiendas_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "planes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tiendas_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      tiendas_seo: {
        Row: {
          created_at: string | null
          id: string
          meta_description: string | null
          meta_title: string | null
          og_image_url: string | null
          tienda_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          og_image_url?: string | null
          tienda_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          og_image_url?: string | null
          tienda_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tiendas_seo_tienda_id_fkey"
            columns: ["tienda_id"]
            isOneToOne: false
            referencedRelation: "tiendas"
            referencedColumns: ["id"]
          },
        ]
      }
      usuarios: {
        Row: {
          creado_el: string | null
          email: string | null
          foto: string | null
          id: string
          nombre: string | null
          rol: string | null
        }
        Insert: {
          creado_el?: string | null
          email?: string | null
          foto?: string | null
          id: string
          nombre?: string | null
          rol?: string | null
        }
        Update: {
          creado_el?: string | null
          email?: string | null
          foto?: string | null
          id?: string
          nombre?: string | null
          rol?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      help_request_status: "open" | "fulfilled" | "closed"
      prescription_input_method: "manual" | "image"
      prescription_status: "pending" | "processed"
      user_role: "user" | "admin" | "pharmacy"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      help_request_status: ["open", "fulfilled", "closed"],
      prescription_input_method: ["manual", "image"],
      prescription_status: ["pending", "processed"],
      user_role: ["user", "admin", "pharmacy"],
    },
  },
} as const
