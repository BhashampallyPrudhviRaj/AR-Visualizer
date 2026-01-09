// @ts-nocheck
"use client"

import '@google/model-viewer';
import { Button } from '@/components/ui/button';
import { Camera, Maximize, RotateCcw } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

// Global declaration moved to types/model-viewer.d.ts

interface ArViewerProps {
  src: string | null;
  iosSrc?: string | null;
  alt: string;
  poster: string;
}

export default function ArViewer({ src, iosSrc, alt, poster }: ArViewerProps) {
  const modelViewerRef = useRef<any>(null);
  const [arStatus, setArStatus] = useState<'not-presenting' | 'presenting' | 'failed'>('not-presenting');

  useEffect(() => {
    const modelViewer = modelViewerRef.current;
    if (!modelViewer) return;

    // Log AR status changes for analytics could go here
    const handleArStatus = (event: CustomEvent) => {
      setArStatus(event.detail.status);
    };

    modelViewer.addEventListener('ar-status', handleArStatus);
    return () => {
      modelViewer.removeEventListener('ar-status', handleArStatus);
    };
  }, []);

  const activateAr = () => {
    if (modelViewerRef.current) {
      modelViewerRef.current.activateAR();
    }
  };

  return (
    <div className="relative w-full h-full bg-stone-100">
      {/* @ts-ignore */}
      <model-viewer
        ref={modelViewerRef}
        src={src || undefined}
        ios-src={iosSrc || undefined}
        alt={alt}
        poster={poster}
        ar
        ar-modes="scene-viewer quick-look webxr"
        camera-controls
        auto-rotate
        shadow-intensity="1"
        camera-orbit="0deg 75deg 105%"
        style={{ width: '100%', height: '100%' }}
      >
        <button 
            slot="ar-button" 
            className="absolute bottom-8 right-8 bg-gold-600 text-white p-4 rounded-full shadow-xl z-50 flex items-center gap-2 font-bold animate-pulse"
        >
             <Maximize className="w-6 h-6" /> View in Your Room
        </button>

        <div id="error" className="hide">
           AR is not supported on this device
        </div>
      </model-viewer>
      
      {/* Controls Overlay (Non-AR mode) */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
         <Button 
            size="icon" 
            variant="ghost" 
            className="bg-white/80 backdrop-blur"
            onClick={() => {
                // Reset camera
                const viewer = document.querySelector('model-viewer');
                // @ts-ignore
                if(viewer) viewer.cameraOrbit = "0deg 75deg 105%";
            }}
         >
           <RotateCcw className="w-4 h-4 text-stone-900" />
         </Button>
      </div>

      {src === null && (
          <div className="absolute inset-0 flex items-center justify-center bg-stone-100/90 z-20">
              <div className="text-center p-6">
                  <p className="text-lg font-serif">3D Model Not Available</p>
                  <p className="text-sm text-stone-500">Try 2D Room Preview instead.</p>
              </div>
          </div>
      )}
    </div>
  );
}
