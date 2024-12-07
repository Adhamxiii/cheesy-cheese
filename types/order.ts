import { Product } from "./types";

export type OrderStatus = 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
export type PaymentMethod = 'CREDIT_CARD' | 'PAYPAL' | 'APPLE_PAY' | 'GOOGLE_PAY';

// export interface OrderItem {
//     id: string;
//     name: string;
//     quantity: number;
//     price: number;
//     image: string;
// }

export interface Order {
    id: string;
    createdAt: string;
    status: OrderStatus;
    products: Product[];
    total: number;
    paymentMethod: PaymentMethod;
    shippingAddress: {
        name: string;
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    trackingNumber?: string;
    intent_id?: string;
    userEmail: string
}