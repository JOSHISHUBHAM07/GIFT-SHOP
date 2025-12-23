import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Search, Home, ArrowLeft } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
        {/* Animated Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="w-24 h-24 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-primary/10"
        >
          <Search className="h-10 w-10 text-muted-foreground" />
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h1 className="font-display text-6xl md:text-8xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">
            404
          </h1>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">
            Page Not Found
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto mb-10 leading-relaxed">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link to="/">
            <Button
              size="lg"
              className="btn-primary rounded-full px-8 h-12 w-full sm:w-auto"
            >
              <Home className="mr-2 h-4 w-4" /> Go Home
            </Button>
          </Link>
          <Link to="/products">
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 h-12 w-full sm:w-auto border-white/10 hover:bg-white/5"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Browse Shop
            </Button>
          </Link>
        </motion.div>
      </div>
    </Layout>
  );
};

export default NotFound;
