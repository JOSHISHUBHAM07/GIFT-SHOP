import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Package, LogOut, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/supabaseClient";
import Layout from "@/components/layout/Layout";
import { toast } from "sonner";

const Account = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    // 1. Get Current User
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
      return;
    }
    setUser(session.user);

    // 2. Fetch User's Orders
    const { data: ordersData, error } = await supabase
      .from("orders")
      .select("*")
      .eq("email", session.user.email) // Match order email to user email
      .order("created_at", { ascending: false });

    if (ordersData) setOrders(ordersData);
    setLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
    toast.success("Signed out successfully");
  };

  if (loading)
    return (
      <Layout>
        <div className="h-[60vh] flex items-center justify-center">
          <Loader2 className="animate-spin" />
        </div>
      </Layout>
    );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold">My Account</h1>
            <p className="text-muted-foreground">{user?.email}</p>
          </div>
          <Button variant="outline" onClick={handleSignOut} className="gap-2">
            <LogOut className="w-4 h-4" /> Sign Out
          </Button>
        </div>

        {/* Orders Section */}
        <div className="bg-card/50 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-sm">
          <div className="p-6 border-b border-white/10 flex items-center gap-3">
            <Package className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Order History</h2>
          </div>

          <div className="divide-y divide-white/5">
            {orders.length === 0 ? (
              <div className="p-12 text-center text-muted-foreground">
                <p>No orders found.</p>
                <Button
                  variant="link"
                  onClick={() => navigate("/")}
                  className="text-primary mt-2"
                >
                  Start Shopping
                </Button>
              </div>
            ) : (
              orders.map((order) => (
                <div
                  key={order.id}
                  className="p-6 flex flex-col md:flex-row justify-between md:items-center gap-4 hover:bg-white/5 transition-colors"
                >
                  <div>
                    <p className="font-medium text-lg">Order #{order.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20">
                      {order.status}
                    </span>
                    <p className="font-bold text-lg">${order.total_amount}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Account;
