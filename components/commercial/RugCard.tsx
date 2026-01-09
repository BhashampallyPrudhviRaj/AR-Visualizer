import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface Product {
  id: string
  title: string
  slug: string
  price: number
  category: string
  dimensions_label: string
  image_url: string
}

interface RugCardProps {
  product: Product
}

export function RugCard({ product }: RugCardProps) {
  return (
    <div className="group relative flex flex-col overflow-hidden bg-white" data-testid="rug-card">
      <Link href={`/product/${product.slug}`} className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100">
        <Image
          src={product.image_url}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
        />
        <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/5" />
      </Link>
      
      <div className="flex flex-col gap-1 py-4">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold mb-1 block">
              {product.category}
            </span>
            <h3 className="font-serif text-lg text-stone-900 group-hover:text-[var(--color-atlas-red)] transition-colors">
              <Link href={`/product/${product.slug}`}>
                {product.title}
              </Link>
            </h3>
          </div>
          <span className="font-medium text-stone-900">${product.price.toLocaleString()}</span>
        </div>
        
        <p className="text-sm text-stone-500">{product.dimensions_label}</p>
        
        <div className="mt-2 opacity-0 transition-opacity group-hover:opacity-100 mobile-touch:opacity-100">
          <Link 
            href={`/product/${product.slug}`}
            className="inline-flex items-center text-xs font-bold uppercase tracking-[0.15em] text-[var(--color-atlas-red)] hover:text-[var(--color-atlas-red-dark)] transition-colors"
          >
            View Details <ArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  )
}
