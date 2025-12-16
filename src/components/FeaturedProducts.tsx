import { useState, useEffect } from "react";
import { supabase } from "@/supabaseClient"; // <--- Connected to Backend
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, SlidersHorizontal, Loader2 } from "lucide-react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { toast } from "sonner";

// We define the shape of a Product from Supabase
interface Product {
  id: number;
  name: string;
  price: number;
  image_url: string;
  category: string;
}

// Hardcoded categories for the filter buttons
// (You can also fetch these from DB later if you want)
const categories = ["All", "Mugs", "Stationery", "Decor", "Accessories"];

const FeaturedProducts = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [products, setProducts] = useState<Product[]>([]); // <--- Real Data State
  const [loading, setLoading] = useState(true);

  // 1. Fetch Data from Supabase on Load
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      if (data) setProducts(data);
    } catch (error: any) {
      console.error("Error fetching products:", error);
      toast.error("Could not load products");
    } finally {
      setLoading(false);
    }
  };

  // 2. Filter the REAL data
  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  if (loading) {
    return (
      <div className="py-32 flex justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <section id="products" className="py-24 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
        >
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-block text-primary font-medium tracking-widest text-sm uppercase mb-3"
            >
              Featured
            </motion.span>
            <h2 className="font-display text-4xl lg:text-5xl font-semibold text-foreground">
              Our Bestsellers
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl">
              Hand-picked favorites loved by our customers
            </p>
          </div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="ghost"
              className="mt-6 md:mt-0 text-primary hover:text-primary/80 group rounded-full"
            >
              View All Products
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-3 mb-10 overflow-x-auto pb-2 scrollbar-hide"
        >
          <div className="flex items-center gap-2 mr-2 text-muted-foreground">
            <SlidersHorizontal className="h-4 w-4" />
            <span className="text-sm font-medium whitespace-nowrap">
              Filter:
            </span>
          </div>
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`relative px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === category
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {activeCategory === category && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{category}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Product Grid */}
        <LayoutGroup>
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard
                    // 3. Mapping DB fields to your component props
                    product={{
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image_url, // DB field is 'image_url', prop is 'image'
                      category: product.category,
                    }}
                    index={index}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-muted-foreground">
              No products found in this category.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
