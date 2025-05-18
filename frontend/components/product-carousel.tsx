"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CarouselItem {
  id: string
  title: string
  description: string
  image: string
  link: string
}

interface ProductCarouselProps {
  items: CarouselItem[]
}

export default function ProductCarousel({ items }: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return

      setIsAnimating(true)
      setCurrentIndex(index)

      setTimeout(() => {
        setIsAnimating(false)
      }, 500)
    },
    [isAnimating],
  )

  const goToPrevious = useCallback(() => {
    const newIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1
    goToSlide(newIndex)
  }, [currentIndex, items.length, goToSlide])

  const goToNext = useCallback(() => {
    const newIndex = currentIndex === items.length - 1 ? 0 : currentIndex + 1
    goToSlide(newIndex)
  }, [currentIndex, items.length, goToSlide])

  useEffect(() => {
    const interval = setInterval(goToNext, 5000)
    return () => clearInterval(interval)
  }, [goToNext])

  return (
    <div className="relative overflow-hidden h-[500px] md:h-[600px] rounded-xl">
      {/* Carousel Items */}
      <div className="absolute inset-0">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-500 ease-in-out",
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0",
            )}
            style={{
              backgroundImage: `url(${item.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 z-20">
              <h2 className="text-3xl md:text-5xl font-vt323 gradient-heading mb-4">{item.title}</h2>
              <p className="text-white text-lg md:text-xl max-w-2xl mb-6">{item.description}</p>
              <Button className="bg-gradient-to-r from-orange-500 to-pink-700 hover:from-orange-600 hover:to-pink-800">
                Shop Now
              </Button>
            </div>

            {/* Scanline Effect */}
            <div className="absolute inset-0 pointer-events-none z-10 opacity-10">
              <div className="w-full h-[1px] bg-orange-500 animate-scanline"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 rounded-full h-10 w-10"
        onClick={goToPrevious}
        disabled={isAnimating}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 rounded-full h-10 w-10"
        onClick={goToNext}
        disabled={isAnimating}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {items.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              index === currentIndex ? "w-8 bg-gradient-to-r from-orange-500 to-pink-700" : "bg-white/50",
            )}
            onClick={() => goToSlide(index)}
            disabled={isAnimating}
          />
        ))}
      </div>
    </div>
  )
}
