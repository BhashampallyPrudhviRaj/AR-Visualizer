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
      <section className="relative h-[80vh] w-full bg-stone-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-60">
           {/* Placeholder for Hero Image - using a nice gradient/image until asset available */}
           <img 
             src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop" 
             alt="Luxury Living Room" 
             className="w-full h-full object-cover"
           />
        </div>
        <div className="z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-6 leading-tight">
             Transform Your Space <br/> With Timeless Art
          </h1>
          <p className="text-lg md:text-xl text-stone-200 mb-8 font-light max-w-2xl mx-auto">
            Experience our curated collection of luxury rugs in your own home using our augmented reality visuals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="luxury">
              <Link href="/catalog">Browse Collection</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-stone-900">
              <Link href="/about">Our Story</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-20 px-4 md:px-8 bg-stone-50">
        <div className="container mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-2">Featured Arrivals</h2>
              <div className="h-1 w-20 bg-gold-500"></div>
            </div>
            <Link href="/catalog" className="hidden md:flex items-center text-stone-900 hover:text-gold-600 transition-colors font-medium">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map(product => (
              <RugCard key={product.id} product={product} />
            ))}
          </div>
          
           <div className="mt-12 text-center md:hidden">
            <Button asChild variant="outline">
              <Link href="/catalog">View All Collection</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Value Prop / AR Teaser */}
      <section className="py-20 bg-stone-900 text-stone-50">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
           <div className="order-2 md:order-1">
             <div className="relative aspect-square md:aspect-[4/3] rounded-lg overflow-hidden bg-stone-800">
               <img 
                 src="https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?q=80&w=1200&auto=format&fit=crop" 
                 alt="Phone showing AR Rug"
                 className="w-full h-full object-cover opacity-80" 
               />
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/10 backdrop-blur-md rounded-full p-6 border border-white/20">
                    <span className="font-serif text-2xl">AR Live View</span>
                  </div>
               </div>
             </div>
           </div>
           
           <div className="order-1 md:order-2">
             <h2 className="text-3xl md:text-5xl font-serif mb-6 text-white">
               See It Before <br /> You Buy It
             </h2>
             <p className="text-stone-300 text-lg mb-8 leading-relaxed">
               Unsure about the size or color? Our Augmented Reality tool lets you virtually place any rug in your room using your smartphone camera. No app download required.
             </p>
             <ul className="space-y-4 mb-8 text-stone-300">
               <li className="flex items-center gap-3">
                 <span className="h-2 w-2 rounded-full bg-gold-500"></span>
                 True-to-scale visualization
               </li>
               <li className="flex items-center gap-3">
                 <span className="h-2 w-2 rounded-full bg-gold-500"></span>
                 Works on iOS and Android
               </li>
               <li className="flex items-center gap-3">
                 <span className="h-2 w-2 rounded-full bg-gold-500"></span>
                 Instant "Try in Room" experience
               </li>
             </ul>
             <Button asChild variant="luxury" size="lg">
               <Link href="/catalog">Try it Now</Link>
             </Button>
           </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
