import ProductCarousel from "@/components/product-carousel"
import ProductCard from "@/components/product-card"
import DiscountGame from "@/components/discount-game"
import ContactForm from "@/components/contact-form"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import  carousel  from "../public/carousel1.jpg"
import carousel2 from "../public/carousel2.jpg"
import carousel3 from "../public/carousel3.jpg"
import gamingpc from "../public/gamingpc.jpg"
import workstation from "../public/workstation.jpg"
import rbgkeybaord from "../public/rgbkeyboard.jpg"
import monitor from "../public/monitor.jpg"
import mouse from "../public/mouse.jpg"
import vr from "../public/vr.jpg"
import minipc from "../public/mini.jpg"
import gamingheadset from "../public/gamingheadset.jpg"
// Sample data for carousel
const carouselItems = [
  {
    id: "1",
    title: "Next-Gen Gaming PCs",
    description: "Experience gaming like never before with our high-performance custom builds.",
    image: carousel.src,
    link: "/products?category=gaming",
  },
  {
    id: "2",
    title: "Professional Workstations",
    description: "Powerful machines designed for creators, developers, and professionals.",
    image: carousel2.src,
    link: "/products?category=workstation",
  },
  {
    id: "3",
    title: "Premium Peripherals",
    description: "Enhance your setup with our selection of high-quality keyboards, mice, and more.",
    image: carousel3.src,
    link: "/products?category=peripherals",
  },
]

// Sample products data
const featuredProducts = [
  {
    id: "p1",
    name: "Quantum X Gaming PC",
    description: "High-performance gaming PC with RGB lighting, liquid cooling, and the latest GPU technology.",
    price: 1999.99,
    image: gamingpc.src,
    category: "Gaming PC",
  },
  {
    id: "p2",
    name: "Developer Pro Workstation",
    description: "Powerful workstation optimized for coding, virtualization, and development workflows.",
    price: 2499.99,
    image: workstation.src,
    category: "Workstation",
  },
  {
    id: "p3",
    name: "Mechanical RGB Keyboard",
    description: "Premium mechanical keyboard with customizable RGB lighting and programmable macros.",
    price: 149.99,
    image: rbgkeybaord.src,
    category: "Peripherals",
  },
  {
    id: "p4",
    name: "Ultra HD Monitor",
    description: "32-inch 4K monitor with HDR support, perfect for gaming and content creation.",
    price: 499.99,
    image: monitor.src,
    category: "Monitors",
  },
  {
    id: "p5",
    name: "Wireless Gaming Mouse",
    description: "Ultra-responsive wireless gaming mouse with adjustable DPI and ergonomic design.",
    price: 89.99,
    image: mouse.src,
    category: "Peripherals",
  },
  {
    id: "p6",
    name: "VR Headset Pro",
    description: "Immersive virtual reality headset with high-resolution displays and precise tracking.",
    price: 599.99,
    image: vr.src,
    category: "VR",
  },
  {
    id: "p7",
    name: "Compact Mini PC",
    description: "Powerful mini PC perfect for home entertainment and everyday computing tasks.",
    price: 799.99,
    image: minipc.src,
    category: "Mini PC",
  },
  {
    id: "p8",
    name: "Gaming Headset",
    description: "Surround sound gaming headset with noise-cancelling microphone and RGB lighting.",
    price: 129.99,
    image: gamingheadset.src,
    category: "Audio",
  },
]

export default function Home() {
  return (
    <div className="pt-16">
      {/* Hero Carousel */}
      <section className="mb-12">
        <ProductCarousel items={carouselItems} />
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-vt323 gradient-heading">Featured Products</h2>
          <Link href="/products">
            <Button
              variant="outline"
              className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
            >
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Discount Game */}
      <section className="container mx-auto px-4 mb-16">
        <h2 className="text-3xl font-vt323 gradient-heading mb-8">Win Exclusive Discounts</h2>
        <DiscountGame />
      </section>

      {/* Contact Form */}
      <section className="container mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-vt323 gradient-heading mb-4">Contact Us</h2>
            <p className="text-gray-300 mb-6">
              Have questions about our products or services? Need technical support? We're here to help! Fill out the
              form and our team will get back to you as soon as possible.
            </p>

            <div className="glass-card rounded-xl p-6 mb-6">
              <h3 className="text-xl font-display mb-4">Our Location</h3>
              <p className="text-gray-300 mb-2">123 Tech Street</p>
              <p className="text-gray-300 mb-2">Silicon Valley, CA 94043</p>
              <p className="text-gray-300 mb-2">United States</p>
            </div>

            <div className="glass-card rounded-xl p-6">
              <h3 className="text-xl font-display mb-4">Contact Information</h3>
              <p className="text-gray-300 mb-2">Email: support@compestore.com</p>
              <p className="text-gray-300 mb-2">Phone: +1 (555) 123-4567</p>
              <p className="text-gray-300">Hours: Mon-Fri, 9am-6pm PST</p>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </div>
  )
}
