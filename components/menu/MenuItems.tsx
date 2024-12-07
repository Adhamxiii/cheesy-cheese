"use client";
import { Product } from "@/types/types";
import MenuItem from "./MenuItem";

const MenuItems = ({
  category,
  products,
}: {
  category: string;
  products: Product[];
}) => {
  const items = products.filter(
    (product: Product) => product?.category.title === category
  );

  if (!items || items.length === 0) {
    return (
      <div className="h-full flex justify-center items-center">
        <p className="text-center text-gray-500 text-xl">No items found</p>
      </div>
    );
  }

  return (
    <div className="h-[80%] p-8 overflow-x-auto">
      <div className="flex space-x-6 h-full">
        {items.map((item) => (
          <MenuItem item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default MenuItems;
