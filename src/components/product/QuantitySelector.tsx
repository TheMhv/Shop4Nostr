import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  id: string;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
  disabled?: boolean;
}

export function QuantitySelector({
  id,
  quantity,
  onIncrease,
  onDecrease,
  min = 1,
  max = 99,
  disabled = false,
}: QuantitySelectorProps) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-white/35 p-1">
      <button
        onClick={onDecrease}
        disabled={quantity <= min || disabled}
        className="p-1 hover:bg-gray-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Decrease quantity"
        aria-controls={id}
      >
        <Minus size={16} />
      </button>
      <span id={id} className="w-8 text-center font-medium" aria-live="polite">
        {quantity}
      </span>
      <button
        onClick={onIncrease}
        className="p-1 hover:bg-gray-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Increase quantity"
        aria-controls={id}
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
