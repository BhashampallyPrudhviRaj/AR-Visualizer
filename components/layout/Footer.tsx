import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full border-t border-stone-200 bg-stone-50 py-12 px-4 md:px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        <div>
          <span className="text-lg font-bold font-serif text-stone-900 mb-4 block">
            Luxe Rugs
          </span>
          <p className="text-stone-500 max-w-xs">
            Exquisite handcrafted rugs for the modern home. Experience them in your space with our AR technology.
          </p>
        </div>
        
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-stone-900">Shop</h3>
          <Link href="/catalog" className="text-stone-500 hover:text-stone-900">All Rugs</Link>
          <Link href="/catalog?category=Modern" className="text-stone-500 hover:text-stone-900">Modern</Link>
          <Link href="/catalog?category=Traditional" className="text-stone-500 hover:text-stone-900">Traditional</Link>
        </div>
        
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-stone-900">Company</h3>
          <Link href="/about" className="text-stone-500 hover:text-stone-900">About Us</Link>
          <Link href="/contact" className="text-stone-500 hover:text-stone-900">Contact</Link>
          <Link href="/admin" className="text-stone-500 hover:text-stone-900">Admin Login</Link>
        </div>
      </div>
      <div className="container mx-auto mt-12 pt-8 border-t border-stone-200 text-center text-stone-400 text-xs">
        © {new Date().getFullYear()} Luxe Rugs Inc. All rights reserved.
      </div>
    </footer>
  )
}
