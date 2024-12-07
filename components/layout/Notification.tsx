"use client"

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const deals = [
  "Order now and save big!",
  "Free delivery on orders over $50!",
  "New! Try our Melted Cheese Platter",
]

export function Notification() {
  const [currentDeal, setCurrentDeal] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDeal((prev) => (prev + 1) % deals.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-500 text-white py-2 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center">
          <span className="font-medium mr-2 max-md:hidden">
            Exclusive Deals
          </span>
          <span className="mx-2 max-md:hidden">•</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={currentDeal}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="text-sm"
            >
              {deals[currentDeal]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

