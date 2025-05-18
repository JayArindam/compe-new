"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Trash2, Plus, Minus, ArrowLeft, ArrowRight, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"
import { useToast } from "@/components/ui/use-toast"

export default function CartPage() {
  const [step, setStep] = useState(1)
  const [address, setAddress] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const { cartItems, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart()
  const { isAuthenticated, user, token } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to complete your purchase",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    if (!address.trim()) {
      toast({
        title: "Address required",
        description: "Please enter your shipping address",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    try {
      // Format the order data according to the API requirements
      const orderData = {
        items: cartItems.map((item) => ({
          itemName: item.itemName,
          quantity: item.quantity,
          price: item.price,
        })),
        userName: user?.username || "",
        email: user?.email || "",
        address: address,
      }

      // Make the API request
      const response = await fetch("http://localhost:5000/api/orders/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Order placed successfully!",
          description: `Order ID: ${data.orderId}`,
        })
        clearCart()
        router.push("/")
      } else {
        throw new Error(data.message || "Failed to place order")
      }
    } catch (error) {
      toast({
        title: "Checkout failed",
        description: error instanceof Error ? error.message : "An error occurred during checkout",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  // Simulate payment processing
  const processPayment = () => {
    setIsProcessing(true)

    // Simulate API call delay
    setTimeout(() => {
      handleCheckout()
    }, 2000)
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 pt-24 pb-16">
        <h1 className="text-3xl font-vt323 gradient-heading mb-8">Your Cart</h1>
        <div className="glass-card rounded-xl p-8 text-center">
          <h2 className="text-2xl font-display mb-4">Your cart is empty</h2>
          <p className="text-gray-400 mb-6">Looks like you haven't added any products to your cart yet.</p>
          <Link href="/products">
            <Button className="bg-gradient-to-r from-orange-500 to-pink-700">Browse Products</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <h1 className="text-3xl font-vt323 gradient-heading mb-8">Your Cart</h1>

      {/* Checkout Steps */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center">
          <div
            className={`rounded-full h-10 w-10 flex items-center justify-center ${
              step === 1 ? "bg-gradient-to-r from-orange-500 to-pink-700" : "bg-gray-700"
            }`}
          >
            1
          </div>
          <div
            className={`h-1 w-16 ${step === 2 ? "bg-gradient-to-r from-orange-500 to-pink-700" : "bg-gray-700"}`}
          ></div>
          <div
            className={`rounded-full h-10 w-10 flex items-center justify-center ${
              step === 2 ? "bg-gradient-to-r from-orange-500 to-pink-700" : "bg-gray-700"
            }`}
          >
            2
          </div>
        </div>
      </div>

      {/* Step 1: Review Cart */}
      {step === 1 && (
        <div className="checkout-step">
          <h2 className="text-2xl font-display mb-6">Review Your Cart</h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-700">
                <tr>
                  <th className="text-left py-4">Product</th>
                  <th className="text-center py-4">Price</th>
                  <th className="text-center py-4">Quantity</th>
                  <th className="text-center py-4">Total</th>
                  <th className="text-right py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id} className="border-b border-gray-800">
                    <td className="py-4">
                      <div className="flex items-center">
                        <div className="relative h-16 w-16 mr-4">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.itemName}
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>
                        <span className="font-medium">{item.itemName}</span>
                      </div>
                    </td>
                    <td className="text-center py-4">${item.price.toFixed(2)}</td>
                    <td className="text-center py-4">
                      <div className="flex items-center justify-center">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="mx-2 w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                    <td className="text-center py-4 font-medium">${(item.price * item.quantity).toFixed(2)}</td>
                    <td className="text-right py-4">
                      <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                        <Trash2 className="h-5 w-5 text-red-500" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 flex flex-col md:flex-row justify-between items-start gap-8">
            <div className="w-full md:w-1/2">
              <h3 className="text-lg font-display mb-4">Have a discount code?</h3>
              <div className="flex">
                <Input placeholder="Enter discount code" className="retro-input rounded-r-none" />
                <Button className="bg-gradient-to-r from-orange-500 to-pink-700 rounded-l-none">Apply</Button>
              </div>
            </div>

            <div className="w-full md:w-1/2 glass-card rounded-xl p-6">
              <h3 className="text-lg font-display mb-4">Order Summary</h3>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Tax</span>
                  <span>${(totalPrice * 0.1).toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-4 mb-6">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-xl">${(totalPrice * 1.1).toFixed(2)}</span>
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-orange-500 to-pink-700" onClick={() => setStep(2)}>
                Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Checkout */}
      {step === 2 && (
        <div className="checkout-step">
          <h2 className="text-2xl font-display mb-6">Checkout</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-display mb-4">Shipping Information</h3>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">First Name</label>
                    <Input className="retro-input" defaultValue={user?.username?.split(" ")[0] || ""} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Last Name</label>
                    <Input className="retro-input" defaultValue={user?.username?.split(" ")[1] || ""} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <Input className="retro-input" defaultValue={user?.email || ""} />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Phone Number</label>
                  <Input className="retro-input" placeholder="+1 (123) 456-7890" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Address</label>
                  <Textarea
                    className="retro-input min-h-[100px]"
                    placeholder="Enter your full address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>

              <h3 className="text-lg font-display mt-8 mb-4">Payment Method</h3>

              <div className="glass-card rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <input type="radio" id="credit-card" name="payment-method" className="mr-2" defaultChecked />
                    <label htmlFor="credit-card" className="flex items-center">
                      <CreditCard className="mr-2 h-5 w-5" />
                      Credit Card
                    </label>
                  </div>
                  <div className="flex space-x-2">
                    <div className="h-6 w-10 bg-gray-700 rounded"></div>
                    <div className="h-6 w-10 bg-gray-700 rounded"></div>
                    <div className="h-6 w-10 bg-gray-700 rounded"></div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Card Number</label>
                    <Input className="retro-input" placeholder="1234 5678 9012 3456" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Expiration Date</label>
                      <Input className="retro-input" placeholder="MM/YY" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">CVC</label>
                      <Input className="retro-input" placeholder="123" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Name on Card</label>
                    <Input className="retro-input" placeholder="John Doe" />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-display mb-4">Order Summary</h3>

              <div className="glass-card rounded-xl p-6 mb-6">
                <div className="max-h-60 overflow-y-auto mb-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-800">
                      <div className="flex items-center">
                        <div className="relative h-10 w-10 mr-3">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.itemName}
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{item.itemName}</p>
                          <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Tax</span>
                    <span>${(totalPrice * 0.1).toFixed(2)}</span>
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-4 mb-6">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-xl">${(totalPrice * 1.1).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-4">
                <Button
                  className="bg-gradient-to-r from-orange-500 to-pink-700"
                  onClick={processPayment}
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "Complete Purchase"}
                </Button>

                <Button variant="outline" onClick={() => setStep(1)} disabled={isProcessing}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
