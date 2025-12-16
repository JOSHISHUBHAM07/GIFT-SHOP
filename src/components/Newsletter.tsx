import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Send, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitting(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      toast({
        title: "Welcome to The Gift!",
        description: "You've been added to our newsletter. Check your inbox for a special welcome offer!",
      });
      setEmail("");
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 lg:py-32 bg-gradient-to-br from-primary via-primary to-blush relative overflow-hidden">
      {/* Decorative elements */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary-foreground/10 blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-primary-foreground/5 blur-2xl"
        animate={{ 
          scale: [1, 0.8, 1],
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 mb-6"
          >
            <Sparkles className="h-4 w-4 text-primary-foreground" />
            <span className="text-primary-foreground/90 text-sm font-medium">Get 10% off your first order</span>
          </motion.div>
          
          <h2 className="font-display text-4xl lg:text-5xl font-semibold text-primary-foreground mb-4">
            Join Our Circle
          </h2>
          <p className="text-primary-foreground/80 mb-8 text-lg">
            Subscribe for exclusive offers, new arrivals, and gifting inspiration delivered straight to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <motion.div 
              className="flex-1"
              whileFocus={{ scale: 1.02 }}
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-primary-foreground rounded-full px-6"
                required
              />
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                type="submit" 
                className="h-14 px-8 rounded-full bg-foreground text-background hover:bg-foreground/90 font-medium"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <motion.div
                    className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                ) : (
                  <>
                    Subscribe
                    <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </motion.div>
          </form>

          <p className="text-primary-foreground/60 text-sm mt-6">
            No spam, unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
