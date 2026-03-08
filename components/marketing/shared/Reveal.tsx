"use client";

import { motion } from "framer-motion";
import { smoothTransition } from "@/lib/motion/transitions";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

export default function Reveal({
  children,
  className,
  delay = 0,
  y = 20,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ ...smoothTransition, delay }}
    >
      {children}
    </motion.div>
  );
}