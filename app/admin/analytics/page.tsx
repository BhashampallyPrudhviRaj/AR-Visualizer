import Link from "next/link"
import { ArrowLeft, Eye, Smartphone, MousePointer } from "lucide-react"

export default function AnalyticsPage() {
  // Mock analytics data
  const stats = [
    { label: "Total Catalog Views", value: "1,245", icon: Eye, color: "text-blue-500" },
    { label: "AR Sessions Started", value: "320", icon: Smartphone, color: "text-gold-600" },
    { label: "View in Room Clicks", value: "480", icon: MousePointer, color: "text-green-500" },
    { label: "Avg. Time in AR", value: "45s", icon: Smartphone, color: "text-purple-500" },
  ]

  return (
    <div className="min-h-screen bg-stone-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
           <Link href="/admin" className="p-2 hover:bg-stone-200 rounded-full transition-colors">
              <ArrowLeft className="h-5 w-5 text-stone-500" />
           </Link>
           <h1 className="text-3xl font-serif text-stone-900">Analytics Insights</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
           {stats.map((stat, i) => (
             <div key={i} className="bg-white p-6 rounded-lg shadow-sm border border-stone-200 flex items-start justify-between">
                <div>
                  <p className="text-stone-500 text-sm font-medium mb-1">{stat.label}</p>
                  <h3 className="text-3xl font-bold text-stone-900">{stat.value}</h3>
                </div>
                <div className={`p-3 bg-stone-50 rounded-full ${stat.color}`}>
                   <stat.icon className="h-6 w-6" />
                </div>
             </div>
           ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200">
             <h3 className="font-medium text-stone-900 mb-6">Top Viewed Products</h3>
             <ul className="space-y-4">
               {[1, 2, 3, 4, 5].map((i) => (
                 <li key={i} className="flex items-center justify-between">
                    <span className="text-stone-600">The Imperial Oushak</span>
                    <span className="font-mono text-sm text-stone-400">{100 - i * 5} views</span>
                 </li>
               ))}
             </ul>
           </div>
           
           <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200">
             <h3 className="font-medium text-stone-900 mb-6">Device Usage</h3>
             <div className="space-y-4">
                <div>
                   <div className="flex justify-between text-sm mb-1">
                     <span className="text-stone-600">Mobile (iOS)</span>
                     <span className="text-stone-900 font-medium">65%</span>
                   </div>
                   <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                     <div className="h-full bg-gold-500 w-[65%]" />
                   </div>
                </div>
                <div>
                   <div className="flex justify-between text-sm mb-1">
                     <span className="text-stone-600">Mobile (Android)</span>
                     <span className="text-stone-900 font-medium">25%</span>
                   </div>
                   <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                     <div className="h-full bg-stone-500 w-[25%]" />
                   </div>
                </div>
                <div>
                   <div className="flex justify-between text-sm mb-1">
                     <span className="text-stone-600">Desktop</span>
                     <span className="text-stone-900 font-medium">10%</span>
                   </div>
                   <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                     <div className="h-full bg-stone-300 w-[10%]" />
                   </div>
                </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  )
}
