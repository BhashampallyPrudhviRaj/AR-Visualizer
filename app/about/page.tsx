import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 md:px-8 max-w-4xl mx-auto">
      <Link href="/" className="inline-flex items-center text-stone-500 hover:text-[var(--color-atlas-red)] mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
      </Link>
      
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-serif text-[var(--color-atlas-red)]">Our Story</h1>
          <p className="text-xl text-stone-600 leading-relaxed font-light">
            Since 1986, Atlas Rug Gallery has been the premier destination for fine antique and decorative rugs in the Washington DC metropolitan area.
          </p>
        </div>

        <div className="prose prose-stone max-w-none">
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

        <div className="bg-stone-100 p-8 rounded-lg mt-12 border-l-4 border-[var(--color-atlas-green)]">
          <h3 className="text-xl font-bold mb-2">Visit Our Gallery</h3>
          <p className="text-stone-700">
            Experience the texture and colors in person. Our showroom offers a welcoming atmosphere where you can see, touch, and feel the history woven into every rug.
          </p>
        </div>
      </div>
    </div>
  )
}
