import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Moon, Sun, BookOpen } from 'lucide-react'
import { motion } from 'framer-motion'
import Home from './pages/Home'
import SudokuGuide from './pages/SudokuGuide'
import NotFound from './pages/NotFound'

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode')
    return savedMode ? JSON.parse(savedMode) : 
      window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 to-surface-100 dark:from-surface-900 dark:to-surface-800 transition-colors duration-300">
      <header className="py-4 px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <h1 className="text-xl font-bold text-surface-800 dark:text-white">
            SudokuSteps
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/guide"
            className="flex items-center gap-1 text-surface-700 dark:text-surface-200 hover:text-primary dark:hover:text-primary transition-colors px-3 py-1.5 rounded-lg hover:bg-surface-200 dark:hover:bg-surface-700"
          >
            <BookOpen size={18} />
            <span className="hidden sm:inline">Sudoku Guide</span>
          </motion.a>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-surface-200 dark:bg-surface-700 text-surface-700 dark:text-surface-200 hover:bg-surface-300 dark:hover:bg-surface-600 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/guide" element={<SudokuGuide />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      
      <footer className="py-6 px-4 text-center text-surface-600 dark:text-surface-400 text-sm">
        <p>© {new Date().getFullYear()} SudokuSteps. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App