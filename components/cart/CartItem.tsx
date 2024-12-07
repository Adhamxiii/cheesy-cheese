import React from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";

interface CartItemProps {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  onUpdateQuantity: (id: string, newQuantity: number) => void;
  onRemove: (id: string) => void;
}

export function CartItem({
  id,
  title,
  price,
  quantity,
  image,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) {
  return (
    <div className="flex items-center gap-4 py-4 border-b border-gray-200">
      <Image
        src={image}
        alt={title}
        width={64}
        height={64}
        className="w-24 h-24 object-cover rounded-lg"
      />

      <div className="flex-1">
        <h3 className="font-semibold text-lg text-gray-900">{title}</h3>
        <p className="text-orange-500 font-medium">${price}</p>

        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={() => quantity > 1 && onUpdateQuantity(id, quantity - 1)}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <Minus size={18} className="text-gray-600" />
          </button>

          <span className="font-medium w-8 text-center">{quantity}</span>

          <button
            onClick={() => onUpdateQuantity(id, quantity + 1)}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <Plus size={18} className="text-gray-600" />
          </button>
        </div>
      </div>

      <div className="text-right">
        <p className="font-semibold text-lg">
          ${(price * quantity).toFixed(2)}
        </p>
        <button
          onClick={() => onRemove(id)}
          className="text-red-500 hover:text-red-600 p-2 inline-flex items-center gap-1 mt-2"
        >
          <Trash2 size={18} />
          <span>Remove</span>
        </button>
      </div>
    </div>
  );
}
