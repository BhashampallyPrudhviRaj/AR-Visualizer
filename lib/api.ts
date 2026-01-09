import { supabase } from './supabase'
import { Database } from './types'

export type Product = Database['public']['Tables']['products']['Row']

// Mock data for development when Supabase is not connected
const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'The Imperial Oushak',
    slug: 'the-imperial-oushak',
    price: 2450.00,
    dimensions_label: "8' x 10'",
    width_cm: 244,
    length_cm: 305,
    category: 'Traditional',
    colors: ['Beige', 'Gold', 'Blue'],
    image_url: 'https://images.unsplash.com/photo-1596489391054-d830b9101d2a?q=80&w=1200&auto=format&fit=crop',
    model_url: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Modern Geometric Wool',
    slug: 'modern-geometric-wool',
    price: 1200.00,
    dimensions_label: "5' x 8'",
    width_cm: 152,
    length_cm: 244,
    category: 'Modern',
    colors: ['Grey', 'White', 'Black'],
    image_url: 'https://images.unsplash.com/photo-1575909812264-5d5184b23528?q=80&w=1200&auto=format&fit=crop',
    model_url: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Vintage Distressed Runner',
    slug: 'vintage-distressed-runner',
    price: 850.00,
    dimensions_label: "2.5' x 9'",
    width_cm: 76,
    length_cm: 274,
    category: 'Vintage',
    colors: ['Red', 'Navy', 'Cream'],
    image_url: 'https://images.unsplash.com/photo-1628114389917-f65511dc47d2?q=80&w=1200&auto=format&fit=crop',
    model_url: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    title: 'Silk Kashan Hand-Knotted',
    slug: 'silk-kashan-hand-knotted',
    price: 4500.00,
    dimensions_label: "9' x 12'",
    width_cm: 274,
    length_cm: 366,
    category: 'Luxury',
    colors: ['Emerald', 'Gold'],
    image_url: 'https://images.unsplash.com/photo-1563725586618-68f7dc3b91bc?q=80&w=1200&auto=format&fit=crop',
    model_url: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    created_at: new Date().toISOString()
  }
]

export async function getProducts(category?: string): Promise<Product[]> {
  const isMock = true; // Forced true for GitHub Pages testing

  // If Supabase keys are missing or placeholder, return mock data
  if (isMock) {
    console.log('Returning mock products (Simulation mode)')
    if (category) return MOCK_PRODUCTS.filter(p => p.category === category)
    return MOCK_PRODUCTS
  }

  try {
    let query = supabase.from('products').select('*')
    if (category) {
      query = query.eq('category', category)
    }
    
    const { data, error } = await query
    
    if (error) {
      console.error('Error fetching products:', error)
      return MOCK_PRODUCTS
    }
    
    return data || []
  } catch (err) {
    console.error('Unexpected error fetching products:', err)
    return MOCK_PRODUCTS
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const isMock = true; // Forced true for GitHub Pages testing

  if (isMock) {
     return MOCK_PRODUCTS.find(p => p.slug === slug) || null
  }
  
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .single()
      
    if (error) {
      console.error('Error fetching product:', error)
       return MOCK_PRODUCTS.find(p => p.slug === slug) || null
    }
    return data
  } catch (err) {
    return MOCK_PRODUCTS.find(p => p.slug === slug) || null
  }
}

export async function getProductSlugs(): Promise<string[]> {
  return MOCK_PRODUCTS.map(p => p.slug)
}
