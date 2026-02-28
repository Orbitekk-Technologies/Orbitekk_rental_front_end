"use client";

import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-[color:var(--border)]">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="text-xl font-semibold tracking-tight text-[color:var(--brand)]">
            ProNest
          </div>
        </div>

        {/* Links */}
        <nav className="ml-auto hidden md:flex items-center gap-7 text-sm text-[color:var(--muted)]">
          {["About Us", "Properties", "Services", "Contact Us"].map((item) => (
            <motion.a
              key={item}
              href="#"
              whileHover={{ y: -1 }}
              className="hover:text-black transition-colors"
            >
              {item}
            </motion.a>
          ))}
        </nav>

        {/* Auth buttons */}
        <div className="ml-auto md:ml-6 flex items-center gap-3">
          <motion.a
            href="/auth/login"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 text-sm rounded-full border border-[color:var(--border)] hover:border-black transition"
          >
            Login
          </motion.a>

          <motion.a
            href="/auth/register"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 text-sm rounded-full bg-[color:var(--brand)] text-white hover:opacity-95 transition"
          >
            Register
          </motion.a>
        </div>
      </div>
    </header>
  );
}