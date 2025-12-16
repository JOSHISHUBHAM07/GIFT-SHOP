import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ChevronLeft, ChevronRight, Minus, Plus, Heart, Share2, Truck, Gift, RotateCcw } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { products } from "@/data/products";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addItem } = useCartStore();
  const { toast } = useToast();

  // Mock multiple images for gallery
  const images = product ? [
    product.image,
    product.image.replace("w=600", "w=601"),
    product.image.replace("w=600", "w=602"),
  ] : [];

  if (!product) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-32 pb-16 text-center">
          <h1 className="font-display text-3xl font-semibold mb-4">Product Not Found</h1>
          <Link to="/products">
            <Button variant="outline">Back to Shop</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    toast({
      title: "Added to cart",
      description: `${quantity} × ${product.name} added to your cart`,
    });
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <>
      <Helmet>
        <title>{product.name} | The Gift</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <div className="min-h-screen">
        <Navbar />
        <CartDrawer />

        {/* Breadcrumb */}
        <div className="pt-24 pb-4 bg-secondary/30">
          <div className="container mx-auto px-4 lg:px-8">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
              <span>/</span>
              <Link to="/products" className="hover:text-foreground transition-colors">Shop</Link>
              <span>/</span>
              <span className="text-foreground">{product.name}</span>
            </nav>
          </div>
        </div>

        {/* Product Section */}
        <section className="py-12">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Image Gallery */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="aspect-square relative overflow-hidden rounded-2xl bg-secondary/50">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImageIndex}
                      src={images[currentImageIndex]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </AnimatePresence>

                  {/* Navigation Arrows */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {product.isNew && (
                      <Badge className="bg-primary text-primary-foreground">New</Badge>
                    )}
                    {product.originalPrice && (
                      <Badge variant="secondary">Sale</Badge>
                    )}
                  </div>
                </div>

                {/* Thumbnail Dots */}
                <div className="flex justify-center gap-2 mt-4">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentImageIndex
                          ? "bg-primary w-6"
                          : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                      }`}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Product Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col"
              >
                <span className="text-primary font-medium text-sm tracking-wide uppercase mb-2">
                  {product.category}
                </span>
                <h1 className="font-display text-3xl lg:text-4xl font-semibold text-foreground mb-4">
                  {product.name}
                </h1>

                {/* Price */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-display text-2xl font-semibold text-foreground">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-muted-foreground line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                <p className="text-muted-foreground leading-relaxed mb-8">
                  {product.description}
                </p>

                {/* Quantity & Add to Cart */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex items-center border border-border rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-muted transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 hover:bg-muted transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <Button
                    size="lg"
                    className="flex-1 rounded-full"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </Button>

                  <Button variant="outline" size="icon" className="rounded-full">
                    <Heart className="h-5 w-5" />
                  </Button>

                  <Button variant="outline" size="icon" className="rounded-full">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>

                {/* Features */}
                <div className="grid grid-cols-3 gap-4 py-6 border-t border-b border-border mb-8">
                  <div className="text-center">
                    <Truck className="h-5 w-5 mx-auto mb-2 text-primary" />
                    <span className="text-xs text-muted-foreground">Free Shipping</span>
                  </div>
                  <div className="text-center">
                    <Gift className="h-5 w-5 mx-auto mb-2 text-primary" />
                    <span className="text-xs text-muted-foreground">Gift Wrapping</span>
                  </div>
                  <div className="text-center">
                    <RotateCcw className="h-5 w-5 mx-auto mb-2 text-primary" />
                    <span className="text-xs text-muted-foreground">Easy Returns</span>
                  </div>
                </div>

                {/* Accordion Info */}
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="shipping">
                    <AccordionTrigger className="font-medium">
                      Shipping Information
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Free standard shipping on orders over $75. Express shipping available at checkout. 
                      Most orders arrive within 3-5 business days.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="gift-wrap">
                    <AccordionTrigger className="font-medium">
                      Gift Wrapping Options
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Add our signature gift wrapping for $5. Includes premium kraft paper, 
                      ribbon, and a handwritten note card. Select at checkout.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="returns">
                    <AccordionTrigger className="font-medium">
                      Returns & Exchanges
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      We offer free returns within 30 days of purchase. Items must be unused 
                      and in original packaging. Contact us to initiate a return.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-16 bg-secondary/30">
            <div className="container mx-auto px-4 lg:px-8">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display text-2xl lg:text-3xl font-semibold text-center mb-12"
              >
                You May Also Like
              </motion.h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link to={`/product/${item.id}`}>
                      <div className="group bg-background rounded-xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300">
                        <div className="aspect-square overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium text-foreground">{item.name}</h3>
                          <p className="text-primary font-semibold">${item.price.toFixed(2)}</p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        <Footer />
      </div>
    </>
  );
};

export default ProductDetail;
