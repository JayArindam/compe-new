"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Gamepad2 } from "lucide-react"

export default function DiscountGame() {
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(15)
  const [targets, setTargets] = useState<{ id: number; x: number; y: number }[]>([])
  const [discountCode, setDiscountCode] = useState("")
  const { toast } = useToast()

  // Generate random position
  const generateRandomPosition = () => {
    return {
      id: Math.random(),
      x: Math.floor(Math.random() * 80) + 10, // 10-90% of container width
      y: Math.floor(Math.random() * 80) + 10, // 10-90% of container height
    }
  }

  // Start game
  const startGame = () => {
    setGameStarted(true)
    setGameOver(false)
    setScore(0)
    setTimeLeft(15)
    setTargets([generateRandomPosition()])
  }

  // Handle target click
  const handleTargetClick = (id: number) => {
    setScore(score + 1)
    setTargets(targets.filter((target) => target.id !== id).concat(generateRandomPosition()))
  }

  // Generate discount code based on score
  const generateDiscountCode = (score: number) => {
    const discountPercent = Math.min(Math.floor(score / 2) * 5, 30) // Max 30% discount
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let code = `TECH${discountPercent}`

    for (let i = 0; i < 4; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length))
    }

    return code
  }

  // Copy discount code to clipboard
  const copyDiscountCode = () => {
    navigator.clipboard.writeText(discountCode)
    toast({
      title: "Copied!",
      description: "Discount code copied to clipboard",
    })
  }

  // Game timer
  useEffect(() => {
    if (!gameStarted || gameOver) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setGameOver(true)
          const code = generateDiscountCode(score)
          setDiscountCode(code)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameStarted, gameOver, score])

  return (
    <div className="game-container">
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-vt323 gradient-heading mb-2 flex items-center justify-center">
          <Gamepad2 className="mr-2" /> TECH BLASTER
        </h2>
        <p className="text-gray-300">Click on the targets as fast as you can to earn discount codes!</p>
      </div>

      {!gameStarted && !gameOver && (
        <div className="text-center">
          <Button
            onClick={startGame}
            className="bg-gradient-to-r from-orange-500 to-pink-700 hover:from-orange-600 hover:to-pink-800"
          >
            Start Game
          </Button>
        </div>
      )}

      {gameStarted && !gameOver && (
        <div className="relative h-64 border border-gray-700 rounded-lg overflow-hidden bg-gray-900 mb-4">
          <div className="absolute top-2 left-2 bg-gray-800 px-3 py-1 rounded-full text-sm">Time: {timeLeft}s</div>
          <div className="absolute top-2 right-2 bg-gray-800 px-3 py-1 rounded-full text-sm">Score: {score}</div>

          {targets.map((target) => (
            <motion.button
              key={target.id}
              className="absolute w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-pink-700"
              style={{ left: `${target.x}%`, top: `${target.y}%`, transform: "translate(-50%, -50%)" }}
              onClick={() => handleTargetClick(target.id)}
              whileTap={{ scale: 0.9 }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            />
          ))}
        </div>
      )}

      {gameOver && (
        <div className="text-center">
          <h3 className="text-xl font-display mb-2">Game Over!</h3>
          <p className="mb-4">
            Your score: <span className="text-orange-500 font-bold">{score}</span>
          </p>

          {score > 0 && (
            <div className="mb-4">
              <p className="mb-2">Your discount code:</p>
              <div className="flex items-center justify-center">
                <div className="bg-gray-800 px-4 py-2 rounded-l-md font-mono text-orange-500">{discountCode}</div>
                <Button
                  onClick={copyDiscountCode}
                  className="bg-gradient-to-r from-orange-500 to-pink-700 rounded-l-none"
                >
                  Copy
                </Button>
              </div>
              <p className="text-sm text-gray-400 mt-2">Use this code at checkout for a discount!</p>
            </div>
          )}

          <Button
            onClick={startGame}
            className="bg-gradient-to-r from-orange-500 to-pink-700 hover:from-orange-600 hover:to-pink-800"
          >
            Play Again
          </Button>
        </div>
      )}
    </div>
  )
}
