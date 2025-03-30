// src/components/AnimateInView.tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface AnimateInViewProps {
  children: React.ReactNode;
  delay?: number;
}

export function AnimateInView({ children, delay = 0 }: AnimateInViewProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.5,
        delay: delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}
