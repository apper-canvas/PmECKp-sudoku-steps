import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ChevronDown, 
  ChevronUp, 
  Book, 
  AlertTriangle, 
  PenTool, 
  Lightbulb, 
  Target,
  List,
  Grid,
  CheckSquare
} from 'lucide-react'

const SudokuGuide = () => {
  // State to track which sections are expanded
  const [expandedSections, setExpandedSections] = useState({
    history: true,
    rules: true,
    basic: false,
    intermediate: false,
    advanced: false,
    gridSizes: false
  })

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  // Reusable section component with toggle functionality
  const Section = ({ id, title, icon, children }) => (
    <div className="card mb-6">
      <button 
        onClick={() => toggleSection(id)} 
        className="w-full flex justify-between items-center py-2"
      >
        <div className="flex items-center gap-3">
          {icon}
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        {expandedSections[id] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      
      {expandedSections[id] && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4 space-y-4"
        >
          {children}
        </motion.div>
      )}
    </div>
  )

  // Technique component for explaining solving techniques
  const Technique = ({ title, difficulty, description, example }) => (
    <div className="border border-surface-200 dark:border-surface-700 rounded-lg p-4 mb-4">
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-semibold text-lg">{title}</h4>
        <span className={`text-sm px-2 py-0.5 rounded-full ${
          difficulty === 'Easy' 
            ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' 
            : difficulty === 'Medium'
              ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
              : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
        }`}>
          {difficulty}
        </span>
      </div>
      <p className="text-surface-700 dark:text-surface-300 mb-4">{description}</p>
      {example && (
        <div className="bg-surface-100 dark:bg-surface-800 p-3 rounded-lg text-sm">
          <strong className="text-primary dark:text-primary-light">Example:</strong> {example}
        </div>
      )}
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Sudoku Guide
        </h1>
        <p className="text-xl text-surface-600 dark:text-surface-300">
          Learn everything about Sudoku, from basics to advanced techniques
        </p>
      </div>
      
      <Section 
        id="history" 
        title="History & Background" 
        icon={<Book size={24} className="text-primary" />}
      >
        <div className="space-y-4">
          <p>
            Sudoku is a logic-based number placement puzzle that has captivated puzzle enthusiasts worldwide. 
            The name "Sudoku" is an abbreviation of a Japanese phrase "Sūji wa dokushin ni kagiru," 
            which translates to "the numbers must remain single."
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Origins</h4>
              <p className="text-surface-700 dark:text-surface-300">
                Contrary to popular belief, Sudoku wasn't invented in Japan. The modern Sudoku puzzle was 
                actually designed by Howard Garns, an American architect, in 1979. It was originally 
                called "Number Place" and was published in Dell Magazines.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Global Popularity</h4>
              <p className="text-surface-700 dark:text-surface-300">
                Sudoku gained international popularity in 2004 when it was introduced by The Times newspaper 
                in London. Since then, it has become a staple in newspapers, puzzle books, and digital 
                applications worldwide.
              </p>
            </div>
          </div>
          
          <div className="bg-surface-100 dark:bg-surface-800 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Did You Know?</h4>
            <p className="text-surface-700 dark:text-surface-300">
              Sudoku puzzles follow mathematical principles related to "Latin squares," which were studied 
              by Swiss mathematician Leonhard Euler in the 18th century. However, Sudoku adds the constraint 
              of non-repeating numbers within defined regions or boxes.
            </p>
          </div>
        </div>
      </Section>
      
      <Section 
        id="rules" 
        title="Sudoku Rules" 
        icon={<AlertTriangle size={24} className="text-secondary" />}
      >
        <div className="space-y-4">
          <h4 className="font-semibold">Basic Rules of Sudoku</h4>
          <div className="space-y-2">
            <p>Sudoku is played on a grid, typically 9×9, divided into smaller regions (usually 3×3 boxes).</p>
            
            <div className="pl-5 space-y-2">
              <div className="flex items-start gap-2">
                <div className="min-w-6 h-6 flex items-center justify-center rounded-full bg-primary text-white text-sm font-bold">1</div>
                <p>The objective is to fill the grid so that each row, column, and region contains all the numbers from 1 to 9 (for a 9×9 grid) with no repetition.</p>
              </div>
              
              <div className="flex items-start gap-2">
                <div className="min-w-6 h-6 flex items-center justify-center rounded-full bg-primary text-white text-sm font-bold">2</div>
                <p>The puzzle begins with some cells already filled with numbers (called "givens" or "clues").</p>
              </div>
              
              <div className="flex items-start gap-2">
                <div className="min-w-6 h-6 flex items-center justify-center rounded-full bg-primary text-white text-sm font-bold">3</div>
                <p>Each puzzle has only one valid solution.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-primary/10 dark:bg-primary/20 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">The Three Constraints</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Row Constraint:</strong> Each row must contain each number exactly once</li>
              <li><strong>Column Constraint:</strong> Each column must contain each number exactly once</li>
              <li><strong>Region Constraint:</strong> Each region/box must contain each number exactly once</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Variations in Grid Size</h4>
            <p className="mb-3">
              While the classic Sudoku is 9×9, the puzzle can be adapted to different sizes, each with its own challenges:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-surface-100 dark:bg-surface-800 p-3 rounded-lg text-center">
                <strong className="text-lg block mb-1">4×4</strong>
                <p className="text-sm">Uses numbers 1-4, ideal for beginners</p>
              </div>
              <div className="bg-surface-100 dark:bg-surface-800 p-3 rounded-lg text-center">
                <strong className="text-lg block mb-1">6×6</strong>
                <p className="text-sm">Uses numbers 1-6, intermediate challenge</p>
              </div>
              <div className="bg-surface-100 dark:bg-surface-800 p-3 rounded-lg text-center">
                <strong className="text-lg block mb-1">9×9</strong>
                <p className="text-sm">The classic version, greatest complexity</p>
              </div>
            </div>
          </div>
        </div>
      </Section>
      
      <Section 
        id="basic" 
        title="Basic Solving Techniques" 
        icon={<PenTool size={24} className="text-green-500" />}
      >
        <div className="space-y-6">
          <p>
            These fundamental techniques are the building blocks for solving any Sudoku puzzle. 
            Master these first before moving on to more advanced strategies.
          </p>
          
          <Technique 
            title="Scanning" 
            difficulty="Easy"
            description="Scanning involves checking rows, columns, and boxes systematically to identify where a number can be placed. Look across rows and down columns to find possible positions for each number."
            example="If you need to place a 5 in a row, check which cells in that row don't already have a 5 in their column or box."
          />
          
          <Technique 
            title="Single Position" 
            difficulty="Easy"
            description="When there is only one possible position for a number within a row, column, or box, you can confidently place that number there."
            example="If seven of the nine positions in a box are filled or eliminated for placing a 3, then the 3 must go into one of the two remaining cells. If one of those cells can be eliminated (because a 3 already exists in its row or column), then the 3 must go in the last remaining cell."
          />
          
          <Technique 
            title="Single Candidate" 
            difficulty="Easy"
            description="If a cell has only one possible number that can be placed in it (after eliminating all other possibilities), then that number must be the correct one."
            example="If a cell can only contain a 6 because all other numbers would violate the row, column, or box constraints, then 6 is the only possible value for that cell."
          />
          
          <div className="bg-accent/10 dark:bg-accent/20 p-4 rounded-lg">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Lightbulb size={20} className="text-accent" />
              Beginner's Tip
            </h4>
            <p>
              Start by focusing on the most filled rows, columns, or boxes. The more numbers already placed, 
              the easier it is to determine where the remaining numbers should go. Also, begin with scanning 
              for the numbers that appear most frequently in the puzzle.
            </p>
          </div>
        </div>
      </Section>
      
      <Section 
        id="intermediate" 
        title="Intermediate Techniques" 
        icon={<Target size={24} className="text-yellow-500" />}
      >
        <div className="space-y-6">
          <p>
            Once you've mastered the basics, these intermediate techniques will help you solve more challenging puzzles.
          </p>
          
          <Technique 
            title="Candidate Listing (Pencil Marks)" 
            difficulty="Medium"
            description="Write small candidate numbers in each empty cell to represent all possible values for that cell. As you solve more cells, you can eliminate candidates based on the rules."
            example="If a cell could contain 2, 5, or 8, write these numbers small in the cell. Later, if you place a 5 in the same row, you can eliminate 5 as a candidate."
          />
          
          <Technique 
            title="Pairs and Triples" 
            difficulty="Medium"
            description="When two cells in the same row, column, or box can only contain the same two numbers, these numbers can be eliminated as candidates from other cells in that row, column, or box. The same applies to three cells that can only contain the same three numbers."
            example="If two cells in a row can only contain 3 or 7, then 3 and 7 cannot appear elsewhere in that row."
          />
          
          <Technique 
            title="Pointing Pairs/Triples" 
            difficulty="Medium"
            description="When a certain number can only appear in two or three cells within a box, and these cells all lie in the same row or column, that number can be eliminated as a candidate from other cells in that row or column."
            example="If a 4 can only be placed in two cells of a box, and both cells are in the same row, then 4 cannot appear elsewhere in that row outside the box."
          />
          
          <div className="bg-surface-100 dark:bg-surface-800 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Practice Makes Perfect</h4>
            <p>
              Intermediate techniques require practice to recognize the patterns. Don't be discouraged if you don't immediately see these patterns. Regular practice will train your brain to spot them more easily.
            </p>
          </div>
        </div>
      </Section>
      
      <Section 
        id="advanced" 
        title="Advanced Techniques" 
        icon={<List size={24} className="text-red-500" />}
      >
        <div className="space-y-6">
          <p>
            These sophisticated techniques are needed for the most challenging puzzles. They require careful analysis and practice to master.
          </p>
          
          <Technique 
            title="X-Wing" 
            difficulty="Hard"
            description="When a candidate appears exactly twice in each of two different rows, and the candidates are aligned in the same columns, then candidates in those columns outside these rows can be eliminated."
            example="If rows 2 and 5 both have the number 7 as candidates only in columns 1 and 6, then 7 can be eliminated as a candidate from all other cells in columns 1 and 6."
          />
          
          <Technique 
            title="Y-Wing (XY-Wing)" 
            difficulty="Hard"
            description="Involves three cells: a pivot cell with exactly two candidates, and two other cells that each share one candidate with the pivot and have a common second candidate."
            example="If cell A can be 2 or 3, cell B can be 2 or 8, and cell C can be 3 or 8, then cell A is the pivot. The common candidate 8 can be eliminated from any cell that sees both cells B and C."
          />
          
          <Technique 
            title="Swordfish" 
            difficulty="Hard"
            description="An extension of the X-Wing technique that involves three rows and three columns."
            example="If the candidate 4 appears only in the same three columns across three different rows, then 4 can be eliminated from those three columns in all other rows."
          />
          
          <div className="bg-accent/10 dark:bg-accent/20 p-4 rounded-lg">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Lightbulb size={20} className="text-accent" />
              Expert Tip
            </h4>
            <p>
              For very difficult puzzles, don't be afraid to use a systematic "what-if" approach. Choose a cell with few candidates, make a logical guess, and follow through. If you encounter a contradiction, backtrack and try a different candidate.
            </p>
          </div>
        </div>
      </Section>
      
      <Section 
        id="gridSizes" 
        title="Tips for Different Grid Sizes" 
        icon={<Grid size={24} className="text-primary" />}
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card">
              <h4 className="font-semibold text-lg mb-3">4×4 Sudoku</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckSquare size={18} className="text-green-500 mt-0.5" />
                  <span>Focus on scanning techniques</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckSquare size={18} className="text-green-500 mt-0.5" />
                  <span>Look for cells with only one possible value</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckSquare size={18} className="text-green-500 mt-0.5" />
                  <span>Practice visual elimination</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckSquare size={18} className="text-green-500 mt-0.5" />
                  <span>Perfect for learning the fundamental rules</span>
                </li>
              </ul>
            </div>
            
            <div className="card">
              <h4 className="font-semibold text-lg mb-3">6×6 Sudoku</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckSquare size={18} className="text-yellow-500 mt-0.5" />
                  <span>Apply candidate listing techniques</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckSquare size={18} className="text-yellow-500 mt-0.5" />
                  <span>Look for pairs and interaction between regions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckSquare size={18} className="text-yellow-500 mt-0.5" />
                  <span>Practice intermediate solving strategies</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckSquare size={18} className="text-yellow-500 mt-0.5" />
                  <span>Bridge between simple and complex puzzles</span>
                </li>
              </ul>
            </div>
            
            <div className="card">
              <h4 className="font-semibold text-lg mb-3">9×9 Sudoku</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckSquare size={18} className="text-red-500 mt-0.5" />
                  <span>Use all solving techniques as needed</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckSquare size={18} className="text-red-500 mt-0.5" />
                  <span>Apply advanced pattern recognition</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckSquare size={18} className="text-red-500 mt-0.5" />
                  <span>Maintain comprehensive candidate lists</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckSquare size={18} className="text-red-500 mt-0.5" />
                  <span>Practice patience and systematic analysis</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-primary/10 dark:bg-primary/20 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Learning Path Recommendation</h4>
            <p>
              If you're new to Sudoku, start with 4×4 puzzles until you feel comfortable with the basic rules and solving techniques. 
              Then progress to 6×6 puzzles to develop your intermediate skills. Finally, challenge yourself with standard 9×9 puzzles 
              and gradually increase the difficulty level as your solving abilities improve.
            </p>
          </div>
        </div>
      </Section>
      
      <div className="mt-8 p-6 bg-gradient-to-r from-primary/20 to-accent/20 dark:from-primary/10 dark:to-accent/10 rounded-xl">
        <h3 className="text-xl font-bold mb-4">Ready to Apply These Techniques?</h3>
        <p className="mb-4">
          Now that you understand how Sudoku works, put your knowledge into practice with our interactive puzzles. 
          Start with an easier grid and work your way up!
        </p>
        <motion.a
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          href="/"
          className="btn btn-primary inline-block"
        >
          Try a Puzzle Now
        </motion.a>
      </div>
    </div>
  )
}

export default SudokuGuide