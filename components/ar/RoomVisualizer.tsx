import { useState, useRef } from 'react'
import { useGesture } from '@use-gesture/react'
import { Button } from '@/components/ui/button'
import { Upload, X, Camera } from 'lucide-react'

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
  const bind = useGesture(
    {
      onDrag: ({ offset: [x, y] }) => {
        setPosition({ x, y })
      },
      onPinch: ({ offset: [s, a] }) => {
         setScale(s)
         setRotation(a)
      },
      onWheel: ({ delta: [, dy], ctrlKey }) => {
         if (ctrlKey) {
            setScale(s => Math.max(0.5, Math.min(3, s - dy * 0.01)))
         }
      }
    },
    {
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
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center touch-none overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--color-atlas-red-dark)_0%,_#000000_100%)]">
      {/* Header / Controls */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-30 bg-gradient-to-b from-black/80 to-transparent pointer-events-none px-6">
        <Button variant="ghost" className="text-white pointer-events-auto bg-black/20 backdrop-blur-sm rounded-full border border-white/10" onClick={() => { stopCamera(); onClose(); }}>
          <X className="mr-2 h-4 w-4" /> Exit
        </Button>

        <div className="flex items-center gap-2 pointer-events-auto">
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
            <div className="flex h-9 items-center justify-center rounded-md bg-white/10 px-3 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all">
               Change Rug
            </div>
          </label>
        </div>
      </div>

      {/* Main Viewport */}
      <div className="relative w-full h-full flex items-center justify-center bg-transparent">
        {/* Live Video Background */}
        <video 
          ref={videoRef}
          autoPlay 
          playsInline 
          muted 
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${isCameraActive ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* Static Room Background */}
        {roomImage && !isCameraActive && (
          <img 
            src={roomImage} 
            alt="Room" 
            className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none transition-opacity duration-700" 
          />
        )}

        {/* Empty State */}
        {!isCameraActive && !roomImage && (
          <div className="text-center p-8 max-w-sm z-10">
            <div className="mb-6 flex justify-center">
               <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center border border-white/20 backdrop-blur-md">
                 <Camera className="w-8 h-8 text-white" />
               </div>
            </div>
            <h3 className="text-3xl font-serif text-white mb-2">Room Visualizer</h3>
            <p className="text-white/60 mb-8 text-sm">See how any rug looks in your space. Choose a live view or upload a photo.</p>
            
             <div className="flex flex-col gap-4 w-full max-w-xs mx-auto">
               <Button size="lg" variant="luxury" onClick={startCamera} className="h-14 text-base w-full shadow-xl shadow-black/50">
                 <Camera className="w-5 h-5 mr-3" /> Start Live Camera
               </Button>
               
               <div className="flex items-center gap-4 w-full px-4">
                  <div className="h-px bg-white/10 flex-1" />
                  <span className="text-white/30 text-xs font-bold tracking-widest uppercase">OR</span>
                  <div className="h-px bg-white/10 flex-1" />
               </div>

               <label className="cursor-pointer w-full">
                 <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                  <div className="flex h-14 w-full items-center justify-center rounded-md border border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30 transition-all font-semibold uppercase tracking-wider text-sm backdrop-blur-sm">
                    <Upload className="w-5 h-5 mr-3" /> Upload Room Photo
                  </div>
               </label>
            </div>
          </div>
        )}

        {/* The Adjustable Rug Overlay (Visible only when camera/photo exists) */}
        {(isCameraActive || roomImage) && (
          <div 
             {...bind()}
             ref={containerRef}
             className="absolute top-1/2 left-1/2 cursor-move touch-none z-20"
             style={{
               transform: `translate(-50%, -50%) translate(${position.x}px, ${position.y}px) rotate(${rotation}deg) scale(${scale})`,
               touchAction: 'none' 
             }}
          >
             <div className="relative group">
                <img 
                   src={activeRugUrl} 
                   alt="Rug" 
                   className="max-w-[70vw] md:max-w-[500px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] pointer-events-none select-none border border-white/10" 
                   style={{ transform: 'perspective(1200px) rotateX(30deg)' }} 
                />
                <div className="absolute inset-0 border-2 border-white/20 rounded-sm pointer-events-none group-hover:border-white/40 transition-colors" />
             </div>
          </div>
        )}

        {/* Instructions */}
        {(isCameraActive || roomImage) && (
          <div className="absolute bottom-32 left-0 right-0 text-center pointer-events-none z-30">
             <span className="bg-black/40 text-white/90 text-[10px] uppercase font-bold tracking-[0.2em] px-4 py-2 rounded-full border border-white/10 backdrop-blur-xl">
                Pinch • Rotate • Drag to Place
             </span>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      {(isCameraActive || roomImage) && (
        <div className="absolute bottom-0 left-0 right-0 bg-stone-900/40 backdrop-blur-2xl border-t border-white/10 p-6 z-40 flex justify-center gap-4">
           <Button variant="ghost" className="text-white hover:bg-white/10 border border-white/5" onClick={() => { setScale(1); setRotation(0); setPosition({x:0, y:0}); }}>
             Reset Rug
           </Button>
           <Button variant="outline" className="border-white/20 text-white bg-white/5" onClick={() => { setRoomImage(null); setCustomRugUrl(null); stopCamera(); }}>
             New Scene
           </Button>
        </div>
      )}

    </div>
  )
}
