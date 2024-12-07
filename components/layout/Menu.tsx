"use client";

import { MenuIcon, ShoppingBasket, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { id: 1, title: "Homepage", url: "/" },
  { id: 2, title: "Menu", url: "/menu" },
  { id: 3, title: "Working Hours", url: "/" },
  { id: 4, title: "Contact", url: "/" },
];

const Menu = () => {
  const [open, setOpen] = useState(false);
  const user = false;

  const menuVariants = {
    hidden: { x: "-100%", opacity: 0 },
    visible: { x: "0%", opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
  };

  return (
    <div>
      {!open ? (
        <MenuIcon
          className="w-8 h-8 cursor-pointer"
          onClick={() => setOpen(true)}
        />
      ) : (
        <X className="w-8 h-8 cursor-pointer" onClick={() => setOpen(false)} />
      )}
      <AnimatePresence>
        {open && (
          <>
            {/* Background Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute top-[85px] left-0 w-full h-[calc(100vh-8rem)] bg-black z-10"
              onClick={() => setOpen(false)}
            />

            {/* Sliding Menu */}
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ type: "spring", stiffness: 50, damping: 12 }}
              className="absolute top-[85px] left-0 w-full h-[calc(100vh-8rem)] z-20 bg-white"
            >
              <div className="flex flex-col items-center justify-center gap-4 p-4 md:p-8 lg:p-12 xl:p-16">
                {links.map((link) => (
                  <Link
                    key={link.id}
                    href={link.url}
                    onClick={() => setOpen(false)}
                    className="text-xl font-medium text-yellow-500 hover:text-yellow-400"
                  >
                    {link.title}
                  </Link>
                ))}
                {!user ? (
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="text-xl font-medium text-yellow-500 hover:bg-yellow-400"
                  >
                    Login
                  </Link>
                ) : (
                  <Link
                    href="/orders"
                    onClick={() => setOpen(false)}
                    className="text-xl font-medium text-yellow-500 hover:bg-yellow-400"
                  >
                    Orders
                  </Link>
                )}
                <Link
                  href="/cart"
                  onClick={() => setOpen(false)}
                  className="text-xl font-medium text-yellow-500 hover:bg-yellow-400 flex items-center gap-2"
                >
                  <ShoppingBasket />
                  Cart (3)
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Menu;
