"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const CallToActionSection = () => {
  return (
    <div className="relative py-24">
      <Image
        src="/landing-call-to-action.jpg"
        alt="Rentiful Search Section Background"
        fill
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative max-w-4xl xl:max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 py-12"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">
            Find Your Dream Rental Property
          </h2>
          <p className="mt-3 text-white">
            Discover a wide range of rental properties in your desired
            location.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default CallToActionSection;
