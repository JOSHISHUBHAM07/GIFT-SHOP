import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, X, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";

interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image: string;
  inStock: boolean;
}

const initialWishlist: WishlistItem[] = [
  {
    id: 1,
    name: "Cashmere Blend Coat",
    price: 495,
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&h=500&fit=crop",
    inStock: true,
  },
  {
    id: 2,
    name: "Silk Blend Scarf",
    price: 128,
    image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400&h=500&fit=crop",
    inStock: true,
  },
  {
    id: 3,
    name: "Leather Crossbody Bag",
    price: 285,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=500&fit=crop",
    inStock: false,
  },
  {
    id: 4,
    name: "Wool Blend Beanie",
    price: 58,
    image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400&h=500&fit=crop",
    inStock: true,
  },
];

const Wishlist = () => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>(initialWishlist);

  const removeItem = (id: number) => {
    setWishlist((items) => items.filter((item) => item.id !== id));
  };

  if (wishlist.length === 0) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto"
          >
            <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
            <h1 className="font-display text-3xl mb-4">Your wishlist is empty</h1>
            <p className="text-muted-foreground mb-8">
              Save your favorite items to purchase later.
            </p>
            <Link to="/">
              <Button size="lg">Start Shopping</Button>
            </Link>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-display text-3xl md:text-4xl">My Wishlist</h1>
            <p className="text-muted-foreground mt-2">{wishlist.length} items saved</p>
          </motion.div>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share Wishlist
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-muted">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <button
                  onClick={() => removeItem(item.id)}
                  className="absolute top-3 right-3 w-8 h-8 bg-background/90 backdrop-blur rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
                >
                  <X className="h-4 w-4" />
                </button>
                {!item.inStock && (
                  <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                    <span className="px-3 py-1.5 bg-background text-sm font-medium rounded-md">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>
              <div className="mt-4">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-muted-foreground mt-1">${item.price.toFixed(2)}</p>
                <Button
                  className="w-full mt-3"
                  variant={item.inStock ? "default" : "outline"}
                  disabled={!item.inStock}
                >
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  {item.inStock ? "Add to Cart" : "Notify Me"}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Wishlist;
