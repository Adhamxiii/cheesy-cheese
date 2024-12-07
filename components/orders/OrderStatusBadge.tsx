"use client";

import React from "react";
import type { OrderStatus } from "../../types/order";
import { useSession } from "next-auth/react";

const statusConfig: Record<OrderStatus, { color: string; label: string }> = {
  PENDING: { color: "bg-yellow-100 text-yellow-800", label: "Pending" },
  PROCESSING: { color: "bg-blue-100 text-blue-800", label: "Processing" },
  SHIPPED: { color: "bg-purple-100 text-purple-800", label: "Shipped" },
  DELIVERED: { color: "bg-green-100 text-green-800", label: "Delivered" },
  CANCELLED: { color: "bg-red-100 text-red-800", label: "Cancelled" },
};

interface OrderStatusBadgeProps {
  status: OrderStatus;
  orderId: string;
  onStatusChange?: (orderId: string, newStatus: OrderStatus) => void;
}

const OrderStatusBadge = ({
  status,
  orderId,
  onStatusChange,
}: OrderStatusBadgeProps) => {
  const { color, label } = statusConfig[status] || {
    color: "bg-gray-100 text-gray-800",
    label: "Unknown",
  };

  const { data: session } = useSession();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (newStatus: OrderStatus) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      // const data = await response.json();
      if (onStatusChange) {
        onStatusChange(orderId, newStatus);
      }
      setIsOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (!session?.user.isAdmin) {
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}
      >
        {label}
      </span>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color} cursor-pointer ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isLoading}
      >
        {isLoading ? "Updating..." : label}
      </button>
      {isOpen && (
        <div
          className="absolute -left-1/2 z-10 mt-1 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="py-1" role="menu">
            {error && <p className="px-4 py-2 text-xs text-red-600">{error}</p>}
            {Object.entries(statusConfig).map(([key, value]) => (
              <div
                key={key}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleSubmit(key as OrderStatus);
                }}
                className={`block w-full px-4 py-2 text-sm text-left hover:bg-gray-100 ${
                  key === status ? "font-medium bg-gray-50" : ""
                } ${
                  isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                }`}
                role="menuitem"
                style={{ cursor: "pointer" }}
              >
                {value.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderStatusBadge;
