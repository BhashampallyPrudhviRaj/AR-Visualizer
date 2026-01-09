"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Box, Smartphone } from "lucide-react"
import { QRCodeModal } from "@/components/ui/qr-modal"
import { Product } from "@/lib/api"

interface ProductActionsProps {
  product: Product
}

export function ProductActions({ product }: ProductActionsProps) {
  const [showQR, setShowQR] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const [currentUrl, setCurrentUrl] = useState("")

  useEffect(() => {
    // Basic desktop detection
    const checkDesktop = () => {
      setIsDesktop(window.matchMedia("(min-width: 768px)").matches)
      setCurrentUrl(`${window.location.origin}/AR-Visualizer/ar/${product.slug}/`)
    }
    
    checkDesktop()
    window.addEventListener('resize', checkDesktop)
    return () => window.removeEventListener('resize', checkDesktop)
  }, [product.slug])

  const handleArClick = (e: React.MouseEvent) => {
    // If desktop, show QR code instead of navigating
    // Users can still navigate if they want to use 2D fallback by clicking a secondary link or if we assume AR page handles 2D
    // But requirement says "For incompatible devices... generate a QR code"
    // We'll let them choose: Main button -> QR Code on desktop, Link on mobile.
    
    if (isDesktop) {
       e.preventDefault()
       setShowQR(true)
    }
  }

  return (
    <>
      <div className="flex flex-col gap-4 sticky top-24">
         <Button 
           asChild 
           size="lg" 
           variant="luxury" 
           className="w-full text-lg h-14 cursor-pointer"
           onClick={handleArClick}
         >
           <Link href={`/ar/${product.slug}`}>
             <Box className="mr-2 h-5 w-5" /> View in Your Room
           </Link>
         </Button>

         {/* Secondary option for Desktop users who WANT the 2D fallback explicitly */}
         {isDesktop && (
            <Button asChild size="sm" variant="ghost" className="text-xs text-stone-500 hover:text-stone-900">
               <Link href={`/ar/${product.slug}`}>
                 Use 2D Room Visualizer instead
               </Link>
            </Button>
         )}

         <Button size="lg" variant="secondary" className="w-full">
           Add to Cart
         </Button>
         
         {!isDesktop && (
            <p className="text-xs text-center text-stone-500 mt-2">
              * Best experienced on iOS (Safari) and Android (Chrome).
            </p>
         )}
      </div>

      <QRCodeModal 
        isOpen={showQR} 
        onClose={() => setShowQR(false)} 
        url={currentUrl} 
        title={product.title}
      />
    </>
  )
}
