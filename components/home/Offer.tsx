"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function Offer() {
  return (
    <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/offerBg.png')`,
          backgroundBlendMode: "overlay",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="flex max-md:flex-col justify-center relative h-full container mx-auto px-4">
        <div className=" flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <h2 className="text-5xl md:text-7xl font-bold text-yellow-100 mb-6 leading-tight">
              CHEESE
              <br />
              OVERLOAD
            </h2>
            <p className="text-lg text-yellow-50/90 max-w-xl">
              Indulge in the ultimate cheese experience with our King Burger,
              loaded with layers of creamy, gooey, melted cheese. It&apos;s a
              symphony of flavor, crafted to satisfy all your cheesy cravings!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 px-8 py-3 bg-yellow-500 text-black font-semibold rounded-full 
                       hover:bg-yellow-400 transition-colors"
            >
              Order Now
            </motion.button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 m-auto"
        >
          <Image
            src="/offerProduct.png"
            alt=""
            width={400}
            height={400}
            className="m-auto w-[580px] h-[290px] object-cover max-lg:hidden"
          />
        </motion.div>
      </div>
    </section>
  );
}
