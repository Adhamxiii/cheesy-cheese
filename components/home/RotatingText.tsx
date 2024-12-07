"use client";

import { motion } from "framer-motion";
import { ArrowDownRightIcon } from "lucide-react";

export function RotatingText() {
  return (
    <motion.div
      className="absolute -top-4 -right-4 w-24 h-24"
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <path
            id="textCircle"
            d="M50,50 m-40,0 a40,40 0 1,1 80,0 a40,40 0 1,1 -80,0"
          />
        </defs>
        <text className="text-[8px] uppercase tracking-[1px] fill-yellow-600">
          <textPath href="#textCircle">
            Order Now • Order Now • Order Now • Order Now
          </textPath>
        </text>

        <circle cx="50" cy="50" r="30" className="fill-black" />

        <g transform="translate(50, 50)">
          <ArrowDownRightIcon className="w-12 h-12 text-white" />
        </g>
      </svg>
    </motion.div>
  );
}
