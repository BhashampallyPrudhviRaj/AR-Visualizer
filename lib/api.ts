import { supabase } from './supabase'
import { Database } from './types'

export type Product = Database['public']['Tables']['products']['Row']

// Mock data for development when Supabase is not connected
const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Persian Mandala Collection',
    slug: 'persian-mandala-collection',
    price: 2499.00,
    dimensions_label: "9' x 12'",
    width_cm: 274,
    length_cm: 366,
    category: 'Traditional',
    colors: ['Red', 'Navy', 'Cream'],
    image_url: 'https://atlasruggallery.com/index_htm_files/2968@2x.jpg',
    model_url: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Antique Afghan Floral',
    slug: 'antique-afghan-floral',
    price: 1850.00,
    dimensions_label: "8' x 10'",
    width_cm: 244,
    length_cm: 305,
    category: 'Antique',
    colors: ['Rust', 'Beige', 'Black'],
    image_url: 'https://atlasruggallery.com/index_htm_files/2969@2x.jpg',
    model_url: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Modern Oushak Pattern',
    slug: 'modern-oushak-pattern',
    price: 3200.00,
    dimensions_label: "6' x 9'",
    width_cm: 183,
    length_cm: 274,
    category: 'Modern',
    colors: ['Ivory', 'Blue', 'Grey'],
    image_url: 'https://atlasruggallery.com/index_htm_files/2970@2x.jpg',
    model_url: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    title: 'Classic Indian Silk',
    slug: 'classic-indian-silk',
    price: 4100.00,
    dimensions_label: "10' x 14'",
    width_cm: 305,
    length_cm: 427,
    category: 'Luxury',
    colors: ['Gold', 'Emerald', 'Burgundy'],
    image_url: 'https://atlasruggallery.com/index_htm_files/2971@2x.jpg',
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
