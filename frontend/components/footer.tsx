"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

export default function Footer() {
  const [email, setEmail] = useState("")
  const { toast } = useToast()

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      toast({
        title: "Subscribed!",
        description: "You've been added to our newsletter.",
      })
      setEmail("")
    }
  }

  return (
    <footer className="bg-gray-900 pt-12 pb-6 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-vt323 gradient-heading mb-4">TECHTROVE</h3>
            <p className="text-gray-400 mb-4">
              Your one-stop shop for computers and peripherals with a retro-futuristic twist.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-orange-500">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-orange-500">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-orange-500">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-orange-500">
                <Youtube size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-display text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-orange-500">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-orange-500">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-orange-500">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-orange-500">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-display text-white mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-orange-500">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-orange-500">
                  Submit a Query
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-gray-400 hover:text-orange-500">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-orange-500">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-display text-white mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter for the latest products and offers.</p>
            <form onSubmit={handleSubscribe} className="flex">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-gray-800 border-gray-700 focus:border-orange-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" className="ml-2 bg-gradient-to-r from-orange-500 to-pink-700">
                <Send size={16} />
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-gray-500">&copy; {new Date().getFullYear()} TechTrove. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
