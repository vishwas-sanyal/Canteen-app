import type { FC } from 'react';
import { motion } from 'framer-motion';

export const LoadingSpinner: FC = () => {
  return (
    <div className="flex justify-center items-center py-8 md:py-12">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="w-10 h-10 md:w-12 md:h-12 border-3 md:border-4 border-primary-600 border-t-primary-300 rounded-full"
      />
    </div>
  );
};

export const ErrorMessage: FC<{ message: string; onRetry?: () => void }> = ({
  message,
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 md:py-16">
      <div className="inline-block mb-6 p-4 md:p-6 rounded-full bg-red-500/20 border border-red-500/30">
        <div className="text-4xl md:text-5xl">⚠️</div>
      </div>
      <p className="text-red-400 font-semibold mb-6 md:mb-8 text-sm md:text-base text-center px-4 max-w-xs">
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="
            px-6 md:px-8 py-2.5 md:py-3 rounded-xl text-sm md:text-base
            bg-gradient-to-r from-primary-500 to-primary-600
            text-white font-bold
            hover:from-primary-400 hover:to-primary-500
            transition-all duration-300 transform hover:scale-105
            active:scale-95 shadow-lg hover:shadow-xl
          "
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export const EmptyState: FC<{ message: string; icon?: string }> = ({
  message,
  icon = '📭',
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 md:py-16">
      <div className="inline-block mb-6 p-4 md:p-6 rounded-full bg-dark-700/50 border border-dark-600">
        <div className="text-5xl md:text-6xl">{icon}</div>
      </div>
      <p className="text-dark-400 font-semibold text-sm md:text-base text-center px-4 max-w-sm">
        {message}
      </p>
    </div>
  );
};
