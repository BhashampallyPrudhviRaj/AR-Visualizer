import { Suspense } from 'react'
import { getProducts } from '@/lib/api'
import { RugCard } from '@/components/commercial/RugCard'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export default async function CatalogPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 md:px-6 md:py-12">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif text-stone-900 mb-2">
                The Collection
              </h1>
              <p className="text-stone-500 max-w-lg">
                Discover our hand-picked selection of artisanal rugs. 
                Use our AR visualizer to see how they look in your home.
              </p>
            </div>
            {/* Filter Placeholder - Task 14 */}
            <div className="mt-4 md:mt-0 text-sm text-stone-500">
               Showing {products.length} results
            </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
          {products.map((product) => (
            <RugCard key={product.id} product={product} />
          ))}
        </div>
        
        {products.length === 0 && (
          <div className="py-20 text-center text-stone-500">
            No rugs found. Try a different category.
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
