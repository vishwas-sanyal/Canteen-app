import { create } from 'zustand';
import type { Snack, Student, Order, OrderItem } from '@types/index';

interface CartStore {
  cartItems: OrderItem[];
  addToCart: (snackId: string, quantity: number) => void;
  removeFromCart: (snackId: string) => void;
  updateCartQuantity: (snackId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  cartItems: [],
  
  addToCart: (snackId: string, quantity: number) => {
    set((state) => {
      const existingItem = state.cartItems.find((item) => item.snackId === snackId);
      
      if (existingItem) {
        return {
          cartItems: state.cartItems.map((item) =>
            item.snackId === snackId
              ? { ...item, quantity: Math.min(item.quantity + quantity, 5) }
              : item
          ),
        };
      }
      
      return {
        cartItems: [
          ...state.cartItems,
          { snackId, quantity: Math.min(quantity, 5) },
        ],
      };
    });
  },
  
  removeFromCart: (snackId: string) => {
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.snackId !== snackId),
    }));
  },
  
  updateCartQuantity: (snackId: string, quantity: number) => {
    if (quantity <= 0) {
      get().removeFromCart(snackId);
      return;
    }
    
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.snackId === snackId
          ? { ...item, quantity: Math.min(quantity, 5) }
          : item
      ),
    }));
  },
  
  clearCart: () => set({ cartItems: [] }),
  
  getCartTotal: () => 0, // Will be calculated with snack prices
  
  getCartCount: () => {
    return get().cartItems.reduce((total, item) => total + item.quantity, 0);
  },
}));

interface SnacksStore {
  snacks: Snack[];
  setSnacks: (snacks: Snack[]) => void;
  addSnack: (snack: Snack) => void;
}

export const useSnacksStore = create<SnacksStore>((set) => ({
  snacks: [],
  setSnacks: (snacks) => set({ snacks }),
  addSnack: (snack) =>
    set((state) => ({
      snacks: [...state.snacks, snack],
    })),
}));

interface StudentsStore {
  students: Student[];
  setStudents: (students: Student[]) => void;
  addStudent: (student: Student) => void;
  updateStudent: (student: Student) => void;
}

export const useStudentsStore = create<StudentsStore>((set) => ({
  students: [],
  setStudents: (students) => set({ students }),
  addStudent: (student) =>
    set((state) => ({
      students: [...state.students, student],
    })),
  updateStudent: (student) =>
    set((state) => ({
      students: state.students.map((s) => (s.id === student.id ? student : s)),
    })),
}));

interface UIStore {
  currentTab: 'snacks' | 'students';
  setCurrentTab: (tab: 'snacks' | 'students') => void;
  isPlaceOrderOpen: boolean;
  setIsPlaceOrderOpen: (isOpen: boolean) => void;
  isAddStudentOpen: boolean;
  setIsAddStudentOpen: (isOpen: boolean) => void;
  selectedStudent: string | null;
  setSelectedStudent: (studentId: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  currentTab: 'snacks',
  setCurrentTab: (tab) => set({ currentTab: tab }),
  isPlaceOrderOpen: false,
  setIsPlaceOrderOpen: (isOpen) => set({ isPlaceOrderOpen: isOpen }),
  isAddStudentOpen: false,
  setIsAddStudentOpen: (isOpen) => set({ isAddStudentOpen: isOpen }),
  selectedStudent: null,
  setSelectedStudent: (studentId) => set({ selectedStudent: studentId }),
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
