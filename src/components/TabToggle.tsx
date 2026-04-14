import type { FC } from 'react';
import { motion } from 'framer-motion';

interface TabToggleProps {
  activeTab: 'snacks' | 'students';
  onTabChange: (tab: 'snacks' | 'students') => void;
}

export const TabToggle: FC<TabToggleProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex justify-center gap-2 md:gap-4 mt-4 md:mt-6">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onTabChange('snacks')}
        className={`
          px-4 md:px-6 py-2 md:py-2.5 rounded-full font-bold text-xs md:text-sm
          transition-all duration-300
          ${
            activeTab === 'snacks'
              ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg-food'
              : 'border-2 border-primary-600 text-primary-400 hover:border-primary-500'
          }
        `}
      >
        Snacks
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onTabChange('students')}
        className={`
          px-4 md:px-6 py-2 md:py-2.5 rounded-full font-bold text-xs md:text-sm
          transition-all duration-300
          ${
            activeTab === 'students'
              ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg-food'
              : 'border-2 border-primary-600 text-primary-400 hover:border-primary-500'
          }
        `}
      >
        Students
      </motion.button>
    </div>
  );
};
