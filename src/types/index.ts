// Types for the application
export interface Snack {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  emoji?: string;
  image?: string;
  ordersCount?: number;
}

export interface Student {
  id: string;
  name: string;
  referralCode: string;
  rollNo: string;
  class: string;
  totalSpent: number;
  createdAt: string;
}

export interface Order {
  id: string;
  studentId: string;
  snackId: string;
  quantity: number;
  amount: number;
  createdAt: string;
}

export interface OrderItem {
  snackId: string;
  quantity: number;
  snack?: Snack;
}

export interface PlaceOrderFormData {
  studentId: string;
  items: OrderItem[];
}

export interface AddStudentFormData {
  name: string;
  rollNo: string;
  class: string;
}
