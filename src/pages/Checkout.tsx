import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, Lock, CreditCard, Truck, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import Layout from "@/components/layout/Layout";

const orderItems = [
  { name: "Merino Wool Sweater", price: 189, quantity: 1 },
  { name: "Linen Blend Trousers", price: 145, quantity: 2 },
  { name: "Cotton Canvas Tote", price: 68, quantity: 1 },
];

const Checkout = () => {
  const [step, setStep] = useState<"shipping" | "payment">("shipping");
  const [shippingMethod, setShippingMethod] = useState("standard");

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = shippingMethod === "express" ? 25 : 0;
  const total = subtotal + shipping;

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <Link
          to="/cart"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to cart
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Checkout Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="order-2 lg:order-1"
          >
            {/* Progress Steps */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step === "shipping" ? "bg-primary text-primary-foreground" : "bg-success text-success-foreground"}`}>
                  {step === "payment" ? <Check className="h-4 w-4" /> : "1"}
                </div>
                <span className="text-sm font-medium">Shipping</span>
              </div>
              <div className="flex-1 h-px bg-border" />
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step === "payment" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                  2
                </div>
                <span className={`text-sm font-medium ${step === "payment" ? "" : "text-muted-foreground"}`}>Payment</span>
              </div>
            </div>

            {step === "shipping" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <h2 className="font-display text-2xl">Shipping Information</h2>

                {/* Contact */}
                <div className="space-y-4">
                  <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Contact</h3>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="your@email.com" className="mt-1.5" />
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-4">
                  <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Shipping Address</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" className="mt-1.5" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" className="mt-1.5" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" placeholder="123 Main Street" className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                    <Input id="apartment" placeholder="Apt 4B" className="mt-1.5" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="New York" className="mt-1.5" />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input id="state" placeholder="NY" className="mt-1.5" />
                    </div>
                    <div>
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input id="zip" placeholder="10001" className="mt-1.5" />
                    </div>
                  </div>
                </div>

                {/* Shipping Method */}
                <div className="space-y-4">
                  <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Shipping Method</h3>
                  <RadioGroup value={shippingMethod} onValueChange={setShippingMethod} className="space-y-3">
                    <label className="flex items-center justify-between p-4 border border-border rounded-lg cursor-pointer hover:bg-accent/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="standard" id="standard" />
                        <div>
                          <p className="font-medium">Standard Shipping</p>
                          <p className="text-sm text-muted-foreground">5-7 business days</p>
                        </div>
                      </div>
                      <span className="font-medium">Free</span>
                    </label>
                    <label className="flex items-center justify-between p-4 border border-border rounded-lg cursor-pointer hover:bg-accent/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="express" id="express" />
                        <div>
                          <p className="font-medium">Express Shipping</p>
                          <p className="text-sm text-muted-foreground">2-3 business days</p>
                        </div>
                      </div>
                      <span className="font-medium">$25.00</span>
                    </label>
                  </RadioGroup>
                </div>

                <Button size="lg" className="w-full" onClick={() => setStep("payment")}>
                  Continue to Payment
                </Button>
              </motion.div>
            )}

            {step === "payment" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <h2 className="font-display text-2xl">Payment Details</h2>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 p-3 bg-accent/50 rounded-lg text-sm">
                    <Lock className="h-4 w-4 text-muted-foreground" />
                    <span>Your payment information is encrypted and secure</span>
                  </div>

                  <div>
                    <Label htmlFor="cardName">Name on Card</Label>
                    <Input id="cardName" placeholder="John Doe" className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <div className="relative mt-1.5">
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="pr-12" />
                      <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" className="mt-1.5" />
                    </div>
                    <div>
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="123" className="mt-1.5" />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" size="lg" onClick={() => setStep("shipping")}>
                    Back
                  </Button>
                  <Button size="lg" className="flex-1">
                    Place Order · ${total.toFixed(2)}
                  </Button>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="order-1 lg:order-2"
          >
            <div className="bg-card border border-border rounded-lg p-6 lg:sticky lg:top-24">
              <h2 className="font-display text-xl mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                {orderItems.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.name} × {item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between font-medium text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                <Truck className="h-4 w-4" />
                <span>Estimated delivery: Dec 20-23</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
