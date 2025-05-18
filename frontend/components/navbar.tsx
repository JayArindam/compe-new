"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ShoppingCart, User, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { cartItems } = useCart()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 glass-nav",
        isScrolled ? "py-2" : "py-4",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl md:text-3xl font-vt323 gradient-heading">
              TECH<span className="text-white">TROVE</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-orange-500 font-display">
              Home
            </Link>
            <Link href="/products" className="text-white hover:text-orange-500 font-display">
              Products
            </Link>
            <Link href="/about" className="text-white hover:text-orange-500 font-display">
              About
            </Link>
            <Link href="/faq" className="text-white hover:text-orange-500 font-display">
              FAQ
            </Link>
            <Link href="#contact" className="text-white hover:text-orange-500 font-display">
              Contact
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button> */}
            <Link href={isAuthenticated ? "/profile" : "/login"}>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-pink-700 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-4">
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-pink-700 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass-nav mt-2 py-4">
          <div className="container mx-auto px-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-white hover:text-orange-500 font-display py-2"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/products"
                className="text-white hover:text-orange-500 font-display py-2"
                onClick={() => setIsOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/about"
                className="text-white hover:text-orange-500 font-display py-2"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                href="/faq"
                className="text-white hover:text-orange-500 font-display py-2"
                onClick={() => setIsOpen(false)}
              >
                FAQ
              </Link>
              <Link
                href="/contact"
                className="text-white hover:text-orange-500 font-display py-2"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <Link
                href={isAuthenticated ? "/profile" : "/login"}
                className="text-white hover:text-orange-500 font-display py-2"
                onClick={() => setIsOpen(false)}
              >
                {isAuthenticated ? "Profile" : "Login"}
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
