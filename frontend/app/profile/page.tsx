"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LogOut, Package, User, Settings, ShoppingBag } from "lucide-react"
import { format } from "date-fns"
import { useToast } from "@/components/ui/use-toast"

interface OrderItem {
  itemName: string
  quantity: number
  price: number
}

interface Order {
  _id: string
  items: OrderItem[]
  totalPrice: number
  userName: string
  email: string
  address: string
  createdAt: string
  updatedAt: string
}

export default function ProfilePage() {
  const { user, token, isAuthenticated, logout } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    // Fetch user orders
    const fetchOrders = async () => {
      if (!token || !user?.id) return

      try {
        const response = await fetch(`http://localhost:5000/api/orders/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error("Failed to fetch orders")
        }

        const data = await response.json()
        setOrders(data.orders || [])
      } catch (error) {
        console.error("Error fetching orders:", error)
        toast({
          title: "Error",
          description: "Failed to load your order history",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrders()
  }, [isAuthenticated, router, token, user, toast])

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  if (!isAuthenticated) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <h1 className="text-3xl font-vt323 gradient-heading mb-8">My Account</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="glass-card rounded-xl p-6">
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-orange-500 to-pink-700 flex items-center justify-center text-3xl font-bold mb-4">
                {user?.username?.charAt(0).toUpperCase() || "U"}
              </div>
              <h2 className="text-xl font-display">{user?.username || "User"}</h2>
              <p className="text-gray-400">{user?.email || "user@example.com"}</p>
            </div>

            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start" disabled>
                <User className="mr-2 h-4 w-4" /> Profile
              </Button>
              <Button variant="ghost" className="w-full justify-start" disabled>
                <ShoppingBag className="mr-2 h-4 w-4" /> Orders
              </Button>
              <Button variant="ghost" className="w-full justify-start" disabled>
                <Settings className="mr-2 h-4 w-4" /> Settings
              </Button>
              <Button variant="ghost" className="w-full justify-start text-red-500" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="orders">
            <TabsList className="mb-6">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="orders">Order History</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>View and update your personal information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Username</label>
                      <p className="text-lg">{user?.username || "Not set"}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <p className="text-lg">{user?.email || "Not set"}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Member Since</label>
                      <p className="text-lg">May 2025</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-gradient-to-r from-orange-500 to-pink-700" disabled>
                    Edit Profile
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                  <CardDescription>View your past orders and their status</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mx-auto mb-4"></div>
                      <p>Loading your orders...</p>
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="text-center py-8">
                      <Package className="h-12 w-12 mx-auto mb-4 text-gray-500" />
                      <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                      <p className="text-gray-400 mb-4">You haven't placed any orders yet.</p>
                      <Button
                        className="bg-gradient-to-r from-orange-500 to-pink-700"
                        onClick={() => router.push("/products")}
                      >
                        Browse Products
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {orders.map((order) => (
                        <div key={order._id} className="glass-card rounded-xl p-6">
                          <div className="flex flex-col md:flex-row justify-between mb-4">
                            <div>
                              <h3 className="text-lg font-medium mb-1">Order #{order._id.slice(-8)}</h3>
                              <p className="text-sm text-gray-400">
                                Placed on {format(new Date(order.createdAt), "MMMM d, yyyy")}
                              </p>
                            </div>
                            <div className="mt-2 md:mt-0">
                              <span className="bg-green-900/30 text-green-400 px-3 py-1 rounded-full text-sm">
                                Completed
                              </span>
                            </div>
                          </div>

                          <div className="border-t border-gray-700 pt-4 mb-4">
                            <h4 className="text-sm font-medium mb-2">Items</h4>
                            <div className="space-y-2">
                              {order.items.map((item, index) => (
                                <div key={index} className="flex justify-between">
                                  <div>
                                    <span className="font-medium">{item.itemName}</span>
                                    <span className="text-gray-400 ml-2">x{item.quantity}</span>
                                  </div>
                                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="border-t border-gray-700 pt-4 mb-4">
                            <h4 className="text-sm font-medium mb-2">Shipping Address</h4>
                            <p className="text-gray-300">{order.address}</p>
                          </div>

                          <div className="border-t border-gray-700 pt-4 flex justify-between items-center">
                            <span className="font-medium">Total</span>
                            <span className="text-xl font-bold">${order.totalPrice.toFixed(2)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Password</h3>
                      <Button className="bg-gradient-to-r from-orange-500 to-pink-700" disabled>
                        Change Password
                      </Button>
                    </div>

                    <div className="border-t border-gray-700 pt-6">
                      <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-sm">Email notifications for orders</label>
                          <input type="checkbox" defaultChecked disabled />
                        </div>
                        <div className="flex items-center justify-between">
                          <label className="text-sm">Email notifications for promotions</label>
                          <input type="checkbox" defaultChecked disabled />
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-700 pt-6">
                      <h3 className="text-lg font-medium mb-4 text-red-500">Danger Zone</h3>
                      <Button variant="destructive" disabled>
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
