import Link from "next/link"
import { getProducts } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2 } from "lucide-react"

export default async function AdminPage() {
  const products = await getProducts()

  return (
    <div className="min-h-screen bg-stone-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-serif text-stone-900">Product Dashboard</h1>
            <p className="text-stone-500">Manage your rug catalog invetory.</p>
          </div>
          <Button asChild variant="luxury">
            <Link href="/admin/add">
              <Plus className="mr-2 h-4 w-4" /> Add Product
            </Link>
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-stone-200 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-stone-100 border-b border-stone-200">
              <tr>
                <th className="p-4 font-medium text-stone-700">Image</th>
                <th className="p-4 font-medium text-stone-700">Name</th>
                <th className="p-4 font-medium text-stone-700">Category</th>
                <th className="p-4 font-medium text-stone-700">Price</th>
                <th className="p-4 font-medium text-stone-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-stone-50">
                  <td className="p-4">
                    <img src={product.image_url} alt={product.title} className="w-12 h-16 object-cover rounded" />
                  </td>
                  <td className="p-4 font-medium text-stone-900">{product.title}</td>
                  <td className="p-4 text-stone-500">{product.category}</td>
                  <td className="p-4 text-stone-900">${product.price.toLocaleString()}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                       <Button size="icon" variant="ghost" className="h-8 w-8 text-stone-500 hover:text-stone-900">
                         <Edit className="h-4 w-4" />
                       </Button>
                       <Button size="icon" variant="ghost" className="h-8 w-8 text-stone-500 hover:text-red-600">
                         <Trash2 className="h-4 w-4" />
                       </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {products.length === 0 && (
             <div className="p-12 text-center text-stone-500">
               No products found. Add your first rug.
             </div>
          )}
        </div>
      </div>
    </div>
  )
}
