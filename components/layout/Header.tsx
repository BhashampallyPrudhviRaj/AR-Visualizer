import Link from "next/link"
import { Menu, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-stone-200 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 overflow-hidden rounded-full border border-stone-200 bg-white p-1 group-hover:border-[var(--color-atlas-red)] transition-colors">
              <img 
                src="https://atlasruggallery.com/wp-content/uploads/2021/01/Atlas-Rug-Gallery-Logo-Red-1.png" 
                alt="Atlas Rug Gallery" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-[0.15em] uppercase text-[var(--color-atlas-red)] leading-tight">
                Atlas Rug Gallery
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-stone-500 font-medium">
                Fine Rugs & Textiles
              </span>
            </div>
          </Link>
          <nav className="hidden lg:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-stone-600">
            <Link href="/catalog" className="hover:text-[var(--color-atlas-red)] transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:w-0 after:bg-[var(--color-atlas-red)] hover:after:w-full after:transition-all">
              Collection
            </Link>
            <Link href="/about" className="hover:text-[var(--color-atlas-red)] transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:w-0 after:bg-[var(--color-atlas-red)] hover:after:w-full after:transition-all">
              Our Story
            </Link>
            <Link href="/showroom" className="hover:text-[var(--color-atlas-red)] transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:w-0 after:bg-[var(--color-atlas-red)] hover:after:w-full after:transition-all">
              Showroom
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="hidden md:flex flex-col items-end mr-4 text-right">
             <span className="text-[10px] text-stone-400 uppercase tracking-wider">Contact Us</span>
             <span className="text-xs font-bold text-stone-700">(202) 333-0400</span>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden text-stone-700 hover:bg-stone-100">
            <Menu className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-stone-700 hover:bg-stone-100 relative">
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-[var(--color-atlas-red)] rounded-full border-2 border-white"></span>
          </Button>
        </div>
      </div>
    </header>
  )
}
