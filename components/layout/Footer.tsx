"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-yellow-100 text-yellow-800 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Image src="/logo.png" alt="logo" width={100} height={100} />
            <p className="mb-4">
              Bringing you the cheesiest delights since 2023!
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Facebook className="w-6 h-6" />
                <span className="sr-only">Facebook</span>
              </motion.a>
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Instagram className="w-6 h-6" />
                <span className="sr-only">Instagram</span>
              </motion.a>
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Twitter className="w-6 h-6" />
                <span className="sr-only">Twitter</span>
              </motion.a>
            </div>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["Home", "Menu", "Contact"].map((item) => (
                <li key={item}>
                  <motion.div whileHover={{ x: 5 }}>
                    <Link
                      href={`/${item.toLowerCase().replace(" ", "-")}`}
                      className="hover:text-yellow-600 transition-colors"
                    >
                      {item}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Newsletter</h4>
            <p className="mb-4">Stay up to date with our cheesy news!</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex md:hidden lg:flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <motion.button
                type="submit"
                className="bg-yellow-500 text-white px-4 py-2 rounded-r-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-yellow-200 text-center">
          <p>&copy; {currentYear} Cheesy Cheese. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
