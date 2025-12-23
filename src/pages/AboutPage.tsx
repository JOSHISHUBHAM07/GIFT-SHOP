import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Heart, Leaf, Package, Users, Award, Sparkles } from "lucide-react";
import Layout from "@/components/layout/Layout"; // <--- Using the unified Layout
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AboutPage = () => {
  const values = [
    {
      icon: Heart,
      title: "Crafted with Care",
      description:
        "Every product is thoughtfully selected and quality-checked to ensure it meets our high standards.",
    },
    {
      icon: Leaf,
      title: "Sustainably Sourced",
      description:
        "We partner with artisans who share our commitment to eco-friendly practices and materials.",
    },
    {
      icon: Package,
      title: "Beautifully Packaged",
      description:
        "Each order arrives gift-ready with our signature packaging and personal touches.",
    },
    {
      icon: Users,
      title: "Community First",
      description:
        "We support local makers and small businesses, helping creativity thrive in our community.",
    },
  ];

  const stats = [
    { number: "10K+", label: "Happy Customers" },
    { number: "500+", label: "Unique Products" },
    { number: "50+", label: "Artisan Partners" },
    { number: "5", label: "Years of Joy" },
  ];

  const team = [
    {
      name: "Sarah Mitchell",
      role: "Founder & Creative Director",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    },
    {
      name: "James Chen",
      role: "Head of Curation",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    },
    {
      name: "Emma Rodriguez",
      role: "Customer Experience",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    },
  ];

  return (
    <Layout>
      <Helmet>
        <title>About Us | The Gift - Our Story & Values</title>
        <meta
          name="description"
          content="Discover the story behind The Gift. Learn about our mission to bring joy through thoughtfully curated gifts and sustainable practices."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-20 pb-20 bg-gradient-to-b from-primary/5 to-background relative overflow-hidden">
        {/* Animated Background Element */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-primary/5 to-transparent rounded-full"
          />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6"
            >
              <Sparkles className="h-8 w-8 text-primary" />
            </motion.div>
            <h1 className="font-display text-4xl lg:text-5xl font-semibold text-foreground mb-6">
              The Art of Giving
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Founded in 2019, The Gift began with a simple belief: every gift
              should tell a story. We curate unique, artisan-made treasures that
              bring joy to both the giver and receiver.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-3xl lg:text-4xl font-semibold text-foreground mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  What started as a passion project in a small San Francisco
                  apartment has grown into a beloved destination for thoughtful
                  gift-givers around the world.
                </p>
                <p>
                  Our founder, Sarah, spent years traveling and collecting
                  beautiful handmade objects from artisans she met along the
                  way. Friends and family constantly asked where she found such
                  unique pieces, and The Gift was born from that shared love of
                  discovery.
                </p>
                <p>
                  Today, we work directly with over 50 artisan partners across
                  the globe, ensuring fair wages and sustainable practices while
                  bringing you one-of-a-kind products you won't find anywhere
                  else.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-white/5 border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=800&h=1000&fit=crop"
                  alt="Artisan crafting"
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="absolute -bottom-8 -left-8 bg-card border border-white/10 p-6 rounded-2xl shadow-xl"
              >
                <Award className="h-8 w-8 text-primary mb-2" />
                <p className="font-display font-semibold text-foreground">
                  Award Winning
                </p>
                <p className="text-sm text-muted-foreground">
                  Best Local Gift Shop 2023
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl lg:text-4xl font-semibold text-foreground mb-4">
              Our Values
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do, from sourcing to
              shipping.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-8 rounded-2xl bg-card border border-white/5 hover:border-primary/20 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary">
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring" }}
                className="text-center"
              >
                <span className="font-display text-4xl lg:text-5xl font-bold text-primary">
                  {stat.number}
                </span>
                <p className="text-muted-foreground mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl lg:text-4xl font-semibold text-foreground mb-4">
              Meet Our Team
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The passionate people behind the magic of The Gift.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="text-center group"
              >
                <div className="relative mb-4 overflow-hidden rounded-2xl aspect-square bg-white/5 border border-white/10">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {member.name}
                </h3>
                <p className="text-muted-foreground text-sm">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="font-display text-3xl font-semibold text-foreground mb-4">
              Ready to Find the Perfect Gift?
            </h2>
            <p className="text-muted-foreground mb-8">
              Browse our curated collection and discover something special for
              everyone on your list.
            </p>
            <Link to="/products">
              <Button
                size="lg"
                className="rounded-full px-8 h-12 btn-primary shadow-lg hover:shadow-primary/25"
              >
                Shop Our Collection
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
