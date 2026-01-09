export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          title: string
          slug: string
          price: number
          dimensions_label: string
          width_cm: number
          length_cm: number
          category: string
          colors: string[]
          image_url: string
          model_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          price: number
          dimensions_label: string
          width_cm: number
          length_cm: number
          category: string
          colors?: string[]
          image_url: string
          model_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          price?: number
          dimensions_label?: string
          width_cm?: number
          length_cm?: number
          category?: string
          colors?: string[]
          image_url?: string
          model_url?: string | null
          created_at?: string
        }
      }
      analytics: {
        Row: {
          id: string
          event_type: 'view_product' | 'start_ar' | 'fallback_2d' | 'share'
          product_id: string | null
          metadata: Json
          created_at: string
        }
        Insert: {
          id?: string
          event_type: 'view_product' | 'start_ar' | 'fallback_2d' | 'share'
          product_id?: string | null
          metadata?: Json
          created_at?: string
        }
        Update: {
          id?: string
          event_type?: 'view_product' | 'start_ar' | 'fallback_2d' | 'share'
          product_id?: string | null
          metadata?: Json
          created_at?: string
        }
      }
    }
  }
}
