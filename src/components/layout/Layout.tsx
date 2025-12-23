import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background text-foreground font-body flex flex-col">
      <Navbar />
      <CartDrawer />
      {/* The Navbar is fixed to the top, so we add padding-top (pt-24) 
        to ensure the page content isn't hidden behind it.
      */}
      <main className="flex-1 pt-24">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
