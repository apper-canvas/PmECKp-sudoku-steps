import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Info, Award, ChevronRight } from 'lucide-react'
import MainFeature from '../components/MainFeature'

const Home = () => {
  const [showIntro, setShowIntro] = useState(true)
  
  return (
    <div className="max-w-5xl mx-auto">
      <AnimatePresence mode="wait">
        {showIntro ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <section className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Master Sudoku Step by Step
              </h1>
              <p className="text-lg text-surface-600 dark:text-surface-300 max-w-2xl mx-auto">
                Learn Sudoku progressively through increasing grid sizes and difficulty levels, 
                from beginner-friendly 4×4 puzzles to challenging 9×9 grids.
              </p>
            </section>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
              {[
                {
                  title: "Progressive Learning",
                  icon: <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary">
                    <span className="text-2xl font-bold">4×4</span>
                  </div>,
                  description: "Start with simple 4×4 grids, then advance to 6×6 and finally master the classic 9×9 puzzles."
                },
                {
                  title: "Difficulty Levels",
                  icon: <div className="w-12 h-12 rounded-xl bg-secondary/10 dark:bg-secondary/20 flex items-center justify-center text-secondary">
                    <Award size={24} />
                  </div>,
                  description: "Each grid size offers three difficulty levels: Easy, Medium, and Hard to match your growing skills."
                },
                {
                  title: "Learning Assistance",
                  icon: <div className="w-12 h-12 rounded-xl bg-accent/10 dark:bg-accent/20 flex items-center justify-center text-accent">
                    <Info size={24} />
                  </div>,
                  description: "Get hints, validation feedback, and learn Sudoku solving techniques as you play."
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.3 }}
                  className="card hover:shadow-soft group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      {feature.icon}
                      <h3 className="text-xl font-semibold">{feature.title}</h3>
                    </div>
                    <p className="text-surface-600 dark:text-surface-300">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex justify-center"
            >
              <button 
                onClick={() => setShowIntro(false)}
                className="btn btn-primary flex items-center gap-2 px-6 py-3 text-lg"
              >
                Start Playing <ChevronRight size={20} />
              </button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="game"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <MainFeature />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Home