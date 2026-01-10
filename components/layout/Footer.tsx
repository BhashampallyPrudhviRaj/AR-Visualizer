import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full border-t border-stone-200 bg-stone-50 py-12 px-4 md:px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        <div>
          <span className="text-xl font-bold uppercase tracking-widest text-[var(--color-atlas-red)] mb-4 block leading-tight">
            Atlas Rug Gallery
          </span>
          <p className="text-stone-500 max-w-xs mb-6 font-light">
            Serving the Fort Worth TX area since 1986. Specializing in fine antique, vintage, and modern rugs from around the world.
          </p>
          <div className="flex flex-col gap-1 text-stone-400 italic font-light">
            <p>Fort Worth</p>
            <p>Texas</p>
          </div>
        </div>
        
        <div className="flex flex-col gap-3">
          <h4 className="font-bold text-stone-900 uppercase tracking-widest text-xs mb-2">Collections</h4>
          <Link href="/catalog" className="text-stone-500 hover:text-[var(--color-atlas-red)] transition-colors">All Collections</Link>
          <Link href="/catalog?category=Antique" className="text-stone-500 hover:text-[var(--color-atlas-red)] transition-colors">Antique Persian</Link>
          <Link href="/catalog?category=Modern" className="text-stone-500 hover:text-[var(--color-atlas-red)] transition-colors">Modern & Contemporary</Link>
          <Link href="/catalog?category=Vintage" className="text-stone-500 hover:text-[var(--color-atlas-red)] transition-colors">Vintage Oushak</Link>
        </div>
        
        <div className="flex flex-col gap-3">
          <h4 className="font-bold text-stone-900 uppercase tracking-widest text-xs mb-2">Inquiries</h4>
          <p className="text-stone-500">(202) 333-0400</p>
          <Link href="/about" className="text-stone-500 hover:text-[var(--color-atlas-red)] transition-colors">Our History</Link>
          <Link href="/showroom" className="text-stone-500 hover:text-[var(--color-atlas-red)] transition-colors">Visit Showroom</Link>
          <Link href="/admin" className="text-stone-300 hover:text-stone-900 text-xs mt-4 transition-colors">Employee Access</Link>
        </div>
      </div>
      <div className="container mx-auto mt-16 pt-8 border-t border-stone-200 text-center text-stone-400 text-xs font-light">
        © {new Date().getFullYear()} Atlas Rug Gallery. Fine Rugs & Textiles. All rights reserved.
      </div>
    </footer>
  )
}
