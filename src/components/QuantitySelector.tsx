import type { FC } from 'react';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  maxQuantity?: number;
}

export const QuantitySelector: FC<QuantitySelectorProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  maxQuantity = 5,
}) => {
  return (
    <div className="flex items-center gap-1 md:gap-2">
      <button
        onClick={onDecrease}
        disabled={quantity <= 1}
        className="
          w-7 h-7 md:w-8 md:h-8 rounded-lg
          bg-dark-700 text-white font-bold text-xs md:text-sm
          hover:bg-primary-500 disabled:bg-dark-600 disabled:cursor-not-allowed
          transition-all duration-200
        "
      >
        −
      </button>
      <span className="w-6 md:w-8 text-center text-white font-semibold text-xs md:text-sm">
        {quantity}
      </span>
      <button
        onClick={onIncrease}
        disabled={quantity >= maxQuantity}
        className="
          w-7 h-7 md:w-8 md:h-8 rounded-lg
          bg-dark-700 text-white font-bold text-xs md:text-sm
          hover:bg-primary-500 disabled:bg-dark-600 disabled:cursor-not-allowed
          transition-all duration-200
        "
      >
        +
      </button>
    </div>
  );
};
