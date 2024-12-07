'use client'

import React, { useState, useMemo, useEffect } from "react";
import { ShoppingBag } from "lucide-react";

import OrderFilters from "@/components/orders/OrderFilters";
import OrderAccordion from "@/components/orders/OrderAccordion";
import { Order, OrderStatus } from "@/types/order";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


const OrdersPage = () => {

    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
    const [sortBy, setSortBy] = useState<"date" | "total">("date");

    const { data: session, status } = useSession();
    const router = useRouter();

    const { isLoading, error, data: orders, refetch } = useQuery({
        queryKey: ["orders"],
        queryFn: async () => {
            const response = await fetch("/api/orders");
            return response.json();
        },
    })

    console.log("orders:", orders);

    const filteredOrders = useMemo(() => {
        if (!orders) return [];

        return orders
            .filter((order: Order) => {
                const matchesSearch =
                    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    order.products.some((item) =>
                        item.title.toLowerCase().includes(searchQuery.toLowerCase())
                    );
                const matchesStatus =
                    statusFilter === "all" || order.status === statusFilter;
                return matchesSearch && matchesStatus;
            })
            .sort((a: any, b: any) => {
                if (sortBy === "date") {
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                }
                return b.total - a.total;
            });
    }, [orders, searchQuery, statusFilter, sortBy]);

    console.log(orders, statusFilter)

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/");
        }
    }, [status, router]);

    const handleTrackOrder = (id: string) => {
        console.log("Tracking order:", id);
    };

    const handleCancelOrder = (id: string) => {
        console.log("Cancelling order:", id);
    };

    const handleReorder = (id: string) => {
        console.log("Reordering:", id);
    };

    const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
        try {
            const response = await fetch(`/api/orders/${orderId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!response.ok) {
                throw new Error('Failed to update order status');
            }

            // Refetch orders to update the UI
            refetch();
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    if (isLoading || status === "loading") {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex items-center gap-2 mb-8">
                    <ShoppingBag className="text-orange-500" size={32} />
                    <h1 className="text-3xl font-bold">Your Orders</h1>
                </div>

                <OrderFilters
                    onSearch={setSearchQuery}
                    onStatusFilter={setStatusFilter}
                    onSort={setSortBy}
                />

                <div className="mt-8 space-y-6">
                    {filteredOrders.length > 0 ? (
                        filteredOrders.map((order: Order) => (
                            <OrderAccordion
                                key={order.id}
                                order={order}
                                onTrackOrder={handleTrackOrder}
                                onCancelOrder={handleCancelOrder}
                                onReorder={handleReorder}
                                onStatusChange={handleStatusChange}
                            />
                        ))
                    ) : (
                        <div className="text-center py-12 bg-white rounded-lg">
                            <ShoppingBag size={48} className="mx-auto text-gray-400 mb-4" />
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                No orders found
                            </h2>
                            <p className="text-gray-600">
                                {searchQuery || statusFilter !== "all"
                                    ? "Try adjusting your filters"
                                    : "You haven't placed any orders yet"}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrdersPage;