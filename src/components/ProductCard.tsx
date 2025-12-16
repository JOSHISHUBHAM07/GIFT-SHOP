import { Heart, ShoppingBag, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { addItem, openCart } = useCartStore();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addItem(product);
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your bag.`,
    });
    openCart();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group"
    >
      <motion.div
        className="card-product relative"
        whileHover={{ y: -8 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />

          {/* Badges */}
          {product.isNew && (
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1.5 text-xs font-semibold rounded-full shadow-lg"
            >
              New
            </motion.span>
          )}
          {product.originalPrice && (
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1.5 text-xs font-semibold rounded-full shadow-lg"
            >
              Sale
            </motion.span>
          )}

          {/* Wishlist Button */}
          <motion.div
            className="absolute top-4 right-4 opacity-0 group-hover:opacity-100"
            initial={false}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {!product.originalPrice && (
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full shadow-lg bg-card/90 backdrop-blur-sm h-10 w-10"
              >
                <Heart className="h-4 w-4" />
              </Button>
            )}
          </motion.div>

          {/* Quick Add Button - Slides up on hover */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-4"
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ opacity: 1, y: 0 }}
            animate={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Button
                  className="w-full rounded-full bg-foreground text-background hover:bg-foreground/90 shadow-float h-12 font-medium"
                  onClick={handleAddToCart}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Quick Add
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Overlay gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </div>

        {/* Content */}
        <Link to={`/product/${product.id}`} className="block p-5">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
            {product.category}
          </p>
          <h3 className="font-display text-lg font-medium text-foreground group-hover:text-primary transition-colors duration-300">
            {product.name}
          </h3>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-foreground font-semibold text-lg">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-muted-foreground line-through text-sm">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default ProductCard;
