"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Product } from "@/types/types";
import Image from "next/image";
import { Star } from "lucide-react";
import { useCartStore } from "@/utils/store";
import { toast } from "react-toastify";

const MenuItem = ({ item }: { item: Product }) => {
  const [selectedItem, setSelectedItem] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(item.price);

  const { addToCart } = useCartStore();

  useEffect(() => {
    setTotal(item.price * quantity);
  }, [item.price, quantity]);

  const animationConfig = {
    type: "spring",
    stiffness: 80,
    damping: 20,
  };

  const cartHandler = () => {
    addToCart({
      id: item.id,
      title: item.title,
      price: total,
      image: item.image,
      quantity,
    });
    toast.success("Added to cart");
  };

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  return (
    <motion.div
      key={item.id}
      onTap={() => setSelectedItem(selectedItem?.id === item.id ? null : item)}
      style={{
        position: "relative",
        width: "20rem",
        flexShrink: 0,
        backgroundColor: "white",
        borderRadius: "0.75rem",
        border: "1px solid black",
        boxShadow:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        overflow: "hidden",
        cursor: "pointer",
        transform: "none",
        transition: "all 300ms",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={animationConfig}
    >
      {/* Image */}
      <motion.div
        style={{
          position: "relative",
          height: selectedItem?.id === item.id ? "100%" : "73%",
        }}
        layout
        transition={animationConfig}
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </motion.div>

      {/* Mini Sheet */}
      <AnimatePresence>
        {!selectedItem || selectedItem?.id !== item.id ? (
          <motion.div
            key="mini-sheet"
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "white",
              boxShadow:
                "0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)",
            }}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{
              ease: "easeInOut",
              duration: 0.4,
              delay: selectedItem ? 0.4 : 0, // Delay only when closing detailed sheet
            }}
          >
            <div
              style={{
                width: "100%",
                padding: "1rem",
                borderTop: "1px solid black",
              }}
            >
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: "#1F2937",
                  textAlign: "center",
                }}
              >
                {item.title}
              </h3>
            </div>
            <div
              style={{
                width: "100%",
                padding: "0.375rem 1rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderTop: "1px solid black",
              }}
            >
              <p
                style={{
                  fontSize: "1.125rem",
                  fontWeight: "bold",
                  color: "#111827",
                }}
              >
                ${item.price}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  cartHandler();
                }}
                style={{
                  backgroundColor: "#EAB308",
                  color: "white",
                  padding: "0.5rem",
                  borderRadius: "9999px",
                  transition: "background-color 200ms",
                }}
                aria-label="Add to cart"
              >
                Add to Cart
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Expanded Detailed Sheet */}
      <AnimatePresence>
        {selectedItem?.id === item.id && (
          <motion.div
            key="expanded-sheet"
            style={{
              position: "absolute",
              width: "80%",
              left: "10%",
              bottom: "10%",
              backgroundColor: "white",
              boxShadow:
                "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              borderRadius: "0.75rem",
              border: "1px solid black",
              padding: "1.5rem",
            }}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
              duration: 0.6, // Matches the delay for smoother transitions
            }}
          >
            <div>
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  color: "#1F2937",
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "#4B5563",
                  marginTop: "0.5rem",
                }}
              >
                {item.description}
              </p>
              <div
                style={{
                  marginTop: "1rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: "bold",
                    color: "#111827",
                  }}
                >
                  ${total}
                </span>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Star
                    style={{
                      width: "1rem",
                      height: "1rem",
                      color: "#EAB308",
                      fill: "currentColor",
                    }}
                  />
                  <span
                    style={{
                      marginLeft: "0.25rem",
                      fontSize: "0.875rem",
                      color: "#4B5563",
                    }}
                  >
                    {item.ratings}
                  </span>
                </div>
              </div>
              <div
                style={{
                  marginTop: "1rem",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <label
                  style={{
                    color: "#4B5563",
                    fontWeight: 600,
                  }}
                >
                  Quantity:
                </label>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginLeft: "1rem",
                  }}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setQuantity(quantity > 1 ? quantity - 1 : 1);
                    }}
                    style={{
                      backgroundColor: "#E5E7EB",
                      padding: "0.5rem",
                      borderRadius: "9999px",
                      width: "2rem",
                      height: "2rem",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    -
                  </button>
                  <span
                    style={{
                      margin: "0 0.5rem",
                    }}
                  >
                    {quantity}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setQuantity(quantity + 1);
                    }}
                    style={{
                      backgroundColor: "#E5E7EB",
                      padding: "0.5rem",
                      borderRadius: "9999px",
                      width: "2rem",
                      height: "2rem",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  cartHandler();
                }}
                style={{
                  backgroundColor: "#EAB308",
                  color: "white",
                  marginTop: "1rem",
                  padding: "0.5rem",
                  borderRadius: "9999px",
                  display: "block",
                  margin: "1rem auto 0",
                  textAlign: "center",
                  transition: "background-color 200ms",
                }}
                aria-label="Add to cart"
              >
                Add to Cart
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MenuItem;
