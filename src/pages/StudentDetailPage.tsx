import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Student, Order } from '@types/index';
import { getStudentOrders } from '@api/index';
import { LoadingSpinner, ErrorMessage } from '@components/index';

interface StudentDetailPageProps {
  student: Student;
  snacks: any[];
  onBack: () => void;
  onPlaceOrder: (student: Student) => void;
}

export const StudentDetailPage: React.FC<StudentDetailPageProps> = ({
  student,
  snacks,
  onBack,
  onPlaceOrder,
}) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStudentOrders();
  }, [student.id]);

  const fetchStudentOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getStudentOrders(student.id);
      setOrders(data);
    } catch (err) {
      setError('Failed to load orders. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getSnackName = (snackId: string) => {
    return snacks.find((s) => s.id === snackId)?.name || 'Unknown Snack';
  };

  const getSnackPrice = (snackId: string) => {
    return snacks.find((s) => s.id === snackId)?.price || 0;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="min-h-screen pb-6"
    >
      {/* Header with Back Button */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="
            w-11 h-11 md:w-12 md:h-12 rounded-full flex-shrink-0
            bg-dark-700 hover:bg-primary-500 text-white font-bold text-xl md:text-2xl
            transition-all duration-300 transform hover:scale-110
            active:scale-95 flex items-center justify-center shadow-lg
          "
        >
          ←
        </button>
        <div className="flex-1">
          <h1 className="text-white font-bold text-3xl md:text-4xl mb-2">{student.name}</h1>
          <div className="flex flex-wrap gap-2">
            <span className="inline-block px-3 py-1 rounded-lg bg-secondary-600/20 border border-secondary-500/30 text-secondary-300 text-xs font-medium">
              {student.class}
            </span>
            <span className="inline-block px-3 py-1 rounded-lg bg-primary-600/20 border border-primary-500/30 text-primary-300 text-xs font-medium">
              Roll: {student.rollNo}
            </span>
          </div>
        </div>
      </div>

      {/* Student Info Cards */}
      <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
        <div
          className="
          bg-gradient-to-br from-dark-800 via-dark-850 to-dark-900
          border border-dark-700 hover:border-secondary-500/50
          rounded-2xl p-4 md:p-5
          shadow-lg hover:shadow-xl
          transition-all duration-300 transform hover:scale-105
        "
        >
          <p className="text-dark-500 text-xs md:text-sm mb-2 font-medium">Roll Number</p>
          <p className="text-white font-bold text-lg md:text-2xl">{student.rollNo}</p>
        </div>
        <div
          className="
          bg-gradient-to-br from-primary-800 via-primary-850 to-primary-900
          border border-primary-700 hover:border-primary-500/50
          rounded-2xl p-4 md:p-5
          shadow-lg hover:shadow-xl
          transition-all duration-300 transform hover:scale-105
        "
        >
          <p className="text-primary-300 text-xs md:text-sm mb-2 font-medium">Total Spent</p>
          <p className="text-primary-100 font-bold text-lg md:text-2xl">₹{student.totalSpent.toFixed(2)}</p>
        </div>
        <div
          className="
          col-span-2
          bg-gradient-to-br from-dark-800 via-dark-850 to-dark-900
          border border-dark-700 hover:border-secondary-500/50
          rounded-2xl p-4 md:p-5
          shadow-lg hover:shadow-xl
          transition-all duration-300
        "
        >
          <p className="text-dark-500 text-xs md:text-sm mb-2 font-medium">Student Code</p>
          <p className="text-secondary-400 font-mono text-lg md:text-xl font-bold tracking-wider">{student.referralCode}</p>
        </div>
      </div>

      {/* Orders Section */}
      <div className="mb-6 md:mb-8">
        <div className="mb-4 md:mb-6">
          <h2 className="text-white font-bold text-2xl md:text-3xl mb-2">📋 Order History</h2>
          <div className="h-1 w-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full" />
        </div>

        {error && <ErrorMessage message={error} onRetry={fetchStudentOrders} />}
        {loading && <LoadingSpinner />}

        {!loading && !error && (
          <>
            {orders.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-block mb-4 p-4 md:p-6 rounded-full bg-dark-700/50 border border-dark-600">
                  <div className="text-5xl md:text-6xl">📭</div>
                </div>
                <p className="text-dark-400 font-medium text-sm md:text-base">No orders yet</p>
              </div>
            ) : (
              <div className="space-y-3 md:space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="
                      bg-gradient-to-br from-dark-800 via-dark-850 to-dark-900
                      border border-dark-700 hover:border-primary-500/50
                      rounded-2xl p-4 md:p-5
                      shadow-lg hover:shadow-xl
                      transition-all duration-300 transform hover:scale-105
                    "
                  >
                    <div className="flex justify-between items-start mb-2 md:mb-3">
                      <div className="flex-1">
                        <p className="text-white font-bold text-sm md:text-lg">
                          {getSnackName(order.snackId)}
                        </p>
                        <div className="flex flex-wrap gap-3 mt-2 text-xs md:text-sm">
                          <span className="text-dark-400">
                            Qty: <span className="text-primary-300 font-semibold">{order.quantity}</span>
                          </span>
                          <span className="text-dark-400">
                            Price: <span className="text-primary-300 font-semibold">₹{getSnackPrice(order.snackId)}</span>
                          </span>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <p className="text-primary-400 font-bold text-lg md:text-xl">
                          ₹{order.amount.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="pt-3 border-t border-dark-700">
                      <p className="text-dark-500 text-xs md:text-sm">
                        {new Date(order.createdAt).toLocaleDateString()} at{' '}
                        {new Date(order.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Place Order Button */}
      <button
        onClick={() => onPlaceOrder(student)}
        className="
          w-full py-2.5 md:py-3 rounded-xl font-bold text-sm md:text-base text-white
          bg-gradient-to-r from-primary-500 to-primary-600
          hover:from-primary-400 hover:to-primary-500
          transition-all duration-300 transform hover:scale-105
          active:scale-95 shadow-lg fixed bottom-24 left-3 right-3 md:static md:bottom-auto md:left-auto md:right-auto md:max-w-full
        "
      >
        Place New Order
      </button>
    </motion.div>
  );
};
