import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getProducts } from "@/lib/api";
import { RugCard } from "@/components/commercial/RugCard";
import { ArrowRight } from "lucide-react";

export default async function Home() {
  const featuredProducts = (await getProducts()).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[85vh] w-full bg-stone-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 scale-105">
           <img 
             src="https://atlasruggallery.com/wp-content/uploads/2021/04/Antique-Persian-Heriz-Serapi-Rug-3-scaled.jpg" 
             alt="Antique Persian Rug" 
             className="w-full h-full object-cover opacity-50 blur-sm brightness-75 transition-all duration-1000"
           />
           <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/20 to-transparent" />
        </div>
        <div className="z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="mb-4 inline-block px-4 py-1 border border-white/20 rounded-full backdrop-blur-md bg-white/5">
             <span className="text-[10px] uppercase tracking-[0.4em] text-white/80 font-bold">EST. 1986 — Washington D.C.</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-8 leading-[1.1] tracking-tight">
             Art for <br/><span className="italic text-[var(--color-atlas-red)]">Your Floor</span>
          </h1>
          <p className="text-lg md:text-2xl text-stone-200 mb-10 font-light max-w-3xl mx-auto leading-relaxed">
            Discover a curated collection of world-class antique and modern rugs. Now previewable in your space with advanced AR.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button asChild size="lg" variant="luxury" className="h-16 px-10 text-base shadow-2xl shadow-red-900/40">
              <Link href="/catalog">Explore Collection</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-16 px-10 bg-white/5 text-white border-white/30 backdrop-blur-md hover:bg-white hover:text-black transition-all">
              <Link href="/showroom">Visit Showroom</Link>
            </Button>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
           <div className="w-px h-12 bg-gradient-to-b from-white/0 via-white/50 to-white/0" />
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-24 px-4 md:px-8 bg-white">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 text-center md:text-left gap-4">
            <div>
               <span className="text-[var(--color-atlas-red)] font-bold uppercase tracking-[0.2em] text-xs mb-3 block">Curated Selection</span>
              <h2 className="text-4xl md:text-5xl font-serif text-stone-900">Featured Masterpieces</h2>
            </div>
            <Link href="/catalog" className="flex items-center text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-[var(--color-atlas-red)] transition-colors border-b border-stone-200 pb-1">
              View Complete Catalog <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {featuredProducts.map(product => (
              <RugCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Value Prop / AR Teaser */}
      <section className="py-24 bg-stone-950 text-stone-50 overflow-hidden">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-20 items-center">
           <div className="relative group">
              <div className="absolute -inset-4 bg-[var(--color-atlas-red)]/20 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?q=80&w=1200&auto=format&fit=crop" 
                  alt="AR Visualization"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                   <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/10">
                     <div className="flex items-center gap-4 mb-2">
                        <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-xs font-bold uppercase tracking-widest text-white/80">AR Live Preview Active</span>
                     </div>
                     <p className="text-sm text-stone-300">"The colors matched perfectly with my sofa before I even visited the showroom."</p>
                   </div>
                </div>
              </div>
           </div>
           
           <div className="max-w-xl">
             <span className="text-[var(--color-atlas-red)] font-bold uppercase tracking-[0.2em] text-xs mb-4 block">Innovation</span>
             <h2 className="text-4xl md:text-6xl font-serif mb-8 text-white leading-tight">
               Precision <br /> Visualization
             </h2>
             <p className="text-stone-400 text-lg mb-10 leading-relaxed font-light">
               Choosing the perfect rug is an investment in your home. Our proprietary AR tool ensures you make the right choice by virtually placing our inventory in your room with photorealistic accuracy.
             </p>
             
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                <div className="space-y-2">
                   <div className="h-px w-8 bg-[var(--color-atlas-red)] mb-4" />
                   <h4 className="font-bold text-sm uppercase tracking-widest">Instant Scale</h4>
                   <p className="text-xs text-stone-500">Auto-detects room dimensions for perfect sizing.</p>
                </div>
                <div className="space-y-2">
                   <div className="h-px w-8 bg-[var(--color-atlas-red)] mb-4" />
                   <h4 className="font-bold text-sm uppercase tracking-widest">Natural Light</h4>
                   <p className="text-xs text-stone-500">Adapts to your room's lighting conditions.</p>
                </div>
                <div className="space-y-2">
                   <div className="h-px w-8 bg-[var(--color-atlas-red)] mb-4" />
                   <h4 className="font-bold text-sm uppercase tracking-widest">360° Viewing</h4>
                   <p className="text-xs text-stone-500">View from any angle in your room.</p>
                </div>
                <div className="space-y-2">
                   <div className="h-px w-8 bg-[var(--color-atlas-red)] mb-4" />
                   <h4 className="font-bold text-sm uppercase tracking-widest">No App Needed</h4>
                   <p className="text-xs text-stone-500">Works directly in your mobile browser.</p>
                </div>
             </div>

             <Button asChild variant="luxury" size="lg" className="h-14 px-8">
               <Link href="/catalog">Launch Visualizer</Link>
             </Button>
           </div>
        </div>
      </section>


      <Footer />
    </div>
  );
}
