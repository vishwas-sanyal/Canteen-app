import type { FC } from 'react';
import type { Snack } from '@types/index';

interface SnackCardProps {
  snack: Snack;
  onOrder: (snack: Snack) => void;
  onDrag?: (snack: Snack) => void;
  isDragOverBucket?: boolean;
}

export const SnackCard: FC<SnackCardProps> = ({
  snack,
  onOrder,
  onDrag,
  isDragOverBucket = false,
}) => {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('snackId', snack.id);
    if (onDrag) onDrag(snack);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className={`
        rounded-2xl p-3 md:p-4 cursor-move
        bg-gradient-to-br from-dark-800 via-dark-850 to-dark-900 
        border border-dark-700 hover:border-primary-500/50
        transition-all duration-300 transform hover:scale-105
        shadow-xl hover:shadow-2xl
        group overflow-hidden relative
        ${isDragOverBucket ? 'ring-2 ring-primary-500 ring-offset-2 ring-offset-dark-900' : ''}
      `}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-600/0 to-primary-600/0 group-hover:from-primary-600/5 group-hover:to-primary-600/10 transition-all duration-300 pointer-events-none" />

      {/* Snack Image Placeholder */}
      <div
        className="
        w-full h-28 md:h-36 rounded-xl bg-gradient-to-br 
        from-primary-500 to-primary-700
        flex items-center justify-center mb-3 md:mb-4
        text-white text-sm md:text-base font-medium
        group-hover:from-primary-400 group-hover:to-primary-600
        transition-all duration-300 relative overflow-hidden
      "
      >
        {snack.image ? (
          <img
            src={snack.image}
            alt={snack.name}
            className="w-full h-full object-cover rounded-xl"
          />
        ) : (
          <span className="text-5xl md:text-6xl">{snack.emoji || '🍔'}</span>
        )}
      </div>

      {/* Category Badge */}
      <div className="mb-2 relative z-10">
        <span className="inline-block px-2 py-1 rounded-full bg-primary-600/20 border border-primary-500/30 text-primary-300 text-xs font-semibold">
          {snack.category}
        </span>
      </div>

      {/* Snack Info */}
      <h3 className="text-white font-bold text-sm md:text-base truncate mb-2 relative z-10">
        {snack.name}
      </h3>

      {/* Description */}
      <p className="text-dark-400 text-xs mb-3 line-clamp-2 relative z-10">
        {snack.description}
      </p>

      {/* Price */}
      <div className="flex justify-between items-end mb-3 md:mb-4 relative z-10">
        <div className="flex flex-col">
          <span className="text-dark-500 text-xs font-medium">Price</span>
          <span className="text-primary-400 font-bold text-lg md:text-xl">
            ₹{snack.price}
          </span>
        </div>
        <div className="text-right">
          <span className="text-dark-500 text-xs font-medium block">Popular</span>
          <span className="text-primary-300 text-xs md:text-sm font-semibold">
            ⭐ {(Math.random() * 50 + 50).toFixed(0)} orders
          </span>
        </div>
      </div>

      {/* Order Button */}
      <button
        onClick={() => onOrder(snack)}
        className="
          w-full py-2.5 md:py-3 rounded-xl font-bold text-xs md:text-sm
          bg-gradient-to-r from-primary-500 to-primary-600
          text-white hover:from-primary-400 hover:to-primary-500
          transition-all duration-300 transform hover:scale-105
          active:scale-95 shadow-lg hover:shadow-xl
          relative z-10
        "
      >
        + Add to Order
      </button>
    </div>
  );
};
