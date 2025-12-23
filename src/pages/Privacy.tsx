import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Shield, Lock, Eye, FileText, Mail, MapPin } from "lucide-react";

const Privacy = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <Layout>
      <div className="relative min-h-screen pt-24 pb-12 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 border border-white/10 mb-6 shadow-xl">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground text-lg">
              Last updated: December 2025
            </p>
          </motion.div>

          <div className="space-y-8">
            {/* Section 1 */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-card border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-colors"
            >
              <div className="flex items-start gap-4">
                <FileText className="w-6 h-6 text-primary mt-1 shrink-0" />
                <div>
                  <h2 className="font-display text-2xl font-semibold mb-4">
                    1. Introduction
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Welcome to <strong>The Gift</strong>. We respect your
                    privacy and are committed to protecting your personal data.
                    This privacy policy explains how we collect, use, and
                    safeguard your information when you visit our website or
                    make a purchase.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Section 2 */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-card border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-colors"
            >
              <div className="flex items-start gap-4">
                <Eye className="w-6 h-6 text-primary mt-1 shrink-0" />
                <div>
                  <h2 className="font-display text-2xl font-semibold mb-4">
                    2. Information We Collect
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We collect information you provide directly to us, such as:
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-3 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />{" "}
                      Name & Contact Info
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />{" "}
                      Billing & Shipping Addresses
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />{" "}
                      Payment Information
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />{" "}
                      Order History
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />{" "}
                      Customer Support Chats
                    </li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Section 3 */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-card border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-colors"
            >
              <div className="flex items-start gap-4">
                <Lock className="w-6 h-6 text-primary mt-1 shrink-0" />
                <div>
                  <h2 className="font-display text-2xl font-semibold mb-4">
                    3. Data Security & Usage
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We do not sell your personal information. We use your data
                    to:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-2">
                    <li>Process and fulfill your orders securely.</li>
                    <li>
                      Send transactional emails (order confirmations, shipping
                      updates).
                    </li>
                    <li>
                      Improve our website and services based on user behavior.
                    </li>
                    <li>
                      Prevent fraud and enhance platform security [SSL
                      Encrypted].
                    </li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Section 4 */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-card border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-colors"
            >
              <h2 className="font-display text-2xl font-semibold mb-4">
                4. Cookies and Tracking
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We use cookies and similar technologies to enhance your browsing
                experience, analyze site traffic, and personalize content. You
                can manage your cookie preferences through your browser
                settings. Essential cookies are required for the website to
                function properly.
              </p>
            </motion.section>

            {/* Section 5: Contact */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-primary/5 border border-primary/10 rounded-2xl p-8 text-center"
            >
              <h2 className="font-display text-2xl font-semibold mb-6">
                Questions? Contact Us
              </h2>
              <div className="flex flex-col md:flex-row justify-center gap-8">
                <div className="flex items-center justify-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <span className="text-foreground">privacy@thegift.com</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="text-foreground">
                    123 Gift Lane, San Francisco, CA
                  </span>
                </div>
              </div>
            </motion.section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;
