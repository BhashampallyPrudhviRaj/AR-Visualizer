"use client"

import { useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Image as ImageIcon } from 'lucide-react'
import { Product } from '@/lib/api'

// Dynamic imports
const ArViewer = dynamic(() => import('@/components/ar/ArViewer'), { ssr: false })
const RoomVisualizer = dynamic(() => import('@/components/ar/RoomVisualizer').then(mod => mod.RoomVisualizer), { ssr: false })

interface ArClientPageProps {
  product: Product
}

export default function ArClientPage({ product }: ArClientPageProps) {
  const [show2D, setShow2D] = useState(false)

  const modelUrl = product.model_url || 'https://modelviewer.dev/shared-assets/models/Astronaut.glb';

  return (
    <div className="fixed inset-0 z-50 bg-stone-900 flex flex-col">
       {/* 2D Mode Overlay */}
       {show2D && (
         <RoomVisualizer 
           rugImageUrl={product.image_url} 
           onClose={() => setShow2D(false)} 
         />
       )}

       {/* AR Header */}
       <div className="absolute top-0 left-0 right-0 z-10 p-4 flex justify-between items-start pointer-events-none">
          <Button asChild size="icon" variant="ghost" className="pointer-events-auto bg-white/20 hover:bg-white/40 text-white backdrop-blur-md rounded-full">
            <Link href={`/product/${product.slug}`}>
               <ArrowLeft className="w-6 h-6" />
            </Link>
          </Button>
          
          <div className="flex gap-2 pointer-events-auto">
             <Button 
               size="sm" 
               variant="ghost" 
               onClick={() => setShow2D(true)}
               className="bg-white/20 hover:bg-white/40 text-white backdrop-blur-md border-0"
             >
               <ImageIcon className="w-4 h-4 mr-2" /> 2D Preview
             </Button>
             <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm font-medium hidden sm:block">
                {product.title}
             </div>
          </div>
       </div>

       {/* Main AR View */}
       <div className="flex-1 w-full relative">
          <ArViewer 
            src={modelUrl}
            iosSrc={modelUrl} 
            alt={`3D model of ${product.title}`}
            poster={product.image_url}
          />
       </div>

       {/* Footer / Instructions */}
       {!show2D && (
         <div className="absolute bottom-8 left-0 right-0 z-10 flex flex-col items-center pointer-events-none gap-2">
             <p className="text-white/80 text-xs bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
                 Point camera at floor &bull; Tap to place
             </p>
         </div>
       )}
    </div>
  )
}
