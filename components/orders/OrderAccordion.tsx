import React, { useState } from "react";
import { format } from "date-fns";
import {
  Package,
  ChevronDown,
  ChevronUp,
  MapPin,
  CreditCard,
  Truck,
} from "lucide-react";
import OrderStatusBadge from "./OrderStatusBadge";
import OrderItemsList from "./OrderItemsList";
import type { Order, OrderStatus } from "../../types/order";

interface OrderAccordionProps {
  order: Order;
  onTrackOrder: (orderNumber: string) => void;
  onCancelOrder: (orderNumber: string) => void;
  onReorder: (orderNumber: string) => void;
  onStatusChange?: (orderId: string, newStatus: OrderStatus) => void;
}

const OrderAccordion = ({
  order,
  onTrackOrder,
  onCancelOrder,
  onReorder,
  onStatusChange,
}: OrderAccordionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm ">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors relative"
      >
        <div className="flex items-center gap-4">
          <Package className="h-5 w-5 text-orange-500" />
          <div className="text-left">
            <h3 className="text-lg font-semibold">Order #{order.id}</h3>
            <p className="text-sm text-gray-500">
              Placed on {format(new Date(order.createdAt), "MMM d, yyyy")}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 absolute right-6 top-1/2 -translate-y-1/2 z-30">
          <OrderStatusBadge
            status={order.status}
            orderId={order.id}
            onStatusChange={onStatusChange}
          />
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-400" />
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="px-6 pb-6 space-y-6 border-t">
          <OrderItemsList items={order.products} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-900">
                    Shipping Address
                  </h4>
                  <p className="text-gray-600">
                    {order.shippingAddress.name}
                    <br />
                    {order.shippingAddress.street}
                    <br />
                    {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                    {order.shippingAddress.zipCode}
                    <br />
                    {order.shippingAddress.country}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <CreditCard className="h-5 w-5 text-gray-400 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-900">Payment Method</h4>
                  <p className="text-gray-600 capitalize">
                    {order.paymentMethod.replace("_", " ")}
                  </p>
                </div>
              </div>

              {order.trackingNumber && (
                <div className="flex items-start gap-2">
                  <Truck className="h-5 w-5 text-gray-400 mt-1" />
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Tracking Number
                    </h4>
                    <p className="text-gray-600">{order.trackingNumber}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>${(order.total * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="h-px bg-gray-200 my-2"></div>
                  <div className="flex justify-between font-semibold text-gray-900">
                    <span>Total</span>
                    <span>${(order.total * 1.1).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 justify-end">
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
                    className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md font-medium"
                  >
                    Track Order
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
      )}
    </div>
  );
};

export default OrderAccordion;
