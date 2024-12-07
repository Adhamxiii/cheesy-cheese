import React from "react";
import { format } from "date-fns";
import { Package, ArrowRight } from "lucide-react";
import OrderStatusBadge from "./OrderStatusBadge";
import OrderItemsList from "./OrderItemsList";
import type { Order } from "../../types/order";

interface OrderCardProps {
  order: Order;
  onTrackOrder: (id: string) => void;
  onCancelOrder: (id: string) => void;
  onReorder: (id: string) => void;
}

const OrderCard = ({
  order,
  onTrackOrder,
  onCancelOrder,
  onReorder,
}: OrderCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-orange-500" />
            <h3 className="text-lg font-semibold">
              Order #{order.id}
            </h3>
          </div>
          <p className="text-sm text-gray-500">
            Placed on {format(new Date(order.createdAt), "MMM d, yyyy")}
          </p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <OrderItemsList items={order.products} />

      <div className="border-t pt-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">Total Amount</p>
            <p className="text-lg font-semibold">${order.total.toFixed(2)}</p>
          </div>
          <div className="flex gap-3">
            {order.status === "PENDING" && (
              <button
                onClick={() => onCancelOrder(order.id)}
                className="px-4 py-2 text-sm text-red-600 hover:text-red-700 font-medium"
              >
                Cancel Order
              </button>
            )}
            {["processing", "shipped"].includes(order.status) && (
              <button
                onClick={() => onTrackOrder(order.id)}
                className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md font-medium flex items-center gap-1"
              >
                Track Order
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
            {order.status === "DELIVERED" && (
              <button
                onClick={() => onReorder(order.id)}
                className="px-4 py-2 text-sm bg-orange-500 text-white hover:bg-orange-600 rounded-md font-medium"
              >
                Order Again
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
