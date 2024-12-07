import React from "react";

interface OrderSummaryProps {
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  onApplyPromo: (code: string) => void;
}

export function OrderSummary({
  subtotal,
  tax,
  deliveryFee,
  total,
  onApplyPromo,
}: OrderSummaryProps) {
  const [promoCode, setPromoCode] = React.useState("");

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">${subtotal}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Tax</span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Delivery Fee</span>
          <span className="font-medium">${deliveryFee.toFixed(2)}</span>
        </div>
        <div className="h-px bg-gray-200 my-2"></div>
        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>${total}</span>
        </div>
      </div>

      <div className="mb-6">
        <label
          htmlFor="promo"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Promo Code
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            id="promo"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="flex-1 rounded-md border-gray-300 shadow-sm px-4 focus:border-orange-500 focus:ring-orange-500"
            placeholder="Enter code"
          />
          <button
            onClick={() => onApplyPromo(promoCode)}
            className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
          >
            Apply
          </button>
        </div>
      </div>

      <button className="w-full py-3 bg-orange-500 text-white rounded-md font-semibold hover:bg-orange-600 transition-colors">
        Proceed to Checkout
      </button>
    </div>
  );
}
