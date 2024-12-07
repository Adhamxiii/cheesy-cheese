'use client';

import { useState } from "react";
import MenuCategories from "./MenuCategories";
import MenuItems from "./MenuItems";
import { Category, Product } from "@/types/types";

const MenuPage = ({ categories,products }: {
    categories: Category[],
    products: Product[]
}) => {
    const [selectedCategory, setSelectedCategory] = useState("Burgers");

    return (
        <div className="h-[calc(100vh-14px)] overflow-hidden py-6">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-4">Explore Our Best Menu</h1>
                <p className="text-gray-500 max-w-2xl mx-auto">
                    Discover the finest flavors crafted with fresh ingredients and a
                    passion for taste. Indulge in our signature dishes, perfect for any
                    craving!
                </p>
            </div>
            <div className="h-full flex">
                <div className="w-1/5 bg-white shadow-lg">
                    <MenuCategories
                        selectedCategory={selectedCategory}
                        onSelectCategory={setSelectedCategory}
                        categories={categories}
                    />
                </div>

                <div className="w-4/5 bg-gray-50">
                    <MenuItems category={selectedCategory} products={products} />
                </div>
            </div>
        </div>
    );
}

export default MenuPage