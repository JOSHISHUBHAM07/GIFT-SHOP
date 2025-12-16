import { useState } from "react";
import { motion } from "framer-motion";
import AdminSidebar from "@/components/admin/AdminSidebar";
import ProductTable from "@/components/admin/ProductTable";
import AddProductDialog from "@/components/admin/AddProductDialog";
import { Button } from "@/components/ui/button";
import { Plus, Package, DollarSign, TrendingUp, Users } from "lucide-react";
import { products, Product } from "@/data/products";
import { Helmet } from "react-helmet-async";

const statCards = [
  {
    label: "Total Products",
    value: products.length.toString(),
    icon: Package,
    change: "+2 this week",
  },
  {
    label: "Total Revenue",
    value: "$12,450",
    icon: DollarSign,
    change: "+15% from last month",
  },
  {
    label: "Orders",
    value: "156",
    icon: TrendingUp,
    change: "+8% from last month",
  },
  {
    label: "Customers",
    value: "89",
    icon: Users,
    change: "+12 new this week",
  },
];

const Admin = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  const handleEdit = (product: Product) => {
    setEditProduct(product);
    setDialogOpen(true);
  };

  const handleDialogClose = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      setEditProduct(null);
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | The Gift</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="flex min-h-screen bg-background">
        <AdminSidebar />

        <main className="flex-1 p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-serif text-3xl font-semibold text-foreground">
                  Dashboard
                </h1>
                <p className="text-muted-foreground mt-1">
                  Welcome back! Here's what's happening with your store.
                </p>
              </div>
              <Button onClick={() => setDialogOpen(true)} className="gap-2">
                <Plus className="w-4 h-4" />
                Add Product
              </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statCards.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card rounded-xl border border-border p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <stat.icon className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <p className="text-2xl font-semibold text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {stat.label}
                  </p>
                  <p className="text-xs text-primary mt-2">{stat.change}</p>
                </motion.div>
              ))}
            </div>

            {/* Products Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-xl font-semibold text-foreground">
                  Products
                </h2>
                <p className="text-sm text-muted-foreground">
                  {products.length} items
                </p>
              </div>
              <ProductTable onEdit={handleEdit} />
            </div>
          </motion.div>
        </main>

        <AddProductDialog
          open={dialogOpen}
          onOpenChange={handleDialogClose}
          editProduct={editProduct}
        />
      </div>
    </>
  );
};

export default Admin;
