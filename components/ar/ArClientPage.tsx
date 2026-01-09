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
  // Directly start the enhanced 2D visualizer which now supports Live Camera
  return (
    <RoomVisualizer 
      rugImageUrl={product.image_url} 
      onClose={() => window.history.back()} 
    />
  )
}
