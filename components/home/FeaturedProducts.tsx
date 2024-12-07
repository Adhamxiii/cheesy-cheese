"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  reviews: number;
}

const products: Product[] = [
  {
    id: 1,
    name: "Chicken Burger",
    image: "/p2.png",
    price: 3.5,
    reviews: 160,
  },
  {
    id: 2,
    name: "Chicken Pizza",
    image: "/p1.png",
    price: 4.2,
    reviews: 142,
  },
  {
    id: 3,
    name: "Chicken Fry",
    image: "/p3.png",
    price: 5.0,
    reviews: 123,
  },
];

export function FeaturedProducts() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-yellow-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-800">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14">
          {products.map((product) => (
            <motion.a
              href={`/products/${product.id}`}
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex items-end justify-between bg-[#fffbf0] shadow-lg rounded-3xl p-6 relative h-60"
            >
              <div className="flex flex-col flex-1">
                <h3 className="text-2xl font-bold mb-2 text-gray-800">
                  {product.name}
                </h3>

                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                  <span className="text-sm text-gray-500 ml-2">
                    ({product.reviews})
                  </span>
                </div>

                <div className="flex items-center justify-between w-full mt-auto">
                  <span className="text-2xl font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#ffce6b] text-white px-6 py-2 rounded-full font-medium hover:bg-[#e5ab5a] transition duration-300"
                  >
                    Buy Now
                  </motion.button>
                </div>
              </div>

              <div className="absolute -top-10 right-0 ml-6 flex-shrink-0">
                <div className="rounded-full w-40 h-40 max-lg:size-28 max-md:size-40 flex items-center justify-center">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={120}
                    height={120}
                    className="rounded-full object-cover size-full"
                  />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
