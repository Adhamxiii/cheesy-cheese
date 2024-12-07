"use client";

import { motion } from "framer-motion";
import { LogOut, Phone, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Menu from "./Menu";
import { signOut, useSession } from "next-auth/react";
import { useCartStore } from "@/utils/store";

const links = [
  { id: 1, title: "Home", url: "/" },
  { id: 2, title: "Menu", url: "/menu" },
  { id: 3, title: "Contact", url: "/contact" },
];

const Navbar = () => {
  const { data: session, status } = useSession();

  const {totalItems} = useCartStore();

  const user = session?.user || status === "authenticated";
  return (
    <header className="h-12 text-yellow-500 p-4 flex items-center justify-between border-b-2 border-b-yellow-500 uppercase md:h-24 lg:px-20 xl:px-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <nav className="hidden md:flex items-center space-x-8">
            {links.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={item.url}
                  className="text-yellow-800 font-medium hover:text-yellow-600 transition-colors uppercase"
                >
                  {item.title}
                </Link>
              </motion.div>
            ))}
          </nav>

          <motion.div
            // className="absolute left-1/2 transform -translate-x-1/2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Cheesy Cheese Logo"
                width={90}
                height={90}
                className="rounded-full size-12 md:size-24"
              />
            </Link>
          </motion.div>

          <div className="md:hidden">
            <Menu />
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <motion.div
              className="flex items-center bg-[#fd7f39] gap-2 p-2 rounded-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone className="h-5 w-5 text-white" />
              <span className="text-yellow-100 font-medium">123-456-7890</span>
            </motion.div>
            {!user ? (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/login"
                  className="text-yellow-800 font-medium hover:text-yellow-600 transition-colors"
                >
                  LOGIN
                </Link>
              </motion.div>
            ) : (
              <>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/orders"
                    className="text-yellow-800 font-medium hover:text-yellow-600 transition-colors"
                  >
                    ORDERS
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    onClick={() => signOut()}
                    className="text-yellow-800 font-medium hover:text-yellow-600 transition-colors flex items-center gap-2"
                  >
                    LOGOUT <LogOut className="h-5 w-5" />
                  </button>
                </motion.div>
              </>
            )}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Link href="/cart">
                <ShoppingBag className="w-6 h-6 text-yellow-800" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
