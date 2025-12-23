import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import {
  Scale,
  FileText,
  AlertCircle,
  Ban,
  ScrollText,
  CheckCircle2,
} from "lucide-react";

const Terms = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <Layout>
      <div className="relative min-h-screen pt-24 pb-12 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          {/* Header */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 border border-white/10 mb-6 shadow-xl">
              <ScrollText className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Terms of Service
            </h1>
            <p className="text-muted-foreground text-lg">
              Last updated: December 2025
            </p>
          </motion.div>

          <div className="space-y-8">
            {/* Intro */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-card/50 backdrop-blur-sm border border-white/5 rounded-2xl p-8"
            >
              <p className="text-lg text-foreground/90 leading-relaxed">
                Welcome to <strong>The Gift</strong>. By accessing our website,
                you agree to be bound by these terms of service, all applicable
                laws and regulations, and agree that you are responsible for
                compliance with any applicable local laws.
              </p>
            </motion.div>

            {/* Section 1: License */}
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
                    1. Use License
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Permission is granted to temporarily download one copy of
                    the materials (information or software) on The Gift's
                    website for personal, non-commercial transitory viewing
                    only. This is the grant of a license, not a transfer of
                    title, and under this license you may not:
                  </p>
                  <ul className="grid sm:grid-cols-1 gap-2 text-muted-foreground ml-4">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" /> Modify
                      or copy the materials;
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" /> Use the
                      materials for any commercial purpose;
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" /> Attempt
                      to decompile or reverse engineer any software;
                    </li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Section 2: Disclaimer */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-card border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-colors"
            >
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-primary mt-1 shrink-0" />
                <div>
                  <h2 className="font-display text-2xl font-semibold mb-4">
                    2. Disclaimer
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    The materials on The Gift's website are provided on an 'as
                    is' basis. The Gift makes no warranties, expressed or
                    implied, and hereby disclaims and negates all other
                    warranties including, without limitation, implied warranties
                    or conditions of merchantability, fitness for a particular
                    purpose, or non-infringement of intellectual property or
                    other violation of rights.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Section 3: Limitations */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-card border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-colors"
            >
              <div className="flex items-start gap-4">
                <Ban className="w-6 h-6 text-primary mt-1 shrink-0" />
                <div>
                  <h2 className="font-display text-2xl font-semibold mb-4">
                    3. Limitations
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    In no event shall The Gift or its suppliers be liable for
                    any damages (including, without limitation, damages for loss
                    of data or profit, or due to business interruption) arising
                    out of the use or inability to use the materials on The
                    Gift's website, even if The Gift or a authorized
                    representative has been notified orally or in writing of the
                    possibility of such damage.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Section 4: Governing Law */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-card border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-colors"
            >
              <div className="flex items-start gap-4">
                <Scale className="w-6 h-6 text-primary mt-1 shrink-0" />
                <div>
                  <h2 className="font-display text-2xl font-semibold mb-4">
                    4. Governing Law
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    These terms and conditions are governed by and construed in
                    accordance with the laws of the United States and you
                    irrevocably submit to the exclusive jurisdiction of the
                    courts in that State or location.
                  </p>
                </div>
              </div>
            </motion.section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;
