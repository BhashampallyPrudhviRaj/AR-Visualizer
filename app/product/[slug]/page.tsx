import Link from "next/link"
import { notFound } from "next/navigation"
import { getProductBySlug, getProductSlugs } from "@/lib/api"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Box } from "lucide-react"
import { ProductActions } from "@/components/commercial/ProductActions"

export async function generateStaticParams() {
  const slugs = await getProductSlugs()
  return slugs.map((slug) => ({
    slug: slug,
  }))
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.slug)

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <Link href="/catalog" className="inline-flex items-center text-sm text-stone-500 hover:text-stone-900 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Collection
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {/* Image Gallery (Simple for now) */}
          <div className="space-y-4">
            <div className="relative aspect-[3/4] md:aspect-square bg-stone-100 rounded-lg overflow-hidden">
              <img 
                src={product.image_url} 
                alt={product.title} 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Thumbnails could go here */}
          </div>
          
          {/* Product Details */}
          <div className="flex flex-col">
            <div className="mb-4">
               <span className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--color-atlas-red)]">{product.category} Masterpiece</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif text-stone-900 mb-6 leading-tight">{product.title}</h1>
            <p className="text-3xl font-light text-stone-900 mb-10">${product.price.toLocaleString()}</p>
            
            <div className="prose prose-stone text-stone-600 mb-10 leading-relaxed max-w-none text-lg">
              <p className="font-light">
                This {product.category.toLowerCase()} rug represents the pinnacle of artisanal weaving. 
                Featuring a sophisticated palette of {product.colors?.join(", ").toLowerCase()}, it brings a 
                timeless elegance to any curated interior. Each piece in our collection is carefully 
                vetted for its historical significance and aesthetic quality.
              </p>
              <p className="mt-6 font-medium text-stone-900 border-l-2 border-[var(--color-atlas-red)] pl-4 italic">
                Dimensions: {product.dimensions_label} ({product.width_cm}cm x {product.length_cm}cm).
              </p>
            </div>
            
            <ProductActions product={product} />
            
            <div className="border-t border-stone-200 mt-12 pt-8 space-y-4">
               <div className="flex justify-between py-2 border-b border-stone-100">
                 <span className="font-medium text-stone-900">Material</span>
                 <span className="text-stone-600">100% New Zealand Wool</span>
               </div>
               <div className="flex justify-between py-2 border-b border-stone-100">
                 <span className="font-medium text-stone-900">Origin</span>
                 <span className="text-stone-600">India</span>
               </div>
               <div className="flex justify-between py-2 border-b border-stone-100">
                 <span className="font-medium text-stone-900">Colors</span>
                 <span className="text-stone-600">{product.colors?.join(", ")}</span>
               </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
