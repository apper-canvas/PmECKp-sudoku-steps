import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  RefreshCw, 
  Check, 
  HelpCircle, 
  AlertCircle, 
  ChevronLeft, 
  ChevronRight,
  Clock,
  Award
} from 'lucide-react'

// Helper function to generate Sudoku puzzles
const generateSudokuPuzzle = (size, difficulty) => {
  // This is a simplified version for the MVP
  // In a real app, we would use a proper Sudoku generator algorithm
  
  const getEmptyCellCount = () => {
    const difficultyFactors = {
      easy: 0.3,
      medium: 0.5,
      hard: 0.7
    }
    return Math.floor(size * size * difficultyFactors[difficulty])
  }
  
  // Create a solved grid (simplified for demo)
  const solution = Array(size).fill().map((_, row) => 
    Array(size).fill().map((_, col) => (row + col) % size + 1)
  )
  
  // Create initial grid by removing some numbers
  const initialGrid = JSON.parse(JSON.stringify(solution))
  const emptyCellCount = getEmptyCellCount()
  
  let cellsRemoved = 0
  while (cellsRemoved < emptyCellCount) {
    const row = Math.floor(Math.random() * size)
    const col = Math.floor(Math.random() * size)
    
    if (initialGrid[row][col] !== 0) {
      initialGrid[row][col] = 0
      cellsRemoved++
    }
  }
  
  return {
    initialGrid,
    solution
  }
}

const MainFeature = () => {
  // Game state
  const [gridSize, setGridSize] = useState(4)
  const [difficulty, setDifficulty] = useState('easy')
  const [puzzle, setPuzzle] = useState(null)
  const [currentGrid, setCurrentGrid] = useState([])
  const [selectedCell, setSelectedCell] = useState(null)
  const [errors, setErrors] = useState([])
  const [gameStatus, setGameStatus] = useState('playing') // 'playing', 'paused', 'completed'
  const [elapsedTime, setElapsedTime] = useState(0)
  const [showHint, setShowHint] = useState(false)
  
  // Generate a new puzzle when gridSize or difficulty changes
  useEffect(() => {
    startNewGame()
  }, [gridSize, difficulty])
  
  // Timer effect
  useEffect(() => {
    let timer
    if (gameStatus === 'playing') {
      timer = setInterval(() => {
        setElapsedTime(prev => prev + 1)
      }, 1000)
    }
    
    return () => clearInterval(timer)
  }, [gameStatus])
  
  // Check if puzzle is completed
  useEffect(() => {
    if (!puzzle || !currentGrid.length) return
    
    // Check if all cells are filled
    const allFilled = currentGrid.every(row => row.every(cell => cell !== 0))
    
    // Check if there are no errors
    const noErrors = errors.length === 0
    
    if (allFilled && noErrors) {
      // Verify against solution
      const isCorrect = currentGrid.every((row, rowIndex) => 
        row.every((cell, colIndex) => 
          cell === puzzle.solution[rowIndex][colIndex]
        )
      )
      
      if (isCorrect) {
        setGameStatus('completed')
      }
    }
  }, [currentGrid, errors, puzzle])
  
  const startNewGame = () => {
    const newPuzzle = generateSudokuPuzzle(gridSize, difficulty)
    setPuzzle(newPuzzle)
    
    // Initialize current grid from initial grid
    const newCurrentGrid = JSON.parse(JSON.stringify(newPuzzle.initialGrid))
    setCurrentGrid(newCurrentGrid)
    
    // Reset game state
    setSelectedCell(null)
    setErrors([])
    setGameStatus('playing')
    setElapsedTime(0)
    setShowHint(false)
  }
  
  const handleCellClick = (row, col) => {
    // Don't allow modifying fixed cells
    if (puzzle.initialGrid[row][col] !== 0) return
    
    setSelectedCell({ row, col })
  }
  
  const handleNumberInput = (number) => {
    if (!selectedCell) return
    
    const { row, col } = selectedCell
    const newGrid = [...currentGrid]
    newGrid[row][col] = number
    setCurrentGrid(newGrid)
    
    // Check for errors
    validateMove(row, col, number)
  }
  
  const validateMove = (row, col, number) => {
    const newErrors = [...errors]
    const errorIndex = newErrors.findIndex(
      err => err.row === row && err.col === col
    )
    
    // Remove existing error for this cell
    if (errorIndex !== -1) {
      newErrors.splice(errorIndex, 1)
    }
    
    // Check if the move is valid
    const isValid = number === puzzle.solution[row][col]
    
    if (!isValid) {
      newErrors.push({ row, col })
    }
    
    setErrors(newErrors)
  }
  
  const getHint = () => {
    if (!selectedCell) return
    
    const { row, col } = selectedCell
    const correctValue = puzzle.solution[row][col]
    
    // Update the grid with the correct value
    const newGrid = [...currentGrid]
    newGrid[row][col] = correctValue
    setCurrentGrid(newGrid)
    
    // Remove any errors for this cell
    const newErrors = errors.filter(
      err => !(err.row === row && err.col === col)
    )
    setErrors(newErrors)
    
    // Show hint message
    setShowHint(true)
    setTimeout(() => setShowHint(false), 3000)
  }
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  
  // Determine cell size based on grid size
  const cellSize = gridSize === 4 ? 'w-16 h-16' : 
                  gridSize === 6 ? 'w-12 h-12' : 'w-10 h-10'
  
  const cellFontSize = gridSize === 4 ? 'text-2xl' : 
                      gridSize === 6 ? 'text-xl' : 'text-lg'
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Sudoku Puzzle</h2>
          <p className="text-surface-600 dark:text-surface-300">
            {gridSize}×{gridSize} • {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <div className="flex">
            <button 
              onClick={() => setGridSize(4)}
              className={`px-3 py-1 rounded-l-lg border ${
                gridSize === 4 
                  ? 'bg-primary text-white border-primary' 
                  : 'border-surface-300 dark:border-surface-600 hover:bg-surface-100 dark:hover:bg-surface-700'
              }`}
            >
              4×4
            </button>
            <button 
              onClick={() => setGridSize(6)}
              className={`px-3 py-1 border-t border-b ${
                gridSize === 6 
                  ? 'bg-primary text-white border-primary' 
                  : 'border-surface-300 dark:border-surface-600 hover:bg-surface-100 dark:hover:bg-surface-700'
              }`}
            >
              6×6
            </button>
            <button 
              onClick={() => setGridSize(9)}
              className={`px-3 py-1 rounded-r-lg border ${
                gridSize === 9 
                  ? 'bg-primary text-white border-primary' 
                  : 'border-surface-300 dark:border-surface-600 hover:bg-surface-100 dark:hover:bg-surface-700'
              }`}
            >
              9×9
            </button>
          </div>
          
          <div className="flex">
            <button 
              onClick={() => setDifficulty('easy')}
              className={`px-3 py-1 rounded-l-lg border ${
                difficulty === 'easy' 
                  ? 'bg-secondary text-white border-secondary' 
                  : 'border-surface-300 dark:border-surface-600 hover:bg-surface-100 dark:hover:bg-surface-700'
              }`}
            >
              Easy
            </button>
            <button 
              onClick={() => setDifficulty('medium')}
              className={`px-3 py-1 border-t border-b ${
                difficulty === 'medium' 
                  ? 'bg-secondary text-white border-secondary' 
                  : 'border-surface-300 dark:border-surface-600 hover:bg-surface-100 dark:hover:bg-surface-700'
              }`}
            >
              Medium
            </button>
            <button 
              onClick={() => setDifficulty('hard')}
              className={`px-3 py-1 rounded-r-lg border ${
                difficulty === 'hard' 
                  ? 'bg-secondary text-white border-secondary' 
                  : 'border-surface-300 dark:border-surface-600 hover:bg-surface-100 dark:hover:bg-surface-700'
              }`}
            >
              Hard
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
        {/* Sudoku Grid */}
        <div className="relative">
          <div 
            className={`grid gap-0.5 bg-surface-300 dark:bg-surface-600 p-0.5 rounded-xl shadow-neu-light dark:shadow-neu-dark`}
            style={{ 
              gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${gridSize}, minmax(0, 1fr))`
            }}
          >
            {currentGrid.map((row, rowIndex) => (
              row.map((cell, colIndex) => {
                const isFixed = puzzle?.initialGrid[rowIndex][colIndex] !== 0
                const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === colIndex
                const hasError = errors.some(err => err.row === rowIndex && err.col === colIndex)
                
                return (
                  <motion.div
                    key={`${rowIndex}-${colIndex}`}
                    whileHover={!isFixed ? { scale: 1.05 } : {}}
                    whileTap={!isFixed ? { scale: 0.95 } : {}}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                    className={`
                      sudoku-cell ${cellSize} ${cellFontSize} rounded-md
                      ${isFixed ? 'sudoku-cell-fixed cursor-not-allowed' : 'cursor-pointer'}
                      ${isSelected ? 'sudoku-cell-selected' : ''}
                      ${hasError ? 'sudoku-cell-error' : ''}
                      bg-white dark:bg-surface-800
                    `}
                  >
                    {cell !== 0 ? cell : ''}
                  </motion.div>
                )
              })
            ))}
          </div>
          
          {/* Game completed overlay */}
          <AnimatePresence>
            {gameStatus === 'completed' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-primary/80 dark:bg-primary/90 rounded-xl flex flex-col items-center justify-center text-white p-6"
              >
                <Award size={48} className="mb-4" />
                <h3 className="text-2xl font-bold mb-2">Puzzle Completed!</h3>
                <p className="text-white/80 mb-4">Time: {formatTime(elapsedTime)}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startNewGame}
                  className="btn bg-white text-primary hover:bg-surface-100 flex items-center gap-2"
                >
                  <RefreshCw size={18} />
                  Play Again
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div className="space-y-6 w-full md:w-auto">
          {/* Game Controls */}
          <div className="card space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Game Controls</h3>
              <div className="flex items-center gap-1 text-surface-600 dark:text-surface-300">
                <Clock size={16} />
                <span>{formatTime(elapsedTime)}</span>
              </div>
            </div>
            
            {/* Number Input Pad */}
            <div 
              className="grid gap-2"
              style={{ 
                gridTemplateColumns: `repeat(${Math.min(gridSize, 5)}, minmax(0, 1fr))` 
              }}
            >
              {Array.from({ length: gridSize }, (_, i) => i + 1).map(num => (
                <motion.button
                  key={num}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNumberInput(num)}
                  disabled={!selectedCell}
                  className={`
                    w-12 h-12 rounded-lg text-xl font-medium
                    ${!selectedCell 
                      ? 'bg-surface-200 dark:bg-surface-700 text-surface-400 dark:text-surface-500 cursor-not-allowed' 
                      : 'bg-surface-100 dark:bg-surface-700 hover:bg-primary hover:text-white dark:hover:bg-primary'}
                  `}
                >
                  {num}
                </motion.button>
              ))}
            </div>
            
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={getHint}
                disabled={!selectedCell || gameStatus !== 'playing'}
                className={`
                  flex-1 btn flex items-center justify-center gap-1
                  ${!selectedCell || gameStatus !== 'playing'
                    ? 'bg-surface-200 dark:bg-surface-700 text-surface-400 dark:text-surface-500 cursor-not-allowed'
                    : 'bg-accent text-white hover:bg-accent/80'}
                `}
              >
                <HelpCircle size={18} />
                Hint
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startNewGame}
                className="flex-1 btn btn-outline flex items-center justify-center gap-1"
              >
                <RefreshCw size={18} />
                New Game
              </motion.button>
            </div>
          </div>
          
          {/* Game Info */}
          <div className="card space-y-3">
            <h3 className="font-semibold">Game Info</h3>
            
            <div className="flex items-center gap-2 text-surface-600 dark:text-surface-300">
              <AlertCircle size={16} className="text-secondary" />
              <span>Errors: {errors.length}</span>
            </div>
            
            <div className="text-sm text-surface-600 dark:text-surface-300">
              <p>
                Fill in the grid so that every row, column, and region contains the numbers 
                1 through {gridSize} without repetition.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Hint Toast */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-accent text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2"
          >
            <Check size={20} />
            <span>Hint applied! This is the correct number for this cell.</span>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Navigation */}
      <div className="flex justify-between items-center pt-4">
        <div className="flex gap-2">
          <button 
            onClick={() => {
              if (gridSize > 4) {
                setGridSize(gridSize - (gridSize === 9 ? 3 : 2))
              }
            }}
            disabled={gridSize === 4}
            className={`
              btn btn-outline flex items-center gap-1 py-1.5
              ${gridSize === 4 ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            <ChevronLeft size={18} />
            {gridSize > 4 ? `${gridSize === 9 ? '6×6' : '4×4'}` : ''}
          </button>
          
          <button 
            onClick={() => {
              if (gridSize < 9) {
                setGridSize(gridSize + (gridSize === 4 ? 2 : 3))
              }
            }}
            disabled={gridSize === 9}
            className={`
              btn btn-outline flex items-center gap-1 py-1.5
              ${gridSize === 9 ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {gridSize < 9 ? `${gridSize === 4 ? '6×6' : '9×9'}` : ''}
            <ChevronRight size={18} />
          </button>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={() => {
              const levels = ['easy', 'medium', 'hard']
              const currentIndex = levels.indexOf(difficulty)
              if (currentIndex > 0) {
                setDifficulty(levels[currentIndex - 1])
              }
            }}
            disabled={difficulty === 'easy'}
            className={`
              btn btn-outline flex items-center gap-1 py-1.5
              ${difficulty === 'easy' ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            <ChevronLeft size={18} />
            {difficulty !== 'easy' ? `${difficulty === 'hard' ? 'Medium' : 'Easy'}` : ''}
          </button>
          
          <button 
            onClick={() => {
              const levels = ['easy', 'medium', 'hard']
              const currentIndex = levels.indexOf(difficulty)
              if (currentIndex < levels.length - 1) {
                setDifficulty(levels[currentIndex + 1])
              }
            }}
            disabled={difficulty === 'hard'}
            className={`
              btn btn-outline flex items-center gap-1 py-1.5
              ${difficulty === 'hard' ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {difficulty !== 'hard' ? `${difficulty === 'easy' ? 'Medium' : 'Hard'}` : ''}
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default MainFeature