// import { categories } from "@/data/menuData";
import { Category } from "@/types/types";
import {
  Beef,
  Dessert,
  Drumstick,
  Pizza,
  Salad,
  Sandwich,
  Utensils
} from "lucide-react";
import React from "react";

interface MenuCategoriesProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  categories: Category[];
}

const getCategoryIcon = (name: string) => {
  switch (name) {
    case "Burgers":
      return <Beef className="w-6 h-6" />;
    case "Pizzas":
      return <Pizza className="w-6 h-6" />;
    case "Pastas":
      return <Utensils className="w-6 h-6" />;
    case "Appetizers":
      return <Drumstick className="w-6 h-6" />;
    case "Salads":
      return <Salad className="w-6 h-6" />;
    case "Desserts":
      return <Dessert className="w-6 h-6" />;
    default:
      return <Sandwich className="w-6 h-6" />;
  }
};

const MenuCategories: React.FC<MenuCategoriesProps> = ({
  selectedCategory,
  onSelectCategory,
  categories
}) => {
  return (
    <div className="h-full py-8 overflow-y-auto">
      <h2 className="text-3xl font-bold px-6 mb-8">Categories</h2>
      <div className="space-y-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.title)}
            className={`w-full px-6 py-4 flex items-center space-x-4 transition-colors duration-200
              ${selectedCategory === category.title
                ? "bg-yellow-50 border-r-4 border-yellow-500 text-yellow-700"
                : "hover:bg-gray-50 text-gray-600 hover:text-gray-900"
              }`}
          >
            {getCategoryIcon(category.title)}
            <span className="font-medium">{category.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MenuCategories;
