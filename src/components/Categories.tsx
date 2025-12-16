import { Gift, Heart, Home, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";

interface Category {
  icon: LucideIcon;
  name: string;
  description: string;
  gradient: string;
}

const categories: Category[] = [
  {
    icon: Gift,
    name: "Wrapped Gifts",
    description: "Beautifully packaged presents ready to give",
    gradient: "from-blush-light to-peach",
  },
  {
    icon: Home,
    name: "Home Décor",
    description: "Artisan pieces to beautify any space",
    gradient: "from-mint-light to-mint",
  },
  {
    icon: Heart,
    name: "For Her",
    description: "Curated gifts she'll treasure forever",
    gradient: "from-lavender-light to-lavender",
  },
  {
    icon: Sparkles,
    name: "Special Occasions",
    description: "Make every celebration memorable",
    gradient: "from-cream to-accent",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const Categories = () => {
  return (
    <section id="categories" className="py-24 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-block text-primary font-medium tracking-widest text-sm uppercase mb-3"
          >
            Browse
          </motion.span>
          <h2 className="font-display text-4xl lg:text-5xl font-semibold text-foreground">
            Shop by Category
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Explore our thoughtfully curated collections designed to help you find the perfect gift
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.map((category) => (
            <motion.a
              key={category.name}
              href="#"
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group relative p-8 rounded-2xl bg-card shadow-soft overflow-hidden"
            >
              {/* Background gradient on hover */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />
              
              {/* Content */}
              <div className="relative z-10">
                <motion.div
                  className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-6 group-hover:bg-card/50 transition-colors duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <category.icon className="h-8 w-8 text-primary" />
                </motion.div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-foreground transition-colors">
                  {category.name}
                </h3>
                <p className="text-muted-foreground text-sm group-hover:text-foreground/70 transition-colors">
                  {category.description}
                </p>
              </div>

              {/* Arrow indicator */}
              <motion.div
                className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity"
                initial={{ x: -10 }}
                whileHover={{ x: 0 }}
              >
                <div className="w-8 h-8 rounded-full bg-foreground/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </motion.div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Categories;
