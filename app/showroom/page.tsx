import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, MapPin, Phone, Clock } from "lucide-react"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"

export default function ShowroomPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <div className="pt-12 pb-24 px-4 md:px-8 max-w-6xl mx-auto">
          <Link href="/" className="inline-flex items-center text-stone-500 hover:text-[var(--color-atlas-red)] mb-12 transition-colors uppercase text-xs font-bold tracking-widest">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
          </Link>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10 order-2 lg:order-1">
              <div>
                <span className="text-[var(--color-atlas-red)] font-bold uppercase tracking-[0.2em] text-xs mb-3 block">Visit Our Gallery</span>
                <h1 className="text-5xl md:text-7xl font-serif text-stone-900 leading-tight mb-6">Our Showroom</h1>
                <p className="text-xl text-stone-600 leading-relaxed font-light">
                  Located in the historic heart of Georgetown, Washington D.C., our gallery is a sanctuary for connoisseurs of fine textiles. 
                  Experience the depth and character of our collection in person.
                </p>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-full bg-stone-50 flex items-center justify-center text-[var(--color-atlas-red)]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg text-stone-900 mb-2">Location</h3>
                    <p className="text-stone-500 font-light leading-relaxed">
                      3214 O St NW<br/>
                      Washington, DC 20007
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-full bg-stone-50 flex items-center justify-center text-[var(--color-atlas-red)]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg text-stone-900 mb-2">Contact</h3>
                    <p className="text-stone-500 font-light leading-relaxed">
                      (202) 333-0400<br/>
                      sales@atlasruggallery.com
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-full bg-stone-50 flex items-center justify-center text-[var(--color-atlas-red)]">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg text-stone-900 mb-2">Gallery Hours</h3>
                    <p className="text-stone-500 font-light leading-relaxed">
                      Mon - Sat: 10:00 AM - 6:00 PM<br/>
                      Sunday: By Appointment
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button asChild variant="luxury" size="lg" className="h-16 px-10">
                  <Link href="https://maps.google.com/?q=Atlas+Rug+Gallery+Washington+DC" target="_blank">
                    Get Directions
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative group order-1 lg:order-2">
               <div className="absolute -inset-4 bg-stone-100 rounded-lg blur-2xl opacity-50 transition-opacity group-hover:opacity-100" />
               <div className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-2xl">
                  <img 
                    src="https://atlasruggallery.com/wp-content/uploads/2021/04/Turkish-Oshak-Rug-1-scaled.jpg" 
                    alt="Atlas Rug Gallery Interior" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
               </div>
               <div className="absolute -bottom-6 -right-6 bg-[var(--color-atlas-red)] p-8 text-white shadow-2xl max-w-[240px]">
                  <p className="font-serif italic text-lg leading-tight">"A tradition of excellence in every thread."</p>
               </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

