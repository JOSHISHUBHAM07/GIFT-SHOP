import { Heart, Plus, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";
import { supabase } from "@/supabaseClient";
import { useState } from "react";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
  isNew?: boolean;
  originalPrice?: number;
}

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { addItem, openCart } = useCartStore();
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const navigate = useNavigate();

  // --- UPDATED: Force Login on Add to Cart ---
  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // 1. Check if user is logged in
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      toast.error("Please login to shop", {
        description: "You need an account to add items to your cart.",
      });
      navigate("/auth"); // Redirect to login
      return;
    }

    // 2. Add to Cart (Only if logged in)
    addItem({ ...product, quantity: 1 });
    toast.success(`${product.name} added to cart`);
    openCart();
  };

  const handleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Check if logged in
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      toast.error("Please login to save items");
      navigate("/auth");
      return;
    }

    setWishlistLoading(true);
    try {
      const { error } = await supabase
        .from("wishlist")
        .insert([{ user_id: session.user.id, product_id: product.id }]);

      if (error) {
        if (error.code === "23505") {
          // Unique constraint error
          toast("Item already in wishlist");
        } else {
          throw error;
        }
      } else {
        toast.success("Saved to wishlist! ❤️");
      }
    } catch (error: any) {
      toast.error("Error saving item");
    } finally {
      setWishlistLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <motion.div
        className="card-product relative rounded-2xl overflow-hidden bg-card border border-white/5 shadow-lg"
        whileHover={{ y: -8 }}
        transition={{ duration: 0.4 }}
      >
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Link to={`/product/${product.id}`}>
            <motion.img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.6 }}
            />
          </Link>

          {/* Wishlist Button */}
          <motion.div className="absolute top-4 right-4 z-20">
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full shadow-lg bg-black/40 backdrop-blur-md text-white hover:bg-red-500 hover:text-white border-none h-10 w-10 transition-colors"
              onClick={handleWishlist}
              disabled={wishlistLoading}
            >
              {wishlistLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Heart className="h-4 w-4" />
              )}
            </Button>
          </motion.div>

          {/* Quick Add Button */}
          <div className="absolute bottom-0 left-0 right-0 p-4 z-20 overflow-hidden">
            <div className="translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
              <Button
                className="w-full rounded-full bg-primary text-white hover:bg-primary/90 shadow-lg h-12 font-medium"
                onClick={handleAddToCart}
              >
                <Plus className="h-4 w-4 mr-2" />
                Quick Add
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <Link to={`/product/${product.id}`} className="block p-5">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
            {product.category}
          </p>
          <h3 className="font-display text-lg font-medium text-foreground truncate">
            {product.name}
          </h3>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-foreground font-semibold text-lg">
              ${product.price.toFixed(2)}
            </span>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default ProductCard;
