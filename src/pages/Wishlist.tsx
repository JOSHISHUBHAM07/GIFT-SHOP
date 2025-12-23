import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X, Heart, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { supabase } from "@/supabaseClient";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";

const Wishlist = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      setLoading(false);
      return; // Show empty state if not logged in
    }

    try {
      // Fetch wishlist items AND the related product data
      const { data, error } = await supabase
        .from("wishlist")
        .select("*, products(*)") // Join with products table
        .eq("user_id", session.user.id);

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error("Error loading wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (id: number) => {
    const { error } = await supabase.from("wishlist").delete().eq("id", id); // Delete by wishlist ID

    if (!error) {
      setItems(items.filter((item) => item.id !== id));
      toast.success("Removed from wishlist");
    }
  };

  const moveToCart = (item: any) => {
    addItem({ ...item.products, quantity: 1 }); // item.products contains the joined product data
    toast.success("Added to cart");
    removeFromWishlist(item.id);
  };

  if (loading) {
    return (
      <Layout>
        <div className="h-[60vh] flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <h1 className="font-display text-4xl font-bold mb-8 flex items-center gap-3">
          <Heart className="h-8 w-8 text-primary fill-primary" />
          My Wishlist
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
            <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-6">
              Save items you love to revisit them later.
            </p>
            <Button onClick={() => navigate("/products")}>
              Start Shopping
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-card border border-white/5 rounded-2xl overflow-hidden group"
                >
                  <div className="relative aspect-square">
                    <img
                      src={item.products.image}
                      alt={item.products.name}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="absolute top-3 right-3 p-2 bg-black/50 backdrop-blur rounded-full text-white hover:bg-red-500 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium truncate">
                      {item.products.name}
                    </h3>
                    <p className="text-primary font-semibold mb-4">
                      ${item.products.price}
                    </p>
                    <Button className="w-full" onClick={() => moveToCart(item)}>
                      <ShoppingBag className="mr-2 h-4 w-4" /> Add to Cart
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Wishlist;
