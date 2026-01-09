import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ShowroomPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-serif text-stone-900 mb-6">Our Showroom</h1>
          <p className="text-xl text-stone-600 mb-12">
            Experience our collection in person at our flagship showroom in the heart of the design district.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 text-left">
            <div className="bg-stone-50 p-8 rounded-lg border border-stone-100">
              <h2 className="text-xl font-serif text-stone-900 mb-4">Location</h2>
              <p className="text-stone-600">
                123 Design Avenue<br />
                Suites 400-500<br />
                New York, NY 10001
              </p>
            </div>
            <div className="bg-stone-50 p-8 rounded-lg border border-stone-100">
              <h2 className="text-xl font-serif text-stone-900 mb-4">Hours</h2>
              <p className="text-stone-600">
                Monday – Friday: 9am – 6pm<br />
                Saturday: 10am – 4pm<br />
                Sunday: Closed
              </p>
            </div>
          </div>

          <div className="aspect-video bg-stone-100 rounded-2xl flex items-center justify-center border border-stone-200 mb-12 overflow-hidden relative">
             <img 
               src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop" 
               alt="Showroom" 
               className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <span className="bg-white/90 backdrop-blur px-6 py-2 rounded-full text-stone-900 font-medium">Virtual Tour Coming Soon</span>
             </div>
          </div>

          <Link href="/catalog">
            <Button variant="luxury" size="lg">Explore the Collection</Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
