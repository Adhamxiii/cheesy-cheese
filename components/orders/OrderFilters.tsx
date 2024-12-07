import React from "react";
import { Search, Filter } from "lucide-react";
import type { OrderStatus } from "../../types/order";

interface OrderFiltersProps {
  onSearch: (query: string) => void;
  onStatusFilter: (status: OrderStatus | "all") => void;
  onSort: (sort: "date" | "total") => void;
}

const OrderFilters = ({
  onSearch,
  onStatusFilter,
  onSort,
}: OrderFiltersProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
      <div className="flex items-center gap-4">
        <div className="relative flex-1 md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search orders..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-400" />
          <select
            onChange={(e) =>
              onStatusFilter(e.target.value as OrderStatus | "all")
            }
            className="border border-gray-300 rounded-md py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="all">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="PROCESSING">Processing</option>
            <option value="SHIPPED">Shipped</option>
            <option value="DELIVERED">Delivered</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">Sort by:</span>
        <select
          onChange={(e) => onSort(e.target.value as "date" | "total")}
          className="border border-gray-300 rounded-md py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
        >
          <option value="date">Date</option>
          <option value="total">Total Amount</option>
        </select>
      </div>
    </div>
  );
};

export default OrderFilters;
