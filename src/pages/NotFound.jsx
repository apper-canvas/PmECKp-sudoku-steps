import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, AlertTriangle } from 'lucide-react'

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
            <AlertTriangle size={40} />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold">Page Not Found</h1>
        
        <p className="text-lg text-surface-600 dark:text-surface-300 max-w-md mx-auto">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 btn btn-primary px-6 py-3"
          >
            <Home size={20} />
            Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default NotFound