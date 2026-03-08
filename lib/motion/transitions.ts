// apps/web/lib/motion/transitions.ts
export const smoothTransition = {
  duration: 0.55,
  ease: "easeOut" as const,
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};