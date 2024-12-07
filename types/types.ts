export type Category = {
    id: string;
    createdAt: Date;
    title: string;
}

export type Product = {
    id: string;
    createdAt: Date;
    title: string;
    description: string;
    price: number;
    image: string;
    isFeatured: boolean;
    options: string[];
    ratings: number;
    categoryId: string;
    category: {
        id: string;
        createdAt: Date;
        title: string;
    }
}

export type CartType = {
    products: Product[];
    totalItems: number;
    totalPrice: number;
}

export type CartItemType = {
    id: string;
    title: string;
    price: number;
    quantity: number;
    image: string;
}


export type ActionTypes = {
    addToCart: (item: CartItemType) => void;
    removeFromCart: (item: Product) => void;
    clearCart: () => void;
}