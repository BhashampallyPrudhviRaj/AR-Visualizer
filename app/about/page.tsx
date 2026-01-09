import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-16 md:py-24 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-serif text-stone-900 mb-8">Our Story</h1>
        <div className="prose prose-stone lg:prose-xl">
          <p className="text-xl text-stone-600 mb-6 italic font-serif">
            Crafting elegance, one thread at a time.
          </p>
          <p className="mb-4">
            Luxe Rugs was founded on a simple principle: that every home deserves a foundation of beauty and comfort. 
            For over two decades, we have traveled the world to source the finest materials and partner with 
            artisans who have mastered the ancient art of weaving.
          </p>
          <p className="mb-4">
            Our collection is a curated blend of traditional heritage and modern design, ensuring that 
            whether you are looking for an heirloom-quality Oushak or a sleek geometric statement piece, 
            you will find it here.
          </p>
          <div className="bg-stone-50 p-8 rounded-lg border border-stone-100 my-12">
            <h2 className="text-2xl font-serif text-stone-900 mb-4 italic">Our Commitment</h2>
            <p className="text-stone-700">
              We are committed to ethical sourcing, sustainable practices, and the preservation of 
              traditional craftsmanship. Every rug in our collection tells a story of heritage, 
              dedication, and unmatched quality.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
