"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import ProductCard, { type Product } from "@/components/product-card"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Filter, Search, SlidersHorizontal, X } from "lucide-react"
import gamingpc from "../../public/gamingpc.jpg"
import workstation from "../../public/workstation.jpg"
import rbgkeybaord from "../../public/rgbkeyboard.jpg"
import monitor from "../../public/monitor.jpg"
import mouse from "../../public/mouse.jpg"
import vr from "../../public/vr.jpg"
import minipc from "../../public/mini.jpg"
import gamingheadset from "../../public/gamingheadset.jpg"
import chair from "../../public/chair.jpg"
import gamingdesk from "../../public/gamingdesk.jpg"
import ssd from "../../public/ssd.jpg"
import wireless from "../../public/wireless.jpg"
// Sample products data
const allProducts: Product[] = [
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
  {
    id: "p9",
    name: "Ergonomic Office Chair",
    description: "Comfortable ergonomic chair designed for long hours of work or gaming.",
    price: 349.99,
    image: chair.src,
    category: "Furniture",
  },
  {
    id: "p10",
    name: "RGB Gaming Desk",
    description: "Spacious gaming desk with built-in RGB lighting and cable management system.",
    price: 299.99,
    image: gamingdesk.src,
    category: "Furniture",
  },
  {
    id: "p11",
    name: "External SSD 1TB",
    description: "Ultra-fast external SSD with 1TB capacity and USB-C connectivity.",
    price: 179.99,
    image: ssd.src,
    category: "Storage",
  },
  {
    id: "p12",
    name: "Wireless Charging Pad",
    description: "Fast wireless charging pad compatible with all Qi-enabled devices.",
    price: 49.99,
    image: wireless.src,
    category: "Accessories",
  },
]

// Extract unique categories
const categories = Array.from(new Set(allProducts.map((product) => product.category)))

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState([0, 3000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>(categoryParam ? [categoryParam] : [])
  const [sortOption, setSortOption] = useState("featured")
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts)

  // Apply filters
  useEffect(() => {
    let result = [...allProducts]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (product) => product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query),
      )
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      result = result.filter((product) => selectedCategories.includes(product.category))
    }

    // Apply price range filter
    result = result.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // Apply sorting
    switch (sortOption) {
      case "price-low-high":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-high-low":
        result.sort((a, b) => b.price - a.price)
        break
      case "name-a-z":
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "name-z-a":
        result.sort((a, b) => b.name.localeCompare(a.name))
        break
      default:
        // Featured - no sorting needed
        break
    }

    setFilteredProducts(result)
  }, [searchQuery, selectedCategories, priceRange, sortOption])

  // Handle category toggle
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("")
    setPriceRange([0, 3000])
    setSelectedCategories([])
    setSortOption("featured")
  }

  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <h1 className="text-3xl font-vt323 gradient-heading mb-8">Browse Our Products</h1>

      {/* Search and Mobile Filter Toggle */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search products..."
            className="pl-10 retro-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button
          className="sm:hidden bg-gradient-to-r from-orange-500 to-pink-700"
          onClick={() => setMobileFiltersOpen(true)}
        >
          <Filter className="mr-2 h-4 w-4" /> Filters
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Desktop Sidebar Filters */}
        <div className="hidden lg:block w-64 glass-card rounded-xl p-6 h-fit sticky top-24">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-display">Filters</h2>
            <Button variant="ghost" size="sm" onClick={resetFilters}>
              Reset
            </Button>
          </div>

          {/* Price Range Filter */}
          <div className="mb-6">
            <h3 className="text-lg font-display mb-4">Price Range</h3>
            <Slider
              defaultValue={[0, 3000]}
              max={3000}
              step={50}
              value={priceRange}
              onValueChange={setPriceRange}
              className="mb-2"
            />
            <div className="flex justify-between text-sm">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>

          {/* Categories Filter */}
          <div className="mb-6">
            <h3 className="text-lg font-display mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center">
                  <Checkbox
                    id={`category-${category}`}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => toggleCategory(category)}
                  />
                  <Label
                    htmlFor={`category-${category}`}
                    className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Sort Options */}
          <div>
            <h3 className="text-lg font-display mb-4">Sort By</h3>
            <RadioGroup value={sortOption} onValueChange={setSortOption}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="featured" id="featured" />
                <Label htmlFor="featured">Featured</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="price-low-high" id="price-low-high" />
                <Label htmlFor="price-low-high">Price: Low to High</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="price-high-low" id="price-high-low" />
                <Label htmlFor="price-high-low">Price: High to Low</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="name-a-z" id="name-a-z" />
                <Label htmlFor="name-a-z">Name: A to Z</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="name-z-a" id="name-z-a" />
                <Label htmlFor="name-z-a">Name: Z to A</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        {/* Mobile Filters Sidebar */}
        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 lg:hidden">
            <div className="absolute right-0 top-0 h-full w-80 bg-gray-900 p-6 overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-display">Filters</h2>
                <Button variant="ghost" size="icon" onClick={() => setMobileFiltersOpen(false)}>
                  <X className="h-6 w-6" />
                </Button>
              </div>

              <Button variant="outline" size="sm" onClick={resetFilters} className="mb-6 w-full">
                Reset All Filters
              </Button>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h3 className="text-lg font-display mb-4">Price Range</h3>
                <Slider
                  defaultValue={[0, 3000]}
                  max={3000}
                  step={50}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>

              {/* Categories Filter */}
              <div className="mb-6">
                <h3 className="text-lg font-display mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center">
                      <Checkbox
                        id={`mobile-category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                      />
                      <Label
                        htmlFor={`mobile-category-${category}`}
                        className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sort Options */}
              <div>
                <h3 className="text-lg font-display mb-4">Sort By</h3>
                <RadioGroup value={sortOption} onValueChange={setSortOption}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="featured" id="mobile-featured" />
                    <Label htmlFor="mobile-featured">Featured</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="price-low-high" id="mobile-price-low-high" />
                    <Label htmlFor="mobile-price-low-high">Price: Low to High</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="price-high-low" id="mobile-price-high-low" />
                    <Label htmlFor="mobile-price-high-low">Price: High to Low</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="name-a-z" id="mobile-name-a-z" />
                    <Label htmlFor="mobile-name-a-z">Name: A to Z</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="name-z-a" id="mobile-name-z-a" />
                    <Label htmlFor="mobile-name-z-a">Name: Z to A</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="mt-8">
                <Button
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-700"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="flex-grow">
          {/* Sort Dropdown for Medium Screens */}
          <div className="hidden sm:flex lg:hidden justify-between items-center mb-6">
            <Button variant="outline" className="flex items-center gap-2" onClick={() => setMobileFiltersOpen(true)}>
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </Button>

            <select
              className="retro-input py-2 px-4 rounded-md"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="name-a-z">Name: A to Z</option>
              <option value="name-z-a">Name: Z to A</option>
            </select>
          </div>

          {/* Active Filters */}
          {(selectedCategories.length > 0 || searchQuery || priceRange[0] > 0 || priceRange[1] < 3000) && (
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedCategories.map((category) => (
                <div key={category} className="bg-gray-800 px-3 py-1 rounded-full text-sm flex items-center">
                  {category}
                  <Button variant="ghost" size="icon" className="h-5 w-5 ml-1" onClick={() => toggleCategory(category)}>
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}

              {(priceRange[0] > 0 || priceRange[1] < 3000) && (
                <div className="bg-gray-800 px-3 py-1 rounded-full text-sm flex items-center">
                  ${priceRange[0]} - ${priceRange[1]}
                  <Button variant="ghost" size="icon" className="h-5 w-5 ml-1" onClick={() => setPriceRange([0, 3000])}>
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}

              {searchQuery && (
                <div className="bg-gray-800 px-3 py-1 rounded-full text-sm flex items-center">
                  "{searchQuery}"
                  <Button variant="ghost" size="icon" className="h-5 w-5 ml-1" onClick={() => setSearchQuery("")}>
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}

              <Button variant="ghost" size="sm" className="text-sm" onClick={resetFilters}>
                Clear All
              </Button>
            </div>
          )}

          {filteredProducts.length === 0 ? (
            <div className="glass-card rounded-xl p-8 text-center">
              <h3 className="text-xl font-display mb-4">No Products Found</h3>
              <p className="text-gray-400 mb-6">We couldn't find any products matching your criteria.</p>
              <Button variant="outline" onClick={resetFilters}>
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
