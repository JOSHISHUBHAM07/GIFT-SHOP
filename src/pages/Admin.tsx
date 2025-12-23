import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/supabaseClient";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Package,
  DollarSign,
  TrendingUp,
  ShoppingBag,
  Loader2,
  Plus,
  Trash2,
  Edit,
  Check,
  X,
  Search,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Admin = () => {
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "products" | "orders"
  >("dashboard");
  const [loading, setLoading] = useState(true);

  // Data State
  const [stats, setStats] = useState({ revenue: 0, orders: 0, products: 0 });
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);

  // Add Product State
  const [isAdding, setIsAdding] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "Apparel",
    image: "",
    description: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch Products
      const { data: prodData } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });
      // Fetch Orders
      const { data: orderData } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (prodData) setProducts(prodData);
      if (orderData) setOrders(orderData);

      // Calc Stats
      const revenue =
        orderData?.reduce(
          (sum, order) => sum + Number(order.total_amount),
          0
        ) || 0;
      setStats({
        revenue,
        orders: orderData?.length || 0,
        products: prodData?.length || 0,
      });
    } catch (error) {
      toast.error("Error loading admin data");
    } finally {
      setLoading(false);
    }
  };

  // --- ACTIONS ---

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from("products").insert([
        {
          name: newProduct.name,
          price: Number(newProduct.price),
          category: newProduct.category,
          image: newProduct.image,
          description: newProduct.description,
          is_featured: true, // Default to featured
        },
      ]);

      if (error) throw error;

      toast.success("Product created!");
      setIsAdding(false);
      setNewProduct({
        name: "",
        price: "",
        category: "Apparel",
        image: "",
        description: "",
      });
      fetchData(); // Refresh list
    } catch (error: any) {
      toast.error("Failed to add product: " + error.message);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
      toast.success("Product deleted");
      setProducts(products.filter((p) => p.id !== id));
    } catch (error: any) {
      toast.error("Error deleting: " + error.message);
    }
  };

  const handleStatusUpdate = async (orderId: number, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("orders")
        .update({ status: newStatus })
        .eq("id", orderId);

      if (error) throw error;
      toast.success(`Order #${orderId} marked as ${newStatus}`);
      setOrders(
        orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>Admin Dashboard</title>
      </Helmet>

      <div className="container mx-auto px-4 py-12 min-h-screen">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="font-display text-3xl font-bold">Admin Control</h1>

          {/* Custom Tabs */}
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
            {["dashboard", "products", "orders"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab
                    ? "bg-primary text-white shadow-lg"
                    : "text-muted-foreground hover:text-white"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* --- DASHBOARD TAB --- */}
        {activeTab === "dashboard" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="p-6 rounded-2xl bg-card border border-white/5 shadow-lg flex items-center gap-4">
              <div className="p-4 rounded-xl bg-green-500/10 text-green-500">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <p className="text-muted-foreground">Total Revenue</p>
                <h3 className="text-2xl font-bold">
                  ${stats.revenue.toFixed(2)}
                </h3>
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-card border border-white/5 shadow-lg flex items-center gap-4">
              <div className="p-4 rounded-xl bg-blue-500/10 text-blue-500">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div>
                <p className="text-muted-foreground">Total Orders</p>
                <h3 className="text-2xl font-bold">{stats.orders}</h3>
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-card border border-white/5 shadow-lg flex items-center gap-4">
              <div className="p-4 rounded-xl bg-purple-500/10 text-purple-500">
                <Package className="w-6 h-6" />
              </div>
              <div>
                <p className="text-muted-foreground">Total Products</p>
                <h3 className="text-2xl font-bold">{stats.products}</h3>
              </div>
            </div>
          </motion.div>
        )}

        {/* --- PRODUCTS TAB --- */}
        {activeTab === "products" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Inventory</h2>
              <Button
                onClick={() => setIsAdding(!isAdding)}
                className={isAdding ? "bg-red-500 hover:bg-red-600" : ""}
              >
                {isAdding ? (
                  <>
                    <X className="mr-2 h-4 w-4" /> Cancel
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" /> Add Product
                  </>
                )}
              </Button>
            </div>

            {/* Add Product Form */}
            <AnimatePresence>
              {isAdding && (
                <motion.form
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  onSubmit={handleAddProduct}
                  className="bg-white/5 border border-white/10 p-6 rounded-2xl mb-8 overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div>
                      <Label>Name</Label>
                      <Input
                        required
                        value={newProduct.name}
                        onChange={(e) =>
                          setNewProduct({ ...newProduct, name: e.target.value })
                        }
                        className="bg-black/20"
                      />
                    </div>
                    <div>
                      <Label>Price ($)</Label>
                      <Input
                        type="number"
                        required
                        value={newProduct.price}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            price: e.target.value,
                          })
                        }
                        className="bg-black/20"
                      />
                    </div>
                    <div>
                      <Label>Category</Label>
                      <Input
                        required
                        value={newProduct.category}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            category: e.target.value,
                          })
                        }
                        className="bg-black/20"
                      />
                    </div>
                    <div>
                      <Label>Image URL</Label>
                      <Input
                        required
                        placeholder="https://..."
                        value={newProduct.image}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            image: e.target.value,
                          })
                        }
                        className="bg-black/20"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label>Description</Label>
                      <Input
                        required
                        value={newProduct.description}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            description: e.target.value,
                          })
                        }
                        className="bg-black/20"
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full">
                    Save Product
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Products List */}
            <div className="space-y-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-4 p-4 bg-card border border-white/5 rounded-xl hover:border-white/10 transition-colors"
                >
                  <img
                    src={product.image}
                    className="w-12 h-12 rounded-lg object-cover bg-white/10"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">{product.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      ${product.price}
                    </p>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-white/5 text-xs">
                    {product.category}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteProduct(product.id)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* --- ORDERS TAB --- */}
        {activeTab === "orders" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-xl font-semibold mb-6">Order Management</h2>
            <div className="space-y-4">
              {orders.length === 0 ? (
                <p className="text-muted-foreground">No orders yet.</p>
              ) : (
                orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-6 bg-card border border-white/5 rounded-2xl flex flex-col md:flex-row justify-between gap-6"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-bold text-lg">
                          Order #{order.id}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {new Date(order.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-muted-foreground">
                        Customer:{" "}
                        <span className="text-foreground">
                          {order.customer_name}
                        </span>
                      </p>
                      <p className="text-muted-foreground">
                        Total:{" "}
                        <span className="text-green-400 font-medium">
                          ${order.total_amount}
                        </span>
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <Select
                        defaultValue={order.status}
                        onValueChange={(val) =>
                          handleStatusUpdate(order.id, val)
                        }
                      >
                        <SelectTrigger className="w-[140px] bg-white/5 border-white/10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="shipped">Shipped</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default Admin;
