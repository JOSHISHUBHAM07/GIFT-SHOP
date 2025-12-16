import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import FeaturedProducts from "@/components/FeaturedProducts";
import About from "@/components/About";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <CartDrawer />
      <main>
        <Hero />
        <Categories />
        <FeaturedProducts />
        <About />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
