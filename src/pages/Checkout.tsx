import { useState } from "react";
import { ChevronLeft, Lock, Loader2, CreditCard } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCartStore } from "@/store/cartStore";
import { supabase } from "@/supabaseClient";
import { toast } from "sonner";
import Layout from "@/components/layout/Layout"; // <--- Using the unified Layout

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);

  // Form State including Payment Fields
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    address: "",
    city: "",
    zip: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setLoading(true);

    // 1. Simulate Payment Gateway Processing (2 seconds delay)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      // 2. Create Order in Supabase
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert([
          {
            customer_name: formData.name,
            email: formData.email,
            address: formData.address,
            city: formData.city,
            zip: formData.zip,
            total_amount: totalPrice(),
            status: "paid", // Auto-mark as paid for this demo
          },
        ])
        .select()
        .single();

      if (orderError) throw orderError;

      // 3. Create Order Items
      const orderItemsData = items.map((item) => ({
        order_id: orderData.id,
        product_id: item.id,
        quantity: item.quantity,
        price_at_purchase: item.price,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItemsData);
      if (itemsError) throw itemsError;

      // 4. Success!
      toast.success("Payment Successful! 🎉", {
        description: `Order #${orderData.id} has been confirmed.`,
      });

      clearCart();
      navigate("/account"); // Redirect to Order History
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to Shop
        </Link>

        <h1 className="font-display text-4xl font-bold mb-8 text-gradient">
          Secure Checkout
        </h1>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* --- LEFT COLUMN: FORM --- */}
          <form onSubmit={handlePlaceOrder} className="space-y-8">
            {/* Shipping Info */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Shipping Details</h3>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    required
                    onChange={handleInputChange}
                    className="bg-white/5 border-white/10"
                    placeholder="John Doe"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    onChange={handleInputChange}
                    className="bg-white/5 border-white/10"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Input
                    id="address"
                    required
                    onChange={handleInputChange}
                    className="bg-white/5 border-white/10"
                    placeholder="123 Gift Lane"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      required
                      onChange={handleInputChange}
                      className="bg-white/5 border-white/10"
                      placeholder="New York"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input
                      id="zip"
                      required
                      onChange={handleInputChange}
                      className="bg-white/5 border-white/10"
                      placeholder="10001"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Info (Visual Only) */}
            <div className="space-y-4 pt-6 border-t border-white/10">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" /> Payment Method
              </h3>
              <div className="grid gap-4 p-6 rounded-xl bg-white/5 border border-white/10">
                <div className="grid gap-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="0000 0000 0000 0000"
                    maxLength={19}
                    required
                    onChange={handleInputChange}
                    className="bg-black/20 border-white/10 font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      maxLength={5}
                      required
                      onChange={handleInputChange}
                      className="bg-black/20 border-white/10 font-mono"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input
                      id="cvc"
                      placeholder="123"
                      maxLength={3}
                      type="password"
                      required
                      onChange={handleInputChange}
                      className="bg-black/20 border-white/10 font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full btn-primary h-14 text-lg"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="animate-spin" /> Processing Payment...
                </div>
              ) : (
                `Pay $${totalPrice().toFixed(2)}`
              )}
            </Button>

            <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-2">
              <Lock className="w-3 h-3" /> SSL Encrypted Transaction
            </p>
          </form>

          {/* --- RIGHT COLUMN: SUMMARY --- */}
          <div className="glass rounded-2xl p-8 h-fit">
            <h3 className="text-xl font-semibold mb-6 border-b border-white/10 pb-4">
              Order Summary
            </h3>
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center text-sm group"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded overflow-hidden bg-white/5">
                      <img
                        src={item.image}
                        className="w-full h-full object-cover"
                        alt={item.name}
                      />
                    </div>
                    <span>
                      {item.name}{" "}
                      <span className="text-muted-foreground ml-1">
                        x{item.quantity}
                      </span>
                    </span>
                  </div>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-white/10 mt-6 pt-4 flex justify-between font-bold text-lg text-primary">
              <span>Total</span>
              <span>${totalPrice().toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
