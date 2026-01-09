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
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <span className="text-[var(--color-atlas-red)] font-bold uppercase tracking-[0.2em] text-xs mb-3 block">Atlas Collections</span>
              <h1 className="text-4xl md:text-6xl font-serif text-stone-900 mb-4">
                The Collection
              </h1>
              <p className="text-stone-500 max-w-lg leading-relaxed text-lg font-light">
                Discover our hand-picked selection of world-class antique and modern rugs. 
                Experience legendary craftsmanship in your own space.
              </p>
            </div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold border-b border-stone-200 pb-2">
               {products.length} Masterpieces Available
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
