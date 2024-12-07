import { calculatePasswordStrength } from "@/utils/validation";
import React from "react";


interface PasswordStrengthIndicatorProps {
  password: string;
}

export function PasswordStrengthIndicator({
  password,
}: PasswordStrengthIndicatorProps) {
  const strength = calculatePasswordStrength(password);
  const strengthText = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
  const strengthColor = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-blue-500",
    "bg-green-500",
  ];

  return (
    <div className="mt-1">
      <div className="flex gap-1 h-1 mb-1">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className={`flex-1 rounded-full ${
              index < strength ? strengthColor[strength - 1] : "bg-gray-200"
            }`}
          />
        ))}
      </div>
      {password && (
        <p
          className={`text-xs ${
            strength > 3 ? "text-green-600" : "text-gray-500"
          }`}
        >
          Password strength: {strengthText[strength - 1] || "Very Weak"}
        </p>
      )}
    </div>
  );
}
