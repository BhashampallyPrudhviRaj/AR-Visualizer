"use client"

import { QRCodeSVG } from 'qrcode.react'
import { X, Smartphone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface QRCodeModalProps {
  isOpen: boolean
  onClose: () => void
  url: string
  title: string
}

export function QRCodeModal({ isOpen, onClose, url, title }: QRCodeModalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!mounted || !isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-sm w-full p-6 relative animate-in fade-in zoom-in-95 duration-200">
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-2 top-2 text-stone-400 hover:text-stone-900"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>

        <div className="text-center space-y-4">
          <div className="mx-auto bg-stone-100 h-12 w-12 rounded-full flex items-center justify-center">
            <Smartphone className="h-6 w-6 text-stone-900" />
          </div>
          
          <div>
            <h3 className="text-lg font-serif font-bold text-stone-900">View in Your Room</h3>
            <p className="text-sm text-stone-500 mt-1">Scan to see "{title}" in AR</p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-stone-200 inline-block shadow-inner">
             <QRCodeSVG value={url} size={180} level="M" />
          </div>

          <p className="text-xs text-stone-400">
            Open your camera app and point it at the QR code to launch the experience instantly. No app download required.
          </p>
        </div>
      </div>
    </div>,
    document.body
  )
}
