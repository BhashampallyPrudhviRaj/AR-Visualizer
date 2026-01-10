import { supabase } from './supabase'
import { Database } from './types'

export type Product = Database['public']['Tables']['products']['Row']

// Mock data for development when Supabase is not connected
const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Antique Persian Heriz Serapi',
    slug: 'antique-persian-heriz-serapi',
    price: 8500.00,
    dimensions_label: "9'6\" x 12'8\"",
    width_cm: 290,
    length_cm: 386,
    category: 'Antique',
    colors: ['Red', 'Navy', 'Cream'],
    image_url: 'https://atlasruggallery.com/index_htm_files/2968@2x.jpg',
    model_url: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Antique Persian Mahal Rug',
    slug: 'antique-persian-mahal-rug',
    price: 6200.00,
    dimensions_label: "8' x 11'",
    width_cm: 244,
    length_cm: 335,
    category: 'Antique',
    colors: ['Rust', 'Beige', 'Black'],
    image_url: 'https://atlasruggallery.com/index_htm_files/2969@2x.jpg',
    model_url: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Vintage Oushak Rug',
    slug: 'vintage-oushak-rug',
    price: 4800.00,
    dimensions_label: "6'4\" x 9'2\"",
    width_cm: 193,
    length_cm: 279,
    category: 'Vintage',
    colors: ['Ivory', 'Blue', 'Grey'],
    image_url: 'https://atlasruggallery.com/index_htm_files/2970@2x.jpg',
    model_url: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    title: 'Turkish Oushak Collection',
    slug: 'turkish-oushak-collection',
    price: 5400.00,
    dimensions_label: "10' x 13'8\"",
    width_cm: 305,
    length_cm: 416,
    category: 'Traditional',
    colors: ['Terracotta', 'Sage', 'Gold'],
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
