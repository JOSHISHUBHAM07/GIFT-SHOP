import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { User, Package, Heart, Settings, LogOut, ChevronRight, MapPin, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";

const orders = [
  {
    id: "ORD-2024-001",
    date: "Dec 10, 2024",
    status: "Delivered",
    total: 334,
    items: 3,
  },
  {
    id: "ORD-2024-002",
    date: "Nov 28, 2024",
    status: "In Transit",
    total: 189,
    items: 1,
  },
  {
    id: "ORD-2024-003",
    date: "Nov 15, 2024",
    status: "Delivered",
    total: 456,
    items: 4,
  },
];

const Account = () => {
  const [activeTab, setActiveTab] = useState("orders");

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-4 mb-6">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&fit=crop" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-medium">Jane Doe</h2>
                  <p className="text-sm text-muted-foreground">jane@email.com</p>
                </div>
              </div>

              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab("orders")}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${activeTab === "orders" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent/50"}`}
                >
                  <Package className="h-4 w-4" />
                  Orders
                </button>
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${activeTab === "profile" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent/50"}`}
                >
                  <User className="h-4 w-4" />
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab("addresses")}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${activeTab === "addresses" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent/50"}`}
                >
                  <MapPin className="h-4 w-4" />
                  Addresses
                </button>
                <button
                  onClick={() => setActiveTab("payment")}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${activeTab === "payment" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent/50"}`}
                >
                  <CreditCard className="h-4 w-4" />
                  Payment Methods
                </button>
                <Link
                  to="/wishlist"
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
                >
                  <Heart className="h-4 w-4" />
                  Wishlist
                </Link>
              </nav>

              <div className="mt-6 pt-6 border-t border-border">
                <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-destructive">
                  <LogOut className="h-4 w-4 mr-3" />
                  Sign Out
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3"
          >
            {activeTab === "orders" && (
              <div>
                <h1 className="font-display text-2xl md:text-3xl mb-6">Order History</h1>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <Card key={order.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <span className="font-medium">{order.id}</span>
                              <Badge
                                variant={order.status === "Delivered" ? "default" : "secondary"}
                                className={order.status === "Delivered" ? "bg-success hover:bg-success" : ""}
                              >
                                {order.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {order.date} · {order.items} items
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="font-medium">${order.total.toFixed(2)}</span>
                            <Button variant="outline" size="sm">
                              View Details
                              <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "profile" && (
              <div>
                <h1 className="font-display text-2xl md:text-3xl mb-6">Profile Settings</h1>
                <Card>
                  <CardContent className="p-6 space-y-6">
                    <div className="flex items-center gap-6">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&fit=crop" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <Button variant="outline">Change Photo</Button>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">First Name</label>
                        <input className="w-full mt-1.5 px-3 py-2 border border-border rounded-md bg-background" defaultValue="Jane" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Last Name</label>
                        <input className="w-full mt-1.5 px-3 py-2 border border-border rounded-md bg-background" defaultValue="Doe" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-sm font-medium">Email</label>
                        <input className="w-full mt-1.5 px-3 py-2 border border-border rounded-md bg-background" defaultValue="jane@email.com" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-sm font-medium">Phone</label>
                        <input className="w-full mt-1.5 px-3 py-2 border border-border rounded-md bg-background" defaultValue="+1 (555) 123-4567" />
                      </div>
                    </div>
                    <Button>Save Changes</Button>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "addresses" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h1 className="font-display text-2xl md:text-3xl">Saved Addresses</h1>
                  <Button>Add New Address</Button>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <Badge>Default</Badge>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </div>
                      <p className="font-medium">Home</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        123 Main Street, Apt 4B<br />
                        New York, NY 10001<br />
                        United States
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <span />
                        <Button variant="ghost" size="sm">Edit</Button>
                      </div>
                      <p className="font-medium">Office</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        456 Business Ave, Suite 100<br />
                        New York, NY 10002<br />
                        United States
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === "payment" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h1 className="font-display text-2xl md:text-3xl">Payment Methods</h1>
                  <Button>Add New Card</Button>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <Badge>Default</Badge>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded flex items-center justify-center">
                          <span className="text-[10px] font-bold text-white">VISA</span>
                        </div>
                        <div>
                          <p className="font-medium">•••• •••• •••• 4242</p>
                          <p className="text-sm text-muted-foreground">Expires 12/25</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Account;
