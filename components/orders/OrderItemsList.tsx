import React from "react";
// import type { OrderItem } from "../../types/order";
import Image from "next/image";
import { Product } from "@/types/types";

interface OrderItemsListProps {
  items: Product[];
}

const OrderItemsList = ({ items }: OrderItemsListProps) => {
  console.log('items',items);
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.id} className="flex items-center gap-4 mt-3">
          <Image
            src={item.image}
            alt={item.title}
            width={64}
            height={64}
            className="w-16 h-16 object-cover rounded-md"
          />
          <div className="flex-1">
            <h4 className="font-medium">{item.title}</h4>
            <p className="text-sm text-gray-500">
              Quantity: {item.options.quantity || 0} × ${item.price}
            </p>
          </div>
          <div className="text-right">
            <p className="font-medium">
              ${(item.options.quantity * +item.price).toFixed(2)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderItemsList;
