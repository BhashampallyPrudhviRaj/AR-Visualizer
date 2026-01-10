import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, MapPin, Phone, Clock } from "lucide-react"

export default function ShowroomPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 md:px-8 max-w-5xl mx-auto">
      <Link href="/" className="inline-flex items-center text-stone-500 hover:text-[var(--color-atlas-red)] mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
      </Link>
      
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-6">
          <h1 className="text-4xl font-serif text-[var(--color-atlas-red)]">Our Showroom</h1>
          <p className="text-lg text-stone-600 leading-relaxed font-light">
            Located in the heart of Fort Worth, Texas, our gallery is a sanctuary for rug lovers. 
            We invite you to visit us and explore our vast collection in person.
          </p>
    

          <div className="space-y-4 pt-4">
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-[var(--color-atlas-green)] shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-stone-900">Address</h3>
                <p className="text-stone-600">
                  1234 Fort Worth<br/>
                  Texas
              </p>
              </div>
            </div>
              
            

            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-[var(--color-atlas-green)] shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-stone-900">Contact</h3>
                <p className="text-stone-600">
                  (202) 555-0123<br/>
                  info@atlasruggallery.com
                </p>
               
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Clock className="w-6 h-6 text-[var(--color-atlas-green)] shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-stone-900">Hours</h3>
                <p className="text-stone-600">
                  Mon - Sat: 10:00 AM - 6:00 PM<br/>
                  Sunday: By Appointment
                </p>
              
              </div>
            </div>
          </div>

          <div className="pt-6">
            <Button asChild variant="luxury" size="lg">
              <Link href="https://maps.google.com" target="_blank">
                Get Directions
              </Link>
            </Button>
            
          </div>
        </div>

        <div className="relative aspect-[4/5] md:aspect-square bg-stone-200 rounded-lg overflow-hidden shadow-2xl">
           <img 
             src="https://atlasruggallery.com/index_htm_files/2973@2x.jpg" 
             alt="Atlas Rug Gallery Showroom Interior" 
             className="w-full h-full object-cover"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
           <div className="absolute bottom-6 left-6 text-white">
             <p className="font-serif italic text-xl">"A tradition of excellence."</p>
           </div>
        </div>
      </div>
      
    </div>
  )
}


