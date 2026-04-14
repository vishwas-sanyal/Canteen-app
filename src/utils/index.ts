// Utility for debouncing functions
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

// Format currency
export const formatCurrency = (amount: number): string => {
  return `₹${amount.toFixed(2)}`;
};

// Filter snacks by search query
export const filterSnacks = (snacks: any[], query: string) => {
  if (!query.trim()) return snacks;
  return snacks.filter((snack) =>
    snack.name.toLowerCase().includes(query.toLowerCase())
  );
};

// Filter students by search query
export const filterStudents = (students: any[], query: string) => {
  if (!query.trim()) return students;
  return students.filter(
    (student) =>
      student.name.toLowerCase().includes(query.toLowerCase()) ||
      student.referralCode.toLowerCase().includes(query.toLowerCase())
  );
};

// Calculate total cart amount
export const calculateCartAmount = (cartItems: any[], snacks: any[]): number => {
  return cartItems.reduce((total, item) => {
    const snack = snacks.find((s) => s.id === item.snackId);
    return total + (snack?.price || 0) * item.quantity;
  }, 0);
};
