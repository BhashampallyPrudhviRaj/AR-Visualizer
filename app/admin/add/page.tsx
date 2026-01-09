"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Save, Loader2 } from "lucide-react"

export default function AddProductPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    dimensions_label: "",
    width_cm: "",
    length_cm: "",
    category: "Modern",
    image_url: "",
    model_url: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // In a real app, calls to /api/products or Supabase client would happen here
    console.log("Submitting product:", formData)
    
    alert("Product added successfully (Mock)")
    router.push("/admin")
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-stone-50 p-8">
      <div className="max-w-2xl mx-auto">
        <Link href="/admin" className="inline-flex items-center text-stone-500 hover:text-stone-900 mb-6">
           <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Link>
        
        <h1 className="text-3xl font-serif text-stone-900 mb-8">Add New Product</h1>
        
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-sm border border-stone-200 space-y-6">
           <div className="space-y-2">
             <label className="text-sm font-medium text-stone-700">Product Title</label>
             <input type="text" name="title" required className="w-full p-2 border border-stone-300 rounded-md" 
                value={formData.title} onChange={handleChange} />
           </div>
           
           <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
                <label className="text-sm font-medium text-stone-700">Price ($)</label>
                <input type="number" name="price" required className="w-full p-2 border border-stone-300 rounded-md" 
                  value={formData.price} onChange={handleChange} />
             </div>
             <div className="space-y-2">
                <label className="text-sm font-medium text-stone-700">Category</label>
                <select name="category" className="w-full p-2 border border-stone-300 rounded-md" 
                   value={formData.category} onChange={handleChange}>
                   <option>Modern</option>
                   <option>Traditional</option>
                   <option>Vintage</option>
                   <option>Luxury</option>
                </select>
             </div>
           </div>
           
           <div className="space-y-2">
              <label className="text-sm font-medium text-stone-700">Dimensions Label</label>
              <input type="text" name="dimensions_label" placeholder="e.g. 8' x 10'" required className="w-full p-2 border border-stone-300 rounded-md" 
                value={formData.dimensions_label} onChange={handleChange} />
           </div>
           
           <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                 <label className="text-sm font-medium text-stone-700">Width (cm)</label>
                 <input type="number" name="width_cm" required className="w-full p-2 border border-stone-300 rounded-md" 
                   value={formData.width_cm} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                 <label className="text-sm font-medium text-stone-700">Length (cm)</label>
                 <input type="number" name="length_cm" required className="w-full p-2 border border-stone-300 rounded-md" 
                   value={formData.length_cm} onChange={handleChange} />
              </div>
           </div>
           
           <div className="space-y-2">
              <label className="text-sm font-medium text-stone-700">Image URL</label>
              <input type="url" name="image_url" placeholder="https://..." required className="w-full p-2 border border-stone-300 rounded-md" 
                value={formData.image_url} onChange={handleChange} />
           </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-700">3D Model URL (GLB) - Optional</label>
              <input type="url" name="model_url" placeholder="https://..." className="w-full p-2 border border-stone-300 rounded-md" 
                value={formData.model_url} onChange={handleChange} />
           </div>
           
           <div className="pt-4">
             <Button type="submit" disabled={loading} variant="luxury" className="w-full">
               {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
               Save Product
             </Button>
           </div>
        </form>
      </div>
    </div>
  )
}
