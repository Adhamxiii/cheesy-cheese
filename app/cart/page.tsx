"use client";

import { CartItem } from "@/components/cart/CartItem";
import { OrderSummary } from "@/components/cart/OrderSummary";
import { useCartStore } from "@/utils/store";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
const initialItems = [
  {
    id: "1",
    name: "Classic Cheese Burger",
    price: 12.99,
    quantity: 2,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=300",
  },
  {
    id: "2",
    name: "Double Cheese Monster",
    price: 16.99,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&q=80&w=300",
  },
];

const Page = () => {
  const { products, totalPrice, clearCart, removeFromCart, addToCart } =
    useCartStore();

  const [items, setItems] = useState(products);

  // const subtotal = items.reduce(
  //   (sum, item) => sum + item.price * item.quantity,
  //   0
  // );
  const tax = Number(totalPrice) * 0.1; // 10% tax
  const deliveryFee = Number(totalPrice) > 50 ? 0 : 5.99;
  const total = Number(totalPrice) + tax + deliveryFee;

  // const updateQuantity = (id: string, newQuantity: number) => {
  //   const currentQuantity = getItemQuantity(item.id);
  //   const difference = newQuantity - currentQuantity;

  //   // Add or remove items to match the desired quantity
  //   if (difference > 0) {
  //     for (let i = 0; i < difference; i++) addToCart(item);
  //   } else {
  //     for (let i = 0; i < -difference; i++) removeFromCart(item);
  //   }
  // };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleApplyPromo = (code: string) => {
    // Implement promo code logic here
    console.log("Applying promo code:", code);
  };

  const getItemQuantity = (id: string) => {
    return products.filter((product) => product.id === id).length;
  };

   useEffect(() => {
     useCartStore.persist.rehydrate();
   }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-8">
          <ShoppingBag className="text-orange-500" size={32} />
          <h1 className="text-3xl font-bold">Your Cart</h1>
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                {items.map((item, index) => (
                  <CartItem
                    key={`${item.id}-${index}`}
                    {...item}
                    quantity={getItemQuantity(item.id)}
                    onUpdateQuantity={(newQuantity) => {
                      const currentQuantity = getItemQuantity(item.id);
                      const difference = Number(newQuantity) - Number(currentQuantity);

                      // Add or remove items to match the desired quantity
                      if (difference > 0) {
                        for (let i = 0; i < difference; i++) addToCart({
                          id: item.id,
                          title: item.title,
                          price: item.price,
                          image: item.image,
                          quantity: Number(newQuantity),
                        });
                      } else {
                        for (let i = 0; i < -difference; i++)
                          removeFromCart(item);
                      }
                    }}
                    onRemove={removeItem}
                  />
                ))}

                <div className="flex justify-between items-center mt-6 pt-6 border-t">
                  <a
                    href="/menu"
                    className="inline-flex items-center text-orange-500 hover:text-orange-600"
                  >
                    <ArrowLeft size={20} className="mr-2" />
                    Continue Shopping
                  </a>
                  <button
                    onClick={() => clearCart()}
                    className="text-gray-500 hover:text-gray-600"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <OrderSummary
                subtotal={Number(totalPrice)}
                tax={tax}
                deliveryFee={deliveryFee}
                total={total}
                onApplyPromo={handleApplyPromo}
              />
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <ShoppingBag size={48} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-6">
              Looks like you haven&apos;t added any items yet.
            </p>
            <a
              href="/menu"
              className="inline-flex items-center px-6 py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Browse Menu
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
