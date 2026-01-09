"use client"

import { useState, useRef } from 'react'
import { useGesture } from '@use-gesture/react'
import { Button } from '@/components/ui/button'
import { Upload, X } from 'lucide-react'

interface RoomVisualizerProps {
  rugImageUrl: string
  onClose: () => void
}

export function RoomVisualizer({ rugImageUrl, onClose }: RoomVisualizerProps) {
  const [roomImage, setRoomImage] = useState<string | null>(null)
  
  // Transform state
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [scale, setScale] = useState(1)
  const [rotation, setRotation] = useState(0)
  
  const containerRef = useRef<HTMLDivElement>(null)

  // Gestures
  useGesture(
    {
      onDrag: ({ offset: [x, y] }) => {
        setPosition({ x, y })
      },
      onPinch: ({ offset: [s, a], memo }) => {
         // Memo stores initial scale/rotation if needed, but here offset accumulates
         setScale(s)
         setRotation(a)
         return memo
      },
      onWheel: ({ delta: [, dy], ctrlKey }) => {
         if (ctrlKey) {
            setScale(s => Math.max(0.5, Math.min(3, s - dy * 0.01)))
         }
      }
    },
    {
      target: containerRef,
      drag: { from: () => [position.x, position.y] },
      pinch: { scaleBounds: { min: 0.5, max: 4 }, from: () => [scale, rotation] },
      eventOptions: { passive: false }
    }
  )

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0])
      setRoomImage(url)
      // Reset transforms on new image
      setPosition({ x: 0, y: 0 })
      setScale(1)
      setRotation(0)
    }
  }

  // Perspectve toggle? For now just flat 2D + perspective illusion
  
  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center touch-none">
      {/* Header / Controls */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-20 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
        <Button variant="ghost" className="text-white pointer-events-auto" onClick={onClose}>
          <X className="mr-2" /> Use 3D Mode
        </Button>
      </div>

      {/* Main Canvas Area */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-stone-900">
        {!roomImage ? (
          <div className="text-center p-8 max-w-md">
            <div className="bg-stone-800 rounded-full p-6 mx-auto w-20 h-20 flex items-center justify-center mb-6">
               <Upload className="w-8 h-8 text-stone-300" />
            </div>
            <h3 className="text-2xl font-serif text-white mb-4">Upload Your Room</h3>
            <p className="text-stone-400 mb-8">
              Take a photo of your room or upload an existing one. <br/>
              <span className="text-sm opacity-75">Use gestures to pinch, zoom, and drag the rug.</span>
            </p>
            <label className="cursor-pointer pointer-events-auto relative z-30 block">
              <input 
                type="file" 
                accept="image/*" 
                capture="environment"
                className="hidden" 
                onChange={handleFileChange} 
              />
              <span className="inline-flex h-12 items-center justify-center rounded-md bg-gold-600 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-gold-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                <Upload className="mr-2 h-4 w-4" /> Take Photo / Upload
              </span>
            </label>
          </div>
        ) : (
          <div className="relative w-full h-full overflow-hidden">
            {/* Background Room Image */}
            <img 
              src={roomImage} 
              alt="Room" 
              className="w-full h-full object-contain pointer-events-none select-none" 
            />
            
            {/* Draggable Rug Container - We attach gesture listener logic via ref if using non-react-dom-events, 
                but useGesture hook creates handlers we can spread or target via ref. 
                Using 'target' option in hook allows cleaner DOM. 
            */}
            <div 
               ref={containerRef}
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-move touch-none"
               style={{
                 transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg) scale(${scale})`,
                 touchAction: 'none' 
               }}
            >
               {/* Grid overlay helper logic could go here */}
               <div className="relative group">
                  <img 
                    src={rugImageUrl} 
                    alt="Rug" 
                    className="max-w-[300px] shadow-2xl pointer-events-none select-none" 
                    style={{ transform: 'perspective(800px) rotateX(20deg)' }} 
                  />
                  {/* Subtle border to show selection */}
                  <div className="absolute inset-0 border-2 border-white/30 rounded-sm" />
               </div>
            </div>
            
             {/* Instructions Overlay (Fades out) */}
             <div className="absolute bottom-24 left-0 right-0 text-center pointer-events-none opacity-60">
                <span className="bg-black/60 text-white text-xs px-3 py-1 rounded-full backdrop-blur-md">
                   Pinch to resize • Two fingers to rotate
                </span>
             </div>
          </div>
        )}
      </div>

      {/* Basic Reset Controls - Optional but helpful */}
      {roomImage && (
        <div className="absolute bottom-0 left-0 right-0 bg-stone-900/80 backdrop-blur border-t border-white/10 p-4 pb-8 z-20 flex justify-center gap-4">
           <Button variant="ghost" size="sm" onClick={() => { setScale(1); setRotation(0); setPosition({x:0, y:0}); }} className="text-white hover:bg-white/10">
             Reset View
           </Button>
           <Button variant="outline" size="sm" className="bg-transparent text-white border-white/20" onClick={() => setRoomImage(null)}>
             New Photo
           </Button>
        </div>
      )}
    </div>
  )
}
