import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Order, Snack } from '@types/index';
import { QuantitySelector } from './QuantitySelector';

interface PlaceOrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (studentId: string, items: any[]) => void;
  students: any[];
  snacks: Snack[];
  cartItems: any[];
  onRemoveItem: (snackId: string) => void;
  onUpdateQuantity: (snackId: string, quantity: number) => void;
  isLoading?: boolean;
}

export const PlaceOrderDrawer: React.FC<PlaceOrderDrawerProps> = ({
  isOpen,
  onClose,
  onSubmit,
  students,
  snacks,
  cartItems,
  onRemoveItem,
  onUpdateQuantity,
  isLoading = false,
}) => {
  const [selectedStudent, setSelectedStudent] = useState<string>('');

  const getSnackDetails = (snackId: string) => {
    return snacks.find((s) => s.id === snackId);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const snack = getSnackDetails(item.snackId);
      return total + (snack?.price || 0) * item.quantity;
    }, 0);
  };

  const handleSubmit = () => {
    if (!selectedStudent || cartItems.length === 0) {
      alert('Please select a student and add items');
      return;
    }
    onSubmit(selectedStudent, cartItems);
    setSelectedStudent('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="
              fixed bottom-0 left-0 right-0 z-50
              bg-gradient-to-br from-secondary-800 via-secondary-850 to-secondary-900
              border-t-2 border-secondary-600/50 shadow-2xl
              rounded-t-3xl p-4 md:p-6 max-h-[90vh] md:max-h-[85vh] overflow-y-auto
            "
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <h2 className="text-white font-bold text-2xl md:text-3xl">🛒 Place Order</h2>
              <button
                onClick={onClose}
                className="
                  w-8 h-8 md:w-10 md:h-10 rounded-full
                  bg-dark-700 text-white font-bold text-lg md:text-xl
                  hover:bg-primary-500 transition-all duration-200
                "
              >
                ✕
              </button>
            </div>

            {/* Student Selection */}
            <div className="mb-3 md:mb-6">
              <label className="text-secondary-300 text-xs md:text-sm font-semibold mb-1.5 md:mb-2 block">
                Select Student
              </label>
              <select
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                className="
                  w-full px-2.5 md:px-4 py-2 md:py-2.5 rounded-lg md:rounded-xl text-xs md:text-base
                  bg-dark-700 text-white
                  border-2 border-secondary-600 focus:border-secondary-500
                  focus:outline-none transition-all duration-200
                "
              >
                <option value="">Choose a student...</option>
                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.name} - {student.referralCode}
                  </option>
                ))}
              </select>
            </div>

            {/* Cart Items */}
            <div className="mb-3 md:mb-6">
              <h3 className="text-secondary-300 text-xs md:text-sm font-semibold mb-2 md:mb-3">
                Items in Cart ({cartItems.length})
              </h3>
              <div className="space-y-2 md:space-y-3">
                {cartItems.length === 0 ? (
                  <p className="text-dark-400 text-center py-3 md:py-4 text-xs md:text-sm">
                    No items in cart. Drag snacks to bucket!
                  </p>
                ) : (
                  cartItems.map((item) => {
                    const snack = getSnackDetails(item.snackId);
                    if (!snack) return null;

                    return (
                      <div
                        key={item.snackId}
                        className="
                          bg-dark-800 rounded-lg md:rounded-xl p-2 md:p-3 
                          border border-secondary-600
                          flex justify-between items-center gap-2
                        "
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-semibold text-xs md:text-sm truncate">
                            {snack.name}
                          </p>
                          <p className="text-primary-400 text-xs md:text-xs">
                            ₹{snack.price} × {item.quantity} = ₹
                            {(snack.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
                          <QuantitySelector
                            quantity={item.quantity}
                            onIncrease={() =>
                              onUpdateQuantity(item.snackId, item.quantity + 1)
                            }
                            onDecrease={() =>
                              onUpdateQuantity(item.snackId, item.quantity - 1)
                            }
                          />
                          <button
                            onClick={() => onRemoveItem(item.snackId)}
                            className="
                              px-1.5 md:px-2 py-0.5 md:py-1 rounded text-xs md:text-sm
                              text-red-400 hover:bg-red-500 hover:text-white
                              transition-all duration-200
                            "
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Total */}
            <div
              className="
              bg-dark-800 rounded-lg md:rounded-xl p-3 md:p-4 mb-3 md:mb-6
              border-2 border-primary-600
            "
            >
              <div className="flex justify-between items-center">
                <span className="text-secondary-300 font-semibold text-xs md:text-base">Total:</span>
                <span className="text-primary-400 font-bold text-lg md:text-xl">
                  ₹{calculateTotal().toFixed(2)}
                </span>
              </div>
            </div>

            {/* Order Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading || cartItems.length === 0}
              className="
                w-full py-2.5 md:py-3 rounded-lg md:rounded-xl font-bold text-sm md:text-base text-white
                bg-gradient-to-r from-primary-500 to-primary-600
                hover:from-primary-400 hover:to-primary-500
                disabled:from-dark-600 disabled:to-dark-600 disabled:cursor-not-allowed
                transition-all duration-300 transform hover:scale-105
                active:scale-95 shadow-lg
              "
            >
              {isLoading ? 'Placing Order...' : 'Order'}
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
