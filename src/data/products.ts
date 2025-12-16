export interface Product {
  id: number;
  image: string;
  name: string;
  price: number;
  originalPrice?: number;
  isNew?: boolean;
  category: string;
  description?: string;
}

export const products: Product[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?w=600&h=600&fit=crop",
    name: "Artisan Candle Set",
    price: 45.00,
    isNew: true,
    category: "Home",
    description: "Hand-poured soy candles with natural essential oils",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=600&h=600&fit=crop",
    name: "Ceramic Vase Collection",
    price: 68.00,
    originalPrice: 85.00,
    category: "Décor",
    description: "Handcrafted ceramic vases in minimalist designs",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop",
    name: "Handwoven Basket",
    price: 52.00,
    category: "Storage",
    description: "Sustainable seagrass basket for stylish organization",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&h=600&fit=crop",
    name: "Luxury Gift Box",
    price: 95.00,
    isNew: true,
    category: "Gifts",
    description: "Curated collection of premium artisan goods",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=600&fit=crop",
    name: "Dried Flower Arrangement",
    price: 38.00,
    category: "Décor",
    description: "Everlasting botanical arrangement in neutral tones",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1532301791573-4e6ce86a085f?w=600&h=600&fit=crop",
    name: "Linen Table Runner",
    price: 42.00,
    originalPrice: 55.00,
    category: "Home",
    description: "Soft linen runner with elegant frayed edges",
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?w=600&h=600&fit=crop",
    name: "Botanical Print Set",
    price: 75.00,
    category: "Art",
    description: "Set of 3 vintage-inspired botanical illustrations",
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?w=600&h=600&fit=crop",
    name: "Wooden Serving Board",
    price: 58.00,
    isNew: true,
    category: "Kitchen",
    description: "Artisan-crafted acacia wood serving board",
  },
];

export const categories = ["All", "Home", "Décor", "Storage", "Gifts", "Art", "Kitchen"];
