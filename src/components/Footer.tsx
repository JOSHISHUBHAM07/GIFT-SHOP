import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Instagram, href: "#" },
    { icon: Facebook, href: "#" },
    { icon: Twitter, href: "#" },
  ];

  return (
    // Changed bg-foreground to bg-neutral-950 (standard dark color) to fix visibility
    // Changed text-primary-foreground to text-white
    <footer id="contact" className="bg-neutral-950 text-white py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <h3 className="font-display text-2xl font-semibold mb-4">
              The Gift<span className="text-primary">.</span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Curating thoughtful gifts and artisan treasures since 2015. Every
              gift tells a story.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => {
                // Fix: Capitalize component name for React
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-display text-lg font-semibold mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                "Shop All",
                "New Arrivals",
                "Best Sellers",
                "Gift Cards",
                "Sale",
              ].map((link) => (
                <li key={link}>
                  <motion.a
                    href="#"
                    className="text-gray-400 hover:text-primary transition-colors text-sm inline-block"
                    whileHover={{ x: 4 }}
                  >
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Customer Care */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-display text-lg font-semibold mb-5">
              Customer Care
            </h4>
            <ul className="space-y-3">
              {[
                "FAQ",
                "Shipping Info",
                "Returns & Exchanges",
                "Gift Wrapping",
                "Track Order",
              ].map((link) => (
                <li key={link}>
                  <motion.a
                    href="#"
                    className="text-gray-400 hover:text-primary transition-colors text-sm inline-block"
                    whileHover={{ x: 4 }}
                  >
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="font-display text-lg font-semibold mb-5">
              Visit Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">
                  123 Artisan Lane, Brooklyn, NY 11201
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <span className="text-gray-400 text-sm">(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-gray-400 text-sm">hello@thegift.com</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-white/10 mt-16 pt-8 text-center"
        >
          <p className="text-gray-500 text-sm">
            © {currentYear} The Gift. All rights reserved. Made with love.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
