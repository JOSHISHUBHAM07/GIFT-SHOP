import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";

const Privacy = () => {
  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="font-display text-3xl md:text-4xl mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: December 16, 2024</p>

          <div className="prose prose-neutral max-w-none space-y-8">
            <section>
              <h2 className="font-display text-xl md:text-2xl mb-4">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                Welcome to Maison. We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you visit our website or make a purchase.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl md:text-2xl mb-4">2. Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We collect information you provide directly to us, such as:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Name, email address, and contact information</li>
                <li>Billing and shipping addresses</li>
                <li>Payment information (processed securely through our payment providers)</li>
                <li>Order history and preferences</li>
                <li>Communications with our customer service team</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl md:text-2xl mb-4">3. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Process and fulfill your orders</li>
                <li>Send transactional emails (order confirmations, shipping updates)</li>
                <li>Provide customer support</li>
                <li>Send marketing communications (with your consent)</li>
                <li>Improve our website and services</li>
                <li>Prevent fraud and enhance security</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl md:text-2xl mb-4">4. Information Sharing</h2>
              <p className="text-muted-foreground leading-relaxed">
                We do not sell your personal information. We may share your information with third-party service providers who assist us in operating our website, conducting our business, or serving our users, including payment processors, shipping carriers, and email service providers. These parties are contractually obligated to keep your information confidential.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl md:text-2xl mb-4">5. Cookies and Tracking</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can manage your cookie preferences through your browser settings. Essential cookies are required for the website to function properly.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl md:text-2xl mb-4">6. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. All payment transactions are encrypted using SSL technology.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl md:text-2xl mb-4">7. Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Depending on your location, you may have the right to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Data portability</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl md:text-2xl mb-4">8. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions about this privacy policy or our data practices, please contact us at:
              </p>
              <p className="text-muted-foreground mt-4">
                <strong className="text-foreground">Email:</strong> privacy@maison.com<br />
                <strong className="text-foreground">Address:</strong> 123 Fashion Avenue, New York, NY 10001
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Privacy;
