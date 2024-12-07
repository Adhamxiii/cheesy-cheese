import { CartItemType, CartType, Product } from "@/types/types";
import { create } from "zustand";
import { ActionTypes } from '../types/types';
import { persist } from "zustand/middleware";

const INITIAL_STATE = {
    products: [],
    totalItems: 0,
    totalPrice: 0,
};

export const useCartStore = create(persist<CartType & ActionTypes>((set, get) => ({
    products: INITIAL_STATE.products,
    totalItems: INITIAL_STATE.totalItems,
    totalPrice: INITIAL_STATE.totalPrice,
    addToCart: (item) => {
        set((state) => ({
            products: [...state.products, item],
            totalItems: state.totalItems + 1,
            totalPrice: state.totalPrice + item.price,
        }));
    },
    removeFromCart: (item) => {
        set((state) => ({
            products: state.products.filter((product: Product) => product.id !== item.id),
            totalItems: state.totalItems - 1,
            totalPrice: state.totalPrice - item.price,
        }));
    },
    clearCart: () => {
        set((state) => ({
            ...state,
            products: [],
            totalItems: 0,
            totalPrice: 0,
        }));
    },
}), { name: 'cart' }));