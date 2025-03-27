import { useState } from 'react'
import { ZoomIn, ZoomOut } from 'lucide-react'
import { motion } from 'framer-motion'

/**
 * A reusable component for displaying images with captions in the tutorial
 * @param {Object} props Component properties
 * @param {string} props.src Image source URL
 * @param {string} props.alt Image alt text
 * @param {string} props.caption Caption text to display below the image
 * @param {boolean} props.zoomable Whether the image can be zoomed on click
 * @param {string} props.width Optional width class (defaults to full width)
 */
const ImageWithCaption = ({ src, alt, caption, zoomable = true, width = "w-full" }) => {
  const [zoomed, setZoomed] = useState(false)

  const toggleZoom = () => {
    if (zoomable) {
      setZoomed(!zoomed)
    }
  }

  return (
    <div className={`my-4 mx-auto ${width}`}>
      <div 
        className={`relative tutorial-image group ${zoomable ? 'cursor-zoom-in' : ''} ${zoomed ? 'cursor-zoom-out' : ''}`}
      >
        <motion.div
          animate={{ 
            scale: zoomed ? 1.5 : 1,
            zIndex: zoomed ? 50 : 1
          }}
          transition={{ duration: 0.3 }}
          className="zoom-image-container"
        >
          <img 
            src={src} 
            alt={alt} 
            className="w-full"
            onClick={toggleZoom}
          />
        </motion.div>
        
        {zoomable && (
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={toggleZoom}
              className="p-1 bg-white/80 dark:bg-surface-800/80 rounded-full shadow-sm"
              aria-label={zoomed ? "Zoom out" : "Zoom in"}
            >
              {zoomed ? <ZoomOut size={16} /> : <ZoomIn size={16} />}
            </button>
          </div>
        )}
      </div>
      
      {caption && (
        <p className="tutorial-image-caption">{caption}</p>
      )}
    </div>
  )
}

export default ImageWithCaption