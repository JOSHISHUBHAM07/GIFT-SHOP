import { Leaf, Heart, Package } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Leaf,
    title: "Sustainably Sourced",
    description: "Every product is ethically made with care for our planet",
  },
  {
    icon: Heart,
    title: "Made with Love",
    description: "Handcrafted by skilled artisans from around the world",
  },
  {
    icon: Package,
    title: "Gift Ready",
    description: "Beautifully wrapped and ready to give",
  },
];

const About = () => {
  return (
    <section id="about" className="py-24 lg:py-32 bg-mint-light/50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-4">
              <motion.img
                src="https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=400&h=500&fit=crop"
                alt="Artisan crafts"
                className="rounded-2xl shadow-soft w-full h-64 object-cover"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              />
              <motion.img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop"
                alt="Gift wrapping"
                className="rounded-2xl shadow-soft w-full h-48 object-cover"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              />
            </div>
            <div className="pt-8">
              <motion.img
                src="https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?w=400&h=600&fit=crop"
                alt="Candles and decor"
                className="rounded-2xl shadow-soft w-full h-80 object-cover"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-primary font-medium tracking-widest text-sm uppercase">
              Our Story
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-semibold text-foreground mt-3 mb-6">
              Curating Joy Since 2015
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed text-lg">
              The Gift was born from a simple belief: that every gift should tell a story. 
              We travel the world to discover unique, handcrafted treasures from talented 
              artisans who pour their heart into every piece.
            </p>
            <p className="text-muted-foreground mb-10 leading-relaxed">
              From the cozy candles that light up your evenings to the ceramic pieces 
              that add character to your home, each item in our collection is chosen 
              with intention and love.
            </p>

            <div className="space-y-5">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-4 group"
                >
                  <motion.div
                    className="w-14 h-14 rounded-2xl bg-card flex items-center justify-center flex-shrink-0 shadow-soft"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <feature.icon className="h-6 w-6 text-primary" />
                  </motion.div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
