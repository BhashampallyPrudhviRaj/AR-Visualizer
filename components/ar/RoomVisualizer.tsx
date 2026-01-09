"use client"

import { useState, useRef } from 'react'
import { useGesture } from '@use-gesture/react'
import { Button } from '@/components/ui/button'
import { Upload, X } from 'lucide-react'

interface RoomVisualizerProps {
  rugImageUrl: string
  onClose: () => void
}

export function RoomVisualizer({ rugImageUrl: initialRugUrl, onClose }: RoomVisualizerProps) {
  const [roomImage, setRoomImage] = useState<string | null>(null)
  const [customRugUrl, setCustomRugUrl] = useState<string | null>(null)
  const [isCameraActive, setIsCameraActive] = useState(false)
  
  // Transform state
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [scale, setScale] = useState(1)
  const [rotation, setRotation] = useState(0)
  
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const activeRugUrl = customRugUrl || initialRugUrl

  // Start Camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' }, 
        audio: false 
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsCameraActive(true)
        setRoomImage(null) // Clear static image if camera is on
      }
    } catch (err) {
      console.error("Camera access denied:", err)
      alert("Please allow camera access to use Live View.")
    }
  }

  // Stop Camera
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach(track => track.stop())
      setIsCameraActive(false)
    }
  }

  // Handle Rug Upload
  const handleRugUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0])
      setCustomRugUrl(url)
    }
  }

  // Gestures
  useGesture(
    {
      onDrag: ({ offset: [x, y] }) => {
        setPosition({ x, y })
      },
      onPinch: ({ offset: [s, a], memo }) => {
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
      pinch: { scaleBounds: { min: 0.1, max: 5 }, from: () => [scale, rotation] },
      eventOptions: { passive: false }
    }
  )

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0])
      setRoomImage(url)
      setIsCameraActive(false) // Turn off camera if uploading static photo
      stopCamera()
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center touch-none overflow-hidden">
      {/* Header / Controls */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start z-30 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
        <Button variant="ghost" className="text-white pointer-events-auto bg-black/20 backdrop-blur-sm rounded-full" onClick={() => { stopCamera(); onClose(); }}>
          <X className="mr-2" /> Exit
        </Button>

        <div className="flex flex-col gap-2 pointer-events-auto">
          {!isCameraActive ? (
            <Button size="sm" variant="luxury" onClick={startCamera}>
              <Camera className="w-4 h-4 mr-2" /> Live Camera
            </Button>
          ) : (
            <Button size="sm" variant="outline" className="text-white border-white/20 bg-black/40" onClick={stopCamera}>
               Stop Camera
            </Button>
          )}
          
          <label className="cursor-pointer">
            <input type="file" accept="image/*" className="hidden" onChange={handleRugUpload} />
            <div className="flex h-9 items-center justify-center rounded-md bg-white/10 px-3 text-xs font-medium text-white backdrop-blur-sm border border-white/20 hover:bg-white/20">
               Select Custom Rug Photo
            </div>
          </label>
        </div>
      </div>

      {/* Main Viewport */}
      <div className="relative w-full h-full flex items-center justify-center bg-stone-900">
        {/* Live Video Background */}
        <video 
          ref={videoRef}
          autoPlay 
          playsInline 
          muted 
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isCameraActive ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* Static Room Background */}
        {roomImage && !isCameraActive && (
          <img 
            src={roomImage} 
            alt="Room" 
            className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none" 
          />
        )}

        {/* Empty State */}
        {!isCameraActive && !roomImage && (
          <div className="text-center p-8 max-w-sm z-10">
            <h3 className="text-2xl font-serif text-white mb-6">Choose Your View</h3>
            <div className="flex flex-col gap-4">
               <Button size="lg" variant="luxury" onClick={startCamera} className="h-16">
                 <Camera className="w-6 h-6 mr-3" /> Start Live Camera
               </Button>
               <div className="text-stone-500 text-sm">--- OR ---</div>
               <label className="cursor-pointer">
                 <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                 <div className="flex h-16 items-center justify-center rounded-md border border-white/20 bg-white/5 text-white hover:bg-white/10 transition-colors">
                   <Upload className="w-6 h-6 mr-3" /> Upload Room Photo
                 </div>
               </label>
            </div>
          </div>
        )}

        {/* The Adjustable Rug Overlay (Visible only when camera/photo exists) */}
        {(isCameraActive || roomImage) && (
          <div 
             ref={containerRef}
             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-move touch-none z-20"
             style={{
               transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg) scale(${scale})`,
               touchAction: 'none' 
             }}
          >
             <div className="relative">
                <img 
                  src={activeRugUrl} 
                  alt="Rug" 
                  className="max-w-[80vw] md:max-w-[400px] shadow-2xl pointer-events-none select-none" 
                  style={{ transform: 'perspective(1000px) rotateX(25deg)' }} 
                />
                <div className="absolute inset-0 border-2 border-white/30 rounded-sm pointer-events-none" />
             </div>
          </div>
        )}

        {/* Instructions */}
        {(isCameraActive || roomImage) && (
          <div className="absolute bottom-28 left-0 right-0 text-center pointer-events-none z-30 opacity-70">
             <span className="bg-black/60 text-white text-[10px] uppercase tracking-widest px-3 py-1 rounded-full backdrop-blur-md">
                Pinch to Resize • Two Fingers to Rotate • Drag to Place
             </span>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      {(isCameraActive || roomImage) && (
        <div className="absolute bottom-0 left-0 right-0 bg-stone-900/80 backdrop-blur-lg border-t border-white/10 p-6 z-40 flex justify-center gap-4">
           <Button variant="ghost" className="text-white hover:bg-white/10" onClick={() => { setScale(1); setRotation(0); setPosition({x:0, y:0}); }}>
             Reset Rug
           </Button>
           <Button variant="outline" className="border-white/20 text-white" onClick={() => { setRoomImage(null); setCustomRugUrl(null); stopCamera(); }}>
             New Scene
           </Button>
        </div>
      )}
    </div>
  )
}
