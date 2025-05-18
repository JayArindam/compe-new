"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ShoppingCart, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { useToast } from "@/components/ui/use-toast"

export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { addToCart } = useCart()
  const { toast } = useToast()

  const handleAddToCart = () => {
    addToCart({
      itemName: product.name,
      quantity: 1,
      price: product.price,
      image: product.image,
      id: product.id,
    })

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  return (
    <motion.div
      className="glass-card rounded-lg overflow-hidden product-card"
      whileHover={{ y: -5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <Link href={`/products/${product.id}`}>
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 ease-in-out"
              style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
            />
          </div>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-70"
        >
          <Heart className="h-5 w-5 text-white" />
        </Button>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Link href={`/products/${product.id}`}>
            <h3 className="font-display text-lg font-semibold hover:text-orange-500 transition-colors">
              {product.name}
            </h3>
          </Link>
          <span className="font-vt323 text-xl text-orange-500">${product.price}</span>
        </div>

        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{product.description}</p>

        <div className="flex justify-between items-center">
          <span className="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-400">{product.category}</span>
          <Button
            onClick={handleAddToCart}
            className="bg-gradient-to-r from-orange-500 to-pink-700 hover:from-orange-600 hover:to-pink-800"
            size="sm"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
