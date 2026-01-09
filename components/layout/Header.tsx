import Link from "next/link"
import { Menu, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[var(--color-atlas-red)] text-white shadow-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-widest uppercase">
              Atlas Rug Gallery
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-white/90">
            <Link href="/catalog" className="hover:text-white hover:underline underline-offset-4 transition-all">
              Collection
            </Link>
            <Link href="/about" className="hover:text-white hover:underline underline-offset-4 transition-all">
              Our Story
            </Link>
            <Link href="/showroom" className="hover:text-white hover:underline underline-offset-4 transition-all">
              Showroom
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-white/10">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
            <ShoppingBag className="h-5 w-5" />
            <span className="sr-only">Cart</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
