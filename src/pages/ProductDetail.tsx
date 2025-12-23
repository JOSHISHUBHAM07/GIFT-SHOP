import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, Minus, Plus, Loader2, ShoppingBag } from "lucide-react";
import Layout from "@/components/layout/Layout"; // <--- Wrapper for Navbar/Footer
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/supabaseClient";

// Define the shape of your product
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const { addItem, updateQuantity, items } = useCartStore();

  // Fetch Single Product from Supabase
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      setLoading(true);

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching product:", error);
        toast.error("Product not found");
      } else {
        setProduct(data);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    // 1. Add item to store (Store logic adds +1 if exists, or sets to 1 if new)
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });

    // 2. OPTIONAL: If you want to force the specific quantity selected:
    // This overrides the default "add 1" logic of the store
    if (quantity > 1) {
      // Find if item is already in cart to get current qty, or just set it
      const currentItem = items.find((i) => i.id === product.id);
      const newQty = currentItem
        ? currentItem.quantity + (quantity - 1)
        : quantity;
      updateQuantity(product.id, newQty);
    }

    toast.success("Added to cart", {
      description: `${quantity}x ${product.name} is now in your bag.`,
    });
  };

  if (loading) {
    return (
      <Layout>
        <div className="h-[80vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="h-[50vh] flex flex-col items-center justify-center gap-4">
          <h2 className="text-2xl font-bold">Product not found</h2>
          <Button asChild variant="outline">
            <Link to="/">Return to Shop</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 md:py-20">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors group"
        >
          <ChevronLeft className="w-4 h-4 mr-1 transition-transform group-hover:-translate-x-1" />
          Back to Shop
        </Link>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="aspect-square bg-card/50 rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative group">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </motion.div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-center"
          >
            <span className="text-primary font-medium tracking-widest text-sm uppercase mb-3">
              {product.category}
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 leading-tight">
              {product.name}
            </h1>
            <p className="text-3xl font-light text-foreground mb-6">
              ${product.price.toFixed(2)}
            </p>

            <div className="prose prose-invert text-muted-foreground mb-10 leading-relaxed">
              <p>{product.description}</p>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/10">
              <div className="flex items-center bg-card border border-white/10 rounded-full h-14 w-fit px-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-medium text-lg">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <Button
                size="lg"
                className="flex-1 btn-primary h-14 rounded-full text-base font-medium shadow-lg shadow-primary/20"
                onClick={handleAddToCart}
              >
                <ShoppingBag className="mr-2 w-5 h-5" />
                Add to Cart
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
