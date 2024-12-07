"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, UtensilsCrossed } from "lucide-react";
import Image from "next/image";
import { RotatingText } from "./RotatingText";

export function HeroSection() {
  return (
    <section className="container mx-auto px-4 py-10 h-[calc(100vh-140px)]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Fastest
            <br />
            <span className="text-yellow-500">Delivery</span> &
            <br />
            Easy <span className="text-yellow-500">Pickup</span>
          </h1>

          <p className="mt-4 text-gray-600">
            When you&apos;re craving cheesy goodness,
            <br />
            we&apos;re just a click away!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          <div className="relative w-full aspect-square">
            <div className="absolute inset-0" />
            <Image
              src="/burger.png"
              alt="Delicious Cheese Burger"
              width={400}
              height={400}
              className="relative z-10 rounded-full object-cover"
            />

            <RotatingText />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-8"
        >
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Fast delivery</h3>
              <p className="text-gray-600">Promise to deliver within 30 mins</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Pick up</h3>
              <p className="text-gray-600">Pickup delivery at your doorstep</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
              <UtensilsCrossed className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Dine in</h3>
              <p className="text-gray-600">
                Enjoy your food fresh crispy and hot
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
