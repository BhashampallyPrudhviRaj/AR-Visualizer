import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"

export default function AboutPage() {
  return (
    // <div className="min-h-screen pt-24 pb-12 px-4 md:px-8 max-w-4xl mx-auto">
    //   <Link href="/" className="inline-flex items-center text-stone-500 hover:text-[var(--color-atlas-red)] mb-8 transition-colors">
    //     <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
    //   </Link>
      
    //   <div className="space-y-8">
    //     <div className="space-y-4">
    //       <h1 className="text-4xl md:text-5xl font-serif text-[var(--color-atlas-red)]">Our Story</h1>
    //       <p className="text-xl text-stone-600 leading-relaxed font-light">
    //         Since 1986, Atlas Rug Gallery has been the premier destination for fine antique and decorative rugs in the Washington DC metropolitan area.
    //       </p>
    //     </div>


        <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <div className="pt-12 pb-24 px-4 md:px-8 max-w-5xl mx-auto">
          <Link href="/" className="inline-flex items-center text-stone-500 hover:text-[var(--color-atlas-red)] mb-12 transition-colors uppercase text-xs font-bold tracking-widest">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
          </Link>
          
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <div className="space-y-6">
                 <span className="text-[var(--color-atlas-red)] font-bold uppercase tracking-[0.2em] text-xs">A Legacy of Quality</span>
                <h1 className="text-5xl md:text-7xl font-serif text-stone-900 leading-tight">Our Story</h1>
                <p className="text-xl text-stone-600 leading-relaxed font-light">
                  Since 1986, Atlas Rug Gallery has been the premier destination for fine antique and decorative rugs, now serving the Fort Worth TX community.
                </p>
              </div>


        {/* <div className="prose prose-stone max-w-none">
          <p>
            We specialize in curating an exceptional collection of hand-knotted rugs from around the world. 
            Our passion lies in finding unique pieces that tell a story—from the intricate floral motifs of Persian Kerman rugs 
            to the bold geometric patterns of Caucasian weavings.
          </p>
          <p>
            Whether you are looking for a museum-quality antique restoration or a modern statement piece for your living room, 
            our expert team is dedicated to helping you find the perfect foundation for your space.
          </p>
        </div> */}

             <div className="prose prose-stone max-w-none text-stone-600 leading-relaxed font-light">
                <p>
                  We specialize in curating an exceptional collection of hand-knotted rugs from around the world. 
                  Our passion lies in finding unique pieces that tell a story—from the intricate floral motifs of Persian Kerman rugs 
                  to the bold geometric patterns of Caucasian weavings.
                </p>
                <p>
                  Whether you are looking for a museum-quality antique restoration or a modern statement piece for your living room, 
                  our expert team is dedicated to helping you find the perfect foundation for your space.
                </p>
              </div>

        {/* <div className="bg-stone-100 p-8 rounded-lg mt-12 border-l-4 border-[var(--color-atlas-green)]">
          <h3 className="text-xl font-bold mb-2">Visit Our Gallery</h3>
          <p className="text-stone-700">
            Experience the texture and colors in person. Our showroom offers a welcoming atmosphere where you can see, touch, and feel the history woven into every rug.
          </p> */}

                        <div className="bg-stone-50 p-10 border border-stone-100 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--color-atlas-red)]/5 rounded-bl-full transition-all group-hover:scale-110" />
                <h3 className="text-xl font-serif font-bold mb-4 text-stone-900">Visit Our Gallery</h3>
                <p className="text-stone-600 font-light mb-6">
                  Experience the texture and colors in person. Our showroom offers a welcoming atmosphere where you can see, touch, and feel the history woven into every rug.
                </p>
                <Button asChild variant="luxury">
                  <Link href="/showroom">Showroom Details</Link>
                </Button>
              </div>
            </div>
            
            <div className="relative">
               <div className="aspect-[5/5] rounded-lg overflow-hidden shadow-2xl">
                  <img 
                  src="https://atlasruggallery.com/index_htm_files/2803.jpg" 
                    alt="Atlas Rug Gallery - Our Story" 
                    className="w-full h-full object-cover"
                  />
               </div>
               <div className="absolute -bottom-8 -left-8 bg-white p-6 shadow-xl max-w-[200px]">
                  <p className="text-2xl font-serif text-[var(--color-atlas-red)] mb-1">35+</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-stone-400">Years of Excellence</p>
               </div>
            </div>
          </div>
        </div>
        </main>
      <Footer />
    </div>
  )
}
