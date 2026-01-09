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
  const [viewMode, setViewMode] = useState<'choice' | '3d' | '2d'>('choice')

  if (viewMode === 'choice') {
    return (
      <div className="fixed inset-0 z-50 bg-stone-900 flex flex-col items-center justify-center p-6 text-white">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-serif">View {product.title}</h1>
            <p className="text-stone-400">Choose how you&apos;d like to visualize this rug in your space.</p>
          </div>

          <div className="grid gap-4">
            <Button 
              size="lg" 
              variant="luxury"
              className="h-24 text-stone-50 hover:bg-red-900/90 flex flex-col gap-1 items-center justify-center shadow-xl"
              onClick={() => setViewMode('3d')}
            >
              <span className="text-lg font-bold">Standard 3D / AR</span>
              <span className="text-xs opacity-80">Uses Augmented Reality (Mobile only)</span>
            </Button>

            <Button 
              size="lg" 
              variant="outline"
              className="h-24 border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/40 flex flex-col gap-1 items-center justify-center backdrop-blur-sm"
              onClick={() => setViewMode('2d')}
            >
              <span className="text-lg font-bold">2D Room Visualizer</span>
              <span className="text-xs opacity-60">Upload photo or use live camera</span>
            </Button>
          </div>

          <Button variant="ghost" className="text-stone-500 hover:text-white" onClick={() => window.history.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-screen w-full">
      <div className="absolute top-4 left-4 z-50 flex gap-2">
        <Button variant="ghost" className="text-white bg-black/20 backdrop-blur-sm rounded-full" onClick={() => setViewMode('choice')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Change Mode
        </Button>
      </div>

      {viewMode === '3d' ? (
        <ArViewer 
          src={product.model_url} 
          alt={product.title} 
          poster={product.image_url} 
        />
      ) : (
        <RoomVisualizer 
          rugImageUrl={product.image_url} 
          onClose={() => setViewMode('choice')} 
        />
      )}
    </div>
  )
}
