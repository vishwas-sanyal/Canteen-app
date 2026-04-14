import React, { useEffect, useState } from 'react';
import {
  SnackCard,
  SearchBar,
  PlaceOrderDrawer,
  Bucket,
  LoadingSpinner,
  ErrorMessage,
  EmptyState,
} from '@components/index';
import { useCartStore, useSnacksStore, useUIStore } from '@store/index';
import { getSnacks, createOrder } from '@api/index';
import { filterSnacks } from '@utils/index';
import { Snack } from '@types/index';

export const SnacksPage: React.FC<{ students: any[] }> = ({ students }) => {
  const { snacks, setSnacks } = useSnacksStore();
  const { cartItems, addToCart, removeFromCart, updateCartQuantity, clearCart } =
    useCartStore();
  const {
    isPlaceOrderOpen,
    setIsPlaceOrderOpen,
    searchQuery,
    setSearchQuery,
  } = useUIStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOverSnackId, setDragOverSnackId] = useState<string | null>(null);
  const [isDragOverBucket, setIsDragOverBucket] = useState(false);

  useEffect(() => {
    fetchSnacks();
  }, []);

  const fetchSnacks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getSnacks();
      setSnacks(data);
    } catch (err) {
      setError('Failed to load snacks. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOrderSnack = (snack: Snack) => {
    addToCart(snack.id, 1);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredSnacks = filterSnacks(snacks, searchQuery);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDropOnBucket = (e: React.DragEvent) => {
    e.preventDefault();
    const snackId = e.dataTransfer.getData('snackId');
    if (snackId) {
      const snack = snacks.find((s) => s.id === snackId);
      if (snack) {
        addToCart(snackId, 1);
      }
    }
  };

  const handleBucketDragEnter = () => {
    setIsDragOverBucket(true);
  };

  const handleBucketDragLeave = () => {
    setIsDragOverBucket(false);
  };

  const handlePlaceOrder = async (studentId: string, items: any[]) => {
    try {
      setLoading(true);
      await createOrder({ studentId, items });
      clearCart();
      setIsPlaceOrderOpen(false);
      // Success feedback can be added here
    } catch (err) {
      setError('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-6">
      {/* Section Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-white font-bold text-2xl md:text-4xl mb-1">🍔 Snacks</h1>
        <p className="text-dark-400 text-sm md:text-base">Select and order your favorite items</p>
      </div>

      {/* Search Bar */}
      <SearchBar
        placeholder="Search snacks..."
        onSearch={handleSearch}
      />

      {/* Error State */}
      {error && (
        <ErrorMessage message={error} onRetry={fetchSnacks} />
      )}

      {/* Loading State */}
      {loading && <LoadingSpinner />}

      {/* Snacks Grid */}
      {!loading && !error && (
        <>
          {filteredSnacks.length === 0 ? (
            <EmptyState
              message={searchQuery ? 'No snacks found' : 'No snacks available'}
              icon={searchQuery ? '🔍' : '🍔'}
            />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
              {filteredSnacks.map((snack) => (
                <SnackCard
                  key={snack.id}
                  snack={snack}
                  onOrder={handleOrderSnack}
                  isDragOverBucket={dragOverSnackId === snack.id}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* Bucket */}
      <div
        onDragOver={handleDragOver}
        onDrop={handleDropOnBucket}
        onDragEnter={handleBucketDragEnter}
        onDragLeave={handleBucketDragLeave}
      >
        <Bucket
          itemCount={cartItems.reduce((total, item) => total + item.quantity, 0)}
          onClick={() => setIsPlaceOrderOpen(true)}
          isDragOver={isDragOverBucket}
        />
      </div>

      {/* Place Order Drawer */}
      <PlaceOrderDrawer
        isOpen={isPlaceOrderOpen}
        onClose={() => setIsPlaceOrderOpen(false)}
        onSubmit={handlePlaceOrder}
        students={students}
        snacks={snacks}
        cartItems={cartItems}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateCartQuantity}
        isLoading={loading}
      />
    </div>
  );
};
