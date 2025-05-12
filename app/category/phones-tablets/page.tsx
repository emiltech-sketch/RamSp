import { Suspense } from "react"
import CategoryPage from "@/components/category-page"
import Loading from "../all/loading"

// Mock data for demonstration - filtered for phones & tablets
const products = [
  {
    id: "1",
    name: "Samsung Galaxy S21 Ultra 5G - 128GB - Phantom Black",
    price: 450000,
    originalPrice: 550000,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.5,
    brand: "Samsung",
    category: "Phones & Tablets",
    discount: 18,
    freeShipping: true,
    officialStore: true,
  },
  {
    id: "2",
    name: "Apple iPhone 13 Pro Max - 256GB - Sierra Blue",
    price: 750000,
    originalPrice: 820000,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.8,
    brand: "Apple",
    category: "Phones & Tablets",
    discount: 9,
    freeShipping: true,
    officialStore: true,
  },
  {
    id: "18",
    name: "Google Pixel 6 Pro - 128GB - Stormy Black",
    price: 380000,
    originalPrice: 420000,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.6,
    brand: "Google",
    category: "Phones & Tablets",
    discount: 10,
    freeShipping: true,
    officialStore: true,
  },
  {
    id: "19",
    name: "Xiaomi Redmi Note 10 Pro - 128GB - Glacier Blue",
    price: 120000,
    originalPrice: 150000,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.3,
    brand: "Xiaomi",
    category: "Phones & Tablets",
    discount: 20,
    freeShipping: false,
    officialStore: false,
  },
  {
    id: "20",
    name: "Samsung Galaxy Tab S7+ - 128GB - Mystic Black",
    price: 350000,
    originalPrice: 400000,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.7,
    brand: "Samsung",
    category: "Phones & Tablets",
    discount: 13,
    freeShipping: true,
    officialStore: true,
  },
  {
    id: "21",
    name: 'Apple iPad Pro 12.9" (2021) - 256GB - Space Gray',
    price: 650000,
    originalPrice: 700000,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.9,
    brand: "Apple",
    category: "Phones & Tablets",
    discount: 7,
    freeShipping: true,
    officialStore: true,
  },
  {
    id: "22",
    name: "OnePlus 9 Pro - 256GB - Morning Mist",
    price: 320000,
    originalPrice: 380000,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.5,
    brand: "OnePlus",
    category: "Phones & Tablets",
    discount: 16,
    freeShipping: true,
    officialStore: false,
  },
  {
    id: "23",
    name: "Huawei MatePad Pro - 128GB - Midnight Grey",
    price: 220000,
    originalPrice: 250000,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.2,
    brand: "Huawei",
    category: "Phones & Tablets",
    discount: 12,
    freeShipping: false,
    officialStore: true,
  },
]

export default function PhonesTabletsCategoryPage() {
  return (
    <Suspense fallback={<Loading />}>
      <CategoryPage title="Phones & Tablets" products={products} />
    </Suspense>
  )
}
